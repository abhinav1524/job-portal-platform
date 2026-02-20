    import express from "express";
    import cors from "cors";
    import dotenv from "dotenv";
    import connectDB from "./config/db.js";

    dotenv.config();

    const app = express();
    
    // middleware 
    app.use(cors());
    app.use(express.json());

    // test route /
    app.get('api/health',(req,res)=>{
        res.status(200).json({message: "server is running "})
    })
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})