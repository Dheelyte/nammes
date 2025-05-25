import { useState, useRef } from 'react';
import { useAuth } from '../auth/AuthContext'
import { FaUpload, FaFileAlt, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

import Api from "../Api";


const Document = ({ onUploadSuccess  }) => {
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

  const handleDocumentUpload = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('file', file)
    try {
      await Api.post('dashboard/upload-document/', formData, {
        headers: {
          'Authorization': `Token ${user.token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      onUploadSuccess();
      toast.success('Document Uploaded successfully');
    } catch (error) {
      toast.error('An error occurred!');
    } finally {
      setIsSubmitting(false);
      handleRemove();
    }
  }

  return (
    <div className="action-container upload-section">
      <h2><FaUpload /> Document Upload</h2>
      <div className="upload-area">
        {!file ? (
          <>
            <p>Drag & drop file here or</p>
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
              disabled={isSubmitting}
            >
              <FaUpload />
                <span>Select File</span>
            </button>
            <span className='hint'>Supported formats: pdf, jpg, png</span>
          </>
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
              onClick={handleDocumentUpload}
            >
              Upload File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Document;