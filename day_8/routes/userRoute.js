const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../Model/user");

router.post("/admin", (req, res) => {
  const user = User;
  const UserRole = user.role;
  if (UserRole === "admin") {
    res.json({ message: "Admin access granted" });
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
});

const isAdmin = () => {
  const user = User.role;
  if (UserRole === "Admin") {
    res.json({ message: "Admin access granted" });
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports = router;
