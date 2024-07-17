import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ id, isLoggedIn }) => {
    const navigate = useNavigate();

    const addToCart = () => {
        if (!isLoggedIn) {
            alert('You need to login to perform this action.');
            navigate('/login');
            return;
        }

        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const found = storedCart.find(item => item.id === id);

        let updatedCart;
        if (found) {
            updatedCart = storedCart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedCart = [...storedCart, { id, quantity: 1 }];
        }

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        navigate('/cartpage');  // Navigate to cartpage after adding to cart
    };

    return (
        <button onClick={addToCart} className="btn btn-outline-success">
            Add To Cart
        </button>
    );
};

export default Cart;
