import { FaSearch, FaFile } from 'react-icons/fa';
import logo from '../../assets/logo.png'

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
          
          <div className="cta-container">

          </div>
        </div>
      </header>
    )
}

export default Hero;