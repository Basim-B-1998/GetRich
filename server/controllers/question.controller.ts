import { Request, Response } from 'express';
import Question from '../models/Question';
import User from '../models/User';
import mongoose from 'mongoose';

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { questionText } = req.body;
    const question = new Question({ questionText });
    await question.save();

      // Emit to all clients
    io.emit('new_question', question);

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

export const resolveQuestion = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params;
    const { correctOption } = req.body;

    const question = await Question.findById(questionId);
    if (!question || question.status !== 'open') {
       res.status(400).json({ message: 'Invalid or already resolved question' });
       return
    }

       //  Notify all clients
    io.emit('question_resolved', {
      questionId: question._id,
      correctOption,
      winners: winners.map(w => w.userId)
    });

       res.status(200).json({ message: 'Question resolved' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to resolve question' });
  }

    // Get all winning bets
    const winners = question.totalBets.filter(bet => bet.choice === correctOption);
    const totalPool = question.totalBets.reduce((acc, bet) => acc + bet.amount, 0);
    const totalWinningAmount = winners.reduce((acc, bet) => acc + bet.amount, 0);

    for (const winner of winners) {
      const user = await User.findById(winner.userId);
      if (!user) continue;

      const userBet = user.bets.find(b => b.questionId.equals(question._id as mongoose.Types.ObjectId));
       if (userBet) {
        const payout = (winner.amount / totalWinningAmount) * totalPool;
        user.walletBalance += Math.floor(payout); // Floor to avoid decimals
        userBet.status = 'won';
      }

      await user.save();
    }

    // Mark other bets as lost
    const losers = question.totalBets.filter(b => b.choice !== correctOption);
    for (const loser of losers) {
      const user = await User.findById(loser.userId);
      if (!user) continue;

      const userBet = user.bets.find(b => b.questionId.equals(question._id as mongoose.Types.ObjectId));
      if (userBet) {
        userBet.status = 'lost';
      }

      await user.save();
    }

    await question.save();
    res.status(200).json({ message: 'Question resolved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to resolve question' });
  }
};
