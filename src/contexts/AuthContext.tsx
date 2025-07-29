import {createContext} from "react";

interface AuthContextType{
    accessToken : string | null;
    login: (accessToken:string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
