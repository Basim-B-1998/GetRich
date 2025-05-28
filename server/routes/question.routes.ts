import express from 'express';
import { createQuestion, getActiveQuestions,  } from '../controllers/question.controller';
import { resolveQuestion } from '../controllers/question.controller';
import { verifyToken, isAdmin } from '../middlewares/auth';

const router = express.Router();

router.post('/', verifyToken, isAdmin, createQuestion);  // ✅ Protected
router.get('/active', getActiveQuestions);               // ✅ Public
router.patch('/resolve/:questionId', verifyToken, isAdmin, resolveQuestion);


export default router;
