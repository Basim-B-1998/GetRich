import { useState, useEffect } from 'react';
import axios from 'axios';

interface Question {
  _id: string;
  questionText: string;
  options: string[];
  status: string;
}

const Admin = () => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);
  const [status, setStatus] = useState<'open' | 'closed' | 'resolved'>('open');
  const [questions, setQuestions] = useState<Question[]>([]);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/questions/open`);
      setQuestions(res.data);
    } catch (err) {
      console.error('Failed to fetch questions', err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleCreate = async () => {
    if (!questionText.trim() || options.length < 2 || options.some(opt => !opt.trim())) {
      alert('Please provide a valid question and at least two non-empty options.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_URL}/questions`,
        { questionText, status, options },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Question created!');
      setQuestionText('');
      setOptions(['', '']);
      fetchQuestions();
    } catch (err) {
      console.error(err);
      alert('Failed to create question');
    }
  };

  const handleResolve = async (id: string, correctOption: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/questions/resolve/${id}`,
        { correctOption },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Resolved!');
      fetchQuestions();
    } catch (err) {
      alert('Error resolving question');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create Question</h2>

      <textarea
        value={questionText}
        onChange={e => setQuestionText(e.target.value)}
        placeholder="Enter question"
        className="w-full p-3 border rounded mb-4"
      />

      <div className="mb-4">
        <label className="block font-medium mb-2">Options</label>
        {options.map((opt, i) => (
          <input
            key={i}
            type="text"
            value={opt}
            onChange={e => {
              const updated = [...options];
              updated[i] = e.target.value;
              setOptions(updated);
            }}
            placeholder={`Option ${i + 1}`}
            className="w-full p-2 border rounded mb-2"
          />
        ))}
        <button
          type="button"
          onClick={() => setOptions([...options, ''])}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Add Option
        </button>
      </div>

      <button
        onClick={handleCreate}
        className="mb-10 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Create
      </button>

      <h2 className="text-2xl font-bold mb-4">Open Questions - Resolve</h2>
      {questions.length === 0 ? (
        <p className="text-gray-600">No open questions available.</p>
      ) : (
        questions.map(q => (
          <div key={q._id} className="border p-4 rounded mb-4 shadow-sm">
            <p className="font-semibold mb-2">{q.questionText}</p>
            <div className="flex flex-wrap gap-2">
              {q.options.map(opt => (
                <button
                  key={opt}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  onClick={() => handleResolve(q._id, opt)}
                >
                  Resolve as {opt}
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;

