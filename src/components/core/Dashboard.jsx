import { useState } from 'react'
import { FaUpload, FaWallet, FaDownload, FaCheckCircle, FaTimesCircle, FaFileAlt } from 'react-icons/fa';
import { TbCurrencyNaira } from 'react-icons/tb'

const Dashboard = () => {
  const [certificateId, setCertificateId] = useState('');
  
  // Mock status
  const statusItems = [
    { id: 1, 
      title: 'Document Uploaded',
      completed: true,
      icon: <FaFileAlt />
    },
    { id: 2,
      title: 'Certificate Paid',
      completed: false,
      icon: <FaWallet />
    },
    { id: 3,
      title: 'Certificate Downloaded',
      completed: false,
      icon: <FaDownload />
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Status Container */}
      <div className="status-container">
        <h2>Application Progress</h2>
        <div className="status-grid">
          {statusItems.map(item => (
            <div 
              key={item.id}
              className={`status-item ${item.completed ? 'completed' : ''}`}
            >
              <div className="status-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <div className="status-indicator">
                {item.completed ? <FaCheckCircle /> : <FaTimesCircle />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Container */}
      <div className="action-container upload-section">
        <h2><FaUpload /> Upload Verification Document</h2>
        <div className="upload-area">
          <p>Drag & drop files here or</p>
          <input 
            type="file"
            className="file-input"
            onChange={(e) => console.log(e.target.files)}
          />
          <button className="browse-button">
            Browse Files
          </button>
        </div>
      </div>

      {/* Payment Container */}
      <div className="action-container payment-section">
        <h2><FaWallet /> Complete Payment</h2>
        <div className="payment-details">
          <p className="price"><TbCurrencyNaira /> <span>49.99</span></p>
          <p className="description">One-time certificate fee</p>
          <button className="pay-button">
            Proceed to Payment
          </button>
        </div>
      </div>

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
  );
};

export default Dashboard;