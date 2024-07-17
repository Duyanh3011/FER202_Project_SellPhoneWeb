import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const BASE_URL = "http://localhost:9999";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(`${BASE_URL}/products/${id}`);
        const foundProduct = productResponse.data;
        setProduct(foundProduct);

        setSelectedImage(foundProduct.Images.length > 0 ? foundProduct.Images[0]?.link : null);

        const suppliersResponse = await axios.get(`${BASE_URL}/suppliers`);
        const allSuppliers = suppliersResponse.data;
        setSuppliers(allSuppliers);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product || suppliers.length === 0) return <div>No product found.</div>;

  const handleImageSelect = (index) => {
    setSelectedImage(product.Images[index]?.link);
  };

  const addToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.id,
      name: product.Name,
      price: product.Price,
      quantity: 1,
      images: product.Images,
    };

    try {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItemIndex = cart.findIndex((item) => item.id === cartItem.id);

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart successfully!");

      navigate('/cart');
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    }
  };

  const images = product.Images.map(image => ({
    original: image.link,
    thumbnail: image.link,
    originalAlt: product.Name,
    thumbnailAlt: product.Name,
  }));

  const supplierNames = suppliers.map(supplier => supplier.name).join(", ");

  return (
    <Container>
      <Link to="/">
        <Button variant="success">Go to Home</Button>
      </Link>
      <Row className="my-4">
        <Col md={8}>
          <Card className="mb-3">
            {selectedImage && (
              <Card.Img
                variant="top"
                src={selectedImage}
                alt={product.Name}
                style={{ height: "500px", width: "auto", objectFit: "contain" }}
              />
            )}
          </Card>
          <Row>
            <ImageGallery
              items={images}
              showNav={false}
              showPlayButton={false}
              showFullscreenButton={false}
              autoPlay={true}
              slideInterval={3000}
              onSlide={(index) => handleImageSelect(index)}
            />
          </Row>
        </Col>
        <Col md={4}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>{product.Name}</h2>
          <p style={{ fontSize: "18px", marginBottom: "10px" }}>
            <strong>Price:</strong> {product.Price.toLocaleString()} VND
          </p>
          <p style={{ fontSize: "16px", marginBottom: "10px" }}>
            <strong>Supplier:</strong> {supplierNames}
          </p>
          <p style={{ fontSize: "16px", marginBottom: "10px" }}>
            <strong>Status: </strong>
            <span style={{ color: product.status ? "green" : "red", fontWeight: "bold" }}>
              {product.status ? "In stock" : "Out of stock"}
            </span>
          </p>
          <Button
            variant="primary"
            onClick={addToCart}
            style={{ marginTop: "20px" }}
          >
            Add To Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
