// src/api/likes/likes.ctrl.js
import Like from '../../models/like';
import getBeverageIdToSplit from '../../lib/getBeverageIdToSplit';
import { getBeverageName } from '../../lib/getBeverageName';

export const toggleLike = async (ctx) => {
  const { like } = ctx.request.body; // 요청의 body에서 like를 가져옵니다.
  const username = ctx.state.user.username;

  // Use the  getBeverageIdToSplit middleware to get cafeid and beverage details
  await getBeverageIdToSplit(ctx, async () => {
    // Check if cafeid and beverage information is available in the context state
    const { cafeid, beverage } = ctx.state;

    if (cafeid === undefined || beverage === undefined) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid beverageId.' };
      return;
    }

    // Use the getBeverageName middleware to get the name of the beverage
    await getBeverageName(ctx, async () => {
      const beverageName = ctx.state.beverageName;

      try {
        let likeDocument = await Like.findOne({ username });

        if (!likeDocument) {
          likeDocument = new Like({ username, likes: [], dislikes: [] });
        }

        // Create a beverageId by combining cafeid and beverage
        // const beverageName = `${cafeid}_${beverage}`;

        if (like) {
          if (!likeDocument.likes.includes(beverageName)) {
            likeDocument.likes.push(beverageName);
          }
          // beverageName를 dislikes에서 제거
          likeDocument.dislikes = likeDocument.dislikes.filter(
            (id) => id !== beverageName,
          );
        } else {
          if (!likeDocument.dislikes.includes(beverageName)) {
            likeDocument.dislikes.push(beverageName);
          }
          // beverageName를 likes에서 제거
          likeDocument.likes = likeDocument.likes.filter(
            (id) => id !== beverageName,
          );
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
    });
  });
};
