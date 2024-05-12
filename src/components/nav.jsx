import '../css/nav.css'
import logo from "../assets/clippy2.png";
import { FaHouse, FaPerson, FaPhone, FaPowerOff } from 'react-icons/fa6';
import { useAuth } from '../hooks/AuthProvider';
function Nav({logoutOptions , contactus, aboutus}){

    const auth = useAuth();
    return (
        <div className="nav">
           <div className="header_img">
            <img src={logo} alt="" />
            <p>navigation panel</p>
           
           </div>
           <div className="nav_list">
            <ul>
                <a href="/"><li><FaHouse />  Home</li></a>
                <li  onClick={()=> aboutus && aboutus()}><FaPerson />About us</li>
                <li onClick={()=> contactus && contactus()}><FaPhone />Contacts</li>
                <li onClick={()=> logoutOptions && logoutOptions()} style={{color:'red'}}><FaPowerOff color='red' /> Log out</li>
            </ul>
           </div>
           <div className="user_pane">
            <div className="image_pane">{auth.user?.username.slice(0, 2)}</div>
            <div className="info_pane">{console.log(auth.user)}
                <p>{auth.user?.username.split('@')[0]}</p>
                <p>Joined: {new Date(auth.user?.dateJoined).getFullYear()}</p>

            </div>
           </div>
        </div>
    )
}

export default Nav