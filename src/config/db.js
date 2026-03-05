import mongoose from "mongoose";

let connectionPromise;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  try {
    connectionPromise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    await connectionPromise;

    console.log("MongoDB connected");
    return mongoose.connection;
  } catch (error) {
    connectionPromise = undefined;
    console.error("Database connection failed", error.message);
    throw error;
  }
};

export default connectDB;
