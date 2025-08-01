import { useState, useRef } from 'react';
import { useAuth } from '../auth/AuthContext'
import { FaWallet, FaCopy, FaCheck, FaUpload, FaFileAlt, FaTimes } from 'react-icons/fa';
import { TbCurrencyNaira } from 'react-icons/tb';
import toast from 'react-hot-toast';

import Api from "../Api";


const UploadReceipt = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { user } = useAuth();

    const inputRef = useRef(null);
  
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    };
  
    const handleRemove = () => {
      setFile(null);
      if (inputRef.current) inputRef.current.value = '';
    };

    const handlePaymentReceiptUpload = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        await Api.post(
          'dashboard/upload-receipt/',
          {'receipt': file},
          {
            headers: {
              'Authorization': `Token ${user.token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        onUploadSuccess();
        toast.success('Payment receipt uploaded')
      } catch (error) {
        toast.error('An error occurred');
      } finally {
        setIsSubmitting(false);
        handleRemove();
      }
    }
  
    return (
        <>
          {!file ? (
            <div className='file-display'>
              <input 
                type="file"
                className="file-input"
                onChange={handleFileChange}
                accept=".pdf,image/*"
                ref={inputRef}
              />
              <button 
                className="browse-button"
                onClick={() => inputRef.current.click()}
              >
                <FaUpload />
                <span>Select File</span>
              </button>
            </div>
          ) : (
            <div className="file-display">
              <div className="file-item">
                <FaFileAlt className="file-icon" />
                <span className="file-name">{file.name}</span>
                <button 
                  className="remove-button"
                  onClick={handleRemove}
                >
                  <FaTimes />
                </button>
              </div>
              <button 
                className="upload-button"
                onClick={handlePaymentReceiptUpload}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Uploading..." : "Upload File"}
              </button>
            </div>
          )}
      </>
    );
  };

const Pay = ({ onUploadSuccess }) => {
    
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const bankDetails = {
    accountNumber: '2320436198',
    accountName: 'NAMMES NIGERIA',
    bankName: 'United Bank for Africa (UBA)'
  };

  const handleCopy = (field, value) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const scroll = (elem) => {
    console.log(elem)
    document.getElementById(elem).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="action-container payment-section" id='receipt_upload'>
        <h2><FaWallet /> Complete Payment</h2>
        <div className="payment-details">
          <p className="price"><TbCurrencyNaira /> <span>1000</span></p>
          <p className="description">One-time certificate fee</p>
          <button className="pay-button" onClick={()=>{setShowPaymentDetails(true); scroll("payment-details")}}>
            Proceed to Payment
          </button>
        </div>

      {showPaymentDetails && (
        <div className="payment-details" id="payment-details">
          <h3>Bank Transfer Details</h3>
          
          <div className="detail-row">
            <span>Account Number:</span>
            <div className="copyable-field">
              <strong>{bankDetails.accountNumber}</strong>
              <button 
                onClick={() => handleCopy('accountNumber', bankDetails.accountNumber)}
                className="copy-button"
              >
                {copiedField === 'accountNumber' ? <FaCheck /> : <FaCopy />}
              </button>
            </div>
          </div>

          <div className="detail-row">
            <span>Account Name:</span>
            <div className="copyable-field">
              <strong>{bankDetails.accountName}</strong>
              <button 
                onClick={() => handleCopy('accountName', bankDetails.accountName)}
                className="copy-button"
              >
                {copiedField === 'accountName' ? <FaCheck /> : <FaCopy />}
              </button>
            </div>
          </div>

          <div className="detail-row">
            <span>Bank Name:</span>
            <div className="copyable-field">
              <strong>{bankDetails.bankName}</strong>
              <button 
                onClick={() => handleCopy('bankName', bankDetails.bankName)}
                className="copy-button"
              >
                {copiedField === 'bankName' ? <FaCheck /> : <FaCopy />}
              </button>
            </div>
          </div>

          <p className="note">
            After payment, upload your transaction receipt for verification
          </p>
            <UploadReceipt onUploadSuccess={onUploadSuccess} />
        </div>
      )}
    </div>
  );
};

export default Pay;