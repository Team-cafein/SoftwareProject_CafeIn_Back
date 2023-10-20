// src/api/cafe/cafe.ctrl.js
import fs from 'fs/promises';
import path from 'path';
import Cafe from '../../models/cafe';

const categories = {
  idCounter: 0, // 전체 카테고리용 id 카운터
  ediya: {
    cafeidCounter: 0, // 이디야 카테고리용 cafeid 카운터
  },
  hollys: {
    cafeidCounter: 0, // 할리스 카테고리용 cafeid 카운터
  },
  starbucks: {
    cafeidCounter: 0, // 스타벅스 카테고리용 cafeid 카운터
  },
  paik: {
    cafeidCounter: 0, // 스타벅스 카테고리용 cafeid 카운터
  },
  mega: {
    cafeidCounter: 0, // 스타벅스 카테고리용 cafeid 카운터
  },
};

// 카테고리별 cafeidCounter 관리를 위한 함수
const getNextCafeId = (category) => {
  // categories[category].cafeidCounter++;
  return categories[category].cafeidCounter;
};

// 파일을 읽어서 JSON 데이터로 파싱하는 함수
const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('파일을 읽는 중에 오류가 발생했습니다.', err);
    throw err; // 에러를 호출자에게 전파
  }
};

// db에 json 형식을 저장(프론트는 건드릴 필요 없음!)
// GET /api/cafe/db_store_starbucks_menu
const storeMenu = async (ctx, filePath, category) => {
  try {
    // JSON 파일을 읽어옵니다.
    const jsonData = await readJsonFile(filePath);

    // 중복을 제거한 데이터를 저장할 배열
    const newCafes = [];

    // cafeidCounter를 카페 카테고리에 따라 설정
    let cafeidCounter = 0;
    if (category === 'starbucks') {
      cafeidCounter = 1;
    } else if (category === 'ediya') {
      cafeidCounter = 2;
    } else if (category === 'hollys') {
      cafeidCounter = 3;
    } else if (category === 'paik') {
      cafeidCounter = 4;
    } else if (category === 'mega') {
      cafeidCounter = 5;
    }

    // JSON 데이터 처리
    for (const item of jsonData) {
      const cafe = {
        id: categories.idCounter + 1, // 전체 카테고리용 id 카운터를 사용
        cafeid: cafeidCounter,
        beverage: getNextCafeId(category) + 1, // cafeid 카운터
        name: item.prodName, // prodName을 name 필드에 저장
        cafe: item.prodCafe,
        content: item.prodContent || '',
        price: item.prodPrice,
        image: item.prodImage, // prodImage를 image 필드에 저장
        detail: {
          volume:
            item.prodDetail && item.prodDetail.volume
              ? item.prodDetail.volume
              : '',
          kcal:
            item.prodDetail && item.prodDetail.kcal ? item.prodDetail.kcal : '',
          sat_FAT:
            item.prodDetail && item.prodDetail.sat_FAT
              ? item.prodDetail.sat_FAT
              : '',
          sodium:
            item.prodDetail && item.prodDetail.sodium
              ? item.prodDetail.sodium
              : '',
          sugars:
            item.prodDetail && item.prodDetail.sugars
              ? item.prodDetail.sugars
              : '',
          caffeine:
            item.prodDetail && item.prodDetail.caffeine
              ? item.prodDetail.caffeine
              : '',
        },

        tag: item.prodTag || [], // tag 필드를 선택적으로 저장 (없을 경우 빈 배열)
      };

      // 중복된 name을 가진 데이터가 있는지 확인
      const existingCafeIndex = newCafes.findIndex(
        (existing) => existing.name === item.prodName,
      );

      if (existingCafeIndex !== -1) {
        // name이 같은데 내용이 다른 경우, content, tag, 그리고 detail 업데이트
        const existingCafe = newCafes[existingCafeIndex];
        const updatedCafe = {
          ...existingCafe,
          content: cafe.content,
          tag: cafe.tag,
          detail: {
            ...existingCafe.detail,
            volume: cafe.detail.volume || '',
            kcal: cafe.detail.kcal || '',
            sat_FAT: cafe.detail.sat_FAT || '',
            sodium: cafe.detail.sodium || '',
            sugars: cafe.detail.sugars || '',
            caffeine: cafe.detail.caffeine || '',
          },
        };
        newCafes[existingCafeIndex] = updatedCafe;
      } else {
        // 이미 있는 데이터가 없는 경우, 새로 추가합니다.
        newCafes.push(cafe);
        // 전체 카테고리용 id 카운터는 항상 증가
        categories.idCounter++;
        // 카테고리별 cafeid 카운터도 항상 증가
        categories[category].cafeidCounter++;
      }
    }

    // 서브 컬렉션 이름을 생성
    const subCollectionName = `cafe/${category}`;

    // 서브 컬렉션에 새로운 데이터를 추가합니다.
    const subCollection = Cafe.db.collection(subCollectionName);

    // 먼저 기존 데이터를 모두 삭제합니다.
    await subCollection.deleteMany({});

    // 새로운 데이터를 추가합니다.
    await subCollection.insertMany(newCafes);

    ctx.body = '데이터가 성공적으로 저장되었습니다.';
  } catch (err) {
    console.error(
      '파일을 읽거나 데이터를 저장하는 중에 오류가 발생했습니다.',
      err,
    );
    ctx.status = 500; // 내부 서버 오류 상태 코드
    ctx.body = {
      error: '파일을 읽거나 데이터를 저장하는 중에 오류가 발생했습니다.',
    };
  }
};

