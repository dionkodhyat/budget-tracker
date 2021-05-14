import React, { useState } from 'react'
import Modal from 'react-bootstrap/modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const axios = require('axios')

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('')
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {email : email, name : name, password : password};
        axios.post('http://localhost:3001/register', user)
        .then(res => {
            console.log(res);
        })
    }

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
                    <a>Already have an account?</a>
                    <Button type="submit" variant="success">Register</Button>
                </Modal.Footer>
            </Form>
            </Modal.Dialog>
        </div>
    )
}

export default Register