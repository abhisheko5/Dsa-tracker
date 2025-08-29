import React,{useState} from "react";
import axios from 'axios';


const Navbar = () => {
  
  const[problems,setProblems]=useState();
  
  const handleClick=async()=>{

    try{
      const response=await axios.post("http://localhost:3000/api/ai/random")
      console.log(response.data)
    }
    catch(error){
      console.log(error);
    }
  }
  
  
  return (
    <nav className="flex items-center justify-between w-full px-6 py-3 bg-white shadow-md">
  
      <div className="flex-1 flex justify-center items-center gap-4">
        <input
          className="w-64 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="Search problems..."
        />
        <button onClick={handleClick} className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition">
          Random 5
        </button>
      </div>

      {/* Profile */}
      <div className="flex items-center">
        <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md">
          <span className="text-gray-700 text-lg font-semibold">U</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
