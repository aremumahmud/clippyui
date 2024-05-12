import { useRef, useState } from 'react'
import '../css/input.css'
import { FaPaperPlane } from 'react-icons/fa6'
import Loader from './loader2'
import sendMessage from '../libs/sendMessage'

function Input({success , error}){

    let inputRef = useRef()
    let [isLoad , setIsLoad] = useState(false)

    let sendClip = ()=>{

        let text = inputRef.current.value

        if(text.trim() === '') {
            return error('Clip text cannot be empty!')
        }
        setIsLoad(true)
        
        sendMessage(text).then(res=>{
           
              setIsLoad(false)
              inputRef.current.value = ''
              //alert(res)
         

        }).catch(err=>{
            setIsLoad(false)
            error('Operation Failed, please try again')
        })
    }

    return (
        <div className="input_wrap">
        <div className="input_">
            <input ref={inputRef} type="text" placeholder='Type here to Send .  .  .  .  .  .' />
            <div className="icon_" onClick={sendClip}>
                {
                    isLoad?  <Loader />:<FaPaperPlane size={25} />
                }
               
            </div>
        </div>
        </div>
    )
}

export default Input