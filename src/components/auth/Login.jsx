import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaShieldAlt, FaCheckCircle, FaCertificate, FaLock, FaEnvelope } from 'react-icons/fa';
import toast from 'react-hot-toast';

import { useAuth } from "./AuthContext";
import Api from "../Api";


const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    
      const [errors, setErrors] = useState({});
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [success, setSuccess] = useState(false);
    
    
      const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email address';
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        setIsSubmitting(true);
        try {
          const response = await Api.post('user/login/', {
            "email": formData.email,
            "password": formData.password
          })
          login(response.data);
          setSuccess(true);
          toast.success('Log in successful');
        } catch (error) {
          console.error('Check your login information and try again');
          toast.error(error.response.data?.non_field_errors)
        } finally {
          setIsSubmitting(false);
        }
      };
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
      };

      useEffect(() => {
        if (success) {
            navigate('/');
        }
    }, [success, navigate]);
    
      return (
        <div className="split-container">
          <div className="gradient-container">
            <div className="gradient-content">
              <h2>NAMMES Certification Portal</h2>
              <div className="features">
                <div className="feature-item">
                  <FaShieldAlt className="feature-icon" />
                  <span>Verified certificates</span>
                </div>
                <div className="feature-item">
                  <FaCheckCircle className="feature-icon" />
                  <span>Instant validation system</span>
                </div>
                <div className="feature-item">
                  <FaCertificate className="feature-icon" />
                  <span>Digital & PDF certificates</span>
                </div>
                <div className="feature-item">
                  <FaLock className="feature-icon" />
                  <span>Secure encryption</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="form-container">
            <div className="form-card">
              <h2 className="form-title">Login</h2>
              <p className="form-subtitle">Join our network of verified NAMMES members and get a certificate</p>
    
                <form onSubmit={handleSubmit}>
                <div className={`form-group ${errors.email ? 'error' : ''}`}>
                  <label>
                    <FaEnvelope className="input-icon" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                <div className={`form-group ${errors.matricNumber ? 'error' : ''}`}>
                  <label>
                    <FaLock className="input-icon" />
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
    
                <button type="submit" disabled={isSubmitting} className="submit-btn">
                  {isSubmitting ? 'Loggin In...' : 'Login'}
                </button>

                <p className='login-text'>
                  Don't have an account? 
                  <Link to='/register'>
                    Create Account
                  </Link>
                </p>
                </form>
            </div>
          </div>
        </div>
      );
}

export default Login;