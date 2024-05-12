import { useState } from "react";
import ForgttenModal from "../forgotten";
import Header from "../header";
import Form from "./Form";
import './login.css'


function Login({register, Link ,  success}){

    const [modal , setModal] = useState(false)

    return (
        <>
        {
            modal && <ForgttenModal success={success} closeModal={()=>setModal(false)} />
        }
        
         <div className="wrapper">
              <Header username={''}/>
             <div className="login">
          
            <Form openModal={()=>{setModal(true)}} register={register} Link={Link}/>
        </div> 
        </div>
        </>
       
       
    )
}

export default Login