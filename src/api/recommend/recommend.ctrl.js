// import fs from 'fs/promises';
// import path from 'path';

// export const getRecommendation = async (ctx) => {
//     try {
//         // JSON 파일 경로
//         const filePath = path.join(__dirname, 'recommend.json');

//         // JSON 파일을 읽어옵니다.
//         const data = await fs.readFile(filePath, 'utf-8');

//         // 각 줄을 개별적으로 파싱하여 배열에 추가합니다.
//         const recommendations = data
//             .split('\n')
//             .map((line) => {
//                 try {
//                     return line ? JSON.parse(line) : null;
//                 } catch (error) {
//                     console.error('Error parsing JSON line:', error);
//                     return null;
//                 }
//             })
//             .filter((item) => item !== null);

//         // 처리된 추천을 응답으로 전송합니다.
//         ctx.body = recommendations;
//     } catch (error) {
//         console.error('Error handling recommendation:', error);
//         ctx.status = 500;
//         ctx.body = { error: 'Internal Server Error' };
//     }
// };


import fs from 'fs/promises';
import path from 'path';

export const getRecommendation = async (ctx) => {
    try {
        // JSON 파일 경로
        const filePath = path.join(__dirname, 'recommend.json');

        // JSON 파일을 읽어옵니다.
        const data = await fs.readFile(filePath, 'utf-8');

        // 읽어온 JSON 데이터를 그대로 응답으로 전송합니다.
        ctx.body = data;
    } catch (error) {
        console.error('Error handling recommendation:', error);
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
    }
};
