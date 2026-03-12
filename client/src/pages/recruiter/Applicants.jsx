import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { Check, X, UserCheck } from "lucide-react";
import toast from "react-hot-toast";

const Applicants = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const editableStatuses = ["pending", "shortlisted"];

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await api.get(`/api/applications/job/${jobId}`);
        console.log(res.data)
        setApplications(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [jobId]);

  const updateStatus = async (appId, newStatus) => {
    try {
      const res = await api.put(`/api/applications/${appId}/status`, {
        status: newStatus,
      });

      setApplications((prev) =>
        prev.map((app) =>
          app._id === appId ? { ...app, status: newStatus } : app,
        ),
      );
      const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);
      toast.success(`Applicant ${capitalize(newStatus)}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen px-4 md:px-10 py-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Applicants</h1>

        {applications.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No applicants yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {applications.map((app) => (
              <div
                key={app._id}
                className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md"
              >
                <h2 className="text-lg font-semibold dark:text-white">
                  {app.applicant.name}
                </h2>

                <p className="text-gray-600 dark:text-gray-400">
                  {app.applicant.email}
                </p>
                <a
                  href={app.applicant.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  View Resume
                </a>

                <p className="mt-2 text-sm dark:text-white">
                  Status:{" "}
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full
    ${
      app.status === "hired"
        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
        : app.status === "rejected"
          ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
          : app.status === "shortlisted"
            ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
    }`}
                  >
                    {app.status.toUpperCase()}
                  </span>
                </p>

                {editableStatuses.includes(app.status) && (
                  <div className="flex flex-wrap gap-3 mt-5">
                    {/* Shortlist */}
                    <button
                      onClick={() => updateStatus(app._id, "shortlisted")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
      ${
        app.status === "shortlisted"
          ? "bg-blue-700 text-white"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
                    >
                      <UserCheck size={18} />
                      Shortlist
                    </button>

                    {/* Accept */}
                    <button
                      onClick={() => updateStatus(app._id, "hired")}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-green-600 hover:bg-green-700 text-white transition-all duration-200 cursor-pointer"
                    >
                      <Check size={18} />
                      Accept
                    </button>

                    {/* Reject */}
                    <button
                      onClick={() => updateStatus(app._id, "rejected")}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-red-600 hover:bg-red-700 text-white transition-all duration-200 cursor-pointer"
                    >
                      <X size={18} />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applicants;
