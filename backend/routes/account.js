const express = require("express");
const { route } = require("./user");
const authMiddleware = require("../middleware");
const Account = require("../Models/account");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = Account.findOne({
    userId: req.userId,
  });

  res.status(200).json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const { id , amount} = req.body;
  const receivingAccount = Account.findOne({
    _id: id,
  });

  const sendingAccount = Account.findOne({
    userId: req.userId,
  });

  if (!receivingAccount) {
    res.json({
      message: "Account Does Not Exists",
    });

    if(receivingAccount.balance <= 0) {
        res.status().json({
      message: "Insufficient Balance",
    });
    }
  }
});
module.exports = router;
