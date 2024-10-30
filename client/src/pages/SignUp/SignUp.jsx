import { Link, useNavigate } from "react-router-dom";
import SVG from "../../assets/signup.svg";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import OAuth from "../../components/OAuth/OAuth";
import { useSelector } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useSelector((state) => state.theme.theme);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = { fullName, username, email, password };

      if (!fullName || !username || !email || !password) {
        toast.error("All fields are required");
        return;
      }

      setLoading(true);
      const res = await axios.post(`api/auth/signup`, formData);
      toast.success(res.data.message);
      setLoading(false);
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
      setLoading(false);
      setFullName("");
      setUsername("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div
      className={`flex h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Left Panel */}
      <div
        className={`hidden lg:flex items-center justify-center flex-1 ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-200"
        }`}
      >
        <div className="max-w-md text-center">
          <img src={SVG} alt="Illustration" />
        </div>
      </div>

      {/* Right Panel */}
      <div
        className={`w-full lg:w-1/2 flex items-center justify-center ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div className="max-w-md w-full p-6">
          <h1
            className={`text-3xl font-semibold mb-6 text-center ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Sign Up
          </h1>
          <h2 className="text-sm font-semibold mb-6 text-center text-gray-500">
            Join our community with all-time access and for free
          </h2>

          {/* OAuth Component */}
          <OAuth />
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>or sign up with email</p>
          </div>

          {/* Sign-Up Form */}
          <form onSubmit={submitHandler} className="space-y-4">
            <label htmlFor="fullName" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="John Smith"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`p-2 w-full border rounded-md ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-black"
              }`}
            />
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`p-2 w-full border rounded-md ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-black"
              }`}
            />
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`p-2 w-full border rounded-md ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-black"
              }`}
            />
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`p-2 w-full border rounded-md ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-black"
              }`}
            />
            <button
              type="submit"
              disabled={loading}
              className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold w-full p-2 rounded-md transition-colors duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/sign-in" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
