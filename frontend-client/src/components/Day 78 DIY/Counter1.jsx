import React, { useState } from 'react'


const Counter = () => {

  const [counter,setCounter]=useState(0)

  const changeCount=(change)=>{
    if(change==="incr"){
      setCounter(counter+1)
    }

    if(change==="decr"){
      setCounter(counter-1)
    }

    if(change==="reset"){
      setCounter(0)
    }
  }

  return (
    <div style={{background:"white",width:"20%",marginLeft:"auto",padding:"20px",marginRight:"auto",textAlign:"center",marginTop:"10vh",borderRadius:"5px",boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
        <h1 style={{color:"red"}}>Counter</h1>
        <h2 style={{padding:"7px", width:"12vw",borderRadius:"5px",marginLeft:"auto",marginRight:"auto",boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>{counter}</h2>
        <div>
          <button onClick={()=>changeCount("incr")} style={{background:"darkgray",border:"none",padding:"10px",borderRadius:"5px",fontWeight:"bold",cursor:"pointer"}}>Increment</button>
          <button onClick={()=>changeCount("decr")} style={{background:"darkgray",border:"none",padding:"10px",borderRadius:"5px",marginLeft:"2vw",fontWeight:"bold",cursor:"pointer"}}>Decrement</button>

        </div>
        <button onClick={()=>changeCount("reset")} style={{background:"darkgray",border:"none",padding:"10px",borderRadius:"5px",marginTop:"2vh",marginBottom:"4vh",fontWeight:"bold",cursor:"pointer"}}>Reset</button>
    </div>
  )
}

export default Counter