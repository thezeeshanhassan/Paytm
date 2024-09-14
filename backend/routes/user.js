const express = require("express");
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const zod = require("zod");
const authMiddleware = require("../middleware");
const Account = require("../Models/account");

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
  password: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "User already taken/Incorrect inputs",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = user._id;

  // Account Creation
  const initialBalance = 1 + Math.random() * 1000;
  const account = new Account({
    userId,
    balance: initialBalance,
  });
  
  await account.save();

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
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

router.put("/update", authMiddleware, async (req, res) => {
  const { success } = changeDetailSchema.safeParse(req.body);

  if (!success) {
    res.status(400).json({
      message: "Please Enter Valid Inputs",
    });
  }

  const user = await User.findOneAndUpdate(
    {
      _id: req.userId,
    },
    req.body,
    { new: true }
  );
  res.status(200).json({
    message: "User Updated Successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
