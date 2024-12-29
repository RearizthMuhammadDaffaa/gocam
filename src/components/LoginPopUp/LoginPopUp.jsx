import React, { useEffect, useRef, useState } from 'react'
import "./LoginPopUp.css"
import { assets } from '../../assets/frontend_assets/assets'
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../alert/Alert';

const LoginPopUp = ({setShowLogin}) => {
  const [currState,setCurrState] = useState("Login");
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [name, setName] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [showError,setShowError] = useState(false);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginUrl = `${import.meta.env.VITE_API}login`;
    const signUpUrl = `${import.meta.env.VITE_API}signup`;
    setLoading(true)
    if(currState === "Login"){
      try {
        const response = await axios.post(loginUrl, {
          email: user,
          password: pwd
        }, {
          withCredentials: true
        });
        
        const roles = [response?.data?.user?.role];
        const name = response?.data?.user?.name;
       
        setAuth({ user, roles, name });
        setShowLogin(false)
        setLoading(false)
        console.log(roles,name);
        Cookies.set('authuserrental', JSON.stringify({ user, roles, name }), { expires: 7 }); // Simpan data auth di cookie
        
        setUser('');
        setPwd('');
        
        // navigate(from, { replace: true });
        
      } catch (err) {
        setShowError(true)
        if (!err?.response) {
          setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg('Login Failed');
        }
      }
    } else {
      try {
        const response = await axios.post(signUpUrl,
            {
              name:name,
              email:user,
              password:pwd
            },
          
        );
        setLoading(false);
      setCurrState("Login");
    } catch (err) {
      setShowError(true)
      setErrMsg(err.response.data.message);
     
  }
    }
  };


  return (
    <div className='login-popup'>
     {showError && <Alert msg={errMsg}/>} 
      <form onSubmit={handleSubmit} className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
          {currState==="Login" ? <></> : <input type="text" onChange={(e) => setName(e.target.value)}  placeholder='Your Name' required/>}      
          <input onChange={(e) => setUser(e.target.value)} type="email" placeholder='Your Email' required />
          <input onChange={(e) => setPwd(e.target.value)} type="password" placeholder='password' required/>
        </div>
        {loading ?  <button className="btn" disabled="disabled"><span className="loading loading-spinner loading-sm"></span> Loading</button> :   <button type='submit'> {currState==="Sign Up" ? "Create Acount" : "Login"}</button>}
       
       
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By continuing , i agree to the terms of use & privacy policy.</p>
                 
        </div>
        {currState==="Login" ? 
             <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p> :
             <p>Already have an account ? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopUp