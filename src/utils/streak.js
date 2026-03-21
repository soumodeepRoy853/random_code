import User from "../model/user.model.js";

const updateStreak = async(user) => {
    try {
        const today = new Date();
        const yesterday = new Date();

        yesterday.setDate(today.getDate()-1);

        //Find last practice
        const lastPractice = user.lastPracticeAt? new Date(user.lastPracticeAt) : null;

        //Convert to date-only
        const todayDate = today.toDateString();
        const yesterdayDate = yesterday.toDateString();
        const lastPracticeAt = lastPractice ? lastPractice.toDateString() : null;

        if(lastPracticeAt === todayDate){
            //Already count today
            return;
        };

        if(lastPracticeAt === yesterdayDate){
            user.currentStreak += 1;
        } else{
            user.currentStreak = 1;
        }

        //Set longestStreak
        if(user.currentStreak > user.longestStreak){
            user.longestStreak = user.currentStreak;
        };

        user.lastPracticeAt = today;

        await user.save();
    } catch (err) {
        throw new AppiError(400, "Something went wrong")
    }
};

export default updateStreak;

