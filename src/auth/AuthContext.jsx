import { createContext, useContext, useState } from "react";
import dt from "./data.jsx";

const AuthContext = createContext(null);

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);

    async function login(email, password){

        const findeUser = dt.find(
            (u) => u.email === email && u.password === password
        )

        if(!findeUser){
            throw new Error("Пользователь не найден");
        }

        setUser(findeUser);
        return findeUser;
    }   

    async function logout(){
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);