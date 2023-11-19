// src/api/reviews/reviews.ctrl.js
import Review from '../../models/reviews';
import { deleteReview } from '../reviews/reviews.'; // 리뷰 삭제 함수 가져오기

// 다른 커피 상세사항 관련 코드들...

// 커피 상세사항 리뷰 삭제 API
export const deleteReviewAPI = async (ctx) => {
  const { reviewId } = ctx.params; // 삭제할 리뷰의 ID

  try {
    // 리뷰 삭제 함수 호출
    await deleteReview(ctx, reviewId);

    // 성공적으로 삭제됨
    ctx.status = 204;
  } catch (error) {
    // 오류 발생 시
    ctx.status = 500;
    ctx.body = { error: '커피 상세사항 리뷰를 삭제하는 중에 오류가 발생했습니다.' };
  }
};

// -- 라우터와 연결

// import Router from 'koa-router';
// import * as reviews from '../api/reviews'; // 커피 상세사항 관련 컨트롤러 가져오기

// const api = new Router();

// // 커피 상세사항 리뷰 삭제 API 라우트
// api.delete('../reviews/:reviewId', reviews.deleteReviewAPI);


// export default api;