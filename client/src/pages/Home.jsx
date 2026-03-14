import { useTheme } from "../context/ThemeContext";

const Home = () => {

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition">

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-20 px-6">

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Find Your Dream Job
        </h2>

        <p className="max-w-xl text-gray-600 dark:text-gray-300 mb-8">
          Discover thousands of job opportunities from top companies.
          Apply easily and grow your career today.
        </p>

        <a href="/jobs" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg">
          Browse Jobs
        </a>

      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 px-10 py-16">

        <div className="p-6 rounded-xl shadow-md bg-gray-100 dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-3">
            Search Jobs
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Find jobs based on skills, location, and experience.
          </p>
        </div>

        <div className="p-6 rounded-xl shadow-md bg-gray-100 dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-3">
            Easy Apply
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Apply to multiple jobs with one click.
          </p>
        </div>

        <div className="p-6 rounded-xl shadow-md bg-gray-100 dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-3">
            Track Applications
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor your job application progress easily.
          </p>
        </div>

      </section>

      {/* CTA */}
      <section className="text-center py-16">

        <h2 className="text-3xl font-bold mb-4">
          Start Your Career Journey
        </h2>

        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
          Get Started
        </button>

      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t dark:border-gray-700">

        <p className="text-gray-500">
          © {new Date().getFullYear()} JobPortal
        </p>

      </footer>

    </div>
  );
};

export default Home;