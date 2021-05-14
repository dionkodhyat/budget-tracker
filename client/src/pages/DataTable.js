import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'

const axios = require('axios')
const URL = 'http://localhost:3001/expense'

const DataTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(URL)
    .then(res => {
      console.log(res)
    })
    // setData(data)
  }, [])

  return (
        <>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Cost</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
            </tbody>
          </Table>
        </>
    )
}

export default DataTable
