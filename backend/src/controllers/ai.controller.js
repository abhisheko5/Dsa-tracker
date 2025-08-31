import {askOpenAI} from '../utils/aihelper.js';
const getDSAResponse=async(req,res)=>{
  try{  
  const prompt=req.body.prompt;
    const aiReply=await askOpenAI(prompt);

    res.json({aiReply});
    
  }
  catch(error){
    console.error("ai error",error.message);
    res.status(500).json({error:"failed to get AI response"})
  }
}
const generaterandomProblems=async(req,res)=>{
try{
  const prompt="Create exactly five random DSA problems. Only provide the problem statements, do NOT include difficulty, topic, or numbering. Output each problem on a new line."
  const aiReply=await askOpenAI(prompt);

 const numberedItems = aiReply
      .split("\n")
      .filter(line => line.trim() !== "")
      .map((item, index) => `${index + 1}. ${item.replace(/^\d+\.\s*/, "").replace(/\*\*/g,"")}`); // add clean numbering

    return res.json({ numberedItems });
  
}
catch(error){
  console.error("ai error",error.message);
  res.status(500).json({error:"failed to get Ai response"})
  }
}

const  generateQuote=async(req,res)=>{
  try{
    const prompt="create a random quote of motivation in shortand unique quote everytime"
    const aiReply=await askOpenAI(prompt);

    return res.json(aiReply);
  }
  catch(error){
    console.error("ai error",error.message);
    res.status(500).json({error:"failed to get Ai response"})
  }
}

export {getDSAResponse,generaterandomProblems,generateQuote};