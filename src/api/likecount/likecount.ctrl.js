// src/api/likecount/likecount.ctrl.js
import LikeCount from '../../models/likecount';

// 업데이트 좋아요 및 싫어요 정보
export const updateLikeCount = async (ctx) => {
  // const { beverageId } = ctx.params;
  const { id } = ctx.params;
  const { like } = ctx.request.body;
  const username = ctx.state.user.username;

  try {
    let likeCountDocument = await LikeCount.findOne({ beverageId: id });

    if (!likeCountDocument) {
      likeCountDocument = new LikeCount({
        beverageId: id,
        likedByUsers: [],
        likesCount: 0,
        dislikesCount: 0,
      });
    }

    // 이전 상태 확인
    const previousLikeStatus = likeCountDocument.likedByUsers.find(
      (user) => user.username === username,
    );

    // 사용자별로 좋아요 또는 싫어요 정보를 업데이트
    if (like === true) {
      if (!previousLikeStatus) {
        likeCountDocument.likedByUsers.push({ username, like: true });
        likeCountDocument.likesCount += 1;
      } else if (previousLikeStatus.like === false) {
        previousLikeStatus.like = true;
        likeCountDocument.likesCount += 1;
        likeCountDocument.dislikesCount -= 1;
      }
    } else if (like === false) {
      if (!previousLikeStatus) {
        likeCountDocument.likedByUsers.push({ username, like: false });
        likeCountDocument.dislikesCount += 1;
      } else if (previousLikeStatus.like === true) {
        previousLikeStatus.like = false;
        likeCountDocument.dislikesCount += 1;
        likeCountDocument.likesCount -= 1;
      }
    }

    await likeCountDocument.save();
    ctx.body = {
      likesCount: likeCountDocument.likesCount,
      dislikesCount: likeCountDocument.dislikesCount,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      error:
        '좋아요 또는 싫어요 카운트를 업데이트하는 중에 오류가 발생했습니다.',
      details: error.message,
    };
  }
};

// 좋아요 정보 가져오기
export const getLikeCounts = async (ctx) => {
  const { id } = ctx.params; // 파라미터로부터 음료 ID를 가져옵니다.

  try {
    const likeCountDocument = await LikeCount.findOne({ beverageId: id });

    if (!likeCountDocument) {
      ctx.status = 404;
      ctx.body = { error: '음료의 좋아요 정보를 찾을 수 없습니다.' };
      return;
    }

    ctx.body = {
      likesCount: likeCountDocument.likesCount,
      dislikesCount: likeCountDocument.dislikesCount,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      error: '음료의 좋아요 정보를 가져오는 중에 오류가 발생했습니다.',
      details: error.message,
    };
  }
};
