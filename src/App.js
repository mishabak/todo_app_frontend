import './App.css';
import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa'
import axios from 'axios'
const server = 'http://localhost:3001' // backend url
function App() {

  const [inputData, setInputData] = useState('')  // for storing data from input field --- onchange
  const [postData, setPostData] = useState(false)  // trigger when click the add btn   --- onclick
  const [fetchData, setFetchData] = useState([]) // fetch data from database  


  useEffect(() => {
    axios.get(`${server}/fetchData`).then((response) => {
      // console.log(response.status);
      if (response.status == 200 && response.data !== false) {
        setFetchData([...response.data])
      } else {
        setFetchData([])
      }
    })
  }, [postData])

  // upload data to database
  function uploadData() {
    axios.get(`${server}/postData/${inputData}`).then(response => {
      postData ? setPostData(false) : setPostData(true)
    })
  }

  // delete data from database
  function deleteData(toDoId) {
    axios.get(`${server}/deleteData/${toDoId}`).then(response => {
      postData ? setPostData(false) : setPostData(true)
    })
  }

  return (
    <div className="baseDiv">
      <h2>TO DO</h2>
      <div className="postData">
        <input maxLength="25" onChange={(e) => setInputData(e.target.value)} type="text" placeholder="Enter Data" />
        <button onClick={uploadData} className="btn"><FaPlus /></button>
      </div>
      <div className="innerDiv">
        {fetchData.length > 0 ? fetchData.map((eachToDo) => {
          return (<div className="div">
            <div>{eachToDo.toDo}</div>
            <button onClick={() => deleteData(eachToDo._id)} className="btn2"><FaTrash /></button>
          </div>)
        }) : <h3> You have no TO DO list</h3>}
      </div>
    </div>
  );
}

export default App;
