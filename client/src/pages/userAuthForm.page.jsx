import React from "react";
import InputBox from "../components/input.component";
import GoolgeIcon from "../imgs/google.png";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";

const UserAuthForm = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form className="w-[80%] max-w-[400px]">
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
          <button type="submit" className="btn-dark center mt-14">
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
