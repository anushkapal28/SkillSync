import { Router } from 'express';
import { createRoadmap, getMyRoadmaps } from '../controllers/roadmap.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', auth, createRoadmap);
router.get('/', auth, getMyRoadmaps);

export default router;
