import express from "express";
import { userSignupController, userSigninController, getAllUsersController } from "../controller/user.controller.js";

const router = express.Router();

router.post("/auth/signup", userSignupController);

router.post("/auth/signin", userSigninController);

router.get("/get/all/users", getAllUsersController);
export default router;