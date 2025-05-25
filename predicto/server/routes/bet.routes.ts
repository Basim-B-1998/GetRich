import express from 'express';
import { placeBet } from '../controllers/bet.controller';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.post('/', verifyToken, placeBet);

export default router;
