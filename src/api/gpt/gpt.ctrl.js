// src/api/gpt/gpt.ctrl.js

export const ask = async (ctx) => {
  const { question } = ctx.request.body;

  try {
    const answer = await askGpt(question);

    ctx.body = { answer };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'GPT-3 API 요청 중 오류가 발생했습니다.' };
  }
};

import axios from 'axios';
require('dotenv').config();
const { OPENAI_SECRET_KEY } = process.env;

const gptAPI = axios.create({
  baseURL: 'https://api.openai.com',
  headers: {
    Authorization: `Bearer ${OPENAI_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
});

const askGpt = async (message) => {
  try {
    const response = await gptAPI.post('/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    const repliedMessage = response.data.choices[0].message.content;

    return repliedMessage;
  } catch (error) {
    console.error(error);
  }
};

// import Gpt from '../../models/gpt';

// const gpt = new Gpt({
//   question,
//   answer,
// });
// await gpt.save();

// // src/api/gpt/gpt.ctrl.js
// import Gpt from '../../models/gpt';
// import { askGpt } from './gpt';

// export const ask = async (ctx) => {
//   const { question } = ctx.request.body;

//   try {
//     const answer = await askGpt(question);

//     const gpt = new Gpt({
//       question,
//       answer,
//     });
//     await gpt.save();

//     ctx.body = { answer };
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = { error: 'GPT-3 API 요청 중 오류가 발생했습니다.' };
//   }
// };
