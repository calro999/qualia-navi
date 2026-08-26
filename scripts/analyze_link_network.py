# -*- coding: utf-8 -*-
import json
import os

with open('src/data/articles.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

print(f"Total articles in database: {len(articles)}")

# 10選系（feature記事）と個別商品記事の分類
feature_articles = [a for a in articles if a.get('id', '').startswith('feature-')]
single_product_articles = [a for a in articles if not a.get('id', '').startswith('feature-')]

print(f"Feature articles (10選系・ハブ記事): {len(feature_articles)}")
print(f"Single product articles: {len(single_product_articles)}")

# 10選系記事のリストアップ
for fa in feature_articles:
    print(f"- {fa.get('id')}: {fa.get('title')[:45]}")

