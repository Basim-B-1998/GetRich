import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion extends Document {
  questionText: string;
  options: string[]; // e.g., ["Yes", "No"]
  status: 'open' | 'closed' | 'resolved';
  correctOption?: string;
  totalBets: {
    userId: mongoose.Types.ObjectId;
    choice: string;
    amount: number;
  }[];
}

const QuestionSchema = new Schema<IQuestion>({
  questionText: { type: String, required: true },
  options: { type: [String], default: ['Yes', 'No'] },
  status: { type: String, enum: ['open', 'closed', 'resolved'], default: 'open' },
  correctOption: String,
  totalBets: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      choice: String,
      amount: Number
    }
  ]
});

export default mongoose.model<IQuestion>('Question', QuestionSchema);
