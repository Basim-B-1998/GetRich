import { Request, Response } from 'express';
import Question from '../models/Question';

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { questionText } = req.body;
    const question = new Question({ questionText });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create question' });
  }
};

export const getActiveQuestions = async (_req: Request, res: Response) => {
  try {
    const questions = await Question.find({ status: 'open' });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};
