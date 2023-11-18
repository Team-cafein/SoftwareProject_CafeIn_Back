import json
import os

print("현재 작업 디렉터리:", os.getcwd())

# Read data from test1.json
with open("./fintuning/test1.json", "r", encoding="utf-8") as file:
    json_data = json.load(file)

# Convert to the specified format
formatted_data = []
for item in json_data:
    formatted_item = {
        "role": "assistant",
        "content": f'{hash(item["prodName"])}1,1,1,{item["prodName"]},{item["prodCafe"]},{item["prodContent"]},{item["prodImage"]},{item["prodDetail"]["volume"]},{item["prodDetail"]["kcal"]},{item["prodDetail"]["caffeine"]},{item["prodDetail"]["sodium"]},{item["prodDetail"]["sugars"]},{item["prodDetail"]["sat_FAT"]}',
    }
    formatted_data.append(formatted_item)

# Convert to JSON string
formatted_json = json.dumps(formatted_data, ensure_ascii=False, indent=2)

# Save the result to a new file
with open("formatted_data.json", "w", encoding="utf-8") as output_file:
    output_file.write(formatted_json)

# Print a message
print("Formatted data has been saved to formatted_data.json")
