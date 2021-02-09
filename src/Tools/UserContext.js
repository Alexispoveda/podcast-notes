//React
import React, { useEffect, useState, createContext } from "react";

//Firebase
import {auth} from "./firebase";

//Loading
import Loading from '../Components/Loading/Loading'

//Export Context
export const UserContext = createContext();

//Export Provider
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setPending(false)
        });
    }, []);

    if (pending) {
        return <Loading/>
    }

    return (
        <UserContext.Provider value={{currentUser}}>
            {children}
        </UserContext.Provider>
    );
};