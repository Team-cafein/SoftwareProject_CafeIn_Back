// src/api/questions/questions.ctrl.js
// import Question from '../../models/questions';

// 질문 생성
// export const createQuestion = async (ctx) => {
//   const { username, questions, answers } = ctx.request.body;

//   // 데이터베이스에 질문과 답변 저장
//   const newQuestion = new Question({
//     username,
//     question: questions, // 수정된 부분
//     answer: answers, // 수정된 부분
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

export const createQuestion = async (ctx) => {
  const { username, questions, answers } = ctx.request.body;

  const mapAnswerToBackendFormat = (answer) => {
    if (answer === '피곤한데... 커피!') {
      return 'coffee';
    } else if (answer === '맛있는 음료가 좋아') {
      return 'non-coffee';
    }

    if (answer === '아메리카노') {
      return 'americano';
    } else if (answer === '라뗴') {
      return 'latte';
    } else if (answer === '에이드') {
      return 'ade';
    } else if (answer === '주스') {
      return 'juice';
    } else if (answer === '티') {
      return 'tea';
    }

    if (answer === '콜라도 제로로 먹는데?') {
      return 'k_low';
    } else if (answer === '그래도 칼로리는 칼로리지') {
      return 'k_mid';
    } else if (answer === '맛있으면 0칼로리!') {
      return 'k_high';
    }

    if (answer === '아이스') {
      return 'ice';
    } else if (answer === '핫') {
      return 'hot';
    }

    if (answer === '아니 별로...') {
      return 'p_low';
    } else if (answer === '적당한게 좋아') {
      return 'p_mid';
    } else if (answer === '단게 땡긴다!!') {
      return 'p_high';
    }

    if (answer === '텅장이다 ㅠ') {
      return 'p_low';
    } else if (answer === 'soso') {
      return 'p_mid';
    } else if (answer === '사치 좀 부려봐?') {
      return 'p_high';
    }
  };

  // 백엔드 형식으로 응답 매핑
  const formattedAnswers = answers.map((answer) =>
    mapAnswerToBackendFormat(answer),
  );

  // 데이터베이스에 질문과 답변 저장
  const newQuestion = new Question({
    username,
    question: questions, // 수정된 부분
    answer: formattedAnswers, // 매칭된 형식으로 저장
  });

  try {
    await newQuestion.save();
    ctx.status = 201; // Created
    ctx.body = newQuestion;
  } catch (e) {
    ctx.throw(500, e);
  }
};
