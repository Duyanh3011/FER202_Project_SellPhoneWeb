import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  Form, Nav, Navbar, NavbarBrand, Alert, FormControl, Button } from 'react-bootstrap';
import { PhoneFlip, Search, HouseFill, EnvelopeFill, CartFill, Clipboard2CheckFill, Clipboard2Fill, DatabaseFill } from 'react-bootstrap-icons';

const Headers = () => {
    const [signInActive, setSignInActive] = useState(false);
    const [showLogoutMessage, setShowLogoutMessage] = useState(false); // State để hiển thị thông báo logout
    const user = JSON.parse(localStorage.getItem('user'));
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
        <Navbar bg="light" variant="light" expand="lg" fixed="top"  >
            <NavbarBrand className="d-flex align-items-center mr-5">
                SELLPHONEWEB <PhoneFlip color="#000" />
            </NavbarBrand>

            <Navbar.Toggle className="mb-2" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               
                <Nav className="mx-4">
                    <div className="d-flex justify-content-around">
                        <NavLink to="/" className="nav-link d-flex align-items-center header-link"><HouseFill /> Home</NavLink>
                        <NavLink to="/cart" className="nav-link d-flex align-items-center header-link"><CartFill /> Cart</NavLink>
                        <NavLink to="/profile" className="nav-link d-flex align-items-center header-link"><Clipboard2Fill /> Profile</NavLink>
                        {user && user.roll === 1 && (
                            <NavLink to="/admin" className="nav-link d-flex align-items-center header-link"><DatabaseFill /> Admin</NavLink>
                        )
                        }                    </div>
                </Nav>
                <Form className='d-flex w-100 w-lg-50'>
                    <Button variant="outline-success my-2 my-sm-0"><Search/></Button>
                    <FormControl type='text' placeholder='Search' className="mr-sm-3"/>

                </Form>
                <Nav>
                    {user ? (
                        <>
                            <NavLink
                                to="/login"
                                className={`nav-link ms-3 text-center ${signInActive ? 'sign-in-active' : ''}`}
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
                            style={{ borderRadius: '4px', padding: '8px 16px' ,backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
                            onClick={handleSignInClick}
                        >
                            SignIn
                        </NavLink>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Headers;
