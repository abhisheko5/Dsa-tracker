import openai from '../openai.js';


const getDSAResponse=async(req,res)=> {
  try{  
  const prompt=req.body.prompt;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful DSA tutor. Give conceptual explanations, generate problems, and provide first-level hints only." },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.5,
    });

    const aiReply = response.data.choices[0].message.content;
    console.log("\nAI Response:\n", aiReply);
    return aiReply;
  
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export {getDSAResponse};