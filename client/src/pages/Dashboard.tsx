import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSocket } from '../context/SocketContext';
import { Bet } from '../types/Bet';

interface DashboardData {
  wallet: number;
  activeBets: Bet[];
  betHistory: Bet[];
}

const Dashboard = () => {
  const socket = useSocket();
  const [data, setData] = useState<DashboardData | null>(null);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setData(res.data);
  };

  useEffect(() => {
    // Initial data fetch
    fetchData();

    // 🔥 Wallet balance update
    socket?.on('bet_placed', ({ newBalance }: { newBalance: number }) => {
      setData(prev => prev ? { ...prev, wallet: newBalance } : null);
    });

    // 🔥 Bet status update on resolution
    socket?.on('question_resolved', ({ questionId, correctOption }: { questionId: string; correctOption: string }) => {
      setData(prev => {
        if (!prev) return null;
        const updatedBets = prev.activeBets.map(bet =>
          bet.questionId._id === questionId
            ? { ...bet, status: bet.choice === correctOption ? 'won' : 'lost' }
            : bet
        );
        return { ...prev, activeBets: updatedBets };
      });
    });

    return () => {
      socket?.off('bet_placed');
      socket?.off('question_resolved');
    };
  }, [socket]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Dashboard</h1>

      {/* Wallet */}
      <div className="bg-blue-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold">Wallet Balance</h2>
        <p className="text-3xl mt-2">${data.wallet.toLocaleString()}</p>
      </div>

      {/* Active Bets */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Active Bets</h2>
        {data.activeBets.length === 0 ? (
          <p className="text-gray-600">No active bets.</p>
        ) : (
          <div className="space-y-3">
            {data.activeBets.map((bet) => (
              <div key={bet._id} className="border p-3 rounded-lg bg-white">
                <p className="font-medium">{bet.questionId.questionText}</p>
                <div className="flex justify-between mt-2">
                  <span>Bet: {bet.choice} (${bet.amount})</span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      bet.status === 'won'
                        ? 'bg-green-100 text-green-800'
                        : bet.status === 'lost'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {bet.status?.toUpperCase() || 'PENDING'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bet History */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Bet History</h2>
        {data.betHistory.length === 0 ? (
          <p className="text-gray-600">No bet history yet.</p>
        ) : (
          <div className="space-y-3">
            {data.betHistory.map((bet) => (
              <div key={bet._id} className="border p-3 rounded-lg bg-white">
                <p className="font-medium">{bet.questionId.questionText}</p>
                <div className="flex justify-between mt-2">
                  <span>
                    Bet: {bet.choice} (${bet.amount}) →{' '}
                    {bet.questionId.correctOption === bet.choice ? 'Won' : 'Lost'}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      bet.status === 'won'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {bet.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
