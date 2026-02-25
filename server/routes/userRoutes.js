import express from "express";
import upload from "../utils/multer.js";
import { uploadResume } from "../controllers/userController.js";
import {protect} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/upload-resume",protect,upload.single("resume"),uploadResume);

export default router;