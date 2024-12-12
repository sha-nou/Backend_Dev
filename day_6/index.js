const express = require("express");
const user = require("./schema/user");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const users = [];

app.post("/user", (req, res) => {
  const { name, role } = req.body;
  try {
    if (!name) {
      res.status(400).send("field is required");
    }

    if (role === "Admin") res.send("welcome admin");
    newUser = new user({
      name,
      role,
    });

    users.push(newUser);
    res.status(201).send(newUser);
  } catch (error) {
    console.error("error occured");
    res.status(500).send("Internal server error");
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) return res.status(400).json({ message: "field required" });

    const existingUser = await user.findById(userId);
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    const delUser = await user.deleteOne({ _id: userId });
    res.status(200).json({ message: "User successfully deleted", delUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/user/:id", (req, res) => {
  try {
    const userId = req.params.id;
    const { name, role } = req.body;
    if (!userId) res.status(400).json({ message: "field required" });
    const existingUser = user.findById(userId);

    if (!existingUser) res.status(404).json({ message: "User not found" });

    const delUser = user.updateOne({
      _id: userId,
      $set: {
        name: name || existingUser.name,
        role: role || existingUser.role,
      },
    });
    res.status(200).json({ message: "User successfully deleted", delUser });
  } catch (error) {
    console.log("An error occured");
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
