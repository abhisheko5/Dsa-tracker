import axios from 'axios';
import React, { useState } from 'react';  
const AiCard=()=>{

  const [prompt,setPrompt]=useState("");
  const[aiReply,setAiReply]=useState("");
  const handleInput=async()=>{
      try{
        const response = await axios.post('http://localhost:3000/api/problem/hint',{prompt});
        setAiReply(response.data.aiReply);
        console.log("AI Reply:", response.data.aiReply);}
      catch(error){
        console.error("Error fetching AI response:", error);
        // 
    }
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl bg-gray-200 rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">AI DSA Assistant</h2>

        
        <div className="w-full p-4 bg-white rounded-xl shadow min-h-[60px] mt-2">
          <p className="text-gray-700">{aiReply || "AI response will appear here"}</p>
       
        
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Ask me anything about DSA"
          className="w-full mt-10 px-4 bg-white py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         </div>
        <button
          onClick={handleInput}
          className=" w-full px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition"
        >Ask</button>
      </div>
    </div>
  )
}
export default AiCard;