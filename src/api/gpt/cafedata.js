// export const createCafeSpecificMessage = (cafeName, keyword) => {
//   let messages = [];

//   if (cafeName === '스타벅스') {
//     if (keyword === '콜드브루') {
//       messages.push(
//         {
//           role: 'system',
//           content:
//             '2,1,2,나이트로 콜드 브루,starbucks,나이트로 커피 정통의 캐스케이딩과 부드러운 콜드 크레마! 부드러운 목 넘김과 완벽한 밸런스에 커피 본연의 단맛을 경험할 수 있습니다.,"7,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000479]_20210426091843897.jpg,Tall(톨) / 355ml (12 fl oz),5,0,5,0,245,coffee,ice,k_low,s_low,p_high,',
//         },
//         {
//           role: 'system',
//           content:
//             '3,1,3,돌체 콜드 브루,starbucks,"무더운 여름철, \n동남아 휴가지에서 즐기는 커피를 떠오르게 하는 \n스타벅스 음료의 베스트 x 베스트 조합인\n돌체 콜드 브루를 만나보세요! ","6,000",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002081]_20210415133656839.jpg,Tall(톨) / 355ml (12 fl oz),265,9,130,29,155,coffee,latte,ice,k_high,s_high,p_mid',
//         },
//         {
//           role: 'system',
//           content:
//             '5,1,5,리저브 콜드 브루,starbucks,리저브 커피 마스터의 정성으로 차갑게 추출한 깊고 부드러운 풍미의 커피,"6,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000002093]_20210225094415504.jpg,Tall(톨) / 355ml (12 fl oz),5,0,0,0,190,coffee,ice,k_low,s_low,p_high,',
//         },
//         {
//           role: 'system',
//           content:
//             '6,1,6,민트 콜드 브루,starbucks,상쾌한 민트향 시럽과 잘게 갈린 얼음이 \n어우러져 시원함이 강렬하게 느껴지는 리저브만의\n콜드 브루 음료,"8,000",https://image.istarbucks.co.kr/upload/store/skuimg/2022/10/[9200000004312]_20221005145029134.jpg,Grande(그란데) / 473ml (16 fl oz),100,0,0,23,415,coffee,ice,k_low,s_mid,p_high,',
//         },
//         {
//           role: 'system',
//           content:
//             '7,1,7,바닐라 크림 콜드 브루,starbucks,콜드 브루에 더해진 바닐라 크림으로 깔끔하면서 달콤한 콜드 브루를 새롭게 즐길 수 있는 음료입니다.,"5,800",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000487]_20210430112319040.jpg,Tall(톨) / 355ml (12 fl oz),125,6,58,11,155,coffee,ice,k_mid,s_mid,p_mid,',
//         },
//         {
//           role: 'system',
//           content:
//             '8,1,8,시그니처 더 블랙 콜드 브루,starbucks,콜드 브루 전용 원두를 차가운 물로 매장에서 직접 추출하여 부드럽고 진한 풍미의 콜드브루를 언제 어디서나 편하게 즐겨보세요 (전용 보틀 /500ml),"19,600",https://image.istarbucks.co.kr/upload/store/skuimg/2023/07/[9200000003661]_20230721170207026.jpg,Bottle(보틀) / 500ml (17 fl oz),25,0,50,0,680,coffee,ice,k_low,s_low,p_high,',
//         },
//         {
//           role: 'system',
//           content:
//             '9,1,9,여수 윤슬 헤이즐넛 콜드브루,starbucks,"햇빛이나 달빛에 비치어 반짝이는 잔물결이라는\n""윤슬""을 형상화한 헤이즐넛 콜드브루","7,500",https://image.istarbucks.co.kr/upload/store/skuimg/2023/08/[9200000004750]_20230801101408624.jpg,,245,9,85,27,53,coffee,latte,ice,k_high,s_high,p_high',
//         },
//         {
//           role: 'system',
//           content:
//             '10,1,10,오트 콜드 브루,starbucks,콜드 브루의 풍미와 깔끔한 오트음료(식물성 대체유)가 어우러진 달콤 고소한 라떼.식물성 대체유를 사용해 모든 고객이 부담없이 즐길 수 있는 콜드 브루 음료,"5,800",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000003285]_20210416154437069.jpg,Tall(톨) / 355ml (12 fl oz),120,0.3,95,14,65,coffee,latte,ice,k_mid,s_mid,p_mid',
//         },
//         {
//           role: 'system',
//           content:
//             '11,1,11,제주 비자림 콜드 브루,starbucks,제주 천년의 숲 비자림을 연상시키는 음료로 제주 유기농 말차와 콜드 브루가 조화로운 제주 특화 콜드 브루 음료,"6,800",https://image.istarbucks.co.kr/upload/store/skuimg/2022/03/[9200000002672]_20220311105511600.jpg,Grande(그란데) / 473ml (16 fl oz),360,8,140,39,305,coffee,latte,ice,k_high,s_high,p_high',
//         },
//         {
//           role: 'system',
//           content:
//             '12,1,12,콜드 브루,starbucks,스타벅스 바리스타의 정성으로 탄생한 콜드 브루! \n콜드 브루 전용 원두를 차가운 물로 추출하여 한정된 양만 제공됩니다. \n실크같이 부드럽고 그윽한 초콜릿 풍미의 콜드 브루를 만나보세요!\n\n한정된 기간 동안 판매하는 트렌타 사이즈로 즐겨 보세요.,"4,900",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000038]_20210430113202458.jpg,Trenta(트렌타) / 887ml (30 fl oz),5,0,25,0,360,coffee,ice,k_low,s_low,p_high,',
//         },
//         {
//           role: 'system',
//           content:
//             '13,1,13,콜드 브루 몰트,starbucks,"[리저브 전용음료] 리저브 콜드 브루, 바닐라 아이스크림, 몰트가 블렌딩된 리저브만의 쉐이크\n","8,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001636]_20210225093600536.jpg,Tall(톨) / 355ml (12 fl oz),505,20,150,41,190,coffee,latte,ice,k_high,s_high,p_high',
//         },
//         {
//           role: 'system',
//           content:
//             '14,1,14,콜드 브루 플로트,starbucks,[리저브 전용음료] 리저브 콜드 브루 위에 녹아 내리는 한 스쿱의 바닐라 아이스크림,"8,000",https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001635]_20210225092236748.jpg,Tall(톨) / 355ml (12 fl oz),225,10,70,18,190,coffee,ice,k_high,s_mid,p_high,',
//         },
//       );
//       return messages;
//     }

