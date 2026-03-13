import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "seeker",
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
    setLoading(true);

    try {
      const res = await register(form);
      if (res.user.role === "recruiter") {
        navigate("/recruiter/my-jobs");
        toast.success("Registration successfull");
      } else {
        navigate("/jobs");
        toast.success("Registration successfull");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 
dark:from-gray-900 dark:to-gray-800"
    >
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-600 bg-transparent"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-600 bg-transparent"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-600 bg-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-900 
             text-gray-900 dark:text-white 
             border-gray-300 dark:border-gray-600 
             focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="seeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
          </select>

          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition cursor-pointer"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
