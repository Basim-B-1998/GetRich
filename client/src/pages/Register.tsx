import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');   // new email state
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        username,
        email,         // send email to backend
        password,
      });
      alert("User registered");
    } catch (e) {
      alert("Failed to register");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-300 via-pink-300 to-yellow-300 flex items-center justify-center px-6 py-12">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl max-w-lg w-full p-10 relative overflow-hidden">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-widest">
          Join <span className="text-pink-500">Probo</span>
        </h1>

        <form
          onSubmit={e => {
            e.preventDefault();
            handleRegister();
          }}
          className="space-y-8"
        >
          <div className="relative">
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="peer w-full bg-transparent border-b-2 border-gray-300 focus:border-pink-500 outline-none py-3 text-lg placeholder-transparent"
              placeholder="Username"
            />
            <label
              htmlFor="username"
              className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-pink-500 peer-focus:text-sm cursor-text"
            >
              Username
            </label>
          </div>

          {/* New email input */}
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="peer w-full bg-transparent border-b-2 border-gray-300 focus:border-pink-500 outline-none py-3 text-lg placeholder-transparent"
              placeholder="Email"
            />
            <label
              htmlFor="email"
              className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-pink-500 peer-focus:text-sm cursor-text"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="peer w-full bg-transparent border-b-2 border-gray-300 focus:border-pink-500 outline-none py-3 text-lg placeholder-transparent"
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-pink-500 peer-focus:text-sm cursor-text"
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white font-extrabold text-lg shadow-lg hover:shadow-pink-400 transition-shadow"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already registered?{' '}
          <Link to="/login" className="text-pink-500 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}


//   // return (
//   //   <div className="p-6 max-w-md mx-auto">
//   //     <h2 className="text-xl mb-4">Register</h2>
//   //     <input className="border p-2 w-full mb-2" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
//   //     <input className="border p-2 w-full mb-4" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
//   //     <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleRegister}>Register</button>
//   //   </div>
//   // );
// }
