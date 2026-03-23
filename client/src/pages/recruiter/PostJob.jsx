import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";

const PostJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    experience: "",
    salary: "",
  });
  const [loading ,setLoading]= useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
  
    if(!formData.title&& !formData.company&& !formData.description&&!formData.location&&!formData.experience&&!formData.salary){
      toast.dismiss();
      toast.error("All the fields are required !");
      return false;
    }
    
    if (!formData.title) {
      toast.dismiss();
      toast.error("Title is required");
      return false;
    }
  
    if (!formData.company) {
      toast.dismiss();
      toast.error("Company Name is required");
      return false;
    }
  
    if (!formData.description) {
      toast.dismiss();
      toast.error("Description is required");
      return false;
    }
  
    if (!formData.location) {
      toast.dismiss();
      toast.error("Location is required");
      return false;
    }
      
    if (!formData.experience) {
      toast.dismiss();
      toast.error("Experience is required");
      return false;
    }
      
    if (!formData.salary) {
      toast.dismiss();
      toast.error("Salary is required");
      return false;
    }
  
    return true; // all good
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (loading) return;
    setLoading(true);
    try {
      await api.post("/api/jobs", formData);
      toast.success("Job created successfully");
      navigate("/recruiter/my-jobs");
    } catch (error) {
      toast.error("Failed to create job");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-10 py-8 bg-gray-100 dark:bg-gray-900">
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Create Job</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg dark:text-white"
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg dark:text-white"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg dark:text-white"
        />

        <input
          type="text"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg dark:text-white"
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg dark:text-white"
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg dark:text-white"
        />

        <button
          type="submit"
          className={`w-full p-3 rounded-lg transition
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700 text-white"
    } cursor-pointer`}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default PostJob;