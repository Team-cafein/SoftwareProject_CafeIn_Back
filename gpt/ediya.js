export const createEdiyaMessage = (keyword) => {
  let messages = [];

  if (keyword === "아메리카노") {
    messages.push(
      {
        role: "system",
        content:
          '196,2,57,ICED 콜드브루 아메리카노,ediya,"이디야만의 블렌딩을 통해 커피의 깊은 단맛과 바디감, 균형잡힌 밸런스를 느낄 수 있는 시원한 콜드브루 커피","3,900",https://ediya.com/files/menu/IMG_1647320805422.png,,(12kcal),(0g),(0mg),(0g),(104mg),coffee,ice,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '240,2,101,(EX) ICED 카페 아메리카노,ediya,구운 견과류의 고소한 향미와 다크초콜렛의 Bitter sweet 깊고 깔끔한 애프터테이스트가 특징인 이디야의 대표음료,"4,200",https://ediya.com/files/menu/IMG_1647321147600.png,,(24kcal),(0.1g),(0mg),(0g),(348mg),coffee,ice,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '198,2,59,ICED 디카페인 콜드브루 아메리카노,ediya,"(디카페인)이디야만의 블렌딩을 통해 커피의 깊은 단맛과 바디감,균형잡힌 밸런스를 느낄 수 있는 시원한 콜드브루 커피 ","4,200g",https://ediya.com/files/menu/IMG_1647320328440.png,,(7kcal),(0g),(1mg),(0g),(4mg),coffee,ice,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '199,2,60,(EX) ICED 디카페인 콜드브루 아메리카노,ediya,"(디카페인)이디야만의 블렌딩을 통해 커피의 깊은 단맛과 바디감,균형잡힌 밸런스를 느낄 수 있는 시원한 콜드브루 커피 ","5,200",https://ediya.com/files/menu/IMG_1648685292664.png,,(11kcal),(0g),(1mg),(0g),(11mg),coffee,ice,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '237,2,98,(L) HOT 카페 아메리카노,ediya,구운 견과류의 고소한 향미와 다크초콜렛의 Bitter sweet 깊고 깔끔한 애프터테이스트가 특징인 이디야의 대표음료,"3,200",https://ediya.com/files/menu/IMG_1671581625569.png,,(16kcal),(0.1g),(0mg),(0g),(232mg),coffee,hot,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '239,2,100,(EX) HOT 카페 아메리카노,ediya,구운 견과류의 고소한 향미와 다크초콜렛의 Bitter sweet 깊고 깔끔한 애프터테이스트가 특징인 이디야의 대표음료,"4,200",https://ediya.com/files/menu/IMG_1647321162101.png,,(24kcal),(0.1g),(0mg),(0g),(348mg),coffee,hot,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '197,2,58,(EX) ICED 콜드브루 아메리카노,ediya,"이디야만의 블렌딩을 통해 커피의 깊은 단맛과 바디감, 균형잡힌 밸런스를 느낄 수 있는 시원한 콜드브루 커피","4,900",https://ediya.com/files/menu/IMG_1647320820317.png,,(18kcal),(0g),(0mg),(0g),(155mg),coffee,ice,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '238,2,99,(L) ICED 카페 아메리카노,ediya,구운 견과류의 고소한 향미와 다크초콜렛의 Bitter sweet 깊고 깔끔한 애프터테이스트가 특징인 이디야의 대표음료,"3,200",https://ediya.com/files/menu/IMG_1671581786293.png,,(16kcal),(0.1g),(0mg),(0g),(232mg),coffee,ice,k_low,s_low,p_mid',
      }
    );
    return messages;
  }

  if (keyword === "콜드브루") {
    messages.push(
      {
        role: "system",
        content:
          '196,2,57,ICED 콜드브루 아메리카노,ediya,"이디야만의 블렌딩을 통해 커피의 깊은 단맛과 바디감, 균형잡힌 밸런스를 느낄 수 있는 시원한 콜드브루 커피","3,900",https://ediya.com/files/menu/IMG_1647320805422.png,,(12kcal),(0g),(0mg),(0g),(104mg),coffee,ice,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '200,2,61,ICED 디카페인 콜드브루 라떼,ediya,(디카페인)콜드브루의 깔끔하고 쌉싸름한 풍미가 고소한 우유와 만나 누구나 부담없이 즐길 수 있는 음료,"4,800",https://ediya.com/files/menu/IMG_1647320345410.png,,(130kcal),(4.4g),(96mg),(10g),(4mg),coffee,latte,ice,k_mid,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '205,2,66,ICED 디카페인 콜드브루 니트로,ediya,"(디카페인)이디야커피만의 질소투입방식을 통해 신선하고 부드러운 거품과 목넘김, 풍미를 느낄 수 있는 커피 ","4,200",https://ediya.com/files/menu/IMG_1647320389669.png,,(9kcal),(0g),(0mg),(0g),(4mg),coffee,ice,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '209,2,70,(EX) ICED 디카페인 흑당 콜드브루,ediya,(디카페인) 이디야 밸런스 잡힌 콜드브루에 진하고 달콤한 흑당과 고소한 우유가 어우러진 커피음료,"5,700",https://ediya.com/files/menu/IMG_1647320424871.png,,(380kcal),(7g),(153mg),(60g),(4mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '225,2,86,ICED 연유 콜드브루,ediya,베트남풍 연유의 달콤한 맛과 밸런스 잡힌 이디야 콜드브루가 어우러져 특색있게 즐길 수 있는 음료,"4,700",https://ediya.com/files/menu/IMG_1647320780643.png,,(282kcal),(5g),(116mg),(37g),(104mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '198,2,59,ICED 디카페인 콜드브루 아메리카노,ediya,"(디카페인)이디야만의 블렌딩을 통해 커피의 깊은 단맛과 바디감,균형잡힌 밸런스를 느낄 수 있는 시원한 콜드브루 커피 ","4,200g",https://ediya.com/files/menu/IMG_1647320328440.png,,(7kcal),(0g),(1mg),(0g),(4mg),coffee,ice,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '199,2,60,(EX) ICED 디카페인 콜드브루 아메리카노,ediya,"(디카페인)이디야만의 블렌딩을 통해 커피의 깊은 단맛과 바디감,균형잡힌 밸런스를 느낄 수 있는 시원한 콜드브루 커피 ","5,200",https://ediya.com/files/menu/IMG_1648685292664.png,,(11kcal),(0g),(1mg),(0g),(11mg),coffee,ice,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '211,2,72,(EX) ICED 디카페인 연유 콜드브루,ediya,(디카페인) 베트남풍 연유의 달콤한 맛과 밸런스 잡힌 이디야 콜드브루가 어우러져 특색있게 즐길 수 있는 음료,"6,200",https://ediya.com/files/menu/IMG_1647320633102.png,,(445kcal),(5g),(197mg),(58g),(9mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '212,2,73,ICED 디카페인 버블 흑당 콜드브루,ediya,(디카페인) 이디야 밸런스 잡힌 콜드브루에 진하고 달콤한 흑당과 고소한 우유가 어우러진 커피음료,"5,000",https://ediya.com/files/menu/IMG_1647324449408.png,,(237kcal),(4g),(93mg),(38g),(2mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '165,2,26,ICED 바닐라 오트 콜드브루,ediya,오트의 고소함과 부드러운 바닐라 크림이 콜드브루와 어우러져 담백하게 즐길 수 있는 음료,"5,200",https://ediya.com/files/menu/IMG_1678753103297.png,,(206kcal),(4.4g),(151mg),(16g),(78mg),coffee,latte,ice,k_mid,s_mid,p_mid',
      },
      {
        role: "system",
        content:
          '166,2,27,ICED 디카페인 바닐라 오트 콜드브루,ediya,오트의 고소함과 부드러운 바닐라 크림이 콜드브루와 어우러져 담백하게 즐길 수 있는 음료,"6,300",https://ediya.com/files/menu/IMG_1678753482451.png,,(205kcal),(4.4g),(151mg),(16g),(2mg),non-coffee,latte,ice,k_mid,s_mid,p_mid',
      },
      {
        role: "system",
        content:
          '197,2,58,(EX) ICED 콜드브루 아메리카노,ediya,"이디야만의 블렌딩을 통해 커피의 깊은 단맛과 바디감, 균형잡힌 밸런스를 느낄 수 있는 시원한 콜드브루 커피","4,900",https://ediya.com/files/menu/IMG_1647320820317.png,,(18kcal),(0g),(0mg),(0g),(155mg),coffee,ice,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '201,2,62,(EX) ICED 디카페인 콜드브루 라떼,ediya,(디카페인)콜드브루의 깔끔하고 쌉싸름한 풍미가 고소한 우유와 만나 누구나 부담없이 즐길 수 있는 음료,"6,000",https://ediya.com/files/menu/IMG_1647320357663.png,,(211kcal),(7g),(156mg),(16g),(5mg),coffee,latte,ice,k_mid,smoothie,p_mid',
      },
      {
        role: "system",
        content:
          '202,2,63,ICED 콜드브루 라떼,ediya,콜드브루의 깔끔하고 쌉싸름한 풍미가 고소한 우유와 만나 누구나 부담없이 즐길 수 있는 음료,"4,500",https://ediya.com/files/menu/IMG_1647320848557.png,,(134kcal),(4.4g),(95mg),(10g),(104mg),coffee,latte,ice,k_mid,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '203,2,64,(EX) ICED 콜드브루 라떼,ediya,콜드브루의 깔끔하고 쌉싸름한 풍미가 고소한 우유와 만나 누구나 부담없이 즐길 수 있는 음료,"5,700",https://ediya.com/files/menu/IMG_1647320836186.png,,(218kcal),(7g),(155mg),(16g),(155mg),coffee,latte,ice,k_mid,smoothie,p_mid',
      },
      {
        role: "system",
        content:
          '206,2,67,ICED 콜드브루 화이트 비엔나,ediya,"달콤한 크림과 화이트 초콜릿향, 아이리쉬크림향이 더해져 콜드브루의 풍미가 잘 어우러진 음료","4,900",https://ediya.com/files/menu/IMG_1647320860534.png,,(267kcal),(8g),(120mg),(32g),(52mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '207,2,68,ICED 디카페인 콜드브루 화이트 비엔나,ediya,"(디카페인)달콤한 크림과 화이트 초콜릿향, 아이리쉬크림향이 더해져 콜드브루의 풍미가 잘 어우러진 음료","5,200",https://ediya.com/files/menu/IMG_1647320378419.png,,(265kcal),(8g),(121mg),(32g),(2mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '213,2,74,(EX) ICED 디카페인 버블 흑당 콜드브루,ediya,(디카페인) 이디야 밸런스 잡힌 콜드브루에 진하고 달콤한 흑당과 고소한 우유가 어우러진 커피음료,"6,200",https://ediya.com/files/menu/IMG_1647324439469.png,,(380kcal),(7g),(153mg),(60g),(4mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '216,2,77,ICED 흑당 콜드브루,ediya,이디야의 밸런스 잡힌 콜드브루에 진하고 달콤한 흑당과 고소한 우유가 어우러진 커피음료,"4,200",https://ediya.com/files/menu/IMG_1647320738273.png,,(239kcal),(4g),(93mg),(38g),(52mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '204,2,65,ICED 콜드브루 니트로,ediya,"이디야커피만의 질소투입방식을 통해 신선하고 부드러운 거품과 목넘김, 풍미를 느낄 수 있는 커피 ","3,900",https://ediya.com/files/menu/IMG_1647320870899.png,,(14kcal),(0g),(0mg),(0g),(124mg),coffee,ice,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '208,2,69,ICED 디카페인 흑당 콜드브루,ediya,(디카페인) 이디야 밸런스 잡힌 콜드브루에 진하고 달콤한 흑당과 고소한 우유가 어우러진 커피음료,"4,500",https://ediya.com/files/menu/IMG_1647320406434.png,,(237kcal),(4g),(93mg),(38g),(2mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '210,2,71,ICED 디카페인 연유 콜드브루,ediya,(디카페인) 베트남풍 연유의 달콤한 맛과 밸런스 잡힌 이디야 콜드브루가 어우러져 특색있게 즐길 수 있는 음료,"5,000",https://ediya.com/files/menu/IMG_1647387558230.png,,(278kcal),(5g),(116mg),(37g),(4mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '217,2,78,(EX) ICED 흑당 콜드브루,ediya,이디야의 밸런스 잡힌 콜드브루에 진하고 달콤한 흑당과 고소한 우유가 어우러진 커피음료,"5,700",https://ediya.com/files/menu/IMG_1647320749119.png,,(385kcal),(7g),(152mg),(60g),(104mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '226,2,87,(EX) ICED 연유 콜드브루,ediya,베트남풍 연유의 달콤한 맛과 밸런스 잡힌 이디야 콜드브루가 어우러져 특색있게 즐길 수 있는 음료,"5,900",https://ediya.com/files/menu/IMG_1647320793322.png,,(452kcal),(9g),(196mg),(58g),(155mg),coffee,latte,ice,k_high,s_high,p_mid',
      }
    );
    return messages;
  }

  if (keyword === "에스프레소") {
    messages.push(
      {
        role: "system",
        content:
          '235,2,96,HOT 에스프레소 마끼아또,ediya,진한 에스프레소 위의 부드러운 우유 거품이 조화를 이뤄 에스프레소를 부드럽게 느낄 수 있는 커피,"3,200",https://ediya.com/files/menu/IMG_1511503315349.png,,(14kcal),(0.3g),(5mg),(1g),(116mg),coffee,hot,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '236,2,97,HOT 에스프레소 콘파냐,ediya,진한 에스프레소 위에 달콤한 휘핑을 더한 음료로 에스프레소를 달콤하게 즐길 수 있는 커피,"3,200",https://ediya.com/files/menu/IMG_1511503304139.png,,(47kcal),(3.4g),(8mg),(2g),(116mg),coffee,hot,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '234,2,95,HOT 에스프레소,ediya,정통 이탈리안 방식으로 고압을 이용하여 빠르게 추출된 커피 이디야의 모든 음료의 기본,"2,900",https://ediya.com/files/menu/IMG_1647320254869.png,,(8kcal),(0g),(0mg),(0g),(116mg),coffee,hot,k_low,s_low,p_low',
      }
    );
    return messages;
  }

  if (keyword === "라떼") {
    messages.push(
      {
        role: "system",
        content:
          '194,2,55,ICED 달고나 라떼,ediya,"달콤한 달고나와 우유가 조화롭게 어우러져, 달고나 분태의 바삭한 식감과 함께 즐길 수 있는 제품  ","3,700",https://ediya.com/files/menu/IMG_1647321929656.png,,(286kcal),(4.4g),(224mg),(41g),,non-coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '200,2,61,ICED 디카페인 콜드브루 라떼,ediya,(디카페인)콜드브루의 깔끔하고 쌉싸름한 풍미가 고소한 우유와 만나 누구나 부담없이 즐길 수 있는 음료,"4,800",https://ediya.com/files/menu/IMG_1647320345410.png,,(130kcal),(4.4g),(96mg),(10g),(4mg),coffee,latte,ice,k_mid,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '214,2,75,ICED 흑당 라떼,ediya,진하고 달콤한 흑당과 고소한 우유가 어우러진 논커피 음료,"3,700",https://ediya.com/files/menu/IMG_1647322011235.png,,(233kcal),(4g),(93mg),(38g),,non-coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '215,2,76,(EX) ICED 흑당 라떼,ediya,진하고 달콤한 흑당과 고소한 우유가 어우러진 논커피 음료,"4,900",https://ediya.com/files/menu/IMG_1647322029671.png,,(373kcal),(7g),(152mg),(60g),,non-coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '244,2,105,(EX) ICED 카페 라떼,ediya,진한 에스프레소와 부드러운 우유가 만나 고소한 풍미를 더하는 메뉴 가장 대중적인 메뉴,"5,400",https://ediya.com/files/menu/IMG_1645073339534.png,,(182kcal),(6g),(123mg),(12g),(348mg),coffee,latte,ice,k_mid,s_mid,p_mid',
      },
      {
        role: "system",
        content:
          '256,2,117,(L) ICED 바닐라 라떼,ediya,부드러운 라떼에 은은한 바닐라 향이 더해져 더욱 달콤하게 즐길 수 있는 음료,"4,500",https://ediya.com/files/menu/IMG_1671583414313.png,,(245kcal),(6g),(141mg),(25g),(274mg),coffee,latte,ice,k_high,s_mid,p_mid',
      },
      {
        role: "system",
        content:
          '275,2,136,HOT 12곡 라떼,ediya,"몸에 이로운 곡물이 들어가 든든하고 포만감을 주는 메뉴, 한끼 식사 대용으로도 충분한 음료","3,700",https://ediya.com/files/menu/IMG_1647322114515.png,,(290kcal),(6g),(136mg),(26g),,non-coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '276,2,137,ICED 12곡 라떼,ediya,"몸에 이로운 곡물이 들어가 든든하고 포만감을 주는 메뉴, 한끼 식사 대용으로도 충분한 음료","3,700",https://ediya.com/files/menu/IMG_1647322107601.png,,(239kcal),(4.6g),(96mg),(22g),,non-coffee,latte,ice,k_mid,s_mid,p_mid',
      },
      {
        role: "system",
        content:
          '277,2,138,HOT 고구마 라떼,ediya,호박고구마를 활용하여 달콤하고 고소한 고구마의 풍미가 진하게 느껴지는 음료,"4,200",https://ediya.com/files/menu/IMG_1647322145592.png,,(344kcal),(5g),(110mg),(37g),,non-coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '147,2,8,(EX) HOT 토피넛 라떼,ediya,고소한 아몬드의 맛과 달콤한 코코아가 조화롭게 어우러진 달콤한 음료,"5,400",https://ediya.com/files/menu/IMG_1694414794668.png,,(485kcal),(12g),(359mg),(56g),(33mg),coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '149,2,10,(EX) ICED 토피넛 라떼,ediya,고소한 아몬드의 맛과 달콤한 코코아가 조화롭게 어우러진 달콤한 음료,"5,400",https://ediya.com/files/menu/IMG_1694415549864.png,,(350kcal),(7g),(254mg),(45g),(33mg),coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '167,2,28,(L) ICED 넛츠 크림 라떼,ediya,"부드러운 크림과 에스프레소, 너티 플레이버가 어우러져 만들어진 완벽한 한 잔의 라떼","4,700",https://ediya.com/files/menu/IMG_1671587873712.png,,(429kcal),(14g),(308mg),(51g),(232mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '221,2,82,(L) HOT 연유 카페 라떼,ediya,베트남풍 연유의 달콤한 맛과 에스프레소가 절묘하게 어우러져 누구나 쉽게 즐길 수 있는 부드러운 커피 음료,"4,500",https://ediya.com/files/menu/IMG_1671584792635.png,,(386kcal),(8g),(169mg),(49g),(232mg),coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '222,2,83,(L) ICED 연유 카페 라떼,ediya,베트남풍 연유의 달콤한 맛과 에스프레소가 절묘하게 어우러져 누구나 쉽게 즐길 수 있는 부드러운 커피 음료,"4,500",https://ediya.com/files/menu/IMG_1671585023298.png,,(354kcal),(7g),(144mg),(46g),(7mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '223,2,84,(EX) HOT 연유 카페 라떼,ediya,베트남풍 연유의 달콤한 맛과 에스프레소가 절묘하게 어우러져 누구나 쉽게 즐길 수 있는 부드러운 커피 음료,"5,700",https://ediya.com/files/menu/IMG_1647324689152.png,,(601kcal),(12g),(253mg),(78g),(348mg),coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '255,2,116,(L) HOT 바닐라 라떼,ediya,부드러운 라떼에 은은한 바닐라 향이 더해져 더욱 달콤하게 즐길 수 있는 음료,"4,500",https://ediya.com/files/menu/IMG_1671583442731.png,,(303kcal),(8g),(186mg),(29g),(274mg),coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '146,2,7,HOT 토피넛 라떼,ediya,고소한 아몬드의 맛과 달콤한 코코아가 조화롭게 어우러진 달콤한 음료,"4,200",https://ediya.com/files/menu/IMG_1694414812893.png,,(273kcal),(6g),(200mg),(33g),,coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '150,2,11,ICED 버블 블랙 토피넛 라떼,ediya,고소하고 달콤한 토피넛 베이스에 흑당과 쫄깃한 버블이 어우러진 논커피 음료,"4,700",https://ediya.com/files/menu/IMG_1694415913321.png,,(327kcal),(3.7g),(130mg),(36g),(11mg),non-coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '163,2,24,ICED 딸기 듬뿍 라떼,ediya,달콤한 딸기의 식감과 상큼함을 듬뿍 담은 딸기 라떼,"3,700",https://ediya.com/files/menu/IMG_1672618018525.png,,(217kcal),(3.4g),(74mg),(28g),,non-coffee,latte,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '201,2,62,(EX) ICED 디카페인 콜드브루 라떼,ediya,(디카페인)콜드브루의 깔끔하고 쌉싸름한 풍미가 고소한 우유와 만나 누구나 부담없이 즐길 수 있는 음료,"6,000",https://ediya.com/files/menu/IMG_1647320357663.png,,(211kcal),(7g),(156mg),(16g),(5mg),coffee,latte,ice,k_mid,smoothie,p_mid',
      },
      {
        role: "system",
        content:
          '202,2,63,ICED 콜드브루 라떼,ediya,콜드브루의 깔끔하고 쌉싸름한 풍미가 고소한 우유와 만나 누구나 부담없이 즐길 수 있는 음료,"4,500",https://ediya.com/files/menu/IMG_1647320848557.png,,(134kcal),(4.4g),(95mg),(10g),(104mg),coffee,latte,ice,k_mid,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '203,2,64,(EX) ICED 콜드브루 라떼,ediya,콜드브루의 깔끔하고 쌉싸름한 풍미가 고소한 우유와 만나 누구나 부담없이 즐길 수 있는 음료,"5,700",https://ediya.com/files/menu/IMG_1647320836186.png,,(218kcal),(7g),(155mg),(16g),(155mg),coffee,latte,ice,k_mid,smoothie,p_mid',
      },
      {
        role: "system",
        content:
          '218,2,79,ICED 버블 흑당 라떼,ediya,진하고 달콤한 흑당에 쫄깃한 버블이 어우러진 논커피 음료,"4,700",https://ediya.com/files/menu/IMG_1647324429590.png,,(308kcal),(3.3g),(91mg),(35g),,coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '219,2,80,(EX) ICED 버블 흑당 라떼,ediya,진하고 달콤한 흑당에 쫄깃한 버블이 어우러진 논커피 음료,"5,900",https://ediya.com/files/menu/IMG_1647324410367.png,,(588kcal),(7g),(180mg),(63g),,coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '241,2,102,(L) HOT 카페 라떼,ediya,진한 에스프레소와 부드러운 우유가 만나 고소한 풍미를 더하는 메뉴 가장 대중적인 메뉴,"4,200",https://ediya.com/files/menu/IMG_1671582054147.png,,(203kcal),(7g),(145mg),(15g),(232mg),coffee,latte,hot,k_mid,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '257,2,118,(EX) HOT 바닐라 라떼,ediya,부드러운 라떼에 은은한 바닐라 향이 더해져 더욱 달콤하게 즐길 수 있는 음료,"5,700",https://ediya.com/files/menu/IMG_1647321057747.png,,(476kcal),(11g),(278mg),(49g),(423mg),coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '269,2,130,HOT 녹차 라떼,ediya,녹차에 우유가 더해져 부담없이 즐길 수 있는 음료,"3,900",https://ediya.com/files/menu/IMG_1647321755481.png,,(252kcal),(6g),(151mg),(30g),(55mg),non-coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '271,2,132,(EX) HOT 녹차 라떼,ediya,녹차에 우유가 더해져 부담없이 즐길 수 있는 음료,"5,100",https://ediya.com/files/menu/IMG_1647321791414.png,,(466kcal),(11g),(271mg),(57g),(110mg),non-coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '272,2,133,(EX) ICED 녹차 라떼,ediya,녹차에 우유가 더해져 부담없이 즐길 수 있는 음료,"5,100",https://ediya.com/files/menu/IMG_1647321773757.png,,(337kcal),(7g),(171mg),(47g),(110mg),non-coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '148,2,9,ICED 토피넛 라떼,ediya,고소한 아몬드의 맛과 달콤한 코코아가 조화롭게 어우러진 달콤한 음료,"4,200",https://ediya.com/files/menu/IMG_1694414746800.png,,(222kcal),(4.4g),(160mg),(29g),(22mg),coffee,latte,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '164,2,25,(EX) 딸기 듬뿍 라떼,ediya,달콤한 딸기의 식감과 상큼함을 듬뿍 담은 딸기 라떼,"5,100",https://ediya.com/files/menu/IMG_1672618812774.png,,(290kcal),(4.7g),(102mg),(35g),,non-coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '195,2,56,(EX) ICED 달고나 라떼,ediya,"달콤한 달고나와 우유가 조화롭게 어우러져, 달고나 분태의 바삭한 식감과 함께 즐길 수 있는 제품  ","4,900",https://ediya.com/files/menu/IMG_1647321941152.png,,(429kcal),(7g),(284mg),(61g),,non-coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '224,2,85,(EX) ICED 연유 카페 라떼,ediya,베트남풍 연유의 달콤한 맛과 에스프레소가 절묘하게 어우러져 누구나 쉽게 즐길 수 있는 부드러운 커피 음료,"5,700",https://ediya.com/files/menu/IMG_1647324719307.png,,(530kcal),(9g),(198mg),(72g),(348mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '242,2,103,(L) ICED 카페 라떼,ediya,진한 에스프레소와 부드러운 우유가 만나 고소한 풍미를 더하는 메뉴 가장 대중적인 메뉴,"4,200",https://ediya.com/files/menu/IMG_1671582134737.png,,(142kcal),(4.6g),(98mg),(10g),232,coffee,latte,ice,k_mid,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '243,2,104,(EX) HOT 카페 라떼,ediya,진한 에스프레소와 부드러운 우유가 만나 고소한 풍미를 더하는 메뉴 가장 대중적인 메뉴,"5,400",https://ediya.com/files/menu/IMG_1645073265123.png,,(288kcal),(10g),(205mg),(21g),(348mg),coffee,latte,hot,k_high,s_mid,p_mid',
      },
      {
        role: "system",
        content:
          '258,2,119,(EX) ICED 바닐라 라떼,ediya,부드러운 라떼에 은은한 바닐라 향이 더해져 더욱 달콤하게 즐길 수 있는 음료,"5,700",https://ediya.com/files/menu/IMG_1647321034823.png,,(386kcal),(8g),(208mg),(42g),(432mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '270,2,131,ICED 녹차 라떼,ediya,녹차에 우유가 더해져 부담없이 즐길 수 있는 음료,"3,900",https://ediya.com/files/menu/IMG_1647321741180.png,,(191kcal),(4g),(103mg),(25g),(55mg),non-coffee,latte,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '278,2,139,ICED 고구마 라떼,ediya,호박고구마를 활용하여 달콤하고 고소한 고구마의 풍미가 진하게 느껴지는 음료,"4,200",https://ediya.com/files/menu/IMG_1647322131838.png,,(344kcal),(5g),(110mg),(37g),,non-coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '286,2,147,HOT 밀크티,ediya,잉글리시 브랙퍼스트와 바닐라향이 어우러져 따뜻한 우유에 은은하게 퍼지는 향이 돋보이는 음료,"4,200",https://ediya.com/files/menu/IMG_1647322607583.png,,(232kcal),(6g),(136mg),(25g),(49mg),non-coffee,latte,hot,k_mid,s_mid,p_mid',
      },
      {
        role: "system",
        content:
          '245,2,106,(L) HOT 카푸치노,ediya,"에스프레소에 부드러운 우유 거품을 풍부하게 올린 음료, 시나몬파우더가 첨가되어 강렬한 향과 커피의 풍부함을 즐길 수 있는 음료","4,200",https://ediya.com/files/menu/IMG_1671582405654.png,,(129kcal),(4g),(232mg),(9g),(86mg),coffee,latte,hot,k_mid,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '245,2,106,(L) HOT 카푸치노,ediya,"에스프레소에 부드러운 우유 거품을 풍부하게 올린 음료, 시나몬파우더가 첨가되어 강렬한 향과 커피의 풍부함을 즐길 수 있는 음료","4,200",https://ediya.com/files/menu/IMG_1671582405654.png,,(129kcal),(4g),(232mg),(9g),(86mg),coffee,latte,hot,k_mid,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '247,2,108,(L) HOT 카페 모카,ediya,모카시럽을 만나 한층 풍부해진 에스프레소에 우유로 부드러움을 더한 달콤한 휘핑크림이 곁들여진 음료,"4,500",https://ediya.com/files/menu/IMG_1671586052246.png,,(424kcal),(18g),(201mg),(38g),(245mg),coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '249,2,110,(EX) HOT 카페 모카,ediya,모카시럽을 만나 한층 풍부해진 에스프레소에 우유로 부드러움을 더한 달콤한 휘핑크림이 곁들여진 음료,"5,700",https://ediya.com/files/menu/IMG_1645073368848.png,,(530kcal),(21g),(263mg),(49g),(365mg),coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '248,2,109,(L) ICED 카페 모카,ediya,모카시럽을 만나 한층 풍부해진 에스프레소에 우유로 부드러움을 더한 달콤한 휘핑크림이 곁들여진 음료,"4,500",https://ediya.com/files/menu/IMG_1671586141487.png,,(353kcal),(16g),(146mg),(35g),(245mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '250,2,111,(EX) ICED 카페 모카,ediya,모카시럽을 만나 한층 풍부해진 에스프레소에 우유로 부드러움을 더한 달콤한 휘핑크림이 곁들여진 음료,"5,700",https://ediya.com/files/menu/IMG_1645073377193.png,,(450kcal),(20g),(178mg),(42g),(365mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '287,2,148,ICED 밀크티,ediya,잉글리시 브랙퍼스트와 바닐라향이 어우러져 따뜻한 우유에 은은하게 퍼지는 향이 돋보이는 음료,"4,200",https://ediya.com/files/menu/IMG_1647322590353.png,,(167kcal),(3.9g),(86mg),(20g),(49mg),non-coffee,latte,ice,k_mid,s_mid,p_mid',
      },
      {
        role: "system",
        content:
          '267,2,128,(EX) HOT 초콜릿,ediya,"진한 모카시럽과 부드러운 우유, 그리고 달콤한 휘핑크림의 삼박자가 조화를 이루는 음료","5,100",https://ediya.com/files/menu/IMG_1647321860843.png,,(540kcal),(22g),(285mg),(53g),(17mg),non-coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '273,2,134,HOT 민트 초콜릿,ediya,상쾌한 민트향이 가득한 진한 초콜렛 위에 달콤한 휘핑크림으로 마무리 한 이디야의 인기메뉴,"4,200",https://ediya.com/files/menu/IMG_1647321892161.png,,(397kcal),(19g),(203g),(34g),(23mg),non-coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '151,2,12,HOT 토피넛 쇼콜라,ediya,"초콜릿과 토피넛에 부드러운 연유가 더해져 더욱 풍부한 맛을 느낄 수 있으며, 달콤한 휘핑크림과 초콜릿 칩을 즐길 수 있는 음료 ","5,900",https://ediya.com/files/menu/IMG_1694416098636.png,,(443kcal),(19g),(209mg),(48g),(18mg,non-coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '152,2,13,ICED 토피넛 쇼콜라,ediya,"초콜릿과 토피넛에 부드러운 연유가 더해져 더욱 풍부한 맛을 느낄 수 있으며, 달콤한 휘핑크림과 초콜릿 칩을 즐길 수 있는 음료 ","4,700",https://ediya.com/files/menu/IMG_1694416381789.png,,(388kcal),(17g),(167mg),(40g),(18mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '268,2,129,(EX) ICED 초콜릿,ediya,"진한 모카시럽과 부드러운 우유, 그리고 달콤한 휘핑크림의 삼박자가 조화를 이루는 음료","5,100",https://ediya.com/files/menu/IMG_1647321840843.png,,(481kcal),(21g),(214mg),(47g),(18mg),non-coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '274,2,135,ICED 민트 초콜릿,ediya,상쾌한 민트향이 가득한 진한 초콜렛 위에 달콤한 휘핑크림으로 마무리 한 이디야의 인기메뉴,"4,200",https://ediya.com/files/menu/IMG_1647321879153.png,,(342kcal),(17g),(160mg),(30g),(23mg),non-coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '263,2,124,(EX) ICED 화이트 초콜릿 모카,ediya,화이트 초콜렛과 에스프레소의 조화로운 만남에 달콤한 휘핑크림까지 함께 즐길 수 있는 음료,"5,700",https://ediya.com/files/menu/IMG_1647321347859.png,,(515kcal),(20g),(149mg),(54g),(348mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '265,2,126,HOT 초콜릿,ediya,"진한 모카시럽과 부드러운 우유, 그리고 달콤한 휘핑크림의 삼박자가 조화를 이루는 음료","3,900",https://ediya.com/files/menu/IMG_1647321825736.png,,(376kcal),(18g),(186mg),(33g),(9mg),non-coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '259,2,120,(L) HOT 화이트 초콜릿 모카,ediya,화이트 초콜렛과 에스프레소의 조화로운 만남에 달콤한 휘핑크림까지 함께 즐길 수 있는 음료,"4,500",https://ediya.com/files/menu/IMG_1671587353689.png,,(420kcal),(18g),(159mg),(40g),(232mg),coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '260,2,121,(L) ICED 화이트 초콜릿 모카,ediya,화이트 초콜렛과 에스프레소의 조화로운 만남에 달콤한 휘핑크림까지 함께 즐길 수 있는 음료,"4,500",https://ediya.com/files/menu/IMG_1671587593517.png,,(326kcal),(16g),(114mg),(35g),(232mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '261,2,122,(EX) HOT 화이트 초콜릿 모카,ediya,화이트 초콜렛과 에스프레소의 조화로운 만남에 달콤한 휘핑크림까지 함께 즐길 수 있는 음료,"5,700",https://ediya.com/files/menu/IMG_1647321390212.png,,(588kcal),(21g),(229mg),(61g),(348mg),coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '266,2,127,ICED 초콜릿,ediya,"진한 모카시럽과 부드러운 우유, 그리고 달콤한 휘핑크림의 삼박자가 조화를 이루는 음료","3,900",https://ediya.com/files/menu/IMG_1647321814289.png,,(318kcal),(16g),(141mg),(28g),(9mg),non-coffee,latte,ice,k_high,s_high,p_mid',
      }
    );
    return messages;
  }

  if (userMessage.includes("마끼아또")) {
    messages.push(
      {
        role: "system",
        content:
          '251,2,112,(L) HOT 카라멜 마끼아또,ediya,폼 밀크 속에 감춰진 카라멜의 달콤함과 에스프레소의 진한 맛이 돋보이는 이디야의 인기 메뉴,"4,500",https://ediya.com/files/menu/IMG_1671585699141.png,,(285kcal),(7g),(158mg),(36g),(232mg),coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '254,2,115,(EX) ICED 카라멜 마끼아또,ediya,폼 밀크 속에 감춰진 카라멜의 달콤함과 에스프레소의 진한 맛이 돋보이는 이디야의 인기 메뉴,"5,700",https://ediya.com/files/menu/IMG_1647321212721.png,,(347kcal),(6g),(163mg),(50g),(348mg),coffee,latte,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '235,2,96,HOT 에스프레소 마끼아또,ediya,진한 에스프레소 위의 부드러운 우유 거품이 조화를 이뤄 에스프레소를 부드럽게 느낄 수 있는 커피,"3,200",https://ediya.com/files/menu/IMG_1511503315349.png,,(14kcal),(0.3g),(5mg),(1g),(116mg),coffee,hot,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '253,2,114,(EX) HOT 카라멜 마끼아또,ediya,폼 밀크 속에 감춰진 카라멜의 달콤함과 에스프레소의 진한 맛이 돋보이는 이디야의 인기 메뉴,"5,700",https://ediya.com/files/menu/IMG_1647321239141.png,,(405kcal),(9g),(208mg),(55g),(348mg),coffee,latte,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '252,2,113,(L) ICED 카라멜 마끼아또,ediya,폼 밀크 속에 감춰진 카라멜의 달콤함과 에스프레소의 진한 맛이 돋보이는 이디야의 인기 메뉴,"4,500",https://ediya.com/files/menu/IMG_1671585861402.png,,(250kcal),(5g),(130mg),(34g),(232mg),coffee,latte,ice,k_high,s_high,p_mid',
      }
    );
    return messages;
  }

  if (userMessage.includes("에이드")) {
    messages.push(
      {
        role: "system",
        content:
          '154,2,15,블루문 에이드,ediya,"달콤한 청포도와 상큼한 사과향이 어우러진 청량감 있는 맛이 특징, 푸른빛 컬러와 바닷속을 연상시키는 스프링클 토핑어 더해져 눈과 입이 즐거운 이디야 시그니처 에이드","5,500",https://ediya.com/files/menu/IMG_1686560524185.png,,(200kcal),(0.2g),(5mg),(44g),,non-coffee,ade,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '301,2,162,(EX) 레몬 에이드,ediya,레몬의 상큼함과 톡 쏘는 탄산의 시원함을 함께 즐길 수 있는 음료,"5,200",https://ediya.com/files/menu/IMG_1647322402501.png,,(227kcal),(0.1g),(3mg),(53g),,non-coffee,ade,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '142,2,3,(ICED only) 리치파인 에이드,ediya,달콤한 파인애플과 리치의 향미가 조화롭게 어우러진 에이드에 레드커런트의 토핑이 더해져 더욱 상큼하고 청량하게 마실 수 있는 음료,"4,500",https://ediya.com/files/menu/IMG_1692174882301.png,,(148kcal),(0g),(29mg),(31g),,non-coffee,ade,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '144,2,5,(ICED only) 피치 패션 콤부에이드,ediya,석류티를 발효하여 부드럽게 톡쏘는 콤부차의 상큼함과 함께 복숭아와 열대과일의 복합적인 풍미를 느낄 수 있는 이디야만의 콤부 에이드,"4,700",https://ediya.com/files/menu/IMG_1692175123842.png,,(130kcal),(0g),(15mg),(29g),,non-coffee,ade,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '145,2,6,(ICED only) EX 피치 패션 콤부에이드,ediya,석류티를 발효하여 부드럽게 톡쏘는 콤부차의 상큼함과 함께 복숭아와 열대과일의 복합적인 풍미를 느낄 수 있는 이디야만의 콤부 에이드,"5,700",https://ediya.com/files/menu/IMG_1692175240305.png,,(212kcal),(0g),(16mg),(48g),(22mg),non-coffee,ade,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '302,2,163,자몽 에이드,ediya,"자몽의 쌉싸름한 맛과 상큼함을 동시에 느낄 수 있으며, 탄산의 청량함을 함께 맛볼 수 있는 음료","4,200",https://ediya.com/files/menu/IMG_1647322422524.png,,(124kcal),(0g),(10mg),(28g),,non-coffee,ade,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '303,2,164,(EX) 자몽 에이드,ediya,"자몽의 쌉싸름한 맛과 상큼함을 동시에 느낄 수 있으며, 탄산의 청량함을 함께 맛볼 수 있는 음료","5,200",https://ediya.com/files/menu/IMG_1647322437795.png,,(198kcal),(0g),(15mg),(46g),,non-coffee,ade,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '304,2,165,청포도 에이드,ediya,청포도의 상큼함과 탄산의 시원함을 느낄 수 있는 음료,"4,200",https://ediya.com/files/menu/IMG_1647322445174.png,,(121kcal),(0g),(55mg),(28g),,non-coffee,ade,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '300,2,161,레몬 에이드,ediya,레몬의 상큼함과 톡 쏘는 탄산의 시원함을 함께 즐길 수 있는 음료,"4,200",https://ediya.com/files/menu/IMG_1647322413547.png,,(123kcal),(0.1g),(1mg),(28g),,non-coffee,ade,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '143,2,4,(ICED only) EX 리치파인 에이드,ediya,달콤한 파인애플과 리치의 향미가 조화롭게 어우러진 에이드에 레드커런트의 토핑이 더해져 더욱 상큼하고 청량하게 마실 수 있는 음료,"5,500",https://ediya.com/files/menu/IMG_1692174977374.png,,(248kcal),(0g),(44mg),(53g),,non-coffee,ade,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '305,2,166,(EX) 청포도 에이드,ediya,청포도의 상큼함과 탄산의 시원함을 느낄 수 있는 음료,"5,200",https://ediya.com/files/menu/IMG_1647322455866.png,,(181kcal),(0g),(8mg),(42g),,non-coffee,ade,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '160,2,21,(EX) 생과일 수박 리프레싱 모히토,ediya,생과일 수박에 상큼한 레몬과 향긋한 모히토 베이스가 더해져 더욱 청량하게 마실 수 있는 음료,"6,100",https://ediya.com/files/menu/IMG_1684300375641.png,,(248kcal),(0.1g),(16mg),(52g),,non-coffee,juice,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '159,2,20,생과일 수박 리프레싱 모히토,ediya,생과일 수박에 상큼한 레몬과 향긋한 모히토 베이스가 더해져 더욱 청량하게 마실 수 있는 음료,"4,900",https://ediya.com/files/menu/IMG_1684300375641.png,,(165kcal),(0.1g),(11mg),(35g),,non-coffee,juice,ice,k_mid,s_high,p_mid',
      }
    );
    return messages;
  }

  if (userMessage.includes("주스")) {
    messages.push(
      {
        role: "system",
        content:
          '281,2,142,딸기주스,ediya,국내산 딸기 과육을 그대로 넣어 새콤하고 달콤한 딸기 본연의 맛을 느낄 수 있는 음료,"4,500",https://ediya.com/files/menu/IMG_1647324249886.png,,(270kcal),(0g),(4mg),(62g),,non-coffee,juice,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '157,2,18,생과일 수박주스,ediya,생과일을 그대로 담아 청량하고 시원한 수박 주스,"4,900",https://ediya.com/files/menu/IMG_1684299991102.png,,(72kcal),(0g),(26mg),(14g),,non-coffee,juice,ice,k_low,s_mid,p_mid',
      },
      {
        role: "system",
        content:
          '161,2,22,생과일 토마토 주스,ediya,생과일을 그대로 넣고 갈아 만들어 새콤달콤하고 시원한 토마토 주스,"4,900",https://ediya.com/files/menu/IMG_1684300616217.png,,(128kcal),(0g),(37mg),(21g),,non-coffee,juice,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '162,2,23,(EX) 생과일 토마토 주스,ediya,생과일을 그대로 넣고 갈아 만들어 새콤달콤하고 시원한 토마토 주스,"6,100",https://ediya.com/files/menu/IMG_1684300699164.png,,(233kcal),(6g),(200mg),(70g),,non-coffee,juice,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '279,2,140,홍시주스,ediya,부드럽고 달콤한 홍시 본연의 맛을 느낄 수 있는 음료,"4,500",https://ediya.com/files/menu/IMG_1647324236558.png,,(247kcal),(0g),(28mg),(59g),,non-coffee,juice,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '279,2,140,홍시주스,ediya,부드럽고 달콤한 홍시 본연의 맛을 느낄 수 있는 음료,"4,500",https://ediya.com/files/menu/IMG_1647324236558.png,,(247kcal),(0g),(28mg),(59g),,non-coffee,juice,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '158,2,19,(EX) 생과일 수박주스,ediya,달콤한 파인애플과 리치의 향미가 조화롭게 어우러진 에이드에 레드커런트의 토핑이 더해져 더욱 상큼하고 청량하게 마실 수 있는 음료,"6,100",https://ediya.com/files/menu/IMG_1684300102851.png,,(141kcal),(0g),(52mg),(27g),,non-coffee,juice,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '280,2,141,골드키위주스,ediya,고급 골드키위를 사용하여 비타민 C가 풍부하고 상큼한 음료,"4,500",https://ediya.com/files/menu/IMG_1647324243707.png,,(265kcal),(0g),(44mg),(59g),,non-coffee,juice,ice,k_high,s_high,p_mid',
      }
    );
    return messages;
  }

  if (userMessage.includes("쉐이크")) {
    messages.push(
      {
        role: "system",
        content:
          '155,2,16,더블 초코칩 쉐이크,ediya,"젤라또 플레이버를 음료로 즐길 수 있는 메뉴로, 묵직한 바닐라향의 풍미와 초콜릿 칩의 씹히는 식감을 조화롭게 즐길 수 있는 음료 ","4,900",https://ediya.com/files/menu/IMG_1688351274794.png,,(501kcal),(18g),(66mg),(83g),(11mg),non-coffee,smoothie,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '298,2,159,초코쿠키 쉐이크,ediya,"초코쿠키의 달콤함과 바삭함을 느낄 수 있어, 어린이와 청소년에게 인기 있는 쉐이크","4,900",https://ediya.com/files/menu/IMG_1647322366389.png,,(449kcal),(5g),(194mg),(70g),,non-coffee,smoothie,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '156,2,17,피스타치오 쉐이크,ediya,"젤라또 플레이버를 음료로 즐길 수 있는 메뉴로, 피스타치오의 고소함과 카라멜 토핑의 바삭한 식감을 즐길 수 있는 음료 ","5,200",https://ediya.com/files/menu/IMG_1688351123852.png,,(424kcal),(3.1g),(81mg),(73g),,-coffee,smoothie,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '299,2,160,딸기 쉐이크,ediya,부드러운 우유의 맛과 국내산 딸기의 달콤함이 조화로운 쉐이크,"5,200",https://ediya.com/files/menu/IMG_1647322376229.png,,(454kcal),(3.5g),(103mg),(85g),,non-coffee,smoothie,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '297,2,158,오리진 쉐이크,ediya,"우유 그대로의 부드러운 맛을 느낄 수 있으며, 어린이와 청소년도 즐겨 먹을 수 있는 쉐이크","4,700",https://ediya.com/files/menu/IMG_1647322356739.png,,(355kcal),(3.4g),(86mg),(63g),,non-coffee,smoothie,ice,k_high,s_high,p_mid',
      }
    );
    return messages;
  }

  if (userMessage.includes("플랫치노")) {
    messages.push(
      {
        role: "system",
        content:
          '293,2,154,민트 초콜릿 칩 플랫치노,ediya,진한 민트향이 더해진 초코렛에 초콜렛칩이 가득 들어있는 젊은 감성의 이디야 플랫치노,"4,500",https://ediya.com/files/menu/IMG_1647322244409.png,,(493kcal),(22g),(168mg),(52g),(56mg),non-coffee,smoothie,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '294,2,155,플레인 요거트 플랫치노,ediya,요거트 고유의 새콤달콤한 맛을 그대로 살린 메뉴로 여성들에게 인기가 좋은 음료,"4,500",https://ediya.com/files/menu/IMG_1647322311675.png,,(229kcal),(3.2g),(78mg),(32g),,non-coffee,smoothie,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '296,2,157,딸기 요거트 플랫치노,ediya,남녀노소 누구나 좋아하는 딸기와 상큼한 요거트가 조화롭게 어우러진 플랫치노,"4,700",https://ediya.com/files/menu/IMG_1647319753205.png,,(313kcal),(3.2g),(83mg),(53g),,non-coffee,smoothie,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '290,2,151,망고 플랫치노,ediya,열대과일인 망고의 달콤하고 진한 맛을 그대로 담아낸 여름철 인기 메뉴,"3,900",https://ediya.com/files/menu/IMG_1647322193229.png,,(258kcal),(0g),(8mg),(65g),,non-coffee,smoothie,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '292,2,153,초콜릿 칩 플랫치노,ediya,트리플 모카시럽에 초콜릿 칩이 더해져 씹는 재미가 있는 달콤한 플랫치노,"4,500",https://ediya.com/files/menu/IMG_1647322237789.png,,(387kcal),(16g),(140mg),(42g),(27mg),non-coffee,smoothie,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '295,2,156,블루베리 요거트 플랫치노,ediya,블루베리 본연의 맛과 상큼한 요거트의 조화를 이룬 새콤달콤한 요거트 플랫치노,"4,700",https://ediya.com/files/menu/IMG_1647322319410.png,,(297kcal),(3.2g),(78mg),(37g),,non-coffee,smoothie,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '291,2,152,꿀복숭아 플랫치노,ediya,복숭아의 리얼한 풍미와 꿀의 달콤함이 최적의 조화를 이룬 달콤하고 시원한 플랫치노,"3,900",https://ediya.com/files/menu/IMG_1647322170791.png,,(225kcal),(0g),(9mg),(49g),,non-coffee,smoothie,ice,k_mid,s_high,p_mid',
      }
    );
    return messages;
  }

  if (userMessage.includes("티")) {
    messages.push(
      {
        role: "system",
        content:
          '141,2,2,(HOT only) EX 피치히비스커스 콤부차,ediya,새콤한 히비스커스와 이디야만의 콤부베이스를 블렌딩하여 달콤한 복숭아와 리치의 풍미를 따뜻하게 즐길 수 있는 붉은빛의 콤부차,"5,500",https://ediya.com/files/menu/IMG_1692174584126.png,,(228kcal),(0g),(16mg),(48g),,non-coffee,tea,hot,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '174,2,35,HOT 샤인 히비스커스,ediya,"사과, 오렌지, 레몬그라스 등이 블렌딩 된 과일향 가득한 새콤달콤한 맛의 허브티","3,200",https://ediya.com/files/menu/IMG_1647322695193.png,,(6kcal),(0g),(0g),(0g),,non-coffee,tea,hot,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '180,2,41,(EX) HOT 스프링 캐모마일,ediya,"캐모마일과 루이보스, 레몬그라스 등이 블렌딩 되어 은은함이 돋보이는 허브티","4,200",www.https://ediya.com/files/menu/IMG_1671595271667.png,,(15kcal),(0g),(4mg),(0g),,non-coffee,tea,hot,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '186,2,47,HOT 피치 얼그레이,ediya,깊고 그윽한 홍차와 달콤한 복숭아 향이 어우러지는 깔끔한 맛의 얼그레이 티,"3,200",https://ediya.com/files/menu/IMG_1647322847327.png,,(8kcal),(0g),(0mg),(0g),(58mg),non-coffee,tea,hot,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '193,2,54,ICED 생강차,ediya,"생강 특유의 진하고 풍부한 맛과 향미를 느낄 수 있으며, 은은하고 부드러운 단맛의 유자와 꿀이 더해진 음료","4,200",https://ediya.com/files/menu/IMG_1647322677153.png,,(235kcal),(0g),(10mg),(46g),,non-coffee,tea,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '233,2,94,HOT 유자 피나콜라다,ediya,"유자청에 사과, 파인애플, 히비스커스, 로즈힙 열매, 코코넛 등을 넣어 신맛에 달콤한 향의 밸런스가 좋은 블렌딩 티","4,500",https://ediya.com/files/menu/IMG_1647323154740.png,,(197kcal),(0.1g),(3mg),(43g),,non-coffee,tea,hot,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '288,2,149,HOT 유자차,ediya,국내산 고흥 유자를 사용하고 유자 과육이 풍부한 홈메이드 방식의 달콤한 과일차,"4,200",https://ediya.com/files/menu/IMG_1647323168645.png,,(187kcal),(0.1g),(2mg),(42g),,non-coffee,tea,hot,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '170,2,31,HOT 그린 루이보스,ediya,복숭아 한 조각을 베어 문 잔향이 입안에 남는 맑은 수색의 루이보스 티,"3,200",https://ediya.com/files/menu/IMG_1647324593188.png,,(8kcal),(0g),(5mg),(0g),,non-coffee,tea,hot,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '172,2,33,(EX) HOT 그린 루이보스,ediya,복숭아 한 조각을 베어 문 잔향이 입안에 남는 맑은 수색의 루이보스 티,"5,200",https://ediya.com/files/menu/IMG_1671596542380.png,,(16kcal),(0g),(11mg),(0g),,non-coffee,tea,hot,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '176,2,37,(EX) HOT 샤인 히비스커스,ediya,"사과, 오렌지, 레몬그라스 등이 블렌딩 된 과일향 가득한 새콤달콤한 맛의 허브티","4,200",https://ediya.com/files/menu/IMG_1671595438536.png,,(13kcal),(0g),(0g),(0g),,non-coffee,tea,hot,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '177,2,38,(EX) ICED 샤인 히비스커스,ediya,"사과, 오렌지, 레몬그라스 등이 블렌딩 된 과일향 가득한 새콤달콤한 맛의 허브티","5,200",https://ediya.com/files/menu/IMG_1671595525825.png,,(13kcal),(0g),(0g),(0g),,non-coffee,tea,ice,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '179,2,40,ICED 스프링 캐모마일,ediya,"캐모마일과 루이보스, 레몬그라스 등이 블렌딩 되어 은은함이 돋보이는 허브티","3,200",https://ediya.com/files/menu/IMG_1647322726556.png,,(8kcal),(0g),(2mg),(0g),,non-coffee,tea,ice,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '181,2,42,(EX) ICED 스프링 캐모마일,ediya,"캐모마일과 루이보스, 레몬그라스 등이 블렌딩 되어 은은함이 돋보이는 허브티","4,200",https://ediya.com/files/menu/IMG_1671595337284.png,,(15kcal),(0g),(4mg),(0g),,non-coffee,tea,ice,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '189,2,50,(EX) ICED 피치 얼그레이,ediya,깊고 그윽한 홍차와 달콤한 복숭아 향이 어우러지는 깔끔한 맛의 얼그레이 티,"4,200",https://ediya.com/files/menu/IMG_1671596392889.png,,(17kcal),(0g),(0mg),(0g),(117mg),non-coffee,tea,ice,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '227,2,88,(EX) ICED 자몽 네이블오렌지,ediya,"자몽청에 오렌지, 귤, 로즈힙, 사과, 파인애플 등을 넣어 부드러운 신맛과 오렌지 향을 즐길 수 있는 아이스 블렌딩티","5,100",https://ediya.com/files/menu/IMG_1647323192384.png,,(322kcal),(0g),(7mg),(73g),,non-coffee,tea,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '228,2,89,(EX) ICED 유자피나콜라다,ediya,"유자청에 사과, 파인애플, 히비스커스, 로즈힙 열매, 코코넛 등을 넣어 신맛과 달콤한 향의 밸런스가 좋은 아이스 블렌딩티","5,100",www.https://ediya.com/files/menu/IMG_1647323138803.png,,(291kcal),(0.1g),(2mg),(67g),,non-coffee,tea,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '232,2,93,HOT 자몽 네이블 오렌지,ediya,"자몽청에 오렌지, 귤, 로즈힙, 사과, 파인애플 등을 넣어 부드러운 신맛과 오렌지 향을 즐길 수 있는 아이스 블렌딩티","4,500",https://ediya.com/files/menu/IMG_1647323209240.png,,(196kcal),(0.1g),(6mg),(43g),,non-coffee,tea,hot,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '140,2,1,(HOT only) 피치히비스커스 콤부차,ediya,새콤한 히비스커스와 이디야만의 콤부베이스를 블렌딩하여 달콤한 복숭아와 리치의 풍미를 따뜻하게 즐길 수 있는 붉은빛의 콤부차,"4,500",https://ediya.com/files/menu/IMG_1692174106292.png,,(142kcal),(0g),(15mg),(29g),,non-coffee,tea,hot,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '185,2,46,(EX) ICED 퓨어 페퍼민트,ediya,입 안 가득 청량함이 느껴지는 상쾌한 허브티,"4,200",https://ediya.com/files/menu/IMG_1671595852837.png,,(11kcal),(0g),(5mg),(0g),,non-coffee,tea,ice,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '187,2,48,ICED 피치 얼그레이,ediya,깊고 그윽한 홍차와 달콤한 복숭아 향이 어우러지는 깔끔한 맛의 얼그레이 티,"3,200",https://ediya.com/files/menu/IMG_1647322855201.png,,(8kcal),(0g),(0mg),(0g),(58mg),non-coffee,tea,ice,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '188,2,49,(EX) HOT 피치 얼그레이,ediya,깊고 그윽한 홍차와 달콤한 복숭아 향이 어우러지는 깔끔한 맛의 얼그레이 티,"4,200",https://ediya.com/files/menu/IMG_1671596309362.png,,(17kcal),(0g),(0mg),(0g),(117mg),non-coffee,tea,hot,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '191,2,52,ICED 쌍화차,ediya,전통 쌍화차의 느낌을 이디야만의 색깔로 재해석하여 다양한 연령층이 즐길 수 있도록 은은한 향과 고소함을 강조한 음료,"4,200",https://ediya.com/files/menu/IMG_1647322778699.png,,(212kcal),(0g),(100mg),(28g),,non-coffee,tea,ice,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '229,2,90,(EX) ICED 석류애플라임,ediya,"산뜻한 석류에 다양한 과일과 꽃, 그리고 샴페인의 향이 더해져 보다 깊고 중후한 맛이 느껴지는 아이스 블렌딩티","5,100",https://ediya.com/files/menu/IMG_1647322977844.png,,(346kcal),(0.1g),(15mg),(74g),,non-coffee,tea,ice,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '289,2,150,HOT 자몽차,ediya,풍부한 자몽 과육으로 신맛과 쓴맛을 내어 천연의 자몽의 맛을 내는 과일차,"4,200",https://ediya.com/files/menu/IMG_1647323227736.png,,(186kcal),(0g),(2mg),(42g),,non-coffee,tea,hot,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '175,2,36,ICED 샤인 히비스커스,ediya,"사과, 오렌지, 레몬그라스 등이 블렌딩 된 과일향 가득한 새콤달콤한 맛의 허브티","4,700",https://ediya.com/files/menu/IMG_1647322703601.png,,(6kcal),(0g),(0g),(0g),,non-coffee,tea,ice,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '178,2,39,HOT 스프링 캐모마일,ediya,"캐모마일과 루이보스, 레몬그라스 등이 블렌딩 되어 은은함이 돋보이는 허브티","3,200",https://ediya.com/files/menu/IMG_1647322717592.png,,(8kcal),(0g),(2mg),(0g),,non-coffee,tea,hot,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '182,2,43,HOT 퓨어 페퍼민트,ediya,입 안 가득 청량함이 느껴지는 상쾌한 허브티,"3,200",https://ediya.com/files/menu/IMG_1647322800672.png,,(5kcal),(0g),(2mg),(0g),,non-coffee,tea,hot,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '183,2,44,ICED 퓨어 페퍼민트,ediya,입 안 가득 청량함이 느껴지는 상쾌한 허브티,"3,200",https://ediya.com/files/menu/IMG_1647322809136.png,,(5kcal),(0g),(2mg),(0g),,non-coffee,tea,ice,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '184,2,45,(EX) HOT 퓨어 페퍼민트,ediya,입 안 가득 청량함이 느껴지는 상쾌한 허브티,"4,200",https://ediya.com/files/menu/IMG_1671595635409.png,,(11kcal),(0g),(5mg),(0g),,non-coffee,tea,hot,k_low,s_low,p_mid',
      },
      {
        role: "system",
        content:
          '190,2,51,HOT 쌍화차,ediya,전통 쌍화차의 느낌을 이디야만의 색깔로 재해석하여 다양한 연령층이 즐길 수 있도록 은은한 향과 고소함을 강조한 음료,"4,200",https://ediya.com/files/menu/IMG_1647322753151.png,,(212kcal),(0g),(100mg),(28g),,non-coffee,tea,hot,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '192,2,53,HOT 생강차,ediya,"생강 특유의 진하고 풍부한 맛과 향미를 느낄 수 있으며, 은은하고 부드러운 단맛의 유자와 꿀이 더해진 음료","4,200",https://ediya.com/files/menu/IMG_1647322669524.png,,(235kcal),(0g),(10mg),(46g),,non-coffee,tea,hot,k_high,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '230,2,91,HOT 석류 오리지널,ediya,"석류 특유의 산뜻한 향과 깔끔한 뒷맛이 느껴지며, 과육이 한알 한알 살아있는 붉은 빛의 매력적인 과일차","4,200",https://ediya.com/files/menu/IMG_1647323060484.png,,(210kcal),(0.1g),(5mg),(42g),,non-coffee,tea,hot,k_mid,s_high,p_mid',
      },
      {
        role: "system",
        content:
          '231,2,92,HOT 석류 애플라임,ediya,"산뜻한 석류에 다양한 과일과 꽃, 그리고 샴페인의 향이 더해져 보다 깊고 중후한 맛이 느껴지는 블렌딩티","4,500",https://ediya.com/files/menu/IMG_1647323050118.png,,(220kcal),(0.1g),(7mg),(42g),,non-coffee,tea,hot,k_mid,s_high,p_mid',
      }
    );
    return messages;
  }

  return messages;
};
