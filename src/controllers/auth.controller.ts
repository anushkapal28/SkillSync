import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET not found!");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, name, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET not found!");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' });

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
