import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHref } from 'react-router-dom';

export default function Login() {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [accountError, setAccountError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const hr = useHref('/');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Đặt lại các thông báo lỗi trước khi thực hiện kiểm tra mới
        setAccountError('');
        setPasswordError('');
        setError('');
        setSuccess('');

        try {
            const response = await axios.get('http://localhost:9999/user');
            const users = response.data;
            
            // Tìm người dùng trong danh sách dựa trên account hoặc email và password
            const userCheck = users.find(u => (u.account === account || u.email === account) && u.password === password);
            
            if (userCheck) {
                localStorage.setItem('user', JSON.stringify(userCheck.account));
                setSuccess('User logged in successfully');
                setTimeout(() => {
                    window.location.href = hr;
                }, 2000);
            } else {
                // Kiểm tra xem lỗi là do account không hợp lệ hay password không đúng
                const accountExists = users.some(u => u.account === account || u.email === account);
                if (!accountExists) {
                    setAccountError('Account or email not found');
                } else {
                    setPasswordError('Incorrect password');
                }
            }
        } catch (err) {
            setError('Error fetching user data');
        }
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
}
