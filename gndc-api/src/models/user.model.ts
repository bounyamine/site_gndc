// src/models/user.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'member';
  expertise: string[];
  city: string;
  joinedAt: Date;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'member'], default: 'member' },
  expertise: { type: [String], default: [] },
  city: { type: String },
  joinedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', UserSchema);
