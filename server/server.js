// import express from "express";
// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import User from "./Schema/User.js";
// import { nanoid } from "nanoid";
// import jwt from "jsonwebtoken";
// import cors from "cors";
// import "dotenv/config";
// import admin from "firebase-admin";
// import serviceAccountKey from "./mern-blog-website-37e90-firebase-adminsdk-8qxor-b35ead8339.json" assert { type: "json" };
// import { getAuth } from "firebase-admin/auth";

// const server = express();
// let PORT = 3000;

// let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
// let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

// server.use(express.json());

// // Enable CORS for specific origin
// server.use(
//   cors({
//     origin: "http://localhost:5173", // Allow requests from this URL
//     methods: "GET,POST", // Allow GET and POST requests
//     allowedHeaders: "Content-Type,Authorization", // Allow these headers
//   })
// );

// mongoose
//   .connect(process.env.DB_LOCATION, {
//     autoIndex: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB", err);
//   });

// const formatDataToSend = (user) => {
//   const access_token = jwt.sign({ id: user._id }, process.env.SERCRET_KEY);
//   return {
//     access_token,
//     profile_img: user.personal_info.profile_img,
//     username: user.personal_info.username,
//     fullname: user.personal_info.fullname,
//   };
// };

// const generateUsername = async (email) => {
//   let username = email.split("@")[0];
//   let isUsernameNotUnique = await User.exists({
//     "personal_info.username": username,
//   }).then((result) => result);

//   isUsernameNotUnique ? (username += nanoid().substring(0, 5)) : "";
//   return username;
// };

// server.post("/signup", (req, res) => {
//   let { fullname, email, password } = req.body;

//   // validation
//   if (fullname.length < 3) {
//     return res
//       .status(403)
//       .json({ error: "Fullname must be at least 3 characters long." });
//   }
//   if (!email.length) {
//     return res.status(403).json({ error: "Enter Email" });
//   }
//   if (!emailRegex.test(email)) {
//     return res.status(403).json({ error: "Invalid Email" });
//   }
//   if (!passwordRegex.test(password)) {
//     return res.status(403).json({
//       error:
//         "Password should be 6 to 20 characters long with a numeric, 1 lowercase, and 1 uppercase letter.",
//     });
//   }

//   bcrypt.hash(password, 10, async (err, hashed_password) => {
//     if (err) {
//       return res.status(500).json({ error: "Error hashing password" });
//     }

//     let username = await generateUsername(email);
//     let user = new User({
//       personal_info: { fullname, email, password: hashed_password, username },
//     });

//     user
//       .save()
//       .then((u) => {
//         return res.status(200).json(formatDataToSend(u));
//       })
//       .catch((err) => {
//         if (err.code === 11000) {
//           return res.status(403).json({ error: "Email already exists" });
//         }
//         return res.status(500).json({ error: err.message });
//       });
//   });
// });

// server.post("/signin", (req, res) => {
//   let { email, password } = req.body;

//   User.findOne({ "personal_info.email": email })
//     .then((user) => {
//       if (!user) {
//         return res.status(403).json({ error: "User not found" });
//       }

//       bcrypt.compare(password, user.personal_info.password, (err, result) => {
//         if (err) {
//           return res
//             .status(500)
//             .json({ error: "Error occurred while login, please try again" });
//         }

//         if (!result) {
//           return res.status(403).json({ error: "Incorrect password" });
//         } else {
//           return res.status(200).json(formatDataToSend(user));
//         }
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.status(500).json({ error: err.message });
//     });
// });

// server.post("/google-auth", async (req, res) => {
//   let { access_token } = req.body;

//   getAuth()
//     .verifyIdToken(access_token)
//     .then(async (decodedUser) => {
//       let { email, name, picture } = decodedUser;
//       picture = picture.replace("s-96-c", "s384-c");

//       let user = await User.findOne({ "personal_info.email": email })
//         .select(
//           "personal_info.fullname personal_info.username personal_info.profile_img google_auth"
//         )
//         .then((u) => {
//           return u || null;
//         })
//         .catch((err) => {
//           return res.status(500).json({ error: err.message });
//         });

