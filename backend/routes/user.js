const express = require("express");
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const zod = require("zod");
const router = express.Router({ mergeParams: true });

const signupSchema = zod.object({
  username: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const changeDetailSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
  const { username, firstName, lastName, password } = req.body;

  // Validate request body
  const { success, error } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Input Fields are Incorrect",
    });
  }

  // Check if the user already exists
  const user = await User.findOne({ username });
  if (user) {
    return res.status(409).json({
      message: "Username Already Exists",
    });
  }

  // Create the new user
  const newUser = new User({
    username: username,
    firstName: firstName,
    lastName: lastName,
    password: password,
  });

  await newUser.save();

  // Create JWT token with expiration time (optional)
  const token = jwt.sign({ userId: newUser._id }, 
    JWT_SECRET);

  // Send success response with the token
  res.status(201).json({
    message: "User Created Successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Please Enter Valid Inputs",
    });
  }

  const { username, password } = req.body;

  const user = await User.findOne({
    username: username,
  });

  if (!user) {
    return res.status(409).json({
      message: "This Username Does Not Exists",
    });
  }
  if (user.password != password) {
    return res.status(409).json({
      message: "Password Does Not Match",
    });
  }

  const userId = user._id;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.status(200).json({
    message: "Signed In Successfully",
    token: token,
  });
});

router.post("/update", async (req, res) => {
  const { firstName, lastName } = req.body;
  const { success } = changeDetailSchema.safeParse(req.body);

  if (!success) {
    res.status(400).json({
      message: "Please Enter Valid Inputs",
    });
  }

  const userId = req.userId;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  const provideToken = req.headers["authorization"];
   if (provideToken != token) {
    res.status(400).json({
      message: "Please Provide Token",
    });
  }


  const updateduser = await User.updateOne({userId});

 

  res.status(200).json({
    message: "User Created Successfully",
    token: token,
  });
});

module.exports = router;
