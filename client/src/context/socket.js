import React, { createContext,useState,useEffect } from "react";
import socketClient from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

export const SocketMessageContext = createContext()

const socket = socketClient(ENDPOINT);

const SocketMessageProvider = (props) =>{ 
    const [message,setMessage] = useState('')

    const sendMessage = (data) =>
    { 
        socket.emit('message', data);
    }
    
    useEffect(()=>{
        socket.on("connection", (data) => {
            setMessage(data.message)
        });
    
        socket.on("message", (data) => {
            setMessage(data)
        });
    },[])


    const socketMessageData = {
        message,sendMessage
    }

 
    return (
        <SocketMessageContext.Provider value= {socketMessageData} >
            {props.children}
        </SocketMessageContext.Provider>
    )
}

export default SocketMessageProvider
