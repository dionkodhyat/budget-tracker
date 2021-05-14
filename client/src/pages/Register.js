import React, { useState, useContext } from 'react'
import Modal from 'react-bootstrap/modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext'

const axios = require('axios')

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('')
    const [password, setPassword] = useState('');
    const { user, setUser } = useContext(AuthContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {email : email, name : name, password : password};
        axios.post('http://localhost:3001/register', user)
        .then(res => {
            console.log(res);
        })
    }

    if (user === true) 
        return (<Redirect to='/'/>);

    return (
        <div>
            <Modal.Dialog>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Link to="/login">Already have an account?</Link>
                    <Button type="submit" variant="success">Register</Button>
                </Modal.Footer>
            </Form>
            </Modal.Dialog>
        </div>
    )
}

export default Register
