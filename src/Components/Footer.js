import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Cart, Cloud, House } from "react-bootstrap-icons";

export default function Footer() {
  return (
    <Container
      fluid
      className="fixed-bottom bg-light"
    >
      <Row>
        <Col
          sm={6}
          lg={3}
        >
          <Nav.Item className="d-flex flex-column align-items-center">
            <House size={24} />
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav />
        </Col>
        <Col
          sm={6}
          lg={3}
        >
          <Nav.Item className="d-flex flex-column align-items-center">
            <Cart size={24} />
            <Nav.Link href="/cart">Cart</Nav.Link>
          </Nav.Item>
          <Nav />
        </Col>
        <Col
          sm={6}
          lg={3}
        >
          <Nav.Item className="d-flex flex-column align-items-center">
            <Cloud size={24} />
            <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav.Item>
          <Nav />
        </Col>
        <Col
          sm={6}
          lg={3}
        >
          <Nav.Item className="d-flex flex-column align-items-center">
            <Nav.Link href="#home">© 2023 Author</Nav.Link>
          </Nav.Item>
          <Nav />
        </Col>
      </Row>
    </Container>
  );
}
