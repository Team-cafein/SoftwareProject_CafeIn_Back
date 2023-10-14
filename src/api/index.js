// src/api/index.js
import Router from 'koa-router';
import posts from './posts';
import auth from './auth';
import cafe from './cafe';
import reviews from './reviews';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/cafe', cafe.routes()); // cafe 모듈의 라우터를 사용합니다.
api.use('/reviews', reviews.routes());

// 라우터를 내보냄
export default api;
