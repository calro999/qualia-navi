import re
import json

def load_articles():
    with open('src/data/articles.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def main():
    articles = load_articles()
    code_to_product = {art['itemCode']: art for art in articles}
    
    with open('src/data.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace the injected HTML with pure Markdown
    # We look for <div ...> \n <img src="(.*?)" ...> \n <a href="(.*?)" ...> 🛍️ (.*?) </a> \n </div>
    # Note: the original get_product_html injected:
    # <div style="text-align: center; margin: 2rem 0;">
    #   <img src="{image_url}" alt="商品画像" style="..." />
    #   <a href="{aff_link}" ...>
    #     🛍️ {title}
    #   </a>
    # </div>
    
    pattern = r'<div style="text-align: center; margin: 2rem 0;">\s*<img src="(.*?)" alt="商品画像"[^>]*>\s*<a href="(.*?)"[^>]*>\s*🛍️(.*?)\s*</a>\s*</div>'
    
    def repl(m):
        img_url = m.group(1)
        aff_link = m.group(2)
        title = m.group(3).strip()
        return f"\n\n![商品画像]({img_url})\n\n[🛍️ {title}]({aff_link})\n\n"
        
    content = re.sub(pattern, repl, content)

    # 2. Update coverImages to use arrays of product images instead of Unsplash/composite strings
    # But wait, how do we know which products belong to which post?
    # In data.ts, blog posts have `recommendedItemCodes: ['code1', 'code2', ...]`
    # Comparisons have `productItemCodeA: 'codeA', productItemCodeB: 'codeB'`
    
    # For BlogPosts:
    def post_repl(m):
        full_match = m.group(0)
        recommended_str = m.group(1) # e.g. 'code1', 'code2'
        codes = re.findall(r"'(.*?)'", recommended_str)
        images = []
        for c in codes[:4]:
            if c in code_to_product:
                images.append(f"'{code_to_product[c]['imageUrl']}'")
        if not images:
            return full_match
        
        # Replace the coverImage line inside this block
        new_match = re.sub(r"coverImage:\s*'[^']+',", f"coverImage: [{', '.join(images)}],", full_match)
        return new_match

    # Find the INITIAL_BLOG_POSTS block
    # It contains recommendedItemCodes: ['...'] and coverImage: '...'
    blog_pattern = r"({\s*id: 'art-.*?coverImage:\s*'[^']+',(?:.*?recommendedItemCodes:\s*\[([^\]]+)\])?.*?})"
    
    # Actually, Python regex over large ASTs is hard. We can just use a simpler replacement:
    # Match id, then coverImage, then recommendedItemCodes and rebuild it? 
    # Let's just find `recommendedItemCodes: \[(.*?)\]` and replace the preceding/succeeding coverImage.
    
    # Better approach: split by `id: '` and process each block
    blocks = content.split("id: '")
    new_blocks = [blocks[0]]
    
    for block in blocks[1:]:
        if 'coverImage:' in block:
            # Find item codes
            codes = []
            rec_match = re.search(r"recommendedItemCodes:\s*\[(.*?)\]", block, re.DOTALL)
            comp_a_match = re.search(r"productItemCodeA:\s*'([^']+)'", block)
            comp_b_match = re.search(r"productItemCodeB:\s*'([^']+)'", block)
            
            if rec_match:
                codes = re.findall(r"'([^']+)'", rec_match.group(1))
            elif comp_a_match and comp_b_match:
                codes = [comp_a_match.group(1), comp_b_match.group(1)]
                
            if codes:
                images = []
                for c in codes[:4]: # Max 4 images for grid
                    if c in code_to_product:
                        images.append(f"'{code_to_product[c]['imageUrl']}'")
                
                if images:
                    # Replace coverImage: '...', with coverImage: ['url', ...],
                    block = re.sub(r"coverImage:\s*'[^']+',?", f"coverImage: [{', '.join(images)}],", block)
                    
        new_blocks.append(block)
        
    content = "id: '".join(new_blocks)

    with open('src/data.ts', 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Patched data.ts markdown and coverImages")

if __name__ == "__main__":
    main()
