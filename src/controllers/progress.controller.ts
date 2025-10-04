import { Request, Response } from 'express';
import Progress from '../models/Progress';
import { AuthRequest } from '../middlewares/auth.middleware';

// Get progress of a roadmap
export const getProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { roadmapId } = req.params;
    const progress = await Progress.findOne({
      user: req.user!._id,
      roadmap: roadmapId,
    });
    res.json(progress || { completedSteps: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update completed steps
export const updateProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { roadmapId } = req.params;
    const { completedSteps } = req.body;

    let progress = await Progress.findOne({
      user: req.user!._id,
      roadmap: roadmapId,
    });

    if (!progress) {
      progress = await Progress.create({
        user: req.user!._id,
        roadmap: roadmapId,
        completedSteps,
      });
    } else {
      progress.completedSteps = completedSteps;
      await progress.save();
    }

    res.json(progress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