//     if (keyword === '아메리카노') {
//       messages.push(
//         {
//           role: 'system',
//           content:
//             '23,1,23,아이스 카페 아메리카노,starbucks,진한 에스프레소에 시원한 정수물과 얼음을 더하여 스타벅스의 깔끔하고 강렬한 에스프레소를 가장 부드럽고 시원하게 즐길 수 있는 커피,"4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110563]_20210426095937808.jpg,Tall(톨) / 355ml (12 fl oz),10,0,5,0,150,coffee,ice,k_low,s_low,p_mid,',
//         },
//         {
//           role: 'system',
//           content:
//             '24,1,24,카페 아메리카노,starbucks,진한 에스프레소와 뜨거운 물을 섞어 스타벅스의 깔끔하고 강렬한 에스프레소를 가장 부드럽게 잘 느낄 수 있는 커피 ,"4,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[94]_20210430103337006.jpg,Tall(톨) / 355ml (12 fl oz),10,0,5,0,150,coffee,hot,k_low,s_low,p_mid,',
//         },
//       );
//       return messages;
//     }

//     if (keyword === '시즌') {
//       messages.push(
//         {
//           role: 'system',
//           content:
//             '16,1,16,오늘의 커피,starbucks,"시즌에 어울리는 원두 종류를 선정하여 신선하게 브루드(Brewed)되어 제공되는 드립커피로, 원두 커피의 풍부한 맛과 향을 따뜻하게 즐기실 수 있습니다. ","4,200",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[2]_20210430111934117.jpg,Tall(톨) / 355ml (12 fl oz),5,0,15,0,260,coffee,ice/hot,k_low,s_low,p_mid,',
//         },
//         {
//           role: 'system',
//           content:
//             '19,1,19,블랙 글레이즈드 라떼,starbucks,가을 시즌 대표 음료! 돌아온 블랙 글레이즈드 라떼\n짙고 풍부한 커피와 달콤하고 부드러운 글레이즈드 폼의 조화,"6,500",https://image.istarbucks.co.kr/upload/store/skuimg/2023/10/[9200000002259]_20231004084716615.jpg,Tall(톨) / 355ml (12 fl oz),385,14,220,37,75,coffee,latte,hot,k_high,s_high,p_high',
//         },
//         {
//           role: 'system',
//           content:
//             '20,1,20,아이스 블랙 글레이즈드 라떼,starbucks,가을 시즌 대표 음료! 돌아온 블랙 글레이즈드 라떼\n짙고 풍부한 커피와 달콤하고 부드러운 글레이즈드 폼의 조화,"6,500",https://image.istarbucks.co.kr/upload/store/skuimg/2023/10/[9200000002262]_20231004084837294.jpg,Tall(톨) / 355ml (12 fl oz),305,11,160,31,75,coffee,latte,ice,k_high,s_high,p_high',
//         },
//       );
//       return messages;
//     }

