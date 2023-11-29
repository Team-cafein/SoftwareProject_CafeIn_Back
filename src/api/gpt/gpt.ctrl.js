// src/api/gpt/gpt.ctrl.js
import axios from 'axios';
require('dotenv').config();
const { OPENAI_SECRET_KEY, MONGO_URI } = process.env;
import Cafe from '../../models/cafe';
import { MongoClient } from 'mongodb';

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
          '콕인(CokIn)의 음료 추천서비스 카페인(CafeIn)에 주요 서비스중 하나인 챗봇으로 데이터베이스에 저장되어있는 음료 추천 뿐만 아니라 추가적으로 인터넷에서 학습해서 알고있는 카페인 서비스에 없는 카페 데이터도 대답해야한다.',
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
        content:
          'tag[0]은 coffee,non-coffee 커피인지 논커피인지, tag[1]은 americano,latte,ade,juice,tea 아메리카노, 라떼, 에이드, 주스, 티 인지 종류를, tag[2]은 k_low,k_mid,k_high 칼로리가 낮음 중간 높음, tag[3]은 ice,hot 아이스 또는 핫, tag[4]은 s_low, s_mid, s_high 당도가 낮음, 중간, 높음을, tag[5]은 p_low,p_mid,p_high 가격 싸다 중간 비싸다를 나타내며 사용자한테 말할 때에는 키워드를 한국말로 치환해서 알려주어야한다.',
      },
      // {
      //   role: 'system',
      //   content: `데이터 형식을 받으면 메뉴를 추천할 때의 콕인(CokIn)의 대답 형식은 사용자가 원하는 메뉴를 이름과 tag 등으로 판단하고 추천해주는 답변일 시 마지막에는 무조건 http://localhost:3000/category/{cafe}/{cafeid}/{beverage} 형식으로 대답해 주어야 한다. {}는 보간법으로 {}안에는 실제로는 {cafe}는 카페이름[starbucks, ediya, hollys, paik, mega]의 이름 중에만 {cafeid}는 [1, 2, 3, 4, 5,] 중 에만 {beverage}는 실제 저장된 음료 번호(정수)가 매칭되서 들어가야한다 `,
      // },
      // {
      //   role: 'system',
      //   content:
      //     '마지막 반환해주는 url의 /{cafe}/{cafeid}/{beverage} 순서는 절대적으로 지켜져야한다. 가끔 반대로 /{beverage}/{cafeid} 순서로 나올 때가 있는데 이러면 안된다. cafeid는 1부터 5까지 밖에 없기 때문에 만약 5을 넘는다면 틀린 것이므로 {cafeid}/{beverage}경우로 반환해주어야 한다.',
      // },
      // {
      //   role: 'system',
      //   content:
      //     '추천답변은 무조건 이 형식을 따라야 한다. 콕인(CokIn)이 {cafe}에서 음료를 추천해드려요! "{name}" {conent을 요약한 내용}. {tag에 대한 내용} 아래 링크에서 더 자세한 정보를 확인해보세요. \n\n <a href="{http://localhost:3000/category/{cafe}/{cafeid}/{beverage}}" target="_blank">[{name} 바로가기]</a> 앞에 <a> 태그 형식으로만 글자 하나 안틀리고 반환해야한다. \n 음료 이미지 <p><img className="img" src={image} alt="Image" /></p> {image}는 url 즉, 이미지 url를 반환하고, {}은 보간법을 나타내 주는 것으로 실제로 콕인이 밑에 데이터 중 최적의 답을 골라서 대입해서 표현하면 된다. url과 image url 은 인식될 때 구분 될 수 있어야한다.',
      // },
      // {
      //   role: 'system',
      //   content:
      //     '[{name} 바로가기]을 보여줬다면 \n을 한 이후 항상 가장 마지막에 "메뉴 이미지" {image} 형식으로 이미지 링크 url를 보여주어야한다. 만약 여려개의 음료를 추천했으면 그 중의 하나의 이미지만 표현해야한다.',
      // },
      // {
      //   role: 'assistant',
      //   content:
      //     '"많은 음료 중에서 하나를 골라드릴까요?" 혹은 "저는 여러분이 좋아하실 만한 음료를 회원님께 추천해드릴게요."라는 말과 같이 역으로 질문을 요구하는 것이 아니라 하는 것이 아니라 무조건 하나의 메뉴를 추천하는 답변을 해야한다.',
      // },

      // 사용자 질문 메시지 추가
      // { role: 'user', content: `사용자 질문: ${userMessage}\n` },
    ];

    // let cafeName = '';
    // let beverageName = '';

    // // 사용자 메시지에서 카페 이름 추출
    // cafeName = extractCafeName(userMessage);
    // console.log(cafeName)
    // console.log(userMessage)

    // beverageName = extractCafeAndBeverageName(userMessage)
    // console.log(beverageName)

    let cafeName = extractCafeName(userMessage);
    let beverageName = extractCafeAndBeverageName(userMessage);
    let tag = extractCafeTag(userMessage);


    if (cafeName == '' && beverageName && tag) {
      cafeName = 'all'
    } else if (cafeName == '' && !beverageName && tag) {
      cafeName = 'all'
    } else if (cafeName == '' && beverageName && !tag) {
      cafeName = 'all'
    }

    // userMessage = String(userMessage).replace(cafeName, '');
    // console.log(userMessage);



    // MongoDB에 연결
    const client = new MongoClient(MONGO_URI);
    await client.connect();

    // MongoDB에서 카페 특정 데이터 검색
    // const cafeData = await getCafeData(cafeName);

    // MongoDB에서 카페 이름으로 특정 데이터 검색
    // const cafeData = await getCafeDataByName(cafeName, beverageName);

    const formatData = (data) => {
      if (data.length === 0) {
        return [{ role: 'system', content: '데이터가 없습니다.' }];
      }


      if (data.length > 10) {
        data = getRandomDataMessages(data);
      }

      const templateStringArray = data.map(item => (
        `id: ${item.id}, cafeid: ${item.cafeid}, beverage: ${item.beverage}, name: '${item.name}', cafe: '${item.cafe}', content: '${item.content}', price: '${item.price}', image: '${item.image}', detail: ${JSON.stringify(item.detail)}, tag: ${JSON.stringify(item.tag)}`
      ));

      // const startCount = [{ role: 'system', content: "지금부터 들어가는 데이터 카운트를 세어줘" }];

      let dataMessages = templateStringArray.map((formattedData, index) => ({
        role: 'system',
        content: formattedData,
      }));

      // if (dataMessages.length > 10) {
      //   dataMessages = getRandomDataMessages(dataMessages);
      // }



      // const endCount = [
      //   { role: 'system', content: "여기까지 몇개의 데이터가 들어 있는지 세어줘" },
      //   { role: 'assistant', content: "여기서 너는 몇번째 데이터에서 대답을 선택했는지 알려줘" },
      // ];


      // const addDataArray = [
      //   {
      //     role: 'system',
      //     content: `마지막 반환해주는 url의 /${data[0].cafe}/${data[0].cafeid}/${data[0].beverage} 순서는 절대적으로 지켜져야한다. 가끔 반대로 /${data[0].beverage}/${data[0].cafeid} 순서로 나올 때가 있는데 이러면 안된다. cafeid는 1부터 5까지 밖에 없기 때문에 만약 5을 넘는다면 틀린 것이므로 /${data[0].cafe}/${data[0].cafeid}/${data[0].beverage}경우로 반환해주어야 한다.`,
      //   },
      //   {
      //     role: 'system',
      //     content: `추천답변은 무조건 이 형식을 따라야 한다. 콕인(CokIn)이 {cafe}에서 음료를 추천해드려요! <a href="{http://localhost:3000/category/{cafe}/{cafeid}/{beverage}}" target="_blank">[{name} 바로가기]</a> 앞에 <a> 태그 형식으로만 글자 하나 안틀리고 반환해야한다. \n 음료 이미지 <p><img className="img" src={image} alt="Image" /></p> {name} {conent}을 요약한 내용}. {tag}에 대한 내용} 아래 링크에서 더 자세한 정보를 확인해보세요. \n\n  {image}는 url 즉, 이미지 url를 반환하고, {}은 보간법을 나타내 주는 것으로 실제로 콕인이 밑에 데이터 중 최적의 답을 골라서 대입해서 표현하면 된다. url과 image url 은 인식될 때 구분 될 수 있어야한다.`,
      //   },
      //   {
      //     role: 'system',
      //     content: '[{name} 바로가기]을 보여줬다면 \n을 한 이후 항상 가장 마지막에 메뉴 이미지 {image} 형식으로 이미지 링크 url를 보여주어야한다. 만약 여려개의 음료를 추천했으면 그 중의 하나의 이미지만 표현해야한다.',
      //   },
      //   {
      //     role: 'system',
      //     content:
      //       'tag[0]은 coffee,non-coffee 커피인지 논커피인지, tag[1]은 americano,latte,ade,juice,tea 아메리카노, 라떼, 에이드, 주스, 티 인지 종류를, tag[2]은 k_low,k_mid,k_high 칼로리가 낮음 중간 높음, tag[3]은 ice,hot 아이스 또는 핫, tag[4]은 s_low, s_mid, s_high 당도가 낮음, 중간, 높음을, tag[5]은 p_low,p_mid,p_high 가격 싸다 중간 비싸다를 나타내며 사용자한테 말할 때에는 키워드를 한국말로 치환해서 알려주어야한다.',
      //   },
      // ];


      // // messages 배열에 순서대로 추가
      // const messages = dataMessages.concat(addDataArray);

      // return messages;


      // const additionalSystemMessages = dataMessages.map((item, index) => (
      //   //   {
      //   //   role: 'system',
      //   //   content: `마지막 반환해주는 url의 /${item.cafe}/${item.cafeid}/${item.beverage} 순서는 절대적으로 지켜져야한다. 가끔 반대로 /${item.beverage}/${item.cafeid} 순서로 나올 때가 있는데 이러면 안된다. cafeid는 1부터 5까지 밖에 없기 때문에 만약 5을 넘는다면 틀린 것이므로 /${item.cafe}/${item.cafeid}/${item.beverage}경우로 반환해주어야 한다.`,
      //   // },
      //   {
      //     role: 'system',
      //     content: `콕인(CokIn)이 ${data[0].cafe}에서 음료를 추천해드려요! <a href="{http://localhost:3000/category/${data[0].cafe}/${data[0].cafeid}/${data[0].beverage}}" target="_blank">[${data[0].name} 바로가기]</a> 앞에 <a> 태그 형식으로만 글자 하나 안틀리고 반환해야한다. \n 음료 이미지 <p><img className="img" src=${data[0].image} alt="Image" /></p> ${data[0].name} ${data[0].content}을 요약한 내용}. tag}에 대한 내용} 아래 링크에서 더 자세한 정보를 확인해보세요. \n\n  {image}는 url 즉, 이미지 url를 반환하고, {}은 보간법을 나타내 주는 것으로 실제로 콕인이 밑에 데이터 중 최적의 답을 골라서 대입해서 표현하면 된다. url과 image url 은 인식될 때 구분 될 수 있어야한다.`,
      //   },
      //   {
      //     role: 'system',
      //     content: `데이터 베이스에 저장되 데이터라면 항상 위에 어시스턴트로 지정한 <a/> 태그가 들어있는 [${data[0].name} 바로가기]을 보여주어야하며, 항상 가장 마지막에 메뉴 이미지 ${data[0].image} 형식으로 이미지 링크 url를 보여주어야한다. 만약 여려개의 음료를 추천했으면 그 중의 하나의 이미지만 표현해야한다.`,
      //   },
      //   {
      //     role: 'assistant',
      //     content: `콕인(CokIn)이 ${data[0].cafe}에서 음료를 추천해드려요! <a href="{http://localhost:3000/category/${data[0].cafe}/${data[0].cafeid}/${data[0].beverage}}" target="_blank">[${data[0].name} 바로가기]</a>`,
      //   }
      // ));

      // // messages 배열에 순서대로 추가
      // const messages = dataMessages.concat(additionalSystemMessages);

      // return messages;

      const additionalSystemMessages = [
        //   {
        //   role: 'system',
        //   content: `마지막 반환해주는 url의 /${item.cafe}/${item.cafeid}/${item.beverage} 순서는 절대적으로 지켜져야한다. 가끔 반대로 /${item.beverage}/${item.cafeid} 순서로 나올 때가 있는데 이러면 안된다. cafeid는 1부터 5까지 밖에 없기 때문에 만약 5을 넘는다면 틀린 것이므로 /${item.cafe}/${item.cafeid}/${item.beverage}경우로 반환해주어야 한다.`,
        // },
        {
          role: 'assistant',
          content: `콕인(CokIn)이 ${data[0].cafe}에서 음료를 추천해드려요! \n<a href="http://localhost:3000/category/${data[0].cafe}/${data[0].cafeid}/${data[0].beverage}" target="_blank">[${data[0].name} 바로가기]</a>\n`,
        },
        {
          role: 'system',
          content: `콕인(CokIn)이 ${data[0].cafe}에서 음료를 추천해드려요! <a href="http://localhost:3000/category/${data[0].cafe}/${data[0].cafeid}/${data[0].beverage}" target="_blank">[${data[0].name} 바로가기]</a> 앞에 <a> 태그 형식으로만 글자 하나 안틀리고 반환해야한다. 음료 이미지 \n<p><img className="img" src=${data[0].image} alt="Image" /></p>\n ${data[0].name} ${data[0].content}을 요약한 내용. ${data[0].tag}에 대한 내용 아래 링크에서 더 자세한 정보를 확인해보세요. ${data[0].image}는 url 즉, 이미지 url를 반환하고, 실제로 콕인이 밑에 데이터 중 최적의 답을 골라서 대입해서 표현하면 된다. url과 image url 은 인식될 때 구분 될 수 있어야하므로 url은 처음에 image url은 마지막에 표현한다.`,
        },
        {
          role: 'system',
          content: `데이터 베이스에 저장되 데이터라면 항상 위에 어시스턴트로 지정한 <a/> 태그가 들어있는 [${data[0].name} 바로가기]을 보여주어야하며, 항상 가장 마지막에 메뉴 이미지 ${data[0].image} 형식으로 이미지 링크 url를 보여주어야한다. 만약 여려개의 음료를 추천했으면 그 중의 하나의 이미지만 표현해야한다.`,
        }
      ]

      // messages 배열에 순서대로 추가
      // const messages = dataMessages.concat(additionalSystemMessages);
      const messages = [...dataMessages, ...additionalSystemMessages];

      return messages;
    };

    // const formatData = (data) => {
    //   if (data.length === 0) {
    //     return [{ role: 'system', content: '데이터가 없습니다.' }];
    //   }

    //   // 랜덤으로 10개의 데이터 선택
    //   const selectedData = data.length > 10 ? getRandomDataMessages(data) : data;

    //   // 데이터를 순회하면서 보간법을 적용하여 메시지 배열 생성
    //   const messages = selectedData.map((item, index) => {
    //     const assistantContent = `콕인(CokIn)이 ${item.cafe}에서 음료를 추천해드려요! <a href="http://localhost:3000/category/${item.cafe}/${item.cafeid}/${item.beverage}" target="_blank">[${item.name} 바로가기]</a>`;

    //     const assistantContent2 = `추천된 음료는 ${item.name}에요! ${item.content}`;

    //     const systemContent = `음료이름은 ${item.name} 이고 음료에 대한 ${item.content}을 요약한 내용을 보여준다. ${item.tag}에 대한 내용을 한국말로 의역하여 설명해준다.`;

    //     const assistantImage = `음료 이미지<p><img className="img" src=${item.image} alt="Image" /></p>`;

    //     // const systemContent = `콕인(CokIn)이 ${item.cafe}에서 음료를 추천해드려요! <a href="http://localhost:3000/category/${item.cafe}/${item.cafeid}/${item.beverage}" target="_blank">[${item.name} 바로가기]</a>`;


    //     return [
    //       { role: 'assistant', content: assistantContent },
    //       { role: 'assistant', content: assistantContent2 },
    //       { role: 'system', content: systemContent },
    //       { role: 'assistant', content: assistantImage },
    //       // { role: 'system', content: systemContent },
    //     ];
    //   });

    //   // messages 배열에 순서대로 추가
    //   const flattenedMessages = messages.flat();

    //   return flattenedMessages;
    // };

    if (!cafeName && !beverageName && tag) {
      // 태그만 있는 경우
      const cafeDataTag = await getCafeDataByTag(cafeName, tag);
      messages = messages.concat(formatData(cafeDataTag))
      console.log(messages);
      // return messages;
    } else if (cafeName && !beverageName && !tag) {
      // 카페 이름만 있는 경우
      const cafeDataName = await getCafeDataByName(cafeName, beverageName);
      messages = messages.concat(formatData(cafeDataName))
      console.log(messages);
      // return messages;
    } else if (cafeName && beverageName && !tag) {
      // 카페 이름과 음료 이름이 있는 경우
      const cafeDataName = await getCafeDataByName(cafeName, beverageName);
      messages = messages.concat(formatData(cafeDataName))
      console.log(messages);
      // return messages;
    } else if (cafeName && tag) {
      // 카페 이름과 태그가 있는 경우
      const cafeDataName = await getCafeDataByName(cafeName, beverageName);
      const cafeDataTag = await getCafeDataByTag(cafeName, tag);

      // 교집합 데이터만 추출
      const intersectionData = cafeDataName.filter(itemName =>
        cafeDataTag.some(itemTag => itemTag.id === itemName.id)
      );

      messages = messages.concat(formatData(intersectionData))
      console.log(messages);
      // return messages;
    }

    // const formattedData = formatData(cafeData);
    // console.log(formattedData);


    // 사용자 입력을 사용하여 메시지 생성
    // messages = messages.concat(formattedData)
    // console.log(messages)

    // 사용자 질문 메시지 추가
    userMessage = { role: 'user', content: `사용자 질문: ${userMessage}\n` };
    // 기존 messages 배열에 사용자 질문 메시지를 추가
    messages.push(userMessage);

    console.log(messages)

    // GPT-3 API 호출 수행
    const response = await gptAPI.post('/v1/chat/completions', {
      model: 'gpt-3.5-turbo-1106',
      // model: 'gpt-3.5-turbo-16k',
      // model: 'gpt-4-1106-preview',
      messages,
    });

    const repliedMessage = response.data.choices[0].message.content;

    // console.log(repliedMessage)
    return repliedMessage;
  } catch (error) {
    console.error(error);
  }
};

