import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);

const handleLogin = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
       { email, password }
      );
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  } catch (err) {
    console.error('Login failed:', err);
    alert('Login failed. Please check your email and password.');
  }
};


 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="bg-white p-6 rounded-lg w-full max-w-sm">
      <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">Welcome Back</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}



//   return (
//     <div>
//       <h2>Login</h2>
//       <input value={email} onChange={e => setEmail(e.target.value)} />
//       <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

export default Login;
