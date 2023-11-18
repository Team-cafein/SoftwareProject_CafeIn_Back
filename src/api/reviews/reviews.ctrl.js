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

// export const getReviewsByBeverage = async (ctx) => {
//   const { beverageId } = ctx.query; // 해당 음료의 ID (cafeid_beverage 형식)

//   try {
//     const reviews = await Review.find({ beverageId }).sort({
//       _id: -1,
//     });
//     ctx.body = reviews;
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = { error: '리뷰를 조회하는 중에 오류가 발생했습니다.' };
//   }
// };

export const getReviewsByBeverage = async (ctx) => {
  const { beverageId } = ctx.query; // 해당 음료의 ID (cafeid_beverage 형식)

  try {
    let query = {};
    if (beverageId) {
      query = { beverageId };
    }

    const reviews = await Review.find(query).sort({
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

// // 새로운 API: 특정 음료에 대 한 리뷰 평균 별점 조회
// export const getAllAverageRatings = async (ctx) => {
//   try {
//     // 모든 리뷰를 조회
//     const allReviews = await Review.find();

//     if (!allReviews || allReviews.length === 0) {
//       ctx.status = 404;
//       ctx.body = { error: '리뷰를 찾을 수 없습니다.' };
//       return;
//     }

//     // 음료별 리뷰를 그룹화
//     const reviewsByBeverage = {};
//     allReviews.forEach((review) => {
//       const { beverageId, rating } = review;

//       // 음료별로 그룹화된 객체에 데이터 추가
//       if (!reviewsByBeverage[beverageId]) {
//         reviewsByBeverage[beverageId] = {
//           totalRating: 0,
//           reviewCount: 0,
//         };
//       }

//       reviewsByBeverage[beverageId].totalRating += rating;
//       reviewsByBeverage[beverageId].reviewCount += 1;
//     });

//     // 그룹화된 데이터를 가지고 음료별 평균 rating을 계산
//     const averageRatings = Object.keys(reviewsByBeverage).map((beverageId) => {
//       const { totalRating, reviewCount } = reviewsByBeverage[beverageId];
//       const averageRating = totalRating / reviewCount;

//       // 평균 rating이 소수점으로 나오면 내림처리
//       const roundedAverageRating = Math.floor(averageRating);

//       return { beverageId, averageRating: roundedAverageRating };
//     });

//     ctx.body = averageRatings;
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = { error: '평균 rating을 조회하는 중에 오류가 발생했습니다.' };
//   }
// };

// 새로운 API: 전체 음료에 대한 리뷰 평균 별점 조회
export const getAllAverageRatings = async (ctx) => {
  try {
    // 모든 리뷰를 조회
    const allReviews = await Review.find();

    if (!allReviews || allReviews.length === 0) {
      ctx.status = 404;
      ctx.body = { error: '리뷰를 찾을 수 없습니다.' };
      return;
    }

    // 전체 음료 범위 정의
    const allBeverageRange = [];
    for (let i = 1; i <= 5; i++) {
      for (
        let j = 1;
        j <=
        (i === 1 ? 139 : i === 2 ? 166 : i === 3 ? 51 : i === 4 ? 149 : 97);
        j++
      ) {
        allBeverageRange.push(`${i}_${j}`);
      }
    }

    // 음료별 리뷰를 그룹화
    const reviewsByBeverage = {};
    allReviews.forEach((review) => {
      const { beverageId, rating } = review;

      // 음료별로 그룹화된 객체에 데이터 추가
      if (!reviewsByBeverage[beverageId]) {
        reviewsByBeverage[beverageId] = {
          totalRating: 0,
          reviewCount: 0,
        };
      }

      reviewsByBeverage[beverageId].totalRating += rating;
      reviewsByBeverage[beverageId].reviewCount += 1;
    });

    // 전체 음료 범위에 대한 리뷰 평균을 계산
    const averageRatings = allBeverageRange.map((beverageId) => {
      const { totalRating, reviewCount } = reviewsByBeverage[beverageId] || {
        totalRating: 0,
        reviewCount: 0,
      };

      const averageRating = reviewCount > 0 ? totalRating / reviewCount : 0;

      // 평균 rating이 소수점으로 나오면 내림처리
      const roundedAverageRating = Math.floor(averageRating);

      return { beverageId, averageRating: roundedAverageRating };
    });

    ctx.body = averageRatings;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: '평균 rating을 조회하는 중에 오류가 발생했습니다.' };
  }
};
