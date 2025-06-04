import express from 'express';
import { getUserData } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.get('/me', verifyToken, getUserData);

export default router;