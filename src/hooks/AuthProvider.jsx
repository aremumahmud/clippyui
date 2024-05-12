import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import uri from "../utils/urls";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const loginAction = async (data, dispatch ,dispatchError, setLoad) => {
    try {
      const response = await fetch(uri.server + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      console.log(res)
      if (res.message) {
        setUser({
            messages: res.messages,
            username: res.username,
            dateJoined: res.dateJoined
        });
        setToken(res.token);
        localStorage.setItem("site", res.token);
        dispatchError('')
        dispatch("Login Successful")
        setLoad(false)
        setTimeout(()=> navigate("/dashboard"), 2000)
       
        return;
      }
      throw new Error(res.error);
    } catch (err) {
        dispatch('')
        dispatchError(err.message)
        setLoad(false)
      console.error(err);
    }
  };
  const registerAction = async (data , dispatch ,dispatchError, setLoad) => {
    try {

    
      const response = await fetch(uri.server + "register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.message) {
        dispatch("User registration Successful")
        setLoad(false)
        navigate("/login");
        dispatch('')
        dispatchError('')
        return;
      }
      throw new Error(res.error);
    } catch (err) {
        dispatchError(err.message)
        setLoad(false)
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
    
  };

  const setMessages1 = (messages)=>{
    setUser({
      messages,
      username: user.username,
      dateJoined: user.dateJoined
    })
  }


  const setUserData = (username , messages , dateJoined)=>{
    setUser({
      messages,
      username,
      dateJoined
  });
  }

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut, registerAction, setUserData, setMessages:setMessages1 }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};