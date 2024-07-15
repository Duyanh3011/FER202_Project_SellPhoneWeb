import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Nav, Navbar, NavbarBrand, Alert } from 'react-bootstrap';
import { PhoneFlip, Search, HouseFill, InfoCircleFill, ThreeDotsVertical, EnvelopeFill } from 'react-bootstrap-icons';

const Headers = () => {
    const [signInActive, setSignInActive] = useState(false);
    const [showLogoutMessage, setShowLogoutMessage] = useState(false); // State để hiển thị thông báo logout
    const user = localStorage.getItem('user');
    const navigate = useNavigate();

    const handleSignInClick = () => {
        setSignInActive(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setSignInActive(false);
        navigate('/login', { replace: true });
        setShowLogoutMessage(true); // Hiển thị thông báo khi logout thành công
        setTimeout(() => setShowLogoutMessage(false), 3000); // Ẩn thông báo sau 3 giây
    };

    return (
        <Navbar bg="light" variant="light" expand="lg" fixed="top">
            <NavbarBrand className="d-flex align-items-center mr-5">
                SELLPHONEWEB <PhoneFlip color="#000" />
            </NavbarBrand>

            <Navbar.Toggle className="mb-2" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <div className="d-flex justify-content-around">
                        <NavLink to="#home" className="nav-link d-flex align-items-center header-link"><HouseFill /> Home</NavLink>
                        <NavLink to="#About" className="nav-link d-flex align-items-center header-link"><InfoCircleFill /> About</NavLink>
                        <NavLink to="#Menu" className="nav-link d-flex align-items-center header-link"><ThreeDotsVertical /> Menu</NavLink>
                        <NavLink to="#Contact" className="nav-link d-flex align-items-center header-link"><EnvelopeFill /> Contact</NavLink>
                    </div>
                </Nav>
                <Nav>
                    {user ? (
                        <>
                            <NavLink
                                to="/login"
                                className={`nav-link ms-3 ${signInActive ? 'sign-in-active' : ''}`}
                                style={{ borderRadius: '4px', padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
                                onClick={handleLogout}
                            >
                                Logout
                            </NavLink>
                            {showLogoutMessage && (
                                <Alert variant="success" className="ms-3" style={{ borderRadius: '4px', padding: '5px 10px', backgroundColor: '#28a745', color: '#fff', textAlign: 'center' }}>
                                    You have successfully logged out!
                                </Alert>
                            )}
                        </>
                    ) : (
                        <NavLink
                            to="/login"
                            className={`nav-link ms-3 ${signInActive ? 'sign-in-active' : ''}`}
                            style={{ borderRadius: '4px', padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
                            onClick={handleSignInClick}
                        >
                            Sign in
                        </NavLink>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Headers;
