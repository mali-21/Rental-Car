const express = require("express");
const router = express.Router();
const User = require("../models/TempUser");

const bcrypt = require("bcrypt"); //  Import bcrypt
const saltRounds = 10; // Number of salt rounds for hashing

// SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      password: hashedPassword,
      loginTime: null,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered securely!" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    user.loginTime = new Date();
    await user.save();

    res.status(200).json({ message: "Login successful!" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed!" });
  }
});


module.exports = router;
