import { FaFile, FaSearch } from 'react-icons/fa';
import logo from '../../assets/logo.png'
import sampleCert from '../../assets/samplecert.png'
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
      <header className="hero-section">
        <nav className="navbar">
          <div className="logo">
            <img style={{width: '40px'}} src={logo} alt="" />
            <span>NAMMES NIGERIA</span>
          </div>
          <button className="login-btn">Login</button>
        </nav>
        
        <div className="hero-content">
          <h1>Secure, Verifiable Digital Certificates</h1>
          <p>Issue, manage, and verify academic credentials with blockchain technology</p>
          
          <div className="dual-cta-container">
            <a href="/verify" className="cta-button verify-cta">
              <FaSearch className="cta-icon" />
              <span>Verify a Certificate</span>
            </a>
            
            <a href="/apply" className="cta-button apply-cta">
              <FaFile className="cta-icon" />
              <span>Get a Certificate</span>
            </a>
          </div>

          <div className="sample-certificate">
            <img src={sampleCert} alt="" />
          </div>
        </div>
      </header>
    )
}

export default Hero;