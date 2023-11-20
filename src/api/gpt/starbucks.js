export const createStarbucksMessage = (keyword) => {
  let messages = [];

  if (keyword === '콜드브루') {
    messages.push(
      {
        role: 'system',
        content:
          '2,1,2,나이트로 콜드 브루,starbucks,나이트로 커피 정통의 캐스케이딩과 부드러운 콜드 크레마! 부드러운 목 넘김과 완벽한 밸런스에 커피 본연의 단맛을 경험할 수 있습니다.,"7,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000479]_20210426091843897.jpg,Tall(톨) / 355ml (12 fl oz),5,0,5,0,245,coffee,ice,k_low,s_low,p_high,',
      },
      {
        role: 'system',
        content:
          '3,1,3,돌체 콜드 브루,starbucks,"무더운 여름철, \n동남아 휴가지에서 즐기는 커피를 떠오르게 하는 \n스타벅스 음료의 베스트 x 베스트 조합인\n돌체 콜드 브루를 만나보세요! ","6,000",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002081]_20210415133656839.jpg,Tall(톨) / 355ml (12 fl oz),265,9,130,29,155,coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: 'system',
        content:
          '5,1,5,리저브 콜드 브루,starbucks,리저브 커피 마스터의 정성으로 차갑게 추출한 깊고 부드러운 풍미의 커피,"6,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000002093]_20210225094415504.jpg,Tall(톨) / 355ml (12 fl oz),5,0,0,0,190,coffee,ice,k_low,s_low,p_high,',
      },
      {
        role: 'system',
        content:
          '6,1,6,민트 콜드 브루,starbucks,상쾌한 민트향 시럽과 잘게 갈린 얼음이 \n어우러져 시원함이 강렬하게 느껴지는 리저브만의\n콜드 브루 음료,"8,000",https://image.istarbucks.co.kr/upload/store/skuimg/2022/10/[9200000004312]_20221005145029134.jpg,Grande(그란데) / 473ml (16 fl oz),100,0,0,23,415,coffee,ice,k_low,s_mid,p_high,',
      },
      {
        role: 'system',
        content:
          '7,1,7,바닐라 크림 콜드 브루,starbucks,콜드 브루에 더해진 바닐라 크림으로 깔끔하면서 달콤한 콜드 브루를 새롭게 즐길 수 있는 음료입니다.,"5,800",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000487]_20210430112319040.jpg,Tall(톨) / 355ml (12 fl oz),125,6,58,11,155,coffee,ice,k_mid,s_mid,p_mid,',
      },
      {
        role: 'system',
        content:
          '8,1,8,시그니처 더 블랙 콜드 브루,starbucks,콜드 브루 전용 원두를 차가운 물로 매장에서 직접 추출하여 부드럽고 진한 풍미의 콜드브루를 언제 어디서나 편하게 즐겨보세요 (전용 보틀 /500ml),"19,600",https://image.istarbucks.co.kr/upload/store/skuimg/2023/07/[9200000003661]_20230721170207026.jpg,Bottle(보틀) / 500ml (17 fl oz),25,0,50,0,680,coffee,ice,k_low,s_low,p_high,',
      },
      {
        role: 'system',
        content:
          '9,1,9,여수 윤슬 헤이즐넛 콜드브루,starbucks,"햇빛이나 달빛에 비치어 반짝이는 잔물결이라는\n""윤슬""을 형상화한 헤이즐넛 콜드브루","7,500",https://image.istarbucks.co.kr/upload/store/skuimg/2023/08/[9200000004750]_20230801101408624.jpg,,245,9,85,27,53,coffee,latte,ice,k_high,s_high,p_high',
      },
      {
        role: 'system',
        content:
          '10,1,10,오트 콜드 브루,starbucks,콜드 브루의 풍미와 깔끔한 오트음료(식물성 대체유)가 어우러진 달콤 고소한 라떼.식물성 대체유를 사용해 모든 고객이 부담없이 즐길 수 있는 콜드 브루 음료,"5,800",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000003285]_20210416154437069.jpg,Tall(톨) / 355ml (12 fl oz),120,0.3,95,14,65,coffee,latte,ice,k_mid,s_mid,p_mid',
      },
      {
        role: 'system',
        content:
          '11,1,11,제주 비자림 콜드 브루,starbucks,제주 천년의 숲 비자림을 연상시키는 음료로 제주 유기농 말차와 콜드 브루가 조화로운 제주 특화 콜드 브루 음료,"6,800",https://image.istarbucks.co.kr/upload/store/skuimg/2022/03/[9200000002672]_20220311105511600.jpg,Grande(그란데) / 473ml (16 fl oz),360,8,140,39,305,coffee,latte,ice,k_high,s_high,p_high',
      },
      {
        role: 'system',
        content:
          '12,1,12,콜드 브루,starbucks,스타벅스 바리스타의 정성으로 탄생한 콜드 브루! \n콜드 브루 전용 원두를 차가운 물로 추출하여 한정된 양만 제공됩니다. \n실크같이 부드럽고 그윽한 초콜릿 풍미의 콜드 브루를 만나보세요!\n\n한정된 기간 동안 판매하는 트렌타 사이즈로 즐겨 보세요.,"4,900",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000038]_20210430113202458.jpg,Trenta(트렌타) / 887ml (30 fl oz),5,0,25,0,360,coffee,ice,k_low,s_low,p_high,',
      },
      {
        role: 'system',
        content:
          '13,1,13,콜드 브루 몰트,starbucks,"[리저브 전용음료] 리저브 콜드 브루, 바닐라 아이스크림, 몰트가 블렌딩된 리저브만의 쉐이크\n","8,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001636]_20210225093600536.jpg,Tall(톨) / 355ml (12 fl oz),505,20,150,41,190,coffee,latte,ice,k_high,s_high,p_high',
      },
      {
        role: 'system',
        content:
          '14,1,14,콜드 브루 플로트,starbucks,[리저브 전용음료] 리저브 콜드 브루 위에 녹아 내리는 한 스쿱의 바닐라 아이스크림,"8,000",https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001635]_20210225092236748.jpg,Tall(톨) / 355ml (12 fl oz),225,10,70,18,190,coffee,ice,k_high,s_mid,p_high,',
      },
    );
    return messages;
  }

  if (keyword === '아메리카노') {
    messages.push(
      {
        role: 'system',
        content:
          '23,1,23,아이스 카페 아메리카노,starbucks,진한 에스프레소에 시원한 정수물과 얼음을 더하여 스타벅스의 깔끔하고 강렬한 에스프레소를 가장 부드럽고 시원하게 즐길 수 있는 커피,"4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110563]_20210426095937808.jpg,Tall(톨) / 355ml (12 fl oz),10,0,5,0,150,coffee,ice,k_low,s_low,p_mid,',
      },
      {
        role: 'system',
        content:
          '24,1,24,카페 아메리카노,starbucks,진한 에스프레소와 뜨거운 물을 섞어 스타벅스의 깔끔하고 강렬한 에스프레소를 가장 부드럽게 잘 느낄 수 있는 커피 ,"4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[94]_20210430103337006.jpg,Tall(톨) / 355ml (12 fl oz),10,0,5,0,150,coffee,hot,k_low,s_low,p_mid,',
      },
    );
    return messages;
  }

  if (keyword === '시즌') {
    messages.push(
      {
        role: 'system',
        content:
          '16,1,16,오늘의 커피,starbucks,"시즌에 어울리는 원두 종류를 선정하여 신선하게 브루드(Brewed)되어 제공되는 드립커피로, 원두 커피의 풍부한 맛과 향을 따뜻하게 즐기실 수 있습니다. ","4,200",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[2]_20210430111934117.jpg,Tall(톨) / 355ml (12 fl oz),5,0,15,0,260,coffee,ice/hot,k_low,s_low,p_mid,',
      },
      {
        role: 'system',
        content:
          '19,1,19,블랙 글레이즈드 라떼,starbucks,가을 시즌 대표 음료! 돌아온 블랙 글레이즈드 라떼\n짙고 풍부한 커피와 달콤하고 부드러운 글레이즈드 폼의 조화,"6,500",https://image.istarbucks.co.kr/upload/store/skuimg/2023/10/[9200000002259]_20231004084716615.jpg,Tall(톨) / 355ml (12 fl oz),385,14,220,37,75,coffee,latte,hot,k_high,s_high,p_high',
      },
      {
        role: 'system',
        content:
          '20,1,20,아이스 블랙 글레이즈드 라떼,starbucks,가을 시즌 대표 음료! 돌아온 블랙 글레이즈드 라떼\n짙고 풍부한 커피와 달콤하고 부드러운 글레이즈드 폼의 조화,"6,500",https://image.istarbucks.co.kr/upload/store/skuimg/2023/10/[9200000002262]_20231004084837294.jpg,Tall(톨) / 355ml (12 fl oz),305,11,160,31,75,coffee,latte,ice,k_high,s_high,p_high',
      },
    );
    return messages;
  }

  return messages;
};
