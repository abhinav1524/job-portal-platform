import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await api.get("/api/jobs/");
      setJobs(res.data);
    };
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    await api.delete(`/api/jobs/${jobId}`);
    toast.success("Job deleted successfully");
    setJobs(jobs.filter((job) => job._id !== jobId));
  };

  return (
    <div className="min-h-screen px-4 md:px-10 py-8 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        My Posted Jobs
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {job.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {job.company}
              </p>
            </div>

            <div className="flex gap-2 mt-4 flex-wrap">
              <Link
                to={`/recruiter/edit-job/${job._id}`}
                className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(job._id)}
                className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Delete
              </button>

              <Link
                to={`/recruiter/applicants/${job._id}`}
                className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded"
              >
                Applicants
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;