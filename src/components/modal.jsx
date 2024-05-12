import "../css/modal.css";
import { useAuth } from "../hooks/AuthProvider";

function Modal({ text, link, linktext, setLogoutModal, logoutModal , setErrorModal }) {

  const auth = useAuth()
  return (
    <div className="modal">
      <div className="card">
        <p className="message">{text}</p>

        <div className="actions">
          {!logoutModal ? (
            <a className="read" href={link || ""}>
              {linktext || ""}
            </a>
          ) : (
            <>

            <a className="read_invert" onClick={()=>auth.logOut()}>
              Logout
            </a>
            <a className="mark-as-read_invert" onClick={()=>{setLogoutModal(false); setErrorModal(false)}}>
              Cancel
            </a>
            
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
