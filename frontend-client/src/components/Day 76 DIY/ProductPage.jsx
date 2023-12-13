import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar';

const ProductPage = () => {
    const val=useParams().val;
    console.log(val);
  return (
    <>
    <Navbar/>
            <h1 style={{padding:"20px",background:"orange",width:"50%",marginLeft:"auto",marginRight:"auto",borderRadius:"7px"}}>It is a product page {val} </h1>

    </>
  )
}

export default ProductPage