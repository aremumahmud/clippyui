import '../../css/loader.css'
import logo from '../../assets/clippy1.png'
import { useEffect, useRef } from 'react';

function Loaders({Link, color}) {
  return (
    <div className="">
      <div className={color?"newtons-cradle_w":"newtons-cradle"}>
        <div className={color?"newtons-cradle__dot_w":"newtons-cradle__dot"}></div>
        <div className={color?"newtons-cradle__dot_w":"newtons-cradle__dot"}></div>
        <div className={color?"newtons-cradle__dot_w":"newtons-cradle__dot"}></div>
        <div className={color?"newtons-cradle__dot_w":"newtons-cradle__dot"}></div>
      </div>
    </div>
  );
}

export default Loaders;
