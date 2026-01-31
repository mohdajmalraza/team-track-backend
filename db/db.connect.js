const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const initializeDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed: ", error.message);
    process.exit(1); // Stop app if DB fails
  }
};

module.exports = { initializeDatabase };
