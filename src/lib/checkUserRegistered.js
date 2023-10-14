import User from '../models/user';

const checkUserRegistered = async (ctx, next) => {
  const { username } = ctx.request.body;

  try {
    const user = await User.findByUsername(username);
    if (user) {
      ctx.status = 409; // Conflict
      ctx.body = {
        message: '이미 등록된 사용자입니다.',
        username: user.username,
      };
      return;
    }
  } catch (e) {
    ctx.throw(500, e);
  }

  return next();
};

export default checkUserRegistered;
