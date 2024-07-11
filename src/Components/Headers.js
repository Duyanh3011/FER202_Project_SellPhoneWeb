import React from 'react'
import { Button, Form, FormControl, Nav, NavLink, Navbar, NavbarBrand } from 'react-bootstrap'
import { PhoneFlip, Search, HouseFill, InfoCircleFill, ThreeDotsVertical, EnvelopeFill } from 'react-bootstrap-icons'

export default function Headers() {
    const user = (localStorage.getItem('user')===null)?'Sign in': "User"

  return (
      <Navbar bg="light" variant='light' expand="lg" fixed="top">
        <NavbarBrand className="d-flex align-items-center mr-5">SELLPHONEWEB <PhoneFlip color='#000'></PhoneFlip> </NavbarBrand>
        
        <Navbar.Toggle className='mb-2' aria-controls='basic-navbar-nav'/>
        <Navbar.Collapse id='basic-navbar-nav'>
            <Form className='d-flex w-sm-auto'>
                <FormControl type='text' placeholder='Search' className="mr-sm-3"/>
                <Button variant="outline-success my-2 my-sm-0"><Search/></Button>
            </Form>
            <Nav className="mx-auto">
                <div className='d-flex justify-content-around '>
                    <NavLink href="#home" className="d-flex align-items-center" style={{fontSize: 20}}> <HouseFill/> Home</NavLink>
                    <NavLink href="#About" className="d-flex align-items-center " style={{fontSize: 20}}><InfoCircleFill/>About</NavLink>
                    <NavLink href="#Menu" className="d-flex align-items-center " style={{fontSize: 20}}><ThreeDotsVertical/>Menu</NavLink>
                    <NavLink href="#Contact" className="d-flex align-items-center " style={{fontSize: 20}}><EnvelopeFill/>Contact</NavLink>
                    </div>
            </Nav>
            <Nav> 
                <Nav.Link href="/login" className="ms-3">{user}</Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
  )
}
