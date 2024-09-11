const mongoose = require("mongoose");

const USER_SCHEMA = new mongoose.Schema({
  username: {
    Type: String,
    require: true,
    unique: true,
  },
  firstName: {
    Type: String,
    require: true,
  },
  lastName: {
    Type: String,
    require: true,
  },
  password: {
    Type: String,
    require: true,
  },
});

const User = mongoose.model("User", USER_SCHEMA);
module.exports = User;
