const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const mongoose = require("mongoose");
const User = require("./schemas/user");

app.use(bodyParser.json());

dotenv.config();
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};
connectToDatabase();

const createToken = (id) => {
  return jwt.sign({ id }, "hgfdh");
};

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // hash password
    const salt = await bcrypt.genSalt();
    hashedPass = await bcrypt.hash(password, salt);

    const newuser = new User({ username, email, password: hashedPass });
    await newuser.save();

    res.status(201).json({ message: "User registered successfully", newuser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare user password
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return res.status(400).json({ message: "Password invalid" });
    }

    const token = createToken(user._id);
    return res.status(200).json({message:"login successfull", token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("hello world");
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
