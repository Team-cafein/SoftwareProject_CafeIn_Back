// src/api/index.js
import Router from 'koa-router';
import posts from './posts';
import auth from './auth';
import cafe from './cafe';
import reviews from './reviews';
import gpt from './gpt';
import wishlist from './wishlist';
import like from './likes';
import likecount from './likecount';
import recommend from './recommend';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/cafe', cafe.routes());
api.use('/reviews', reviews.routes());
api.use('/gpt', gpt.routes());
api.use('/wishlist', wishlist.routes());
api.use('/like', like.routes());
api.use('/likecount', likecount.routes());
api.use('/recommend', recommend.routes());

// const axios = require('axios');
// // dotenv는 .env 파일을 읽어서 process.env에 설정해 줍니다.
// const dotenv = require('dotenv');

// dotenv.config();

// const openaiSecretKey = process.env.OPENAI_SECRET_KEY;

// if (openaiSecretKey) {
//   console.log('OPENAI_SECRET_KEY is defined:', openaiSecretKey);
// } else {
//   console.log('OPENAI_SECRET_KEY is not defined.');
// }

// axios
//   .post(
//     'https://api.openai.com/v1/chat/completions',
//     {
//       model: 'gpt-3.5-turbo',
//       messages: [{ role: 'user', content: '안녕 AI' }],
//     },
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${openaiSecretKey}`,
//       },
//     },
//   )
//   .then((response) => {
//     console.log(response.data);
//     console.log(response.data.choices[0].message.content);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// 라우터를 내보냄
export default api;
