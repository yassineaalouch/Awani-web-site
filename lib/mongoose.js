import mongoose from "mongoose";

export default function mongooseConnect() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection.asPromise();
    } else {
      const uri = process.env.MONGODB_URI;
      return mongoose.connect(uri);
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

