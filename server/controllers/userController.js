import User from "../models/User.js";

export const uploadResume = async(req,res)=>{
    try {
        const userId = req.user.id;
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"Resume file required",
            })
        }
        const resumeUrl = req.file.path;
        const user = await User.findByIdAndUpdate(
            userId,
            {resume:resumeUrl},
            { returnDocument: "after" }
        )
        res.status(200).json({
            sucess:true,
            message:"Resume upload sucessfully",
            resume:user.resume,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Resume upload failed",
            error:error.message,
        })
    }
}