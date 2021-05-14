import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import { postReq } from '../api/customAxios'

const DataForm = (props) => {
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [category, setCategory] = useState('Restaurant');
    const [isValid, setValid] = useState(false);
    const categories = ['Restaurant', 'Gas', 'Mortgage', 'Grocery', 'Leisure', 'Travel', 'Debt', "Misc"];


    /* Function to ensure a number is entered */
    const validateCostForm = (e) => {
        const regexFloat = /([0-9]*[.])?[0-9]+/;
        if (e.target.value === '' || regexFloat.test(e.target.value)) {
            setCost(e.target.value);
            setValid(false);
        } else {
            setValid(true);
        }
    }

    /* Function to submit entry */
    const handleSubmit =  async (e) => {
        e.preventDefault()
        try {
            const res = await postReq('expense', {name, cost, category});
            setName('');
            setCost('');
            window.location = "/"
        } catch (err) {
            alert(err)
        }
    }

    return (
        <>
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Insert expense
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter expense name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>

                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Cost ($)</Form.Label>
                        <Form.Control isInvalid={isValid} required type="text" placeholder="Enter expense's cost" value={cost} onChange={(e) => validateCostForm(e)}/>
                        <Form.Control.Feedback type="invalid">Please enter a number</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" defaultValue="Restaurant" value={category} onChange={e => setCategory(e.target.value)}>
                        {categories.map(category => {
                            return (
                            <option>{category}</option>
                            )
                        })}
                    </Form.Control>
                    </Form.Group>
                    </Form.Row>
                    

                    <Modal.Footer>
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                    </Modal.Footer>


                </Form>
            </Modal.Body>
        </Modal>
       </>
  );
}

export default DataForm
