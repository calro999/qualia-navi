import json
import urllib.parse
import os

def load_env():
    env_vars = {}
    if os.path.exists('.env'):
        with open('.env', 'r') as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    k, v = line.strip().split('=', 1)
                    env_vars[k] = v
    return env_vars

def main():
    env_vars = load_env()
    aff_id = env_vars.get('RAKUTEN_AFFILIATE_ID', '54d2a438.4bc4abc2.54d2a439.aa1be583')
    
    target_file = "src/data/articles.json"
    
    with open(target_file, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    for item in data:
        old_link = item.get("affiliateLink", "")
        if "hb.afl.rakuten.co.jp" in old_link:
            parsed = urllib.parse.urlparse(old_link)
            query = urllib.parse.parse_qs(parsed.query)
            pc_url = query.get('pc', [''])[0]
            
            if pc_url:
                # Build proper affiliate link with env variable
                new_link = f"https://hb.afl.rakuten.co.jp/hgc/{aff_id}/?pc={urllib.parse.quote(pc_url)}"
                
                # Update affiliate link
                item["affiliateLink"] = new_link
                
                # Replace the old link in reviewBody
                if "reviewBody" in item:
                    item["reviewBody"] = item["reviewBody"].replace(old_link, new_link)

    with open(target_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        
    print(f"Patched {len(data)} articles with proper affiliate ID {aff_id} from .env")

if __name__ == "__main__":
    main()
