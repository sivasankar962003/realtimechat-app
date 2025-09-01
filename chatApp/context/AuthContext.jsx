import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";


const backendUrl=import.meta.env.VITE_BACKEND_URL;
export const AuthContext=createContext();
axios.defaults.baseURL=backendUrl;

export const AuthProvider=({children})=>{
 
    const nav=useNavigate();
    const  [token,setToken]=useState(localStorage.getItem("token"));
    const  [authUser,setAuthUser]=useState(null);
    const  [onlineUsers,setOnlineUsers]=useState([]);
    const  [socket,setSocket]=useState(null);
    
    const  checkAuth=async()=>{
        try{
            const {data}=await axios.get("/api/auth/check");
            if(data.success){
                setAuthUser(data.user)
                connectSocket(data.user)
            }
        }catch(error){
                toast.error(error.message)
            }
    }
  const login=async(state,credentials)=>{
        try{
            const {data}=await axios.post(`/api/auth/${state}`,credentials, {headers: {
    'Content-Type': 'application/json'
  }});
  
            if(data.success){
                 axios.defaults.headers.common["token"]=data.token;
                
            localStorage.setItem("token",data.token)
            setToken(data.token)
                 console.log(data.token)
                toast.success(data.message)
                setAuthUser(data.userData);
                connectSocket(data.userData);
               
               
            }else{
                toast.error(data.message)
            }


        }catch(error){
            toast.error(error.message)
        }
    }
    const  logout=async()=>{
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        axios.defaults.headers.common["token"]=null;
        toast.success("logged out successfully");
        socket.disconnect();

    }

const  updateProfile=async(body)=>{

try{
    
const {data}=await axios.put("/api/auth/update-profile",body);
     
if(data.success){
    setAuthUser(data.user);
    toast.success("profile updated  successfully")
    nav('/');
    
}

}catch(error){
toast.error(error.message);

}


}


    const connectSocket=(userData)=>{

if(!userData || socket?.connected)return;
        const newSocket=io(backendUrl,{
            query:{
                userId:userData._id,            }

        })
        newSocket.connect();
        setSocket(newSocket);
newSocket.on("getOnlineUsers",(userIds)=>{
    setOnlineUsers(userIds)
})
    }
  

    useEffect(()=>{
        if(token){
            axios.defaults.headers.common["token"]=token;
        }
checkAuth();

    },[])

const value={
axios,
authUser,
onlineUsers,
socket,
login,logout,updateProfile


}
return(
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
)
}