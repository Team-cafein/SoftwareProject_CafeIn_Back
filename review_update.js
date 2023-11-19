import Review from '../../models/reviews';
import { updateReview } from '../reviews/reviews.'; // 리뷰 업데이트 함수 가져오기

// src/api/reviews/coffeeReviews.ctrl.js

export const updateReviewAPI = async (ctx) => {
    try {
      // updateReview 함수를 이용하여 리뷰를 업데이트합니다.
      await updateReview(ctx);
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: '커피 리뷰를 업데이트하는 중에 오류가 발생했습니다.' };
    }
};

// export default updateReviewAPI; // 이 부분은 경우에 따라 작성하지 않아도 됨

// -- 라우터와 연결

// import Router from 'koa-router';
// import * as reviewsCtrl from '../api/reviews'; // 커피 상세사항 관련 컨트롤러 가져오기

// const api = new Router();

// // 커피 상세사항 리뷰 업데이트 API 라우트
// api.patch('../reviews/:id', reviewsCtrl.updateReviewAPI);

// export default api;