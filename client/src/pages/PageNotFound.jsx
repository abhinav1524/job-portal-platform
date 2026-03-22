import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gray-100 dark:bg-gray-900 px-6">

      <div className="text-center max-w-md">

        {/* 404 Text */}
        <h1 className="text-7xl font-extrabold text-indigo-600 mb-4">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 
          bg-indigo-600 hover:bg-indigo-700 
          text-white px-6 py-3 rounded-lg 
          transition shadow-md"
        >
          <Home size={18} />
          Go Back Home
        </Link>

      </div>
    </div>
  );
}