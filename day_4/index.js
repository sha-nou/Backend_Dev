const express = require("express");
const bodyParser = require("body-parser");
const serveStatic = require("serve-static");
const path = require('path')


const app = express();
app.use(bodyParser.json());
app.use(
  serveStatic(path.join(__dirname,'public'))
);

let users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/user", (req, res) => {
  try {
    const name = req.body;
    users.push(name); // Just push the new user object
    res.status(201).json(name);
    console.log("New user added:", name);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

const PORT = 4000; // Use uppercase for constants
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
