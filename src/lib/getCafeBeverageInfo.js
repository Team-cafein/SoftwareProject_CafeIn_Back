// src/lib/getCafeBeverageInfo.js
import Cafe from '../models/cafe';

export const getCafeBeverageInfo = async (ctx, next) => {
  const { id } = ctx.params; // URL 파라미터에서 id를 추출

  try {
    // id를 '_'로 분리하여 cafeid와 beverage를 추출
    const [cafeid, beverage] = id.split('_');

    // Cafe 모델에서 cafeid에 해당하는 cafe를 찾습니다.
    const cafeDocument = await Cafe.findOne({ cafeid });

    if (!cafeDocument) {
      // cafeid에 해당하는 cafe가 없는 경우 404 에러를 반환합니다.
      ctx.status = 404;
      ctx.body = { error: '카페를 찾을 수 없습니다.' };
      return;
    }

    // cafe 서브 컬렉션 이름을 추출
    const cafeCollectionName = `cafe/${cafeDocument.cafe}`;

    // cafe 서브 컬렉션에서 해당 beverage에 해당하는 음료를 찾습니다.
    const subCollection = Cafe.db.collection(cafeCollectionName);
    const cafeBeverage = await subCollection.findOne({
      beverage: parseInt(beverage),
    });

    if (!cafeBeverage) {
      // 해당 형식의 음료를 찾을 수 없을 경우 404 에러를 반환합니다.
      ctx.status = 404;
      ctx.body = { error: '음료를 찾을 수 없습니다.' };
      return;
    }

    // 찾은 음료의 name 필드를 응답합니다.
    ctx.body = { name: cafeBeverage.name };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      error: '음료 정보를 검색하는 중에 오류가 발생했습니다.',
      details: error.message,
    };
  }

  await next();
};
