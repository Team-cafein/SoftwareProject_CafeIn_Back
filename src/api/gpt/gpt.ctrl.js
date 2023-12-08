// src/api/gpt/gpt.ctrl.js
import axios from 'axios';
require('dotenv').config();
const { OPENAI_SECRET_KEY, MONGO_URI } = process.env;
import Cafe from '../../models/cafe';
import { MongoClient } from 'mongodb';

// GPT-3 API에 대한 설정
const gptAPI = axios.create({
  baseURL: 'https://api.openai.com',
  headers: {
    Authorization: `Bearer ${OPENAI_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
});

// 사용자의 챗봇 질문에 대한 응답을 처리하는 함수
export const ask = async (ctx) => {
  const { question } = ctx.request.body;

  try {
    // GPT-3 API 호출 결과를 얻어와 응답으로 전송
    const answer = await askGpt(question);

    ctx.body = { answer };
  } catch (error) {
    // 오류가 발생한 경우 500 상태코드와 오류 메시지 응답
    ctx.status = 500;
    ctx.body = { error: 'GPT-3 API 요청 중 오류가 발생했습니다.' };
  }
};

// GPT API에 사용자 질문을 전달하고 응답을 받아오는 함수
const askGpt = async (userMessage) => {
  try {
    // 시스템 메시지 및 사용자 질문을 포함하는 메시지 배열
    let messages = [
      {
        role: 'system',
        content: '카페인(CafeIn) 서비스 챗봇 콕인(CokIn)이에요!',
      },
      {
        role: 'system',
        content:
          '카페인(CafeIn) 서비스를 개발한 사람은 상명대학교 소프트웨어학과 김승찬 임형준 박혜정이다.',
      },
      {
        role: 'system',
        content:
          '김승찬은 소프트웨어학과 19학번으로 카페인 서비스 프론트엔드와 백엔드 풀스택으로 둘 다 개발했으며 특히 백엔드를 중신적으로 개발, 추가적으로 챗봇 CokIn도 개발했다. 임형준은 소프트웨어학과 19학번으로 프론트엔드를 매우 중점적으로 개발했다.  박혜정은 소프트웨어학과 20학번으로 음료 데이터 전처리와 백엔드를 개발했다.',
      },
      {
        role: 'system',
        content: '콕인(CokIn)에게 부여한 역할에 벗어나면 안된다.',
      },
      {
        role: 'system',
        content: '어시스턴트 형식으로 음료 데이터가 주어지면 그 내용을 기반으로 내에서만 학습하고 대답해야 하고 어시스턴트형식으로 음료 데이터가 주어지지 않거나 카페인(CafeIn) 서비스에서 지원하지 않는 카페라면 콕인(CokIn)이 알고 있는 GPT 데이터로 대답하면 된다.',
      },
      {
        role: 'system',
        content:
          '콕인(CokIn)의 음료 추천서비스 카페인(CafeIn)에 주요 서비스중 하나인 챗봇으로 데이터베이스에 저장되어있는 음료 추천 뿐만 아니라 추가적으로 그냥 GPT가 인터넷에서 학습해서 알고있는 카페인 서비스에 없는 카페 데이터도 대답해야한다.',
      },
      {
        role: 'system',
        content:
          '콕인(CokIn)이라는 이름이 붙여진 이유는 음료 추천서비스 카페인(CafeIn)에서 하나의 음료를 콕(cok) 찝어서 준다는 의미와 뒷글자는 Cafe들이 들어가 있다는 전치사 In의 의미를 붙여 따서 지어졌다.',
      },
      {
        role: 'system',
        content:
          'id,cafeid,beverage,name,cafe,content,price,image,detail.volume,detail.kcal,detail.sat_FAT,detail.sodium,detail.sugars,detail.caffeine,tag[0],tag[1],tag[2],tag[3],tag[4],tag[5] DB에서 검색이 되었다면 앞에 어시스턴트 형식으로만 데이터가 주어지며, 콕인이 사용자에게 대답을 줄 때에는 이 데이터들을 한글로 가공하여 사용자가 알아듣기 편하게 대답해야한다.',
      },
      {
        role: 'system',
        content:
          'id: int(전체 카페 음료 번호), cafeid: int(1부터 5까지), beverage: int(한 카페당 음료 번호), name: string(음료 이름), cafe: string(카페이름), content: string(음료 내용), price: int(음료 가격), image: string(음료 이미지 url 링크), detail.volume: string(음료 사이즈), detail.kcal: string(음료 칼로리), detail.sat_FAT: string(음료 지방), detail.sodium: string(음료 나트륨), detail.sugars: string(음료 당분), detail.caffeine: string(음료 카페인), tag[0],tag[1],tag[2],tag[3],tag[4],tag[5] tag는 전부 키워드 string 형식으로만 데이터가 주어진다.',
      },
      {
        role: 'system',
        content:
          'tag[0]은 coffee,non-coffee 커피인지 논커피인지, tag[1]은 americano,latte,ade,juice,tea 아메리카노, 라떼, 에이드, 주스, 티 인지 종류를, tag[2]은 k_low,k_mid,k_high 칼로리가 낮음 중간 높음, tag[3]은 ice,hot 아이스 또는 핫, tag[4]은 s_low, s_mid, s_high 당도가 낮음, 중간, 높음을, tag[5]은 p_low,p_mid,p_high 가격 싸다 중간 비싸다를 나타내며 사용자의 요청에 따라 태그를 파악해 적절한 음료를 추천해야한다.',
      },
      {
        role: 'system',
        content:
          '기본적으로는 무조건 하나의 음료 메뉴만 추천해야한다. 특히 ~ 추천해줘 ~ 알려줘 ~ 뭐야 등으로 물어보면 하나의 음료만 추천해야한다. 또한 콕인(CokIn)은 추천 음료 중에서 어떤 음료가 좋냐는 역으로 질문은 하면안되고 사용자에게 선택권을 주지 않고 무조건 기본적으로 하나의 음료를 추천해야한다.',
      },
      {
        role: 'system',
        content:
          '어시스턴트 형식 데이터 중 tag[0]은 coffee,non-coffee 커피인지 논커피인지, tag[1]은 americano,latte,ade,juice,tea 아메리카노, 라떼, 에이드, 주스, 티 인지 종류를, tag[2]은 k_low,k_mid,k_high 칼로리가 낮음 중간 높음, tag[3]은 ice,hot 아이스 또는 핫, tag[4]은 s_low, s_mid, s_high 당도가 낮음, 중간, 높음을, tag[5]은 p_low,p_mid,p_high 가격 싸다 중간 비싸다를 나타내며 사용자한테 말할 때에는 키워드를 한국말로 치환해서 알려주어야한다.',
      },
      {
        role: 'system',
        content:
          '만약 데이터 베이스에서 태그에 완벽하게 일치하는 데이터가 없다면 다른 카페 음료여도 좋으니, 콕인(CokIn)이 알고 있는 음료 정보를 보여줘야 한다.',
      },
      {
        role: 'system',
        content: '위의 주어진 형식과 같은 assistant의 데이터가 들어가 있다면 assistant의 형식에 맞춰 있는 데이터를 먼저 보여줘야하고, 위의 주어진 형식의 assistant형식에 데이터가 안들어 온다면 그 것은 DB에서 검색하지 못한 데이터 이므로 이때는 콕인(CokIn)이 알고 있는 음료 정보를 보여주도 된다.',
      },
    ];

    // 사용자 메시지에서 추출한 카페 이름, 음료 이름, 태그 정보
    let cafeName = extractCafeName(userMessage);

    if (cafeName === '' && !cafeName) { // 카페 이름이 없고 음료 이름 있고, 태그 정보는 있을 때
      cafeName = 'all';
    }

    let beverageName = extractBeverageName(userMessage);
    let tag = extractCafeTag(userMessage);


    // 추출된 디버깅 코드
    console.log('Extracted Cafe Name:', cafeName);
    console.log('Extracted Beverage Name:', beverageName);
    console.log('Extracted Cafe Tag:', tag);

    // MongoDB에 연결
    const client = new MongoClient(MONGO_URI);
    await client.connect();

    // 데이터를 포맷팅하여 시스템 메시지 배열에 추가하는 함수
    const formatData = (data) => {
      if (data.length === 0) {
        return [{ role: 'system', content: 'DB에 데이터가 없습니다.' }];
      }

      // db에서 검색해온 데이터 갯수가 2개가 넘을 때 랜덤으로 한개를 뽑아서 붙임
      if (data.length > 2) {
        data = getRandomDataMessages(data);
      }

      console.log("들어온 데이터", data)

      // 데이터를 문자열 형태로 변환
      const templateStringArray = data.map(
        (item) =>
          `id: ${item.id}, cafeid: ${item.cafeid}, beverage: ${item.beverage
          }, name: '${item.name}', cafe: '${item.cafe}', content: '${item.content
          }', price: '${item.price}', image: '${item.image
          }', detail: ${JSON.stringify(item.detail)}, tag: ${JSON.stringify(
            item.tag,
          )}`,
      );

      // 각 데이터를 시스템 메시지로 변환하여 배열에 추가
      let dataMessages = templateStringArray.map((formattedData, index) => ({
        role: 'system',
        content: formattedData,
      }));

      const additionalSystemMessages = [
        {
          role: 'assistant',
          content: `콕인(CokIn)이 ${data[0].cafe}에서 음료를 추천해드려요! \n<a href="http://localhost:3000/category/${data[0].cafe}/${data[0].cafeid}/${data[0].beverage}" target="_blank">[${data[0].name} 바로가기]</a>\n`,
        },
        {
          role: 'system',
          content: `콕인(CokIn)이 ${data[0].cafe}에서 음료를 추천해드려요! <a href="http://localhost:3000/category/${data[0].cafe}/${data[0].cafeid}/${data[0].beverage}" target="_blank">[${data[0].name} 바로가기]</a> 앞에 <a> 태그 형식으로만 글자 하나 안틀리고 정확히 반환해야한다. 음료 이미지 \n<p><img style="width: 170px; height: 200px;" src="${data[0].image}" /></p>\n ${data[0].name} ${data[0].content}을 요약한 내용. ${data[0].tag}에 대한 내용 아래 링크에서 더 자세한 정보를 확인해보세요. ${data[0].image}는 url 즉, 이미지 url를 반환하고, 실제로 콕인이 밑에 데이터 중 최적의 답을 골라서 대입해서 표현하면 된다.`,
        },
        {
          role: 'assistant',
          content: `${data[0].name} ${data[0].content}을 ~ 요약한 내용, 음료 이미지 \n<p><img style="width: 170px; height: 200px;" src="${data[0].image}" /></p>\n `,
        },
        {
          role: 'system',
          content: `어시스턴트로 지정한 데이터가 있다면 앵커 태그가 들어있는 <a href="http://localhost:3000/category/${data[0].cafe}/${data[0].cafeid}/${data[0].beverage}" target="_blank">[${data[0].name} 바로가기]</a> 형식을 보여주어야하며, 또한 항상 가장 마지막에는 이미지 태그가 들어가있는 메뉴 이미지 <p><img style="width: 170px; height: 200px;" src="${data[0].image}" /></p> 형식으로 이미지를 보여줘야한다`,
        },
      ];

      const messages = [...dataMessages, ...additionalSystemMessages];

      return messages;
    };


    // 카페 이름, 음료 이름, 태그에 따라 데이터 조회 및 시스템 메시지 추가
    if (cafeName && beverageName) {
      // 카페 이름과 음료 이름이 주어지는 경우
      const cafeDataName = await getCafeDataByName(cafeName, beverageName);
      messages = messages.concat(formatData(cafeDataName));
      // console.log(messages);
    } else if (tag) {
      // 태그만 주어지는 경우
      const cafeDataTag = await getCafeDataByTag(cafeName, tag);
      messages = messages.concat(formatData(cafeDataTag));
      // console.log(messages);
    } else if (cafeName && tag) {
      // 카페 이름과 태그가 있는 경우
      const cafeDataName = await getCafeDataByName(cafeName, beverageName);
      const cafeDataTag = await getCafeDataByTag(cafeName, tag);

      // 교집합 데이터만 추출
      const intersectionData = cafeDataName.filter((itemName) =>
        cafeDataTag.some((itemTag) => itemTag.id === itemName.id),
      );

      messages = messages.concat(formatData(intersectionData));
      // console.log(messages);
    }

    // console.log(formattedData);

    // console.log(messages)

    // 사용자 질문 메시지를 시스템 메시지 배열에 추가
    userMessage = { role: 'user', content: `사용자 질문: ${userMessage}\n` };
    // 기존 messages 배열에 사용자 질문 메시지를 추가
    messages.push(userMessage);

    console.log(messages);

    // GPT-3 API 호출 수행
    const response = await gptAPI.post('/v1/chat/completions', {
      model: 'gpt-3.5-turbo-1106',
      messages,
    });

    // GPT-3 응답에서 메시지 내용 추출
    const repliedMessage = response.data.choices[0].message.content;

    // console.log(repliedMessage)
    return repliedMessage;
  } catch (error) {
    console.error(error);
  }
};

// 랜덤으로 1개의 데이터 선택하는 함수
const getRandomDataMessages = (dataMessages) => {
  const randomIndex = Math.floor(Math.random() * dataMessages.length);
  return [dataMessages[randomIndex]];
};

// 카페 이름과 음료 이름으로 데이터 조회하는 함수
const getCafeDataByName = async (cafeName, beverageName) => {
  try {
    // 서브 컬렉션에서 커피 데이터를 조회합니다.
    const subCollection = Cafe.db.collection(`cafe/${cafeName}`);
    // console.log(subCollection)
    console.log("들어온 카페 이름 데이터", cafeName)

    // name 필드가 beverageName과 일치하는 데이터를 찾습니다.
    const cafeData = await subCollection
      .find({ name: { $regex: new RegExp(beverageName, 'i') } })
      // .find({ name: beverageName })
      .toArray();
    console.log(cafeData)

    return cafeData;
  } catch (error) {
    console.error('카페 데이터를 가져오는 중 오류 발생:', error);
    throw error;
  }
};

// // 카페 이름이 안주어지고 음료 이름만 있을 때 음료를 데이터 조회하는 함수
// const getAllCafeBeverageName = async (beverageName) => {
//   try {
//     console.log('검색어:', beverageName);
//     // 서브 컬렉션에서 커피 데이터를 조회합니다.
//     const subCollection = Cafe.db.collection('cafe/all');
//     // console.log(subCollection)

//     // name 필드가 beverageName과 일치하는 데이터를 찾습니다.
//     const cafeData = await subCollection
//       .find({ name: { $regex: new RegExp(beverageName, 'i') } })
//       .toArray();

//     console.log('검색 결과:', cafeData);

//     return cafeData;
//   } catch (error) {
//     console.error('카페 데이터를 가져오는 중 오류 발생:', error);
//     throw error;
//   }
// };

// 카페 이름과 태그로 데이터 조회하는 함수
const getCafeDataByTag = async (cafeName, tag) => {
  try {
    // 서브 컬렉션에서 커피 데이터를 조회합니다.
    // console.log("들어온 카페 이름 데이터", cafeName)

    const subCollection = Cafe.db.collection(`cafe/${cafeName}`);

    // tag 배열 안에 tag가 포함되어 있는 데이터를 찾습니다.
    const cafeData = await subCollection.find({ tag: { $all: tag } }).toArray();

    return cafeData;
  } catch (error) {
    console.error('카페 데이터를 가져오는 중 오류 발생:', error);
    throw error;
  }
};

// 사용자 질문에서 카페 이름을 추출하는 함수
const extractCafeName = (userMessage) => {
  const cafeKeywords = ['스타벅스', '이디야', '할리스', '백다방', '메가'];

  for (const keyword of cafeKeywords) {
    if (userMessage.includes(keyword)) {
      // 사용자 입력에 따라 새로운 변수에 카페 이름 저장
      let extractedCafeName;
      if (keyword == '스타벅스') {
        extractedCafeName = 'starbucks';
      } else if (keyword == '이디야') {
        extractedCafeName = 'ediya';
      } else if (keyword == '할리스') {
        extractedCafeName = 'hollys';
      } else if (keyword == '백다방') {
        extractedCafeName = 'paik';
      } else if (keyword == '메가') {
        extractedCafeName = 'mega';
      } else {
        extractedCafeName = 'all';
      }
      return extractedCafeName;
    }
  }

  // 카페 이름을 찾지 못한 경우 빈 문자열로 기본 설정
  return '';
};


const extractBeverageName = (userMessage) => {
  const beverageKeywords = [
    '아메리카노',
    '아메',
    '콜드브루',
    '콜드',
    '콜드 브루',
    '라떼',
    '에이드',
    '주스',
    '티',
    '요거트',
  ];

  // 음료 키워드를 추가
  beverageKeywords.push('음료');

  // 램덤으로 키워드를 뽑음
  const shuffledKeywords = [...beverageKeywords].sort(() => Math.random() - 0.5);

  for (const keyword of shuffledKeywords) {
    if (userMessage.includes(keyword)) {
      let extractedBeverageName;
      if (keyword == '아메리카노' || keyword == '아메') {
        extractedBeverageName = '아메리카노';
      } else if (keyword == '콜드브루' || keyword == '콜드' || keyword == '콜드 브루') {
        extractedBeverageName = '콜드브루';
      } else if (keyword == '라떼') {
        extractedBeverageName = '라떼';
      } else if (keyword == '에이드') {
        extractedBeverageName = '에이드';
      } else if (keyword == '주스') {
        extractedBeverageName = '주스';
      } else if (keyword == '티') {
        extractedBeverageName = '티';
      } else if (keyword == '요거트') {
        extractedBeverageName = '요거트';
      } else if (keyword == '음료') { // 랜덤으로 뽑기 때문에 가장 마지막에 예외처리를 해야됨
        extractedBeverageName = shuffledKeywords[Math.floor(Math.random() * shuffledKeywords.length)];
      }

      return extractedBeverageName;
    }
  }

  // 키워드를 찾지 못했다면 빈 키워드를 반환
  return '';
};


const extractCafeTag = (userMessage) => {
  const tagKeywords = {
    '커피': 'coffee',
    '논커피': 'non-coffee',
    '아이스': 'ice',
    '핫': 'hot',
    // '아메리카노': 'americano',
    '라떼': 'latte',
    '에이드': 'ade',
    // '주스': 'juice',
    '티': 'tea',
    '칼로리 낮': 'k_low',
    '칼로리가 낮': 'k_low',
    '칼로리 중': 'k_mid',
    '칼로리가 중': 'k_mid',
    '칼로리 높': 'k_high',
    '칼로리가 높': 'k_high',
    '당도 낮': 's_low',
    '당도가 낮': 's_low',
    '당도 중': 's_mid',
    '당도가 중': 's_mid',
    '당도 높': 's_high',
    '당도가 높': 's_high',
    '가격 낮': 'p_low',
    '가격이 낮': 'p_low',
    '가격 싼': 'p_low',
    '가격이 싼': 'p_low',
    '가격 중': 'p_mid',
    '가격이 중': 'p_mid',
    '가격 적': 'p_mid',
    '가격이 적': 'p_mid',
    '가격 높': 'p_high',
    '가격이 높': 'p_high',
    '가격 비싼': 'p_high',
    '가격이 비싼': 'p_high',
  };

  const extractedCafeTags = [];

  for (const keyword in tagKeywords) {
    if (userMessage.includes(keyword)) {
      extractedCafeTags.push(tagKeywords[keyword]);
    }
  }

  return extractedCafeTags;
};