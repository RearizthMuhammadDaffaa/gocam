import React, { useContext, useEffect, useState } from 'react'
import "./ItemDisplay.css"
import { StoredContext } from '../../context/StoredContext'
import CamItem from '../CamItem/CamItem'
import axios from 'axios'


const CamDisplay = ({category}) => {

  // const {food_list} = useContext(StoredContext)
  const [data,setData] = useState([]);
  const getData = async ()=>{
    const response = await axios.get(`${import.meta.env.VITE_API}kamera`)
    setData(response.data)
    console.log(data);
    
  }
  useEffect(()=>{  
    getData()
  },[category]) 

  return (
    <div className='cam-display' id='cam-display'>
      <h2>Katalog</h2>
      <div className="cam-display-list">
        {data.map((item,index) => {
          if(category==="All" || category===item.merk){
            return <CamItem key={index} id={item.id} name={item.name} merk={item.merk} hoursPrice={item.hoursPrice} daysPrice={item.daysPrice} url={item.url} />
          }
        })}
      </div>
    </div>
  )
}

export default CamDisplay