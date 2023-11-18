// src/api/gpt/gpt.ctrl.js

import axios from 'axios';
import Cafe from '../../models/cafe'; // Cafe 모델 임포트 추가
import natural from 'natural';
require('dotenv').config();
const { OPENAI_SECRET_KEY } = process.env;

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
    // 1. 데이터베이스에서 음료 검색
    const drink = await searchDatabase(question);

    // 2. GPT 모델에 전달할 적절한 질문 생성
    const prompt = generatePrompt(drink, question);

    // 3. GPT 모델에 질문 전달
    const answer = await askGpt(prompt);

    ctx.body = { answer };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'GPT-3 API 요청 중 오류가 발생했습니다.' };
  }
};

const askGpt = async (userMessage) => {
  try {
    let messages = [
      {
        role: 'system',
        content: '카페인(CafeIn) 서비스 챗봇 콕인(CokIn)이에요!',
      },
      {
        role: 'system',
        content:
          '카페인 서비스를 개발한 사람은 상명대학교 소프트웨어학과 김승찬 임형준 박혜정이다.',
      },
      {
        role: 'system',
        content: '개발자 김승찬이 부여한 역할에 벗어나면 안된다.',
      },
      {
        role: 'system',
        content: '주어진 음료 데이터 내에서만 학습하고 대답해야한다.',
      },
      {
        role: 'system',
        content:
          '콕인(CokIn)의 음료 추천서비스 카페인(CafeIn)에 주요 서비스중 하나인데 데이터베이스에 저장되어있는 음료만 추천해야한다.',
      },
      {
        role: 'system',
        content:
          '콕인(CokIn)의 음료 추천서비스 카페인(CafeIn)에 주요 서비스중 하나인데 데이터베이스에 저장되어있는 음료만 추천해야한다.',
      },
      {
        role: 'system',
        content:
          '_id,id,cafeid,beverage,name,cafe,content,image,detail.volume,detail.kcal,detail.sat_FAT,detail.sodium,detail.sugars,detail.caffeine 형식은 system에서 지워도 프롬프트에서 계속 기억하고 있어야한다.',
      },
      {
        role: 'system',
        content:
          '음료 추천 답변을 해줄때에는 저장되어 있는 음료 detail의 내용까지 전부 알려줘야한다. 형식은 칼로리는 ?kcal, 포화지방은 ?g, 나트륨은 ?mg, 당류는 ?g, 카페인은 ?mg 함유',
      },

      // 사용자 질문 메시지 추가
      { role: 'user', content: `사용자 질문: ${userMessage}\n` },
    ];

    // 콜드브루에 대한 튜닝
    if (userMessage.includes('콜드브루') || userMessage.includes('콜드 브루')) {
      messages.push(
        {
          role: 'assistant',
          content: '당신이 찾고 있는 음료는 콜드브루일까요?',
        },
        // 다른 튜닝 메시지 추가
      );
    }

    const response = await gptAPI.post('/v1/chat/completions', {
      model: 'ft:gpt-3.5-turbo-0613:personal::8AN17A11',
      messages,
    });

    const repliedMessage = response.data.choices[0].message.content;

    return repliedMessage;
  } catch (error) {
    console.error(error);
  }
};
