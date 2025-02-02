import { createContext, useContext, useEffect, useState } from "react";
import {io } from "socket.io-client"
import { AuthContext } from "./authContext";

export const SocketContext  = createContext()

export const SocketContextProvider  = ({children}) =>{
    const {currentUser} = useContext(AuthContext)
    const [socket, setSocket] = useState(null)
   
   useEffect(() => {
        setSocket(io("http://localhost:5000"))

    }, []);
useEffect(()=>{
    currentUser && socket?.emit("newUser" ,currentUser._id)
},[currentUser , socket])
    return (
        <SocketContext.Provider  value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}