import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Market from './pages/Market';
import Admin from './pages/Admin';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Market />} />
          <Route
            path="/admin"
            element={user?.isAdmin ? <Admin /> : <Navigate to="/login" replace />}
          />
        {/* Add more routes here */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;





















     