// db에 저장된 cafe/카페종류 의 데이터를 가져옴
// GET /api/cafe/db_get_starbucks_menu
const getMenu = async (ctx, category) => {
  try {
    // cafecount 값을 URL에서 추출
    const beverage = parseInt(ctx.query.beverage);

    // 정적인 서브 컬렉션 이름을 사용
    const subCollectionName = `cafe/${category}`;

    // 서브 컬렉션에서 커피 데이터를 조회합니다.
    const subCollection = Cafe.db.collection(subCollectionName);

    if (isNaN(beverage)) {
      // cafecount가 지정되지 않은 경우, 전체 커피 목록을 반환
      const cafes = await subCollection.find({}).toArray();
      ctx.body = cafes;
    } else {
      // cafecount를 사용하여 해당 커피 데이터를 가져옵니다.
      const coffee = await subCollection.findOne({ beverage: beverage });

      if (!coffee) {
        ctx.status = 404; // 데이터를 찾을 수 없음 상태 코드
        ctx.body = { error: '커피를 찾을 수 없습니다.' };
      } else {
        ctx.body = coffee;
      }
    }
  } catch (err) {
    console.error('데이터를 조회하는 중에 오류가 발생했습니다.', err);
    ctx.status = 500; // 내부 서버 오류 상태 코드
    ctx.body = {
      error: '데이터를 조회하는 중에 오류가 발생했습니다.',
    };
  }
};

// 이디야 커피 메뉴 데이터를 저장하는 API
export const getStoredEdiyaMenu = async (ctx) => {
  const filePath = path.join(__dirname, 'cafeinfo', 'ediya_menu.json');
  await storeMenu(ctx, filePath, 'ediya');
};

// DB에 저장된 이디야 커피 데이터를 조회하는 API
export const getEdiyaMenu = async (ctx) => {
  await getMenu(ctx, 'ediya');
};

// 할리스 커피 메뉴 데이터를 저장하는 API
export const getStoredHollysMenu = async (ctx) => {
  const filePath = path.join(__dirname, 'cafeinfo', 'hollys_menu.json');
  await storeMenu(ctx, filePath, 'hollys');
};

// DB에 저장된 할리스 커피 데이터를 조회하는 API
export const getHollysMenu = async (ctx) => {
  await getMenu(ctx, 'hollys');
};

// 스타벅스 커피 메뉴 데이터를 저장하는 API
export const getStoredStarbucksMenu = async (ctx) => {
  const filePath = path.join(__dirname, 'cafeinfo', 'starbucks_menu.json');
  await storeMenu(ctx, filePath, 'starbucks');
};

// DB에 저장된 스타벅스 커피 데이터를 조회하는 API
export const getStarbucksMenu = async (ctx) => {
  await getMenu(ctx, 'starbucks');
};

// 백다방 커피 메뉴 데이터를 저장하는 API
export const getStoredPaikMenu = async (ctx) => {
  const filePath = path.join(__dirname, 'cafeinfo', 'paik_menu.json');
  await storeMenu(ctx, filePath, 'paik');
};

// DB에 저장된 백다방 커피 데이터를 조회하는 API
export const getPaikMenu = async (ctx) => {
  await getMenu(ctx, 'paik');
};

// 메가 커피 메뉴 데이터를 저장하는 API
export const getStoredMegaMenu = async (ctx) => {
  const filePath = path.join(__dirname, 'cafeinfo', 'mega_menu.json');
  await storeMenu(ctx, filePath, 'mega');
};

// DB에 저장된 메가 커피 데이터를 조회하는 API
export const getMegaMenu = async (ctx) => {
  await getMenu(ctx, 'mega');
};
