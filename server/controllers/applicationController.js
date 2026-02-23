import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const applyJob = async(req,res)=>{
    try {
        const jobId= req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({message:"job not found"})
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
            applicant:req.user._id
        })
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
