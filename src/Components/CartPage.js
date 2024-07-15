import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    // Function to remove an item from the cart
    const removeFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
    };

    // Function to update quantity of an item in the cart
    const updateQuantity = (id, newQuantity) => {
        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
    };

    // Calculate total number of items in the cart
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <div className="container">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <p>Product ID: {item.id}</p>
                            <p>Quantity: 
                                <input type="number" value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} />
                            </p>
                            <button onClick={() => removeFromCart(item.id)} className="btn btn-outline-danger">Remove</button>
                        </div>
                    ))}
                    <p>Total Items: {getTotalItems()}</p>
                    <Link to="/content" className="btn btn-primary">Continue Shopping</Link>
                </>
            )}
        </div>
    );
};

export default CartPage;
