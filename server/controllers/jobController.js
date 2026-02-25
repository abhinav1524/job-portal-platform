import Job from "../models/Job.js";

export const createJob = async(req,res)=>{
    try {
        const {
            title,
            description,
            company,
            location,
            salary,
            jobType,
            experience,
        }=req.body;

        if(!title||!description||!company||!location){
            return res.status(400).json({message:"Required fields missing"});
        }
        const job = await Job.create({
            title,
            description,
            company,
            location,
            salary,
            jobType,
            experience,
            postedBy:req.user._id,
        })
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getAllJobs = async(req,res)=>{
    try {
          const {
      keyword,
      location,
      jobType,
      minSalary,
      maxSalary,
      experience,
      page = 1,
      limit = 10,
      sort = "createdAt"
    } = req.query;
        let query={};
        if(keyword){
          query.$or=[
            {title:{$regex:keyword,$options:"i"}},
            {description:{$regex:keyword,$options:"i"}},
            {company:{$regex:keyword,$options:"i"}},
          ];
        }
        // location filter 
        if(location){
          query.location={$regex:location,$options:"i"};
        }
        // job filter
        if(jobType){
          query.jobType=jobType;
        }
        // experience filter
        if(experience){
          query.experience=experience;
        }
        // salary filter
        if(minSalary||maxSalary){
          query.salary={};
          if(minSalary) query.salary.$gte=Number(minSalary);
          if(maxSalary) query.salary.$lte= Number(maxSalary);
        }
        // pagination
        const skip = (Number(page)-1)*Number(limit);
        // console.log("Query Object => ",query);
        // Db query 
        const jobs = await Job.find(query)
        .populate("postedBy","name email")
        .sort({[sort]:-1})
        .skip(skip)
        .limit(Number(limit))
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getSingleJob = async(req,res)=>{
    try {
        const job = await Job.findById(req.params.id);
        if(!job){
            return res.status(404).json({message:"Job not found"})
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Only updating  fields that are provided by user
    job.title = req.body.title || job.title;
    job.description = req.body.description || job.description;
    job.company = req.body.company || job.company;
    job.location = req.body.location || job.location;
    job.salary = req.body.salary || job.salary;
    job.jobType = req.body.jobType || job.jobType;
    job.experience = req.body.experience || job.experience;

    const updatedJob = await job.save();

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Only recruiter who created the job can delete it
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this job" });
    }

    await job.deleteOne();

    res.status(200).json({ message: "Job deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};