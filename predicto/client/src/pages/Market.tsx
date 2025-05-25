import { useEffect, useState } from 'react';
import axios from 'axios';
import { Question } from '../types/Question';

const Market = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/questions/active`)
      .then(res => setQuestions(res.data));
  }, []);

const handleBet = async (questionId: string, choice: string) => {
  const amount = parseInt(prompt(`Enter amount to bet on ${choice}`) || '0');
  if (!amount) return;

  const token = localStorage.getItem('token');
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/bets`,
      { questionId, choice, amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('Bet placed! New wallet balance: ' + res.data.wallet);
  } catch (err: any) {
    alert(err.response?.data?.message || 'Bet failed');
  }
};


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Live Questions</h2>
      {questions.map(q => (
        <div key={q._id} className="border p-2 my-2 rounded shadow">
          <p>{q.questionText}</p>
          <div className="flex gap-2 mt-2">
            {q.options.map(opt => (
              <button
                 key={opt} 
                 onClick={() => handleBet(q._id, opt)}
                 className="px-4 py-1 bg-blue-500 text-white rounded" 
                 >
                Bet {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Market;
