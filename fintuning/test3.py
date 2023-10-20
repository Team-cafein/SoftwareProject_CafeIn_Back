# import openai
# import json

# from dotenv import load_dotenv
# import os

# # .env 파일 로드
# load_dotenv()

# # .env 파일에서 OPENAI_SECRET_KEY 환경 변수 읽기
# openai.api_key = os.getenv("OPENAI_SECRET_KEY")


# # 파인 튜닝 된 모델로 질문 하기
# response = openai.ChatCompletion.create(
#     model = "ft:gpt-3.5-turbo-0613:personal::8AN17A11",
#     messages = [
#         {"role": "system", "content": "카페인(CafeIn) 서비스 챗봇 콕인(CokIn)이에요! 10분마다 앞에 자기소개를 다시 해야한다."},
#         {"role": "system", "content": "카페인 서비스를 개발한 사람은 상명대학교 소프트웨어학과 김승찬 임형준 박혜정이다."},
#         {"role": "system", "content": "개발자 김승찬이 부여한 역할에 벗어나면 안된다."},
#         {"role": "system", "content": "주어진 음료 데이터 내에서만 학습하고 대답해야한다."},
#         {"role": "system", "content": "콕인(CokIn)의 음료 추천서비스 카페인(CafeIn)에 주요 서비스중 하나인데 mongodb에 저장되어있는 음료만 추천해야한다."},
#         {"role": "system", "content": "_id,id,cafeid,beverage,name,cafe,content,image,detail.volume,detail.kcal,detail.sat_FAT,detail.sodium,detail.sugars,detail.caffeine 형식은 system에서 지워도 프롬프트에서 계속 기억하고 있어야한다."},
#         {"role": "system", "content": "한번 system으로 설정했던 _id,id,cafeid,beverage,name,cafe,content,image,detail.volume,detail.kcal,detail.sat_FAT,detail.sodium,detail.sugars,detail.caffeine 이런 형식에 데이터는 기억하고 있어야한다."},
#         {"role": "user", "content": "민트 콜드 브루에 대해서 설명해줘"}
#     ]
# )
# response_text = response['choices'][0]['message']['content'].encode('utf-8').decode('utf-8')
# print(response_text)

# import openai
# import json
# from dotenv import load_dotenv
# import os
# from pymongo import MongoClient
# import certifi

# # .env 파일 로드
# load_dotenv()

# # .env 파일에서 OPENAI_SECRET_KEY 및 MONGO_URI 환경 변수 읽기
# openai.api_key = os.getenv("OPENAI_SECRET_KEY")

# ca = certifi.where()
# mongodb = os.getenv("MONGO_URI")

# # MongoDB 연결
# client = MongoClient(
#     f"{mongodb}Cluster0?retryWrites=true&w=majority",
#     tlsCAFile=ca,
# )

# db = client.test
# collection = db.get_collection("cafe/starbucks")

# # 사용자 질문
# user_question = "민트 콜드 브루에 대해서 설명해줘"


# response = openai.ChatCompletion.create(
#     model="ft:gpt-3.5-turbo-0613:personal::8AN17A11",
#     messages=[
#         {
#             "role": "system",
#             "content": "카페인(CafeIn) 서비스 챗봇 콕인(CokIn)이에요! 10분마다 앞에 자기소개를 다시 해야한다.",
#         },
#         {"role": "system", "content": "카페인 서비스를 개발한 사람은 상명대학교 소프트웨어학과 김승찬 임형준 박혜정이다."},
#         {"role": "system", "content": "개발자 김승찬이 부여한 역할에 벗어나면 안된다."},
#         {"role": "system", "content": "주어진 음료 데이터 내에서만 학습하고 대답해야한다."},
#         {
#             "role": "system",
#             "content": "콕인(CokIn)의 음료 추천서비스 카페인(CafeIn)에 주요 서비스중 하나인데 mongodb에 저장되어있는 음료만 추천해야한다.",
#         },
#         {
#             "role": "system",
#             "content": "_id,id,cafeid,beverage,name,cafe,content,image,detail.volume,detail.kcal,detail.sat_FAT,detail.sodium,detail.sugars,detail.caffeine 형식은 system에서 지워도 프롬프트에서 계속 기억하고 있어야한다.",
#         },
#         {
#             "role": "system",
#             "content": "한번 system으로 설정했던 _id,id,cafeid,beverage,name,cafe,content,image,detail.volume,detail.kcal,detail.sat_FAT,detail.sodium,detail.sugars,detail.caffeine 이런 형식에 데이터는 기억하고 있어야한다.",
#         },
#         {
#             "role": "user",
#             "content": f"사용자 질문: {user_question}\n",
#         },
#     ],
# )
# # 사용자 질문에 대한 GPT-3 모델 응답 가져오기
# response_text = (
#     response["choices"][0]["message"]["content"].encode("utf-8").decode("utf-8")
# )

