import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  category: string;
  tags: string[];
  comments: string[];
  publishedAt: Date;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  tags: { type: [String], default: [] },
  comments: { type: [String], default: [] },
  publishedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPost>('Post', PostSchema);
