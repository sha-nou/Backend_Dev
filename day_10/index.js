const mysql = require("mysql2");

const newCon = mysql.createConnection(
  {
    host: "localhost",
    user: "shanelle",
    password: "",
    database: "newDB",
  }
)
newCon.on("error", (err) => {
  console.error("Database error:", err);
});
