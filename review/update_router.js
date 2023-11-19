// export default updateReviewAPI; // 이 부분은 경우에 따라 작성하지 않아도 됨

// -- 라우터와 연결

// import Router from 'koa-router';
// import * as reviewsCtrl from '../review'; // 커피 상세사항 관련 컨트롤러 가져오기

// const api = new Router();

// // 커피 상세사항 리뷰 업데이트 API 라우트
// api.patch('../reviews/:id', reviewsCtrl.updateReviewAPI);

// export default api;

import Router from 'koa-router';
import * as reviewsCtrl from '../review'; // 커피 상세사항 관련 컨트롤러 가져오기

const api = new Router();

// 커피 상세사항 리뷰 업데이트 API 라우트
api.patch('/reviews/:id', reviewsCtrl.updateReviewAPI);

export default api;
