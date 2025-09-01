
import React, { useState } from "react";
import api from "../api/axios";

const AiCard = () => {
  const [prompt, setPrompt] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = async () => {
    if (!prompt.trim()) return; 
    setLoading(true);
    setAiReply(""); 
    try {
      const response = await api.post("/api/problem/hint", { prompt });

      let text = response.data.aiReply || "No reply from AI.";
     let i = 0;
let currentText = ""; 
const interval = setInterval(() => {
  currentText += text.charAt(i);  
  setAiReply(currentText);         
  i++;
  if (i >= text.length) clearInterval(interval);
}, 25);

    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiReply("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-200 p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 flex flex-col gap-6 transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-extrabold text-indigo-700 text-center">
          AI DSA Assistant
        </h2>

        {/* AI Response */}
        <div className="w-full min-h-[120px] p-6 bg-indigo-50 rounded-2xl shadow-inner border border-indigo-200">
          <p className={`text-gray-800 text-md ${loading ? "animate-pulse" : ""}`}>
            {aiReply || "Your AI response will appear here..."}
          </p>
        </div>

        {/* Input */}
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Ask me anything about DSA..."
          className="w-full px-6 py-3 border-2 border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder-gray-400 transition"
          onKeyDown={(e) => e.key === "Enter" && handleInput()}
        />

        {/* Button */}
        <button
          onClick={handleInput}
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 active:scale-95 transition transform disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {/* Footer Tip */}
        <p className="text-gray-500 text-sm text-center mt-2">
          Tip: Press Enter or click "Ask AI" to get instant guidance on DSA problems.
        </p>
      </div>
    </div>
  );
};

export default AiCard;
