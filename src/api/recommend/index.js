// src/api/recommend/index.js
import Router from 'koa-router';
import * as recommendCtrl from './recommend.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const recommend = new Router();

recommend.get('/', recommendCtrl.getRecommendation);

export default recommend;
