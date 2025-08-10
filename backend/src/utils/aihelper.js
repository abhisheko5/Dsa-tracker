import fetch from "node-fetch";

export const askOpenAI = async (userPrompt, systemPrompt = "You are a helpful DSA tutor and give answer") => {
  
  try{
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 500,
      temperature: 0.5,
    }),
  });

  const data = await response.json();

  if (!data.choices || data.choices.length === 0) {
    throw new Error("No AI response received");
  }

  const aiReply = data.choices[0]?.message?.content;
    return aiReply

  } catch (error) {
    console.error("Error in AI Response:", error.message);
    throw error
  }}
