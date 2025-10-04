import mongoose, { Schema, Document } from 'mongoose';

export interface IProgress extends Document {
  user: mongoose.Schema.Types.ObjectId;
  roadmap: mongoose.Schema.Types.ObjectId;
  completedSteps: string[];
  updatedAt: Date;
}

const ProgressSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roadmap: { type: mongoose.Schema.Types.ObjectId, ref: 'Roadmap', required: true },
    completedSteps: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IProgress>('Progress', ProgressSchema);
