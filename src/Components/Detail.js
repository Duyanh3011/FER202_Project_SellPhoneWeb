import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []); // useEffect dependency array should be empty to run once on mount

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
  };

  const vat = 0.08;

  useEffect(() => {
    // Fetch product details including images
    const fetchProductImages = async () => {
      try {
        const productIds = cart.map(item => item.id);
        const productsPromises = productIds.map(id =>
          axios.get(`http://localhost:9999/products/${id}`)
        );
        const productsResponses = await Promise.all(productsPromises);
        const updatedCart = cart.map((item, index) => ({
          ...item,
          images: productsResponses[index].data.images // Assuming images are stored in 'images' field
        }));
        setCart(updatedCart);
      } catch (error) {
        console.error("Error fetching product images:", error);
      }
    };

    fetchProductImages();
  }, [cart]);

  return (
    <Container>
      <Link to="/">
        <Button variant="success" className="mb-2">
          Go to Home
        </Button>
      </Link>
      {cart.length > 0 && (
        <div className="d-flex justify-content-end">
          <Button variant="danger" onClick={clearCart} className="mb-3">
            Clear cart
          </Button>
        </div>
      )}
      {cart.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Product name</th>
                <th>Image</th>
                <th>Price (vnd)</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name || "Name not available"}</td>
                  <td>
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0].link} // Adjust this based on your API response structure
                        alt={item.name}
                        style={{ width: "auto", height: "100px" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{item.price ? item.price.toLocaleString() : 'Price not available'} VND</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="float-right">
            <span>VAT: {vat * 100}%</span>
            <br />
            <Button variant="success" className="mt-3">
              Total: {(calculateTotal() * (1 + vat)).toLocaleString()} VND
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h3 style={{ color: "red" }}>EMPTY CART</h3>
        </div>
      )}
    </Container>
  );
};

export default CartPage;