//       if (user) {
//         //login
//         if (!user.google_auth) {
//           return res.status(403).json({
//             error:
//               "This email was signed up without google. Please login with email and password to access the account.",
//           });
//         } else {
//           let username = await generateUsername(email);

//           user = new User({
//             personal_info: {
//               fullname: name,
//               email,
//               profile_img: picture,
//               username,
//             },
//             google_auth: true,
//           });

//           await user
//             .save()
//             .then((u) => {
//               user = u;
//             })
//             .catch((err) => {
//               return res.status(500).json({ error: err.message });
//             });
//         }
//         return res.status(200).json(formatDataToSend(user));
//       }
//     })
//     .catch((err) => {
//       return res.status(500).json({
//         error:
//           "Failed to authenticate you with google. Try with some other google account",
//       });
//     });
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// good backend code
// import express from "express";
// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import User from "./Schema/User.js";
// import { nanoid } from "nanoid";
// import jwt from "jsonwebtoken";
// import cors from "cors";
// import "dotenv/config";
// import admin from "firebase-admin";
// import serviceAccountKey from "./mern-blog-website-37e90-firebase-adminsdk-8qxor-b35ead8339.json" assert { type: "json" };
// import { getAuth } from "firebase-admin/auth";
// import cloudinary from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import multer from "multer";

// const server = express();
// let PORT = 3000;

// // Initialize Firebase app
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccountKey),
//   databaseURL: "https://your-project-id.firebaseio.com",
// });

// let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
// let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

// server.use(express.json());

// // Enable CORS for specific origin
// server.use(
//   cors({
//     origin: "http://localhost:5173", // Allow requests from this URL
//     methods: "GET,POST", // Allow GET and POST requests
//     allowedHeaders: "Content-Type,Authorization", // Allow these headers
//   })
// );

// mongoose
//   .connect(process.env.DB_LOCATION, {
//     autoIndex: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB", err);
//   });

// // Cloudinary configuration
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Set up Cloudinary storage for multer
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary.v2,
//   params: {
//     folder: "blog_uploads", // Folder where the uploads will be stored in Cloudinary
//     allowedFormats: ["jpg", "png", "pdf"], // Allowed file types
//   },
// });

// // Set up multer with Cloudinary storage
// const upload = multer({ storage });

// const formatDataToSend = (user) => {
//   const access_token = jwt.sign({ id: user._id }, process.env.SERCRET_KEY);
//   return {
//     access_token,
//     profile_img: user.personal_info.profile_img,
//     username: user.personal_info.username,
//     fullname: user.personal_info.fullname,
//   };
// };

// const generateUsername = async (email) => {
//   let username = email.split("@")[0];
//   let isUsernameNotUnique = await User.exists({
//     "personal_info.username": username,
//   }).then((result) => result);

//   isUsernameNotUnique ? (username += nanoid().substring(0, 5)) : "";
//   return username;
// };

// server.post("/signup", (req, res) => {
//   let { fullname, email, password } = req.body;

//   // validation
//   if (fullname.length < 3) {
//     return res
//       .status(403)
//       .json({ error: "Fullname must be at least 3 characters long." });
//   }
//   if (!email.length) {
//     return res.status(403).json({ error: "Enter Email" });
//   }
//   if (!emailRegex.test(email)) {
//     return res.status(403).json({ error: "Invalid Email" });
//   }
//   if (!passwordRegex.test(password)) {
//     return res.status(403).json({
//       error:
//         "Password should be 6 to 20 characters long with a numeric, 1 lowercase, and 1 uppercase letter.",
//     });
//   }

//   bcrypt.hash(password, 10, async (err, hashed_password) => {
//     if (err) {
//       return res.status(500).json({ error: "Error hashing password" });
//     }

//     let username = await generateUsername(email);
//     let user = new User({
//       personal_info: { fullname, email, password: hashed_password, username },
//     });

//     user
//       .save()
//       .then((u) => {
//         return res.status(200).json(formatDataToSend(u));
//       })
//       .catch((err) => {
//         if (err.code === 11000) {
//           return res.status(403).json({ error: "Email already exists" });
//         }
//         return res.status(500).json({ error: err.message });
//       });
//   });
// });

