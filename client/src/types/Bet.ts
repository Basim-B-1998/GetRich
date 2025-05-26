export interface Bet {
  questionId: string;
  choice: string;
  amount: number;
  status: 'pending' | 'won' | 'lost';
}
