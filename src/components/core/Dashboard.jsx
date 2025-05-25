import { useState, useEffect } from 'react'
import { useAuth } from '../auth/AuthContext';
import { FaUser, FaEnvelope, FaSchool, FaIdCard, FaCheckCircle } from 'react-icons/fa';

import Header from './Header';
import Document from './Document';
import Pay from './Pay';
import Progress from './Progress';
import Api from '../Api';
import Loading from './loading';

const Dashboard = () => {

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [certificateId, setCertificateId] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    async function fetchDashboard() {
      console.log("Use Effect")
      try {
        const response = await Api.get('dashboard/', {
          headers: {
            Authorization: `Token ${user.token}`,
          }
        })
        setDashboard(response.data)
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, [])

  const handleUploadSuccess = (type) => {
    setDashboard(prev => ({
      ...prev,
      [type]: true
    }));
  };

  if (loading) {
    return <><Header /><Loading /></>;
  }

  return (
    <>
    <Header />
    <div className="dashboard-container">
      <div className="status-container">
        <div className="profile-header">
          <h2><FaUser /> Student Profile</h2>
        </div>
        
        <div className="profile-details">
          <div className="detail-item">
            <FaUser className="detail-icon" />
            <div>
              <label>Full Name</label>
              <p>{dashboard.profile.full_name}</p>
            </div>
          </div>
          
          <div className="detail-item">
            <FaEnvelope className="detail-icon" />
            <div>
              <label>Email</label>
              <p>{dashboard.email}</p>
            </div>
          </div>
          
          <div className="detail-item">
            <FaSchool className="detail-icon" />
            <div>
              <label>Institution</label>
              <p>{dashboard.profile.school}</p>
            </div>
          </div>
          
          <div className="detail-item">
            <FaIdCard className="detail-icon" />
            <div>
              <label>Matric Number</label>
              <p>{dashboard.profile.matric_number}</p>
            </div>
          </div>
        </div>
      </div>

      <Progress 
        dashboard={dashboard}
      />

      {/* Upload Container */}
      <Document onUploadSuccess={() => handleUploadSuccess('document_uploaded')} />

      {/* Payment Container */}
      <Pay onUploadSuccess={() => handleUploadSuccess('receipt_uploaded')} />

      {/* Verification Container */}
      <div className="action-container verification-section">
            <h2><FaCheckCircle /> Verify Certificate</h2>
            <div className="verification-input">
            <input
                type="text"
                placeholder="Enter Certificate ID"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
            />
            <button className="verify-button">
                Check Validity
            </button>
            </div>
        </div>
    </div>
    </>
  );
};

export default Dashboard;