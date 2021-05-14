import React, { useState, useEffect } from 'react'
import { getReq, deleteReq } from '../api/customAxios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const DataTable = () => {
  const [data, setData] = useState([]);
  
  /* Remove entry */
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

  /* Get user's expenses on load */
  useEffect(() => {
    getReq('expense')
    .then(res => {
      console.log(res)
      setData(res.data)
    })
    .catch(err => {
      console.log(err);
    })

  }, [])

  return (
        <>
            {!data || data.map(entry => {
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

        </>
    )
}

export default DataTable
