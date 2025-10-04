import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { generateAdvice } from '../services/openai.service';

// Get AI advice for a user
export const getAdvice = async (req: AuthRequest, res: Response) => {
  try {
    const { goal } = req.query;
    if (!goal) return res.status(400).json({ message: 'Goal is required' });

    const advice = await generateAdvice(goal as string);
    res.json({ advice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


 /* "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },*/