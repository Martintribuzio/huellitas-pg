import React,{useState} from "react";

const UserContext=React.createContext([{},()=>{}]);

let initialState={};
interface Props{
    children:React.ReactNode
}
const UserProvider:React.FC<Props>=(children)=>{
    const [state,setState]=useState(initialState);
    return(
        <UserContext.Provider value={[state,setState]}>
            {children}
        </UserContext.Provider> )    
}

export {UserContext, UserProvider}