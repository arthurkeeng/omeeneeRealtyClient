import { createContext, useEffect, useState } from "react";


export const AuthContext  = createContext()

export const AuthContextProvider  = ({children}) =>{
    let user = JSON.parse(localStorage.getItem("user")) || null
    const [currentUser, setCurrentUser] = useState(user)
   
    

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);
    
    
    const updateUser =(newUser) =>{
        
          setCurrentUser(newUser)
        }

    return (
        <AuthContext.Provider  value={{currentUser , updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}