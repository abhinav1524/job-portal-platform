import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2, Save } from "lucide-react";
import api from "../../api/axios";

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/api/jobs/${jobId}`);

        setFormData({
          title: res.data.title || "",
          company: res.data.company || "",
          location: res.data.location || "",
          salary: res.data.salary || "",
          experience: res.data.experience || "",
          description: res.data.description || "",
        });

        setLoading(false);
      } catch (error) {
        toast.error("Failed to load job details");
        navigate("/recruiter/my-jobs");
      }
    };

    fetchJob();
  }, [jobId, navigate]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await api.put(`/api/jobs/${jobId}`, formData);
      toast.success("Job updated successfully");
      navigate("/recruiter/my-jobs");
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-10 py-8 bg-gray-100 dark:bg-gray-900">
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 dark:text-white">Edit Job</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg dark:text-white"
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg dark:text-white"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg dark:text-white"
        />

        <input
          type="text"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg dark:text-white"
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg dark:text-white"
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={5}
          className="w-full p-3 border rounded-lg dark:text-white"
        />

        <button
          type="submit"
          disabled={updating}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60 cursor-pointer"
        >
          {updating ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Updating...
            </>
          ) : (
            <>
              <Save size={18} />
              Update Job
            </>
          )}
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditJob;