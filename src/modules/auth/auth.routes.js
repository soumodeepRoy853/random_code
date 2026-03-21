import express from "express";
import { userSignupController, userSigninController } from "../auth/auth.controller.js";

const router = express.Router();

router.post("/signup", userSignupController);

router.post("/signin", userSigninController);

export default router;