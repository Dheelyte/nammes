import { FaFile } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <FaFile className="logo-icon" />
              <span>NAMMES <span className="highlight">Cert</span></span>
            </div>
            <p>Secure, verifiable digital credentials for the NAMMES members.</p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>Platform</h4>
              <Link to="/">Features</Link>
              <Link to="/">Pricing</Link>
              <Link to="/">Testimonials</Link>
              <Link to="/">Security</Link>
            </div>
            
            <div className="link-group">
              <h4>Resources</h4>
              <Link to="https://youtube.com/@midecaliengineer">YouTube Channel</Link>
              <Link to="#">Constitution and Senate Act</Link>
              <Link to="#">Help Center</Link>
              <Link to="#">Blog</Link>
            </div>
            
            <div className="link-group">
              <h4>Socials</h4>
              <Link to="https://instagram.com/nammes_nigeriahq"></Link>
              <Link to="https://x.com/nammesnigeriaHQ">Twitter / X</Link>
              <Link to="https://youtube.com/@midecaliengineer">YouTube</Link>
              <Link to="mailto:nammesnigeriaofficial@gmail.com">Email</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} NAMMES Cert. All rights reserved.</p>
        </div>
      </footer>
    )
}

export default Footer;