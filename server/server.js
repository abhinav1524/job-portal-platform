    import express from "express";
    import cors from "cors";
    import dotenv from "dotenv";
    import cookieParser from "cookie-parser";
    import connectDB from "./config/db.js";
    import authRoutes from "./routes/authRoutes.js";
    import jobRoutes from "./routes/jobRoutes.js";
    import applicationRoutes from "./routes/applicationRoutes.js";
    import userRoutes from "./routes/userRoutes.js";
    dotenv.config();

    const app = express();
    
    // middleware 
    app.use(cors({
        origin:"http://localhost:5173",
        credentials:true
    }));
    app.use(express.json());
    app.use(cookieParser());
    console.log("Registering /api/auth routes");
    //api route //
    app.use("/api/auth",authRoutes);
    app.use("/api/jobs",jobRoutes);
    app.use("/api/applications", applicationRoutes);
    app.use("/api/users",userRoutes);
    // test route /
    app.get('api/health',(req,res)=>{
        res.status(200).json({message: "server is running "})
    })
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})