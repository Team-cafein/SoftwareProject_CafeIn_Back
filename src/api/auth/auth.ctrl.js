// // src/api/auth/auth.ctrl.js
// import Joi from 'joi';
// import User from '../../models/user';

// // POST /api/auth/register
// // {
// //     username: 'velopert',
// //     password: 'mypass123'
// // }

// export const register = async (ctx) => {
//   // 회원가입
//   // Request Body 검증
//   const schema = Joi.object().keys({
//     username: Joi.string().alphanum().min(3).max(20).required(),
//     password: Joi.string().required(),
//   });

//   const result = schema.validate(ctx.request.body); // POST 매소드가 유효한지 joi를 통해 확인
//   if (result.error) {
//     ctx.status = 400;
//     ctx.body = result.error;
//     return;
//   }

//   const { username, password } = ctx.request.body;
//   try {
//     const exists = await User.findByUsername(username);
//     if (exists) {
//       ctx.status = 409; // Conflict
//       return;
//     }

//     const user = new User({
//       username,
//     });

//     await user.setPassword(password); // 비밀번호 설정
//     await user.save(); // 데이터베이스에 저장

//     ctx.body = user.serialize();

//     const token = user.generateToken();
//     ctx.cookies.set('access_token', token, {
//       maxAge: 1000 * 60 * 60 * 24 * 7, // 7일(1초 * 1분 * 1시간 * 24시간 * 7일)
//       httpOnly: true,
//     });
//   } catch (e) {
//     ctx.throw(500, e);
//   }
// };

// // export const register = async (ctx) => {
// //   const schema = Joi.object().keys({
// //     username: Joi.string().alphanum().min(3).max(20).required(),
// //     password: Joi.string().required(),
// //     question: Joi.string(), // 질문은 선택사항
// //     answer: Joi.string(), // 답변은 선택사항
// //   });

// //   const result = schema.validate(ctx.request.body);

// //   if (result.error) {
// //     ctx.status = 400;
// //     ctx.body = result.error;
// //     return;
// //   }

// //   const { username, password, question, answer } = ctx.request.body;

// //   try {
// //     const exists = await User.findByUsername(username);
// //     if (exists) {
// //       ctx.status = 409; // Conflict
// //       return;
// //     }

// //     const user = new User({
// //       username,
// //       question, // 질문 추가
// //       answer, // 답변 추가
// //     });

// //     await user.setPassword(password);
// //     await user.save();

// //     ctx.body = user.serialize();

// //     const token = user.generateToken();
// //     ctx.cookies.set('access_token', token, {
// //       maxAge: 1000 * 60 * 60 * 24 * 7,
// //       httpOnly: true,
// //     });
// //   } catch (e) {
// //     ctx.throw(500, e);
// //   }
// // };

// // POST /api/auth/login
// // {
// //     username: 'velopert',
// //     password: 'mypass123'
// // }

// export const login = async (ctx) => {
//   // 로그인
//   const { username, password } = ctx.request.body;

//   // username, password가 없으면 에러 처리
//   if (!username || !password) {
//     ctx.status = 401; // Unauthorized
//     return;
//   }

//   try {
//     const user = await User.findByUsername(username);
//     // 계정이 존재하지 않으면 에러 처리
//     if (!user) {
//       ctx.status = 401;
//       return;
//     }
//     const valid = await user.checkPassword(password);
//     // 잘못된 비밀번호
//     if (!valid) {
//       ctx.status = 401;
//       return;
//     }
//     ctx.body = user.serialize();
//     const token = user.generateToken();
//     ctx.cookies.set('access_token', token, {
//       maxAge: 1000 * 60 * 60 * 24 * 7, // 7일(1초 * 1분 * 1시간 * 24시간 * 7일)
//       httpOnly: true,
//     });
//   } catch (e) {
//     ctx.throw(500, e);
//   }
// };

// // GET /api/auth/check
// export const check = async (ctx) => {
//   // 로그인 상태 확인
//   const { user } = ctx.status;
//   if (!user) {
//     // 로그인 중 아님
//     ctx.status = 401; // Unauthorized
//     return;
//   }
//   ctx.body = user;
// };

// export const logout = async (ctx) => {
//   // 로그아웃
//   ctx.cookies.set('access_token');
//   ctx.status = 204;
// };

import Joi from 'joi';
import User from '../../models/user';

// POST /api/auth/register
// {
//     username: 'velopert',
//     loginid: 'myid123',
//     password: 'mypass123'
// }

export const register = async (ctx) => {
  // 회원가입
  // Request Body 검증
  const schema = Joi.object().keys({
    username: Joi.string().max(10).required(),
    loginid: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, loginid, password } = ctx.request.body;
  try {
    const exists = await User.findByLoginId(loginid);
    if (exists) {
      ctx.status = 409; // Conflict
      return;
    }

    const user = new User({
      username,
      loginid,
    });

    await user.setPassword(password);
    await user.save();

    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

// POST /api/auth/login
// {
//     loginid: 'myid123',
//     password: 'mypass123'
// }

export const login = async (ctx) => {
  // 로그인
  const { loginid, password } = ctx.request.body;

  if (!loginid || !password) {
    ctx.status = 401; // Unauthorized
    return;
  }

  try {
    const user = await User.findByLoginId(loginid);
    if (!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

// GET /api/auth/check
export const check = async (ctx) => {
  // 로그인 상태 확인
  const { user } = ctx.status;
  if (!user) {
    // 로그인 중 아님
    ctx.status = 401; // Unauthorized
    return;
  }
  ctx.body = user;
};

export const logout = async (ctx) => {
  // 로그아웃
  ctx.cookies.set('access_token');
  ctx.status = 204;
};
