// src/api/gpt/gpt.js
import axios from 'axios';
require('dotenv').config();
const { OPENAI_SECRET_KEY } = process.env;

const openaiSecretKey = process.env.OPENAI_SECRET_KEY;

if (openaiSecretKey) {
  console.log('OPENAI_SECRET_KEY is defined:', openaiSecretKey);
} else {
  console.log('OPENAI_SECRET_KEY is not defined.');
}

const gptAPI = axios.create({
  baseURL: 'https://api.openai.com/v1/engines/davinci/completions',
  headers: {
    Authorization: `Bearer ${OPENAI_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const askGpt = async (prompt) => {
  try {
    const response = await gptAPI.post('', {
      prompt,
      max_tokens: 50,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
