import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { Search, MapPin, Briefcase } from "lucide-react";

const Jobs = () => {

  const [jobs, setJobs] = useState([]);

  // INPUT STATES (user typing)
  const [searchInput, setSearchInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [jobTypeInput, setJobTypeInput] = useState("");
  const [minSalaryInput, setMinSalaryInput] = useState("");
  const [experienceInput, setExperienceInput] = useState("");

  // FILTER STATES (used for API)
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

      setJobs((prev) => pageNum === 1 ? newJobs : [...prev, ...newJobs]);

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

  // Reset when filters change
  useEffect(() => {
    setJobs([]);
    setPage(1);
    setHasMore(true);
    fetchJobs(1);
  }, [search, location, jobType, minSalary, experience]);


  // Scroll (infinite)
  useEffect(() => {

    let throttleTimer = null;

    const handleScroll = () => {

      if (throttleTimer) return;

      throttleTimer = setTimeout(() => {

        throttleTimer = null;

        if (
          window.innerHeight + document.documentElement.scrollTop + 200 >=
          document.documentElement.scrollHeight &&
          !loadingMore &&
          hasMore
        ) {
          setPage((prev) => prev + 1);
        }

      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

  }, [loadingMore, hasMore]);


  // Search button
  const handleSearch = () => {
    setSearch(searchInput);
  };

  // Filter button
  const handleFilter = () => {
    setLocation(locationInput);
    setJobType(jobTypeInput);
    setMinSalary(minSalaryInput);
    setExperience(experienceInput);
  };

  const clearFilter =()=>{
    setLocation("");
    setJobType("");
    setMinSalary("");
    setExperience("");
  }

if (loading) {
  return (
    <div className="min-h-screen px-4 md:px-10 py-10 bg-gray-100 dark:bg-gray-900">

      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Available Jobs
      </h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {[...Array(6)].map((_, i) => (
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

    </div>
  );
}

  return (
    <div className="min-h-screen px-4 md:px-10 py-10 bg-gray-100 dark:bg-gray-900">

      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Available Jobs
      </h1>


      {/* SEARCH */}
      <div className="flex gap-3 max-w-md mb-6">

        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />

          <input
            type="text"
            placeholder="Search by title or company..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-10 p-3 rounded-lg border 
            focus:ring-2 focus:ring-indigo-500 
            bg-white dark:bg-gray-800 
            dark:border-gray-700 
            dark:text-white"
          />
        </div>

        <button
          onClick={handleSearch}
          className="px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
        >
          Search
        </button>

      </div>


      {/* FILTERS */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">

        <input
          type="text"
          placeholder="Location"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          className="p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
        />

        <select
          value={jobTypeInput}
          onChange={(e) => setJobTypeInput(e.target.value)}
          className="p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
        >
          <option value="">Job Type</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="remote">Remote</option>
          <option value="internship">Internship</option>
        </select>

        <input
          type="number"
          placeholder="Min Salary"
          value={minSalaryInput}
          onChange={(e) => setMinSalaryInput(e.target.value)}
          className="p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
        />

        <select
          value={experienceInput}
          onChange={(e) => setExperienceInput(e.target.value)}
          className="p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
        >
          <option value="">Experience</option>
          <option value="fresher">Fresher</option>
          <option value="1 year">1 year</option>
          <option value="2 year">2 year</option>
          <option value="1-3 years">1-3 years</option>
          <option value="3-5 years">3-5 years</option>
          <option value="5+ years">5+ years</option>
        </select>

      </div>


      {/* FILTER BUTTONs */}
      <div className="flex items-center">
      <button
        onClick={handleFilter}
        className="mb-10 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
      >
        Apply Filters
      </button>

      <button
        onClick={clearFilter}
        className="mb-10 ms-4 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
      >
        Clear Filters
      </button>
      </div>

      {/* JOBS */}
      {jobs.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">
          No jobs found.
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {jobs.map((job) => (

            <div
              key={job._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition"
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

              {job.experience && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Experience: {job.experience}
                </p>
              )}

              {job.salary && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Salary: ₹{job.salary}
                </p>
              )}

              {job.jobType && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  JobType: {job.jobType}
                </p>
              )}

              <Link
                to={`/jobs/${job._id}`}
                className="inline-block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
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