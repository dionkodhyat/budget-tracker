import React from 'react'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

const Navigation = () => {
    return (
        <>
        <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
        <Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav>
            <Button variant="danger">Sign Out</Button>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
        </>
    )
}

export default Navigation
