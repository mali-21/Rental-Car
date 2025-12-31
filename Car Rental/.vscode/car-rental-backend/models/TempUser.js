// models/User.js
const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  loginTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TempUser", tempUserSchema);
