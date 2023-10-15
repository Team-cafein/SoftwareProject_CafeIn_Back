// src/api/gpt/index.js
import Router from 'koa-router';
import * as gptCtrl from './gpt.ctrl';

const gpt = new Router();

gpt.post('/ask', gptCtrl.ask);

export default gpt;
