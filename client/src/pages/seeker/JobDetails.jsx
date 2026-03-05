import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

import { MapPin, Briefcase, IndianRupee, Calendar } from "lucide-react";

const JobDetails = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchJob = async () => {
    try {
      const res = await api.get(`/api/jobs/${id}`);
      setJob(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load job");
    } finally {
      setLoading(false);
    }
  };

  const applyJob = async () => {
    try {
      await api.post(`/api/applications/${id}/apply`);
      setApplied(true);
      toast.success("Application submitted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Already applied");
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg dark:text-white">
        Loading job details...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center mt-20 text-red-500">
        Job not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 md:px-10 py-10">

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          {job.title}
        </h1>

        {/* Company */}
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
          <Briefcase size={18} />
          {job.company}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
          <MapPin size={18} />
          {job.location || "Remote"}
        </div>

        {/* Salary */}
        {job.salary && (
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
            <IndianRupee size={18} />
            ₹{job.salary}
          </div>
        )}

        {/* Posted Date */}
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-6">
          <Calendar size={18} />
          Posted {new Date(job.createdAt).toLocaleDateString()}
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* Description */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
          Job Description
        </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
          {job.description}
        </p>

        {/* Apply Button */}
        <button
          onClick={applyJob}
          disabled={applied}
          className={`w-full md:w-auto px-6 py-3 rounded-lg text-white transition
          ${
            applied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {applied ? "Already Applied" : "Apply Now"}
        </button>
      </div>
    </div>
  );
};

export default JobDetails;