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
  const [applyLoading, setApplyLoading] = useState(false);

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
    if (applyLoading) return;
    try {
      setApplyLoading(true);
      await api.post(`/api/applications/${id}/apply`);
      setApplied(true);
      toast.success("Application submitted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Already applied");
    }finally{
      setApplyLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (loading) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 md:px-10 py-10 animate-pulse">
      
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">

        {/* Title */}
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>

        {/* Company */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-2"></div>

        {/* Location */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-2"></div>

        {/* Salary */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/5 mb-2"></div>

        {/* Date */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-6"></div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* Description heading */}
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-3"></div>

        {/* Description lines */}
        <div className="space-y-3 mb-8">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
        </div>

        {/* Button */}
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-full md:w-40"></div>

      </div>
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
          disabled={applied || applyLoading}
          className={`w-full md:w-auto px-6 py-3 rounded-lg text-white transition
          ${
            applied || applyLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          } cursor-pointer`}
        >
            {applyLoading
    ? "Applying..."
    : applied
    ? "Already Applied"
    : "Apply Now"}
        </button>
      </div>
    </div>
  );
};

export default JobDetails;