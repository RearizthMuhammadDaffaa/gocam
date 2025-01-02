import React, { useState } from 'react'
import "./navbar.css"
import { assets } from '../../assets/frontend_assets/assets'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Cookies from "js-cookie";
const Navbar = ({setShowLogin}) => {
  const [menu,setMenu] = useState("home");
  const { auth,setAuth } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(auth);
  };
  const handleLogout = () => {
    setAuth({ roles: [], user: null }); // Set auth menjadi kosong
    Cookies.remove("authuserrental"); // Hapus cookie
    navigate("/"); // Arahkan ke halaman login
  };
  return (
    <div className='navbar'>
      {/* <img src={assets.logo} alt="" className='logo' /> */}
      <h1 className='logo text-4xl font-bold text-sky-500 ' >Gocam.</h1>
     
      <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <Link to='/katalog' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Katalog</Link>
        <Link to='/inventory' onClick={() => setMenu("Inventory")} className={menu === "Inventory" ? "active" : ""}>Inventory</Link>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
        {!auth.user ? <button className='block lg:hidden' onClick={() => setShowLogin(true)}>sign in</button> : <button className='block lg:hidden' onClick={handleLogout}>Log out</button>} 
      </ul>
      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="" /> */}
        {/* <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div> */}
        {!auth.user ? <button className='hidden lg:block' onClick={() => setShowLogin(true)}>sign in</button> : <button className='hidden lg:block' onClick={handleLogout}>Log out</button>} 
        <div className="hamburger" onClick={toggleMenu}>
        <span className={`line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`line ${isMenuOpen ? 'open' : ''}`}></span>
      </div>
      </div>
    </div>
  )
}

export default Navbar