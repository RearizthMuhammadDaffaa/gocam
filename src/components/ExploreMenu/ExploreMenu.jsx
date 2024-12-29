import React, { useEffect, useState } from 'react'
import "./exploreMenu.css"
import { assets, menu_list } from '../../assets/frontend_assets/assets'
import axios from 'axios'
const ExploreMenu = ({category,setCategory,judul}) => {
  const [data,setData] = useState([]);
  const getData = async ()=>{
    const response = await axios.get(`${import.meta.env.VITE_API}merk`)
    setData(response.data)
    console.log(data);
    
  }
  useEffect(()=>{  
    getData()
  },[category]) 
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1 className='text-3xl'>{judul ? "" : "Explore Our Camera"}</h1>
      <p className='explore-menu-text '>{judul ? "" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, perspiciatis assumenda commodi debitis aliquid nihil?"}</p>
      <div className="explore-menu-list">
      <div onClick={()=>setCategory("All")}  className="explore-menu-list-item">
              <img src={assets.logo} alt="" />
              <p>{"ALL"}</p>
            </div>
        {data.map((item,index)=> {
          return (
            <div onClick={()=>setCategory(prev => prev === item.menu_name ? "All" : item.name)} key={index} className="explore-menu-list-item">
              <img className={category===item.name ? "active" : ""} src={item.url} alt="" />
              <p>{item.name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu