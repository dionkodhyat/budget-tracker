import React, { useState, useEffect } from 'react'
import { getReq, deleteReq } from '../api/customAxios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'


const DataTable = (props) => {
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
      setData(res.data)
    })
    .catch(err => {
      console.log(err);
    })

  }, [])



  return (
        <>
          

          <Table hover>
            <thead>
              <tr>
                <th>Expense</th>
                <th>Cost</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data && data.map(entry => {
                const {id, name, cost, category} = entry;
                return (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{cost}</td>
                    <td>{category}</td>
                    <td><Button key={id} variant='outline-danger' size="sm" onClick={() => handleRemove(id)}>Remove</Button></td>
                  </tr>

                )
              })}

            </tbody>
          </Table>



        </>
    )
}

export default DataTable
