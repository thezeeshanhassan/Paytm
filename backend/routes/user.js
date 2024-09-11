const express = require("express");
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const router = express.Router({ mergeParams: true });
const { JWT_SECRET } = require("../config");

const signupSchema = new zod.object({
  username: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signinSchema = new zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { username, firstName, lastName, password } = req.body;
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Username Already Exists / Input Fields are Incorrect",
    });
  }

  const user = User.findOne({
    username: username,
  });

  if (user) {
    return res.status(411).json({
      message: "Username Already Exists / Input Fields are Incorrect",
    });
  }

  const newUser = new User({
    username: username,
    firstName: firstName,
    lastName: lastName,
    password: password,
  });
  await newUser.save();

  const userId = newUser._id;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.status(200).json({
    message: "User Created Successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);
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
    return res.status(411).json({
      message: "This Username Does Not Exists",
    });
  }
  if (user.password != password) {
    return res.status(411).json({
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
  const { username, firstName, lastName, password } = req.body;
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Username Already Exists / Input Fields are Incorrect",
    });
  }

  const user = User.findOne({
    username: username,
  });

  if (!user) {
    return res.status(411).json({
      message: "This Username Does Not Exists",
    });
  }
  
  user.firstName = firstName;
  user.lastName = lastName;
  
  await user.save();

  const userId = newUser._id;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.status(200).json({
    message: "User Created Successfully",
    token: token,
  });
});