//     if (keyword === '에스프레소') {
//       messages.push(
//         {
//           role: 'system',
//           content:
//             '21,1,21,에스프레소 콘 파나,starbucks,"신선한 에스프레소 샷에 풍부한 휘핑크림을 얹은 커피 음료로서, 뜨거운 커피의 맛과 차갑고 달콤한 생크림의 맛을 같이 즐길 수 있는 커피 음료","4,200",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[30]_20210415144252244.jpg,Solo(솔로) / 22ml (0.75 fl oz),30,1.5,0,1,75,coffee,hot,k_low,s_low,p_mid,',
//         },
//         {
//           role: 'system',
//           content:
//             '22,1,22,에스프레소 마키아또,starbucks,"신선한 에스프레소 샷에 우유 거품을 살짝 얹은 커피 음료로써, 강렬한 에스프레소의 맛과 우유의 부드러움을 같이 즐길 수 있는 커피 음료","4,000",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[25]_20210415144211211.jpg,Solo(솔로) / 22ml (0.75 fl oz),10,0,0,0,75,coffee,hot,k_low,s_low,p_mid,',
//         },
//         {
//           role: 'system',
//           content:
//             '32,1,32,브라운 슈가 오트 쉐이큰 에스프레소,starbucks,"브라운 슈가의 달콤함과 블론드 샷의 부드러움이 쉐이킹을 통해 극대화 된 음료\n시나몬과 브라운 슈가, 오트의 조화가 좋은 음료","5,900",https://image.istarbucks.co.kr/upload/store/skuimg/2023/03/[9200000004354]_20230320154318507.jpg,Tall(톨) / 355ml (12 fl oz),135,0.2,55,20,170,coffee,latte,ice,k_mid,s_mid,p_mid',
//         },
//         {
//           role: 'system',
//           content:
//             '33,1,33,사케라또 비안코 오버 아이스,starbucks,얼음과 같이 쉐이킹하여 차가워진 진한 리저브 에스프레소와 하우스 메이드 크림이 어우러진 달콤한 음료,"7,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000002095]_20210225095033382.jpg,Tall(톨) / 355ml (12 fl oz),270,18,45,14,315,coffee,latte,ice,k_high,s_mid,p_high',
//         },
//       );
//       return messages;
//     }

