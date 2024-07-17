import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Detail from './Components/Detail';
import CartPage from './Components/CartPage';
import { Container } from 'react-bootstrap';
import Content from './Components/Content';
import Profile from './Components/Profile';
import ListProducts from './Components/Admin/ListProducts';
import EditProducts from './Components/Admin/EditProducts';
import CreateProducts from './Components/Admin/CreateProducts';

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>


  );
}

export default App;
