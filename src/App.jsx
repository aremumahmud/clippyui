import { BrowserRouter as Router, Routes, Route , Link, Navigate, Outlet } from "react-router-dom";
import './App.css'
import Header from './components/header'
import Input from './components/input'
import Loader from "./components/Loader";
import Login from "./components/login/login";
import AuthProvider,{ useAuth } from "./hooks/AuthProvider";
import Dashboard from "./components/dashboard";
import Home from "./components/home";
import { ReactNotifications } from 'react-notifications-component'
import './css/notification_theme.css' 


import { Store } from 'react-notifications-component';


const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/login" />;
  return <Outlet />;
};

const success = (text)=>{
  Store.addNotification({
    title: "",
    message: text,
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 1000,
      onScreen: false
    }
  })
}
const error = (text)=>{
  Store.addNotification({
    title: "",
    message: text,
    type: "warning",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    isMobile: true,
    dismiss: {
      duration: 5000,
      onScreen: false
    }
  });
}

function App() {
  
  const clipboardCopy = (ref)=>{
    ref.select()
    let copy = document.execCommand('copy')
    copy? success("Message Copied Successfully.")
   : error("Copy Operation failed.")

  }

  return (
    <>
    <ReactNotifications />
    <Router>
    <AuthProvider>
       <Routes>
          <Route path="/" element={<Loader Link={Link}/>}/>
          <Route path="/login" element={<Login Link={Link}/>} />
          <Route path="/register" element={<Login register={true} Link={Link}/>} />
          <Route path="/home" element={<Home />} />
          <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard success={success} error={error} copy={clipboardCopy} />} />
          </Route>
       </Routes>
     </AuthProvider>
    </Router>
     
    </>
  )
}

export default App
