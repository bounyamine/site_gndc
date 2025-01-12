// src/config/database.ts
import mongoose from 'mongoose';

const connectDatabase = async (): Promise<void> => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/appdb';

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDatabase;
