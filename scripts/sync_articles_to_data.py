import json
import os

json_path = 'src/data/articles.json'
data_ts_path = 'src/data.ts'

if not os.path.exists(json_path) or not os.path.exists(data_ts_path):
    print("Files not found")
    exit(1)

with open(json_path, 'r', encoding='utf-8') as f:
    articles = json.load(f)

# data.tsの読込
with open(data_ts_path, 'r', encoding='utf-8') as f:
    content = f.read()

# articles.json内の主要記事データをdata.ts内でも参照可能な構造にするかチェック
print(f"Loaded {len(articles)} articles from json.")
