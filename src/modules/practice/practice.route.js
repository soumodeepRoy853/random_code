import express from "express";
import { createPracticeController, getAllPracticeController, getMyPracticeByIdController } from "./practice.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-practice", authMiddleware, createPracticeController);
router.get("/all", authMiddleware, getAllPracticeController);
router.get("/:practiceId", authMiddleware, getMyPracticeByIdController);

export default router;