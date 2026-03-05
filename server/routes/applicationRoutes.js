import express from "express";
import { applyJob, getJobApplicants, updateApplicationStatus,getMyApplications } from "../controllers/applicationController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:id/apply", protect, authorize("seeker"), applyJob);
router.get("/job/:jobId",protect,authorize("recruiter"),getJobApplicants);
router.put("/:id/status",protect,authorize("recruiter"),updateApplicationStatus);
router.get("/my",protect,authorize("seeker"),getMyApplications);

export default router;