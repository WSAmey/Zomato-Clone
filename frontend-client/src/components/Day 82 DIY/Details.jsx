import React,{useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../Day 84 DIY/Header';
import Modal from 'react-modal';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';


const Details = () => {

  const customStyles = {
    content: {
      width:'85%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const [overviewDiv,setOverviewDiv]=useState(true);
  const [contactDiv,setContactDiv]=useState(false);
  const [showModal,setShowModal]=useState(false);
  const [menuData, setMenuData]=useState([]);
  const [counters, setCounters] = useState(menuData.map(() => 0)); //counter is the quantity of menu items
  
  const showDiv=(val)=>{
    if(val==="overview"){
      setOverviewDiv(true);
      setContactDiv(false);
    }
    if(val==="contact"){
      setOverviewDiv(false);
      setContactDiv(true);
    }
    else{
      setContactDiv(false)
    }
  }
    const location=useLocation();
    const restaurant=location.state?.data || 'No data received'

    const getMenu=async()=>{
      await axios.get(`http://localhost:5000/getMenusByRestaurId/${restaurant.rest_id}`)
      .then(res=>{
        setMenuData(res.data.menuData)
                
        // Initialize counters based on the length of menuData
        setCounters(Array(res.data.menuData.length).fill(0));

      })

      .catch(error=>console.log(error));
    }

    useEffect(()=>{
      getMenu();
    },[])

  
    const counterset=(index,val)=>{
      const updatedCounters = [...counters]; //updatedCounters is assigned copy of inital counters array
      let total=0;
      if (val === 'incr') {
        updatedCounters[index] += 1;

      } else if (val === 'decr' && updatedCounters[index] > 0) {
        updatedCounters[index] -= 1;
      }
      console.log("inside counterset index",updatedCounters);
      setCounters(updatedCounters) 

      menuData.map((item)=>{
        total +=updatedCounters[index]*item.price;
      })
    }

    const calculateSubtotal = () => {
      let subtotal = 0; //initial when no items are added, the value will be 0
      menuData.map((menu, index) => {
        // console.log("inside subtotal counter index:",counters[index]);
        // console.log("inside subtotal price:",menu.price);
        subtotal += counters[index] * menu.price;
      });
      return subtotal;
    };

    //payment integration

    const makePayment =async()=>{
      //in front end we use publishable key and in backend we have to use secret key 
      const stripe = await loadStripe("pk_test_51OMoOqSCVIBZdYnzgQWTktEZGGADuQMXgTjr1iEURbo8QAW2097ykAjfVekVzbPpJ7IzudDVr8Qxnl6guwx4Gme300lVbBCyqp")
      const subtotal=calculateSubtotal();
      
      const body={
        orders:menuData.map((item,index)=>({
          ...item,
          images:item.image,
          quantity:counters[index],
          subtotal:subtotal
        })),
      }
      
      const headers={
        "Content-Type":"application/json"
      }
      
      const response=await fetch("http://localhost:5000/api/create-checkout-session",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
      });

      const session=await response.json(); //when we click on pay now button, then it will fetch data from api create-checkout-session from backend, the backend will send sessionid in response to this session variable and then we will redirect to checkout page of stripe  

      const result=stripe.redirectToCheckout({
        sessionId:session.id
      });

      if(result.error){
        console.log(result.error);
      }
    }

  return (
    <>
    <Header/>
    <div>

    <div id="carouselExampleIndicators" style={{marginBottom:"5vh",marginTop:"7vh"}} class="carousel slide" data-ride="carousel" >
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner" style={{height:"92vh"}}>
    <div class="carousel-item active">
   
      <img class="d-block w-100" src="https://assets.vogue.com/photos/6352ccb841ea2bd565be085f/master/w_2560%2Cc_limit/GettyImages-1223580360.jpg" alt="First slide" style={{height:"90vh",width:"96.5vw",borderRadius:"0"}}/>
      <span class="image-number" style={{position: "absolute",top: "10px",left:" 10px", backgroundColor: "transparent",padding:"5px",borderRadius: "5px",color:"whitesmoke",Index: "1"}}>1 of 3</span>

  
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="https://i0.wp.com/swadishta.de/wp-content/uploads/2021/01/Idle.jpg?fit=1200%2C800&ssl=1" alt="Second slide" style={{height:"90vh",width:"96.5vw",borderRadius:"0"}} />
      <span class="image-number" style={{position: "absolute",top: "10px",left:" 10px", backgroundColor: "transparent",padding:"5px",borderRadius: "5px",color:"whitesmoke"}}>2 of 3</span>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="https://lh3.googleusercontent.com/BXdVH2NOm7RU9F0nnCFaz2y-UHmdhKQSAtmhQYP3LroJ9_kKoHcTlfvbLytyuSeDKsuDCj1PNiUmQ6vsCBEKyytUiF8j5nQpO2iaJVk=w1200-rw" alt="Third slide" style={{height:"90vh",width:"96.5vw",borderRadius:"0"}}/>
      <span class="image-number" style={{position: "absolute",top: "10px",left:" 10px", backgroundColor: "transparent",padding:"5px",borderRadius: "5px",color:"whitesmoke"}}>3 of 3</span>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    {/* <span class="sr-only">Previous</span> */}
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    {/* <span class="sr-only">Next</span> */}
  </a>
</div>
    
    
    <div style={{display:"grid", gridTemplateColumns:"auto auto",justifyContent:"space-between",width:"95vw",marginLeft:"auto", marginRight:"auto", marginTop:"-2vh"}}>
      <h2>{restaurant.name}</h2>
      <button style={{background:"red",color:"white",fontSize:"large",fontWeight:"bold",border:"none",borderRadius:"5px",cursor:"pointer",outline:"none"}} onClick={()=>setShowModal(true)}>Order Online</button>
    </div>
    <div style={{width:"95vw",marginLeft:"auto", marginRight:"auto"}}>
      <button style={{border:'none',borderBottom:overviewDiv ? "2px solid red":"2px solid #80808000",color:"blue",background:"transparent",outline:"none",cursor:"pointer",fontWeight:"bolder",fontSize:"large"}} onClick={()=>showDiv("overview")}>Overview</button>
      <button style={{border:'none',borderBottom:overviewDiv ? "2px solid #80808000":"2px solid red",color:"blue",background:"transparent",outline:"none",cursor:"pointer",fontWeight:"bolder",fontSize:"large"}} onClick={()=>showDiv("contact")}>Contact</button>
      <hr style={{marginTop:"-1px",color:"gray",width:"95vw"}}/>
    </div>
   {overviewDiv &&  <div style={{width:"95vw",marginLeft:"auto", marginRight:"auto"}}>
        <div style={{fontSize:"large",fontWeight:"bold",color:"blue"}}> About this place </div>
        <div style={{fontSize:"medium",fontWeight:"bold",color:"blue",marginTop:"2vh"}}>Cuisine</div>
        <div style={{fontSize:"small",fontWeight:"bold",color:"grey"}}>{restaurant.cuisine[0].name + " , "+ restaurant.cuisine[1].name}</div>
        {console.log(restaurant.cuisine.name)}
        <div style={{fontSize:"medium",fontWeight:"bold",color:"blue",marginTop:"2vh"}}>Average Cost</div>
        <div style={{fontSize:"small",fontWeight:"bold",color:"grey"}}>&#8377;{restaurant.min_price} for two people approx</div>
        <div style={{fontSize:"medium",fontWeight:"bold",color:"blue",marginTop:"2vh"}}>Average Rating</div>
        <div style={{fontSize:"small",fontWeight:"bold",color:"grey"}}>{restaurant.aggregate_rating} &#10030;  {" "+restaurant.rating_text}</div>

    </div>}

   {contactDiv && <div style={{width:"95vw",marginLeft:"auto", marginRight:"auto"}}>
        <div style={{fontSize:"medium",fontWeight:"bold",color:"blue",marginTop:"2vh"}}> Phone Number </div>
        <div style={{fontSize:"small",fontWeight:"bold",color:"grey"}}>{restaurant.contact_number}</div>
        <div style={{fontSize:"medium",fontWeight:"bold",color:"blue",marginTop:"2vh"}}>{restaurant.name}</div>
        <div style={{fontSize:"small",fontWeight:"bold",color:"grey"}}>{restaurant.locality}, {restaurant.city}</div>

    </div>}


    </div>

   {showModal && <Modal isOpen={showModal} style={customStyles}>
       
       
       <div>
       <div style={{display:"grid",gridTemplateColumns:"auto auto",justifyContent:"space-between",marginBottom:"2vh"}}>
        <h2 style={{color:"darkred",fontWeight:"bold"}}>{restaurant.name} Menu</h2>
        <button style={{color:"red",height:"6vh",width:"2.5vw",fontSize:"large",border:"2px solid red",borderRadius:"9px",background:"white",cursor:"pointer",outline:"none"}} onClick={()=>setShowModal(false)}>X</button>
        </div>
        {menuData && menuData.map((menu,index)=>(
        <div>

        <div style={{display:"flex",width:"95%",marginLeft:"auto",marginRight:"auto"}}>

            <div>
              <img src={menu.image} alt='' style={{height:"19vh",width:"9vw",borderRadius:"22px"}}/>
            </div>

            <div style={{width:"87%"}}>
              <h4 style={{marginTop:"1vh",marginBottom:"0"}}>{menu.name}</h4>
              <h5 style={{color:"red",marginBottom:"0"}}>&#8377;{menu.price}</h5>
              <h5 style={{color:"grey"}}>{menu.details}</h5>
            </div>

            <div style={{display:"grid", gridTemplateColumns:"auto auto auto",marginTop:"2vh"}}>
                <button style={{height:"7vh",width:"3vw",background:"white", border:"1px solid grey",borderRadius:"50%",fontSize:"x-large",fontWeight:"bolder",color:"grey",cursor:"pointer",outline:"none"}} onClick={()=>counterset(index,"incr")}>+</button>

                <h5 style={{marginTop:"2vh",marginLeft:"10px",marginRight:"10px"}}>{counters[index]}</h5>
                
                <button style={{height:"7vh",width:"3vw",background:"white", border:"1px solid grey",borderRadius:"50%",fontSize:"x-large",fontWeight:"bolder",color:"grey",cursor:"pointer",outline:"none"}} onClick={()=>counterset(index,"decr")}>-</button>
            </div>
        </div>  

        </div>
       ))}
       <div style={{marginTop:"2vh",display:"grid",gridTemplateColumns:"auto auto", justifyContent:"space-between"}}>
        <h2 style={{color:"darkred",fontWeight:"bold"}}>SubTotal {calculateSubtotal()} 
        </h2>

        <button style={{background:"red",color:"white",fontSize:"large",fontWeight:"bold",border:"none",borderRadius:"5px",padding:"10px",cursor:"pointer",outline:"none"}} onClick={makePayment}>Pay Now</button>
        </div>
       
       </div>
      </Modal>}

    </>


  )
}

export default Details