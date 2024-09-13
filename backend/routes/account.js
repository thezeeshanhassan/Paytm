const express = require("express");
const { route } = require("./user");
const authMiddleware = require("../middleware");
const Account = require("../Models/account");
const { findOneAndUpdate, updateOne } = require("../Models/user");
const { mongo, default: mongoose } = require("mongoose");


const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.status(200).json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  //Creating Session
  const session = await mongoose.startSession();
  session.startTransaction();

  const { to, amount } = req.body;
  // Find Recevier Account
  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);
  // Find Sender Account
  const fromAccount = await Account.findOne({
    userId: req.userId,
  }).session(session);

  if (fromAccount.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient Balance",
      user: fromAccount,
    });
  }

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Account Does Not Exists",
    });
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransetion();
  return res.status(200).json({
    message: "Amount Successfully Sent",
  });
});
module.exports = router;
