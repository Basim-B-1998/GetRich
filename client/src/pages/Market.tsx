import { useEffect, useState } from 'react';
import axios from 'axios';


interface Question {
  _id: string;
  questionText: string;
  options: string[];
  status: string;
}

const Market = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/questions/active`)
      .then(res => setQuestions(res.data));
  }, []);

const handleBet = async (questionId: string, choice: string) => {
  const amount = parseInt(prompt(`Enter amount to bet on ${choice}`) || '0');
  if (!amount) return;

  const token = localStorage.getItem('token');
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/bets`,
      { questionId, choice, amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('Bet placed! New wallet balance: ' + res.data.wallet);
  } catch (err: any) {
    alert(err.response?.data?.message || 'Bet failed');
  }
};

 return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          🔮 Live Prediction Markets
        </h1>

        {questions.length === 0 ? (
          <p className="text-center text-gray-500">No active questions available.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {questions.map((q) => (
              <div
                key={q._id}
                className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 transition hover:shadow-xl"
              >
                <p className="text-lg font-semibold text-gray-800">{q.questionText}</p>

                <div className="mt-4 flex flex-wrap gap-3">
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleBet(q._id, opt)}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm font-medium transition-all"
                    >
                      Bet on {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};



//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold">Live Questions</h2>
//       {questions.map(q => (
//         <div key={q._id} className="border p-2 my-2 rounded shadow">
//           <p>{q.questionText}</p>
//           <div className="flex gap-2 mt-2">
//             {q.options.map(opt => (
//               <button
//                  key={opt} 
//                  onClick={() => handleBet(q._id, opt)}
//                  className="px-4 py-1 bg-blue-500 text-white rounded" 
//                  >
//                 Bet {opt}
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

export default Market;
