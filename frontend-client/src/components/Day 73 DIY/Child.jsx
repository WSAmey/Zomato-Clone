import React, { useState } from 'react'

const Child = (props) => {
  const [name,setName]=useState([]);
  const handleSubmit=(e)=>{
    e.preventDefault();
    props.getData(name)

  }
  return (
    <>
      <h1>{props.val}</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}}/>
        <button>Submit</button>
      </form>

      <h1>Task-2: {name}</h1>

      <h1>Task-3: Child Component 1 - {props.twocomp}</h1>

    </>
  )
}

export default Child