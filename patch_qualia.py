import re
import os

filepath = 'scripts/generate_qualia_articles.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Modify the loop to check for existing articles
load_json_code = """
    out_json_path = os.path.join(project_root, 'src', 'data', 'articles.json')
    existing_articles = []
    if os.path.exists(out_json_path):
        import json
        with open(out_json_path, 'r', encoding='utf-8') as f:
            try:
                existing_articles = json.load(f)
            except:
                pass
    existing_map = {art['id']: art for art in existing_articles}

    for index, topic in enumerate(topics):
"""
content = content.replace("    for index, topic in enumerate(topics):", load_json_code)

skip_existing_code = """
        topic_id = topic.get('id', f'qualia-{index+1:03d}')
        
        # Skip if already exists
        if topic_id in existing_map:
            generated_articles.append(existing_map[topic_id])
            continue

"""
content = content.replace("        topic_id = topic.get('id', f'qualia-{index+1:03d}')", skip_existing_code)


# 2. Fix the AUTO-RESEARCH endpoint
auto_research_old = """        ranking_url = "https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20170628"
        actual_app_id = app_id if (app_id and app_id != 'DUMMY') else "1016454040700000000"
        rank_params = {
            "applicationId": actual_app_id,
            "genreId": "100939",
            "format": "json"
        }"""

auto_research_new = """        ranking_url = "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401"
        actual_app_id = app_id if (app_id and app_id != 'DUMMY') else "1a3cdfd9-2aec-4b42-8290-1c53603b0012"
        rank_params = {
            "applicationId": actual_app_id,
            "accessKey": access_key,
            "genreId": "100939",
            "sort": "-reviewCount",
            "format": "json"
        }"""
content = content.replace(auto_research_old, auto_research_new)

# 3. Prevent Auto-Research from adding duplicates
check_duplicate_old = """                # Check uniqueness against existing items
                if not any(kw in r_name for kw in ["アネッサ", "リポソーム", "リードルショット", "KATE", "TIRTIR", "ファンケル", "キュレル"]):"""
                
check_duplicate_new = """                # Check uniqueness against existing items
                existing_names = [a.get('productName', '') for a in existing_articles]
                is_duplicate = any(kw in r_name for kw in ["アネッサ", "リポソーム", "リードルショット", "KATE", "TIRTIR", "ファンケル", "キュレル"])
                if not is_duplicate and r_name[:35] not in existing_names:"""
content = content.replace(check_duplicate_old, check_duplicate_new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched script")
