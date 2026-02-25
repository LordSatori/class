//React Bootstrap
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

//React Tool
import { NavLink } from 'react-router-dom';

//Style css
import '../assets/css/Addition.css'

export default function Sidebar() {
    return (
        <>
            <p className="text-center mt-5 mb-3 fs-5 fw-bolder text-white">📚 Class Management System</p>
            <Navbar className='d-flex flex-column gap-4 my-4 ps-4 pe-4'>
                <Container className="nav-link bg-transparent">
                    <NavLink to='/' className='text-decoration-none'>
                        <p className=' text-white fs-6'>📝 List</p>
                    </NavLink>
                </Container>
                <Container className="nav-link bg-transparent">
                    <NavLink to='/payment' className='text-decoration-none'>
                        <p className=' text-white fs-6'>💵 Payment</p>
                    </NavLink>
                </Container>
                <Container className="nav-link bg-transparent">
                    <NavLink to='/score' className='text-decoration-none'>
                        <p className=' text-white fs-6'>✅ Score</p>
                    </NavLink>
                </Container>
            </Navbar>
        </>
    );
}
