const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  email: String,
  password: String,
  position: String,
  role: String,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };


