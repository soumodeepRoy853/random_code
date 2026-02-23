import express from "express";
import dotenv from "dotenv";
import app from "./src/app.js";

import connectDB from "./src/config/connectDB.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 6969

app.listen(PORT, () => {
    console.log(`SERVER TURN ON: ${PORT}!!!`)
});

