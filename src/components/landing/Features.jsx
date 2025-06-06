import { FaShieldAlt, FaGlobe, FaUserGraduate, FaStepForward } from 'react-icons/fa';

const Features = () => {
    return (
        <section id="features" className="features-section">
        <div className="section-header">
          <h2>Why Choose Digital Certificates?</h2>
          <p>Transform your credential management with our secure platform</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>
            <h3>Tamper-Proof Security</h3>
            <p>Blockchain technology ensures certificates cannot be altered or forged</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <FaGlobe />
            </div>
            <h3>Global Verification</h3>
            <p>Verify credentials anytime, anywhere with our online verification system</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <FaUserGraduate />
            </div>
            <h3>Lifetime Access</h3>
            <p>Graduates maintain permanent access to their digital credentials</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <FaStepForward />
            </div>
            <h3>Streamlined Processes</h3>
            <p>Reduce administrative burden with automated certificate issuance</p>
          </div>
        </div>
      </section>
    )
}

export default Features;