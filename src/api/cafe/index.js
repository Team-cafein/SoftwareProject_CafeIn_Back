// src/api/cafe/index.js
import Router from 'koa-router';
import * as cafeCtrl from './cafe.ctrl';
import Cafe from '../../models/cafe';

const cafe = new Router();

// 엔드포인트와 컨트롤러를 딕셔너리로 관리
const endpoints = {
  '/db_store_ediya_menu': cafeCtrl.getStoredEdiyaMenu,
  '/db_get_ediya_menu': cafeCtrl.getEdiyaMenu,
  '/db_store_hollys_menu': cafeCtrl.getStoredHollysMenu,
  '/db_get_hollys_menu': cafeCtrl.getHollysMenu,
  '/db_store_starbucks_menu': cafeCtrl.getStoredStarbucksMenu,
  '/db_get_starbucks_menu': cafeCtrl.getStarbucksMenu,
};

// 딕셔너리를 사용하여 엔드포인트를 동적으로 설정
Object.entries(endpoints).forEach(([endpoint, controller]) => {
  cafe.get(endpoint, controller);
});

// 커피 메뉴 데이터를 조회하는 API (페이지네이션 추가)
const createMenuEndpoint = (category) => `/db_get_${category}_menu/:page`; // 엔드포인트 경로 변수 생성 함수

// ediya와 hollys에 대해 페이지네이션을 적용
['ediya', 'hollys', 'starbucks'].forEach((category) => {
  const menuEndpoint = createMenuEndpoint(category); // 엔드포인트 생성
  cafe.get(menuEndpoint, async (ctx) => {
    try {
      // 페이지 번호를 URL에서 추출
      const page = parseInt(ctx.params.page);

      // 페이지당 아이템 수와 페이지 번호를 기반으로 스킵할 아이템 수 계산
      const itemsPerPage = 10; // 페이지당 아이템 수
      const skip = (page - 1) * itemsPerPage;

      // 서브 컬렉션 이름을 동적으로 생성
      const subCollectionName = `cafe/${category}`;

      // 서브 컬렉션에서 커피 데이터를 조회합니다.
      const subCollection = Cafe.db.collection(subCollectionName);
      const totalItems = await subCollection.countDocuments();
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      if (page > totalPages) {
        ctx.body = '마지막 페이지를 벗어났습니다.';
        return;
      }

      const cafes = await subCollection
        .find({})
        .skip(skip) // 스킵할 아이템 수 적용
        .limit(itemsPerPage) // 페이지당 아이템 수 제한
        .toArray();

      ctx.body = cafes;
    } catch (err) {
      console.error('데이터를 조회하는 중에 오류가 발생했습니다.', err);
      ctx.status = 500; // 내부 서버 오류 상태 코드
      ctx.body = {
        error: '데이터를 조회하는 중에 오류가 발생했습니다.',
      };
    }
  });
});

export default cafe;
