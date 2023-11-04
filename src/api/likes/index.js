// src/api/likes/index.js
import Router from 'koa-router';
import * as likesCtrl from './likes.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const like = new Router();

// /api/likes 엔드포인트를 생성합니다.
like.post('/:id', checkLoggedIn, likesCtrl.toggleLike);
// like.get('/counts', likesCtrl.getLikeCounts);

export default like;
