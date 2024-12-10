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
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
