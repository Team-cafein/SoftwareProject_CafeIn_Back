// src/api/likes/index.js
import Router from 'koa-router';
import * as likesCtrl from './likecount.ctrl';

const likecount = new Router();

// /api/likes 엔드포인트를 생성합니다.
likecount.post('/:id', likesCtrl.updateLikeCount);
likecount.get('/:id', likesCtrl.getLikeCounts);

export default likecount;
