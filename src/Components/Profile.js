import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Headers from './Headers';
import Footer from './Footer';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(loggedInUser));
    }
  }, []);

  return (
    <>
      <Headers />
      <Container fluid>
        <Row>
          <Col sm={12} className="mt-5">
            {isLoggedIn && userData ? (
              <div>
                <h2>User Profile</h2>
                <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone:</strong> {userData.phone}</p>
                <p><strong>Address:</strong> {userData.address}</p>
                <p><strong>Date of Birth:</strong> {userData.dateOfBirth}</p>
                {/* Add more details as needed */}
              </div>
            ) : (
              <p>Please log in to view your profile.</p>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
