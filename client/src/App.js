import './App.css';
import React, { useState, useEffect } from 'react'
import Main from './Components/Main';
import Table from './Components/Table';
import Form from './Components/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes, Route} from 'react-router-dom'
import Navbar from './Components/Navbar';

function App() {
  const [makeCall, setMakeCall] = useState(true)
  const [data, setData] = useState([])
  const getData = async () => {
    const res = await fetch('http://localhost:3001/users')
    const result = await res.json()
    setMakeCall(false)
    setData(result)
  }
  const needToMakeCall = ()=>{setMakeCall(true)}
  useEffect(() => {
    if (makeCall) {
      getData()
    }
  }, [makeCall])
  return (
    <>
      {/* <div>
      <h1>Introduction</h1>
      <p>
        hello this is my first react class
      </p>
    </div>
    <button onClick={()=>{setCounter(counter+1)}}>increment</button>
    <Main count={counter}>
        <div>
          <h1> this is a child of main</h1>
        </div>
  </Main>  // properties of component called props*/}
   <ToastContainer/>
   <Navbar/>
    <Routes>
      <Route path='/add' element={< Form getCall={needToMakeCall}/>}/>
      <Route path='*' element={<Table data={data} getCall={needToMakeCall}/>} />
      <Route path='/edit/:id' element={< Form getCall={needToMakeCall}/>}/>
    </Routes>
    </>
  );
}

export default App;

// life cycle methods
// these are the breakpoints in whole react component lifecycle where we can trigger some automated tasks
/**
 * 3phase mounting phase updating phase and unmounting phase
 * componentDidMount componentDidupdate and componentwillUnmount
 * useEffect hook is used to implement lifeCycle methods in react functional component
 * 
 * useEffect(callback, dependency array)
 * callback function will have the set code that is to run automatically on lifecycle mthod 
 * denency array will container what is trigger the change depency is undefined dependency array is empty and when depency array contains a state variable or a props
 * useEffect(()=>{}) // componentDidUpdated
 * useEffect(()=>{},[])// componentDidMount
 * useEffect(()=>{},[state/prop]) // componentDidUpdate on paritcalr state change
 * 
 */
