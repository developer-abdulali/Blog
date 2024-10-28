import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// sign up functionality
export const signUp = async (req, res, next) => {
  try {
    const { fullName, username, email, password } = req.body;

    // validation
    if (
      !fullName ||
      !username ||
      !email ||
      !password ||
      fullName.length === 0 ||
      username.length === 0 ||
      email.length === 0 ||
      password.length === 0
    ) {
      next(errorHandler(400, "All fields are required"));
    }
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const user = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    res.json({ user, message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

// sign in functionality
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password || email.length === 0 || password.length === 0) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(400, "User not found"));
    }

    // compare the hashed password with the entered password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    // generate token
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password: pass, ...userData } = user._doc;

    // set token as cookie
    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({ userData, message: "Signing in successfully" });
  } catch (error) {
    next(error);
  }
};
