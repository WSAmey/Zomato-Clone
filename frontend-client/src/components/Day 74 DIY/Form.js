import React, { useState } from 'react'

const Form = () => {

    const [apply,setApply]=useState(true);
    const [submit,setSubmit]=useState(false);
    const [msg,setMsg]=useState(false);
    const [userData,setUserData]=useState({fname:"",roll_no:""})
    const changeApply=()=>{
        setApply(false);
        setSubmit(true);
    }
    const change=(e)=>{
        const {name,value}=e.target;
        setUserData({...userData,[name]:value});
        console.log(userData);
    }
    const submitData=(e)=>{
        e.preventDefault();
        setSubmit(false);
        setMsg(true);
        
    }
  return (
    <>
   {apply && <h4 style={{marginTop:"7vh"}}>User before clicking on Apply Now Button</h4>}
   {submit && <h4 style={{marginTop:"7vh"}}>User after clicking on Apply Now Button</h4>}
   {msg && <h4 style={{marginTop:"7vh"}}>User after clicking on Submit Now Button</h4>}

    <div style={{background:"orange",borderRadius:"7px",width:"35%",padding:"40px",marginLeft:"auto",marginRight:"auto",marginTop:"2vh"}}>
    
    
    {
        apply && <div>
        <h2>MERN Stack Developer</h2>
        <button style={{background:"blue",color:"white",fontSize:"medium",borderRadius:"5px",padding:"10px",border:"none",cursor:"pointer"}} onClick={()=>{changeApply()}}>Apply Now</button>
        </div>
        }

        {
            submit && <div>
                <label>Register your name:</label> <br/>
                <input type='text' name='fname' onChange={change} style={{padding:"10px",marginTop:"2vh",marginBottom:"2vh",border:"none",borderRadius:"5px"}}/> <br/>
                <label>Register your roll_no:</label> <br/>
                <input type='text' name='roll_no' onChange={change} style={{padding:"10px",marginTop:"2vh",marginBottom:"2vh",border:"none",borderRadius:"5px"}}/> <br/>
                <button style={{background:"blue",color:"white",fontSize:"medium",borderRadius:"5px",padding:"10px",border:"none",cursor:"pointer"}} onClick={(e)=>submitData(e)}>Submit Now</button>

            </div>
        }
        {msg && <h4 style={{background:"blue",color:"white",padding:"10px"}}>Your data has been submitted succesfully</h4>}

    </div>
    </>
  )
}

export default Form