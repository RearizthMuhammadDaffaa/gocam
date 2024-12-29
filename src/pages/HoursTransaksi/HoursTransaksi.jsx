import React, { useEffect, useState } from 'react'

import "./HoursTransaksi.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
const HoursTransaksi = ({setShowLogin}) => {
  const {auth} = useAuth();
  const {id} = useParams();
  const [data, setData] = useState({});
  const [count,setCount] = useState(0);
  const getData = async () =>{
    const response = await axios.get(`${import.meta.env.VITE_API}kamera/${id}`)
    setData(response.data)
    console.log(data);
    
  }
  useEffect(()=>{
    
    
    getData()
  },[])

  const calculateCount = (event) => {
    if(event == "tambah"){
      setCount(prev => prev + 1)
    }else {
      if(count == 0 || count < 1){
        setCount(0)
      }else{
        setCount(prev => prev - 1)
      }
    }
  }
  const handleCheckout = async () => {
    if (!auth.user) {
      setShowLogin(true);
      return;
    }
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}transaksi`, {
        name:auth?.name,
        noNik:"123456",
        hoursRent:count,
        kameraId: id,
      });
  
      // Arahkan ke Stripe Checkout
      window.location.href = response.data.sessionUrl;
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      alert("Terjadi kesalahan saat memproses transaksi.");
    }
  };

  return (
    <div className="days-transaksi">
          <h1 className="title">{data.name}</h1>
          <div className="days-transaksi-container">
            <div className="transaksi-img-container">
              <img src={data.url} alt="" />
    
            </div>
            <div className="cam-spesifikasi">
             
           
              <div className="cam-keterangan">
              <h1>Keterangan</h1>
              <div className="info-cam">
              <p>Battery : {data.battery}</p>
              <p>lens : {data.lens}</p>
              <p>Merk: {data.merk}</p>
              <p>Cinemacam : {data.cinemacam}</p>
              </div>
             
             
              </div>
              
            </div>
          </div>
          <div className="counter">
            <button onClick={() => calculateCount("kurang")}>-</button>
                <span>{count}</span>
                <button onClick={() => calculateCount("tambah")}>+</button>
            
            </div>
           
          <button onClick={handleCheckout} className="btn-buy">Rp.{count * data.hoursPrice}  |Pesan Sekarang</button>
         
        </div>
  )
}

export default HoursTransaksi