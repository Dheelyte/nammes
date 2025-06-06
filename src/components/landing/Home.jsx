import React, { useState } from 'react';
import Hero from './Hero';
import Features from './Features';
import Process from './Process';
import Cta from './Cta';
import Footer from './Footer';
import { FaStar } from 'react-icons/fa';

const Home = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [certificateId, setCertificateId] = useState('');
  const [email, setEmail] = useState('');
  
  const handleVerify = (e) => {
    e.preventDefault();
    // In a real app, this would trigger verification
    alert(`Verifying certificate ID: ${certificateId}`);
  };
  
  const handleGetStarted = (e) => {
    e.preventDefault();
    // In a real app, this would redirect to signup
    alert(`Get started with email: ${email}`);
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
        <Hero />

        {/* Process Section */}
        <Process />

      {/* Features Section */}
      <Features />
      
      {/* FAQ Section */}
      <Cta />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;