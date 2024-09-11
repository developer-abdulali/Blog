import React, { useContext, useRef } from "react";
import InputBox from "../components/input.component";
import GoolgeIcon from "../imgs/google.png";
import { Link, Navigate } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { Toaster, toast } from "react-hot-toast";
import { storeInSession } from "../common/session";
import axios from "axios";
import { UserContext } from "../App";

const UserAuthForm = ({ type }) => {
  const authForm = useRef();

  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  const userAuthThroughServer = (serverRoutes, formData) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + serverRoutes, formData)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data));
        setUserAuth(data);
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
        // console.log(response.data.error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoutes = type == "sign-in" ? "/signin" : "/signup";

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    // form data
    let form = new FormData(formElement);
    // let form = new FormData(authForm.current);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { fullname, email, password } = formData;

    // validation
    if (fullname) {
      if (fullname?.length < 3) {
        return toast.error("Fullname must be at least 3 characters long.");
      }
    }
    if (!email.length) {
      return toast.error("Enter Email");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Invalid Email");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase, and 1 uppercase letter."
      );
    }

    userAuthThroughServer(serverRoutes, formData);
  };

  return access_token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form id="formElement" className="w-[80%] max-w-[400px]">
          {/* <form ref={authForm} className="w-[80%] max-w-[400px]"> */}
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type == "sign-in" ? "Welcome Back" : "Join us today"}
          </h1>
          {type != "sign-in" ? (
            <InputBox
              name="fullname"
              type="text"
              placholder="Full Name"
              icon="fi-rr-user"
            />
          ) : (
            ""
          )}
          {/* email input */}
          <InputBox
            name="email"
            type="email"
            placholder="Email"
            icon="fi-rr-envelope"
          />
          {/* password input */}
          <InputBox
            name="password"
            type="password"
            placholder="Password"
            icon="fi-rr-key"
          />
          {/* submit button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn-dark center mt-14"
          >
            {type.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          {/* google sign-in button */}
          <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
            <img src={GoolgeIcon} alt="google" className="w-5" />
            continue with Google
          </button>

          {/* sign-up link or sign in links */}
          {type == "sign-in" ? (
            <p className="text-center mt-6 text-dark-grey text-xl">
              Don't have an account ?
              <Link to="/signup" className="underline text-black text-xl ml-1">
                Join us toady
              </Link>
            </p>
          ) : (
            <p className="text-center mt-6 text-dark-grey text-xl">
              Already a member ?{" "}
              <Link to="/signin" className="underline text-black text-xl ml-1">
                Sign in here.
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
