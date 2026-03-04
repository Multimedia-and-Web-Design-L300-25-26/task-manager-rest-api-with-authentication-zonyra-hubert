import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../src/config/db.js";

dotenv.config();

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }

  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});
