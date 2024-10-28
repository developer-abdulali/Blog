import { Link, useNavigate } from "react-router-dom";
import SVG from "../../assets/signup.svg";
import { FaGithub, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(error);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        email,
        password,
      };

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

      //clear the form data
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        <div className="max-w-md text-center">
          <img src={SVG} alt="svg" />
        </div>
      </div>
      {/* Right Panel */}
      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Sign In
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Join to Our Community with all time access and free
          </h1>
          <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-1/2 mb-2 lg:mb-0">
              <button
                type="button"
                className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
              >
                <FaGoogle className="w-4" />
                Sign Up with Google
              </button>
            </div>
            <div className="w-full lg:w-1/2 ml-0 lg:ml-2">
              <button
                type="button"
                className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
              >
                <FaGithub className="w-4" />
                Sign Up with Github
              </button>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>or with email</p>
          </div>
          <form onSubmit={submitHandler} className="space-y-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 w-full border rounded-md transition-colors duration-300"
            />
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 w-full border rounded-md transition-colors duration-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-pink-500 hover:to-purple-500 w-full bg-black p-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              {`Don't have an account ?`}{" "}
              <Link to="/sign-up" className="text-black hover:underline">
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
