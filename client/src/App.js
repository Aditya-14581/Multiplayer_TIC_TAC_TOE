import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import "preline/preline";


import JoinGame from "./components/JoinGame";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (
      window.HSStaticMethods &&
      typeof window.HSStaticMethods.autoInit === "function"
    ) {
      window.HSStaticMethods.autoInit();
    }
  }, [location.pathname]);

  const api_key = process.env.REACT_APP_API_KEY;
  console.log("heelo", api_key);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(true);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }
  return (
    <div className="App overflow-hidden">
      {isAuth ? (
        <Chat client={client} >
          <JoinGame logOut={logOut} />
        </Chat>
      ) : (
        <>
          {isSigningUp ? (
            <SignUp setIsAuth={setIsAuth} setIsSigningUp={setIsSigningUp} />
          ) : (
            <Login setIsAuth={setIsAuth} setIsSigningUp={setIsSigningUp} />
          )}
        </>
      )}
    </div>
  );
}
export default App;