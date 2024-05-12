import { FaXTwitter } from "react-icons/fa6";
import "../css/modal.css";
import uri from "../utils/urls";
import "../css/forgotten.css";
import { useState } from "react";
import sendOTP from "../libs/sendOTP";
import Loader from "./loader2";
import verifyOTP from "../libs/verifyOTP";
import changePassword from "../libs/changePassword";

function ForgttenModal({closeModal, success}) {
  let [step, setStep] = useState(0);
  let [error , setError] = useState('')
  let [spinner , setSpinner] = useState(false)
  let [data, setData] = useState({
    email: "",
    otp: "",
    new_password: "",
  });


  const close = ()=>{
    // setStep(2)
    closeModal && closeModal()
  }

  const send=()=>{
    let email = document.getElementById('email')?.value
    setSpinner(true)

    if(!email || !email.trim()){
        setSpinner(false)
        return setError('Please enter a valid email address')
    }
       setError('')
       sendOTP(email).then(res=>{
    
       setSpinner(false)
        if(res.error){
         
           return  setError(res.message ||'Internal server Error' )
        }
        setData({...data ,email})
        success('OTP sent')
        setStep(step=>++step)

    }).catch(()=>{
        setSpinner(false)
      setError('Internal server Error')
    })
  }
  const verify=()=>{
    let otp = document.getElementById('otp')?.value
    setSpinner(true)
// console.log(otp , otp.length)
    if(!otp || otp.length < 4){
        setSpinner(false)
        return setError('Please enter a valid OTP')
    }
       setError('')
       verifyOTP(data.email , otp).then(res=>{
    
       setSpinner(false)
        if(res.error){
         
           return  setError(res.message ||'Internal server Error' )
        }

        setData({...data ,otp})

        success('OTP Verified')
        setStep(step=>++step)

    }).catch(()=>{
        setSpinner(false)
      setError('Internal server Error')
    })
  }

  const changepassword=()=>{
    let pass1 = document.getElementById('pass1')?.value.trim()
    let pass2 = document.getElementById('pass2')?.value.trim()
    setSpinner(true)
// console.log(otp , otp.length)
    if(!pass1 || !pass2){
        setSpinner(false)
        return setError('Please fill both fields below')
    }

    if(pass1.length < 8){
        setSpinner(false)
        return setError('Passwords should be at least 8 characters')
    }

    if(pass1 !== pass2){
        setSpinner(false)
        return setError('Passwords do not match')
    }
       setError('')
       changePassword(data.email , data.otp , pass1).then(res=>{
    
       setSpinner(false)
        if(res.error){
         
           return  setError(res.message ||'Internal server Error' )
        }

        setData({...data ,new_password: pass1})

        success('Password successfully updated')
        setStep(step=>++step)

    }).catch(()=>{
        setSpinner(false)
      setError('Internal server Error')
    })
  }

  return (
    <div className="modal">
      <div className="card">
        <div className="title">
          <h2>Forgotten Password</h2>
        </div>
        <p style={{color:'red'}}>{error}</p>
        <div className="form-group">
          {step === 0 && (
            <>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                required=""
              />
            </>
          )}

          {step === 1 && (
            <>
              <label htmlFor="email">One Time Password</label>
              <input
                type="text"
                id="otp"
                name="email"
                placeholder="Enter your OTP"
                required=""
              />
            </>
          )}

         {step === 2 && (
            <>
              <label htmlFor="email">Enter new password</label>
              <input
                type="password"
                id="pass1"
                name="email"
                placeholder="Enter your new password"
                required=""
              />
              <br />
               <label htmlFor="email">Confirm new password</label>
              <input
                type="password"
                id="pass2"
                name="email"
                placeholder="Confirm new password"
                required=""
              />
            </>
          )}
          {
            step === 3 && <p>Password reset successful</p>
          }
        </div>

        <div className="actions">
          {step === 1 && (
            <a className="read_invert" onClick={() => verify()}>
                 {
                    spinner? <Loader className="dark"/> : 'Verify OTP'
                }
              
            </a>
          )}
          {step === 2 && (
            <a className="read_invert" onClick={() => changepassword()}>
                 {
                    spinner? <Loader className="dark"/> : 'Change Password'
                }
             
            </a>
          )}
          {step === 0 && (
            <a className="read_invert" onClick={() => send()}>
                {
                    spinner? <Loader className="dark"/> : 'Send OTP'
                }
            
            </a>
          )}

          <a
            className="mark-as-read_invert"
            onClick={close}>
                {
                    step === 3?'Close':'Cancel'
                }
          
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgttenModal;
