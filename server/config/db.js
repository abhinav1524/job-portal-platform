import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.Mongo_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`DB Connection Error : ${error.message}`);
        process.exit();
    }
}

export default connectDB;