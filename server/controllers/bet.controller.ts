import { Request, Response } from 'express';
import Question from '../models/Question';
import User from '../models/User';
import mongoose from 'mongoose';

export const placeBet = async (req: Request, res: Response): Promise<void> => {

  try {
    const userId = new mongoose.Types.ObjectId(req.user!.id);
    const { questionId, choice, amount } = req.body;

    const user = await User.findById(userId);
    if (!user){
      res.status(404).json({ message: 'User not found' });
    return
  }

    const question = await Question.findById(questionId);
    if (!question || question.status !== 'open'){
      res.status(400).json({ message: 'Invalid or closed question' });
      return 
    }

    // Check if already bet on this question
    const alreadyBet = user.bets.some(b => b.questionId.equals(questionId));
    if (alreadyBet){
      res.status(400).json({ message: 'Already bet on this question' });
       return 
    }

    if (user.walletBalance < amount){
      res.status(400).json({ message: 'Insufficient balance' });
      return 
    }
      

    // Deduct wallet
    user.walletBalance -= amount;

    // Add to user's bets
    user.bets.push({ questionId, choice, amount, status: 'pending' });

    // Add to question's totalBets
    question.totalBets.push({ userId, choice, amount });

    await user.save();
    await question.save();

    res.status(200).json({ message: 'Bet placed successfully', wallet: user.walletBalance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to place bet' });
  }
};
