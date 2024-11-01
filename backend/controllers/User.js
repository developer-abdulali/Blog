import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadPicture } from "../middlewares/uploadProfilePicMiddleware.js";
import { fileRemover } from "../utils/fileRemover.js";

// Sign up functionality
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with verified set to false
    const user = new User({
      name,
      email,
      password: hashedPassword,
      verified: false,
    });
    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     await user.save();

//     // Generate token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

//     return res.status(201).json({
//       _id: user._id,
//       avatar: user.avatar,
//       name: user.name,
//       email: user.email,
//       verified: user.verified,
//       admin: user.admin,
//       token,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: error.message });
//   }
// };

// Sign in functionality
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // Compare the hashed password with the entered password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const userData = {};

    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// Get user profile
export const userProfile = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    // const userIdToUpdate = req.params.userId;

    let userId = req.user._id;

    // if (!req.user.admin && userId !== userIdToUpdate) {
    //   let error = new Error("Forbidden resource");
    //   error.statusCode = 403;
    //   throw error;
    // }

    // let user = await User.findById(userIdToUpdate);
    let user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // if (typeof req.body.admin !== "undefined" && req.user.admin) {
    //   user.admin = req.body.admin;
    // }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password && req.body.password.length < 6) {
      throw new Error("Password length must be at least 6 character");
    } else if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUserProfile = await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      _id: updatedUserProfile._id,
      avatar: updatedUserProfile.avatar,
      name: updatedUserProfile.name,
      email: updatedUserProfile.email,
      verified: updatedUserProfile.verified,
      admin: updatedUserProfile.admin,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Update user profile picture
export const updateProfilePicture = async (req, res) => {
  try {
    const upload = uploadPicture.single("profilePicture");

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occurred when uploading: " + err.message
        );
        console.log(error);
        return res.status(500).json({ message: error.message });
      } else {
        // Everything went well
        const updatedUser = await User.findById(req.user._id);

        if (req.file) {
          // Remove previous avatar file if it exists
          if (updatedUser.avatar) {
            fileRemover(updatedUser.avatar);
          }

          // Set new avatar and save user
          updatedUser.avatar = req.file.filename;
          await updatedUser.save();
        } else {
          // No new file, clear the avatar if it exists
          if (updatedUser.avatar) {
            fileRemover(updatedUser.avatar);
            updatedUser.avatar = "";
            await updatedUser.save();
          }
        }

        // Generate token
        const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET);

        // Send the updated user data with the new token
        res.json({
          _id: updatedUser._id,
          avatar: updatedUser.avatar,
          name: updatedUser.name,
          email: updatedUser.email,
          verified: updatedUser.verified,
          admin: updatedUser.admin,
          token,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// export const updateProfilePicture = async (req, res) => {
//   try {
//     const upload = uploadPicture.single("profilePicture");

//     upload(req, res, async function (err) {
//       if (err) {
//         const error = new Error(
//           "An unknown error occured when uploading " + err.message
//         );
//         console.log(error);
//       } else {
//         // every thing went well
//         if (req.file) {
//           let filename;
//           let updatedUser = await User.findById(req.user._id);
//           filename = updatedUser.avatar;
//           if (filename) {
//             fileRemover(filename);
//           }
//           updatedUser.avatar = req.file.filename;
//           await updatedUser.save();

//           // Generate token
//           const token = jwt.sign(
//             { id: updatedUser._id },
//             process.env.JWT_SECRET
//           );
//           res.json({
//             _id: updatedUser._id,
//             avatar: updatedUser.avatar,
//             name: updatedUser.name,
//             email: updatedUser.email,
//             verified: updatedUser.verified,
//             admin: updatedUser.admin,
//             token,
//           });
//         } else {
//           let filename;
//           let updatedUser = await User.findById(req.user._id);
//           filename = updatedUser.avatar;
//           updatedUser.avatar = "";
//           await updatedUser.save();
//           fileRemover(filename);
//           // Generate token
//           const token = jwt.sign(
//             { id: updatedUser._id },
//             process.env.JWT_SECRET
//           );
//           res.json({
//             _id: updatedUser._id,
//             avatar: updatedUser.avatar,
//             name: updatedUser.name,
//             email: updatedUser.email,
//             verified: updatedUser.verified,
//             admin: updatedUser.admin,
//             token,
//           });
//         }
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(error.statusCode || 500).json({ message: error.message });
//   }
// };

export const getAllUsers = async (req, res) => {
  try {
    const filter = req.query.searchKeyword;
    let where = {};
    if (filter) {
      where.email = { $regex: filter, $options: "i" };
    }
    let query = User.find(where);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await User.find(where).countDocuments();
    const pages = Math.ceil(total / pageSize);

    res.header({
      "x-filter": filter,
      "x-totalcount": JSON.stringify(total),
      "x-currentpage": JSON.stringify(page),
      "x-pagesize": JSON.stringify(pageSize),
      "x-totalpagecount": JSON.stringify(pages),
    });

    if (page > pages) {
      return res.json([]);
    }

    const result = await query
      .skip(skip)
      .limit(pageSize)
      .sort({ updatedAt: "desc" });

    return res.json(result);
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);

    if (!user) {
      throw new Error("User no found");
    }

    const postsToDelete = await Post.find({ user: user._id });
    const postIdsToDelete = postsToDelete.map((post) => post._id);

    await Comment.deleteMany({
      post: { $in: postIdsToDelete },
    });

    await Post.deleteMany({
      _id: { $in: postIdsToDelete },
    });

    postsToDelete.forEach((post) => {
      fileRemover(post.photo);
    });

    await user.remove();
    fileRemover(user.avatar);

    res.status(204).json({ message: "User is deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
