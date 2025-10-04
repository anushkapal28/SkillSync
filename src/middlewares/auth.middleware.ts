import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export interface AuthRequest extends Request {
  user?: any;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Not authorized' });

  const token = header.split(' ')[1];
  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(payload.id).select('-password');
    if (!user) return res.status(401).json({ message: 'Not authorized' });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
