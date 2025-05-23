import { FaCheckCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="branding">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L28 8V24L16 30L4 24V8L16 2Z" fill="#6B46C1" stroke="#6B46C1" strokeWidth="2"/>
              <path d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z" fill="white"/>
            </svg>
          </div>
          <h1 className="app-title">CertifyHub</h1>
        </div>
        
        <button className="cta-button">
          <FaCheckCircle /> Verify
        </button>
      </div>
    </header>
  );
};

export default Header;