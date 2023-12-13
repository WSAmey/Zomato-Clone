import React from 'react'
import Child from './Child'
import Child1 from './Child1';

const Parent = () => {

  const getData=(data)=>{
    console.log("Task-2: using call ack function, inside parent function");
    console.log(data);
  }

  return (
    <>
        <Child val={"Task-1: Parent to child using props"} getData={getData} twocomp={"Task-3: Data from Parent to two child components"}/>
        {/* {getData(data)} */}
        <Child1 twocomp={"Data from Parent to two child components"}/>
    </>  
  )
}

export default Parent