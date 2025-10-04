import { Request, Response } from 'express';
import Roadmap from '../models/Roadmap';
import { generateRoadmap } from '../services/openai.service';
import { AuthRequest } from '../middlewares/auth.middleware';

// Create AI-generated roadmap
export const createRoadmap = async (req: AuthRequest, res: Response) => {
  try {
    const { goal } = req.body;
    if (!goal) return res.status(400).json({ message: 'Goal is required' });

    const steps = await generateRoadmap(goal);

    const roadmap = await Roadmap.create({
      user: req.user!._id,
      goal,
      steps,
    });

    res.json(roadmap);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all roadmaps of logged-in user
export const getMyRoadmaps = async (req: AuthRequest, res: Response) => {
  try {
    const roadmaps = await Roadmap.find({ user: req.user!._id });
    res.json(roadmaps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
