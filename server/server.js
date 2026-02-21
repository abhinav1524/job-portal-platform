    import express from "express";
    import cors from "cors";
    import dotenv from "dotenv";
    import connectDB from "./config/db.js";
    import authRoutes from "./routes/authRoutes.js";

    dotenv.config();

    const app = express();
    
    // middleware 
    app.use(cors());
    app.use(express.json());

    console.log("Registering /api/auth routes");
    //api route //
    app.use("/api/auth",authRoutes);
    // test route /
    app.get('api/health',(req,res)=>{
        res.status(200).json({message: "server is running "})
    })
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})