import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import { Alert, FormGroup, FormControl, Button, Row, Col, Table, Form, FormLabel } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

export default function CreateProducts() {
    const navigate = useNavigate();

    const [ProductID, setProductID] = useState('')
    const [Categories, setCategories] = useState([]);

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

        axios.get(`http://localhost:9999/Product`)
            .then((res) => {
                setProductID((Number(res.data[res.data.length - 1].id) + 1).toString())
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const updateImage = (e) => {
        const link = e.target.value;
        const links = link.split('\\');
        const linkname = category.current.value;
        setImg(`../../images/Product/${linkname}/${links.pop()}`);
    }

    const handleAddProduct = () => {
        if (name.current.value === '' || category.current.value === '' || price.current.value === '') {
            alert('Please fill in all the fields');
        }
        else {
            try {
                    const link = image.current.value;
                    const links = link.split('\\');
                    const linkname = category.current.value;
                const newProduct = {
                    id: ProductID,
                    Name: name.current.value,
                    Category_ID: category.current.value,
                    Price: price.current.value,
                    Images: `../../images/Product/${linkname}/${links.pop()}`,
                }
                axios.post(`http://localhost:9999/Product/`, newProduct)
                    .then((res) => {
                        if (res.status == 201) {
                            alert('Add successful!');
                            navigate('/');
                        }
                    })
            }
            catch (err) {
                console.log(err);

            }
        }
    }

    return (
        <div>
            {/* <Row className="d-flex flex-column"> */}
            <h1>Create Product</h1>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <FormLabel>Category: </FormLabel>
                        <FormControl as='select' ref={category}>
                            <option value=''>Choose category</option>
                            {

                                Categories.map(c => {
                                    return <option value={c.id}>{c.Category_Name} </option>
                                })
                            }
                        </FormControl>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <FormGroup>
                        <label>Name: </label>
                        <FormControl type='text' placeholder='Please enter product name' ref={name}></FormControl>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <label>Price: </label>
                        <FormControl type='text' placeholder='Please enter product price    ' ref={price}></FormControl>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <label>Image: </label>
                        {img && <img src={img} style={{ width: 200, marginTop: 10, marginLeft: 30}} alt={img} />}
                        <FormControl type='file' ref={image} onChange={(e) => updateImage(e)}></FormControl>
                    </FormGroup>
                </Col>
            </Row>
            <Button
                style={{ marginTop: "10px" }}
                onClick={() => handleAddProduct()}>
                Create
            </Button>
            {/* </Row> */}

        </div>
    )
}
