import dotenv from 'dotenv';

dotenv.config();

import OpenAI from 'openai';

const openai = new OpenAI({
  apikey:process.env.OPENAI_API_KEY,
  baseURL:'https://openrouter.ai/api/v1',
});

export default openai;