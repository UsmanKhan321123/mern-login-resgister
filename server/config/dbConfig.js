import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGO_DB_URI;

    if (!mongoUri) {
      throw new Error("Missing MongoDB connection string in environment");
    }

    const connection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`DB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;
