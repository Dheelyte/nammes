import { Link } from 'react-router-dom';
import { FaShieldAlt, FaCheckCircle, FaCertificate, FaLock, FaUser, FaEnvelope, FaSchool, FaIdCard, FaArrowAltCircleRight } from 'react-icons/fa';


const Sidebar = () => {
    return (
        <>
            <h1>Sidebar</h1>
            <Link to='/'>
                <span>Dashboard</span>
                <FaArrowAltCircleRight />
            </Link>
            <Link to='/pay'>
                <span>Pay</span>
                <FaArrowAltCircleRight />
            </Link>
        </>
    )
}

export default Sidebar;