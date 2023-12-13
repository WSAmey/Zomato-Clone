import React, { useEffect } from 'react'
import Header from '../Day 84 DIY/Header'
import { useNavigate } from 'react-router-dom';

const Cancel = () => {

    let navigate=useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
            navigate('/');
        },3500)
    },[])

  return (
    <>
    <Header/>
    <div style={{marginTop:"10vh",marginLeft:"5vw"}}>
        <h2 style={{color:"red"}}>Your payment was cancelled!</h2>
        <h4 style={{color:"red"}}>Please wait for a moment you are being redirected back to home page...</h4>

    </div>
    </>
  )
}

export default Cancel