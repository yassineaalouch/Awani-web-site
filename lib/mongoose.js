import mongoose from "mongoose";

export default function mongooseConnect() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection.asPromise();
    } else {
      const uri = process.env.MONGODB_URI || 'mongodb+srv://awaniimlil:awaniPassword123@cluster0.pes38.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
      return mongoose.connect(uri);
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

