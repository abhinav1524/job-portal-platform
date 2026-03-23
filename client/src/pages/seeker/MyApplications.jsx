import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { Briefcase, MapPin } from "lucide-react";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await api.get("/api/applications/my");
      setApplications(res.data);
    } catch (error) {
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
    }
  };

if (loading) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 animate-pulse">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="h-8 bg-gray-400 dark:bg-gray-600 rounded w-1/3 mb-8"></div>

        {/* Skeleton cards */}
        <div className="grid gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                {/* Left side */}
                <div className="flex-1">
                  <div className="h-5 bg-gray-400 dark:bg-gray-600 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-400 dark:bg-gray-600 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-400 dark:bg-gray-600 rounded w-1/5"></div>
                </div>

                {/* Status badge */}
                <div className="h-8 w-24 bg-gray-400 dark:bg-gray-600 rounded-full"></div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          My Applications
        </h1>

        {applications.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            You have not applied to any jobs yet.
          </div>
        ) : (
          <div className="grid gap-6">

            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                  {/* Job Info */}
                  <div>

                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                      <Briefcase size={18} />
                      {app.job?.title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {app.job?.company}
                    </p>

                    {app.job?.location && (
                      <p className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mt-1">
                        <MapPin size={14} />
                        {app.job.location}
                      </p>
                    )}

                    <p className="text-xs text-gray-400 mt-2">
                      Applied on {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle(
                        app.status
                      )}`}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;