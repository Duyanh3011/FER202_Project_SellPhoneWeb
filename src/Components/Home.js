import React from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Headers from './Headers';
import Content from './Content';
import Footer from './Footer';
import Detail from './Detail';
import Cart from './Cart';

export default function Home() {
  return (
    <>
      <Headers />
      <Container style={{ paddingTop: 50 }}>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/detail/:id" element={<Detail />} /> {/* Use dynamic parameter for product ID */}
          <Route path="/cart" element={<Cart />} />        
          </Routes>
      </Container>
      <Footer />
    </>
  );
}
