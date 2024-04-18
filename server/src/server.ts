import app from "./app.js";
import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";

config();

const port = process.env.PORT;
const mongodb_URI = process.env.MONGODB_URI as string;

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(mongodb_URI);
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server has started on ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

connectDB();
