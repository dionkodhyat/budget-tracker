import React, { useContext } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { AuthContext } from '../context/AuthContext'

const Navigation = () => {
    const { setUser } = useContext(AuthContext);
    
    /* Sign out by removing token and authorization */
    const handleSignout = () => {
        sessionStorage.removeItem("accessToken");
        setUser(false);
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
                <Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav>
                        <Button variant="danger" onClick={handleSignout}>Sign Out</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Navigation
