import '../css/home.css'
import '../App.css'
import copy from '../assets/copy.svg'
import logo from '../assets/clippy2.png'
import AboutUs from './aboutus'
import { FaBars, FaClipboard, FaClipboardCheck, FaHouse, FaPerson, FaPhone, FaPowerOff } from "react-icons/fa6";
import { useState } from 'react';
import { useAuth } from '../hooks/AuthProvider';
import Footer from './footer'


function Home(){
    let [on , setOn] = useState(false)
    let auth =  useAuth()
    return (
        <>
        <div className="clip_section home_clip">
      <div className="mobile_head">
        <div className="head">
         <div className="logo">
          <img src={logo} alt="" />
         </div>
         <div className="hamburger_menu" onClick={()=>setOn(val=>!val)}><FaBars /></div>
        </div>
         <div className="menu" style={{display:!on?'none':'block'}}>
         <ul>
                <li onClick={()=>setOn(false)}><a href="/"><FaHouse />  Home</a></li>
                <a onClick={()=>setOn(false)} href="#about"><li><FaPerson />About us</li></a>
                <a onClick={()=>setOn(false)} href="#contacts"><li><FaPhone />Contacts</li></a>
                <a onClick={()=>setOn(false)} href="/login"><li className='backside' style={{color:'red' , background:'black'}}> <FaPowerOff /> Log in</li></a>
            </ul>
         </div>
      </div>
      </div>
        <div className="landing-page">
        <header>

          <div className="container non_header" >
            <a href="#" className="logo1"><img src={logo} alt="" /></a>
            <ul className="links">
             <li> <a href="/">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contacts">Contact Us</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Get Started</a></li>
            </ul>
          </div>
        </header>
        <div className="content">
          <div className="container">
            <div className="info">
              <h1>Clippy Assistant: <br /> An App For Everyone</h1>
              <p>Seamlessly share text across devices,
Instantly and in real-time,
Connect your words without delay,
Effortlessly, wherever you may stray.</p>
              <button><a href="/register">Get Started</a></button>
            </div>
            <div className="image">
              <img src={copy} />
            </div>
          </div>
        </div>
      </div>
      <AboutUs />
      <Footer />
      </>
    )
}


export default Home