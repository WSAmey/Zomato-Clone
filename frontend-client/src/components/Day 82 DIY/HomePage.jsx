import React from 'react'
import Wallpaper from './Wallpaper'
import QuickSearches from './QuickSearches'
import foodbg from './Assets/foodbg.jpg'
import Header from '../Day 84 DIY/Header'

const HomePage = () => {
  return (
    <>
        <div style={{backgroundImage: `url(${foodbg})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
    <Header/>
        <Wallpaper/>
        <QuickSearches/>
        </div>
    </>  
)
}

export default HomePage