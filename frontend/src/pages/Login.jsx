import React,{useState} from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";




 const Login=()=>{
  const { setIsLoggedIn } = useAuth();
  const[isEmail,setIsEmail]=useState('');
  const[isPassword,setIsPassword]=useState('');
  const[isName,setIsName]=useState('');
  const[currentState,setCurrentState]=useState('Sign-up');
  const navigate=useNavigate();

  const LoginhandleSubmit=async(e)=>{
    e.preventDefault();

    try{
      const onSubmit=await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`,{
        email:isEmail,
        password:isPassword
      },{withCredentials:true})
      console.log(onSubmit.data);
      setIsLoggedIn(true);
      toast.success(onSubmit.data.message)

   setTimeout(()=>{
      navigate('/home')
    },1000)
    }
    catch(error){
      console.log(error);
toast.error(error.response?.data?.message || "Login failed")


    }
  }

  const SignUphandleSubmit=async(e)=>{
    e.preventDefault();

    try{
      const onSubmit=await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`,{
        name:isName,
        email:isEmail,
        password:isPassword
      },
    { withCredentials: true })
      console.log(onSubmit.data);
      setIsLoggedIn(true);
      toast.success(onSubmit.data.message)

      setTimeout(()=>{
      navigate('/home')
    },1500)
    }
    catch(error){
      console.log(error);
      toast.error(error.response?.data?.message || "user already exists")



    }
  }

  return(
    <div className="flex min-h-screen w-full   ">
    <div className="w-1/2 bg-cover bg-right bg-no-repeat text-white flex items-center justify-center p-8">
    <div className="text-center max-w-md">
      <h1 className="text-6xl text-gray-800 font-bold ">Welcome to <span className="text-blue-500">DSA</span> Tracker</h1>
      <p className="text-3xl font-semibold text-gray-800 mt-5">Track, Practice, and Master Data Structures and Algorithms.</p>
      <p className="text-black mt-2">Consistency beats talent when talent doesnt show up."
— Make your practice count, every day.</p>
      <div className="text-md bg-blue-500 rounded-full text-white mt-10"> 
        <h1>Email:demo@gmail.com</h1>
        <h1>Password:12345678</h1>
      </div>

    </div>
    
  </div>


    <div className="flex  items-center  px-4 w-1/2">
      {/*login form*/}
      {currentState==='Login'?(
      <form onSubmit={LoginhandleSubmit} className="flex justify-end flex-col gap-2.5 bg-[#1f1f1f] p-8 w-[450px] rounded-[20px] font-sans">
  <div className="flex flex-col">
    <h1 className="text-white font-bold text-3xl mb-2">Welcome back</h1>
    <h1 className="text-sm text-white mb-3">please enter your account details</h1>
    <label className="text-white text-left ml-2 mb-1 font-semibold">Email</label>
    <div className="border border-[#333] rounded-[10px] h-[50px] flex items-center pl-2.5 transition ease-in-out duration-200 bg-[#2b2b2b] focus-within:border-[#2d79f3]">
      <input
        type="email"
        placeholder="Enter your email"
        value={isEmail}
        onChange={(e)=>setIsEmail(e.target.value)}
        className="ml-2.5 rounded-[10px] border-none w-full h-full bg-[#2b2b2b] text-white placeholder:text-[#aaa] focus:outline-none"
      />
    </div>
  </div>

  <div className="flex flex-col">
    <label className="text-white text-left ml-2 mb-1 font-semibold">Password</label>
    <div className="border border-[#333] rounded-[10px] h-[50px] flex items-center pl-2.5 transition ease-in-out duration-200 bg-[#2b2b2b] focus-within:border-[#2d79f3]">
      <input
        type="password"
        placeholder="Enter your password"
        value={isPassword}
        onChange={(e)=>setIsPassword(e.target.value)}
        className="ml-2.5 rounded-[10px] border-none w-full h-full bg-[#2b2b2b] text-white placeholder:text-[#aaa] focus:outline-none"
      />
    </div>
  </div>

  <div className="flex flex-row items-center justify-between gap-2.5">
    <span className="text-[#2d79f3] text-sm font-medium cursor-pointer">Forgot Password?</span>
  </div>

  <button  type="submit" className="mt-5 mb-2.5 bg-[#2d79f3] text-white text-[15px] font-medium rounded-[10px] h-[50px] w-full cursor-pointer">
    Sign in
  </button>

  <p className="text-center text-gray-500 text-sm my-1.5">Dont have an account? 
    <span onClick={()=>setCurrentState('Sign-up')} className="text-white ml-1 cursor-pointer">Sign Up</span> </p>
</form>
      ):(
<form onSubmit={SignUphandleSubmit} className="flex justify-end flex-col gap-2.5 bg-[#1f1f1f] p-8 w-[450px] rounded-[20px] font-sans">
  <div className="flex flex-col">
    <h1 className="text-white text-center font-semibold text-2xl">Sign Up form</h1>
    <label className="text-white text-left ml-2 mb-1 font-semibold">Name</label>
    
    <div className="border border-[#333] rounded-[10px] h-[50px] flex items-center pl-2.5 transition ease-in-out duration-200 bg-[#2b2b2b] focus-within:border-[#2d79f3] mb-4">
      <input
        type="text"
        placeholder="Enter your name"
        value={isName}
        onChange={(e)=>setIsName(e.target.value)}
        class="ml-2.5 rounded-[10px] border-none w-full h-full bg-[#2b2b2b] text-white placeholder:text-[#aaa] focus:outline-none"
      />
    </div>

    <label className="text-white text-left ml-2 mb-1 font-semibold">Email</label>
    <div className="border border-[#333] rounded-[10px] h-[50px] flex items-center pl-2.5 transition ease-in-out duration-200 bg-[#2b2b2b] focus-within:border-[#2d79f3]">
      <input
        type="email"
        placeholder="Enter your email"
        value={isEmail}
        onChange={(e)=>setIsEmail(e.target.value)}
        class="ml-2.5 rounded-[10px] border-none w-full h-full bg-[#2b2b2b] text-white placeholder:text-[#aaa] focus:outline-none"
      />
    </div>
  </div>

  <div className="flex flex-col">
    <label className="text-white text-left ml-2 mb-1 font-semibold">Password</label>
    <div className="border border-[#333] rounded-[10px] h-[50px] flex items-center pl-2.5 transition ease-in-out duration-200 bg-[#2b2b2b] focus-within:border-[#2d79f3]">
      <input
        type="password"
        placeholder="Enter your password"
        value={isPassword}
        onChange={(e)=>setIsPassword(e.target.value)}
        class="ml-2.5 rounded-[10px] border-none w-full h-full bg-[#2b2b2b] text-white placeholder:text-[#aaa] focus:outline-none"
      />
    </div>
  </div>

  <div className="flex flex-row items-center justify-between gap-2.5">

  </div>

  <button type="submit" className="mt-5 mb-2.5 bg-[#2d79f3] text-white text-[15px] font-medium rounded-[10px] h-[50px] w-full cursor-pointer">
    Sign Up
  </button>

  <p className="text-center text-white text-sm my-1.5">Or sign in with</p>

  <button className="mt-2.5 w-full h-[50px] rounded-[10px] flex justify-center items-center font-medium gap-2.5 border border-[#333] bg-[#2b2b2b] text-white cursor-pointer hover:border-[#2d79f3] transition ease-in-out duration-200">
    Google
  </button>
    <p className="text-center text-gray-500 text-sm my-1.5">Already have an account? 
    <span onClick={()=>setCurrentState('Login')}className="text-white ml-1 cursor-pointer">Sign In</span> </p>
</form>
      )}
</div>

  </div>
  )
}

export default Login;