// server.post("/signin", (req, res) => {
//   let { email, password } = req.body;

//   User.findOne({ "personal_info.email": email })
//     .then((user) => {
//       if (!user) {
//         return res.status(403).json({ error: "User not found" });
//       }

//       bcrypt.compare(password, user.personal_info.password, (err, result) => {
//         if (err) {
//           return res
//             .status(500)
//             .json({ error: "Error occurred while login, please try again" });
//         }

//         if (!result) {
//           return res.status(403).json({ error: "Incorrect password" });
//         } else {
//           return res.status(200).json(formatDataToSend(user));
//         }
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.status(500).json({ error: err.message });
//     });
// });

// server.post("/google-auth", async (req, res) => {
//   let { access_token } = req.body;

//   getAuth()
//     .verifyIdToken(access_token)
//     .then(async (decodedUser) => {
//       let { email, name, picture } = decodedUser;
//       picture = picture.replace("s-96-c", "s384-c");

//       let user = await User.findOne({ "personal_info.email": email })
//         .select(
//           "personal_info.fullname personal_info.username personal_info.profile_img google_auth"
//         )
//         .then((u) => {
//           return u || null;
//         })
//         .catch((err) => {
//           return res.status(500).json({ error: err.message });
//         });

//       if (user) {
//         //login
//         if (!user.google_auth) {
//           return res.status(403).json({
//             error:
//               "This email was signed up without google. Please login with email and password to access the account.",
//           });
//         } else {
//           let username = await generateUsername(email);

//           user = new User({
//             personal_info: {
//               fullname: name,
//               email,
//               profile_img: picture,
//               username,
//             },
//             google_auth: true,
//           });

//           await user
//             .save()
//             .then((u) => {
//               user = u;
//             })
//             .catch((err) => {
//               return res.status(500).json({ error: err.message });
//             });
//         }
//         return res.status(200).json(formatDataToSend(user));
//       }
//     })
//     .catch((err) => {
//       return res.status(500).json({
//         error:
//           "Failed to authenticate you with google. Try with some other google account",
//       });
//     });
// });

// // upload img url route
// server.post("/get-upload-url", upload.single("file"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }
//   return res.status(200).json({
//     message: "File uploaded successfully",
//     fileUrl: req.file.path,
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./Schema/User.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import cors from "cors";
import "dotenv/config";
import admin from "firebase-admin";
import serviceAccountKey from "./mern-blog-website-37e90-firebase-adminsdk-8qxor-b35ead8339.json" assert { type: "json" };
import { getAuth } from "firebase-admin/auth";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const server = express();
let PORT = 3000;

// Initialize Firebase app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: "https://your-project-id.firebaseio.com",
});

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

server.use(express.json());

// Enable CORS for specific origin
server.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this URL
    methods: "GET,POST", // Allow GET and POST requests
    allowedHeaders: "Content-Type,Authorization", // Allow these headers
  })
);

mongoose
  .connect(process.env.DB_LOCATION, {
    autoIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "blog_uploads", // Folder where the uploads will be stored in Cloudinary
    allowedFormats: ["jpg", "png", "pdf"], // Allowed file types
  },
});

// Set up multer with Cloudinary storage
const upload = multer({ storage });

const formatDataToSend = (user) => {
  const access_token = jwt.sign({ id: user._id }, process.env.SERCRET_KEY);
  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  };
};

const generateUsername = async (email) => {
  let username = email.split("@")[0];
  let isUsernameNotUnique = await User.exists({
    "personal_info.username": username,
  }).then((result) => result);

  isUsernameNotUnique ? (username += nanoid().substring(0, 5)) : "";
  return username;
};

