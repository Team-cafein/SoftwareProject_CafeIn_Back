## 2023년 소프프웨어 프로젝트 CafeIn BackEnd
 

## 목차
  - [프로젝트 소개](#-프로젝트-소개)
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

    ### 2. 프로젝트 폴더 구조 설명
    위 Directory Tree를 참고하면, 크게 **api, lib, models**으로 구분짓고, node.js(Koa) 초기 설정 파일인 main.js와 index.js와 .env prettierrc 등을 별도로 관리하였다.

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

<table>
  <tr>
    <td>Login Page</td>
    <td>질문 Page</td>
    <td>메인 Page</td>
    <td>지도 Page</td>
  </tr>
  <tr>
    <td><img src="https://github.com/Team-cafein/.github/assets/100831607/234e3420-9c03-4e11-b0f9-1e1defd6db1d"  width="100%"/></td>
    <td><img src="https://github.com/Team-cafein/.github/assets/100831607/cbd42771-09c1-4597-898b-b77fb465b918"  width="100%"/></td>
    <td><img src="https://github.com/Team-cafein/.github/assets/100831607/d399aafc-f272-4a3d-b4c8-88bccc7ca486"  width="100%"/></td>
    <td><img src="https://github.com/Team-cafein/.github/assets/100831607/81554ded-50bf-40d5-9d82-5dc641a19af1"  width="100%"/></td>

  </tr>
   <tr>
    <td>카테고리 페이지</td>
    <td>음료상세 페이지1</td>
    <td>음료상세 페이지2</td>
    <td>커뮤니티 페이지</td>
  </tr>
   <tr>
    <td><img src="https://github.com/Team-cafein/.github/assets/100831607/25a7e2d6-20c0-4f37-9616-77672c1816a8"  width="100%"/></td>
    <td><img src="https://github.com/Team-cafein/.github/assets/100831607/5da358a9-01db-4f1a-bb51-04d864b9f3c8"  width="100%"/></td>
    <td><img src="https://github.com/Team-cafein/.github/assets/100831607/50092459-8330-4b63-b1b8-417171709730"  width="100%"/></td>
    <td><img src="https://github.com/Team-cafein/.github/assets/100831607/77811aa2-026c-463f-a185-028a708ab329"  width="100%"/></td>
  </tr>

   <tr>
    <td>챗봇 페이지</td>
    <td>마이 페이지</td>
    
  </tr>
   <tr>
    <td><img src="https://github.com/Team-cafein/.github/assets/100831607/29878bc3-4451-4a47-bcb8-9abd895935b1"  width="100%"/></td>
    <td><img src="https://github.com/Team-cafein/.github/assets/100831607/4414defb-3d11-470d-af86-b28bd6fbd835"  width="100%"/></td>
   
  </tr>
 

</table>

<br><br>

* **Phone** (권장)
* **web**

##  구조도

<div align="center">
  <img src="https://github.com/Team-cafein/.github/assets/100831607/bf640412-9ccf-49bf-b8a4-f8c51a9d1ae2"/>
</div>

<br>

  
## 👍 느낀점
  개발하면서 느낀점을 총 3가지로 나누어 생각해봤다.

- ### 1. 개발

- ### 2. 협업

- ### 3. 정리



   
## 👑 만들이들
|이름|사진|담당역할|직책|
|:---:|:---:|:---:|:---:|
|[김승찬](https://github.com/kscold)|<img src="https://avatars.githubusercontent.com/u/66587554?v=4" width="200" height="200"/>|모든 api 개발|FE, BE 팀장|
|[박혜정](https://github.com/311516h)|<img src="https://avatars.githubusercontent.com/u/82697724?v=4" width="200" height="200"/>|모든 카페 데이터 전처리|BE 팀원|
