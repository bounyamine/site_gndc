// src/models/project.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  contributors: mongoose.Types.ObjectId[];
  status: 'active' | 'completed' | 'paused';
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: [String], required: true },
  githubUrl: { type: String },
  contributors: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['active', 'completed', 'paused'], default: 'active' },
  imageUrl: { type: String, default: 'https://placehold.co/600x400@3x.png' },
});

export default mongoose.model<IProject>('Project', ProjectSchema);
