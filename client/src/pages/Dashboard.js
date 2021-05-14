import React, { useState, useContext, useEffect } from 'react'
import DataForm from '../components/DataForm'
import Button from 'react-bootstrap/Button'
import DataTable from '../components/DataTable';
import Navigation from '../components/Navigation'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from "react-router-dom";

const Dashboard = () => {
    const [modalShow, setModalShow] = useState(false);
    let history = useHistory();
    useEffect(() => {
      if (!sessionStorage.getItem('accessToken')) {
        history.push('/login');
      }
    }, [])

    return (
        <>
          <Navigation/>
            <Container>
              <Row>
                <Col>
              <Button className="mt-3 mb-3" 
                      variant="warning" 
                      onClick={() => setModalShow(true)}>
                Insert expense
              </Button>
        
              <DataForm
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
              <DataTable/>
                </Col>
              </Row>
            </Container>
        </>
    )
}

export default Dashboard
