const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require('./Model/user')

// User authentication

router.post("/user", (req, res) => {
  const { username, email, password } = req.body;
//   validating user data
  body("usermane")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters"),
    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Username must be at least 8 characters long ");

try{
           const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }

       const user = new User({username,email,password})
       user.save()

       return res.status(201).json({message:'successfull registeration',user})
}catch(error){
    console.error(error)
    res.status(500).json({message:'Internal Server error'})
}
});

module.exports = router;
