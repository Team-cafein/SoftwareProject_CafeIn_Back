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
#     # 결과를 원하는 형식으로 조합
#     result_json = json.loads(content)
#     response_message = f"{result_json['name']}는 {result_json['cafe']}에서 추천하는 음료 중 하나입니다. 상세 내용은 다음과 같습니다:\n\n- 이름: {result_json['name']}\n- 카페: {result_json['cafe']}\n- 내용: {result_json['content']}\n- 이미지: {result_json['image']}\n- 세부 정보:\n  - 용량: {result_json['detail']['volume']}\n  - 칼로리: {result_json['detail']['kcal']}\n  - 포화지방: {result_json['detail']['sat_FAT']}\n  - 나트륨: {result_json['detail']['sodium']}\n  - 당류: {result_json['detail']['sugars']}\n  - 카페인: {result_json['detail']['caffeine']} 함유"
# else:
#     content = "죄송합니다. 콕인(Cokin)이 요청한 정보를 찾을 수 없어요!"

# # 최종 답변 생성
# final_response = f"{response_text}\n답변: {content}"
# print(final_response)


import openai
import json
from dotenv import load_dotenv
import os
from pymongo import MongoClient
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import certifi

# .env 파일 로드
load_dotenv()

# .env 파일에서 OPENAI_SECRET_KEY 및 MONGO_URI 환경 변수 읽기
openai.api_key = os.getenv("OPENAI_SECRET_KEY")

# MongoDB 연결
ca = certifi.where()
mongodb = os.getenv("MONGO_URI")
client = MongoClient(
    f"{mongodb}Cluster0?retryWrites=true&w=majority",
    tlsCAFile=ca,
)

db = client.test
collection = db.get_collection("cafe/starbucks")

# 사용자 질문
user_question = "민트 콜드 브루에 대해서 설명해줘"

response = openai.ChatCompletion.create(
    model="ft:gpt-3.5-turbo-0613:personal::8AN17A11",
    messages=[
        {
            "role": "system",
            "content": "카페인(CafeIn) 서비스 챗봇 콕인(CokIn)이에요! 10분마다 앞에 자기소개를 다시 해야한다.",
        },
        {"role": "system", "content": "카페인 서비스를 개발한 사람은 상명대학교 소프트웨어학과 김승찬 임형준 박혜정이다."},
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
            "content": f"사용자 질문: {user_question}\n",
        },
    ],
)

# 사용자 질문에 대한 GPT-3 모델 응답 가져오기
response_text = (
    response["choices"][0]["message"]["content"].encode("utf-8").decode("utf-8")
)

# MongoDB에서 데이터를 읽어와 JSON 형식으로 저장
results = collection.find()
data_list = []

for result in results:
    # ObjectId를 문자열로 변환
    result["_id"] = str(result["_id"])
    data_list.append(result)

# JSON 파일로 저장
with open("cafe_data.json", "w") as json_file:
    json.dump(data_list, json_file, default=str)  # default=str를 추가하여 ObjectId를 문자열로 변환


# 가장 관련성이 높은 결과 초기화
best_match = None
best_similarity = 0

# 사용자 질문과 각 결과 간의 관련성 평가
for data in data_list:
    content = data.get("content")

    # 코사인 유사성 계산 함수
    def compute_similarity(text1, text2):
        vectorizer = CountVectorizer().fit_transform([text1, text2])
        vectors = vectorizer.toarray()
        cosine_sim = cosine_similarity(vectors)
        return cosine_sim[0][1]

    similarity = compute_similarity(user_question, content)

    if similarity > best_similarity:
        best_similarity = similarity
        best_match = content

if best_match:
    content = best_match
    # 결과를 원하는 형식으로 조합
    result_json = json.loads(content)
    response_message = f"{result_json['name']}는 {result_json['cafe']}에서 추천하는 음료 중 하나입니다. 상세 내용은 다음과 같습니다:\n\n- 이름: {result_json['name']}\n- 카페: {result_json['cafe']}\n- 내용: {result_json['content']}\n- 이미지: {result_json['image']}\n- 세부 정보:\n  - 용량: {result_json['detail']['volume']}\n  - 칼로리: {result_json['detail']['kcal']}\n  - 포화지방: {result_json['detail']['sat_FAT']}\n  - 나트륨: {result_json['detail']['sodium']}\n  - 당류: {result_json['detail']['sugars']}\n  - 카페인: {result_json['detail']['caffeine']} 함유"
else:
    content = "죄송합니다. 콕인(Cokin)이 요청한 정보를 찾을 수 없어요!"

# 최종 답변 생성
final_response = f"{response_text}\n답변: {content}"
print(final_response)
