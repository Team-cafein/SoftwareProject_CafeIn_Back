// // src/lib/checkUserExists.js
// import User from '../models/user';
// import Question from '../models/questions';

// const checkUserExists = async (ctx, next) => {
//   const { username, question, answer } = ctx.request.body;

//   try {
//     const user = await User.findByUsername(username);
//     if (!user) {
//       ctx.status = 401; // Unauthorized
//       ctx.body = { message: '회원이 아닙니다.' };
//       return;
//     }

//     // 사용자의 질문과 답변 정보를 저장합니다.
//     if (question !== undefined && answer !== undefined) {
//       const newQuestion = new Question({
//         username,
//         question,
//         answer,
//       });
//       await newQuestion.save();
//     }
//   } catch (e) {
//     ctx.throw(500, e);
//   }

//   return next();
// };

// export default checkUserExists;

// src/lib/checkUserExists.js
import User from '../models/user';
import Question from '../models/questions';

const checkUserExists = async (ctx, next) => {
  const { username, question, answer } = ctx.request.body;

  try {
    const user = await User.findByUsername(username);
    if (!user) {
      ctx.status = 401; // Unauthorized
      ctx.body = { message: '회원이 아닙니다.' };
      return;
    }

    // 사용자의 질문과 답변 정보를 저장합니다.
    if (question !== undefined && answer !== undefined) {
      // 사용자가 이미 질문을 등록한 경우 해당 질문과 답변을 업데이트하고,
      // 아닌 경우에만 새로운 데이터를 생성합니다.
      const existingQuestion = await Question.findOne({ username });
      if (existingQuestion) {
        existingQuestion.question = question;
        existingQuestion.answer = answer;
        await existingQuestion.save();
      }
    }
  } catch (e) {
    ctx.throw(500, e);
  }

  return next();
};

export default checkUserExists;
