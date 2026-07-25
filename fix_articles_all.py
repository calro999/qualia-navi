import urllib.request, urllib.parse, json, ssl, time

ssl._create_default_https_context = ssl._create_unverified_context
app_id = '1a3cdfd9-2aec-4b42-8290-1c53603b0012'
access_key = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5'
aff_id = '54d2a438.4bc4abc2.54d2a439.aa1be583'
base_url = 'https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401'

def is_bad_link(url):
    decoded = urllib.parse.unquote(url)
    return 'item.rakuten.co.jp' not in decoded

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    import re
    # We will try to find all occurrences of affiliate links in the file, but since src/data.ts is TS, we might have to be careful.
    pass

# For articles.json:
with open('src/data/articles.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

count = 0
for i, article in enumerate(articles):
    link = article.get('affiliateLink', '')
    if is_bad_link(link):
        keyword = article['productName']
        params = {
            'applicationId': app_id,
            'accessKey': access_key,
            'affiliateId': aff_id,
            'keyword': keyword,
            'format': 'json',
            'hits': 1
        }
        api_url = f"{base_url}?{urllib.parse.urlencode(params)}"
        
        try:
            time.sleep(0.4) # Wait 400ms to avoid rate limits
            req = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0'})
            res = urllib.request.urlopen(req, timeout=10)
            data = json.loads(res.read().decode('utf-8'))
            
            if data.get('Items'):
                item = data['Items'][0]['Item']
                article['affiliateLink'] = item['affiliateUrl']
                article['imageUrl'] = item['mediumImageUrls'][0]['imageUrl'].split('?')[0]
                article['rakutenPrice'] = f"¥{item['itemPrice']:,}"
                count += 1
                print(f"Fixed JSON [{count}]: {keyword}")
            else:
                print(f"NOT FOUND JSON: {keyword}")
        except Exception as e:
            print(f"Error fetching JSON {keyword}: {e}")

with open('src/data/articles.json', 'w', encoding='utf-8') as f:
    json.dump(articles, f, ensure_ascii=False, indent=2)

print(f"Fixed {count} articles in articles.json.")

# For data.ts:
with open('src/data.ts', 'r', encoding='utf-8') as f:
    data_ts = f.read()

# Let's find all broken links in data.ts
import re
aff_pattern = re.compile(r'https://hb\.afl\.rakuten\.co\.jp[^\s\"\'<>]+')

def replacer(match):
    url = match.group(0)
    decoded = urllib.parse.unquote(url)
    if 'item.rakuten.co.jp' not in decoded:
        return 'BAD_LINK' # We'll replace this properly later
    return url

urls = set(aff_pattern.findall(data_ts))
bad_urls = [u for u in urls if 'item.rakuten.co.jp' not in urllib.parse.unquote(u)]
print(f"Found {len(bad_urls)} bad URLs in data.ts")
if bad_urls:
    print(bad_urls)

