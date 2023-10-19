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

// src/api/gpt/gpt.ctrl.js

// import { spawn } from 'child_process';

// export const ask = async (ctx) => {
//   const { question } = ctx.request.body;

//   const pythonProcess = spawn('python', ['gpt.py', question]);

//   pythonProcess.stdout.on('data', (data) => {
//     const answer = data.toString();
//     ctx.body = { answer };
//   });

//   pythonProcess.stderr.on('data', (data) => {
//     ctx.status = 500;
//     ctx.body = { error: 'Python 스크립트 실행 중 오류가 발생했습니다.' };
//   });
// };
