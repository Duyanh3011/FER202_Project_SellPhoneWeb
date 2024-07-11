import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHref } from 'react-router-dom';

export default function Register() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const hr = useHref('/');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        try {
            // Assuming you have a backend endpoint for registering users
            const response = await axios.post('http://localhost:9999/users', {
                user,
                password,
            });
            console.log(response.data); // Handle successful registration response here
            // Redirect or show success message
            setSuccess('User registered successfully');
            setError('')
            setTimeout(() => {
                window.location.href = hr;
            }, 2000);
        } catch (err) {
            setError('Error registering user');
        }
    };

    return (
        <>
            <Row>
                <Button variant="success" href="/" className="w-10 mt-3 ml-3">
                    Home
                </Button>
            </Row>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="">
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <h1 className="text-center">Register</h1>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {success && <Alert variant="success">{success}</Alert>}
                                <Form.Group controlId="formBasicuser">
                                    <Form.Label>User</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter user"
                                        value={user}
                                        onChange={(e) => setUser(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" className="mt-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicConfirmPassword" className="mt-3">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="success" type="submit" className="w-100 mt-3">
                                    Register
                                </Button>
                            </Form>
                            <Button variant="success" href='/login' type="submit" className="w-10 mt-3">
                        Login
                        </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
