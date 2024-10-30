import { Link, useNavigate } from "react-router-dom";
import SVG from "../../assets/signup.svg";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import OAuth from "../../components/OAuth/OAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme.theme);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = { email, password };

      if (!email || !password) {
        toast.error("All fields are required");
        return;
      }
      dispatch(signInStart());
      const res = await axios.post(`api/auth/signin`, formData);
      dispatch(signInSuccess(res.data.userData));
      toast.success(res.data.message);
      dispatch(signInFailure());
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
      dispatch(signInFailure(error.response?.data?.message));

      // Clear form data
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div
      className={`flex h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      } text-gray-900 dark:text-white`}
    >
      {/* Left Panel */}
      <div className="hidden lg:flex items-center justify-center flex-1">
        <div className="max-w-md text-center">
          <img src={SVG} alt="svg" />
        </div>
      </div>
      {/* Right Panel */}
      <div
        className={`w-full lg:w-1/2 flex items-center justify-center ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-center">Sign In</h1>
          <h1 className="text-sm font-semibold mb-6 text-center text-gray-500 dark:text-gray-400">
            Join Our Community with all-time access and for free
          </h1>
          {/* OAuth Component */}
          <OAuth />
          <div className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            <p>or with email</p>
          </div>
          <form onSubmit={submitHandler} className="space-y-4">
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
              className="p-2 w-full border rounded-md transition-colors duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
              className="p-2 w-full border rounded-md transition-colors duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-pink-500 hover:to-purple-500 w-full p-2 rounded-md transition-colors duration-300"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <div className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            <p>
              {`Don't have an account?`}{" "}
              <Link
                to="/sign-up"
                className="text-black dark:text-white hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
