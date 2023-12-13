import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Home from './Home'

const Navbar = () => {
    const navigate=useNavigate();
  return (
    <div>
        <button onClick={()=>navigate('/')}>Home</button>
        <button onClick={()=>navigate('/about')}>About</button>
        <button onClick={()=>navigate('/products')}>Products</button>
    </div>
  )
}

export default Navbar