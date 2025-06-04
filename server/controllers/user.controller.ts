import { Request, Response } from 'express';
import User from '../models/User';

// controllers/user.controller.ts
export const getUserData = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user!.id)
      .populate('bets.questionId', 'questionText status correctOption');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return; // Explicit return
    }

    res.status(200).json({
      wallet: user.walletBalance,
      activeBets: user.bets.filter(b => b.status === 'pending'),
      betHistory: user.bets.filter(b => b.status !== 'pending')
    });
    return; // Explicit return
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user data' });
    return; // Explicit return
  }
};