import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaCheckCircle, FaCertificate, FaLock, FaUser, FaEnvelope, FaSchool, FaIdCard, FaArrowAltCircleRight } from 'react-icons/fa';
import { useAuth } from "./AuthContext";
import Api from "../Api";


const Register = () => {
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        school: '',
        matricNumber: '',
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
        
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email address';
        if (!formData.school.trim()) newErrors.school = 'School name is required';
        if (!formData.matricNumber.match(/^[A-Za-z0-9]{6,12}$/)) {
          newErrors.matricNumber = 'Invalid matric number format';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        setIsSubmitting(true);
        try {
          const response = await Api.post('user/register/', {
            "full_name": formData.fullName,
            "email": formData.email,
            "matric_number": formData.matricNumber,
            "school": formData.school,
            "password": formData.password
          })
          login(response.data);
          setSuccess(true);
        } catch (error) {
          console.error('Submission error:', error);
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
                  <h3>🎉 Welcome aboard, {formData.fullName}!</h3>
                  <p>Proceed to your dashboard for verification</p>
                  <Link to='/'>
                    <span>Go to Dashboard</span>
                    <FaArrowAltCircleRight />
                </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className={`form-group ${errors.fullName ? 'error' : ''}`}>
                  <label>
                    <FaUser className="input-icon" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
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
                    {errors.school && <span className="error-message">{errors.school}</span>}
                  </div>
    
                  <div className={`form-group ${errors.matricNumber ? 'error' : ''}`}>
                  <label>
                    <FaIdCard className="input-icon" />
                    Matriculation Number
                  </label>
                  <input
                    type="text"
                    name="matricNumber"
                    value={formData.matricNumber}
                    onChange={handleChange}
                  />
                  {errors.matricNumber && <span className="error-message">{errors.matricNumber}</span>}
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
                  {errors.matricNumber && <span className="error-message">{errors.matricNumber}</span>}
                </div>
    
                <button type="submit" disabled={isSubmitting} className="submit-btn">
                  {isSubmitting ? 'Creating Account...' : 'Create account'}
                </button>
                </form>
              )}
            </div>
          </div>
        </div>
      );
}

export default Register;