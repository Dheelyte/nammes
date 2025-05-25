import { useState, useEffect } from 'react';
import { FaCheck, FaArrowRight } from 'react-icons/fa';
import toast from 'react-hot-toast';

import { useAuth } from '../auth/AuthContext';
import Certificate from './Certificate';
import Api from '../Api';

const Progress = ({ dashboard }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [steps, setSteps] = useState([
    { id: 1, title: "Document Upload", completed: dashboard.document_uploaded, stage: "Stage 1" },
    { id: 2, title: "Payment Completion", completed: dashboard.receipt_uploaded, stage: "Stage 2" },
    { id: 3, title: "Certificate Issued", completed: true, stage: "Stage 3" },
  ]);
  const { user } = useAuth();

  // Update steps when props change
  useEffect(() => {
    setSteps(prevSteps => {
      const newSteps = [...prevSteps];
      newSteps[0].completed = dashboard.document_uploaded;
      newSteps[1].completed = dashboard.receipt_uploaded;
      return newSteps;
    });
  }, [dashboard.document_uploaded, dashboard.receipt_uploaded]);

  const handleCreateCertificate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await Api.post('dashboard/create-certificate/', {}, {
        headers: {
          Authorization: `Token ${user.token}`,
        }
      })
      toast.success("Certificate application successful")
    } catch (error) {
      toast.error(error.response.data[0]);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleDownloadCertificate = () => {
    toast.loading("Certificate Downloading...")
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
        dashboard.certificate_status === "none" && (
        <button 
          className="apply-button"
          disabled={!allStepsCompleted}
          onClick={handleCreateCertificate}
        >
          {allStepsCompleted ? "Request Certificate" : "Complete All Steps to Apply"}
        </button>
        )
      }

      {
        dashboard.certificate_status === "pending" && (
          <button 
          className="apply-button"
          disabled={true}
        >
          Under review
        </button>
        )
      }

      {
        dashboard.certificate_status === "approved" && (
        <Certificate dashboard={dashboard} />
        )
      }

    </div>
  );
};

export default Progress;