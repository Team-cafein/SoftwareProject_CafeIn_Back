// // src/api/beveragereview/cafe/starbucks.js
// import Router from 'koa-router';
// import * as cafeReviewCtrl from '../reviews.ctrl';
// import checkLoggedIn from '../../../lib/checkLoggedIn';

// const cafeStarbucks = new Router();

// cafeStarbucks.get('/', cafeReviewCtrl.list);
// cafeStarbucks.post('/', checkLoggedIn, cafeReviewCtrl.write);

// const cafeStarbucksReview = new Router();

// cafeStarbucksReview.get('/', cafeReviewCtrl.read);
// cafeStarbucksReview.delete(
//   '/',
//   checkLoggedIn,
//   cafeReviewCtrl.checkOwnCafeReview,
//   cafeReviewCtrl.remove,
// );
// cafeStarbucksReview.patch(
//   '/',
//   checkLoggedIn,
//   cafeReviewCtrl.checkOwnCafeReview,
//   cafeReviewCtrl.update,
// );

// cafeStarbucks.use(
//   '/:id',
//   cafeReviewCtrl.getCafeReviewById,
//   cafeStarbucksReview.routes(),
// );

// export default cafeStarbucks;
