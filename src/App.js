import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Detail from './Components/Detail';
import CartPage from './Components/CartPage';
import Content from './Components/Content';
import Profile from './Components/Profile';
import ListProducts from './Components/Admin/ListProducts';
import EditProducts from './Components/Admin/EditProducts';
import CreateProducts from './Components/Admin/CreateProducts';
import Header from './Components/Header'; // Import Header component
import Footer from './Components/Footer'; // Import Footer component

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header /> {/* Header component */}
        <Container>
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/cart" element={<CartPage />} />

            {/* Route that do not include the Header and Footer */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/admin" element={<ListProducts />} />
            <Route path="/admin/edit/:ProductID" element={<EditProducts />} />
            <Route path="/admin/create" element={<CreateProducts />} />
          </Routes>
        </Container>
        <Footer /> {/* Footer component */}
      </div>
    </BrowserRouter>
  );
}

export default App;
