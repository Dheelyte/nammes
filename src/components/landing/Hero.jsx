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
          <Link to='/login' className="login-btn">Login</Link>
        </nav>
        
        <div className="hero-content">
          <h1>Get Your Verifiable, Digital NAMMES Nigeria Certificates</h1>
          <p>Issue, manage, and verify academic credentials</p>
          
          <div className="dual-cta-container">
            <Link to="/verify" className="cta-button verify-cta">
              <FaSearch className="cta-icon" />
              <span>Verify a Certificate</span>
            </Link>
            
            <Link to="/register" className="cta-button apply-cta">
              <FaFile className="cta-icon" />
              <span>Get Your Certificate</span>
            </Link>
          </div>

          <div className="sample-certificate">
            <img src={sampleCert} alt="" />
          </div>
        </div>
      </header>
    )
}

export default Hero;