import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Col, Container, Row, ListGroup, ListGroupItem, Carousel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

export default function Content() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:9999/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });

        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleViewDetail = (productId) => {
        navigate(`/detail/${productId}`);
    };

    return (
        <div>
            <Container fluid style={{ paddingTop: 50 }}>
                <Row>
                    <Col md={3} className='bg-light p-3'>
                        <ListGroup className='flex-column'>
                            <ListGroupItem href="#category1">Category1</ListGroupItem>
                            <ListGroupItem href="#category2">Category2</ListGroupItem>
                            <ListGroupItem href="#category3">Category3</ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={9} className='bg-light p-3'>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className='d-block w-100'
                                    src="https://images.unsplash.com/photo-1682905926517-6be3768e29f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                    alt='First-Slider'
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className='d-block w-100'
                                    src="https://images.unsplash.com/photo-1682905926517-6be3768e29f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                    alt='Second-Slider'
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className='d-block w-100'
                                    src="https://images.unsplash.com/photo-1682905926517-6be3768e29f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                    alt='Third-Slider'
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Row className='mt-5'>
                        {products.map((product) => (
                            <Col sm={6} md={4} lg={3} className='mb-4' key={product.id}>
                                <Card className="h-100">
                                    <Card.Img
                                        variant="top"
                                        src={product.Images[0].link}
                                        alt={`Product ${product.id}`}
                                        style={{ height: '300px', objectFit: 'cover' }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{product.Name}</Card.Title>
                                        <Card.Text>
                                            {product.Price + " VND"}
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => handleViewDetail(product.id)}>View Detail</Button>{' '}
                                        <Cart id={product.id} isLoggedIn={isLoggedIn} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
}
