// // src/api/questions/questions.ctrl.js
// import Question from '../../models/questions';

// // 질문 생성
// export const createQuestion = async (ctx) => {
//   const { question, answer } = ctx.request.body;

//   // 데이터베이스에 질문과 답변 저장
//   const newQuestion = new Question({
//     question,
//     answer,
//   });

//   try {
//     await newQuestion.save();
//     ctx.status = 201; // Created
//     ctx.body = newQuestion;
//   } catch (e) {
//     ctx.throw(500, e);
//   }
// };

// src/api/questions/questions.ctrl.js
import Question from '../../models/questions';

// 질문 생성
export const createQuestion = async (ctx) => {
  const { username, question, answer } = ctx.request.body;

  // 데이터베이스에 질문과 답변 저장
  const newQuestion = new Question({
    username,
    question,
    answer,
  });

  try {
    await newQuestion.save();
    ctx.status = 201; // Created
    ctx.body = newQuestion;
  } catch (e) {
    ctx.throw(500, e);
  }
};
