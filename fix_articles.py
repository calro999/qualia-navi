import urllib.request, urllib.parse, json, ssl, time

ssl._create_default_https_context = ssl._create_unverified_context
app_id = '1a3cdfd9-2aec-4b42-8290-1c53603b0012'
access_key = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5'
aff_id = '54d2a438.4bc4abc2.54d2a439.aa1be583'
base_url = 'https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401'

with open('src/data/articles.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

count = 0
for i, article in enumerate(articles):
    if 'search.rakuten.co.jp' in article.get('affiliateLink', ''):
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
                print(f"Fixed [{count}]: {keyword}")
            else:
                print(f"NOT FOUND: {keyword}")
        except Exception as e:
            print(f"Error fetching {keyword}: {e}")

with open('src/data/articles.json', 'w', encoding='utf-8') as f:
    json.dump(articles, f, ensure_ascii=False, indent=2)

print(f"Fixed {count} articles.")
