import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
export const applyJob = async(req,res)=>{
    try {
        const jobId= req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({message:"job not found"})
        }
        const user = await User.findById(req.user._id);
            if (!user.resume) {
      return res.status(400).json({ message: "Please upload resume first" });
    }

        const alreadyApplied = await Application.findOne({
            job:jobId,
            applicant:req.user._id,
        });
        if(alreadyApplied){
            return res.status(400).json({message:"Already applied to this job"})
        }
        const application = await Application.create({
            job:jobId,
            applicant:req.user._id,
            resume:user.resume
        })
        res.status(201).json({message:"Application Submitted",application});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getJobApplicants = async(req,res)=>{
    try {
        const jobId=req.params.jobId;
        const applications = await Application.find({job:jobId})
        .populate("applicant","name email")
        .populate("job","title company");
        res.status(200).json(applications);
    } catch (error) {
        res.status(200).json({message:error.message});
    }
}

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("applicant", "name email")
      .populate("job", "title company");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// user see his application where he applied //
export const getMyApplications = async (req, res) => {
  const applications = await Application.find({
    applicant: req.user._id
  })
  .populate("job", "title company location");

  res.json(applications);
};