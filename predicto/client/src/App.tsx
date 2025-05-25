import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Market />} />
        <Route path="/admin" element={<Admin />} />
        {user?.isAdmin && <Route path="/admin" element={<Admin />} />}


        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