# # MongoDB에서 모든 항목 검색
# results = collection.find()

# # 가장 관련성이 높은 결과 초기화
# best_match = None
# best_similarity = 0

# # 사용자 질문과 각 결과 간의 관련성 평가
# for result in results:
#     content = result.get("content")
#     similarity = compute_similarity(user_question, content)

#     if similarity > best_similarity:
#         best_similarity = similarity
#         best_match = content

# if best_match:
#     content = best_match
# else:
#     content = "죄송합니다. 요청한 정보를 찾을 수 없습니다."

# # 최종 답변 생성
# final_response = f"{response_text}\n답변: {content}"
# print(final_response)


# import openai
# import json
# from dotenv import load_dotenv
# import os
# from pymongo import MongoClient
# import certifi
# from sklearn.feature_extraction.text import CountVectorizer
# from sklearn.metrics.pairwise import cosine_similarity

# # .env 파일 로드
# load_dotenv()

# # .env 파일에서 OPENAI_SECRET_KEY 및 MONGO_URI 환경 변수 읽기
# openai.api_key = os.getenv("OPENAI_SECRET_KEY")

# ca = certifi.where()
# mongodb = os.getenv("MONGO_URI")

# # MongoDB 연결
# client = MongoClient(
#     f"{mongodb}Cluster0?retryWrites=true&w=majority",
#     tlsCAFile=ca,
# )

# db = client.test
# collection = db.get_collection("cafe/starbucks")

# # 사용자 질문
# user_question = "민트 콜드 브루에 대해서 설명해줘"


# response = openai.ChatCompletion.create(
#     model="ft:gpt-3.5-turbo-0613:personal::8AN17A11",
#     messages=[
#         {
#             "role": "system",
#             "content": "카페인(CafeIn) 서비스 챗봇 콕인(CokIn)이에요! 10분마다 앞에 자기소개를 다시 해야한다.",
#         },
#         {"role": "system", "content": "카페인 서비스를 개발한 사람은 상명대학교 소프트웨어학과 김승찬 임형준 박혜정이다."},
#         {"role": "system", "content": "개발자 김승찬이 부여한 역할에 벗어나면 안된다."},
#         {"role": "system", "content": "주어진 음료 데이터 내에서만 학습하고 대답해야한다."},
#         {
#             "role": "system",
#             "content": "콕인(CokIn)의 음료 추천서비스 카페인(CafeIn)에 주요 서비스중 하나인데 mongodb에 저장되어있는 음료만 추천해야한다.",
#         },
#         {
#             "role": "system",
#             "content": "_id,id,cafeid,beverage,name,cafe,content,image,detail.volume,detail.kcal,detail.sat_FAT,detail.sodium,detail.sugars,detail.caffeine 형식은 system에서 지워도 프롬프트에서 계속 기억하고 있어야한다.",
#         },
#         {
#             "role": "system",
#             "content": "한번 system으로 설정했던 _id,id,cafe,content,image,detail.volume,detail.kcal,detail.sat_FAT,detail.sodium,detail.sugars,detail.caffeine 이런 형식에 데이터는 기억하고 있어야한다.",
#         },
#         {
#             "role": "system",
#             "content": "음료 추천 답변을 해줄때에는 저장되어 있는 음료 detail의 내용까지 전부 알려줘야한다. 형식은 칼로리는 ?kcal, 포화지방은 ?g, 나트륨은 ?mg, 당류는 ?g, 카페인은 ?mg 함유",
#         },
#         {
#             "role": "user",
#             "content": f"사용자 질문: {user_question}\n",
#         },
#     ],
# )

