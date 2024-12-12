const express = require ('express')
const router = express.Router()
const User = require('../schemas/user')



router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/user/:id", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router
