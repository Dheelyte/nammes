import { FaFile } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <FaFile className="logo-icon" />
              <span>Certify<span className="highlight">Pro</span></span>
            </div>
            <p>Secure, verifiable digital credentials for the modern world.</p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>Platform</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Testimonials</a>
              <a href="#">Security</a>
            </div>
            
            <div className="link-group">
              <h4>Resources</h4>
              <a href="#">Documentation</a>
              <a href="#">API</a>
              <a href="#">Help Center</a>
              <a href="#">Blog</a>
            </div>
            
            <div className="link-group">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Compliance</a>
              <a href="#">GDPR</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2023 CertifyPro. All rights reserved.</p>
          <div className="social-links">
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </footer>
    )
}

export default Footer;