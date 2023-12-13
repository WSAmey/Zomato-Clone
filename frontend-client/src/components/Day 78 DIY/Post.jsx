import axios from 'axios';
import React,{useState,useEffect} from 'react'

const Post = () => {
    const [data,setData]=useState([]);
    const [search,setSearch]=useState('');

    const fetch=async()=>{
        await axios.get("https://jsonplaceholder.typicode.com/posts")
        .then(result=>{
            setData(result.data);
        })
        .catch(error=>console.log(error));
    }

    useEffect(()=>{
        fetch();
    },[])
    const change=(e)=>{
        const val=e.target.value;
      
            setSearch(val)
      
    }

    const submitData=async(e)=>{
        e.preventDefault();
        if(search!==''){
            const result = data.filter((item) => item.id.toString() === search.toString());
            setData(result);
        }
        if(search===''){
            await fetch();
        }
        
    }

  return (
    <div>
    <div style={{width:"20%",marginLeft:"auto",marginRight:"auto",marginTop:"10vh"}}>
        <input type='text' onChange={change} style={{padding:"10px",borderRadius:"5px",border:"none",outline:"none",background:"white"}}/>
        <button onClick={(e)=>submitData(e)} style={{background:"orange",padding:"10px",border:"none",marginLeft:"5px",borderRadius:"5px",cursor:"pointer"}}>Submit</button>
        </div>
        {data.length>0 && data.map((val)=>(
            <>
                <div style={{textAlign:"center"}}>
                    <h1>{val.id}.{val.title}</h1>
                    <p>{val.body}</p>
                </div>
            </>
        ))
            
        }
    </div>
  )
}

export default Post