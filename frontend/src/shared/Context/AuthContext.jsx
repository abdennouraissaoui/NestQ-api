import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    login: () => { }, 
    logout: () => { }
});



