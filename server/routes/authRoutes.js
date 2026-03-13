import express from "express";
import { registerUser,loginUser, getMe,logoutUser, forgotPassword,resetPassword } from "../controllers/authController.js";
import {protect} from "../middlewares/authMiddleware.js";
const router = express.Router();

console.log("Auth routes loaded");
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/me",protect,getMe);
router.post("/logout", logoutUser);
router.post("/forgot-password",forgotPassword);
router.put("/reset-password/:token",resetPassword);
export default router;