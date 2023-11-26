// src/api/gpt/gpt.ctrl.js

import axios from 'axios';
require('dotenv').config();
const { OPENAI_SECRET_KEY } = process.env;
import { createStarbucksMessage } from './starbucks';

const gptAPI = axios.create({
  baseURL: 'https://api.openai.com',
  headers: {
    Authorization: `Bearer ${OPENAI_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const ask = async (ctx) => {
  const { question } = ctx.request.body;

  try {
    const answer = await askGpt(question);

    ctx.body = { answer };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'GPT-3 API 요청 중 오류가 발생했습니다.' };
  }
};

const askGpt = async (userMessage) => {
  try {
    let messages = [
      // global 룰
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
        content: '콕인(CokIn)에게 부여한 역할에 벗어나면 안된다.',
      },
      {
        role: 'system',
        content: '주어진 음료 데이터 내에서만 학습하고 대답해야한다.',
      },
      {
        role: 'system',
        content:
          '콕인(CokIn)의 음료 추천서비스 카페인(CafeIn)에 주요 서비스중 하나인 챗봇으로 데이터베이스에 저장되어있는 음료만 추천해야한다.',
      },
      {
        role: 'system',
        content:
          '콕인(CokIn)이라는 이름이 붙여진 이유는 음료 추천서비스 카페인(CafeIn)에서 하나의 음료를 콕(cok) 찝어서 준다는 의미와 cafein의 뒷글자 in를 따서 지어졌다.',
      },
      {
        role: 'system',
        content:
          'id,cafeid,beverage,name,cafe,content,price,image,detail.volume,detail.kcal,detail.sat_FAT,detail.sodium,detail.sugars,detail.caffeine,tag[0],tag[1],tag[2],tag[3],tag[4],tag[5] 형식으로만 데이터가 주어지며, 콕인은 이 데이터를 가공하여 사용자가 알아듣기 편하게 대답해야한다.',
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
          '기본적으로는 무조건 하나의 음료 메뉴만 추천해야한다. 특히 ~ 추천해줘 ~ 알려줘 라고 물어보면 하나만 추천해야한다. 추가적으로 사용자가 여러개를 추천해달라는 내용이 있을 때만 하나 이상의 메뉴를 추천해야 한다. 예를 들어 ~ 2개 이상 추천해줘 여러개를 추천해줘 등등 또한 콕인(CokIn)은 추천 음료 중에서 어떤 음료가 좋냐는 역으로 질문은 하면안되고 사용자에게 선택권을 주지 않고 무조건 기본적으로 하나의 음료를 추천해야한다.',
      },
      {
        role: 'system',
        content: `데이터 형식을 받으면 메뉴를 추천할 때의 콕인(CokIn)의 대답 형식은 사용자가 원하는 메뉴를 이름과 tag 등으로 판단하고 추천해주는 답변일 시 마지막에는 무조건 http://localhost:3000/category/{cafe}/{cafeid}/{beverage} 형식으로 대답해 주어야 한다. {}는 보간법으로 {}안에는 실제로는 {cafe}는 카페이름[starbucks, ediya, hollys, paik, mega]의 이름 중에만 {cafeid}는 [1, 2, 3, 4, 5,] 중 에만 {beverage}는 실제 저장된 음료 번호(정수)가 매칭되서 들어가야한다 `,
      },
      {
        role: 'assistant',
        content:
          '마지막 반환해주는 url의 /{cafe}/{cafeid}/{beverage} 순서는 절대적으로 지켜져야한다. 가끔 반대로 /{beverage}/{cafeid} 순서로 나올 때가 있는데 이러면 안된다. cafeid는 1부터 5까지 밖에 없기 때문에 만약 5을 넘는다면 틀린 것이므로 {cafeid}/{beverage}경우로 반환해주어야 한다.',
      },
      {
        role: 'assistant',
        content:
          '추천답변은 무조건 이 형식을 따라야 한다. 콕인(CokIn)이 {cafe}에서 음료를 추천해드려요! "{name}" {conent을 요약한 내용}. {tag에 대한 내용} 아래 링크에서 더 자세한 정보를 확인해보세요. \n\n <a href="{http://localhost:3000/category/{cafe}/{cafeid}/{beverage}}" target="_blank">[{name} 바로가기]</a> 앞에 <a> 태그 형식으로만 글자 하나 안틀리고 반환해야한다. \n 음료 이미지 <p><img className="img" src={image} alt="Image" /></p> {image}는 url 즉, 이미지 url를 반환하고, {}은 보간법을 나타내 주는 것으로 실제로 콕인이 밑에 데이터 중 최적의 답을 골라서 대입해서 표현하면 된다. url과 image url 은 인식될 때 구분 될 수 있어야한다.',
      },
      {
        role: 'assistant',
        content:
          '[{name} 바로가기]을 보여줬다면 \n을 한 이후 항상 가장 마지막에 "메뉴 이미지" {image} 형식으로 이미지 링크 url를 보여주어야한다. 만약 여려개의 음료를 추천했으면 그 중의 하나의 이미지만 표현해야한다.',
      },
      {
        role: 'assistant',
        content:
          '"많은 음료 중에서 하나를 골라드릴까요?" 혹은 "저는 여러분이 좋아하실 만한 음료를 회원님께 추천해드릴게요."라는 말과 같이 역으로 질문을 요구하는 것이 아니라 하는 것이 아니라 무조건 하나의 메뉴를 추천하는 답변을 해야한다.',
      },

      // 사용자 질문 메시지 추가
      { role: 'user', content: `사용자 질문: ${userMessage}\n` },
    ];

    // 스타벅스에 대한 튜닝
    if (
      userMessage.includes('스타벅스') ||
      userMessage.includes('스타 벅스') ||
      userMessage.includes('스타')
    ) {
      if (
        userMessage.includes('콜드 브루') ||
        userMessage.includes('콜드브루')
      ) {
        messages = messages.concat(createStarbucksMessage('콜드브루'));
      }

      if (userMessage.includes('아메리카노') || userMessage.includes('아메')) {
        messages = messages.concat(createStarbucksMessage('아메리카노'));
      }

      if (userMessage.includes('시즌')) {
        messages = messages.concat(createStarbucksMessage('시즌'));
      }

      if (userMessage.includes('라떼')) {
        messages = messages.concat(createStarbucksMessage('라떼'));
      }

      if (userMessage.includes('에스프레소')) {
        messages = messages.concat(createStarbucksMessage('에스프레소'));
      }

      if (userMessage.includes('마끼야또')) {
        messages = messages.concat(createStarbucksMessage('마끼야또'));
      }
    }

    // console.log(messages); // 디버깅

    const response = await gptAPI.post('/v1/chat/completions', {
      // model: 'ft:gpt-3.5-turbo-0613:personal::8AN17A11',
      model: 'gpt-3.5-turbo-1106',
      messages,
    });

    const repliedMessage = response.data.choices[0].message.content;

    return repliedMessage;
  } catch (error) {
    console.error(error);
  }
};

