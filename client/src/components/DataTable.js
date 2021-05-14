import React, { useState, useEffect } from 'react'
import { getReq, deleteReq } from '../api/customAxios'
import Table from 'react-bootstrap/Table'
import { Redirect } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const DataTable = (props) => {
  const [data, setData] = useState([]);
  
  const handleRemove = (id) => {
    console.log(id)
    deleteReq('expense/' + id)
    .then(res => {
      const newData = data.filter(entry => entry.id != id);
      setData([...newData]);
    })
    .catch(err => {
      console.log(err)
    })
  }



  useEffect(() => {
    getReq('expense')
    .then(res => {
      setData(res.data)
    })
    .catch(err => {
      console.log(err);
    })

  }, [])

  return (
        <>

            {data.map(entry => {
                const {id, name, cost, category} = entry;
                return (
                  <Card key={id} className="mt-3 mb-3" border="success" style={{ width: '26%' }}>
                  <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                      {`Cost : ${cost}`} 
                      <br></br> 
                      {`Category : ${category}`} 
                      <br></br>
                    </Card.Text>
                    <Button variant='outline-danger' size="sm" onClick={() => handleRemove(id)}>Remove</Button>
                  </Card.Body>
                </Card>
                )
              })}


          {/* <Table bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Cost</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {data.map(entry => {
                const {id, name, cost, category} = entry;
                return (
                  <tr key={id}>
                      <td>{name}</td>
                      <td>{cost}</td>
                      <td>{category}</td>
                  </tr>
                )
              })}

            </tbody>
          </Table> */}
        </>
    )
}

export default DataTable
