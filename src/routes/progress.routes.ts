import { Router } from 'express';
import { getProgress, updateProgress } from '../controllers/progress.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/:roadmapId', auth, getProgress);
router.put('/:roadmapId', auth, updateProgress);

export default router;