//   {
//     role: 'system',
//     content:
//       '1,1,1,나이트로 바닐라 크림,starbucks,부드러운 목넘김의 나이트로 커피와 바닐라 크림의 매력을 한번에 느껴보세요!,"6,100",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002487]_20210426091745467.jpg,Tall(톨) / 355ml (12 fl oz),80,2,40,10,232,coffee,ice,k_low,s_low,p_mid,',
//   },

//   {
//     role: 'system',
//     content:
//       '4,1,4,리저브 나이트로,starbucks,나이트로 커피 정통의 캐스케이딩과 부드러운 콜드 크레마!\n부드러운 목 넘김과 완벽한 밸런스에 커피 본연의 단맛을 경험할 수 있습니다.\n,"6,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000002407]_20210225095106743.jpg,Tall(톨) / 355ml (12 fl oz),5,0,0,0,190,coffee,ice,k_low,s_low,p_high,',
//   },

//   {
//     role: 'system',
//     content:
//       '15,1,15,아이스 커피,starbucks,"케냐, 하우스 블렌드 등 약간의 산미가 있는 커피를 드립 방식으로 추출한 후 얼음과 함께 제공하는 커피 입니다.  \n아이스 커피로 적합한 프리미엄 원두를 이용하여 깔끔하고 상큼한 맛을 느끼실 수 있습니다. ","4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[106509]_20210430111852870.jpg,Tall(톨) / 355ml (12 fl oz),5,0,10,0,140,coffee,ice,k_low,s_low,p_mid,',
//   },

//   {
//     role: 'system',
//     content:
//       '27,1,27,아이스 카푸치노,starbucks,풍부하고 진한 에스프레소에 신선한 우유와 우유 거품이 얼음과 함께 들어간 시원하고 부드러운 커피 음료,"5,000",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110601]_20210415143400773.jpg,Tall(톨) / 355ml (12 fl oz),110,3.5,90,9,75,coffee,latte,ice,k_mid,s_low,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '28,1,28,카푸치노,starbucks,풍부하고 진한 에스프레소에 따뜻한 우유와 벨벳 같은 우유 거품이 1:1 비율로 어우러져 마무리된 커피 음료,"5,000",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[38]_20210415154821846.jpg,Tall(톨) / 355ml (12 fl oz),110,3,70,8,75,coffee,latte,high,k_mid,s_low,p_mid',
//   },

//   {
//     role: 'system',
//     content:
//       '38,1,38,아이스 라벤더 카페 브레베,starbucks,진한 리저브 에스프레소 샷과 은은한 라벤더향이 고급스럽게 어우러진 부드럽고 세련된 풍미의 라벤더 카페 브레베,"7,000",https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000004120]_20220412082952150.png,Tall(톨) / 355ml (12 fl oz),335,18,110,27,105,coffee,latte,ice,k_high,s_high,p_high',
//   },

