import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaCheckCircle, FaCertificate, FaLock, FaUser, FaEnvelope, FaSchool, FaIdCard, FaArrowAltCircleRight } from 'react-icons/fa';

import toast from 'react-hot-toast';
import { useAuth } from "./AuthContext";
import Api from "../Api";


const Register = () => {
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        school: '',
        matric_number: '',
        password: ''
      });
    
      const [errors, setErrors] = useState({});
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [success, setSuccess] = useState(false);
    
      const schools = [
        "University of Technology",
        "Science Institute",
        "Engineering College",
        "Business Academy",
        "Medical University"
      ];
    
    
      const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!formData.full_name.trim()) newErrors.full_name = ['Full name is required'];
        if (!emailRegex.test(formData.email)) newErrors.email = ['Invalid email address'];
        if (!formData.school.trim()) newErrors.school = ['School name is required'];
        if (!formData.matric_number.match(/^[A-Za-z0-9]{6,12}$/)) {
          newErrors.matric_number = ['Invalid matric number format'];
        }
        if (!formData.password.trim()) newErrors.password = ['Password is required'];

    
        setErrors(newErrors);
        console.log(newErrors)
        return Object.keys(newErrors).length === 0;
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        setIsSubmitting(true);
        try {
          const response = await Api.post('user/register/', {
            "full_name": formData.full_name,
            "email": formData.email,
            "matric_number": formData.matric_number,
            "school": formData.school,
            "password": formData.password
          })
          login(response.data);
          setSuccess(true);
          toast.success('Registration successful');
          toast.success('Registration successful');
        } catch (error) {
          toast.error('An error occurred');
          console.log(error)
          setErrors(error.response.data)
        } finally {
          setIsSubmitting(false);
        }
      };
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
      };
    
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
              <h2 className="form-title">Register</h2>
              <p className="form-subtitle">Join our network of verified NAMMES members and get a certificate</p>
    
        
              {success ? (
                <div className="success-message">
                  <h3>🎉 Welcome aboard, {formData.full_name}!</h3>
                  <p>Proceed to your dashboard for verification</p>
                  <Link to='/dashboard'>
                    <span>Go to Dashboard</span>
                    <FaArrowAltCircleRight />
                </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className={`form-group ${errors.full_name ? 'error' : ''}`}>
                  <label>
                    <FaUser className="input-icon" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                  />
                  {errors.full_name && <span className="error-message">{errors.full_name[0]}</span>}
                </div>
    
                  <div className={`form-group ${errors.school ? 'error' : ''}`}>
                    <label>
                      <FaSchool className="input-icon" />
                      Institution
                    </label>
                    <select
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      className="styled-select"
                    >
                      <option value="">Select your school</option>
                      {schools.map((school, index) => (
                        <option key={index} value={school}>{school}</option>
                      ))}
                    </select>
                    {errors.school && <span className="error-message">{errors.school[0]}</span>}
                  </div>
    
                  <div className={`form-group ${errors.matric_number ? 'error' : ''}`}>
                  <label>
                    <FaIdCard className="input-icon" />
                    Matriculation Number
                  </label>
                  <input
                    type="text"
                    name="matric_number"
                    value={formData.matric_number}
                    onChange={handleChange}
                  />
                  {errors.matric_number && <span className="error-message">{errors.matric_number[0]}</span>}
                </div>
    
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
                  {errors.email && <span className="error-message">{errors.email[0]}</span>}
                </div>
                
                <div className={`form-group ${errors.password ? 'error' : ''}`}>
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
                  {errors.password && <span className="error-message">{errors.password[0]}</span>}
                </div>
    
                <button type="submit" disabled={isSubmitting} className="submit-btn">
                  {isSubmitting ? 'Creating Account...' : 'Create account'}
                </button>

                <p className='login-text'>
                  Already have an account? 
                  <Link to='/login'>
                     Login
                  </Link>
                </p>
                </form>
              )}
            </div>
          </div>
        </div>
      );
}

export default Register;