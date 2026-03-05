import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { Search, MapPin, Briefcase } from "lucide-react";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/api/jobs");
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const result = jobs.filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredJobs(result);
  }, [search, jobs]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg dark:text-white">
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-10 py-10 bg-gray-100 dark:bg-gray-900">

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Available Jobs
      </h1>

      {/* Search Bar */}
      <div className="relative max-w-md mb-10">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />

        <input
          type="text"
          placeholder="Search by title or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 p-3 rounded-lg border 
          focus:ring-2 focus:ring-indigo-500 
          bg-white dark:bg-gray-800 
          dark:border-gray-700 
          dark:text-white"
        />
      </div>

      {/* Job Grid */}
      {filteredJobs.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">
          No jobs found.
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white dark:bg-gray-800 
              p-6 rounded-xl shadow-md 
              hover:shadow-xl transition"
            >
              {/* Title */}
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                {job.title}
              </h2>

              {/* Company */}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                <Briefcase size={16} />
                {job.company}
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
                <MapPin size={16} />
                {job.location || "Remote"}
              </div>

              {/* Salary */}
              {job.salary && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Salary: ₹{job.salary}
                </p>
              )}

              {/* Button */}
              <Link
                to={`/jobs/${job._id}`}
                className="inline-block w-full text-center 
                bg-indigo-600 hover:bg-indigo-700 
                text-white py-2 rounded-lg transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;