const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {UserModel} = require("../Models/user.model");
const crypto = require('crypto');


router.get("/userslist", async (req, res) => {
  try {
    // Find all users in the UserModel, excluding _id and password fields
    const users = await UserModel.find({});

    // Respond with a JSON object containing the users
    return res.status(200).json({ users });
  } catch (error) {
    // Handle any errors that occur during the process
    return res.status(500).json({ error: error.message });
  }
});


// Assuming you have a UserModel defined somewhere...

// Edit user route
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, password, position, role } = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { username, email, password, position, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Delete user route
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


// POST route for user signup
router.post("/signup", async (req, res) => {
  try {
    const { id, username, email, password, position, role } = req.body;

    // Check if the user with the provided email already exists
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(401).json({ msg: "User already exists" });
    }

    // Hash the password using the crypto module
    const salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    // Create a new user with the hashed password
    const newUser = new UserModel({
      id,
      username,
      email,
      password: `${hash}.${salt}`, // Store both the hash and salt
      position,
      role,
    });

    await newUser.save();
    return res.status(200).json({ msg: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


// POST route for user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      // Separate the stored hash and salt
      const [storedHash, salt] = existingUser.password.split('.');

      // Hash the provided password with the same salt
      const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

      if (hash === storedHash) {
        try {
          // Generate a JWT token for authentication
          const token = jwt.sign({ userID: existingUser._id }, "masai", {
            expiresIn: "7d",
          });

          const refreshToken = jwt.sign(
            { userID: existingUser._id },
            "masai",
            { expiresIn: "7d" }
          );

          return res.status(200).json({
            msg: "Login success",
            token,
            refreshToken,
          });
        } catch (err) {
          return res.status(400).json({ error: err.message });
        }
      }
      return res.status(400).json({ error: "Login failed, wrong password" });
    } else {
      return res.status(400).json({ error: "Login failed, user not found" });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = {router};