//   {
//     role: 'system',
//     content:
//       '45,1,45,아이스 카페 모카,starbucks,진한 초콜릿 모카 시럽과 풍부한 에스프레소를 신선한 우유 그리고 얼음과 섞어 휘핑크림으로 마무리한 음료로 진한 에스프레소와 초콜릿 맛이 어우러진 커피,"5,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110566]_20210415134334280.jpg,Tall(톨) / 355ml (12 fl oz),250,8,70,21,95,coffee,latte,ice,k_mid,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '46,1,46,아이스 화이트 초콜릿 모카,starbucks,달콤하고 부드러운 화이트 초콜릿 시럽과 에스프레소를 신선한 우유 그리고 얼음과 섞어 휘핑크림으로 마무리한 음료로 달콤함과 강렬한 에스프레소가 부드럽게 어우러진 커피,"5,900",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110572]_20210415155545375.jpg,Tall(톨) / 355ml (12 fl oz),335,8,160,41,75,coffee,latte,ice,k_high,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '47,1,47,카페 모카,starbucks,진한 초콜릿 모카 시럽과 풍부한 에스프레소를 스팀 밀크와 섞어 휘핑크림으로 마무리한 음료로 진한 에스프레소와 초콜릿 맛이 어우러진 커피,"5,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[46]_20210415134438165.jpg,Tall(톨) / 355ml (12 fl oz),290,9,105,25,95,coffee,latte,hot,k_high,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '48,1,48,클래식 민트 모카,starbucks,스타벅스의 클래식인 페퍼민트 모카를 떠올리게 하는 리저브만의 에스프레소 음료.\n오트음료(식물성 대체유)의 고소함과 다크 초콜릿의 쌉쌀함이 특징인 음료.,"8,000",https://image.istarbucks.co.kr/upload/store/skuimg/2022/10/[9200000004313]_20221005145156959.jpg,Grande(그란데) / 473ml (16 fl oz),335,0.7,200,43,210,coffee,latte,hot,k_high,s_high,p_high',
//   },
//   {
//     role: 'system',
//     content:
//       '49,1,49,화이트 초콜릿 모카,starbucks,달콤하고 부드러운 화이트 초콜릿 시럽과 에스프레소를 스팀 밀크와 섞어 휘핑크림으로 마무리한 음료로 달콤함과 강렬한 에스프레소가 부드럽게 어우러진 커피,"6,000",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[128192]_20210415155639126.jpg,Tall(톨) / 355ml (12 fl oz),405,11,230,47,75,coffee,latte,hot,k_high,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '50,1,50,바닐라 플랫 화이트,starbucks,바닐라 플랫 화이트는 진하고 고소한 리스트레토 샷과 바닐라 시럽 그리고 스팀 밀크로 즐기는 진한 커피 라떼 입니다. ,"5,900",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002406]_20210415135507733.jpg,Tall(톨) / 355ml (12 fl oz),220,5,130,23,260,coffee,latte,hot,k_mid,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '51,1,51,바닐라 스타벅스 더블 샷,starbucks,"신선하게 제조된 더블 샷 믹스에 바닐라 시럽을 넣고 에스프레소 샷, 얼음이 어우러져 핸드 쉐이킹한 음료","5,100",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110612]_20210415133425373.jpg,207ml (7 fl oz),125,4.5,30,14,150,coffee,latte,ice,k_mid,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '52,1,52,블론드 바닐라 더블 샷 마키아또,starbucks,블론드 에스프레소 2샷에 흑당 시럽과 바닐라 크림이 부드럽고 달콤하게 어우러진 마키아또 타입의 음료를 즐겨 보세요!,"5,900",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002950]_20210426150654756.jpg,Tall(톨) / 355ml (12 fl oz),315,12,130,31,170,coffee,latte,hot,k_high,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '53,1,53,사케라또 아포가토,starbucks,민트 잎과 쉐이킹한 리저브 에스프레소를\n바닐라 아이스크림에 부어 프레쉬함과\n달콤함이 조화롭게 퍼지는 리저브 만의 디저트 음료\n,"7,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/03/[9200000003505]_20210322093241535.jpg,Tall(톨) / 355ml (12 fl oz),290,10,70,30,210,coffee,ice,k_high,s_high,p_high,',
//   },
//   {
//     role: 'system',
//     content:
//       '54,1,54,스파클링 시트러스 에스프레소,starbucks,리저브 에스프레소에 상큼한 레몬과\n진저에일을 더해 청량감과 시트러스 풍미를\n가득 선사하는 커피 음료,"7,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/03/[9200000003506]_20210322093317854.jpg,Tall(톨) / 355ml (12 fl oz),65,0,5,15,105,coffee,ice,k_low,s_mid,p_high,',
//   },
//   {
//     role: 'system',
//     content:
//       '55,1,55,아이스 블론드 바닐라 더블 샷 마키아또,starbucks,블론드 에스프레소 2샷에 흑당 시럽과 바닐라 크림이 부드럽고 달콤하게 어우러진 마키아또 타입의 음료를 즐겨 보세요!,"5,900",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002953]_20210427132718157.jpg,Tall(톨) / 355ml (12 fl oz),195,6,65,22,170,coffee,latte,ice,k_mid,s_mid,p_high',
//   },
//   {
//     role: 'system',
//     content:
//       '56,1,56,에스프레소,starbucks,"스타벅스 에스프레소는 향기로운 크레마 층과 바디 층, 하트 층으로 이루어져 있으며, 입안 가득히 커피와 달콤한 카라멜 향이 느껴지는 커피 음료","4,000",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[20]_20210415144112678.jpg,Solo(솔로) / 22ml (0.75 fl oz),5,0,0,0,75,coffee,hot,k_low,s_low,p_mid,',
//   },
//   {
//     role: 'system',
//     content:
//       '57,1,57,커피 스타벅스 더블 샷,starbucks,"신선하게 제조된 더블 샷 믹스에 클래식 시럽을 넣고 에스프레소 샷, 얼음이 어우러져 핸드 쉐이킹한 음료","5,100",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110611]_20210415132507539.jpg,207ml (7 fl oz),125,5,28.5,14,150,coffee,ice,k_mid,s_mid,p_mid,',
//   },
//   {
//     role: 'system',
//     content:
//       '58,1,58,클래식 아포가토,starbucks,[리저브R 매장 전용음료] 리저브 에스프레소 투 샷이 바닐라 아이스크림과 진하게 어우러진 정통 아포가토,"7,000",https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001631]_20210225090916684.jpg,Tall(톨) / 355ml (12 fl oz),240,10,70,18,210,coffee,ice,k_mid,s_mid,p_high,',
//   },
//   {
//     role: 'system',
//     content:
//       '59,1,59,헤이즐넛 스타벅스 더블 샷,starbucks,"신선하게 제조된 더블 샷 믹스에 헤이즐넛 시럽을 넣고 에스프레소 샷, 얼음이 어우러져 핸드 쉐이킹한 음료","5,100",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110614]_20210415132333109.jpg,207ml (7 fl oz),125,5,28.5,14,150,coffee,ice,k_mid,s_mid,p_mid,',
//   },
//   {
//     role: 'system',
//     content:
//       '60,1,60,미니 블루베리 요거트 프라푸치노,starbucks,스타벅스와 디즈니의 색다른 만남!\n블루베리와 요거트를 이용하여 \n누구나 맛있게 즐길 수 있는 과일 프라푸치노,"6,900",https://image.istarbucks.co.kr/upload/store/skuimg/2023/09/[9200000004777]_20230920102813483.jpg,Tall(톨) / 355ml (12 fl oz),285,6,210,38,0,non-coffee,smoothie,ice,k_high,s_high,p_high',
//   },
//   {
//     role: 'system',
//     content:
//       '61,1,61,에스프레소 프라푸치노,starbucks,에스프레소 샷의 강렬함과 약간의 단맛이 어우러진 프라푸치노,"5,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[168007]_20210415144337428.jpg,Tall(톨) / 355ml (12 fl oz),145,1.1,115,29,120,coffee,smoothie,ice,k_mid,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '62,1,62,자바 칩 프라푸치노,starbucks,"커피, 모카 소스, 진한 초콜릿 칩이 입안 가득 느껴지는 스타벅스에서만 맛볼 수 있는 프라푸치노","6,300",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[168016]_20210415154152122.jpg,Tall(톨) / 355ml (12 fl oz),340,9,180,42,100,coffee,smoothie,ice,k_high,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '63,1,63,카라멜 프라푸치노,starbucks,카라멜과 커피가 어우러진 프라푸치노,"6,100",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[168010]_20210415154711116.jpg,Tall(톨) / 355ml (12 fl oz),300,7,190,39,85,coffee,smoothie,ice,k_high,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '64,1,64,화이트 초콜릿 모카 프라푸치노,starbucks,"화이트 초콜릿, 커피와 우유가 조화로운 프라푸치노","6,000",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[168013]_20210415155746379.jpg,Tall(톨) / 355ml (12 fl oz),265,6,160,43,85,coffee,smoothie,ice,k_high,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '65,1,65,제주 까망 크림 프라푸치노,starbucks,"[제주지역 한정음료] 제주 까망 라떼의 프라푸치노 버전으로\n쫄깃한 흑임자 떡과 블랙 소보로 토핑으로 컵빙수처럼 먹는 음료. \n고소한 국내산 흑임자와 쫄깃한 흑임자 떡, \n달콤한 블랙 소보로 토핑으로 제주의 돌 하르방 길을 느낄 수 있는 음료","7,500",https://image.istarbucks.co.kr/upload/store/skuimg/2020/09/[9200000002088]_20200921171733532.jpg,Grande(그란데) / 473ml (16 fl oz),600,7,330,79,0,non-coffee,smoothie,ice,k_high,s_high,p_high',
//   },
//   {
//     role: 'system',
//     content:
//       '66,1,66,제주 쑥떡 크림 프라푸치노,starbucks,[제주지역 한정음료] 제주 쑥쑥 라떼의 시원한 버전으로 \n쫄깃쫄깃한 흑임자 떡으로 씹는 재미를 즐길 수 있는 음료. \n고소한 국내산 흑임자와 달콤하고 고소한 쑥떡 토핑이 올라간 음료.,"7,500",https://image.istarbucks.co.kr/upload/store/skuimg/2022/03/[9200000002090]_20220329144732789.jpg,Grande(그란데) / 473ml (16 fl oz),460,10,250,57,0,non-coffee,smoothie,ice,k_high,s_high,p_high',
//   },
//   {
//     role: 'system',
//     content:
//       '67,1,67,제주 유기농 말차로 만든 크림 프라푸치노,starbucks,깊고 진한 말차 본연의 맛과 향을 시원하고 부드럽게 즐길 수 있는 프라푸치노,"6,300",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002502]_20210426100408048.jpg,Tall(톨) / 355ml (12 fl oz),230,7,150,28,60,non-coffee,smoothie,ice,k_mid,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '68,1,68,초콜릿 크림 칩 프라푸치노,starbucks,"모카 소스와 진한 초콜릿 칩, 초콜릿 드리즐이 올라간 달콤한 크림 프라푸치노","6,000",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[168066]_20210415154429750.jpg,Tall(톨) / 355ml (12 fl oz),300,7,160,40,10,non-coffee,smoothie,ice,k_high,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '69,1,69,피스타치오 아보카도 초콜릿 프라푸치노,starbucks,"고소한 피스타치오와 달콤한 초콜릿,\n아보카도 텍스쳐의 완벽한 조화.\n오트를 사용해 더 맛있는\n프라푸치노","6,300",https://image.istarbucks.co.kr/upload/store/skuimg/2023/05/[9200000004713]_20230524144814035.jpg,Tall(톨) / 355ml (12 fl oz),295,1.3,170,36,5,non-coffee,smoothie,ice,k_high,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '70,1,70,화이트 타이거 프라푸치노,starbucks,밀크 쉐이크 같은 부드럽고 달콤한 바닐라 크림 프라푸치노에 깊은 풍미의 단맛을 가진 흑당시럽이 어우러져 용인에버랜드 백호의 줄무늬를 형상화한 부드럽고 달콤한 프라푸치노\n\n* 용인에버랜드R 매장에서만 판매하는 음료입니다,"6,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002403]_20210419131548656.jpg,Grande(그란데) / 473ml (16 fl oz),410,14,220,57,0,non-coffee,smoothie,ice,k_high,s_high,p_high',
//   },
//   {
//     role: 'system',
//     content:
//       '71,1,71,여수 바다 유자 블렌디드,starbucks,맑고 깨끗한 여수 경도의 낮 바다 풍경을 형상화한 음료로\n상큼하게 즐길 수 있는 유자 블렌디드 음료 (유자:국내산),"9,500",https://image.istarbucks.co.kr/upload/store/skuimg/2023/09/[9200000004870]_20230905110300360.jpg,Grande(그란데) / 473ml (16 fl oz),235,0,10,57,0,non-coffee,ade,ice,k_mid,s_high,p_high',
//   },
//   {
//     role: 'system',
//     content:
//       '72,1,72,망고 패션 티 블렌디드,starbucks,망고 패션 프루트 주스와 패션 탱고 티가 \n상큼하게 어우러진 과일 블렌디드 ,"5,400",https://image.istarbucks.co.kr/upload/store/skuimg/2023/02/[9200000004512]_20230207150514347.jpg,Tall(톨) / 355ml (12 fl oz),150,0,105,29,0,non-coffee,ade,ice,k_mid,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '73,1,73,북한산 레몬 얼 그레이 블렌디드,starbucks,꼬냑 향을 가미한 상큼한 레모네이드와 은은한 얼 그레이 티가 어우러진 블렌디드 음료\n,"9,000",https://image.istarbucks.co.kr/upload/store/skuimg/2023/09/[9200000004716]_20230925081519311.jpg,Tall(톨) / 355ml (12 fl oz),110,0,10,24,8,non-coffee,ade,ice,k_mid,s_mid,p_high',
//   },
//   {
//     role: 'system',
//     content:
//       '74,1,74,더 그린 쑥 블렌디드,starbucks,"은은한 쑥과 곡물에 말차샷이 어우러져 고소하고 달콤하게 즐기는 블렌디드\n*더북한산,더양평DTR,더북한강R,경동1960,대구종로고택 매장에서만 판매하는 음료입니다.","7,200",https://image.istarbucks.co.kr/upload/store/skuimg/2023/02/[9200000004527]_20230206091612170.jpg,Grande(그란데) / 473ml (16 fl oz),370,6,610,40,157,non-coffee,smoothie,ice,k_high,s_high,p_high',
//   },
//   {
//     role: 'system',
//     content:
//       '75,1,75,딸기 딜라이트 요거트 블렌디드,starbucks,유산균이 살아있는 리얼 요거트와 풍성한 딸기 과육이 \n더욱 상큼하게 어우러진 과일 요거트 블렌디드,"6,300",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000003276]_20210416154001403.jpg,Tall(톨) / 355ml (12 fl oz),370,4.3,110,57,0,non-coffee,smoothie,ice,k_high,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '76,1,76,망고 바나나 블렌디드,starbucks,(Grande Only) 달콤한 망고 패션 프루트 주스에 \n바나나 1개가 통째로 들어간 신선한 블렌디드,"6,300",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[169001]_20210419130701792.jpg,Grande(그란데) / 473ml (16 fl oz),290,0.9,130,45,0,non-coffee,ade,ice,k_high,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '77,1,77,자몽 허니 레몬 블렌디드 ,starbucks,시원한 여름을 달콤하게 만들어줄 자몽 허니에\n레몬의 산뜻함을 더해 가볍게 칠링하기 좋은 과일 블렌디드,"6,300",https://image.istarbucks.co.kr/upload/store/skuimg/2023/08/[9200000004725]_20230803092233892.jpg,Tall(톨) / 355ml (12 fl oz),172,0,5,41,0,non-coffee,ade,ice,k_mid,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '78,1,78,피치 요거트 블렌디드,starbucks,달콤한 복숭아에 구름같은 요거트가 더해져\n가볍고 상큼하게 즐길 수 있는 과일 블렌디드,"6,100",https://image.istarbucks.co.kr/upload/store/skuimg/2023/05/[9200000004717]_20230524144903032.jpg,Tall(톨) / 355ml (12 fl oz),240,0.8,75,35,0,non-coffee,smoothie,ice,k_mid,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '79,1,79,딸기 아사이 레모네이드 스타벅스 리프레셔,starbucks,"딸기, 아사이베리 주스와 레모네이드가 달콤 상큼하게 조화된 맛에 가볍게 에너지 부스팅을 할 수 있는 리프레셔 음료","7,900",https://image.istarbucks.co.kr/upload/store/skuimg/2023/07/[9200000004753]_20230720103623021.jpg,Tall(톨) / 355ml (12 fl oz),105,0,0,24,30,non-coffee,juice,ice,k_mid,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '80,1,80,망고 용과 레모네이드 스타벅스 리프레셔,starbucks,망고 용과와 레모네이드가 달콤 상큼하게 조화된 맛에\n가볍게 에너지 부스팅을 할 수 있는 음료,"5,900",https://image.istarbucks.co.kr/upload/store/skuimg/2023/07/[9200000004439]_20230710134159744.jpg,Tall(톨) / 355ml (12 fl oz),95,0,35,23,25,non-coffee,juice,ice,k_low,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '81,1,81,퍼플 드링크 위드 망고 용과 스타벅스 리프레셔,starbucks,망고 용과와 코코넛 밀크가 달콤하고 부드럽게 조화된 맛에\n가볍게 에너지 부스팅을 할 수 있는 음료,"5,900",https://image.istarbucks.co.kr/upload/store/skuimg/2023/07/[9200000004442]_20230710134637578.jpg,Tall(톨) / 355ml (12 fl oz),90,0,70,16,25,non-coffee,juice,ice,k_low,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '82,1,82,핑크 드링크 위드 딸기 아사이 스타벅스 리프레셔,starbucks,"딸기, 아사이베리 주스와 코코넛 베이스가 달콤하고 부드럽게 조화된 맛에 가볍게 에너지 부스팅을 할 수 있는 리프레셔 음료","5,900",https://image.istarbucks.co.kr/upload/store/skuimg/2022/08/[9200000003766]_20220803130957907.jpg,Tall(톨) / 355ml (12 fl oz),100,0,40,18,30,non-coffee,juice,ice,k_low,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '83,1,83,여수 바다 자몽 피지오,starbucks,여수 돌산대교의 밤바다 풍경을 형상화한 음료로\n알록달록 색상 조명의 토핑과 함께\n여수의 풍경을 바라보며 즐길 수 있는 트로피컬 맛의 음료\n,"9,500",https://image.istarbucks.co.kr/upload/store/skuimg/2023/09/[9200000004751]_20230907153225204.jpg,Grande(그란데) / 473ml (16 fl oz),250,0,105,45,0,non-coffee,ade,ice,k_mid,s_mid,p_high',
//   },
//   {
//     role: 'system',
//     content:
//       '84,1,84,유자 패션 피지오,starbucks,상콤달콤 고흥 유자와 스타벅스 시그니처 패션 탱고 티에\n한 잔 한 잔 탄산을 넣어 제조하는 피지오 음료.\n시트러스한 청량감을 가득 즐기세요!,"5,900",https://image.istarbucks.co.kr/upload/store/skuimg/2022/05/[9200000004121]_20220517102911610.jpg,Tall(톨) / 355ml (12 fl oz),145,0,5,36,0,non-coffee,ade,ice,k_mid,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '85,1,85,쿨 라임 피지오,starbucks,그린 빈 추출액이 들어간 라임 베이스에 건조된 라임 슬라이스를 넣고 스파클링한 시원하고 청량감 있는 음료입니다. (카페인이 함유된 탄산음료입니다),"5,900",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[107051]_20210419112151972.jpg,Tall(톨) / 355ml (12 fl oz),105,0,20,25,110,non-coffee,ade,ice,k_mid,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '86,1,86,피치 딸기 피지오,starbucks,상큼한 과일과 청량한 탄산의 조화.\n피치 특유의 감각적인 색상과 무드를\n탄산과 함께 즐길 수 있는 피지오,"5,700",https://image.istarbucks.co.kr/upload/store/skuimg/2023/05/[9200000004567]_20230524144959475.jpg,Tall(톨) / 355ml (12 fl oz),145,0,20,26,37,non-coffee,ade,ice,k_mid,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '87,1,87,민트 블렌드 티,starbucks,"스피어민트, 페퍼민트, 레몬머틀이 블렌딩된 상쾌한 허브 티","4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000056]_20210415135215632.jpg,Tall(톨) / 355ml (12 fl oz),0,0,0,0,0,non-coffee,tea,hot,k_low,s_low,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '88,1,88,아이스 민트 블렌드 티,starbucks,"스피어민트, 페퍼민트, 레몬머틀이 블렌딩된 상쾌한 허브 티","4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000059]_20210415141656038.jpg,Tall(톨) / 355ml (12 fl oz),0,0,0,0,0,non-coffee,tea,ice,k_low,s_low,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '89,1,89,아이스 얼 그레이 티,starbucks,꽃향 가득한 라벤더와 베르가못 향이 진한 홍차와 블렌딩된 향긋한 블랙 티,"4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000039]_20210415142055860.jpg,Tall(톨) / 355ml (12 fl oz),0,0,0,0,50,non-coffee,tea,ice,k_low,s_low,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '90,1,90,아이스 유스베리 티,starbucks,"제주산 찻잎으로 만든 황차에 사과, 망고, 파인애플, 히비스커스, 로즈힙 등이\n블렌딩되어 핑크빛 컬러가 감도는 수색과 베리류의 새콤함을 느낄 수 있는 옐로우 티","4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000229]_20210415142219481.jpg,Tall(톨) / 355ml (12 fl oz),0,0,0,0,20,non-coffee,tea,ice,k_low,s_low,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '91,1,91,아이스 유자 민트 티,starbucks,달콤한 국내산 고흥 유자와 알싸하고 은은한 진저와 상쾌한 민트 티가 조화로운 유자 민트 티,"4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000002959]_20220411155904911.jpg,Tall(톨) / 355ml (12 fl oz),145,0,5,37,0,non-coffee,tea,ice,k_mid,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '92,1,92,아이스 잉글리쉬 브렉퍼스트 티,starbucks,"인도 아삼, 제주도 유기농 홍차가 블렌딩되어 진한 벌꿀향과 그윽한 몰트향이 특징인 블랙 티","4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000019]_20210415142323353.jpg,Tall(톨) / 355ml (12 fl oz),0,0,0,0,40,non-coffee,tea,ice,k_low,s_low,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '93,1,93,아이스 제주 유기 녹차,starbucks,"우수한 품질의 제주도 유기농 녹차로 만든 맑은 수색과 신선한 향, 맛이 뛰어난 녹차\n","5,300",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[400400000094]_20210415230316469.jpg,Tall(톨) / 355ml (12 fl oz),0,0,0,0,16,non-coffee,tea,ice,k_low,s_low,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '94,1,94,아이스 캐모마일 블렌드 티,starbucks,"캐모마일과 레몬 그라스, 레몬밤, 히비스커스 등 블렌딩되어\n은은하고 차분한 향이 기분을 좋게하는 허브 티","4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000079]_20210415143641139.jpg,Tall(톨) / 355ml (12 fl oz),0,0,0,0,0,non-coffee,tea,ice,k_low,s_low,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '95,1,95,아이스 히비스커스 블렌드 티,starbucks,"히비스커스, 사과, 파파야, 망고, 레몬그라스 등이 블렌딩된 상큼한 허브 티","4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000069]_20210415143811231.jpg,Tall(톨) / 355ml (12 fl oz),0,0,0,0,0,non-coffee,tea,ice,k_low,s_low,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '96,1,96,얼 그레이 티,starbucks,꽃향 가득한 라벤더와 베르가못 향이 진한 홍차와 블렌딩된 향긋한 블랙 티,"4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000036]_20210415143933425.jpg,Tall(톨) / 355ml (12 fl oz),0,0,0,0,70,non-coffee,tea,hot,k_low,s_low,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '97,1,97,유스베리 티,starbucks,"제주산 찻잎으로 만든 황차에 사과, 망고, 파인애플, 히비스커스, 로즈힙 등이\n블렌딩되어 핑크빛 컬러가 감도는 수색과 베리류의 새콤함을 느낄 수 있는 옐로우 티","4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000226]_20210415144434521.jpg,Tall(톨) / 355ml (12 fl oz),0,0,0,0,20,non-coffee,tea,hot,k_low,s_low,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '98,1,98,유자 민트 티,starbucks,"달콤한 국내산 고흥 유자와 알싸하고 은은한 진저, \n우릴 수록 상쾌한 민트 티가 조화로운 유자 민트 티","5,900",https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000002956]_20220411155551915.jpg,Tall(톨) / 355ml (12 fl oz),235,0,10,58,0,non-coffee,tea,hot,k_mid,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '99,1,99,잉글리쉬 브렉퍼스트 티,starbucks,"인도 아삼, 제주도 유기농 홍차가 블렌딩되어 진한 벌꿀향과 그윽한 몰트향이 특징인 블랙 티","4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000016]_20210415153648533.jpg,Tall(톨) / 355ml (12 fl oz),0,0,0,0,70,non-coffee,tea,hot,k_low,s_low,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '100,1,100,자몽 허니 블랙 티,starbucks,새콤한 자몽과 달콤한 꿀이 깊고 그윽한 풍미의 스타벅스 티바나 블랙 티의 조화,"5,700",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000187]_20210419131229539.jpg,Tall(톨) / 355ml (12 fl oz),125,0,5,30,70,non-coffee,tea,hot,k_mid,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '101,1,101,제주 유기 녹차,starbucks,"우수한 품질의 제주도 유기농 녹차로 만든 맑은 수색과 신선한 향, 맛이 뛰어난 녹차","5,300",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[400400000091]_20210415132229904.jpg,Tall(톨) / 355ml (12 fl oz),0,0,0,0,16,non-coffee,tea,hot,k_low,s_low,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '102,1,102,캐모마일 블렌드 티,starbucks,"캐모마일과 레몬 그라스, 레몬밤, 히비스커스 등 블렌딩되어\n은은하고 차분한 향이 기분을 좋게하는 허브 티","4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000076]_20210415154920731.jpg,Tall(톨) / 355ml (12 fl oz),0,0,0,0,0,non-coffee,tea,hot,k_low,s_low,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '103,1,103,히비스커스 블렌드 티,starbucks,"히비스커스, 사과, 파파야, 망고, 레몬그라스 등이 블렌딩된 상큼한 허브 티","4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000066]_20210415155836395.jpg,Tall(톨) / 355ml (12 fl oz),0,0,0,0,0,non-coffee,tea,hot,k_low,s_low,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '104,1,104,레드 파워 패션 티,starbucks,딸기와 복숭아의 화사함에 패션 탱고티의 산뜻함을 더해 \n한 모금 마시면 두근거리는 열정이 다시 떠오르는 리프레싱 티 음료\n,"5,900",https://image.istarbucks.co.kr/upload/store/skuimg/2023/04/[9200000004566]_20230407153247174.jpg,Grande(그란데) / 473ml (16 fl oz),190,0,40,31,33,non-coffee,tea,ice,k_mid,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '105,1,105,아이스 자몽 허니 블랙 티,starbucks,새콤한 자몽과 달콤한 꿀이 깊고 그윽한 풍미의 스타벅스 티바나 블랙 티의 조화,"7,700",https://image.istarbucks.co.kr/upload/store/skuimg/2023/07/[9200000004769]_20230720103743478.jpg,Tall(톨) / 355ml (12 fl oz),125,0,5,30,30,non-coffee,tea,ice,k_mid,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '106,1,106,돌체 블랙 밀크 티,starbucks,진한 홍차에 부드러운 우유와 연유 시럽으로 향긋하고 \n달콤하게 맛을 낸 스타벅스만의 돌체 블랙 밀크 티,"5,900",https://image.istarbucks.co.kr/upload/store/skuimg/2022/02/[9200000002963]_20220203082330522.jpg,Tall(톨) / 355ml (12 fl oz),250,5,115,34,60,non-coffee,latte,hot,k_mid,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '107,1,107,말차 티 슈페너,starbucks,아인슈페너를 말차로 즐기는 음료\n진하고 쌉싸름한 말차와 글레이즈드의 달콤함이 만나 부드럽게 즐기기 좋은 티 음료\n,"6,500",https://image.istarbucks.co.kr/upload/store/skuimg/2022/09/[9200000004303]_20220902104721404.jpg,Tall(톨) / 355ml (12 fl oz),400,15,220,38,60,non-coffee,latte,hot,k_high,s_high,p_high',
//   },
//   {
//     role: 'system',
//     content:
//       '108,1,108,아이스 돌체 블랙 밀크 티,starbucks,진한 홍차에 부드러운 우유와 연유 시럽으로 향긋하고 \n달콤하게 맛을 낸 스타벅스만의 돌체 블랙 밀크 티,"5,900",https://image.istarbucks.co.kr/upload/store/skuimg/2022/02/[9200000002966]_20220203082502987.jpg,Tall(톨) / 355ml (12 fl oz),210,3.7,85,31,35,non-coffee,latte,ice,k_mid,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '109,1,109,아이스 말차 티 슈페너,starbucks,아인슈페너를 말차로 즐기는 음료\n진하고 쌉싸름한 말차와 글레이즈드의 달콤함이 만나 부드럽게 즐기기 좋은 티 음료\n\n* 티바나 바 / 리저브R 매장에서만 판매됩니다,"6,500",https://image.istarbucks.co.kr/upload/store/skuimg/2022/09/[9200000004304]_20220902104522874.jpg,Tall(톨) / 355ml (12 fl oz),320,12,160,31,60,non-coffee,latte,ice,k_high,s_high,p_high',
//   },
//   {
//     role: 'system',
//     content:
//       '110,1,110,아이스 얼 그레이 바닐라 티 라떼,starbucks,"2가지 티(블랙티, 얼 그레이 티)가 조화롭게 어우러지고\n얼 그레이 폼과 바닐라의 풍미가 은은하게 퍼져 \n깔끔하고 부드러운 티 라떼 음료","6,100",https://image.istarbucks.co.kr/upload/store/skuimg/2023/01/[9200000004288]_20230118085139616.jpg,Tall(톨) / 355ml (12 fl oz),325,10,115,33,29,non-coffee,latte,ice,k_high,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '111,1,111,아이스 제주 유기농 말차로 만든 라떼,starbucks,차광재배한 어린 녹찻잎을 곱게 갈아 깊고 진한 말차 본연의 맛과 향을\n부드럽게 즐길 수 있는 제주 유기농 말차로 만든 라떼,"6,100",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002499]_20210419130902541.jpg,Tall(톨) / 355ml (12 fl oz),155,3.6,95,16,60,non-coffee,latte,ice,k_mid,s_mid,p_mid',
//   },

