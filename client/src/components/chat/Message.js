import "./Message.css";
import React, { useState, useContext } from "react";
import {SocketMessageContext} from  "../../context/socket"

const Message = () => {
  const {sendMessage} = useContext(SocketMessageContext)
  const [message,setMessage] = useState('')

  const send = (event) =>{
    event.preventDefault()
    sendMessage(message)
  }

  return (
    <div className="Message">
      <input value={message} type="text" className="message-box" onChange={evt => setMessage(evt.target.value)} />
        <button className="send-btn" onClick= {evt => send(evt)} > Send </button>
    </div>
  );
}

export default Message;
