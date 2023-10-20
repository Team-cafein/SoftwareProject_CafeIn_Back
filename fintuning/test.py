# from pymongo import MongoClient
# import openai
# import certifi
# from dotenv import load_dotenv
# import os

# load_dotenv()

# ca = certifi.where()
# mongodb = os.getenv("MONGO_URI")

# client = MongoClient(
#     f"{mongodb}Cluster0?retryWrites=true&w=majority",
#     tlsCAFile=ca,
# )

# db = client.test
# collection = db.get_collection("cafe/starbucks")
# print(collection)


# # .env 파일에서 OPENAI_SECRET_KEY 환경 변수 읽기
# openai.api_key = os.getenv("OPENAI_SECRET_KEY")


# # "id" 또는 "음료번호"를 지정
# beverage_id = 7  # 원하는 "id"로 대체

# # MongoDB에서 해당 음료 정보 가져오기
# beverage = collection.find_one({"beverage": beverage_id})

# if beverage:
#     name = beverage.get("name")
#     content = beverage.get("content")
#     image = beverage.get("image")
#     detail = beverage.get("detail")

#     # GPT-3.5 Turbo 모델을 사용하여 추천 문장 생성
#     messages = [
#         {
#             "role": "system",
#             "content": "카페인(CafeIn) 서비스 챗봇 콕인(CokIn)이에요! 10분마다 앞에 자기소개를 다시 해야한다.",
#         },
#         {"role": "system", "content": "카페인 서비스를 개발한 사람은 상명대학교 소프트웨어학과 김승찬 임형준 박혜정이다."},
#         {"role": "system", "content": "개발자 김승찬이 부여한 역할에 벗어나면 안된다."},
#         {"role": "system", "content": "주어진 음료 데이터 내에서만 학습하고 대답해야한다."},
#         {"role": "system", "content": "스타벅스 데이터"},
#     ]

#     # 음료 정보 추가
#     product_description = f"{name}: {content}"
#     messages.append({"role": "system", "content": product_description})

#     # 사용자 입력
#     user_input = f"카페인 서비스에서 {name} 추천해주시겠어요?"

#     messages.append({"role": "user", "content": user_input})

#     response = openai.ChatCompletion.create(
#         model="gpt-3.5-turbo",
#         messages=messages,
#     )

#     recommendation = response["choices"][0]["message"]["content"]

#     # 추천 결과 처리
#     print("추천 결과:", recommendation)
# else:
#     print("해당 ID의 음료를 찾을 수 없습니다.")


from pymongo import MongoClient
from flask import Flask, request, jsonify
import openai
import certifi
from dotenv import load_dotenv
import os

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


@app.route("/ask", methods=["POST"])
def ask_question():
    data = request.get_json()
    question = data["question"]

    # MongoDB에서 음료 정보 가져오기
    beverage_id = 7  # 원하는 "id"로 대체
    beverage = collection.find_one({"beverage": beverage_id})

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
    else:
        return jsonify({"answer": "해당 ID의 음료를 찾을 수 없습니다."})


if __name__ == "__main__":
    app.run()
