import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Cta = () => {
    return (
        <section className="final-cta">
            <div className="cta-content">
                <h2>Ready to Secure Your Digital NAMMES Nigeria Certificate?</h2>
                <p>Join thousands of students and institutions using our trusted certification platform</p>
                <Link to='/register' className="primary-btn">
                Get Started Now <FaArrowRight />
                </Link>
            </div>
        </section>
    )
}

export default Cta;