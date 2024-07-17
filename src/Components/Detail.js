import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import Footer from './Footer';
import Headers from './Headers';

const Detail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !product) {
        return <div>Error: {error ? error.message : 'Product not found'}</div>;
    }

    return (

        <div>
            <Headers />
            <Container style={{ paddingTop: 70 }}>
            <Row>
                <Col>
                    <div className="mb-3">
                        <Link to="/" className="btn btn-primary"> Bach To Home</Link>
                    </div>
                    <h2>Product Detail:</h2>
                    <h3>{product.Name}</h3>
                    <p>Category: {product.Category_ID}</p>
                    <p>Price: ${product.Price}</p>
                    <p>Supplier: {product.Supplier_ID}</p>
                    <div>
                        <div className="d-flex flex-wrap">
                            {product.Images && product.Images.map((img, index) => (
                                <Image key={index} src={img.link} alt={'Image ' + img.id} thumbnail className="m-2" />
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
            </Container>
            <Footer/>
        </div>
    );
};

export default Detail;
