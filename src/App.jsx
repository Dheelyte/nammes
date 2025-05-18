import { AuthProvider } from './components/auth/AuthContext';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './App.css'
import Register from './components/auth/Register'
import Login from './components/auth/Login';
import Dashboard from './components/core/Dashboard';
import Pay from './components/core/Pay';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="pay" element={<ProtectedRoute><Pay /></ProtectedRoute>} />
      </Routes>
      
    </AuthProvider>
  )
}

export default App;