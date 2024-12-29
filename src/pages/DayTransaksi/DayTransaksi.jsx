import React, { useState, useEffect } from "react";
import "./DayTransaksi.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange,DateRangePicker } from "react-date-range";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const DayTransaksi = ({setShowLogin}) => {
  const { auth, setAuth } = useAuth();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [hargaTotal, setHargaTotal] = useState(data.daysPrice);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [name, setName] = useState("");
  const [noNik, setNoNik] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const getData = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API}kamera/${id}`);
    setData(response.data);
    console.log(data);
    
  };
  function calculateHarga(item) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentMonthName = monthNames[item.selection.startDate.getMonth()];
    const endMonthName = monthNames[item.selection.endDate.getMonth()];
    setDate([item.selection]);
    setStartDate(
      `${item.selection.startDate.getDate()} ${currentMonthName} ${item.selection.startDate.getFullYear()}`
    );
    setEndDate(
      `${item.selection.endDate.getDate()} ${endMonthName} ${item.selection.endDate.getFullYear()}`
    );
    const differenceInTime =
      item.selection.endDate.getTime() - item.selection.startDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Perbedaan waktu dalam hari

    // Memperbarui harga total
    if (differenceInDays > 0 && data.daysPrice) {
      setHargaTotal(data.daysPrice * differenceInDays);
    } else {
      setHargaTotal(0); // Menghindari harga negatif jika tidak ada perbedaan hari atau harga awal tidak tersedia
    }
  }

  useEffect(()=>{
    getData()
    console.log(auth);
    
  },[])
  
  const handleCheckout = async () => {
    if (!auth.user) {
      setShowLogin(true);
      return;
    }
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}transaksi`, {
        name:auth?.name,
        noNik,
        startDate,
        endDate,
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
          <div className="calendar-container">
        
          <DateRange
        className="calendar"
        editableDateInputs={true}
        onChange={(item) => {
          calculateHarga(item);
          
          
        }}
        moveRangeOnFirstSelection={false}
        ranges={date}
      />
        </div>
        </div>
      </div>
       
      <button onClick={handleCheckout} className="btn-buy">Rp. {hargaTotal} |Pesan Sekarang</button>
     
    </div>
  );
};

export default DayTransaksi;
