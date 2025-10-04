import { Router } from 'express';
import { getAdvice } from '../controllers/advice.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', auth, getAdvice);

export default router;