// // 10개가 넘을 시 랜덤을 돌리는 함수
// const getRandomDataMessages = (dataMessages) => {
//   const shuffledMessages = dataMessages.sort(() => Math.random() - 0.5);
//   return shuffledMessages.slice(0, 10);
// };

// 랜덤으로 1개의 데이터 선택하는 함수
const getRandomDataMessages = (dataMessages) => {
  const randomIndex = Math.floor(Math.random() * dataMessages.length);
  return [dataMessages[randomIndex]];
};

const getCafeDataByName = async (cafeName, beverageName) => {
  try {
    // 서브 컬렉션에서 커피 데이터를 조회합니다.
    const subCollection = Cafe.db.collection(`cafe/${cafeName}`);
    // console.log(subCollection)

    // name 필드가 beverageName과 일치하는 데이터를 찾습니다.
    const cafeData = await subCollection.find({ name: { $regex: new RegExp(beverageName, 'i') } }).toArray();
    // console.log(cafeData)

    return cafeData;
  } catch (error) {
    console.error('카페 데이터를 가져오는 중 오류 발생:', error);
    throw error;
  }
};

const getCafeDataByTag = async (cafeName, tag) => {
  try {
    // 서브 컬렉션에서 커피 데이터를 조회합니다.
    const subCollection = Cafe.db.collection(`cafe/${cafeName}`);

    // tag 배열 안에 tag가 포함되어 있는 데이터를 찾습니다.
    const cafeData = await subCollection.find({ tag: tag }).toArray();

    return cafeData;
  } catch (error) {
    console.error('카페 데이터를 가져오는 중 오류 발생:', error);
    throw error;
  }
};



