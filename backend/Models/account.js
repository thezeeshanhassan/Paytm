const mongoose = require("mongoose");
const User = require("./user");

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  balance: {
    type: Number,
    require: true,
  },
});

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
