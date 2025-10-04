import mongoose, { Schema, Document } from 'mongoose';

export interface IRoadmap extends Document {
  user: mongoose.Schema.Types.ObjectId;
  goal: string;
  steps: string[]; // Each step in the learning roadmap
  createdAt: Date;
  updatedAt: Date;
}

const RoadmapSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    goal: { type: String, required: true },
    steps: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IRoadmap>('Roadmap', RoadmapSchema);
