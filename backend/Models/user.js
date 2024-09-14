const mongoose = require("mongoose");

const USER_SCHEMA = new mongoose.Schema({
  username: {
    type: String, // Corrected from 'Type' to 'type'
    unique: true,
  },
  firstName: {
    type: String, // Corrected from 'Type' to 'type'
  },
  lastName: {
    type: String, // Corrected from 'Type' to 'type'
  },
  password: {
    type: String, // Corrected from 'Type' to 'type'
  },
});

const User = mongoose.model("User", USER_SCHEMA);
module.exports = User;
