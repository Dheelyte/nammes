
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaUser, FaCertificate, FaCalendarAlt, FaUniversity, FaIdCard } from 'react-icons/fa';
import Api from "../Api";
import Header from "./Header";
import Loading from "./Loading";

const VerifyCertificate = () => {
  const { certificate_id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
        const handleVerifyCertificate = async () => {
            setLoading(true)
            try {
                const response = await Api.get(`dashboard/verify-certificate/${certificate_id}/`)
                setCertificate(response.data)
            } catch (error) {
                setError(error.response.data.error)
            } finally {
                setLoading(false)
            }
        }
        handleVerifyCertificate();
    }, [certificate_id])

    if (loading) {
        return (<><Header /><Loading /></>)
    }

  if (error) {
    return (
      <div className="verification-container">
        <div className="verification-result invalid">
          <FaTimesCircle className="invalid-icon" />
          <h2>Verification Failed</h2>
          <p>{error}</p>
          <div className="certificate-id">
            <span>Certificate ID:</span>
            <strong>{certificate_id}</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
        <Header />
        <div className="verification-container">
        <div className="verification-result valid">
            <FaCheckCircle className="valid-icon" />
            <h2>Certificate Verified</h2>
            <p>This certificate with ID <strong>{certificate_id}</strong> is authentic and issued by NAMMES NIGERIA</p>
        </div>

        <div className="certificate-details">
            <div className="detail-header">
            <h3>Certificate Details</h3>
            <div className="certificate-id">
                <span>ID: </span>
                <strong>{certificate_id}</strong>
            </div>
            </div>

            <div className="details-grid">
            <div className="detail-item">
                <FaUser className="detail-icon" />
                <div>
                <label>Recipient</label>
                <p>{certificate.user.profile.full_name}</p>
                </div>
            </div>

            <div className="detail-item">
                <FaCertificate className="detail-icon" />
                <div>
                <label>Certificate Title</label>
                <p>NAMMES Certificate of Membership</p>
                </div>
            </div>

            <div className="detail-item">
                <FaUniversity className="detail-icon" />
                <div>
                <label>Issuing Institution</label>
                <p>NAMMES NIGERIA</p>
                </div>
            </div>

            <div className="detail-item">
                <FaCalendarAlt className="detail-icon" />
                <div>
                <label>Issue Date</label>
                <p>{new Date(certificate.date_issued).toLocaleDateString()}</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </>
  );
};

export default VerifyCertificate;
