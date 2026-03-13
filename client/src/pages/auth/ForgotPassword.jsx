import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if(email===""){
            toast.error("Please enter the valid email");
            return;
        }
      setLoading(true);

      const res = await api.post("/api/auth/forgot-password", {
        email
      });

      toast.success(res.data.message || "Reset link sent to email");

      setEmail("");

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Something went wrong"
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

        <h2 className="text-3xl font-bold text-center mb-4">
          Forgot Password
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Enter your email and we will send a reset link
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
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
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default ForgotPassword;