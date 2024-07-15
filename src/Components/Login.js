import React, { useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [accountError, setAccountError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        resetErrors(); // Reset any previous errors

        try {
            const users = await fetchUserList(); // Fetch user list
            const userCheck = findUser(users); // Find user in the list

            if (userCheck) {
                handleLoginSuccess(userCheck); // Handle successful login
            } else {
                handleLoginFailure(users); // Handle login failure
            }
        } catch (err) {
            handleLoginError(); // Handle error fetching user data
        }
    };

    // Function to reset errors
    const resetErrors = () => {
        setAccountError('');
        setPasswordError('');
        setError('');
        setSuccess('');
    };

    // Function to fetch user list
    const fetchUserList = async () => {
        const response = await axios.get('http://localhost:9999/user');
        return response.data;
    };

    // Function to find user in the list
    const findUser = (users) => {
        return users.find(u => (u.account === account || u.email === account) && u.password === password);
    };

    // Function to handle successful login
    const handleLoginSuccess = (userCheck) => {
        localStorage.setItem('user', JSON.stringify(userCheck.account));
        setSuccess('User logged in successfully');
        setTimeout(() => {
            navigate('/'); // Redirect to home page after successful login
        }, 2000);
    };

    // Function to handle login failure
    const handleLoginFailure = (users) => {
        const accountExists = users.some(u => u.account === account || u.email === account);
        if (!accountExists) {
            setAccountError('Account or email not found');
        } else {
            setPasswordError('Incorrect password');
        }
    };

    // Function to handle error fetching user data
    const handleLoginError = () => {
        setError('Error fetching user data');
    };

    return (
        <>
            <Row>
                <Button variant="success" href='/' className="w-10 mt-3 ml-3">
                    Home
                </Button>
            </Row>
            <Row className='justify-content-center'>
                <Col md={6}>
                    <Card className=''>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <h1 className="text-center">Sign in</h1>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {success && <Alert variant="success">{success}</Alert>}

                                <Form.Group controlId="formBasicAccount">
                                    <Form.Label>Account or Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter account or email"
                                        value={account}
                                        onChange={(e) => setAccount(e.target.value)}
                                        required
                                    />
                                    {accountError && <Form.Text className="text-danger">{accountError}</Form.Text>}
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" className="mt-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
                                </Form.Group>

                                <Button variant="success" type="submit" className="w-100 mt-3">
                                    Login
                                </Button>
                            </Form>
                            <Button variant="primary" href='/register' className="w-100 mt-3">
                                Register
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Login;
