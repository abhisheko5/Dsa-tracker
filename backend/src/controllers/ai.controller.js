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
const generatesimilarProblems=async(req,res)=>{

}

export {getDSAResponse};