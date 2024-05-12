import { FaBars, FaClipboard, FaClipboardCheck, FaHouse, FaPerson, FaPhone, FaPowerOff, FaTrash } from "react-icons/fa6";
import "../css/clipsection.css";
import getTimeAndDate from "../libs/getDateAndTime";
import logo from '../assets/clippy2.png'
import { useRef, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import DeleteMessage from "../libs/deleteMessage";

function ClipSection({ messages , logoutOptions , copy , success , error , contactus , aboutus}) {

  const auth = useAuth()
  let [on , setOn] = useState(false)

  let deleteMessage = (id)=>{

    const isDelete = window.confirm('Are you sure you want to delete this clip ?')

    if(!isDelete) return

    DeleteMessage(id).then(res=>{

      if(res.sucess){
        //sucess
        success("Clip deletion Successful")
        return 
      }

      //error
      error("Clip deletion Failed1")

    }).catch(err=>{
      console.log(err)
      error("Clip deletion Failed")
      //erro
    })
  }
  return (
    <div className="clip_section">
      <div className="mobile_head">
        <div className="head">
          <h1 className="header clip_head">Clips</h1>
         <div className="logo">
          <img src={logo} alt="" />
         </div>
         <div className="hamburger_menu" onClick={()=>setOn(val=>!val)}><FaBars /></div>
        </div>
         <div className="menu" style={{display:!on?'none':'block'}}>
          <div className="user_bar">
            <div className="image">{auth.user?.username.slice(0,2)}</div>
            <div className="info">
              <p>{auth.user?.username}</p>
              <p>Joined: {new Date(auth.user?.dateJoined).getFullYear()}</p>
              </div>
          </div>
         <ul>
                <li><a href="/"><FaHouse />  Home</a></li>
                <li onClick={()=>{ aboutus && aboutus(); setOn(false)}}><FaPerson />About us</li>
                <li onClick={()=> {contactus && contactus(); setOn(false)}}><FaPhone />Contacts</li>
                <li onClick={()=> logoutOptions && logoutOptions()} style={{color:'red'}}><FaPowerOff color='red' /> Log out</li>
            </ul>
         </div>
      </div>
      
       <div className="clips_list">
        {
          messages.length === 0 && <div className="clip_empty">
            No clips at the moment.
          </div>
        }
      {messages
        ? messages.map((message) => {

            let id = message._id
            let { time, date } = getTimeAndDate(message.date);
            return (
              <div className="clips" key={Math.random()}>
                <div className="copyicon" onClick={()=>copy && copy(document.getElementById(id))}>
                  <FaClipboardCheck />
                </div><div onClick={()=>deleteMessage(id)} className="copyicon down">
                  <FaTrash />
                </div>
                <div className="icon__">
                  <FaClipboard size={40} />
                </div>
                
                <div className="info">
                  <div className="date">{date}, {time}</div>
                  <div  className="content">
                    {message.text}
                  </div>
                  <input style={{height:0 , opacity:0, padding:0, position:'absolute'}} defaultValue={message.text} name="" id={id}  />
                  
                </div>
              </div>
            );
          })
        : []}
        </div>
    </div>
  );
}

export default ClipSection;
