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
          <h1>Get Your Digital NAMMES Membership Certificates</h1>
          <p>Verifiable certificates with an instant validation system</p>
          
          <div className="dual-cta-container">          
            <Link to="/register" className="cta-button verify-cta">
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