//   {
//     role: 'system',
//     content:
//       '115,1,115,차이 티 라떼,starbucks,"스파이시한 향과 독특한 계피향, 달콤한 차이로 만든 부드러운 티 라떼","5,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[135608]_20210415154244810.jpg,Tall(톨) / 355ml (12 fl oz),200,3,70,31,70,non-coffee,latte,hot,k_mid,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '116,1,116,시그니처 핫 초콜릿,starbucks,깊고 진한 초콜릿과 부드러운 휘핑크림이 입안에서 사르르 녹는 초콜릿 음료,"5,700",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[72]_20210415140949967.jpg,Tall(톨) / 355ml (12 fl oz),500,9,105,52,15,non-coffee,latte,hot,k_high,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '117,1,117,아이스 시그니처 초콜릿,starbucks,깊고 진한 초콜릿과 부드러운 휘핑크림이 입안에서 사르르 녹는 초콜릿 음료,"5,700",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110621]_20210415140901611.jpg,Tall(톨) / 355ml (12 fl oz),325,7,70,32,15,non-coffee,latte,ice,k_high,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '118,1,118,플러피 판다 아이스 초콜릿,starbucks,"고소한 헤이즐넛과 진한 초콜릿의 만남,\n귀여운 판다까지 더해진 플러피 판다 아이스 초콜릿! \n\n* 용인에버랜드R 매장에서만 판매하는 음료입니다","6,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000003658]_20210422080248176.jpg,Grande(그란데) / 473ml (16 fl oz),415,16,150,39,0,non-coffee,latte,ice,k_high,s_high,p_high',
//   },
//   {
//     role: 'system',
//     content:
//       '119,1,119,플러피 판다 핫 초콜릿,starbucks,"고소한 헤이즐넛과 진한 핫초콜릿의 만남,\n귀여운 판다까지 더해진 플러피 판다 핫 초콜릿! \n\n* 용인에버랜드 매장에서만 판매하는 음료입니다","6,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002594]_20210422080327783.jpg,Grande(그란데) / 473ml (16 fl oz),470,17,160,48,0,non-coffee,latte,hot,k_high,s_high,p_high',
//   },
//   {
//     role: 'system',
//     content:
//       '120,1,120,스타벅스 슬래머,starbucks,"스트로베리와 아사이베리의 상큼, 달콤한 맛이 톡톡!\n시원하고 통쾌한 그랜드 슬램을 위한 에너지 부스팅 음료~!\n\n* SSG랜더스필드 매장에서만 판매하는 음료입니다.","6,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000003659]_20210428134252131.jpg,Grande(그란데) / 473ml (16 fl oz),235,0,0,55,0,non-coffee,ade,ice,k_mid,s_high,p_high',
//   },
//   {
//     role: 'system',
//     content:
//       '121,1,121,스팀 우유,starbucks,부드럽고 담백한 따뜻한 우유.,"4,100",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[17]_20210426095334934.jpg,Tall(톨) / 355ml (12 fl oz),215,7,173,18,0,non-coffee,latte,hot,k_mid,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '122,1,122,아이스 제주 까망 라떼,starbucks,[제주지역 한정음료] 제주도의 돌담길과 하르방의 풍경을\n느낄 수 있는 음료로 고소한 흑임자와 달콤한 소보로 토핑으로 \n시원하게 누구나 즐길 수 있는 음료,"7,200",https://image.istarbucks.co.kr/upload/store/skuimg/2020/09/[9200000001302]_20200921171804529.jpg,Grande(그란데) / 473ml (16 fl oz),440,11,210,45,0,non-coffee,latte,ice,k_high,s_high,p_high',
//   },
//   {
//     role: 'system',
//     content:
//       '123,1,123,우유,starbucks,부드럽고 담백한 신선한 우유.,"4,100",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[18]_20210426095514018.jpg,Tall(톨) / 355ml (12 fl oz),240,8,200,18,0,non-coffee,latte,ice,k_mid,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '124,1,124,제주 까망 라떼,starbucks,[제주지역 한정음료] 제주도의 돌담길과 하르방의 풍경을\n느낄 수 있는 음료로 고소한 흑임자와 달콤한 소보로 토핑으로 \n누구나 즐길 수 있는 음료,"7,200",https://image.istarbucks.co.kr/upload/store/skuimg/2020/09/[9200000001301]_20200921171639781.jpg,Grande(그란데) / 473ml (16 fl oz),445,7,250,49,0,non-coffee,latte,hot,k_high,s_high,p_high',
//   },
//   {
//     role: 'system',
//     content:
//       '125,1,125,필 더 그린 190ML,starbucks,"과일 및 채소를 착즙하여 만든 주스!\n케일, 셀러리, 오이가 들어가 Green 색상의 과일&채소를 건강하게 즐길 수 있는 음료","4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2022/09/[9300000004348]_20220921102420365.jpg,190 ml,90,0.2,15,15,0,non-coffee,juice,ice,k_low,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '126,1,126,필 더 레드 190ML,starbucks,"과일 및 채소를 착즙하여 만든 주스!\n사과, 비트, 당근이 들어가 Red 색상의 과일&채소를 달콤하게 즐길 수 있는 음료","4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2022/09/[9300000004346]_20220921130442019.jpg,190 ml,90,0.1,45,16,0,non-coffee,juice,ice,k_low,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '127,1,127,필 더 옐로우 190ML,starbucks,"과일 및 채소를 착즙하여 만든 주스!\n레몬, 생강이 들어가 Yellow 색상의 과일&채소를 상큼하게 즐길 수 있는 음료","4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2022/09/[9300000004347]_20220921130952276.jpg,190 ml,100,0.1,0,16,0,non-coffee,juice,ice,k_low,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '128,1,128,딸기주스 190ML,starbucks,달콤한 국내산 딸기의 과육이 듬뿍 느껴지는 주스,"3,800",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[5210008070]_20210426095034991.jpg,190 ml,110,0,30,25,0,non-coffee,juice,ice,k_low,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '129,1,129,망고주스 190ML,starbucks,노랗게 익은 열대과일 망고가 입안 가득 느껴지는 주스,"4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[5210008061]_20210426095229362.jpg,190 ml,117,0,15,23,0,non-coffee,juice,ice,k_low,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '130,1,130,스타 루비 자몽 스위트 190ML,starbucks,리프레시가 필요할 땐!  \n상큼 달콤한 자몽으로 채우기\n과즙이 풍부한 스타 루비 자몽이 가득 들어간 상큼한 음료,"4,100",https://image.istarbucks.co.kr/upload/store/skuimg/2021/10/[9300000003773]_20211020094026246.jpg,190 ml,129,0,5,32,0,non-coffee,juice,ice,k_low,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '131,1,131,유기농 오렌지 100% 주스 190ML,starbucks,"프리미엄 유기농 오렌지 주스로\n스페인산 오렌지 착즙! \n오렌지 그대로 100% 담긴 3개 분량\n물, 설탕, 첨가물 없는 오렌지 그대로의 맛\n","4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/10/[9300000003771]_20211020093812909.jpg,190 ml,95,0,5,20,0,non-coffee,juice,ice,k_low,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '132,1,132,유기농 오렌지 100% 주스 591ML,starbucks,"프리미엄 유기농 오렌지 주스로\n스페인산 오렌지 착즙! \n오렌지 그대로 100% 담긴 8개 분량\n물, 설탕, 첨가물 없는 오렌지 그대로의 맛","8,900",https://image.istarbucks.co.kr/upload/store/skuimg/2021/10/[9300000003772]_20211020095105008.jpg,591 ml,290,0.6,10,62,0,non-coffee,juice,ice,k_high,s_high,p_high',
//   },
//   {
//     role: 'system',
//     content:
//       '133,1,133,케일&사과주스 190ML,starbucks,국내산 케일과 사과의 달콤함이 조화로운 녹색 주스,"4,000",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[5210008072]_20210426100712780.jpg,190 ml,105,0,25,26,0,non-coffee,juice,ice,k_low,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '134,1,134,핑크 용과 레모네이드 190ML,starbucks,"레드 용과의 상큼함에 \n구아바와 망고스틴의 달콤함이 추가되어 \n맛도, 컬러도 화사함이 느껴지는 음료","4,300",https://image.istarbucks.co.kr/upload/store/skuimg/2021/10/[9300000003776]_20211020094321785.jpg,190 ml,88,0,5,19,0,non-coffee,ade,ice,k_low,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '135,1,135,한라봉주스 190ML,starbucks,새콤달콤한 황금빛 제주 한라봉을 그대로 담아낸 주스,"4,300",https://image.istarbucks.co.kr/upload/store/skuimg/2023/03/[5210008055]_20230331142558998.jpg,190 ml,88,0,10,20,0,non-coffee,juice,ice,k_low,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '136,1,136,햇사과 주스 190ML,starbucks,달콤새콤한 햇사과 1개 반을 껍질 그대로 착즙한 사과 주스,"4,000",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9300000002565]_20210426102753285.jpg,190 ml,113,0,10,27,0,non-coffee,juice,ice,k_low,s_high,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '137,1,137,햇사과 주스 591ML,starbucks,햇 사과 네개 반을 껍질 그대로  착즙한 신선한 맛의 사과 주스\n대용량으로 즐겨보세요.\n,"8,900",https://image.istarbucks.co.kr/upload/store/skuimg/2022/10/[9300000004407]_20221027102828231.jpg,591 ml,360,0,20,84,0,non-coffee,juice,ice,k_high,s_high,p_high',
//   },
//   {
//     role: 'system',
//     content:
//       '138,1,138,딸기 가득 요거트 190ML,starbucks,상큼 달콤 딸기 과육이 한가득 씹히는 마시는 요거트 음료,"4,100",https://image.istarbucks.co.kr/upload/store/skuimg/2021/10/[9300000003775]_20211020094208342.jpg,190 ml,155,3.2,50,21,0,non-coffee,smoothie,ice,k_mid,s_mid,p_mid',
//   },
//   {
//     role: 'system',
//     content:
//       '139,1,139,블루베리 요거트 190ML,starbucks,블루베리 과육이 입안 가득 느껴지는 마시는 요거트,"3,900",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[5210008063]_20210419104847612.jpg,190 ml,155,3.6,70,18,0,non-coffee,smoothie,ice,k_mid,s_mid,p_mid',
//   },
// );
// }

//     const response = await gptAPI.post('/v1/chat/completions', {
//       // model: 'ft:gpt-3.5-turbo-0613:personal::8AN17A11',
//       model: 'gpt-3.5-turbo-1106',
//       messages,
//     });

//     const repliedMessage = response.data.choices[0].message.content;

//     return repliedMessage;
//   } catch (error) {
//     console.error(error);
//   }
// };