server.post("/signup", (req, res) => {
  let { fullname, email, password } = req.body;

  // validation
  if (fullname.length < 3) {
    return res
      .status(403)
      .json({ error: "Fullname must be at least 3 characters long." });
  }
  if (!email.length) {
    return res.status(403).json({ error: "Enter Email" });
  }
  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Invalid Email" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase, and 1 uppercase letter.",
    });
  }

  bcrypt.hash(password, 10, async (err, hashed_password) => {
    if (err) {
      return res.status(500).json({ error: "Error hashing password" });
    }

    let username = await generateUsername(email);
    let user = new User({
      personal_info: { fullname, email, password: hashed_password, username },
    });

    user
      .save()
      .then((u) => {
        return res.status(200).json(formatDataToSend(u));
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res.status(403).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: err.message });
      });
  });
});

server.post("/signin", (req, res) => {
  let { email, password } = req.body;

  User.findOne({ "personal_info.email": email })
    .then((user) => {
      if (!user) {
        return res.status(403).json({ error: "User not found" });
      }

      bcrypt.compare(password, user.personal_info.password, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error occurred while login, please try again" });
        }

        if (!result) {
          return res.status(403).json({ error: "Incorrect password" });
        } else {
          return res.status(200).json(formatDataToSend(user));
        }
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.message });
    });
});

server.post("/google-auth", async (req, res) => {
  let { access_token } = req.body;

  getAuth()
    .verifyIdToken(access_token)
    .then(async (decodedUser) => {
      let { email, name, picture } = decodedUser;
      picture = picture.replace("s-96-c", "s384-c");

      let user = await User.findOne({ "personal_info.email": email })
        .select(
          "personal_info.fullname personal_info.username personal_info.profile_img google_auth"
        )
        .then((u) => {
          return u || null;
        })
        .catch((err) => {
          return res.status(500).json({ error: err.message });
        });

      if (user) {
        //login
        if (!user.google_auth) {
          return res.status(403).json({
            error:
              "This email was signed up without google. Please login with email and password to access the account.",
          });
        } else {
          let username = await generateUsername(email);

          user = new User({
            personal_info: {
              fullname: name,
              email,
              profile_img: picture,
              username,
            },
            google_auth: true,
          });

          await user
            .save()
            .then((u) => {
              user = u;
            })
            .catch((err) => {
              return res.status(500).json({ error: err.message });
            });
        }
        return res.status(200).json(formatDataToSend(user));
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error:
          "Failed to authenticate you with google. Try with some other google account",
      });
    });
});

