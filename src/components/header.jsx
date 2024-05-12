import logo from "../assets/clippy2.png";
import '../css/header.css'

function Header({username}) {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="user">
        {
          username && <>
          <div className="username">{username.slice(0,10)}</div>
        <div className="image">{username.slice(0,2)}</div>
          </>
        }
        
      </div>{" "}
    </div>
  );
}

export default Header;