//     if (keyword === '라떼') {
//       messages.push(
//         {
//           role: 'system',
//           content:
//             '17,1,17,마롱 헤이즐넛 라떼,starbucks,"고소한 마롱, 헤이즐넛과 블론드 에스프레소가 만나\n밤이 잘 익은 가을을 느낄 수 있는 음료","6,700",https://image.istarbucks.co.kr/upload/store/skuimg/2023/09/[9200000004771]_20230920102511927.jpg,Tall(톨) / 355ml (12 fl oz),280,5,130,35,85,coffee,latte,hot,k_high,s_high,p_high',
//         },
//         {
//           role: 'system',
//           content:
//             '18,1,18,아이스 마롱 헤이즐넛 라떼,starbucks,"고소한 마롱, 헤이즐넛과 블론드 에스프레소가 만나\n밤이 잘 익은 가을을 느낄 수 있는 음료","6,700",https://image.istarbucks.co.kr/upload/store/skuimg/2023/09/[9200000004774]_20230920102719611.jpg,Tall(톨) / 355ml (12 fl oz),190,2.4,65,28,85,coffee,latte,ice,k_mid,s_high,p_high',
//         },
//         {
//           role: 'system',
//           content:
//             '29,1,29,더 그린 쑥 크림 라떼,starbucks,"은은한 쑥과 곡물에 블론드 샷이 어우러져 고소하고 부드러운 라떼\n달콤한 쑥 폼이 올라가 부드럽게 즐기는 아인슈페너 음료  \n*더북한산,더양평DTR,더북한강R,경동1960,대구종로고택 매장에서만 판매하는 음료입니다.","7,000",https://image.istarbucks.co.kr/upload/store/skuimg/2023/02/[9200000004528]_20230206091947981.jpg,Grande(그란데) / 473ml (16 fl oz),365,11,570,33,170,coffee,latte,ice/hot,k_high,s_high,p_high',
//         },
//         {
//           role: 'system',
//           content:
//             '31,1,31,바닐라 빈 라떼,starbucks,리저브만을 위한 바닐라 빈 시럽이 부드럽게 어우러진 카페 라떼,"7,000",https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001939]_20210225094313315.jpg,Tall(톨) / 355ml (12 fl oz),245,6,150,27,210,coffee,latte,hot,k_mid,s_mid,p_high',
//         },
//         {
//           role: 'system',
//           content:
//             '34,1,34,스타벅스 1호점 바닐라 빈 라떼,starbucks,한국 스타벅스 1호점인 이대R점을 상징하는 리저브 바닐라 빈 라떼.\n시애틀 1호점을 기념하는 파이크 플레이스 로스트VIA와 번트 카라멜 파우더로\n만든 리저브 로고는 부드러운 우유 폼에 달콤쌉쌀한 풍미를 선사.,"7,500",https://image.istarbucks.co.kr/upload/store/skuimg/2023/07/[9200000004732]_20230705095514946.jpg,Tall(톨) / 355ml (12 fl oz),234,6,150,27,210,coffee,latte,hot,k_mid,s_high,p_high',
//         },
//         {
//           role: 'system',
//           content:
//             '35,1,35,스타벅스 1호점 카페 라떼,starbucks,한국 스타벅스 1호점인 이대R점을 상징하는 리저브 카페 라떼.\n시애틀 1호점을 기념하는 파이크 플레이스 로스트VIA와 번트 카라멜 파우더로\n만든 리저브 로고는 부드러운 우유 폼에 달콤쌉쌀한 풍미를 선사.,"7,000",https://image.istarbucks.co.kr/upload/store/skuimg/2023/07/[9200000004728]_20230705095319596.jpg,Tall(톨) / 355ml (12 fl oz),191,6,150,15,210,coffee,latte,hot,k_mid,s_mid,p_high',
//         },
//         {
//           role: 'system',
//           content:
//             '36,1,36,스타벅스 돌체 라떼,starbucks,스타벅스의 다른 커피 음료보다 더욱 깊은 커피의 맛과 향에 깔끔한 무지방 우유와 부드러운 돌체 시럽이 들어간 음료로 달콤하고 진한 커피 라떼,"5,900",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[128692]_20210426091933665.jpg,Tall(톨) / 355ml (12 fl oz),255,2.6,190,39,150,coffee,latte,hot,k_high,s_high,p_mid',
//         },
//         {
//           role: 'system',
//           content:
//             '37,1,37,아이스 더 그린 쑥 크림 라떼,starbucks,"은은한 쑥과 곡물에 블론드 샷이 어우러져 고소하고 부드러운 라떼\n달콤한 쑥 폼이 올라가 부드럽게 즐기는 아인슈페너 음료 \n*더북한산,더양평DTR,더북한강R,경동1960,대구종로고택 매장에서만 판매하는 음료입니다.","7,000",https://image.istarbucks.co.kr/upload/store/skuimg/2023/02/[9200000004529]_20230206091908618.jpg,Grande(그란데) / 473ml (16 fl oz),325,10,490,28,170,coffee,latte,ice,k_high,s_high,p_high',
//         },
//         {
//           role: 'system',
//           content:
//             '39,1,39,아이스 바닐라 빈 라떼,starbucks,리저브만을 위한 바닐라 빈 시럽이 부드럽게 어우러진 카페 라떼,"7,000",https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001941]_20210225094346653.jpg,Tall(톨) / 355ml (12 fl oz),245,6,150,27,210,coffee,latte,ice,k_mid,s_high,p_high',
//         },
//         {
//           role: 'system',
//           content:
//             '40,1,40,아이스 스타벅스 1호점 바닐라 빈 라떼,starbucks,한국 스타벅스 1호점인 이대R점을 상징하는 리저브 바닐라 빈 라떼.\n시애틀 1호점을 기념하는 파이크 플레이스 로스트VIA와 번트 카라멜 파우더로\n만든 리저브 로고는 부드러운 밀크 콜드폼에 달콤쌉쌀한 풍미를 선사.,"7,500",https://image.istarbucks.co.kr/upload/store/skuimg/2023/07/[9200000004734]_20230705095557184.jpg,Tall(톨) / 355ml (12 fl oz),159,2.9,90,21,210,coffee,latte,ice,k_mid,s_mid,p_high',
//         },
//         {
//           role: 'system',
//           content:
//             '41,1,41,아이스 스타벅스 1호점 카페 라떼,starbucks,한국 스타벅스 1호점인 이대R점을 상징하는 리저브 카페 라떼. 시애틀 1호점을 기념하는 파이크 플레이스 로스트VIA와 번트 카라멜 파우더로 만든 리저브 로고는 부드러운 밀크 콜드폼에 달콤쌉쌀한 풍미를 선사.,"7,000",https://image.istarbucks.co.kr/upload/store/skuimg/2023/07/[9200000004730]_20230705095423060.jpg,Tall(톨) / 355ml (12 fl oz),117,3.2,100,9,210,coffee,latte,ice,k_mid,s_low,p_high',
//         },
//         {
//           role: 'system',
//           content:
//             '42,1,42,아이스 스타벅스 돌체 라떼,starbucks,스타벅스의 다른 커피 음료보다 더욱 깊은 커피의 맛과 향에 깔끔한 무지방 우유와 부드러운 돌체 시럽이 들어간 음료로 달콤하고 진한 커피 라떼,"5,900",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[128695]_20210426092031969.jpg,Tall(톨) / 355ml (12 fl oz),230,2.5,145,35,150,coffee,latte,ice,k_mid,s_high,p_mid',
//         },
//         {
//           role: 'system',
//           content:
//             '43,1,43,아이스 카페 라떼,starbucks,풍부하고 진한 농도의 에스프레소가 시원한 우유와 얼음을 만나 고소함과 시원함을 즐길 수 있는 대표적인 커피 라떼,"5,000",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110569]_20210415143035989.jpg,Tall(톨) / 355ml (12 fl oz),110,3.5,75,8,75,coffee,latte,ice,k_mid,s_low,p_mid',
//         },
//         {
//           role: 'system',
//           content:
//             '44,1,44,카페 라떼,starbucks,풍부하고 진한 에스프레소가 신선한 스팀 밀크를 만나 부드러워진 커피 위에 우유 거품을 살짝 얹은 대표적인 커피 라떼,"5,000",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[41]_20210415133833725.jpg,Tall(톨) / 355ml (12 fl oz),180,5,115,13,75,coffee,latte,hot,k_mid,s_mid,p_mid',
//         },

