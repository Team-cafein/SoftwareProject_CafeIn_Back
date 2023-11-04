// src/api/likes/likes.ctrl.js
import Like from '../../models/like';
import Cafe from '../../models/cafe';

export const toggleLike = async (ctx) => {
  const { like, beverageId } = ctx.request.body; // 요청의 body에서 like와 beverageId를 가져옵니다.
  const username = ctx.state.user.username;
  const [cafeid, beverage] = beverageId.split('_'); // beverageId를 분해

  try {
    let likeDocument = await Like.findOne({ username });

    if (!likeDocument) {
      likeDocument = new Like({ username, likes: [], dislikes: [] });
    }

    // 유효한 cafeid와 beverage 확인
    const beverageData = await Cafe.findOne({ cafeid, beverage });
    if (!beverageData) {
      ctx.status = 400;
      ctx.body = { error: '유효하지 않은 beverageId입니다.' };
      return;
    }

    if (like) {
      if (!likeDocument.likes.includes(beverageId)) {
        likeDocument.likes.push(beverageId);
      }
      // beverageId를 dislikes에서 제거
      likeDocument.dislikes = likeDocument.dislikes.filter(
        (id) => id !== beverageId,
      );
    } else {
      if (!likeDocument.dislikes.includes(beverageId)) {
        likeDocument.dislikes.push(beverageId);
      }
      // beverageId를 likes에서 제거
      likeDocument.likes = likeDocument.likes.filter((id) => id !== beverageId);
    }

    await likeDocument.save();
    ctx.body = likeDocument;
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      error: '좋아요 또는 싫어요를 업데이트하는 중에 오류가 발생했습니다.',
      details: error.message,
    };
  }
};
