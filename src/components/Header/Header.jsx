import { Link } from "react-router-dom";
import { FiSearch, FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav
      className={`sticky top-0 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } border-gray-200`}
    >
      <div className="flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg px-3 py-1 text-white font-bold mr-2">
            {`Ali's`}
          </div>
          <span className="text-lg font-semibold">Blog</span>
        </Link>

        {/* Mobile View Icons */}
        <div className="flex items-center space-x-4 md:hidden">
          {/* Search Icon */}
          <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
            <FiSearch className="text-gray-500" />
          </button>

          {/* Sign In Button */}
          <Link
            to="/sign-in"
            className="px-3 py-1 border-2 border-transparent bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded"
          >
            Sign in
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/*  Search Box for large screen */}
        <div className="hidden md:flex items-center relative w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="pl-4 pr-8 py-2 w-full rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <FiSearch className="absolute right-3 text-gray-500" />
        </div>

        {/* Full Links  for large screen  */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Navigation Links */}
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>
          <Link to="/projects" className="hover:text-blue-600">
            Projects
          </Link>
        </div>

        {/* dark mode btn and sign in button */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>

          {/* Sign In Button */}
          <Link
            to="/sign-in"
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded hover:from-pink-500 hover:to-purple-500 transition-all"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700`}
        >
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link
              to="/"
              onClick={toggleMobileMenu}
              className="hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={toggleMobileMenu}
              className="hover:text-blue-600"
            >
              About
            </Link>
            <Link
              to="/projects"
              onClick={toggleMobileMenu}
              className="hover:text-blue-600"
            >
              Projects
            </Link>
            <button
              onClick={() => {
                toggleDarkMode();
                toggleMobileMenu();
              }}
              className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
            <Link
              to="/sign-in"
              onClick={toggleMobileMenu}
              className="px-4 py-2 border-2 border-transparent bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-pink-500 hover:to-purple-500 transition-all"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
