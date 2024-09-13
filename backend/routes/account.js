const express = require("express");
const { route } = require("./user");
const authMiddleware = require("../middleware");
const Account = require("../Models/account");
const { findOneAndUpdate, updateOne } = require("../Models/user");

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
  const { to, amount } = req.body;

  const toAccount = await Account.findOne({
    userId: to,
  });

  const fromAccount = await Account.findOne({
    userId: req.userId,
  });

  if (fromAccount.balance < amount) {
    return res.status(400).json({
      message: "Insufficient Balance",
      user : fromAccount
    });
  }

  if (!toAccount) {
    return res.status(400).json({
      message: "Account Does Not Exists",
    });
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    { $inc: { balance: -amount } }
  );

  await Account.updateOne(
    {
      userId: to,
    },
    { $inc: { balance: amount } }
  );

  return res.status(200).json({
    message: "Amount Successfully Sent",
  });
});
module.exports = router;
