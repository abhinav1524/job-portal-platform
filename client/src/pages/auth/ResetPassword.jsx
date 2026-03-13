import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

const ResetPassword = () => {

  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
        if(password===""){
            toast.error("Password shouldn't be empty !")
            return;
        }
      setLoading(true);

      const res = await api.put(`/api/auth/reset-password/${token}`,{
        password
      });

      toast.success(res.data.message || "Password reset successful");

      navigate("/login");

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Reset failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-indigo-50 to-blue-100 
    dark:from-gray-900 dark:to-gray-800 px-4">

      <div className="bg-white dark:bg-gray-900 
      text-gray-900 dark:text-white 
      p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg bg-transparent
            focus:outline-none focus:ring-2 focus:ring-indigo-400
            dark:border-gray-600"
          />

          <button
            disabled={loading}
            className={`w-full px-6 py-3 rounded-lg text-white transition
            ${
                loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default ResetPassword;