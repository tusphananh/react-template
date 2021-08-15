import React, { createContext,useState,useEffect } from "react";
const ENDPOINT = "http://localhost:5000";

export const SocketMessageContext = createContext()

const SocketMessageProvider = (props) =>{ 
    const [message,setMessage] = useState('')

    const socketMessageData = {
        message
    }

 
    return (
        <SocketMessageContext.Provider value= {socketMessageData} >
            {props.children}
        </SocketMessageContext.Provider>
    )
}

export default SocketMessageProvider
