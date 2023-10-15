// src/api/gpt/gpt.ctrl.js
import Gpt from '../../models/gpt';
import { askGpt } from './gpt';

export const ask = async (ctx) => {
  const { question } = ctx.request.body;

  try {
    const answer = await askGpt(question);

    const gpt = new Gpt({
      question,
      answer,
    });
    await gpt.save();

    ctx.body = { answer };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'GPT-3 API 요청 중 오류가 발생했습니다.' };
  }
};

// // src/api/gpt/gpt.ctrl.js
// import Gpt from '../../models/gpt';
// import { askGpt } from './gpt';

// export const ask = async (ctx) => {
//   const { question } = ctx.request.body;

//   try {
//     const answer = await askGpt(question);

//     const gpt = new Gpt({
//       question,
//       answer,
//     });
//     await gpt.save();

//     ctx.body = { answer };
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = { error: 'GPT-3 API 요청 중 오류가 발생했습니다.' };
//   }
// };
