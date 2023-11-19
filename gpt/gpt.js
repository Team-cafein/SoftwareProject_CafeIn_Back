// src/api/gpt/gpt.js
// import axios from 'axios';
// require('dotenv').config();
// const { OPENAI_SECRET_KEY } = process.env;

// const gptAPI = axios.create({
//   baseURL: 'https://api.openai.com',
//   headers: {
//     Authorization: `Bearer ${OPENAI_SECRET_KEY}`,
//     'Content-Type': 'application/json',
//   },
// });

// export const askGpt = async (message) => {
//   try {
//     const response = await gptAPI.post('/v1/chat/completions', {
//       model: 'gpt-3.5-turbo',
//       messages: [{ role: 'user', content: message }],
//     });

//     const repliedMessage = response.data.choices[0].message.content;

//     return repliedMessage;
//   } catch (error) {
//     console.error(error);
//   }
// };

// src/api/gpt/gpt.js
// const { Configuration, OpenAIApi } = require('openai');

// import { Configuration, OpenAIApi } from 'openai';

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_SECRET_KEY,
// });

// const openai = new OpenAIApi(configuration);

// export const askGpt = async (prompt) => {
//   try {
//     const response = await openai.createCompletion({
//       model: 'gpt-3.5-turbo',
//       prompt: prompt,
//       max_tokens: 50,
//     });
//     return response.data.choices[0].text;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
