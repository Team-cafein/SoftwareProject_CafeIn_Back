// import Koa from 'koa';
// import Router from 'koa-router';
// import bodyParser from 'koa-bodyparser';
// import { updateReview } from './reviews.ctrl';

// const app = new Koa();
// const api = new Router();

// app.use(bodyParser());

// api.patch('/reviews/:id', async (ctx) => {
//   try {
//     await updateReview(ctx);
//     ctx.status = 200;
//     ctx.body = { success: true };
//   } catch (error) {
//     console.error(error);
//     ctx.status = 500;
//     ctx.body = { error: '커피 리뷰를 업데이트하는 중에 오류가 발생했습니다.' };
//   }
// });

// app.use(api.routes());

// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { updateReview } = require('./review/reviews.ctrl.js');
const { deleteReviewAPI } = require('./review/review_delete.js');

const app = new Koa();
const api = new Router();

app.use(bodyParser());

api.patch('/reviews/:id', async (ctx) => {
  try {
    await updateReview(ctx);
    ctx.status = 200;
    ctx.body = { success: true };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: '커피 리뷰를 업데이트하는 중에 오류가 발생했습니다.' };
  }
});

api.delete('/reviews/:id', deleteReviewAPI);

app.use(api.routes());

app.listen(3000, () => {
  console.log('서버가 포트 3000에서 실행 중입니다.');
});
