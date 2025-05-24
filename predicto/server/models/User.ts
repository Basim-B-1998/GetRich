import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  walletBalance: number;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  walletBalance: { type: Number, default: 1000 }
});

export default mongoose.model<IUser>('User', UserSchema);
