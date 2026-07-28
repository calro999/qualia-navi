import re
import json

def load_articles():
    with open('src/data/articles.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def get_product_html(image_url, aff_link, title="楽天市場で最安値と口コミをチェックする"):
    # Using markdown + HTML for a beautiful button
    return f"""

<div style="text-align: center; margin: 2rem 0;">
  <img src="{image_url}" alt="商品画像" style="max-width: 300px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); margin: 0 auto 1.5rem auto;" />
  <a href="{aff_link}" target="_blank" rel="noopener" style="display: inline-block; background: linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%); color: white; padding: 16px 32px; border-radius: 50px; font-weight: bold; text-decoration: none; box-shadow: 0 10px 20px rgba(255, 65, 108, 0.3); transition: transform 0.2s;">
    🛍️ {title}
  </a>
</div>

"""

def main():
    articles = load_articles()
    
    # Create lookup dictionaries
    code_to_product = {art['itemCode']: art for art in articles}
    
    with open('src/data.ts', 'r', encoding='utf-8') as f:
        content = f.read()
        
    # 1. Remove the meta string
    meta_string = "*この記事は自動生成されたまとめ記事です。各商品の詳細は詳細ページよりご確認ください。*"
    content = content.replace(meta_string, "")
    
    new_content = []
    
    lines = content.split('\n')
    i = 0
    while i < len(lines):
        line = lines[i]
        new_content.append(line)
        
        # Check if line is a header inside markdown (starts with ## or ###)
        match = re.match(r'^\s*(#{2,3})\s+(.+)$', line)
        if match:
            header_level = match.group(1)
            header_text = match.group(2)
            
            # See if any product name is in this header
            # We want to match the most specific product name
            best_match = None
            best_len = 0
            
            for code, prod in code_to_product.items():
                # Take first 15 chars to match the start of the product name (which usually contains the brand/model)
                core_name = prod['productName'][:15]
                # Sometimes product names have spaces or symbols, let's split by space and take the first block
                short_name = core_name.split()[0] if ' ' in core_name else core_name
                
                # if short_name is too short (like 2 chars), skip
                if len(short_name) < 3:
                    continue
                    
                if short_name in header_text and len(short_name) > best_len:
                    best_match = prod
                    best_len = len(short_name)
                    
            if best_match:
                # We found a product being introduced!
                html_block = get_product_html(best_match['imageUrl'], best_match['affiliateLink'])
                
                # Check if already has image
                already_has_image = False
                for j in range(1, 10):
                    if i + j < len(lines) and '<img' in lines[i+j]:
                        already_has_image = True
                        break
                        
                if not already_has_image:
                    new_content.append(html_block)
                    
        i += 1
        
    final_content = '\n'.join(new_content)
    
    with open('src/data.ts', 'w', encoding='utf-8') as f:
        f.write(final_content)
        
    print("Successfully patched src/data.ts")

if __name__ == "__main__":
    main()
