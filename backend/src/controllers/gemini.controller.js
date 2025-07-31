// controllers/ai.controller.js
import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);
const model = ai.models.generateContent({ model: 'gemini-pro' });

export const getDSAHint = async (req, res) => {
  const { topic, level, userWeakness, problemStatement } = req.body;

  const prompt = `
You're a helpful DSA assistant.
User is weak in: ${userWeakness}
Topic: ${topic}
Difficulty: ${level}

Problem: ${problemStatement}

Give:
1. One-line intuition
2. Pseudocode (only if needed)
3. Hint (don't give exact solution)
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ hint: text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
