import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { Search, MapPin, Briefcase } from "lucide-react";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [experience, setExperience] = useState("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const limit = 6;

  const fetchJobs = async (pageNum = 1) => {
    try {
      pageNum === 1 ? setLoading(true) : setLoadingMore(true);

      const res = await api.get("/api/jobs", {
        params: {
          page: pageNum,
          limit,
          keyword: search,
          location,
          jobType,
          minSalary,
          experience
        }
      });

      const newJobs = res.data;

      if (newJobs.length < limit) {
        setHasMore(false);
      }

      setJobs((prev) => {
        const existingIds = new Set(prev.map((job) => job._id));
        const uniqueJobs = newJobs.filter((job) => !existingIds.has(job._id));
        return [...prev, ...uniqueJobs];
      });

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Fetch when page changes
  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  // Reset when filters/search change
  useEffect(() => {
    const delay = setTimeout(() => {
      setJobs([]);
      setPage(1);
      setHasMore(true);
      fetchJobs(1);
    }, 400);

    return () => clearTimeout(delay);
  }, [search, location, jobType, minSalary, experience]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >=
          document.documentElement.scrollHeight &&
        !loadingMore &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, hasMore]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg dark:text-white">
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-10 py-10 bg-gray-100 dark:bg-gray-900">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Available Jobs
      </h1>

      {/* Search */}
      <div className="relative max-w-md mb-6">
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

      {/* Filters */}
      <div className="grid md:grid-cols-4 gap-4 mb-10">

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
        />

        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
        >
          <option value="">Job Type</option>
          <option value="Full-time">Full Time</option>
          <option value="Part-time">Part Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <input
          type="number"
          placeholder="Min Salary"
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
          className="p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
        />

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
        >
          <option value="">Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="1-3 years">1-3 years</option>
          <option value="3-5 years">3-5 years</option>
          <option value="5+ years">5+ years</option>
        </select>

      </div>

      {/* Jobs Grid */}
      {jobs.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">
          No jobs found.
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white dark:bg-gray-800 
              p-6 rounded-xl shadow-md 
              hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                {job.title}
              </h2>

              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                <Briefcase size={16} />
                {job.company}
              </div>

              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
                <MapPin size={16} />
                {job.location || "Remote"}

              </div>
              {job.salary && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Experience: {job.experience}
                </p>
              )}

              {job.salary && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Salary: ₹{job.salary}
                </p>
              )}

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

      {/* Skeleton Loader */}
      {loadingMore && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md animate-pulse"
            >
              <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Jobs;
