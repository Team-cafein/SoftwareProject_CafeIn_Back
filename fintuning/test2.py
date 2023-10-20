# from pymongo import MongoClient
# import openai
# import certifi
# from dotenv import load_dotenv
# import os
# import spacy
# from flask import Flask, request, jsonify

# load_dotenv()

# ca = certifi.where()
# mongodb = os.getenv("MONGO_URI")

# client = MongoClient(
#     f"{mongodb}Cluster0?retryWrites=true&w=majority",
#     tlsCAFile=ca,
# )

# db = client.test
# collection = db.get_collection("cafe/starbucks")

# # Flask 서버 설정
# app = Flask(__name__)

# # OpenAI API 설정
# openai.api_key = os.getenv("OPENAI_SECRET_KEY")

# # SpaCy NLP 모델 로드
# nlp = spacy.load("/Users/chan6502/Library/Python/3.11/lib/python/site-packages/spacy/en_core_web_sm")


# @app.route("/ask", methods=["POST"])
# def ask_question():
#     data = request.get_json()
#     question = data["question"]

#     # 사용자의 질문에서 관련 정보 추출
#     keywords = extract_keywords(question)

#     if keywords:
#         cafe = keywords.get("cafe")
#         beverage_name = keywords.get("beverage_name")

#         # MongoDB에서 음료 정보 검색
#         beverage = find_beverage(cafe, beverage_name)

#         if beverage:
#             name = beverage.get("name")
#             content = beverage.get("content")

#             # GPT-3.5 Turbo 모델을 사용하여 추천 문장 생성
#             messages = [
#                 {
#                     "role": "system",
#                     "content": "카페인(CafeIn) 서비스 챗봇 콕인(CokIn)이에요! 10분마다 앞에 자기소개를 다시 해야한다.",
#                 },
#                 {
#                     "role": "system",
#                     "content": "카페인 서비스를 개발한 사람은 상명대학교 소프트웨어학과 김승찬 임형준 박혜정이다.",
#                 },
#                 {"role": "system", "content": "개발자 김승찬이 부여한 역할에 벗어나면 안된다."},
#                 {"role": "system", "content": "주어진 음료 데이터 내에서만 학습하고 대답해야한다."},
#                 {"role": "system", "content": "스타벅스 데이터"},
#             ]

#             # 음료 정보 추가
#             product_description = f"{name}: {content}"
#             messages.append({"role": "system", "content": product_description})

#             # 사용자 입력
#             user_input = f"카페인 서비스에서 {name} 추천해주시겠어요?"
#             messages.append({"role": "user", "content": user_input})

#             response = openai.ChatCompletion.create(
#                 model="gpt-3.5-turbo",
#                 messages=messages,
#             )

#             recommendation = response["choices"][0]["message"]["content"]
#             return jsonify({"answer": recommendation})

#     return jsonify({"answer": "해당 요청에 대한 정보를 찾을 수 없습니다."})


# # 사용자 질문에서 키워드 추출 함수
# def extract_keywords(question):
#     doc = nlp(question)
#     keywords = {}
#     for token in doc:
#         if token.ent_type_ == "GPE":  # 국가 및 지리적 위치
#             keywords["cafe"] = token.text
#         elif token.ent_type_ == "PRODUCT":  # 제품 또는 상품명
#             keywords["beverage_name"] = token.text
#     return keywords


# # MongoDB에서 음료 정보 검색 함수
# def find_beverage(cafe, beverage_name):
#     beverage = collection.find_one({"cafe": cafe, "name": beverage_name})
#     return beverage


# if __name__ == "__main__":
#     app.run()


from pymongo import MongoClient
import openai
import certifi
from dotenv import load_dotenv
import os
import spacy
from flask import Flask, request, jsonify

load_dotenv()

ca = certifi.where()
mongodb = os.getenv("MONGO_URI")

client = MongoClient(
    f"{mongodb}Cluster0?retryWrites=true&w=majority",
    tlsCAFile=ca,
)


db = client.test
collection = db.get_collection("cafe/starbucks")

# Flask 서버 설정
app = Flask(__name__)

# OpenAI API 설정
openai.api_key = os.getenv("OPENAI_SECRET_KEY")

# SpaCy NLP 모델 로드
nlp = spacy.load("en_core_web_sm")


@app.route("/ask", methods=["POST"])
def ask_question():
    data = request.get_json()
    question = data["question"]

    # 사용자의 질문에서 관련 정보 추출
    keywords = extract_keywords(question)

    if keywords:
        cafe = keywords.get("cafe")
        beverage_name = keywords.get("beverage_name")

        # MongoDB에서 음료 정보 검색
        beverage = find_beverage(cafe, beverage_name)

        if beverage:
            name = beverage.get("name")
            content = beverage.get("content")

            # GPT-3.5 Turbo 모델을 사용하여 추천 문장 생성
            messages = [
                {
                    "role": "system",
                    "content": "카페인(CafeIn) 서비스 챗봇 콕인(CokIn)이에요! 10분마다 앞에 자기소개를 다시 해야한다.",
                },
                {
                    "role": "system",
                    "content": "카페인 서비스를 개발한 사람은 상명대학교 소프트웨어학과 김승찬 임형준 박혜정이다.",
                },
                {"role": "system", "content": "개발자 김승찬이 부여한 역할에 벗어나면 안된다."},
                {"role": "system", "content": "주어진 음료 데이터 내에서만 학습하고 대답해야한다."},
                {"role": "system", "content": "스타벅스 데이터"},
            ]

            # 음료 정보 추가
            product_description = f"{name}: {content}"
            messages.append({"role": "system", "content": product_description})

            # 사용자 입력
            user_input = f"카페인 서비스에서 {name} 추천해주시겠어요?"
            messages.append({"role": "user", "content": user_input})

            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=messages,
            )

            recommendation = response["choices"][0]["message"]["content"]
            return jsonify({"answer": recommendation})

    return jsonify({"answer": "해당 요청에 대한 정보를 찾을 수 없습니다."})


# 사용자 질문에서 키워드 추출 함수
def extract_keywords(question):
    doc = nlp(question)
    keywords = {}
    for token in doc:
        if token.ent_type_ == "GPE":  # 국가 및 지리적 위치
            keywords["cafe"] = token.text
        elif token.ent_type_ == "PRODUCT":  # 제품 또는 상품명
            keywords["beverage_name"] = token.text
    return keywords


# MongoDB에서 음료 정보 검색 함수
def find_beverage(cafe, beverage_name):
    beverage = collection.find_one({"cafe": cafe, "name": beverage_name})
    return beverage


if __name__ == "__main__":
    app.run()
