import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Table = () => {
    const [data,setData]=useState([]);
    const [search,setSearch]=useState('');

    const fetch=async()=>{
        await  axios.get("https://jsonplaceholder.typicode.com/users")
              .then(response=>{
                   setData(response.data)
              })
              .catch((error)=>console.log(error));
      }

    useEffect(()=>{
      
        fetch();

    },[])

    const change=(e)=>{

        const searchData=e.target.value;
        // if(searchData){
            setSearch(searchData);
            // setSearch('');
        // }
       
    }
    console.log(search);
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (search!=='') {
            const result = data.filter((item) => item.id.toString() === search.toString());
            setData(result);
        } 
        if(search===''){
           await fetch();
          

        }   
    }
  return (
    <div>
    <input type='text' placeholder='enter the post id' style={{padding:"10px",width:"20vw",borderRadius:"5px"}} onChange={change}/>

    <button style={{marginLeft:"1vw",marginTop:"5vh",padding:"10px",borderRadius:"5px",cursor:"pointer",background:"orange",color:"white",border:"none"}} onClick={(e)=>{handleSubmit(e)}}>Submit</button>

        <table style={{ border: "1px solid black",  borderSpacing: "10px",padding: "10px", marginLeft: "auto", marginRight: "auto", marginTop: "5vh" }}>
            <thead style={{border:"1px solid black"}}>
                <tr style={{ border: "1px solid black" }}>
                    <th>id</th>
                    <th>name</th>
                    <th>email</th>
                    <th>phone</th>

                </tr>
            </thead>
          <tbody style={{border:"1px solid black"}}>
          {data.length>0 && data.map((item)=>(
        <tr>
            
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
            </tr>
            )) }
                
           </tbody>
            
        </table>
    </div>
  )
}

export default Table