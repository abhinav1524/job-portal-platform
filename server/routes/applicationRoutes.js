import express from "express";
import { applyJob } from "../controllers/applicationController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:id/apply", protect, authorize("seeker"), applyJob);

export default router;