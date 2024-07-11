import axios from 'axios';
import React, { useState } from 'react'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useHref } from 'react-router-dom';
export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const hr = useHref('/');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:9999/users');
            const users = response.data;
            console.log(users);
            const userCheck = users.find(u => u.user === user && u.password === password);
            if (userCheck) {
                window.location.href = '/'; 
                localStorage.setItem('user', JSON.stringify(userCheck.user));               
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('Error fetching user data');
        }

    }
    return (
        <>
        <Row >
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
                        <Form.Group controlId="formBasicuser">
                            <Form.Label>user</Form.Label>
                            <Form.Control
                                type="user"
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

                        <Button variant="success" type="submit" className="w-100 mt-3">
                            Login
                        </Button>
                    </Form>
                    <Button variant="success" href='/register' type="submit" className="w-10 mt-3">
                            Register
                        </Button>
                </Card.Body>
                
            </Card>
            </Col>
        </Row>
            

            
        </>
    )
}
