import mongoose from "mongoose";
import User from "../../model/user.model.js";
import Practice from "../../model/practice.model.js";
import updateStreak from "../../utils/streak.js";
import { ApiError } from "../../utils/ApiError.js";

//Create Practice
export const createPracticeService = async(userId, data) =>{
    try {
        const {title, platform, topic, difficulty, solved, timeTaken} = data;
        const normalizedUserId = userId?.toString ? userId.toString() : userId;

        if(!mongoose.Types.ObjectId.isValid(normalizedUserId)){
            throw new ApiError(400, "Invalid user Id")
        };
        
        const user = await User.findById(normalizedUserId);
        if(!user){
            throw new ApiError(404, "User not found")
        };

        const today = new Date();
        const startDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            0, 0, 0, 0
        );

        const endDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            23, 59, 59, 999
        );

        //Check duplicates problem
        const duplicate = await Practice.findOne({
            user: normalizedUserId,
            title,
            date: {$gte: startDay, $lte: endDay}
        });

        if(duplicate){
            throw new ApiError(400, "Problem already logged today")
        };

        const practice = await Practice.create({
            user: normalizedUserId,
            title,
            platform,
            topic,
            difficulty,
            solved,
            timeTaken
        });

        //Update total solved
        if(solved){
            await User.findByIdAndUpdate(normalizedUserId, {
                $inc: {totalSolved: 1}
            })
        };

        //Check streak condition
        const solvedToday = await Practice.countDocuments({
            user: normalizedUserId,
            solved: true,
            date: { $gte: startDay, $lte: endDay }
        });

        if(solvedToday >= user.dailyTarget){
            await updateStreak(user)
        };

        return practice;

    } catch (err) {
        if(err instanceof Error) {
            throw err;
        }
         throw new ApiError(500, "Failed to fetch profile") 
    }
};

//Get All Practices
export const getAllPracticeService = async(userId, query) => {
    try {
        const user = userId?.toString ? userId.toString() : userId;
        const {
            page = 1,
            limit = 10,
            title,
            difficulty,
            platform,
            solved,
            sortBy = "createdAt",
            order = "desc"
        } = query;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        //Build filter
        const filter = { user: user };
        if(title) filter.title = title;
        if(difficulty) filter.difficulty = difficulty;
        if(platform) filter.platform = platform;
        if(solved !== undefined) filter.solve = solved === "true";

        //Sorting
        const sort = {};
        sort[sortBy] = order === "asc" ? 1 : -1;

        //Query
        const practices = await Practice.find(filter)
        .populate("user", "userName")
        .sort(sort)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber)
        
        //Count total
        const total = await Practice.countDocuments(filter);

        return{
            pagination: {
                total,
                page: pageNumber,
                limit: limitNumber,
                totalPages: Math.ceil(total / limitNumber)
            },
            data: practices
        }

    } catch (err) {
        throw new ApiError(400, "Unable to fetch all Practices")
    }
};

//Get Practice By Id
export const getMyPracticeByIdService = async(userId, practiceId) => {
    try {
        const user = userId?.toString ? userId.toString() : userId;

        if(!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(practiceId)){
            throw new ApiError(400, "Invalid id")
        }

        const practice = await Practice.findById(practiceId).populate("user", "userName totalSolved dailyTarget currentStreak longestStreak lastPracticeAt");
        if(!practice){
            throw new ApiError(404, "Practice not found")
        }

        const ownerId = practice.user && practice.user._id ? practice.user._id.toString() : practice.user.toString();
        if(ownerId !== user){
            throw new ApiError(403, "Access denied")
        }

        return practice;
    } catch (err) {
        if(err instanceof Error) throw err;
        throw new ApiError(500, "Unable to fetch practice")
    }
};