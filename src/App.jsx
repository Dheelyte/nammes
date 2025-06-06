import { AuthProvider } from './components/auth/AuthContext';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './components/landing/home';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Register from './components/auth/Register'
import Login from './components/auth/Login';
import Dashboard from './components/core/Dashboard';
import Pay from './components/core/Pay';
import VerifyCertificate from './components/core/VerifyCertificate';

import './App.css'

const App = () => {
  return (
    <AuthProvider>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/pay" element={<ProtectedRoute><Pay /></ProtectedRoute>} />
        <Route path="/verify/:certificate_id" element={<VerifyCertificate />} />
      </Routes>
      
    </AuthProvider>
  )
}

export default App;