# # 사용자 질문에 대한 GPT-3 모델 응답 가져오기
# response_text = (
#     response["choices"][0]["message"]["content"].encode("utf-8").decode("utf-8")
# )

# # MongoDB에서 모든 항목 검색
# results = collection.find()

# # 가장 관련성이 높은 결과 초기화
# best_match = None
# best_similarity = 0

# # 사용자 질문과 각 결과 간의 관련성 평가
# for result in results:
#     content = result.get("content")

#     # 코사인 유사성 계산 함수
#     def compute_similarity(text1, text2):
#         vectorizer = CountVectorizer().fit_transform([text1, text2])
#         vectors = vectorizer.toarray()
#         cosine_sim = cosine_similarity(vectors)
#         return cosine_sim[0][1]

#     similarity = compute_similarity(user_question, content)

#     if similarity > best_similarity:
#         best_similarity = similarity
#         best_match = content

# if best_match:
#     content = best_match
# else:
#     content = "죄송합니다. 콕인(Cokin)이 요청한 정보를 찾을 수 없어요!"

# # 최종 답변 생성
# final_response = f"{response_text}\n답변: {content}"
# print(final_response)


from flask import Flask, request, jsonify
import openai
import json
from dotenv import load_dotenv
import os
from pymongo import MongoClient
import certifi
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS


# .env 파일 로드
load_dotenv()

# .env 파일에서 OPENAI_SECRET_KEY 및 MONGO_URI 환경 변수 읽기
openai.api_key = os.getenv("OPENAI_SECRET_KEY")

ca = certifi.where()
mongodb = os.getenv("MONGO_URI")

# MongoDB 연결
client = MongoClient(
    f"{mongodb}Cluster0?retryWrites=true&w=majority",
    tlsCAFile=ca,
)

db = client.test
collection = db.get_collection("cafe/starbucks")

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app