//         {
//           role: 'system',
//           content:
//             '112,1,112,아이스 차이 티 라떼,starbucks,"스파이시한 향과 독특한 계피향, 달콤한 차이로 만든 부드러운 티 라떼","5,500",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[135612]_20210415142512793.jpg,Tall(톨) / 355ml (12 fl oz),190,3,70,31,70,non-coffee,latte,ice,k_mid,s_high,p_mid',
//         },
//         {
//           role: 'system',
//           content:
//             '113,1,113,얼 그레이 바닐라 티 라떼,starbucks,"2가지 티(블랙티, 얼 그레이 티)가 조화롭게 어우러지고\n얼 그레이 폼과 바닐라의 풍미가 은은하게 퍼져 \n깔끔하고 부드러운 티 라떼 음료","6,100",https://image.istarbucks.co.kr/upload/store/skuimg/2023/01/[9200000004285]_20230118084943128.jpg,Tall(톨) / 355ml (12 fl oz),355,11,130,36,55,non-coffee,latte,hot,k_high,s_high,p_mid',
//         },
//         {
//           role: 'system',
//           content:
//             '114,1,114,제주 유기농 말차로 만든 라떼,starbucks,차광재배한 어린 녹찻잎을 곱게 갈아 깊고 진한 말차 본연의 맛과 향을\n부드럽게 즐길 수 있는 제주 유기농 말차로 만든 라떼,"6,100",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002496]_20210419131039350.jpg,Tall(톨) / 355ml (12 fl oz),205,5,130,20,60,non-coffee,latte,hot,k_mid,s_mid,p_mid',
//         },

