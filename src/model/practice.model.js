import mongoose from "mongoose";
import { required } from "zod/mini";

const practiceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ["EASY", "MEDIUM", "HARD"],
        required: true
    },
    solve: {
        solved: Boolean,
        default: false
    },
    timeTaken: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now()
    }
},{timestamps: true} )

export const Practice = mongoose.model("Practice", practiceSchema);