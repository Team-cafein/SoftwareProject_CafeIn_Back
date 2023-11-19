import Router from 'koa-router';
import * as reviewsCtrl from '../review'; // 커피 상세사항 관련 컨트롤러 가져오기

const api = new Router();

// 커피 상세사항 리뷰 삭제 API 라우트
api.delete('/reviews/:id', reviewsCtrl.deleteReviewAPI);

export default api;