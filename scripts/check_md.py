import re
with open('src/data.ts') as f:
    text = f.read()

posts = ['blog-001', 'feature-summer-cosmetics', 'feature-summer-body-odor', 'feature-summer-uv']
for p in posts:
    idx = text.find(f"id: '{p}'")
    if idx == -1: continue
    start_md = text.find('contentMarkdown: `', idx) + 18
    end_md = text.find('`', start_md)
    md = text[start_md:end_md]
    print(f'=== {p} ===')
    print('Unsplash links:', re.findall(r'https://images\.unsplash\.com[^\s\)\\]+', md))
    print('Affiliate links (hb.afl):', len(re.findall(r'hb\.afl\.rakuten\.co\.jp', md)))
    print('Local product images:', re.findall(r'/images/products[^\s\)\\]+', md))
