import React, { useEffect, useState, useRef } from 'react'
import { Alert, FormGroup, FormControl, Button, Row, Col, Table, Container } from 'react-bootstrap'
import { Link, NavLink, Route } from 'react-router-dom'
import axios from 'axios'
import Footer from '../Footer';
import Headers from '../Headers';

export default function ListProducts() {
    const [Category, setCategory] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const search = useRef('');

    const [products, setProducts] = useState([]);
    const [pagingProducts, setPagingProducts] = useState([]); // all products by page
    const [paging, setPaging] = useState([]); // paging 1,2,3...
    const [searchProducts, setSearchProducts] = useState([]); // all products by key (search by key)

    //re-render when deleting
    const [isChange, setIsChange] = useState(true);

    //get all API routes
    useEffect(() => {
        axios.get('http://localhost:9999/Category')
            .then(res => {
                setCategory(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        axios.get('http://localhost:9999/suppliers')
            .then(res => {
                setSuppliers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    //Set data ban dau
    useEffect(() => {
        axios.get('http://localhost:9999/products')
            .then(res => {
                if (res.data.length >= 10) {
                    setPagingProducts(res.data.slice(0, 10))
                } else {
                    setPagingProducts(res.data.slice(0, res.data.length))
                }
                let pag = [];// 1,2,3,...
                let num; //page number
                if (res.data.length % 10 === 0) {
                    num = res.data.length / 10;
                } else {
                    num = Math.floor(res.data.length / 10) + 1;
                }
                // console.log(`Hello ${num}`)
                for (let i = 1; i <= num; i++) {
                    // console.log(`Hello ${i}`)
                    pag = [...pag, i]
                }
                setPaging(pag);
                setProducts(res.data);
                setSearchProducts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [isChange]) //Set data ban dau

    //Category selection
    const getCategoryName = (id) => {
        const category = Category.find((cate) => Number(cate.id) === Number(id))
        return category ? category.Category_Name : "unknown";
    }
    const getSuppliersName = (id) => {
        const supplier = suppliers.find((cate) => Number(cate.id) === Number(id))
        return supplier ? supplier.name : "unknown";
    }

    //CRUD
    const deleteProduct = (id) => {
        const cf = window.confirm(`Are you sure to delete id ${id}?`)
        if (cf) {
            axios.delete(`http://localhost:9999/products/${id}`)
                .then((res) => {
                    setIsChange(!isChange)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    //All Pagin
    const Pagging = (index) => {
        if (products.length > (index * 10))
            setPagingProducts(searchProducts.slice((index - 1) * 10, index * 10))
        else {
            setPagingProducts(searchProducts.slice((index - 1) * 10, products.length))
        }
    }
    //Set data cho Search
    useEffect(() =>{
        if (searchProducts.length >= 10) {
            setPagingProducts(searchProducts.slice(0, 10))
        } else {
            setPagingProducts(searchProducts.slice(0, searchProducts.length))
        }
        let pag = [];// 1,2,3,...
        let num; //page number
        if (searchProducts.length % 10 === 0) {
            num = searchProducts.length / 10;
        } else {
            num = (searchProducts.length / 10) + 1;
        }
        for (let i = 1; i <= num; i++) {
            pag = [...pag, i]
        }
        setPaging(pag);
        setSearchProducts(searchProducts);
    }, [searchProducts])

   const handleFilterByCategory = (e) => {
        if(e.target.value === 'all') setSearchProducts(products)
            else{
                // console.log(`ID: ${e.target.value}`)
                setSearchProducts(products.filter((p)=>( p.Category_ID == e.target.value)))
                console.log(searchProducts)
            }
    }

    const handleFilterBySuppliers = (e) => {
        if(e.target.value === 'all') setSearchProducts(products)
            else{
                // console.log(`ID: ${e.target.value}`)
                setSearchProducts(products.filter((p)=>( p.Supplier_ID == e.target.value)))
                console.log(searchProducts)
            }
    }

    const handleFilterBySearch = (e) => {
        if(e.target.value === '') setSearchProducts(products)
            else{
                // console.log(`ID: ${e.target.value}`)
                setSearchProducts(products.filter((p)=>( p.Name.toLowerCase().includes(search.current.value.toLowerCase()) )))
                console.log(searchProducts)
            }
    }

    return (
        <div>
             <Headers />
             <Container style={{ paddingTop: 50 }}>
            <Alert variant=''>
                <h1>List Products</h1>
                <Row style={{marginTop:15, marginBottom:15}}>
                    <select name="category" onChange={(e) => handleFilterByCategory(e)}>
                        <option value="all">  ---Fill by categories---  </option>
                        {
                            Category.map(c => {
                                return <option key={c.id} value={c.id}>{c.Category_Name}</option>
                            })
                        }
                    </select>

                    <select name="suppliers" onChange={(e) => handleFilterBySuppliers(e)}>
                        <option value="all">  ---Fill by Suppliers---  </option>
                        {
                            suppliers.map(c => {
                                return <option key={c.id} value={c.id}>{c.name}</option>
                            })
                        }
                    </select>

                    <Col md={4}>
                        <FormControl type="text" placeholder="Enter name to search" 
                                    ref={search} style={{ fontSize: 20 }} onChange={handleFilterBySearch} />
                    </Col>
                    <Link to='/admin/create'>
                        <Button style={{ width: 240, fontSize: 20 }} className="btn-primary">Create new product</Button>
                    </Link>
                </Row>
                <Row>
                    <Table striped bordered hover>
                        <thead style={{background:'#0069D9', color:'#fff'}}>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Suppliers</th>
                                <th>Price (VND)</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pagingProducts.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>
                                            <Link to={`/admin/edit/${p.id}`}>{p.Name}</Link>
                                        </td>
                                        <td>{getCategoryName(p.Category_ID)}</td>
                                        <td>{getSuppliersName(p.Supplier_ID)}</td>
                                        <td>{p.Price.toLocaleString()}</td>
                                        <td>
                                            <Link onClick={() => deleteProduct(p.id)}>Delete</Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Row>
                <Row>
                <div>
                    {
                        paging.map((p) => (
                             <Button style={{marginLeft:5}} onClick={()=>Pagging(p)} className='btn-primary'>{p}</Button>
                        ))
                    }
                </div>
                </Row>
            </Alert>
            </Container>
        </div>
    )
}
