import express from "express";
import upload from "../utils/multer.js";
import { uploadResume,updateProfile,getProfile } from "../controllers/userController.js";
import {authorize, protect} from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/profile",protect,getProfile);
router.post("/upload-resume",protect,upload.single("resume"),uploadResume);
router.put("/profile/update",protect,updateProfile);
export default router;