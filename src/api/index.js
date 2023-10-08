// src/api/index.js
import Router from 'koa-router';
import posts from './posts';
import auth from './auth';
import cafe from './cafe';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/cafe', cafe.routes()); // cafe 모듈의 라우터를 사용합니다.

// 라우터를 내보냄
export default api;
