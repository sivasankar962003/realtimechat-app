import React, { useContext, useState } from 'react'
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {

    const [currState,setCurrState]=useState("Sign Up")
    const [fullName,setFullName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [bio,setBio]=useState("")
    const [isDataSubmitted,setIsDataSubmitted]=useState(false)
    const {login}=useContext(AuthContext)

    const onSubmitHandler=(event)=>{
        event.preventDefault();
        if(currState==="Sign Up" && !isDataSubmitted){
            setIsDataSubmitted(true);
            return;
        }
login(currState==="Sign Up"?"signup":"login",{fullName,email,password,bio})
    }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
        <img src={assets.logo_big} alt="" className='w-100'/>



    <form onSubmit={onSubmitHandler}className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg w-100'>
    <h2 className='font-medium text-2xl flex justify-between items-center'>
        {currState} 
        {isDataSubmitted && 
        <img onClick={()=>setIsDataSubmitted(false)}src={assets.arrow_icon} alt="" className='w-5 cursor-pointer'/> }
    </h2>
    {currState==="Sign Up" && !isDataSubmitted &&(
        <input type="text" onChange={(e)=>setFullName(e.target.value)} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Full Name' required/>
    )}
    {!isDataSubmitted && (

        <>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email Address' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
        </>
    )}
    { currState==="Sign Up" && isDataSubmitted && (
        <textarea onChange={(e)=>setBio(e.target.value)} value={bio } rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder="Provide a short bio..." required/>

    )}
    <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
        {currState==="Sign Up"?"Create Account":"Login Now"}
    </button>
    <div className='flex items-center gap-2 text-sm text-gray-500'>
        <input type="checkbox"/>
        <p>Agree to the terms of use & privacy policy</p>

    </div>
    <div className='flex flex-col gap-2'>
        {currState==="Sign Up"?(<p className='text-sm text-gray-600'>Already  have an account?<span onClick={()=>{setCurrState("login"); setIsDataSubmitted(false)}} className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>):
        (
            <p className='text-sm text-gray-600'>Create an account <span onClick={()=>{setCurrState("Sign Up"); setIsDataSubmitted(false)}} className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>
        )}

    </div>



    </form>
    </div>
  )
}

export default LoginPage;