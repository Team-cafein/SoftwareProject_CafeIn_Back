# import pandas as pd
# import openai
# from sentence_transformers import SentenceTransformer, util
# import torch
# from dotenv import load_dotenv
# import os

# # .env 파일 로드
# load_dotenv()

# import base64

# # 파인 튜닝 된 모델로 질문 하기
# response2 = openai.ChatCompletion.create(
#     model="ft:gpt-3.5-turbo-0613:personal::8AN17A11",
#     messages=[{"role": "user", "content": "콕인에 대해서 설명해줘"}],
# )

# # 응답을 utf-8 문자열로 디코딩합니다.
# response_text = (
#     response2["choices"][0]["message"]["content"].encode("utf-8").decode("utf-8")
# )

# print(response_text)


# # .env 파일에서 OPENAI_SECRET_KEY 환경 변수 읽기 # ChatGPT API 키 설정
# openai.api_key = os.getenv("OPENAI_SECRET_KEY")


# # ChatGPT로 응답 생성
# def generate_response(query):
#     response = openai.Completion.create(engine="davinci", prompt=query, max_tokens=100)
#     return response.choices[0].text.strip()


# def recommend_coffee():
#     query = "I would like a coffee recommendation"
#     response = generate_response(query)
#     return response


# def main(query):
#     if "recommend coffee" in query:
#         response = recommend_coffee()
#     elif "describe" in query:
#         coffee_name = "coffee"  # 여기에 커피 이름을 추출하는 로직 추가
#         response = describe_coffee(coffee_name)
#     elif "additional info" in query:
#         coffee_name = "coffee"  # 여기에 커피 이름을 추출하는 로직 추가
#         response = provide_additional_info(coffee_name)
#     else:
#         response = generate_response(query)

#     return response


# def provide_additional_info(coffee_name):
#     # 커피 이름을 이용하여 추가 정보를 가져오는 로직 추가
#     coffee_info = coffee_data[coffee_data["name"] == coffee_name]

#     if not coffee_info.empty:
#         additional_info = f"Caffeine: {coffee_info['detail.caffeine'].values[0]} mg\nKcal: {coffee_info['detail.kcal'].values[0]}\nSaturated Fat: {coffee_info['detail.sat_FAT'].values[0]} g\nSodium: {coffee_info['detail.sodium'].values[0]} mg\nSugars: {coffee_info['detail.sugars'].values[0]} g"
#         return additional_info
#     else:
#         return "I'm sorry, I don't have information about that coffee."


# def describe_coffee(coffee_name):
#     # 커피 이름을 이용하여 상세 정보를 가져오는 로직 추가
#     coffee_info = coffee_data[coffee_data["name"] == coffee_name]

#     if not coffee_info.empty:
#         description = coffee_info["content"].values[0]
#         return description
#     else:
#         return "I'm sorry, I don't have information about that coffee."


# # CSV 파일에서 커피 데이터 읽어오기
# coffee_data = pd.read_csv("starbucks.csv")


# # 커피 이름 추출을 위한 Sentence Transformer 모델 초기화
# model = SentenceTransformer("paraphrase-MiniLM-L6-v2")


# # 사용자 질문에서 커피 이름 추출
# def extract_coffee_name(query):
#     # 커피 데이터에서 커피 이름 목록 추출
#     coffee_names = coffee_data["name"].tolist()

#     # 입력 질문을 Sentence Transformer 모델로 임베딩
#     query_embedding = model.encode(query, convert_to_tensor=True)

#     # 모든 커피 이름에 대한 임베딩 생성
#     coffee_name_embeddings = model.encode(coffee_names, convert_to_tensor=True)

#     # 사용자 질문과 모든 커피 이름 간의 코사인 유사도 계산
#     similarities = util.pytorch_cos_sim(query_embedding, coffee_name_embeddings)[0]

#     # 유사도가 가장 높은 커피 이름 추출
#     closest_coffee_name = coffee_names[similarities.argmax()]

#     return closest_coffee_name


# # 커피 이름 추출
# coffee_name = extract_coffee_name(query)


import pandas as pd
import openai
from sentence_transformers import SentenceTransformer, util
import torch
from dotenv import load_dotenv
import os
import base64

# .env 파일 로드
load_dotenv()

# .env 파일에서 OPENAI_SECRET_KEY 환경 변수 읽기
openai.api_key = os.getenv("OPENAI_SECRET_KEY")

# 커피 정보를 가지고 있는 CSV 파일 읽어오기
coffee_data = pd.read_csv("starbucks.csv")

# Sentence Transformer 모델 초기화
model = SentenceTransformer("paraphrase-MiniLM-L6-v2")


# 사용자 질문에서 커피 이름 추출
def extract_coffee_name(query):
    coffee_names = coffee_data["name"].tolist()
    query_embedding = model.encode(query, convert_to_tensor=True)
    coffee_name_embeddings = model.encode(coffee_names, convert_to_tensor=True)
    similarities = util.pytorch_cos_sim(query_embedding, coffee_name_embeddings)[0]
    closest_coffee_name = coffee_names[similarities.argmax()]
    return closest_coffee_name


# 커피 이름 추출
query = "I would like information about Espresso"
coffee_name = extract_coffee_name(query)

# 프롬프트 엔지니어링을 사용한 모델 호출
response2 = openai.ChatCompletion.create(
    model="ft:gpt-3.5-turbo-0613:personal::8AN17A11",
    messages=[{"role": "user", "content": f"Tell me about {coffee_name}"}],
)

# 응답을 출력
response_text = (
    response2["choices"][0]["message"]["content"].encode("utf-8").decode("utf-8")
)
print(response_text)