// 사용자 메시지에서 카페 이름 추출
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

// 사용자 메세지에서 음료 이름 추출
const extractCafeAndBeverageName = (userMessage) => {
  const beverageKeywords = ['아메', '콜드브루', "콜드", "콜드 브루", '라떼', '에이드', '주스', '티', "요거트"];
  for (const keyword of beverageKeywords) {
    if (userMessage.includes(keyword)) {
      return keyword;
    }
  }

  // 음료 이름을 찾지 못한 경우 빈 문자열로 기본 설정
  return '';
};


// 사용자 메시지에서 카페 이름 추출
const extractCafeTag = (userMessage) => {
  const tagKeywords = ['커피', '논커피', '아이스', '핫', '아메리카노', '라떼', '에이드', '주스', '티', '칼로리 낮', '칼로리 중', '칼로리 높', '당도 낮', '당도가 낮', '당도 중', '당도 높', '가격 낮', '가격 중', '가격 높'];

  for (const keyword of tagKeywords) {
    if (userMessage.includes(keyword)) {
      // 사용자 입력에 따라 새로운 변수에 카페 이름 저장
      let extractedCafeTag;
      if (keyword == '커피') {
        return 'coffee';
      } else if (keyword == '논커피') {
        return 'non-coffee';
      } else if (keyword == '아이스') {
        extractedCafeTag = 'ice';
      } else if (keyword == '핫') {
        extractedCafeTag = 'hot';
      } else if (keyword == '아메리카노') {
        extractedCafeTag = 'americano';
      } else if (keyword == '라떼') {
        extractedCafeTag = 'latte';
      } else if (keyword == '에이드') {
        extractedCafeTag = 'ade';
      } else if (keyword == '주스') {
        extractedCafeTag = 'juice';
      } else if (keyword == '티') {
        extractedCafeTag = 'tea';
      } else if (keyword == '칼로리 낮') {
        extractedCafeTag = 'k_low';
      } else if (keyword == '칼로리 중') {
        extractedCafeTag = 'k_mid';
      } else if (keyword == '칼로리 높') {
        extractedCafeTag = 'k_high';
      } else if (keyword == '당도 낮' || '당도가 낮') {
        extractedCafeTag = 's_low';
      } else if (keyword == '당도 중') {
        extractedCafeTag = 's_mid';
      } else if (keyword == '당도 높') {
        extractedCafeTag = 's_high';
      } else if (keyword == '가격 낮') {
        extractedCafeTag = 'p_low';
      } else if (keyword == '가격 중') {
        extractedCafeTag = 'p_mid';
      } else if (keyword == '가격 높') {
        extractedCafeTag = 'p_high';
      }

      else {
        extractedCafeTag = 'all';
      }
      return extractedCafeTag;
    }
  }

  // 카페 이름을 찾지 못한 경우 빈 문자열로 기본 설정
  return '';
};