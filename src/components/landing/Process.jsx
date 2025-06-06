const Process = () => {
    return (
        <section id="process" className="process-section">
        <div className="section-header">
          <h2>How to Obtain Your Certificate</h2>
          <p>Simple steps to secure your verifiable credentials</p>
        </div>
        
        <div className="process-steps">
          <div 
            className='step active'
          >
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Create Account</h3>
              <p>Sign up with your academic credentials</p>
            </div>
          </div>
          
          <div 
            className='step'
          >
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Upload Documents</h3>
              <p>Submit required verification documents</p>
            </div>
          </div>
          
          <div 
            className='step'
          >
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Make Payment</h3>
              <p>Complete the secure payment process</p>
            </div>
          </div>
          
          <div 
            className='step'
          >
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Receive Certificate</h3>
              <p>Download your secure digital certificate</p>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Process;