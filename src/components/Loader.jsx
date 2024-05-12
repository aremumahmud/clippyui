import '../css/loader.css'
import logo from '../assets/clippy1.png'
import { useEffect, useRef } from 'react';

function Loader({Link, color}) {
  let Clickref = useRef()

  useEffect(()=>{
   
     setTimeout(()=>{
       Clickref.current.click()
     }, 3000)

  }, [])


  return (
    <div className="loader">
      <div className="logo"><img src={logo} alt="" /></div>
      <div className="newtons-cradle">
        <div style={color?{background:color}:{}} className="newtons-cradle__dot"></div>
        <div style={color?{background:color}:{}} className="newtons-cradle__dot"></div>
        <div style={color?{background:color}:{}} className="newtons-cradle__dot"></div>
        <div style={color?{background:color}:{}} className="newtons-cradle__dot"></div>
      </div>
     <Link ref={Clickref} to="/home" />
      
    </div>
  );
}

export default Loader;
