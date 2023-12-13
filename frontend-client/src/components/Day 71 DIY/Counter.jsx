import React, { useState } from 'react'

function Counter() {

    const [counter,setCounter]=useState(0);

    // const changeval=(action)=>{
    //     if(action==='add'){ 
    //         setCounter(counter+1);
    //     }
    //     else if(action==='sub'){
    //         setCounter(counter-1);

    //     }
    //     else if(action==='reset'){
    //         setCounter(0);

    //     }
    // }
  return (
    <div className='counter-body' style={{background:'greenyellow',width:'20vw',marginLeft:'auto',marginRight:'auto'}}>
        <h1>Counter</h1>
        <p style={{background:'lightblue',padding:'10px',width:'1vw',marginLeft:'auto',marginRight:'auto',borderRadius:'7px'}}>{counter}</p>
        <button style={{padding:'10px',border:'none',borderRadius:'7px',background:'blue',color:'white'}} onClick={()=>setCounter(counter+1)}>Increment</button>
        <button style={{padding:'10px',border:'none',borderRadius:'7px',background:'gray',color:'white'}} onClick={()=>setCounter(counter-1)}>Decrement</button>
        <button style={{padding:'10px',border:'none',borderRadius:'7px',background:'orange',color:'white'}} onClick={()=>setCounter(0)}>Reset</button>


    </div>
  )
}

export default Counter