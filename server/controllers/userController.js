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
        // const extension = req.file.originalname.split(".").pop();
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
// fetching the information of the user for profile //
export const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// update the profile of the user 
export const updateProfile = async (req, res) => {
  try {
    const { name, bio, skills } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (bio) user.bio = bio;

    if (skills) {
      user.skills = skills.split(",").map(s => s.trim());
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    console.log("SAVE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};