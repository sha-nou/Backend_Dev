const User = require("../Model/user");
const Task = require("../Model/Task");
const express = require("express");
const router = express.Router();

// Middleware to parse JSON
router.use(express.json());

// Create a new task
router.post("/task", async (req, res) => {
  
  try {
    const { title, description, dueDate, userId } = req.body;
    if(!title || !description || !dueDate || !userId)
      return res.status(400).json({ message: "All fields are required" });

    // Check if the user exists

    // Find the user by ID and check their role
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "Admin") {
      // Check user role
      return res
        .status(403)
        .json({ message: "Unauthorized: Only Admins can create tasks" });
    }
    // Create a new task
    const newTask = new Task({ title, description, dueDate, user: user._id });
    await newTask.save();
    user.tasks.push(newTask._id)

    return res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
});



module.exports = router;
