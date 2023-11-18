// src/api/reviews/index.js

import Router from 'koa-router';
import * as reviewsCtrl from './reviews.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const reviews = new Router();

reviews.post('/', checkLoggedIn, reviewsCtrl.createReview);
reviews.get('/', reviewsCtrl.getReviewsByBeverage);
reviews.patch('/:id', checkLoggedIn, reviewsCtrl.updateReview);
reviews.delete('/:id', checkLoggedIn, reviewsCtrl.deleteReview);
reviews.get('/average', reviewsCtrl.getAllAverageRatings);

export default reviews;