//         {
//           role: 'system',
//           content:
//             '30,1,30,라벤더 카페 브레베,starbucks,진한 리저브 에스프레소 샷과 은은한 라벤더향이 고급스럽게 어우러진 부드럽고 세련된 풍미의 라벤더 카페 브레베,"7,000",https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000004119]_20220412083025862.png,Tall(톨) / 355ml (12 fl oz),400,22,140,30,105,coffee,latte,hot,k_high,s_high,p_high',
//         },
//       );
//       return messages;
//     }

//     if (userMessage.includes('마끼야또')) {
//       messages.push(
//         {
//           role: 'system',
//           content:
//             '25,1,25,아이스 카라멜 마키아또,starbucks,향긋한 바닐라 시럽과 시원한 우유와 얼음을 넣고 점을 찍듯이 에스프레소를 부은 후 벌집 모양으로 카라멜 드리즐을 올린 달콤한 커피 음료,"5,900",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110582]_20210415142706078.jpg,Tall(톨) / 355ml (12 fl oz),190,4.6,110,22,75,coffee,latte,ice,k_mid,s_mid,p_mid',
//         },
//         {
//           role: 'system',
//           content:
//             '26,1,26,카라멜 마키아또,starbucks,향긋한 바닐라 시럽과 따뜻한 스팀 밀크 위에 풍성한 우유 거품을 얹고 점을 찍듯이 에스프레소를 부은 후 벌집 모양으로 카라멜 드리즐을 올린 달콤한 커피 음료,"5,900",https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[126197]_20210415154609863.jpg,Tall(톨) / 355ml (12 fl oz),200,5,130,22,75,coffee,latte,hot,k_mid,s_mid,p_mid',
//         },
//       );
//       return messages;
//     }
//   }

//   return messages;
// };



// // Import 'data' from your data file
// import data from './data.json';

// // 데이터 검색 함수
// const searchDrinks = (searchKeyword) => {
//   return data.filter((drink) => {
//     // console.log(drink)
//     return (
//       drink.tag.includes(searchKeyword) || // 태그에서 검색
//       drink.name.toLowerCase().includes(searchKeyword.toLowerCase()) // 음료 이름에서 검색
//     );
//   });
// };

