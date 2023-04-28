import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Viewdata() {
  const [data, setData] = useState([]);
  const [test, setTest] = useState([]);
  const [result, setResult] = useState([]);


  useEffect(() => {
    axios.post('http://localhost:5000/masterdata').then((response) => {
      setData(response.data)
    });
  }, [])
  // console.log(data.length)

  useEffect(() => {
    axios.post('http://localhost:5000/testdata').then((response) => {
      setTest(response.data)
    })
  }, [])

  // console.log(test)

  function test_fun() {
    let newArray = [];
    // let temp = 0;
    let flag = false;
    let x;
    let y;
    test.length &&
      test.forEach((item) => {
        data.forEach((e) => {
          x = item.ItemName.replace(/[^a-zA-Z0-9 ]/g, "");
          y = e.Itemname.replace(/[^a-zA-Z0-9 ]/g, "");
          x = x.split(" ").join("").toLowerCase();
          y = y.split(" ").join("").toLowerCase();
          //  && (item.Manufacturer.toLowerCase() === e.Manufacturer.toLowerCase())
          if ((x === y)) {
            newArray.push(e);
            flag = true
          }
        })
      })
    if (flag !== true) alert('data not found')
    // setResult(newArray)
    // console.log("count", temp)
    setResult(newArray)
  }

  if (result.length > 0) {
    var tb = document.getElementById("packing");
    tb.style.display = "none";
    // console.log(document.getElementById(`productid${1}`))
    // for (var i = 1; i < result.length; i++) {
    //   document.getElementById(`productid${i}`).style.color = "red";
    // }

  }
  // result.length &&
  //   console.log(result.length)

  let count = 0;

  return (
    <div>
      <h2 className='text-light bg-dark p-4'>Cappsule <span className='text-danger'>Filter</span> Management</h2>
      <div className='container'>
        <div className='row'>
          <div className='col-md-2'>
            <button className='btn btn-success'>Count {result.length ? result.length : data.length}</button>
          </div>
          <div className='col-md-2'>
            <button className='btn btn-info' onClick={test_fun}>Test Data</button>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12 mt-3'>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product ID</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Composition</th>
                  <th scope="col">Manufacturer</th>
                  <th scope="col" id='packing'>Packing</th>

                </tr>
              </thead>
              <tbody>

                {
                  result.length ?
                    result.map((item, key) => (
                      <tr key={item.key}>
                        <th scope="row">{count + key + 1}</th>
                        <td className='text-danger'>{item.ProductID}</td>
                        <td>{item.Itemname}</td>
                        <td>{item.Composition}</td>
                        <td>{item.Manufacturer}</td>

                      </tr>
                    )) :
                    data.map((item, key) => (
                      <tr key={item.key}>
                        <th scope="row">{count + key + 1}</th>
                        <td>{item.ProductID}</td>
                        <td>{item.Itemname}</td>
                        <td>{item.Composition}</td>
                        <td>{item.Manufacturer}</td>
                        <td>{item.Packing}</td>
                      </tr>

                    ))
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Viewdata