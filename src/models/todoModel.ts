import { Schema, model, Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  description: string;
}

const todoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export default model<ITodo>('Todo', todoSchema);
