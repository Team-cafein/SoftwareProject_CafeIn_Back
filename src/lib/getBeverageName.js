// // src/lib/getBeverageName.js

import Cafe from '../models/cafe';

const selectCollection = (cafeid) => {
  if (cafeid === 1) {
    return 'starbucks';
  } else if (cafeid === 2) {
    return 'ediya';
  } else if (cafeid === 3) {
    return 'hollys';
  } else if (cafeid === 4) {
    return 'paik';
  } else if (cafeid === 5) {
    return 'mega';
  }
};

export const getBeverageName = async (ctx, next) => {
  const { cafeid, beverage } = ctx.state;
  console.log(cafeid);
  console.log(beverage);

  // selectCollection 함수를 사용하여 category 설정
  const category = selectCollection(parseInt(cafeid));
  console.log('카테고리:', category);

  try {
    // 정적인 서브 컬렉션 이름을 사용
    const subCollectionName = `cafe/${category}`;
    console.log('서브컬렉션:', subCollectionName);

    // 서브 컬렉션에서 커피 데이터를 조회합니다.
    const subCollection = Cafe.db.collection(subCollectionName);
    // console.log('서브컬렉션:', subCollection);

    if (isNaN(beverage)) {
      // cafecount가 지정되지 않은 경우, 전체 커피 목록을 반환
      const cafes = await subCollection.find({}).toArray();
      ctx.body = cafes;
    } else {
      // cafecount를 사용하여 해당 커피 데이터를 가져옵니다.
      const coffee = await subCollection.findOne({
        beverage: parseInt(beverage),
      });

      if (!coffee) {
        ctx.status = 404; // 데이터를 찾을 수 없음 상태 코드
        ctx.body = { error: '커피를 찾을 수 없습니다.' };
      } else {
        // ctx.body = coffee;
        ctx.state.beverageName = coffee.name;
      }
    }
    // 찾은 음료의 name 필드를 리스트에 저장합니다.

    // console.log(ctx.body);
    console.log(ctx.state.beverageName);

    await next();
  } catch (err) {
    console.error('데이터를 조회하는 중에 오류가 발생했습니다.', err);
    ctx.status = 500; // 내부 서버 오류 상태 코드
    ctx.body = {
      error: '데이터를 조회하는 중에 오류가 발생했습니다.',
    };
  }
};
