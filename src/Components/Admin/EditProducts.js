import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import { Alert, FormGroup, FormControl, Button, Row, Col, Table, Container } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import Footer from '../Footer';
import Headers from '../Headers';

export default function EditProducts() {
    const navigate = useNavigate();
    const init = {
        id: 0,
        Name: "",
        Category_ID: 1,
        Supplier_ID: 1,
        Image: [],
    }

    const { ProductID } = useParams();
    const [Categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [Product, setProduct] = useState(init);

    const name = useRef();
    const price = useRef();
    const category = useRef();
    const image = useRef();
    const [img, setImg] = useState('');

    useEffect(() => {
        axios.get('http://localhost:9999/Category')
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        axios.get('http://localhost:9999/suppliers')
            .then((res) => {
                setSuppliers(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get(`http://localhost:9999/products`)
            .then((res) => {
                const currentProduct = res.data.find(p => p.id === ProductID);
                setProduct(currentProduct);
                setImg(currentProduct.Images);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const updateImage = (e) => {
        
        setImg(Product.Image.map(img => img.link));
        console.log(img);
    }

    const handleUpdate = () => {
        if (name.current.value === '' || category.current.value === '' || price.current.value === '') {
            alert('Please fill in all the fields');
        }
        else {
            const updateProduct = {
                id: ProductID,
                Name: name.current.value,
                Category_ID: category.current.value,
                Price: price.current.value,
                Images: img,
            }
            axios.put(`http://localhost:9999/products/${ProductID}`, updateProduct)
                .then((res) => {
                    alert('Update successful!');
                    navigate('/');
                })
        }
    }

    return (
        <div>
             <Headers />
             <Container style={{ paddingTop: 70 }}>
            <h1>Update Product</h1>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <label>ID: </label>
                        <FormControl type='text' defaultValue={ProductID} readOnly></FormControl>
                    </FormGroup>
                </Col>
                <Col md={6} className='d-flex flex-column justify-content-around'>
                    <FormGroup>
                        <label>Category: </label>
                        <select style={{ width: 200, marginLeft:30 }} ref={category}>
                            {
                                Categories.map(c => {
                                    // console.log(`Cates: ${c.id}`);
                                    // console.log(`c: ${Product.Category_ID}`);
                                    // console.log(c.id == Product.Category_ID)
                                    return <option selected={c.id == Product.Category_ID} value={c.id}>{c.Category_Name} </option>
                                })
                            }
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <label>Supplier: </label>
                        <select style={{ width: 200, marginLeft:30 }} ref={category}>
                            {
                                suppliers.map(c => {
                                    return <option selected={c.id == Product.Supplier_ID} value={c.id}>{c.name} </option>
                                })
                            }
                        </select>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <FormGroup >
                        <label>Name: </label>
                        <FormControl type='text' defaultValue={Product.Name} ref={name}></FormControl>
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col md={6}>

                    <FormGroup>
                        <label>Price: </label>
                        <FormControl type='text' defaultValue={Product.Price} ref={price}></FormControl>
                    </FormGroup>
                </Col>

                <Col md={6}>

                    <FormGroup>
                        <label>Image: </label>
                        <img src={img} style={{ width: 200, marginTop: 10, marginLeft: 20 }} alt='Product' />
                        <FormControl type='file' defaultValue={Product.Images} ref={image} onChange={(e) => updateImage(e)}></FormControl>
                    </FormGroup>
                </Col>
            </Row>
            <Button variant='btn btn-primary' onClick={() => handleUpdate()}>Update</Button>
            </Container>
            <Footer />
        </div>
    )
}
