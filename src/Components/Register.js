import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHref } from 'react-router-dom';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const hr = useHref('/register');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra mật khẩu và mật khẩu xác nhận
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // Kiểm tra số điện thoại
    const phonePattern = /^[0-9]{10}$/; // Mẫu cho số điện thoại 10 chữ số
    if (!phonePattern.test(phone)) {
      setPhoneError('Invalid phone number format');
      return;
    }

    try {
      const response = await axios.get('http://localhost:9999/user');
      const users = response.data;

      const accountExists = users.find(user => user.account === account);
      const emailExists = users.find(user => user.email === email);
      const phoneExists = users.find(user => user.phone === phone);

      if (accountExists) {
        setError('This account already exists');
        return;
      }

      if (emailExists) {
        setError('This email already exists');
        return;
      }

      if (phoneExists) {
        setError('This phone number already exists');
        return;
      }

      await axios.post('http://localhost:9999/user', {
        firstName,
        lastName,
        phone,
        address,
        email,
        dateOfBirth,
        account,
        password,
      });

      setSuccess('User registered successfully');
      setError('');
      setTimeout(() => {
        window.location.href = hr;
      }, 2000);
    } catch (err) {
      setError('Account already exist');
    }
  };

  // Hàm để kiểm tra sự hợp lệ của số điện thoại khi người dùng nhập liệu
  const handleChangePhone = (value) => {
    setPhone(value);

    const phonePattern = /^[0-9]{10}$/;
    if (phonePattern.test(value)) {
      setPhoneError('');
    } else {
      setPhoneError('Invalid phone number format');
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
                <Form.Group controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicLastName" className="mt-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPhone" className="mt-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone"
                    value={phone}
                    onChange={(e) => handleChangePhone(e.target.value)}
                    required
                  />
                  {phoneError && <Form.Text className="text-danger">{phoneError}</Form.Text>}
                </Form.Group>

                <Form.Group controlId="formBasicAddress" className="mt-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicDateOfBirth" className="mt-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter date of birth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicAccount" className="mt-3">
                  <Form.Label>Account</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter account"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    required
                  />
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
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword" className="mt-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
