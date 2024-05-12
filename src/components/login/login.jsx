import Header from "../header";
import Form from "./Form";
import './login.css'

function Login({register, Link}){
    return (
        <div className="wrapper">
              <Header username={''}/>
             <div className="login">
          
            <Form register={register} Link={Link}/>
        </div> 
        </div>
       
    )
}

export default Login