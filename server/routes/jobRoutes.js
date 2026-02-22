import express from "express";
import {createJob,getAllJobs,getSingleJob,updateJob,deleteJob} from "../controllers/jobController.js";
import {protect,authorize} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/",protect,authorize("recruiter"),createJob);
router.get("/",getAllJobs);
router.get("/:id",protect,getSingleJob);
router.put("/:id",protect,authorize("recruiter"),updateJob);
router.delete("/:id",protect,authorize("recruiter"),deleteJob);
export default router;