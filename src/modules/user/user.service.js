import mongoose from "mongoose";
import User from "../../model/user.model.js";
import { ApiError } from "../../utils/ApiError.js";

//Get My Profile
export const getMyProfileService = async(userId) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(userId)){
            throw new ApiError(400, "User Id not found")
        };

        const user = await User.findById(userId).select("-password -__v");

        if(!user) {
            throw new Error(404, "User not found")
        };  

    return {
        id: user._id,
        userName: user.userName,
        email: user.email,
        dailyTarget: user.dailyTarget,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        lastPracticeAt: user.lastPracticeAt,
        totalSolved: user.totalSolved,
        role: user.role,
        isActive: user.isActive
    }
    } catch (err) {
        if(err instanceof Error) {
            throw err;
        }
        throw new ApiError(500, "Failed to fetch profile")
    }
}