import "./App.css";
import React, { useState, useContext } from "react";
import {SocketMessageContext} from  "./context/socket"
import Message from "./components/chat/Message";

const App = () => {
  const {message} = useContext(SocketMessageContext)
  console.log(message)
  return (
    <div className="App">
      <p>{message}</p>
      <Message></Message>
    </div>
  );
}

export default App;
