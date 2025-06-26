import { FaFile } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <FaFile className="logo-icon" />
              <span>NAMMES <span className="highlight">Cert</span></span>
            </div>
            <p>Secure, verifiable digital credentials for the modern world.</p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>Platform</h4>
              <a href="/">Features</a>
              <a href="/">Pricing</a>
              <a href="/">Testimonials</a>
              <a href="/">Security</a>
            </div>
            
            <div className="link-group">
              <h4>Resources</h4>
              <a href="https://youtube.com/@midecaliengineer">YouTube Channel</a>
              <a href="#">Constitution and Senate Act</a>
              <a href="#">Help Center</a>
              <a href="#">Blog</a>
            </div>
            
            <div className="link-group">
              <h4>Socials</h4>
              <a href="https://instagram.com/nammes_nigeriahq"></a>
              <a href="https://x.com/nammesnigeriaHQ">Twitter / X</a>
              <a href="https://youtube.com/@midecaliengineer">YouTube</a>
              <a href="mailto:nammesnigeriaofficial@gmail.com">Email</a>
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