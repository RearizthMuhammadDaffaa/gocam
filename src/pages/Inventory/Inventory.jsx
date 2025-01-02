import React, { useEffect, useState } from 'react';
import "./Inventory.css";
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import CardInventory from './CardInventory';

function LoadingInventory (){
  return (
    <div className='mt-[100px] flex justify-center items-center h-[80vh]' >

      <span className="loading loading-ring loading-lg "></span>
    </div>
)
}


const Inventory = () => {
  const [data, setData] = useState([]); // Ubah dari {} menjadi [] karena data yang diterima berupa array
  const { auth } = useAuth();
  const [loading,setLoading] = useState(false)

 
  const getData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `${import.meta.env.VITE_API}transaksi-kamera?name=${auth.name}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if(loading) return <LoadingInventory />

 
  return (
    <div className="inventory">
      {data.length > 0 ? (
        data.map((item, index) => {
          let time = item.endDate ? item.endDate : item.hoursRent 
          return  (
            <CardInventory key={index} kameraName={item.kamera.name} img={item.kamera.url} time={time} status={item.statusPengambilan}/>
          )
        } )
      ) : (
        <p>No data available</p> // Pesan jika data kosong
      )}
    </div>
  );
};

export default Inventory;
