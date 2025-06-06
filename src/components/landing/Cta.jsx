import { FaArrowRight } from 'react-icons/fa';


const Cta = () => {
    return (
        <section className="final-cta">
            <div className="cta-content">
                <h2>Ready to Secure Your Credentials?</h2>
                <p>Join thousands of professionals and institutions using our trusted certification platform</p>
                <button className="primary-btn">
                Get Started Now <FaArrowRight />
                </button>
            </div>
        </section>
    )
}

export default Cta;