import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import toast from "react-hot-toast";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/users/profile");
      setUser(res.data);
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-20 text-gray-700 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-start pt-16 px-4">

      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
          My Profile
        </h2>

        {/* PROFILE DETAILS */}
        <div className="space-y-4">

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
            <p className="text-gray-800 dark:text-white font-medium">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
            <p className="text-gray-700 dark:text-gray-300">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Bio</p>
            <p className="text-gray-700 dark:text-gray-300">
              {user.bio || "No bio added"}
            </p>
          </div>

          {/* SKILLS */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Skills
            </p>

            <div className="flex flex-wrap gap-2">
              {user.skills && user.skills.length > 0 ? (
                user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No skills added
                </p>
              )}
            </div>
          </div>

          {/* RESUME */}
          {user.resume && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Resume</p>

              <a
                href={user.resume}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                View Resume
              </a>
            </div>
          )}

        </div>

        {/* EDIT BUTTON */}
        <button
          onClick={() => navigate("/profile/edit")}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          Edit Profile
        </button>

      </div>
    </div>
  );
}