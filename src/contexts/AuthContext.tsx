import React,{useContext,createContext,useState,useEffect} from "react";

interface AuthContextType{
    accessToken : string | null;
    login: (accessToken:string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [accessToken,setAccessToken] = useState<string | null>(null);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            setAccessToken(token)
        }
    },[]);

    useEffect(()=>{
        const interval = setInterval(()=>{
            refreshAccessToken();
        }, 14 * 60 * 60)

        return clearInterval(interval)
    },[])

    const login = (accessToken:string) => {
        setAccessToken(accessToken);
        localStorage.setItem('token',accessToken);
        console.log(`Inside Auth context:${accessToken}`)
    }

    const logout = () => {
        setAccessToken(null);
        localStorage.removeItem("token");
    }

    const refreshAccessToken = async () =>{
        try{
            const res = await fetch("http://localhost:5000/auth/refresh-token",{
                method : 'POST',
                credentials: "include"
            });

            const data = res.json();

            if(!res.ok){
                logout();
            }
            else{
                localStorage.setItem('token',data.token)
                setAccessToken(data.token)
            }
        }
        catch(err: any){
            console.log(`Error refreshing access token ${err}`);
            logout()
        }
    }

    return(
        <AuthContext.Provider value={{accessToken,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () : AuthContextType =>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("Auth Context must be in Auth Provider")
    }
    
    return context
}