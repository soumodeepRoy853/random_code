import express from "express";
import { userSignupController, userSIgninController } from "../controller/user.controller.js";

const router = express.Router();

router.post("/auth/signup", userSignupController);

router.post("/auth/signin", userSIgninController);

export default router;