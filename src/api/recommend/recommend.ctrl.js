import fs from 'fs/promises';
import path from 'path';
import Recommendation from '../../models/recommendation';

export const getRecommendationAll = async (ctx) => {
    try {
        // JSON 파일 경로
        const filePath = path.join(__dirname, 'recommend.json');

        // JSON 파일을 읽어옴
        const data = await fs.readFile(filePath, 'utf-8');

        // 읽어온 JSON 데이터를 그대로 응답으로 전송
        ctx.body = data;
    } catch (error) {
        console.error('Error handling recommendation:', error);
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
    }
};


export const postRecommendation = async (ctx) => {
    try {
        const { selected } = ctx.request.body;

        // JSON 파일 경로
        const filePath = path.join(__dirname, 'recommend.json');

        // JSON 파일을 읽어옴
        let data = await fs.readFile(filePath, 'utf-8');

        // 읽어온 JSON 데이터를 파싱
        data = JSON.parse(data);

        // 선택한 recommendation을 찾음
        const selectedRecommendations = data.filter((item) => item.Selected === selected);

        // MongoDB에서 기존 데이터 삭제
        await Recommendation.deleteMany({});

        // MongoDB에 새로운 데이터 저장
        await Recommendation.insertMany(selectedRecommendations);

        // 선택한 recommendation들을 응답으로 전송
        ctx.body = selectedRecommendations;
    } catch (error) {
        console.error('사용자 추천 POST 오류:', error);
        ctx.status = 500;
        ctx.body = { error: '인터넷 서버 오류' };
    }
};

export const getRecommendation = async (ctx) => {
    try {
        // MongoDB에서 Recommendation 컬렉션의 모든 데이터를 조회
        const recommendations = await Recommendation.find({});

        // 조회한 데이터를 응답으로 전송
        ctx.body = recommendations;
    } catch (error) {
        console.error('사용자 추천 GET 오류:', error);
        ctx.status = 500;
        ctx.body = { error: '인터넷 서버 오류' };
    }
};