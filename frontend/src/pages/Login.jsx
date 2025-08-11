import React,{useState} from 'react';

 function Login(){
  const[isLoggedIn,setIsLoggedIn]=useState(true);


  return(
    <div className="flex min-h-screen w-full   ">
    <div className="w-1/2 bg-cover bg-right bg-no-repeat text-white flex items-center justify-center p-8">
    <div className="text-center max-w-md">
      <h1 className="text-6xl text-gray-800 font-bold mb-10">Welcome to DSA Tracker</h1>
      <p className="text-lg text-gray-800 mt-20">Track, Practice, and Master Data Structures and Algorithms.</p>
      <p className="text-black">Consistency beats talent when talent doesnt show up."
— Make your practice count, every day.</p>
    </div>
  </div>


    <div className="flex justify-end items-center  px-4 w-1/2">
      {/*login form*/}
      if(isLoggedIn){
      <form className="flex justify-end flex-col gap-2.5 bg-[#1f1f1f] p-8 w-[450px] rounded-[20px] font-sans">
  <div className="flex flex-col">
    <h1 className="text-white font-bold text-3xl mb-2">Welcome back</h1>
    <h1 className="text-sm text-white mb-3">please enter your account details</h1>
    <label className="text-white text-left ml-2 mb-1 font-semibold">Email</label>
    <div className="border border-[#333] rounded-[10px] h-[50px] flex items-center pl-2.5 transition ease-in-out duration-200 bg-[#2b2b2b] focus-within:border-[#2d79f3]">
      <input
        type="email"
        placeholder="Enter your email"
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
        class="ml-2.5 rounded-[10px] border-none w-full h-full bg-[#2b2b2b] text-white placeholder:text-[#aaa] focus:outline-none"
      />
    </div>
  </div>

  <div className="flex flex-row items-center justify-between gap-2.5">
    <div>
      <label className="text-white text-sm font-normal">Remember me</label>
    </div>
    <span className="text-[#2d79f3] text-sm font-medium cursor-pointer">Forgot Password?</span>
  </div>

  <button type="submit" className="mt-5 mb-2.5 bg-[#2d79f3] text-white text-[15px] font-medium rounded-[10px] h-[50px] w-full cursor-pointer">
    Sign in
  </button>

  <p className="text-center text-gray-500 text-sm my-1.5">Dont have an account? 
    <span className="text-white ml-1">Sign Up</span> </p>

  
</form>
 }
 
{/* sign up form */}
else{
<form className="flex justify-end flex-col gap-2.5 bg-[#1f1f1f] p-8 w-[450px] rounded-[20px] font-sans">
  <div className="flex flex-col">
    <h1 className="text-white font-semibold text-2xl">Sign Up form</h1>
    <label className="text-white text-left ml-2 mb-1 font-semibold">Name</label>
    
    <div className="border border-[#333] rounded-[10px] h-[50px] flex items-center pl-2.5 transition ease-in-out duration-200 bg-[#2b2b2b] focus-within:border-[#2d79f3] mb-4">
      <input
        type="string"
        placeholder="Enter your name"
        class="ml-2.5 rounded-[10px] border-none w-full h-full bg-[#2b2b2b] text-white placeholder:text-[#aaa] focus:outline-none"
      />
    </div>

    <label className="text-white text-left ml-2 mb-1 font-semibold">Email</label>
    <div className="border border-[#333] rounded-[10px] h-[50px] flex items-center pl-2.5 transition ease-in-out duration-200 bg-[#2b2b2b] focus-within:border-[#2d79f3]">
      <input
        type="email"
        placeholder="Enter your email"
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
        class="ml-2.5 rounded-[10px] border-none w-full h-full bg-[#2b2b2b] text-white placeholder:text-[#aaa] focus:outline-none"
      />
    </div>
  </div>

  <div className="flex flex-row items-center justify-between gap-2.5">
    <div>
      <label className="text-white text-sm font-normal">Remember me</label>
    </div>
    
  </div>

  <button type="submit" className="mt-5 mb-2.5 bg-[#2d79f3] text-white text-[15px] font-medium rounded-[10px] h-[50px] w-full cursor-pointer">
    Sign Up
  </button>

  <p className="text-center text-white text-sm my-1.5">Or sign in with</p>

  <button className="mt-2.5 w-full h-[50px] rounded-[10px] flex justify-center items-center font-medium gap-2.5 border border-[#333] bg-[#2b2b2b] text-white cursor-pointer hover:border-[#2d79f3] transition ease-in-out duration-200">
    Google
  </button>
</form>

 }
 
</div>

  </div>
  )
}

export default Login;