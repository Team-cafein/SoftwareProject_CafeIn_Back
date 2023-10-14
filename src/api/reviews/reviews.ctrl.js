// src/api/reviews/reviews.ctrl.js
import Review from '../../models/reviews';

export const createReview = async (ctx) => {
  // const { beverage } = ctx.query; // 해당 음료의 ID (cafeid_beverage 형식)
  const { beverageId, title, content, rating } = ctx.request.body;
  const user = ctx.state.user; // 현재 사용자

  const username = user.username;

  // cafeid 추출 (이 부분을 확인해야 합니다.)
  // const { cafeid } = ctx.body;

  // review 객체를 생성합니다
  const review = new Review({
    beverageId,
    username,
    // beverageId: `${cafeid}_${beverage}`, // "{cafeid}_{beverage}" 형식으로 beverageId 생성
    user: user._id,
    title,
    content,
    rating,
  });

  try {
    await review.save();
    ctx.body = review;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: '리뷰를 생성하는 중에 오류가 발생했습니다.' };
  }
};

export const getReviewsByBeverage = async (ctx) => {
  const { beverageId } = ctx.query; // 해당 음료의 ID (cafeid_beverage 형식)

  try {
    const reviews = await Review.find({ beverageId }).sort({
      _id: -1,
    });
    ctx.body = reviews;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: '리뷰를 조회하는 중에 오류가 발생했습니다.' };
  }
};

export const updateReview = async (ctx) => {
  const { id } = ctx.params; // 리뷰의 ID
  const { title, content, rating } = ctx.request.body;

  try {
    const review = await Review.findByIdAndUpdate(
      id,
      { title, content, rating },
      { new: true },
    );
    if (!review) {
      ctx.status = 404;
      ctx.body = { error: '리뷰를 찾을 수 없습니다.' };
    } else {
      ctx.body = review;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: '리뷰를 업데이트하는 중에 오류가 발생했습니다.' };
  }
};

export const deleteReview = async (ctx) => {
  const { id } = ctx.params; // 리뷰의 ID

  try {
    const review = await Review.findByIdAndRemove(id);
    if (!review) {
      ctx.status = 404;
      ctx.body = { error: '리뷰를 찾을 수 없습니다.' };
    } else {
      ctx.status = 204; // 성공적으로 삭제됨
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: '리뷰를 삭제하는 중에 오류가 발생했습니다.' };
  }
};
