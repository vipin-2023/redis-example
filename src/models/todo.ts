import mongoose, { Schema, Document } from 'mongoose';

export interface TodoInterface extends Document {
  title: string;
  description: string;
}

const TodoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<TodoInterface>('Todo', TodoSchema);
