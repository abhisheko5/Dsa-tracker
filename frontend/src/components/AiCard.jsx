import axios from 'axios';
const AiCard=()=>{

  const handleInput=async(e)=>{
      try{
        const response = await axios.get('http://localhost:3000/api/problem/hint');
        const aiReply=response.data.aiReply;
        console.log("AI Reply:", aiReply);}
      catch(error){
        console.error("Error fetching AI response:", error);
        // 
    }
  }


  return(
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <input
        type="text"
        placeholder="Ask me anything about DSA"
        className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 inline-block">
      
        </input>
        <button
        onClick={handleInput}
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover">Ask</button>
    </div>
  )
}
export default AiCard;