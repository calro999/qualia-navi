import re
import os

filepath = 'scripts/generate_qualia_articles.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure generated_articles starts with existing
fix1_old = """    existing_map = {art['id']: art for art in existing_articles}

    for index, topic in enumerate(topics):
        topic_id = topic.get('id', f'qualia-{index+1:03d}')
        
        # Skip if already exists
        if topic_id in existing_map:
            generated_articles.append(existing_map[topic_id])
            continue"""

fix1_new = """    existing_map = {art['id']: art for art in existing_articles}
    generated_articles = existing_articles.copy()

    for index, topic in enumerate(topics):
        topic_id = topic.get('id', f'qualia-{index+1:03d}')
        
        # Skip if already exists
        if topic_id in existing_map:
            continue"""
content = content.replace(fix1_old, fix1_new)

# Give trending items a unique ID and image name so they don't overwrite
import time
fix2_old = """                    local_r_img = ensure_local_product_image(r_img, f"autodiscover_{discovered_count}.jpg", public_img_dir)
                    
                    trending_article = {
                        "id": f"autodiscover-trending-{discovered_count}","""

fix2_new = """                    import time
                    timestamp = int(time.time())
                    unique_id = f"{discovered_count}_{timestamp}"
                    local_r_img = ensure_local_product_image(r_img, f"autodiscover_{unique_id}.jpg", public_img_dir)
                    
                    trending_article = {
                        "id": f"autodiscover-trending-{unique_id}","""
content = content.replace(fix2_old, fix2_new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched script 2")