// upload img url route
server.post("/get-upload-url", upload.array("banner"), (req, res) => {
  // Change 'file' to 'banner'
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const fileUrls = req.files.map((file) => file.path);

  console.log("Uploaded file URLs:", fileUrls); // Log the file URLs

  return res.status(200).json({
    message: "Files uploaded successfully",
    fileUrls: fileUrls,
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// import express from "express";
// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import User from "./Schema/User.js";
// import { nanoid } from "nanoid";
// import jwt from "jsonwebtoken";
// import cors from "cors";
// import "dotenv/config";
// import admin from "firebase-admin";
// import serviceAccountKey from "./mern-blog-website-37e90-firebase-adminsdk-8qxor-b35ead8339.json" assert { type: "json" };
// import { getAuth } from "firebase-admin/auth";
// import cloudinary from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import multer from "multer";

// const server = express();
// let PORT = 3000;

// // Initialize Firebase app
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccountKey),
//   databaseURL: "https://your-project-id.firebaseio.com",
// });

// let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
// let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

// server.use(express.json());

// // Enable CORS for specific origin
// server.use(
//   cors({
//     origin: "http://localhost:5173", // Allow requests from this URL
//     methods: "GET,POST", // Allow GET and POST requests
//     allowedHeaders: "Content-Type,Authorization", // Allow these headers
//   })
// );

// mongoose
//   .connect(process.env.DB_LOCATION, {
//     autoIndex: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB", err);
//   });

// // Cloudinary configuration
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Set up Cloudinary storage for multer
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary.v2,
//   params: {
//     folder: "blog_uploads", // Folder where the uploads will be stored in Cloudinary
//     allowedFormats: ["jpg", "png", "pdf"], // Allowed file types
//   },
// });

// // Set up multer with Cloudinary storage
// const upload = multer({ storage });

// const formatDataToSend = (user) => {
//   const access_token = jwt.sign({ id: user._id }, process.env.SERCRET_KEY);
//   return {
//     access_token,
//     profile_img: user.personal_info.profile_img,
//     username: user.personal_info.username,
//     fullname: user.personal_info.fullname,
//   };
// };

// const generateUsername = async (email) => {
//   let username = email.split("@")[0];
//   let isUsernameNotUnique = await User.exists({
//     "personal_info.username": username,
//   }).then((result) => result);

//   isUsernameNotUnique ? (username += nanoid().substring(0, 5)) : "";
//   return username;
// };

// server.post("/signup", (req, res) => {
//   let { fullname, email, password } = req.body;

//   // validation
//   if (fullname.length < 3) {
//     return res
//       .status(403)
//       .json({ error: "Fullname must be at least 3 characters long." });
//   }
//   if (!email.length) {
//     return res.status(403).json({ error: "Enter Email" });
//   }
//   if (!emailRegex.test(email)) {
//     return res.status(403).json({ error: "Invalid Email" });
//   }
//   if (!passwordRegex.test(password)) {
//     return res.status(403).json({
//       error:
//         "Password should be 6 to 20 characters long with a numeric, 1 lowercase, and 1 uppercase letter.",
//     });
//   }

//   bcrypt.hash(password, 10, async (err, hashed_password) => {
//     if (err) {
//       return res.status(500).json({ error: "Error hashing password" });
//     }

//     let username = await generateUsername(email);
//     let user = new User({
//       personal_info: { fullname, email, password: hashed_password, username },
//     });

//     user
//       .save()
//       .then((u) => {
//         return res.status(200).json(formatDataToSend(u));
//       })
//       .catch((err) => {
//         if (err.code === 11000) {
//           return res.status(403).json({ error: "Email already exists" });
//         }
//         return res.status(500).json({ error: err.message });
//       });
//   });
// });

// server.post("/signin", (req, res) => {
//   let { email, password } = req.body;

//   User.findOne({ "personal_info.email": email })
//     .then((user) => {
//       if (!user) {
//         return res.status(403).json({ error: "User not found" });
//       }

//       bcrypt.compare(password, user.personal_info.password, (err, result) => {
//         if (err) {
//           return res
//             .status(500)
//             .json({ error: "Error occurred while login, please try again" });
//         }

//         if (!result) {
//           return res.status(403).json({ error: "Incorrect password" });
//         } else {
//           return res.status(200).json(formatDataToSend(user));
//         }
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.status(500).json({ error: err.message });
//     });
// });

// server.post("/google-auth", async (req, res) => {
//   let { access_token } = req.body;

//   getAuth()
//     .verifyIdToken(access_token)
//     .then(async (decodedUser) => {
//       let { email, name, picture } = decodedUser;
//       picture = picture.replace("s-96-c", "s384-c");

//       let user = await User.findOne({ "personal_info.email": email })
//         .select(
//           "personal_info.fullname personal_info.username personal_info.profile_img google_auth"
//         )
//         .then((u) => {
//           return u || null;
//         })
//         .catch((err) => {
//           return res.status(500).json({ error: err.message });
//         });

//       if (user) {
//         //login
//         if (!user.google_auth) {
//           return res.status(403).json({
//             error:
//               "This email was signed up without google. Please login with email and password to access the account.",
//           });
//         } else {
//           let username = await generateUsername(email);

//           user = new User({
//             personal_info: {
//               fullname: name,
//               email,
//               profile_img: picture,
//               username,
//             },
//             google_auth: true,
//           });

//           await user
//             .save()
//             .then((u) => {
//               user = u;
//             })
//             .catch((err) => {
//               return res.status(500).json({ error: err.message });
//             });
//         }
//         return res.status(200).json(formatDataToSend(user));
//       }
//     })
//     .catch((err) => {
//       return res.status(500).json({
//         error:
//           "Failed to authenticate you with google. Try with some other google account",
//       });
//     });
// });

// // upload img url route
// // upload img url route
// server.post("/get-upload-url", upload.single("banner"), (req, res) => {
//   // Change 'file' to 'banner'
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }
//   return res.status(200).json({
//     message: "File uploaded successfully",
//     fileUrl: req.file.path,
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
