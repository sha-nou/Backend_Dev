const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const bcrypt = require("bcrypt");
const dbConnect = require("./db");
const router = require("./middleware/auth");
const User = require("./Model/user");
const Task = require("./Model/Task");
const jwt = require('jsonwebtoken')
// const router = require("./routes/taskRoute")

app.use(bodyParser.json());

dotenv.config();

dbConnect();

app.use("/user", router);

app.get("/", (req, res) => {
  res.send("hello world");
});

// create User
app.post("/register", async (req, res) => {
  const { username, email, password, role, tasks } = req.body;
  if (!username || !email || !password)
    res.status(400).json({ message: "required fields" });
  try {
    // hash password
    const salt = await bcrypt.genSalt();
    hashedPass = await bcrypt.hash(password, salt);

    const newuser = new User({
      username,
      email,
      password: hashedPass,
      role,
      tasks,
    });
    await newuser.save();

    res.status(201).json({ message: "User registered successfully", newuser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a new task
app.post("/task", async (req, res) => {
  try {
    const { title, description, dueDate, userId } = req.body;
    if (!title || !description || !dueDate || !userId)
      return res.status(400).json({ message: "All fields are required" });

    // Check if the user exists

    // Find the user by ID and check their role
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user);
    if (user.role !== "Admin") {
      // Check user role
      return res
        .status(403)
        .json({ message: "Unauthorized: Only Admins can create tasks" });
    }
    console.log(user.role);
    // Create a new task
    const newTask = new Task({ title, description, dueDate, userId });
    await newTask.save();
    user.tasks.push(newTask._id);

    return res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error", error });
  }
});

app.get("/task", (req, res) => {
  try {
    const getTask = Task.find();
    res.status(201).json({ message: "The different tasks here are ", getTask });
  } catch (error) {
    console.error("Something broke");
    return res.status(500).json({ message: "Internal Server Error " });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email ||!password) res.status(400).json('fields required')

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    let token = jwt.sign(
      { id: user._id, role: user.role },
      "setyehvyte76rgbhbfd9",
      { expiresIn: "2hrs" }
    );
    res.json({ message: "Logged In Successfully", token });
  } catch (error) {
    console.log(error.message)
  }
});

app.put("/task/:id",async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) res.status(400).json("please provide an id");

    const taskExist = await Task.findById(taskId);
    if (!taskExist) res.status(404).json("Task does not exist");

    const updateTask = req.body
    updateTask.title = req.body.title || taskExist.title;
    updateTask.description = req.body.description || taskExist.description;
    updateTask.dueDate = req.body.dueDate || taskExist.dueDate;

    return res.status(200).json({message:'task updated',updateTask})
  } catch (error) {
    console.log(error.message)
    res.status(500).json('Internal Server Error')
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
