const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../Model/user");
const bcrypt= require('bcrypt')

// User authentication

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // hash password
    const salt = await bcrypt.genSalt();
    hashedPass = await bcrypt.hash(password, salt);

    const newuser = new User({ username, email, password: hashedPass,role,tasks });
    await newuser.save();

    res.status(201).json({ message: "User registered successfully", newuser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, async (err, user) => {
    if (err) return res.status(500).json({ message: "Server Error" });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    let token = jwt.sign(
      { id: user._id, role: user.role },
      "setyehvyte76rgbhbfd9",
      { expiresIn: "2hrs" }
    );

    res.json({ message: "Logged In Successfully", token });
  });
});

module.exports = router;
