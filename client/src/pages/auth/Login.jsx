import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // show and hide the password
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await login(form);
      if (res.user.role === "recruiter") {
        navigate("/recruiter/my-jobs");
        toast.success("Login successfull");
      } else {
        navigate("/jobs");
        toast.success("Login successfull");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br 
from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div
        className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-transparent 
focus:outline-none focus:ring-2 focus:ring-indigo-400 
dark:border-gray-600"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 pr-10 border rounded-lg bg-transparent 
    focus:outline-none focus:ring-2 focus:ring-indigo-400 
    dark:border-gray-600"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <button
            disabled={loading}
            className={`w-full py-3 rounded-lg transition font-medium
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700 text-white"
    }`}

          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-semibold">
            Register
          </Link>
        </p>
        <p className="text-center">or</p>
        <p className="text-center">
          <Link
                to="/forgot-password"
                className="text-sm text-indigo-600 hover:underline text-center"
                >
                Forgot Password?
                </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
