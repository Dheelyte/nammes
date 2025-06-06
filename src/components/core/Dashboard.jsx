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

  const handleUploadSuccess = (key, value) => {
    setDashboard(prev => ({
      ...prev,
      [key]: value
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
        onUploadSuccess={() => handleUploadSuccess('certificate_status', 'pending')}
      />

      {/* Upload Container */}
      <Document onUploadSuccess={() => handleUploadSuccess('document_uploaded', true)} />

      {/* Payment Container */}
      <Pay onUploadSuccess={() => handleUploadSuccess('receipt_uploaded', true)} />

    </div>
    </>
  );
};

export default Dashboard;