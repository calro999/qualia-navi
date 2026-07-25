import re
with open('src/data.ts') as f:
    text = f.read()

posts = ['blog-001', 'feature-summer-cosmetics', 'feature-summer-body-odor', 'feature-summer-uv']
for p in posts:
    idx = text.find(f"id: '{p}'")
    if idx == -1: continue
    end_idx = text.find('},', idx)
    with open(f'/tmp/{p}.txt', 'w') as out:
        out.write(text[idx:end_idx])
