import express from "express";
import { getMyProfileController } from "./user.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/my-profile", authMiddleware, getMyProfileController);

export default router;