import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Col, Container, Row, ListGroup, ListGroupItem, Carousel, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';
import Headers from './Headers';
import Footer from './Footer';

export default function Content() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const [selectedCheckboxCategories, setSelectedCheckboxCategories] = useState([]);
    const [selectedCheckboxSuppliers, setSelectedCheckboxSuppliers] = useState([]);


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

        axios.get('http://localhost:9999/Category')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });

        axios.get('http://localhost:9999/suppliers')
            .then(response => {
                setSuppliers(response.data);
            })
            .catch(error => {
                console.error('Error fetching brands:', error);
            });

        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleViewDetail = (productId) => {
        navigate(`/detail/${productId}`);
    };

    const handleCheckboxChange = (event) => {
        const br = event.target.value;
        const newSelectedCate = selectedCheckboxCategories.includes(br)
            ? selectedCheckboxCategories.filter(id => id !== br)
            : [...selectedCheckboxCategories, br];
        setSelectedCheckboxCategories(newSelectedCate);
    };
    const handleCheckboxChangeSupplier = (event) => {
        const br = event.target.value;
        const newSelectedSup = selectedCheckboxSuppliers.includes(br)
            ? selectedCheckboxSuppliers.filter(id => id !== br)
            : [...selectedCheckboxSuppliers, br];
        setSelectedCheckboxSuppliers(newSelectedSup);
    };

    return (
        <div>
            <Headers />
            <Container style={{ paddingTop: 50 }}>
                <Row>
                    <Col md={12} className='bg-light p-3'>
                        <Carousel >
                            <Carousel.Item>
                                <img
                                    className='d-block w-100' style={{ height: 150 }}
                                    src="https://images.unsplash.com/photo-1682905926517-6be3768e29f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                    alt='First-Slider'
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className='d-block w-100' style={{ height: 150 }}
                                    src="https://images.unsplash.com/photo-1682905926517-6be3768e29f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                    alt='Second-Slider'
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className='d-block w-100' style={{ height: 150 }}
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
                        <Col md={3}>
                            <h2 className="text-primary">Filter by: Categories</h2>
                            <Form>
                                {categories.map((b) => (
                                    <Form.Check
                                        key={b.id}
                                        type="checkbox"
                                        id={b.id}
                                        label={b.Category_Name}
                                        value={b.id}
                                        checked={selectedCheckboxCategories.includes(b.id)}
                                        onChange={handleCheckboxChange}
                                    />
                                ))}
                            </Form>

                            <h2 className="text-primary">Filter by: Suppliers</h2>
                            <Form>
                                {suppliers.map((b) => (
                                    <Form.Check
                                        key={b.id}
                                        type="checkbox"
                                        id={b.id}
                                        label={b.name}
                                        value={b.id}
                                        checked={selectedCheckboxSuppliers.includes(b.id)}
                                        onChange={handleCheckboxChangeSupplier}
                                    />
                                ))}
                            </Form>
                        </Col>
                        <Col md={9} className='text-center'>
                            <Row>
                                {products
                                .filter(p => { 
                                    // console.log(selectedCheckboxBrand.includes ((p.brand).toString()) ); 
                                    //             console.log(selectedCheckboxBrand + "==" + ((p.brand)) );
                                    return selectedCheckboxCategories.length === 0 || selectedCheckboxCategories.includes((p.Category_ID).toString())})
                                    .filter(p => { 
                                        // console.log(selectedCheckboxBrand.includes ((p.brand).toString()) ); 
                                        //             console.log(selectedCheckboxBrand + "==" + ((p.brand)) );
                                        return selectedCheckboxSuppliers.length === 0 || selectedCheckboxSuppliers.includes((p.Supplier_ID).toString())})
                                .map((product) => (
                                    <Col md={6} lg={4} className='mb-4' key={product.id}>
                                        <Card className="h-100">
                                            <Card.Img
                                                variant="top"
                                                src={product.Images[0].link}
                                                alt={`Product ${product.id}`}
                                                style={{ height: '250px', objectFit: 'cover' }}
                                            />
                                            <Card.Body>
                                                <Card.Title>{product.Name}</Card.Title>
                                                <Card.Text>
                                                    {product.Price.toLocaleString() + " VND"}
                                                </Card.Text>
                                                <Button variant="primary" onClick={() => handleViewDetail(product.id)}>View Detail</Button>{' '}
                                                <Cart id={product.id} isLoggedIn={isLoggedIn} />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>

                    </Row>
                )}
            </Container>
            <Footer />
        </div>
    );
}
