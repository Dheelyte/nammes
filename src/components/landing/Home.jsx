import React, { useState } from 'react';
import Hero from './Hero';
import Verify from './Verify';
import Features from './Features';
import Process from './Process';
import Cta from './Cta';
import Footer from './Footer';

const Home = () => {

  return (
    <div className="landing-page">
      {/* Hero Section */}
        <Hero />

      {/* Verify section */}
      <Verify />

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