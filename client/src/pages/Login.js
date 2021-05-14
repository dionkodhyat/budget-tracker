import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import Modal from 'react-bootstrap/modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { AuthContext } from '../context/AuthContext'

const axios = require('axios')
const URL = 'http://localhost:3001/login'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useContext(AuthContext);
    // let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(URL, { email, password })
        .then(res => {
            sessionStorage.setItem("accessToken", res.data.accessToken);
            setUser(true);
            console.log({user})
            // history.push("/");
        })
        .catch(err => {
            alert(err)
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

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button type="submit" variant="success">Login</Button>
            </Modal.Footer>
            </Form>
            </Modal.Dialog>
        </div>
    )
}

export default Login