require("dotenv").config(); // Load variables from .env

// Core Module
const path = require("path");

// External Modules
const express = require("express");
const mongoose = require("mongoose"); // no need for default import
const cors = require("cors");

// Local Modules
const errorController = require("./controllers/error");
const todoItemsRouter = require("./routes/todoItemsRouter");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/todo", todoItemsRouter);

// 404 error handler
app.use(errorController.pageNotFound);

// Use PORT and DB_PATH from .env
const PORT = process.env.PORT || 3000;
const DB_PATH = process.env.MONGO_URI;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
