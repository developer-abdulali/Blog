// import express from "express";
// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import User from "./Schema/User.js";
// import "dotenv/config";

// const server = express();
// let PORT = 3000;

// let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
// let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

// server.use(express.json());

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

// server.post("/signup", (req, res) => {
//   const { fullname, email, password } = req.body;

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
//         "Password should be 6 to 20 charactors along with a numeric, 1 lowercase and 1 uppercase letters",
//     });
//   }

//   bcrypt.hash(password, 10, (err, hashed_password) => {
//     let username = email.split("@")[0];
//     let user = new User({
//       personal_info: { fullname, email, password: hashed_password, username },
//     });

//     user
//       .save()
//       .then((u) => {
//         return res.status(200).json({ user: u });
//       })
//       .catch((err) => {
//         return res.status(500).json({ error: err.message });
//       });
//   });

//   return res.status(200).json({ status: "OK" });
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./Schema/User.js";
import "dotenv/config";

const server = express();
let PORT = 3000;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

server.use(express.json());

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

server.post("/signup", (req, res) => {
  const { fullname, email, password } = req.body;

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

  bcrypt.hash(password, 10, (err, hashed_password) => {
    if (err) {
      return res.status(500).json({ error: "Error hashing password" });
    }

    let username = email.split("@")[0];
    let user = new User({
      personal_info: { fullname, email, password: hashed_password, username },
    });

    user
      .save()
      .then((u) => {
        return res.status(200).json({ user: u });
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res.status(403).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: err.message });
      });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