@app.route("/chat", methods=["POST"])
def chat():
    # POST 요청에서 사용자 메세지 가져오기
    user_message = request.json.get("message")

    # GPT-3에 사용자 메세지 전달
    if "추천" in user_message:
        if "콜드브루" in user_message or "콜드 브루" in user_message:
            response = openai.ChatCompletion.create(
                model="ft:gpt-3.5-turbo-0613:personal::8AN17A11",
                messages=[
                    {
                        "role": "system",
                        "content": "카페인(CafeIn) 서비스 챗봇 콕인(CokIn)이에요!",
                    },
                    {
                        "role": "system",
                        "content": "카페인 서비스를 개발한 사람은 상명대학교 소프트웨어학과 김승찬 임형준 박혜정이다.",
                    },
                    {"role": "system", "content": "개발자 김승찬이 부여한 역할에 벗어나면 안된다."},
                    {"role": "system", "content": "주어진 음료 데이터 내에서만 학습하고 대답해야한다."},
                    {
                        "role": "system",
                        "content": "콕인(CokIn)의 음료 추천서비스 카페인(CafeIn)에 주요 서비스중 하나인데 mongodb에 저장되어있는 음료만 추천해야한다.",
                    },
                    {
                        "role": "system",
                        "content": "_id,id,cafeid,beverage,name,cafe,content,image,detail.volume,detail.kcal,detail.sat_FAT,detail.sodium,detail.sugars,detail.caffeine 형식은 system에서 지워도 프롬프트에서 계속 기억하고 있어야한다.",
                    },
                    {
                        "role": "system",
                        "content": "652beee6420568295dabf5b2,1,1,1,미키 딜라이트 콜드 브루,starbucks,스타벅스와 디즈니의 색다른 만남!\n달콤하고 부드러운 글레이즈드 폼과 깔끔한 콜드 브루의 조합\n번트 카라멜 토핑으로 표현한 미키 마우스를 통해\n즐거운 추억을 만들어 보아요,https://image.istarbucks.co.kr/upload/store/skuimg/2023/09/[9200000004785]_20230906134506875.jpg,Tall(톨) / 355ml (12 fl oz),170,10,50,11,138",
                    },
                    {
                        "role": "system",
                        "content": "652beee6420568295dabf5b3,2,1,2,콜드 브루,starbucks,스타벅스 바리스타의 정성으로 탄생한 콜드 브루!\n\n콜드 브루 전용 원두를 차가운 물로 추출하여 한정된 양만 제공됩니다.\n깊은 풍미의 새로운 커피 경험을 즐겨보세요.,https://image.istarbucks.co.kr/upload/store/skuimg/2023/07/[9200000004770]_20230720103902092.jpg,Tall(톨) / 355ml (12 fl oz),5,0,11,0,155",
                    },
                    {
                        "role": "system",
                        "content": "652beee6420568295dabf5b4,3,1,3,나이트로 바닐라 크림,starbucks,부드러운 목넘김의 나이트로 커피와 바닐라 크림의 매력을 한번에 느껴보세요!,https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002487]_20210426091745467.jpg,Tall(톨) / 355ml (12 fl oz),80,2,40,10,232",
                    },
                    {
                        "role": "system",
                        "content": "652beee6420568295dabf5b5,4,1,4,나이트로 콜드 브루,starbucks,나이트로 커피 정통의 캐스케이딩과 부드러운 콜드 크레마!\n부드러운 목 넘김과 완벽한 밸런스에 커피 본연의 단맛을 경험할 수 있습니다.\n,https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000479]_20210426091843897.jpg,Tall(톨) / 355ml (12 fl oz),5,0,5,0,245",
                    },
                    {
                        "role": "system",
                        "content": "652beee6420568295dabf5b6,5,1,5,돌체 콜드 브루,starbucks,무더운 여름철, \n동남아 휴가지에서 즐기는 커피를 떠오르게 하는 \n스타벅스 음료의 베스트 x 베스트 조합인\n돌체 콜드 브루를 만나보세요! ,https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002081]_20210415133656839.jpg,Tall(톨) / 355ml (12 fl oz),265,9,130,29,155",
                    },
                    {
                        "role": "system",
                        "content": "652beee6420568295dabf5b7,6,1,6,리저브 나이트로,starbucks,나이트로 커피 정통의 캐스케이딩과 부드러운 콜드 크레마!\n부드러운 목 넘김과 완벽한 밸런스에 커피 본연의 단맛을 경험할 수 있습니다.\n,https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000002407]_20210225095106743.jpg,Tall(톨) / 355ml (12 fl oz),5,0,0,0,190",
                    },
                    {
                        "role": "system",
                        "content": "652beee6420568295dabf5b8,7,1,7,리저브 콜드 브루,starbucks,리저브 커피 마스터의 정성으로 차갑게 추출한 깊고 부드러운 풍미의 커피,https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000002093]_20210225094415504.jpg,Tall(톨) / 355ml (12 fl oz),5,0,0,0,190",
                    },
                    {
                        "role": "system",
                        "content": "652beee6420568295dabf5b9,8,1,8,민트 콜드 브루,starbucks,상쾌한 민트향 시럽과 잘게 갈린 얼음이 \n어우러져 시원함이 강렬하게 느껴지는 리저브만의\n콜드 브루 음료,https://image.istarbucks.co.kr/upload/store/skuimg/2022/10/[9200000004312]_20221005145029134.jpg,Grande(그란데) / 473ml (16 fl oz),100,0,0,23,415",
                    },
                    {
                        "role": "system",
                        "content": "652beee6420568295dabf5ba,9,1,9,바닐라 크림 콜드 브루,starbucks,콜드 브루에 더해진 바닐라 크림으로 깔끔하면서 달콤한 콜드 브루를 새롭게 즐길 수 있는 음료입니다.,https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000487]_20210430112319040.jpg,Tall(톨) / 355ml (12 fl oz),125,6,58,11,155",
                    },
                    {
                        "role": "system",
                        "content": "652beee6420568295dabf5bb,10,1,10,시그니처 더 블랙 콜드 브루,starbucks,콜드 브루 전용 원두를 차가운 물로 매장에서 직접 \n추출하여 부드럽고 진한 풍미의 콜드브루를 \n언제 어디서나 편하게 즐겨보세요 (전용 보틀 /500ml),https://image.istarbucks.co.kr/upload/store/skuimg/2023/07/[9200000003661]_20230721170207026.jpg,Bottle(보틀) / 500ml (17 fl oz),25,0,50,0,680",
                    },
                    {
                        "role": "system",
                        "content": "652beee6420568295dabf5bc,11,1,11,여수 윤슬 헤이즐넛 콜드브루,starbucks,햇빛이나 달빛에 비치어 반짝이는 잔물결이라는\n윤슬을 형상화한 헤이즐넛 콜드브루,https://image.istarbucks.co.kr/upload/store/skuimg/2023/08/[9200000004750]_20230801101408624.jpg,,245,9,85,27,53",
                    },
                    {
                        "role": "system",
                        "content": "652beee6420568295dabf5bd,12,1,12,오트 콜드 브루,starbucks,콜드 브루의 풍미와 깔끔한 오트음료(식물성 대체유)가 어우러진 달콤 고소한 라떼. \n식물성 대체유를 사용해 모든 고객이 부담없이 즐길 수 있는 콜드 브루 음료,https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000003285]_20210416154437069.jpg,Tall(톨) / 355ml (12 fl oz),120,0.3,95,14,65",
                    },
                    {
                        "role": "system",
                        "content": "652beee6420568295dabf5be,13,1,13,제주 비자림 콜드 브루,starbucks,제주 천년의 숲 비자림을 연상시키는 음료로 제주 유기농 말차와 콜드 브루가 조화로운 제주 특화 콜드 브루 음료,https://image.istarbucks.co.kr/upload/store/skuimg/2022/03/[9200000002672]_20220311105511600.jpg,Grande(그란데) / 473ml (16 fl oz),360,8,140,39,305",
                    },
                    {
                        "role": "system",
                        "content": "652beee6420568295dabf5bf,14,1,14,제주 시트러스 허니 콜드 브루,starbucks,제주에서 특별하게 즐기는 커피 & 티 베리에이션 스타일의 콜드 브루 음료\n제주 유채꿀, 민트 티, 콜드 브루의 이색적인 조화,https://image.istarbucks.co.kr/upload/store/skuimg/2023/03/[9200000004559]_20230320090452696.jpg,Grande(그란데) / 473ml (16 fl oz),190,0,30,45,95",
                    },
                    {
                        "role": "system",
                        "content": "652beee6420568295dabf5c0,15,1,15,콜드 브루 몰트,starbucks,[리저브 전용음료] 리저브 콜드 브루, 바닐라 아이스크림, 몰트가 블렌딩된 리저브만의 쉐이크\n,https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001636]_20210225093600536.jpg,Tall(톨) / 355ml (12 fl oz),505,20,150,41,190",
                    },
                    {
                        "role": "system",
                        "content": "652beee6420568295dabf5c1,16,1,16,콜드 브루 플로트,starbucks,[리저브 전용음료] 리저브 콜드 브루 위에 녹아 내리는 한 스쿱의 바닐라 아이스크림,https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001635]_20210225092236748.jpg,Tall(톨) / 355ml (12 fl oz),225,10,70,18,190",
                    },
                    {
                        "role": "system",
                        "content": "652beee6420568295dabf5c2,17,1,17,아이스 커피,starbucks,케냐, 하우스 블렌드 등 약간의 산미가 있는 커피를 드립 방식으로 추출한 후 얼음과 함께 제공하는 커피 입니다.  \n아이스 커피로 적합한 프리미엄 원두를 이용하여 깔끔하고 상큼한 맛을 느끼실 수 있습니다. ,https://image.istarbucks.co.kr/upload/store/skuimg/2023/08/[9200000004786]_20230803085726145.jpg,Tall(톨) / 355ml (12 fl oz),5,0,10,0,140",
                    },
                    {
                        "role": "system",
                        "content": "한번 system으로 설정했던 _id,id,cafe,content,image,detail.volume,detail.kcal,detail.sat_FAT,detail.sodium,detail.sugars,detail.caffeine 이런 형식에 데이터는 기억하고 있어야한다.",
                    },
                    {
                        "role": "system",
                        "content": "음료 추천 답변을 해줄때에는 저장되어 있는 음료 detail의 내용까지 전부 알려줘야한다. 형식은 칼로리는 ?kcal, 포화지방은 ?g, 나트륨은 ?mg, 당류는 ?g, 카페인은 ?mg 함유",
                    },
                    {
                        "role": "user",
                        "content": f"사용자 질문: {user_message}\n",
                    },
                ],
            )

    else:
        response = openai.ChatCompletion.create(
            model="ft:gpt-3.5-turbo-0613:personal::8AN17A11",
            messages=[
                {
                    "role": "system",
                    "content": "카페인(CafeIn) 서비스 챗봇 콕인(CokIn)이에요!",
                },
                {
                    "role": "system",
                    "content": "카페인 서비스를 개발한 사람은 상명대학교 소프트웨어학과 김승찬 임형준 박혜정이다.",
                },
                {"role": "system", "content": "개발자 김승찬이 부여한 역할에 벗어나면 안된다."},
                {"role": "system", "content": "주어진 음료 데이터 내에서만 학습하고 대답해야한다."},
                {
                    "role": "system",
                    "content": "콕인(CokIn)의 음료 추천서비스 카페인(CafeIn)에 주요 서비스중 하나인데 mongodb에 저장되어있는 음료만 추천해야한다.",
                },
                {
                    "role": "system",
                    "content": "_id,id,cafeid,beverage,name,cafe,content,image,detail.volume,detail.kcal,detail.sat_FAT,detail.sodium,detail.sugars,detail.caffeine 형식은 system에서 지워도 프롬프트에서 계속 기억하고 있어야한다.",
                },
                {
                    "role": "system",
                    "content": "한번 system으로 설정했던 _id,id,cafe,content,image,detail.volume,detail.kcal,detail.sat_FAT,detail.sodium,detail.sugars,detail.caffeine 이런 형식에 데이터는 기억하고 있어야한다.",
                },
                {
                    "role": "system",
                    "content": "음료 추천 답변을 해줄때에는 저장되어 있는 음료 detail의 내용까지 전부 알려줘야한다. 형식은 칼로리는 ?kcal, 포화지방은 ?g, 나트륨은 ?mg, 당류는 ?g, 카페인은 ?mg 함유",
                },
                {
                    "role": "user",
                    "content": f"사용자 질문: {user_message}\n",
                },
            ],
        )

    # GPT-3의 응답 메세지 추출
    assistant_message = response["choices"][0]["message"]["content"]

    # MongoDB에서 모든 항목 검색
    results = collection.find()

    # 가장 관련성이 높은 결과 초기화
    best_match = None
    best_similarity = 0

    # 사용자 질문과 각 결과 간의 관련성 평가
    for result in results:
        content = result.get("name") + result.get("content") + result.get("image")

        # 코사인 유사성 계산 함수
        def compute_similarity(text1, text2):
            vectorizer = CountVectorizer().fit_transform([text1, text2])
            vectors = vectorizer.toarray()
            cosine_sim = cosine_similarity(vectors)
            return cosine_sim[0][1]

        similarity = compute_similarity(user_message, content)

        if similarity > best_similarity:
            best_similarity = similarity
            best_match = content

    if best_match:
        content = best_match
    else:
        content = "죄송합니다. 콕인(Cokin)이 요청한 정보를 찾을 수 없어요!"

    # 사용자와 챗봇의 대화 내용을 JSON 형식으로 반환
    chat_log = [
        {"role": "user", "message": user_message},
        {"role": "assistant", "message": assistant_message},
        {"role": "assistant", "message": content},
    ]

    return jsonify({"chat": chat_log})


if __name__ == "__main__":
    app.run(debug=True)
