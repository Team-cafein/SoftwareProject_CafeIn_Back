// src/wishlist/index.js
import Router from 'koa-router';
import * as wishlistCtrl from './wishlist.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const wishlist = new Router();

// 찜하기 추가 또는 삭제
wishlist.post('/', checkLoggedIn, wishlistCtrl.toggleWishlist);

// 사용자의 찜한 상품 목록 가져오기
wishlist.get('/:userId', wishlistCtrl.getWishlistByUserId);

export default wishlist;
