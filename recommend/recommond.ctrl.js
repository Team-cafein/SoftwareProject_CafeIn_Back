// import Koa from 'koa';
// import Router from 'koa-router';
// import bodyParser from 'koa-bodyparser';
// import fs from 'fs';
// import path from 'path';

// const app = new Koa();
// const api = new Router();

// app.use(bodyParser());

// api.get('/recommendResult', async (ctx) => {
//   try {
//     const filePath = path.join(__dirname, 'recommend_result.json');
//     const fileData = fs.readFileSync(filePath, 'utf-8');
//     const jsonData = JSON.parse(fileData);

//     ctx.status = 200;
//     ctx.body = jsonData;
//   } catch (error) {
//     console.error(error);
//     ctx.status = 500;
//     ctx.body = { error: '파일을 읽는 중에 오류가 발생했습니다.' };
//   }
// });

// app.use(api.routes());

// app.listen(3000, () => {
//   console.log('서버가 포트 3000에서 실행 중입니다.');
// });

// index.js

// import express from 'express';
// import mongoose from 'mongoose';

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
// import Recommend from './models/recommend';
import Recommend from 'recommend/recommend_result.json';

const app = new Koa();
const api = new Router();

app.use(bodyParser());

api.get('/loadData', async (ctx) => {
  try {
    // MongoDB에서 데이터 불러오기
    const data = await Recommend.find({}, { _id: 0, __v: 0 });

    // 불러온 데이터를 클라이언트에 응답
    ctx.body = data;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

app.use(api.routes());
app.use(api.allowedMethods());