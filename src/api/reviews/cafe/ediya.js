// // src/api/cafereview/cafe/ediya.js
// import Router from 'koa-router';
// import * as cafeReviewCtrl from '../reviews.ctrl';
// import checkLoggedIn from '../../../lib/checkLoggedIn';

// const cafeEdiya = new Router();

// cafeEdiya.get('/', cafeReviewCtrl.list);
// cafeEdiya.post('/', checkLoggedIn, cafeReviewCtrl.write);

// const cafeEdiyaReview = new Router();

// cafeEdiyaReview.get('/', cafeReviewCtrl.read);
// cafeEdiyaReview.delete(
//   '/',
//   checkLoggedIn,
//   cafeReviewCtrl.checkOwnCafeReview,
//   cafeReviewCtrl.remove,
// );
// cafeEdiyaReview.patch(
//   '/',
//   checkLoggedIn,
//   cafeReviewCtrl.checkOwnCafeReview,
//   cafeReviewCtrl.update,
// );

// cafeEdiya.use(
//   '/:id',
//   cafeReviewCtrl.getCafeReviewById,
//   cafeEdiyaReview.routes(),
// );

// export default cafeEdiya;