// // const searchDrinks = (searchKeyword) => {
// //   return data.filter((drink) => {
// //     console.log
// //     const lowerSearchKeyword = searchKeyword.toLowerCase();
// //     // 전부 비교하도록 수정
// //     return (
// //       drink.tag.includes(lowerSearchKeyword) ||
// //       drink.name.toLowerCase().includes(lowerSearchKeyword) ||
// //       drink.cafe.toLowerCase().includes(lowerSearchKeyword) ||
// //       drink.content.toLowerCase().includes(lowerSearchKeyword) ||
// //       drink.price.toLowerCase().includes(lowerSearchKeyword) ||
// //       drink.detail.volume.toLowerCase().includes(lowerSearchKeyword) ||
// //       drink.detail.kcal.toLowerCase().includes(lowerSearchKeyword) ||
// //       drink.detail.sat_FAT.toLowerCase().includes(lowerSearchKeyword) ||
// //       drink.detail.sodium.toLowerCase().includes(lowerSearchKeyword) ||
// //       drink.detail.sugars.toLowerCase().includes(lowerSearchKeyword) ||
// //       drink.detail.caffeine.toLowerCase().includes(lowerSearchKeyword) ||
// //       drink.tag[0].toLowerCase().includes(lowerSearchKeyword) ||
// //       drink.tag[1].toLowerCase().includes(lowerSearchKeyword) ||
// //       drink.tag[2].toLowerCase().includes(lowerSearchKeyword) ||
// //       drink.tag[3].toLowerCase().includes(lowerSearchKeyword) ||
// //       drink.tag[4].toLowerCase().includes(lowerSearchKeyword) ||
// //       drink.tag[5].toLowerCase().includes(lowerSearchKeyword)
// //     );
// //   });
// // };

// // 사용자 입력에서 태그 키워드 추출하는 함수
// const extractTagKeyword = (userInput) => {
//   // 여기에서 적절한 로직으로 사용자 입력에서 태그 키워드를 추출
//   // 예를 들어, "아이스 아메리카노"에서 "아이스" 추출
//   const tagKeywords = ['ice', 'hot', 'k_low', 'k_mid', 'k_high', 's_low', 's_mid', 's_high', 'p_low', 'p_mid', 'p_high'];

//   for (const keyword of tagKeywords) {
//     if (userInput.toLowerCase().includes(keyword)) {
//       return keyword;
//     }
//   }

//   // 기본값은 빈 문자열
//   return '';
// };

// // 메시지 생성 함수
// export const createCafeSpecificMessage = (cafeName, keyword) => {
//   let messages = [];

//   // 데이터에서 cafeName에 해당하는 데이터 가져오기
//   const cafeData = data[cafeName];



//   // 사용자가 요청한 키워드에 해당하는 음료를 검색
//   const filteredDrinks = searchDrinks(keyword);
//   console.log(filteredDrinks)

//   if (filteredDrinks.length > 0) {
//     // 검색된 음료 중에서 랜덤으로 하나 선택
//     const recommendedDrink = filteredDrinks[Math.floor(Math.random() * filteredDrinks.length)];

//     // 추천 음료에 대한 정보를 메시지로 추가
//     messages.push({
//       role: 'assistant',
//       content: `${recommendedDrink.id},${recommendedDrink.cafeid},${recommendedDrink.beverage},${recommendedDrink.name},${recommendedDrink.cafe},${recommendedDrink.content},"${recommendedDrink.price}",${recommendedDrink.image},${recommendedDrink.detail.volume},${recommendedDrink.detail.kcal},${recommendedDrink.detail.sat_FAT},${recommendedDrink.detail.sodium},${recommendedDrink.detail.sugars},${recommendedDrink.detail.caffeine},${recommendedDrink.tag[0]},${recommendedDrink.tag[1]},${recommendedDrink.tag[2]},${recommendedDrink.tag[3]},${recommendedDrink.tag[4]},${recommendedDrink.tag[5]}`,
//     });

//     // URL 생성 및 추가
//     const url = `http://localhost:3000/category/${recommendedDrink.cafe}/${recommendedDrink.cafeid}/${recommendedDrink.beverage}`;
//     messages.push({
//       role: 'assistant',
//       content: `추천 음료에 대한 더 자세한 정보는 [여기](${url})에서 확인하세요.`,
//     });

