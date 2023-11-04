// src/lib/getCafeBeverageInfo.js

const getBeverageIdToSplit = async (ctx, next) => {
  const { id } = ctx.params; // URL 파라미터에서 id를 추출

  try {
    // id를 '_'로 분리하여 cafeid와 beverage를 추출
    const [cafeid, beverage] = id.split('_');

    // 추출된 cafeid와 beverage를 ctx.state에 저장합니다.
    ctx.state.cafeid = cafeid;
    ctx.state.beverage = beverage;

    await next();
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      error: '음료 정보를 검색하는 중에 오류가 발생했습니다.',
      details: error.message,
    };
  }
};

export default getBeverageIdToSplit;
