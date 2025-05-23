import { useState, useRef, useEffect } from 'react';
import { FaCheck, FaTimes, FaArrowRight } from 'react-icons/fa';
import toast from 'react-hot-toast';

import { useAuth } from '../auth/AuthContext';
import Api from '../Api';

const Progress = ({ documentUploaded, receiptUploaded, certificateStatus }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [steps, setSteps] = useState([
    { id: 1, title: "Document Upload", completed: documentUploaded, stage: "Stage 1" },
    { id: 2, title: "Payment Completion", completed: receiptUploaded, stage: "Stage 2" },
    { id: 3, title: "Certificate Issued", completed: true, stage: "Stage 3" },
  ]);
  const { user } = useAuth();

  // Update steps when props change
  useEffect(() => {
    setSteps(prevSteps => {
      const newSteps = [...prevSteps];
      newSteps[0].completed = documentUploaded;
      newSteps[1].completed = receiptUploaded;
      return newSteps;
    });
  }, [documentUploaded, receiptUploaded]);

  const handleCreateCertificate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await Api.post('dashboard/create-certificate/', {}, {
        headers: {
          Authorization: `Token ${user.token}`,
        }
      })
    } catch (error) {
      toast.error('An error occurred', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const allStepsCompleted = steps.every(step => step.completed);

  return (
    <div className="progress-container">
      <h2>Application Progress</h2>
      <span className="hint">Complete all steps to apply for a certificate</span>
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={`step ${step.completed ? 'completed' : ''} ${index !== steps.length - 1 ? 'has-line' : ''}`}
          >
            <div className="step-icon">
              {step.completed ? (
                <FaCheck className="check-icon" />
              ) : (
                <span className="stage-number">{index + 1}</span>
              )}
            </div>
            
            <div className="step-content">
              <div className="step-header">
                <span className="stage-label">{step.stage}</span>
                <h3>{step.title}</h3>
              </div>
              
              <div className="status-indicator">
                  <FaArrowRight className="status-icon" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {
        certificateStatus === "none" && (
        <button 
          className="apply-button"
          disabled={!allStepsCompleted}
          onClick={handleCreateCertificate}
        >
          {allStepsCompleted ? "Download Certificate" : "Complete All Steps to Apply"}
        </button>
        )
      }

      {
        certificateStatus === "pending" && (
          <button 
          className="apply-button"
          onClick={handleCreateCertificate}
        >
          Under review
        </button>
        )
      }

      {
        certificateStatus === "approved" && (
        <button 
          className="apply-button"
          onClick={handleCreateCertificate}
        >
          Download Certificate
        </button>
        )
      }

    </div>
  );
};

export default Progress;