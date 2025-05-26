import { isAdmin } from '../middlewares/auth';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  walletBalance: number;
  isAdmin: boolean;
  bets: {
    questionId: mongoose.Types.ObjectId;
    choice: string;
    amount: number;
    status: 'pending' | 'won' | 'lost';
  }[];
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  walletBalance: { type: Number, default: 1000 },
  isAdmin: { type: Boolean, default: false },

  bets: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      choice: { type: String, required: true },
      amount: { type: Number, required: true },
      status: { type: String, enum: ['pending', 'won', 'lost'], default: 'pending' }
    }
  ]
});

export default mongoose.model<IUser>('User', UserSchema);
