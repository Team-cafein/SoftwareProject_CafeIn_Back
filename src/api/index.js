// src/api/index.js
import Router from 'koa-router';
import posts from './posts';
import auth from './auth';
// import questions from './questions';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
// api.use('/questions', questions.routes()); // 추가

// 라우터를 내보냄
export default api;
