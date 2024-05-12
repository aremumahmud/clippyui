import Header from "./header";
import "../css/dashboard.css";
import { useAuth } from "../hooks/AuthProvider";
import { useEffect, useState } from "react";
import fetchUserData from "../libs/fetchUserData";
import Modal from "./modal";
import Input from "./input";
import ClipSection from "./ClipSection";
import Nav from "./nav";
import io, { Socket } from "socket.io-client";
import uri from "../utils/urls";
import ContactModal from "./ContactModal";

function Dashboard({copy , error , success}) {
  const auth = useAuth();

  let [messages, setMessages] = useState(auth.user?.messages || []);
  let [username, setUsername] = useState(auth.user?.messages || "");

  let [errorModal, setErrorModal] = useState(false);
  let [modalText, setModaltext] = useState("");
  let [link, setLink] = useState("/");
  let [linktext, setLinktext] = useState("");
  let [logoutModal, setLogoutModal] = useState(false);
  let [contactModal , setContactModal] = useState(false)
  let [contactType , setContactType] = useState('')

  const logOutOptions = () => {
    setModaltext("Are you sure you want to Logout of your Account?");
    setLogoutModal(true);
    setErrorModal(true);
  };

  const setMessagesIncomming = (new_message)=>{
    let currentMessages = [...messages]
    currentMessages.push(new_message)

    setMessages(currentMessages)
    auth.setMessages(currentMessages)

  }

  const deleteMessage = (msgID)=>{
    let currentMessages = [...messages]
    let FilteredMessages = currentMessages.filter(message=>{
      return message._id !== msgID
    })

    setMessages(FilteredMessages)
    auth.setMessages(FilteredMessages)
  }

  const aboutus = ()=>{
    setContactType('about')
    setContactModal(true)
  }
  const contactus = ()=>{
    setContactType('contact')
    setContactModal(true)
  }

  useEffect(() => {
    if (!auth.user) {
      fetchUserData()
        .then((res) => {
          if (res.error) {
            setErrorModal(true);
            if (res.geniune) {
              setLink("/");
              setLinktext("Click to Reload Page");
              return setModaltext(res.error);
            }
            setLink("/login");
            setLinktext("Click here to Login");
            setModaltext(
              "Your Access Token has expired or has been compromised, you will have to login to access your dashboard"
            );
            return;
          }

          auth.setUserData(res.username, res.messages, res.dateJoined);
          setMessages(res.messages);
          setUsername(res.username);
        })
        .catch((err) => {
          setLink(window.location);
          setLinktext("Click to Reload Page");
          setErrorModal(true);
          setModaltext(err.message);
        });
    }

    //socket.io
    const socket = io(uri.server);

    socket.on("message", (message) => {
      setMessagesIncomming(message)
    });


    socket.on('messageDeleted' , (msgID)=>{
deleteMessage(msgID)
    })

    

    socket.emit("register", localStorage.getItem('site'), (response) => {
      if (response.error) {
        setLink(window.location);
        setLinktext("Click to Reload Page");
        setModaltext(
          "An unexpected error occured, Please click the button below to reload this page"
        );
        setErrorModal(true);
        return;
      }
    });

    socket.on("connect_error", (error) => {
      setLink(window.location);
      setLinktext("Click to Reload Page");
      setModaltext(
        "An unexpected error occured, Please click the button below to reload this page"
      );
      setErrorModal(true);
      return;
      // Additional error handling logic here...
    });

    socket.on("registrationError", (error) => {
      if (error) {
        setLink("/login");
        setLinktext("Click here to Login");
        setModaltext(
          "Your Access Token has expired or has been compromised, you will have to re-login to access your dashboard"
        );
        setErrorModal(true);
        return;
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [auth]);

  // console.log(auth);
  return (
    <>
      {errorModal && (
        <Modal
          setErrorModal={setErrorModal}
          setLogoutModal={setLogoutModal}
          logoutModal={logoutModal}
          link={link}
          linktext={linktext}
          text={modalText}
        />
      )}
      {
        contactModal && (
          <ContactModal type={contactType}  setContactModal={setContactModal} />
        )
      }

      <div className="sections">
        <div className="section1">
          <Nav contactus={contactus} aboutus={aboutus} logoutOptions={logOutOptions} />
        </div>
        <div className="section2">
          <Input error={error} success={success} />
          {console.log(messages , messages.reverse())}

          <ClipSection contactus={contactus} aboutus={aboutus} error={error} success={success} copy={copy} logoutOptions={logOutOptions} messages={messages.slice().reverse()} />
        </div>
      </div>
      {/* <Header username={username || ''} /> */}
    </>
  );
}

export default Dashboard;
