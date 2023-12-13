import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const [loginModal,setLoginModal]=useState(false);
  const [signupModal,setSignupModal] =useState(false);
  const [data, setData]=useState();
  const [loginData, setLoginData]=useState();
  const [isLoggenIn, setLoggedIn]=useState(false);
  const [loggedInUser, setLoggedInUser] =useState(undefined);
    // const location=useLocation();
    // const routePath=location.pathname ==='/';

    const showModal=(val)=>{
      if(val==="open"){

        setLoginModal(true);
      }
      if(val==="close"){
        setLoginModal(false);
      }
    }

    
    const showSignupModal=(val)=>{
      if(val==="open"){

        setSignupModal(true);
        setLoginModal(false)
      }
      if(val==="close"){
        setSignupModal(false);
      }
    }


    
    const change = (e) =>{
      const {name,value}=e.target;
      setData({...data,[name]:value});
    }


    const submitData= async(e)=>{
      e.preventDefault();
        try {
          await axios.post('http://localhost:5000/registerUser',data)
        .then(res=>{
          if(res.data==="User already exists"){
            toast.error(<b>Your account already exists! please login with the same credential</b>)
          }
          if(res.data==="Successull registration"){
            toast.success(<b>Your account has been created successfully!</b>)
            setSignupModal(false);
            setLoginModal(true);
          }
        })
        } catch (error) {
          console.log("error: ",error);
        }
      
      
    }

    const loginChange =(e)=>{
      const {name,value}=e.target;
      setLoginData({...loginData,[name]:value});
    }
   
    const login=(e)=>{
      e.preventDefault();
      
            axios.post('http://localhost:5000/LoginUser',loginData)
          .then(result=>{
              console.log(result);
              if(result.data.message==="Success"){ //if result is there
                  // navigate("/adminPanel");
                  toast.success(<b>Login Successful</b>)
                  setLoggedInUser(result.data.fname+" "+result.data.lname);
                  setLoggedIn(true);
                  setLoginModal(false);
              }
              else if(result.data==="Invalid credentials"){
                  toast.error(<b>Invalid email or password</b>)

              }
              else{
                  toast.error(<b>User does not exist! Please Sign Up</b>)

              }
          })
          .catch(err=>console.log(err));        

      }

    
     const handleLogout=()=>{
      setLoggedIn(false);
      setLoggedInUser(false);
     }

  return (
    <div style={{height:"2vh"}}>

    <div style={{display:"grid", gridTemplateColumns:"auto auto",justifyContent:"space-between",backgroundColor: "red",paddingTop:"10px",paddingBottom:"0"}}>
        <div style={{marginLeft:"2vw",paddingTop:"1vh",paddingBottom:"2vh"}}>
            <Link to={'/'} style={{width:"4vw",textAlign:"center",padding:"15px",borderRadius:"50%",background:"white",color:"red",fontSize:"x-large",textDecoration:"none"}}> e!</Link>
        </div>
        {/* On google auth if user logins then we will decode the google auth credential details and from that detail we will capture the name of user in loggedInUser state from decoded response of onSuccess credentialResponse  */}
       { !isLoggenIn ? <div style={{marginRight:"2vw",marginTop:"1vh"}}>
            <button style={{border:"none",background:"red" ,color:"white",padding:"5px",outline:"none",cursor:"pointer"}}  onClick={()=>showModal("open")}>Login</button>
            <button style={{padding:"5px",background:"red",color:"white",borderRadius:"5px",border:"1px solid white",cursor:"pointer",outline:"none"}} onClick={()=>showSignupModal("open")}>Create an account</button>

        </div>
        :
        <div style={{marginRight:"2vw",marginTop:"1vh"}}>
            <button style={{border:"none",color:"white",background:"red",padding:"5px",outline:"none",cursor:"pointer",fontWeight:"bold"}}>{loggedInUser.toUpperCase()}</button>
            <button style={{padding:"5px",background:"red",color:"white",borderRadius:"5px",border:"1px solid white",cursor:"pointer",outline:"none"}} onClick={()=>handleLogout()}>Logout</button>
            </div>
        }

        <Modal
        isOpen={loginModal}
        style={customStyles}
      >
        <div>
        <div style={{display:"grid",gridTemplateColumns:"auto auto",justifyContent:"space-between"}}>
          <h2>Login</h2>
          <button onClick={()=>showModal("close")} style={{border:"1px solid red",background:"white",color:"red",borderRadius:"5px",height:"5vh",width:"2.5vw",cursor:"pointer",outline:"none"}}>X</button>
          </div>
          <input type='text' name='email' placeholder='Email' style={{width:"25vw",padding:"9px",border:"1px solid silver",borderRadius:"5px",outline:"none",marginTop:"2vh"}} onChange={loginChange} autoComplete='off'/> <br/>
          <input type='password' name='password' placeholder='Password' style={{width:"25vw",padding:"9px",border:"1px solid silver",borderRadius:"5px",outline:"none",marginTop:"2vh",marginBottom:"2vh"}} onChange={loginChange} autoComplete='off'/>
            <br/>
            <button className='btn btn-primary' style={{width:"25vw"}} onClick={(e)=>login(e)}>Login</button>
             
            <p style={{marginBottom:"0",marginTop:"2vh"}} onClick={()=>showSignupModal("open")}>New User? <p style={{display:"inline-block",color:"red",cursor:"pointer"}}>Create an account</p></p> 
          
          <div style={{display:"grid",gridTemplateColumns:"auto auto auto",justifyContent:"space-evenly"}}>

          <hr style={{width:"11vw"}}/>
          <p style={{marginTop:"0.5vh"}}>OR</p>
          <hr style={{width:"11vw"}}/>
          </div>

          <div style={{ marginLeft:"6vw"}}>
          
          <GoogleOAuthProvider clientId="262409121808-ce55fvtpivlqaeqd6f49ctau5p31s0qo.apps.googleusercontent.com" >
          <div style={{ width : "200px"}}>
        <GoogleLogin 
            size='large'
            width="200px"
          onSuccess={credentialResponse => {
            const decoded = jwtDecode(credentialResponse.credential);
            // console.log(decoded)
            // console.log(decoded.name)
            setLoggedInUser(decoded.name);
            setLoggedIn(true);
            setLoginModal(false);

          }}
          onError={() => {
            console.log('Login Failed');
          }}

        />
        </div>
        </GoogleOAuthProvider>
          </div>
           
        </div>
      </Modal>

      <Modal
        isOpen={signupModal}
        style={customStyles}
      >
        <div style={{padding:"20px"}}>
        <div style={{display:"grid",gridTemplateColumns:"auto auto",justifyContent:"space-between"}}>
          <h2>Sign Up</h2>
          <button onClick={()=>showSignupModal("close")} style={{border:"1px solid red",background:"white",color:"red",borderRadius:"5px",height:"5vh",width:"2.5vw",cursor:"pointer",outline:"none"}}>X</button>
          </div>

          <p style={{fontWeight:"bolder"}}>Please fill in this form to create an account. </p>

          <hr/>
          <div style={{display:"grid",gridTemplateColumns:"auto auto",marginBottom:"2vh"}}>
            <label style={{padding:"9px"}}>First Name</label>
            <input type='text' name='fname' placeholder='First Name' style={{width:"15vw",padding:"9px",border:"1px solid silver",borderRadius:"5px",outline:"none",marginLeft:"3.5vw"}} onChange={change} autoComplete='off'/>

          </div>
          
          <div style={{display:"grid",gridTemplateColumns:"auto auto",marginBottom:"2vh"}}>
            <label style={{padding:"9px"}}>Last Name</label>
            <input type='text' name='lname' placeholder='Last Name' style={{width:"15vw",padding:"9px",border:"1px solid silver",borderRadius:"5px",outline:"none",marginLeft:"3.5vw"}} onChange={change} autoComplete='off'/>

          </div>
          <div style={{display:"grid",gridTemplateColumns:"auto auto",marginBottom:"2vh"}}>
            <label style={{padding:"9px"}}>Mobile Number</label>
            <input type='number' name='mobilenumber' placeholder='Mobile Number' style={{width:"15vw",padding:"9px",border:"1px solid silver",borderRadius:"5px",outline:"none",marginLeft:"1vw"}} onChange={change} autoComplete='off'/>

          </div>
          <div style={{display:"grid",gridTemplateColumns:"auto auto",marginBottom:"2vh"}}>
            <label style={{padding:"9px"}}>Email</label>
            <input type='text' name='email' placeholder='Email' style={{width:"15vw",padding:"9px",border:"1px solid silver",borderRadius:"5px",outline:"none",marginLeft:"5.7vw"}} onChange={change} autoComplete='off'/>

          </div>
          <div style={{display:"grid",gridTemplateColumns:"auto auto",marginBottom:"2vh"}}>
            <label style={{padding:"9px"}}>Password</label>
            <input type='password' name='password' placeholder='Password' style={{width:"15vw",padding:"9px",border:"1px solid silver",borderRadius:"5px",outline:"none",marginLeft:"4vw"}} onChange={change} autoComplete='off'/>

          </div>

          <p>By creating an account you agree to our <p style={{display:"inline-block",color:"blue"}}> Terms & Privacy. </p> </p>
          <div style={{textAlign:"right"}}>
            <button className='btn btn-danger' onClick={submitData}>Proceed</button>
            </div>
        </div>
      </Modal>
    </div>
    </div>
  )
}

export default Header