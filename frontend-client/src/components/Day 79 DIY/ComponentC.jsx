import React, { useContext } from 'react'
import {data,data1,data2} from '../../App'
const ComponentC = () => {
    const orgname=useContext(data);
    const course=useContext(data1);
    const students=useContext(data2);

  return (
    <div style={{textAlign:"center"}}>
        <h1>Organization: {orgname}</h1>
        <h1>Course: {course}</h1>
        <table className='table' style={{background:"lightblue",width:"70%",padding:"20px",marginLeft:"auto",marginRight:"auto"}}>
        <thead className='thead'>
            <tr>
            <th scope="col">FirstName</th>
            <th scope="col">LastName</th>
            <th scope="col">rollNo</th>
            </tr>
            </thead>
            <tbody>
            {students && students.map((val)=>(
                <tr style={{fontWeight:"bold"}}>
                <td>{val.firstName}</td>
                <td>{val.lastName}</td>
                <td>{val.rollNo}</td>

                </tr>
            ))}
                
               
            </tbody>
        </table>
    </div>
  )
}

export default ComponentC