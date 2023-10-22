// src/wishlist/wishlist.ctrl.js
import ProductWishlist from '../../models/wishlist';

// 찜하기 추가 또는 삭제
export const toggleWishlist = async (ctx) => {
  try {
    const { userId, productId } = ctx.request.body;

    // 이미 찜한 상품인지 확인
    const existingWishlist = await ProductWishlist.findOne({
      userId,
      productId,
    });

    if (existingWishlist) {
      // 이미 찜한 상품이면 삭제
      await ProductWishlist.findByIdAndDelete(existingWishlist._id);
      ctx.status = 200;
      ctx.body = '찜하기가 취소되었습니다.';
    } else {
      // 찜하지 않은 상품이면 추가
      const wishlist = new ProductWishlist({ userId, productId });
      await wishlist.save();
      ctx.status = 201;
      ctx.body = wishlist;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = '서버 오류';
  }
};

// 사용자의 찜한 상품 목록 가져오기
export const getWishlistByUserId = async (ctx) => {
  try {
    const userId = ctx.params.userId;
    const wishlist = await ProductWishlist.find({ userId });
    ctx.body = wishlist;
  } catch (error) {
    ctx.status = 500;
    ctx.body = '서버 오류';
  }
};
