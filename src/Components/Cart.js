import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ id, isLoggedIn }) => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const addToCart = () => {
        if (!isLoggedIn) {
            alert('You need to login to perform this action.');
            navigate('/login');
            return;
        }

        const found = cartItems.find(item => item.id === id);
        if (found) {
            const updatedCart = cartItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, { id, quantity: 1 }]);
        }
    };

    return (
        <button onClick={addToCart} className="btn btn-outline-success">
            Add To Cart
        </button>
    );
};

export default Cart;
