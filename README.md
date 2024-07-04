## 2023년 소프프웨어 프로젝트 CafeIn BackEnd
 

## 목차
  - [개요](#-개요)
  - [설치 및 구동](#-설치-및-구동)
  - [프로젝트 설명](#-프로젝트-설명)
  - [화면 정의서](#-화면-정의서)
  - [만든이들](#-만들이들)
  - [느낀점](#-느낀점)

## ❓ 프로젝트 소개

현대 사회에서 음료 소비는 매우 중요한 역할을 하고 있다. 특히 카페 문화는 사람들의 일상에서 빼놓을 수 없는 존재다. 이에 따라 CafeIn은 대한민국에서 가장 많이 소비되는 프랜차이즈 카페 TOP5(스타벅스, 할리스, 이디야, 백다방, 메가)의 정보를 한곳에서 통합하는 서비스를 제공한다.

사용자들은 CafeIn 서비스를 이용하면서 각 카페의 음료 메뉴, 가격, 칼로리 등을 일일이 찾아보는 번거로움 없이 쉽게 접근할 수 있다. 또한, CafeIn은 사용자 맞춤형 서비스를 제공하기 위해 프롬프트 엔지니어링을 활용한 음료 추천 챗봇 서비스를 제공한다.



## 🙋‍♀️ 설치 및 구동
  **1. Clone the Repository**  
  ```bash
  $ https://github.com/Team-cafein/SoftwareProject_CafeIn_Back.git
  ``` 

  **2. Move the Directory** 
  ```bash 
  $ cd SoftwareProject_CafeIn_Back

  ``` 

  **3. Install the npm | yarn** 
  ```bash 
  $ npm install or yarn intstall
  ```
  **4. Start the npm | yarn & project** 
  ```bash 
  $ npm start or yarn start
  ```

## 🛠 프로젝트 설명

 - ### 1. 폴더 구조
   ```bash
     SoftwareProject_CafeIn_Back
       ┣ src
       ┃ ┣ api
       ┃ ┃ ┣ auth
       ┃ ┃ ┃ ┣ auth.ctrl.js
       ┃ ┃ ┃ ┗ index.js
       ┃ ┃ ┣ cafe
       ┃ ┃ ┃ ┣ cafeinfo
       ┃ ┃ ┃ ┃ ┣ all_cafes.json
       ┃ ┃ ┃ ┃ ┣ ediya_menu.json
       ┃ ┃ ┃ ┃ ┣ hollys_menu.json
       ┃ ┃ ┃ ┃ ┣ mega_menu.json
       ┃ ┃ ┃ ┃ ┣ paik_menu.json
       ┃ ┃ ┃ ┃ ┗ starbucks_menu.json
       ┃ ┃ ┃ ┣ cafe.ctrl.js
       ┃ ┃ ┃ ┗ index.js
       ┃ ┃ ┣ gpt
       ┃ ┃ ┃ ┣ data.json
       ┃ ┃ ┃ ┣ gpt.ctrl.js
       ┃ ┃ ┃ ┗ index.js
       ┃ ┃ ┣ likecount
       ┃ ┃ ┃ ┣ index.js
       ┃ ┃ ┃ ┗ likecount.ctrl.js
       ┃ ┃ ┣ likes
       ┃ ┃ ┃ ┣ index.js
       ┃ ┃ ┃ ┗ likes.ctrl.js
       ┃ ┃ ┣ posts
       ┃ ┃ ┃ ┣ index.js
       ┃ ┃ ┃ ┗ posts.ctrl.js
       ┃ ┃ ┣ questions
       ┃ ┃ ┃ ┗ questions.ctrl.js
       ┃ ┃ ┣ recommend
       ┃ ┃ ┃ ┣ index.js
       ┃ ┃ ┃ ┣ recommend.ctrl.js
       ┃ ┃ ┃ ┗ recommend.json
       ┃ ┃ ┣ reviews
       ┃ ┃ ┃ ┣ index.js
       ┃ ┃ ┃ ┗ reviews.ctrl.js
       ┃ ┃ ┣ wishlist
       ┃ ┃ ┃ ┣ index.js
       ┃ ┃ ┃ ┗ wishlist.ctrl.js
       ┃ ┃ ┗ index.js
       ┃ ┣ lib
       ┃ ┃ ┣ checkLoggedIn.js
       ┃ ┃ ┣ checkUserExists.js
       ┃ ┃ ┣ checkUserRegistered.js
       ┃ ┃ ┣ getBeverageIdToSplit.js
       ┃ ┃ ┣ getBeverageName.js
       ┃ ┃ ┗ jwtMiddleware.js
       ┃ ┣ models
       ┃ ┃ ┣ cafe.js
       ┃ ┃ ┣ gpt.js
       ┃ ┃ ┣ like.js
       ┃ ┃ ┣ likecount.js
       ┃ ┃ ┣ post.js
       ┃ ┃ ┣ questions.js
       ┃ ┃ ┣ recommendation.js
       ┃ ┃ ┣ reviews.js
       ┃ ┃ ┣ user.js
       ┃ ┃ ┗ wishlist.js
       ┃ ┣ index.js
       ┃ ┗ main.js
       ┣ .env
       ┣ .eslintrc.json
       ┣ .gitignore
       ┣ .prettierrc
       ┣ cafe_data.json
       ┣ jsconfig.json
       ┣ package.json
       ┗ yarn.lock

    ``` 
    <hr/>

    ### 2. 프로젝트 설명
    위 Directory Tree를 참고하면, 크게 **assets, api, lib, models**으로 구분짓고, node.js(Koa) 초기 설정 파일인 main.js와 index.js와 .env prettierrc 등을 별도로 관리하였다.

    **assets** - 홈페이지에 들어가는 모든 이미지 파일들이 저장되어 있다.

    **api** - 주로 기능별로 컨트롤러(비즈니스 로직 포함)와 라우트 파일들이 저장되어 있다.

    **lib** - 비즈니스 로직이나 라우트 파일에 사용될 미들웨어가 파일이 있다.
    
    **models** -  MogoDB를 사용했기 때문에, 테이블을 정의하는 모델(스키마)에 대한 파일이 있다.

    <hr/>

    ### 3. 기술 스택
     |Backend|
     |:------:|
     |<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/></a><br><img src="https://img.shields.io/badge/Koa-33333D?style=flat-square&logo=Koa&logoColor=white"/></a><br><img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/></a><br><img src="https://img.shields.io/badge/OpenAI-00AAFF?style=flat-square&logo=OpenAI&logoColor=white"/></a>|

     <hr/>

    ### 4. 상세 기술 사용 방법
    **Koa** : 개발 당시 ES modelue 문법이 더 편하였기 때문에 Node.js Express가 아닌 Koa 프레임워크를 사용하여 개발하였다.

    **회원 가입 및 로그인 검증** : Joi 모듈을 사용하여 기본적인 회원가입 형식 검증을 하였고, checkLoggedIn 미들웨어를 통해 로그인을 검출하였다.

    **MogoDB** : 모든 인원이 전처리한 데이터를 동시에 확인하고 개발할 수 있도록 만들기 위해 MongoDB Atlas(배포 DB) 환경을 이용하였다.
 
    **프롬프트 엔지니어링** : .env 파일을 통해, secret key를 관리하였으며, openAI의 플라스크 예시코드를 Koa 프레임워크에 녹여내여, 필요한 만큼의 role들을 추가하여 CafeIn DateBase에 있는 데이터를 기반으로 프롬프트엔니지어링을 통한 답변을 도출해내였다.


    <hr/>

## 🎆 화면 정의서
### PC & Mobile Page

**MainPage1**|**MainPage2**|**MainPage3**|**MainPage4**
:-----:|:-----:|:-----:|:-----:
<img src="/frontend/src/assets/readmeAssets/Mainpage/mainEven.png" width="100%">|<img src="/frontend/src/assets/readmeAssets/Mainpage/mainAfter.png" width="100%">|<img src="/frontend/src/assets/readmeAssets/Mainpage/Main1.png" width="100%">|<img src="/frontend/src/assets/readmeAssets/Mainpage/Main2.png" width="100%">
메인 화면(오전)|메인 화면(오후)|2번째 메인 화면|3번째 메인 화면

**Menu**|**CreatorPage1**|**CreatorPage2**|**CreatorPage3**
:-----:|:-----:|:-----:|:-----:
<img src="/frontend/src/assets/readmeAssets/Mainpage/Menu.png" width="100%">|<img src="/frontend/src/assets/readmeAssets/CreatorPage/Creator1.png" width="100%">|<img src="/frontend/src/assets/readmeAssets/CreatorPage/Creator2.png" width="100%">|<img src="/frontend/src/assets/readmeAssets/CreatorPage/Creator3.png" width="100%">
메뉴|만든이들(총학생회)|만들이들(개발자)|만든이들(디자인)

**TimeTable(Mon)**|**TimeTable(Tue)**|**Performance(Before)**|**Performance(After)**
:-----:|:-----:|:-----:|:-----:
<img src="/frontend/src/assets/readmeAssets/TimelinePage/TableMon.png" width="100%">|<img src="/frontend/src/assets/readmeAssets/TimelinePage/TableTue.png" width="100%">|<img src="/frontend/src/assets/readmeAssets/TimelinePage/Performance1.png" width="100%">|<img src="/frontend/src/assets/readmeAssets/TimelinePage/Performance2.png" width="100%">
월요일 타임테이블|화요일 타임테이블|공연 정보 슬라이드쇼(전면)|공연 정보 슬라이드쇼(후면)

**EventPage1**|**EventPage2**|**EventPage3**|**AdminPage**
:-----:|:-----:|:-----:|:-----:
<img src="/frontend/src/assets/readmeAssets/EventPage/Seat.png" width="100%">|<img src="/frontend/src/assets/readmeAssets/EventPage/Box.png" width="100%">|<img src="/frontend/src/assets/readmeAssets/EventPage/Dresscode.png" width="100%">|<img src="/frontend/src/assets/readmeAssets/AdminPage/Main.png" width="100%">
이벤트(좌석 추첨)|이벤트(보물 찾기)|이벤트(드레스코드)|관리자 페이지(정보 수정)


<br>

  
## 👍 느낀점
  개발하면서 느낀점을 총 3가지로 나누어 생각해봤다.

- ### 1. 개발

- ### 2. 협업

- ### 3. 정리



   
## 👑 만들이들
|이름|사진|담당역할|직책|
|:---:|:---:|:---:|:---:|
|[김승찬](https://github.com/kscold)|<img src="/frontend/src/assets/CreatorPage/ksc.webp" width="200" height="200"/>|모든 api 개발|FE, BE 팀장|
|[박혜정](https://github.com/hyeongjun6364)|<img src="/frontend/src/assets/CreatorPage/lhjun.webp" width="200" height="200"/>|모든 카페 데이터 전처리|BE 팀원|
