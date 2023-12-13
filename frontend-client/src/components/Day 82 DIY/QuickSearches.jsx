import React,{useEffect, useState} from 'react'
// import card1img from './Assets/card1img.jpg'
// import card2img from './Assets/card2img.jpg'
// import card3img from './Assets/card3img.jpg'
// import card4img from './Assets/card4img.jpg'
// import card5img from './Assets/card5img.jpg'
// import card6img from './Assets/card6img.jpg'

import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const QuickSearches = () => {
    const [meal,setMeal]=useState([]);
    const navigate=useNavigate();
    const getMeal=async()=>{
        await axios.get("http://localhost:5000/getAllMealTypes")
        .then(result => setMeal(result.data))
        .catch(error => console.log(error));
        console.log(meal);
    }

    useEffect(()=>{
        getMeal();
    },[])

    console.log(meal);
    return (
        
    <div style={{background:"whitesmoke",marginBottom:"10vh"}}>
        <div class="" style={{marginTop:"2vh",width:"82%",marginLeft:"auto",marginRight:"auto"}}>
        <p class="h4" style={{color: 'darkblue'}}>Quick Searches</p>
        <p style={{color: 'gray'}}>Discover restaurants by type of meal</p>

        <div style={{display:"grid",gridTemplateColumns:"auto auto auto",columnGap:"2vw",rowGap:"3vh"}}>

            
        {meal && meal.map((val) => (
        <div key={val.id} style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',display:"grid",gridTemplateColumns:"auto auto",cursor:"pointer",height:"15vh",width:"25vw"}} onClick={()=>navigate(`/filterData/${val.meal_type}/${val.name}`)}
        
        >
            <div>
                <img src={val.image} style={{width: "7vw", height: "15vh", borderRadius: "0", padding: "0"}} alt={val.name} />
            </div>
            <div style={{marginLeft:"2px", textAlign: "justify",width:"14vw"}}>
                <p className="h5 mt-3 mb-0" style={{color: 'darkblue'}}>{val.name}</p>
                <p className="lg-w-75 md-w-100 sm-w-100">{val.content}</p>
            </div>
        </div>
    ))}

        
           
            </div>

            
        </div>
    </div>
  )
}

export default QuickSearches