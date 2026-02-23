import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database is on MOOD!!!")
    } catch (err) {
        console.error("Database has no MOOD!!!", err);

        process.exit(1);
    }
};

export default connectDB;