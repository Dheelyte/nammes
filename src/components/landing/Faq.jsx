const Faq = () => {
    return (
        <section id="faq" className="faq-section">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about our certification platform</p>
        </div>
        
        <div className="faq-grid">
          <div className="faq-card">
            <div className="faq-icon">
              <FaQuestionCircle />
            </div>
            <div className="faq-content">
              <h3>How long does verification take?</h3>
              <p>Document verification typically takes 1-3 business days. You'll receive email notifications at each step of the process.</p>
            </div>
          </div>
          
          <div className="faq-card">
            <div className="faq-icon">
              <FaQuestionCircle />
            </div>
            <div className="faq-content">
              <h3>What payment methods do you accept?</h3>
              <p>We accept credit/debit cards, bank transfers, and popular payment platforms. All transactions are secured with 256-bit encryption.</p>
            </div>
          </div>
          
          <div className="faq-card">
            <div className="faq-icon">
              <FaQuestionCircle />
            </div>
            <div className="faq-content">
              <h3>Can I share my certificate on LinkedIn?</h3>
              <p>Yes! Our platform generates a shareable link that you can add to your LinkedIn profile, resume, or portfolio.</p>
            </div>
          </div>
          
          <div className="faq-card">
            <div className="faq-icon">
              <FaQuestionCircle />
            </div>
            <div className="faq-content">
              <h3>How long is my certificate valid?</h3>
              <p>Your digital certificate has lifetime validity. Employers and institutions can verify it anytime using your unique certificate ID.</p>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Faq;