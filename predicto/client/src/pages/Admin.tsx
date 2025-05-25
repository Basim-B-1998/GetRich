import { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [questionText, setQuestionText] = useState('');
  const [status, setStatus] = useState<'open' | 'closed' | 'resolved'>('open');

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/questions`,
        { questionText, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Question created!');
      setQuestionText('');
    } catch (err) {
      console.error(err);
      alert('Failed to create question');
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Question</h2>
      <textarea
        value={questionText}
        onChange={e => setQuestionText(e.target.value)}
        placeholder="Enter question"
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleCreate}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Create
      </button>
    </div>
  );
};

export default Admin;