//     // 이미지 추가
//     messages.push({
//       role: 'assistant',
//       content: `메뉴 이미지: ${recommendedDrink.image}`,
//     });
//   } else {
//     // 검색 결과가 없을 경우에 대한 메시지 추가
//     messages.push({
//       role: 'assistant',
//       content: `죄송합니다. '${keyword}'에 대한 검색 결과가 없습니다.`,
//     });
//   }

//   return messages;
// };


// Import 'data' from your data file
import data from './data.json';
import Cafe from '../../models/cafe';

const searchDrinks = (searchKeyword, cafeData) => {
  console.log('searchKeyword:', searchKeyword);
  console.log('cafeData:', cafeData);

  if (!cafeData) {
    console.error('cafeData is undefined');
    return [];
  }

  return cafeData.filter((drink) => {
    return (
      drink.tag.includes(searchKeyword) || // 태그에서 검색
      drink.name.toLowerCase().includes(searchKeyword.toLowerCase()) // 음료 이름에서 검색
    );
  });
};

// 사용자 입력에서 태그 키워드 추출하는 함수
const extractTagKeyword = (userInput) => {
  const tagKeywords = ['ice', 'hot', 'k_low', 'k_mid', 'k_high', 's_low', 's_mid', 's_high', 'p_low', 'p_mid', 'p_high'];

  for (const keyword of tagKeywords) {
    if (userInput.toLowerCase().includes(keyword)) {
      return keyword;
    }
  }

  return '';
};

// 메시지 생성 함수
export const createCafeSpecificMessage = (cafeName, userInput) => {
  let messages = [];

  // 데이터에서 cafeName에 해당하는 데이터 가져오기
  // console.log(data);
  let cafeData;

  for (let i = 0; i < data.length; i++) {
    if (data[i].cafe === cafeName) {
      cafeData = data[i].items;
      break;
    }
  }



  // console.log(cafeData);

  // 사용자가 요청한 키워드에 해당하는 음료를 검색
  const tagKeyword = extractTagKeyword(userInput);
  const filteredDrinks = searchDrinks(tagKeyword, cafeData); // cafeData를 넘겨줌

  if (filteredDrinks.length > 0) {
    // 필터링된 음료 중에서 랜덤으로 하나 선택
    const recommendedDrink =
      filteredDrinks[Math.floor(Math.random() * filteredDrinks.length)];

    console.log(recommendedDrink);

    // 추천 음료에 대한 정보를 메시지로 추가
    messages.push({
      role: 'assistant',
      content: `${recommendedDrink.id},${recommendedDrink.cafeid},${recommendedDrink.beverage},${recommendedDrink.name},${recommendedDrink.cafe},${recommendedDrink.content},"${recommendedDrink.price}",${recommendedDrink.image},${recommendedDrink.detail.volume},${recommendedDrink.detail.kcal},${recommendedDrink.detail.sat_FAT},${recommendedDrink.detail.sodium},${recommendedDrink.detail.sugars},${recommendedDrink.detail.caffeine},${recommendedDrink.tag[0]},${recommendedDrink.tag[1]},${recommendedDrink.tag[2]},${recommendedDrink.tag[3]},${recommendedDrink.tag[4]},${recommendedDrink.tag[5]}`,
    });

    // URL 생성 및 추가
    const url = `http://localhost:3000/category/${recommendedDrink.cafe}/${recommendedDrink.cafeid}/${recommendedDrink.beverage}`;
    messages.push({
      role: 'assistant',
      content: `추천 음료에 대한 더 자세한 정보는 [여기](${url})에서 확인하세요.`,
    });

    // 이미지 추가
    messages.push({
      role: 'assistant',
      content: `메뉴 이미지: ${recommendedDrink.image}`,
    });
  } else {
    // 검색 결과가 없을 경우에 대한 메시지 추가
    messages.push({
      role: 'assistant',
      content: `죄송합니다. '${tagKeyword}'에 대한 검색 결과가 없습니다.`,
    });
  }

  return messages;
};

