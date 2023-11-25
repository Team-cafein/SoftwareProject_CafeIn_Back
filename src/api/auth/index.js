// src/api/auth/index.js
import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';
import * as questionsCtrl from '../../api/questions/questions.ctrl';
import checkUserExists from '../../lib/checkUserExists';
import checkLoggedIn from '../../lib/checkLoggedIn';

const auth = new Router();

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/check', authCtrl.check);
auth.post('/logout', authCtrl.logout);

auth.post('/register/question', checkUserExists, questionsCtrl.createQuestion); // 처음 질문과 답변을 저장하는 엔드포인트 추가
auth.put('/register/question', checkLoggedIn, questionsCtrl.updateQuestion); // 질문을 업데이트하는 새로운 엔드포인트 추가
auth.get('/register/answer', checkLoggedIn, questionsCtrl.getProfile);

export default auth;
