import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Product = () => {

  const navigate=useNavigate();

  

  return (
    <>
      <Navbar />
      <h1>Products Page</h1>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
        <button key={val} onClick={() =>navigate(`/products/${val}`)}>
          {val}
        </button>
      ))}
    </>
  );
};

export default Product;
