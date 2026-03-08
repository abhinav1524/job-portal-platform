import { useEffect, useState } from "react";
import api from "../../../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const [user,setUser] = useState(null);

  const [formData,setFormData] = useState({
    name:"",
    bio:"",
    skills:"",
  });

  const [resume,setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    fetchProfile();
  },[]);

  const fetchProfile = async ()=>{
    try{
      const res = await api.get("/api/users/profile");
      setUser(res.data);

      setFormData({
        name:res.data.name || "",
        bio:res.data.bio || "",
        skills:res.data.skills ? res.data.skills.join(", ") : ""
      });

    }catch(err){
      toast.error("Failed to load profile");
    }
  };

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
      if (loading) return; // prevent double click

  setLoading(true);
  try {

    let profileUpdated = false;
    let resumeUpdated = false;

    // update profile info
    const profileRes = await api.put("/api/users/profile/update", {
      name: formData.name,
      bio: formData.bio,
      skills: formData.skills
    });

    if (profileRes.data) {
      profileUpdated = true;
    }

    // update resume if selected
    if (resume) {
      const data = new FormData();
      data.append("resume", resume);

      const resumeRes = await api.post("/api/users/upload-resume", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (resumeRes.data) {
        resumeUpdated = true;
      }
    }

    // show only relevant toast
    if (resumeUpdated) {
      toast.success("Resume updated successfully");
    } else if (profileUpdated) {
      toast.success("Profile updated successfully");
    }

    // redirect to profile page
    navigate("/profile");

  } catch (err) {
    toast.error("Update failed");
  }finally{
    setLoading(false)
  }
};

  if(!user){
    return <div className="text-center mt-20">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center p-6">

      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          My Profile
        </h2>

        {/* PROFILE INFO */}

        <div className="mb-8">

          <p className="text-gray-700 dark:text-gray-300">
            <strong>Email:</strong> {user.email}
          </p>

        </div>


        {/* EDIT FORM */}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>


          {/* BIO */}

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Bio
            </label>

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>


          {/* SKILLS */}

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Skills (comma separated)
            </label>

            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node, MongoDB"
              className="w-full p-3 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>


          {/* RESUME */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Upload Resume
            </label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e)=>setResume(e.target.files[0])}
              className="w-full p-2 text-gray-700 dark:text-gray-200"
            />

{/* {user.resume && (
  <div className="mt-3">
    <a
  href={`${user.resume.replace("/upload/", "/upload/fl_attachment/")}`}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600"
>
  View Resume
</a>
  </div>
)} */}
          </div>


          {/* UPDATE BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-3 rounded transition 
  ${loading 
    ? "bg-gray-400 cursor-not-allowed" 
    : "bg-blue-600 hover:bg-blue-700 text-white"
  }`}

          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

        </form>

      </div>

    </div>
  );
}