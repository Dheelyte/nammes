import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Verify() {
  const [certificateId, setCertificateId] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {
    const trimmedId = certificateId.trim();
    if (trimmedId) {
      navigate(`/verify/${encodeURIComponent(trimmedId)}`);
    } else {
      alert('Please enter a valid Certificate ID');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  return (
    <div className="verify-container">
        <div className="certificate-verification">
        <div className="section-header">
            <h2>Verify A NAMMES Membership Certificate</h2>
            <p>Enter the certificate ID below to validate and view your official credential</p>
        </div>
        <div className="verification-form">
            <input
            type="text"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="Enter Certificate ID (e.g., HWSG127DGC)"
            className="certificate-input"
            />
            <button
            onClick={handleVerify}
            className="verify-button"
            >
            Verify Certificate
            </button>
        </div>
        </div>
    </div>
  );
}

export default Verify;