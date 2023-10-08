// 로그인했을 때만 API를 사용할 수 있게 하기 위한 미들웨어

const checkLoggedIn = (ctx, next) => {
  if (!ctx.state.user) {
    ctx.status = 401;
    return;
  }
  return next();
};

export default checkLoggedIn;
