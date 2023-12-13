import React, { useEffect, useState } from 'react'

import './styles/index.css'

import Header from '../Day 84 DIY/Header'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { data } from '../../App'



const FilterData = () => {

    const [locations,setLocations]=useState([]);
    const [cities,setCity]=useState([]);
    const [selectCity,setSelectCity]=useState("");
    const [showCuisine,setShowCuisine]=useState(false);
    const {id,name}=useParams();
    console.log(id);

    const getLocationsById=async()=>{
        await axios.get(`http://localhost:5000/getRestaurById/${id}`)
        .then(result=>setLocations(result.data.restaurData))
        .catch(error => console.log(error));
    }

    const getCities=async()=>{
        await axios.get(`http://localhost:5000/getCities`)
        .then(result=>setCity(result.data.cityData))
        .catch(error => console.log(error));
    }

    const filterByCity=(e)=>{
        const city=e.target.value;
        if(city){
            axios.get(`http://localhost:5000/getAllRestaurants/${city}/${id}`)
            .then(res=>{
                setLocations(res.data);
                setSelectCity(city);
                setShowCuisine(true);

                // console.log(locations);
            })
            .catch(error=>console.log(error));
            console.log(city);

        }
        else{
            setShowCuisine(false);

        }
        setShowCuisine(false); //if user changes the city from location dropdown, he should get new fresh radio button options to select
    }

    const filterByCuisine=async(e)=>{
        const cuisine=e.target.value;
        console.log(e.target.value);
        if(cuisine){
            axios.get(`http://localhost:5000/getByLocationAndCuisine/${selectCity}/${cuisine}/${id}`)
            .then(res=>{
                setLocations(res.data.restaurData);
            })
            .catch(error=>console.log(error));
        }
        else{
            cuisine="";
        }
       
       
    }
    console.log(locations);

    const filterByCost=async(lcost,hcost)=>{
        
        
            axios.get(`http://localhost:5000/getRestaurByCostRange/${lcost}/${hcost}/${id}?selectCity=${selectCity}`)
            .then(res=>{
                setLocations(res.data.restaurData);

            })
            .catch(error=>console.log(error));
        
    }

    const filterByCostOrder=async(order)=>{
        console.log(typeof(order));
        
        if(order){
            axios.get(`http://localhost:5000/getRestaurByCostOrder/${order}/${id}?selectCity=${selectCity}`)
            .then(res=>{
                setLocations(res.data.restaurData);
  
            })
            .catch(error=>console.log(error));
        }
       
        
    }

    useEffect(()=>{
        getLocationsById();
        getCities();
    },[])


  return (
    <div>


        <Header/>

    <div className="container" style={{marginTop:"10vh"}}>
        <h1>{name}</h1>


        <div className="cardbox">
           
            <div className="filter">
                <h3 className="filterh3" style={{marginTop:"2vh"}}>Filters</h3>
                
                <div className="searchbar">
                    <p className="loctxt" style={{marginTop:"2vh"}}>Select Location</p>
                    
                    <select id="city" name='city' style={{width:"14vw",marginBottom:"2vh"}} onChange={filterByCity}>
                      <option value={""}>-- Select Location --</option>
                        {cities.length>0 && cities.map((val,index)=>(
                        
                        <option  value={val}>{val}</option>
                        ))}
                    </select>
                </div>
                 {showCuisine && <div className="cuisine">
                    <p className="ctxt">Cuisine</p>
                    <div className="checkbox">
                        <div className="innercheckbox">
                        <input type="radio" className="inputcheck" name="radio" onChange={filterByCuisine} value="North Indian"/>
                         <p className="checktxt">North India</p>
                        </div>
                        <div className="innercheckbox">
                        <input type="radio" className="inputcheck" name="radio" onChange={filterByCuisine} value="South Indian"/>
                         <p className="checktxt">South India</p>
                        </div>
                        <div className="innercheckbox">
                         <input type="radio" className="inputcheck" name="radio" onChange={filterByCuisine} value="Chinese"/>
                         <p className="checktxt">Chinese</p>
                        </div>
                        <div className="innercheckbox">
                         <input type="radio" className="inputcheck" name="radio" onChange={filterByCuisine} value="Fast Food"/>
                         <p className="checktxt" >Fast Food</p>
                        </div>
                        <div className="innercheckbox">
                         <input type="radio" className="inputcheck" name="radio" onChange={filterByCuisine} value="Street Food"/>
                         <p className="checktxt"> Street Food</p>    
                        </div>
                    </div>
                </div>}
                <div className="cost">
                    <p className="costtxt">Cost for two</p>
                    <div className="radio">
                        <div className="inputradio">
                        <input type="radio" className="costradio" name="costradio" onChange={()=>filterByCost(0,500)}/> 
                        <p className="costp">Less than &#8377;500</p>
                        </div>
                        <div className="inputradio">
                        <input type="radio" className="costradio" name="costradio" onChange={()=>filterByCost(500,1000)}/>
                         <p className="costp">&#8377;500 to &#8377;1000</p>
                        </div>
                        <div className="inputradio">
                         <input type="radio" className="costradio" name="costradio" onChange={()=>filterByCost(1000,1500)}/> 
                        <p className="costp">&#8377;1000 to &#8377;1500</p> 
                        </div>
                        <div className="inputradio">
                        <input type="radio" className="costradio" name="costradio" onChange={()=>filterByCost(1500,2000)}/> 
                        <p className="costp">&#8377;1500 to &#8377;2000</p>
                        </div>
                        <div className="inputradio">
                        <input type="radio" className="costradio" name="costradio" onChange={()=>filterByCost(2000,2500)}/>
                         <p className="costp">&#8377;2000+</p>
                        </div>
                    </div>
                </div>
                <div className="sort">
                    <p className="sorttxt">Sort</p>
                    <div className="radio2">
                        <div className="inputradio">
                            <input type="radio" className="costradio" name="costradio2" onChange={()=>filterByCostOrder('low')} value="low"/> 
                            <p className="costp">Price: Low To High</p>
                            </div>
                            <div className="inputradio">
                            <input type="radio" className="costradio" name="costradio2" onChange={()=>filterByCostOrder('high')} value="high"/>
                             <p className="costp">Price: High To Low</p>
                            </div>
                    </div>

                </div>
            </div>
            <div className="cards">
                <div className="upperdropdown">
                    <select className="uppersort" style={{padding:"10",height:"5vh"}}>
                        <option>Filters / Sort</option>
                      

                    </select>
                </div>
                
                {
                   locations.length>0 && locations.map((restaur,index)=>(
                        <Link to={"/Details"} className="card2" style={{textDecoration:"none"}} state={{data:restaur}}>
                    {console.log(restaur)}
                    <div className="upperdiv">
                        <img src={restaur.image} alt="Image not available" style={{height:"16vh",width:"9vw"}}/>
                        {console.log(restaur.image)}
                    <div className="desc">
                        <p className="para1">{restaur.name}</p>
                        <p className="para2" style={{fontWeight:"initial"}}>{restaur.locality}</p>
                        <p className="para3" style={{color:"black"}}>{restaur.city}</p>
                    </div>
                    </div>
                    <hr/>
                    <div className="bottomdiv">
                        <div className="costlabel">
                            <p className="labelp1">
                                CUISINES:
                            </p>
                            <p className="labelp2">
                                COST FOR TWO:
                            </p>
                        </div>
                        <div className="costvalue">
                            <p className="labelvp1">
                                {restaur.cuisine[0].name + " "+ restaur.cuisine[1].name}
                            </p>
                            <p className="labelvp2">
                                &#8377;{restaur.min_price}
                            </p>
                        </div>
                    </div>
                        </Link>
                    ))
                }
                  {locations.length===0 && <h2 style={{color:"gray",textAlign:"center",marginTop:"10vh"}}>...Looks like there's nothing here</h2>} 
          
            </div>
        </div>
    </div>
    </div>
  )
}

export default FilterData