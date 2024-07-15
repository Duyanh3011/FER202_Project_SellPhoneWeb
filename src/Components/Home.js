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
      <Container>
        <Content />
        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/cart/:id" element={<Cart />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}
