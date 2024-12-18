const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

const dbConnect= async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = dbConnect