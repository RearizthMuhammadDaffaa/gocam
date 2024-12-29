import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Footer from "./components/Footer/Footer";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";
import DayTransaksi from "./pages/DayTransaksi/DayTransaksi";
import HoursTransaksi from "./pages/HoursTransaksi/HoursTransaksi";
import Sukses from "./pages/Verify/Sukses";
import Cancel from "./pages/Verify/Cancel";
import Inventory from "./pages/Inventory/Inventory";
import Katalog from "./pages/Katalog/Katalog";


const App = () => {
  const [showLogin,setShowLogin] = useState(false)
  return (
    <>
    {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="transaksi/:id" element={<DayTransaksi setShowLogin={setShowLogin} />}/>
          <Route path="transaksi-jam/:id" element={<HoursTransaksi setShowLogin={setShowLogin} />}/>
          <Route path="success" element={<Sukses />}/>
          <Route path="cancel" element={<Cancel />}/>
          <Route path="inventory" element={<Inventory />}/>
          <Route path="katalog" element={<Katalog />}/>
        </Routes>
      </div>
      
      <Footer />
    </>
  );
};

export default App;
