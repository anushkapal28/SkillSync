import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import roadmapRoutes from './routes/roadmap.routes';
import adviceRoutes from './routes/advice.routes';
import { errorHandler } from './middlewares/error.middleware';
import { weeklyAdviceJob } from './jobs/weeklyAdvice.job';
weeklyAdviceJob();


dotenv.config();
console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/advice', adviceRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB
const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
  });
