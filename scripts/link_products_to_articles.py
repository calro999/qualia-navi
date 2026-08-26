# -*- coding: utf-8 -*-
import json
import os
import re

with open('src/data/articles.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

# 全商品DB（単体商品記事）のインデックス作成
# タイトルや商品名から検索できるようにマッピング
product_articles = [a for a in articles if not a.get('id', '').startswith('feature-')]

print(f"Product articles count: {len(product_articles)}")

# 商品の識別用キーワード辞書（代表的なコスメ・名品）
# 各アイテムのキーワード -> 単体記事のID / リンク先
keyword_to_article = {}

for p in product_articles:
    pid = p['id']
    pname = p.get('productName', '')
    title = p.get('title', '')
    
    # 簡易正規化
    clean_pname = re.sub(r'【.*?】|\[.*?\]|★.*?★|◆.*?◆', '', pname).strip()
    
    # 代表的なマッチングキーの登録
    if len(clean_pname) >= 4:
        keyword_to_article[clean_pname.lower()] = pid
    if len(title) >= 4:
        keyword_to_article[title[:20].lower()] = pid

print(f"Total keyword mappings: {len(keyword_to_article)}")

# 代表的な殿堂入り商品の個別記事IDマッピング（確実な直接リンク用）
# 主要な商品がどの単体記事に対応するか、または既存記事から最もマッチするものを探索
def find_best_product_article_id(item_name):
    clean = item_name.lower().replace(' ', '').replace('　', '').replace('・', '')
    for p in product_articles:
        p_title = p.get('title', '').lower().replace(' ', '').replace('　', '').replace('・', '')
        p_name = p.get('productName', '').lower().replace(' ', '').replace('　', '').replace('・', '')
        
        # 主要キーワードの包含チェック
        keywords = [k for k in ['リップモンスター', 'マキシマイザー', 'ダブルウェア', 'ゼンウェア', 'ヴォワールコレクチュール', 'リポソーム', '陽香色', 'ネンマクフェイク', 'スキングロウ', 'プリンポット', 'ジューシーラスティング', 'マシュマロフィニッシュ', '皮脂テカリ防止', 'ファンシーラー', 'アンリミテッド', 'タンイドル', 'リンクルショット', 'サボン', 'キャンディグレーズ', 'レオスールデクラ', 'ルセラム', 'ラッシュエキスパンダー', 'ノーセバム'] if k in clean]
        
        for kw in keywords:
            if kw in p_title or kw in p_name:
                return p['id'], p['title']
    return None, None

# 10選系記事の中身を走査し、各商品セクションに単体詳細レビュー記事への内部リンクを挿入
feature_articles = [a for a in articles if a.get('id', '').startswith('feature-')]
updated_count = 0

for fa in feature_articles:
    body = fa.get('reviewBody', '')
    lines = body.split('\n')
    new_lines = []
    
    for line in lines:
        new_lines.append(line)
        # 商品見出しの直後に個別レビュー記事へのリンクを自動付与
        if line.startswith('## ') and '【' in line and '】' in line:
            item_name = line.split('【')[1].split('】')[0]
            matched_id, matched_title = find_best_product_article_id(item_name)
            if matched_id:
                link_text = f"> 📖 **[【単体詳細レビュー】「{item_name}」の成分解析・口コミ・最安値情報はこちら ↗](/articles/{matched_id})**"
                new_lines.append(link_text)
                new_lines.append("")
    
    new_body = '\n'.join(new_lines)
    if new_body != body:
        fa['reviewBody'] = new_body
        updated_count += 1

print(f"Updated {updated_count} feature articles with internal single-product review links!")

with open('src/data/articles.json', 'w', encoding='utf-8') as f:
    json.dump(articles, f, ensure_ascii=False, indent=2)

print("Saved updated articles.json successfully!")
