import urllib.request, urllib.parse, json, ssl, time

ssl._create_default_https_context = ssl._create_unverified_context
app_id = '1a3cdfd9-2aec-4b42-8290-1c53603b0012'
access_key = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5'
aff_id = '54d2a438.4bc4abc2.54d2a439.aa1be583'
base_url = 'https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401'

def is_bad_link(url):
    decoded = urllib.parse.unquote(url)
    return 'item.rakuten.co.jp' not in decoded

with open('src/data/articles.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

count = 0
for i, article in enumerate(articles):
    link = article.get('affiliateLink', '')
    if is_bad_link(link):
        keyword = article['productName']
        
        success = False
        attempts = 0
        current_keyword = keyword
        
        while not success and attempts < 3:
            params = {
                'applicationId': app_id,
                'accessKey': access_key,
                'affiliateId': aff_id,
                'keyword': current_keyword,
                'format': 'json',
                'hits': 1
            }
            api_url = f"{base_url}?{urllib.parse.urlencode(params)}"
            
            try:
                time.sleep(1.5) # Wait to avoid 429
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
                success = True
                
            except urllib.error.HTTPError as e:
                if e.code == 429:
                    print(f"429 on {current_keyword}, sleeping...")
                    time.sleep(3)
                    attempts += 1
                elif e.code == 400:
                    print(f"400 on {current_keyword}, shortening...")
                    # take first two words
                    parts = current_keyword.split()
                    if len(parts) > 1:
                        current_keyword = parts[0] + ' ' + parts[1]
                    else:
                        current_keyword = current_keyword[:10]
                    attempts += 1
                else:
                    print(f"Error {e.code} on {current_keyword}")
                    break
            except Exception as e:
                print(f"Error fetching JSON {current_keyword}: {e}")
                break

with open('src/data/articles.json', 'w', encoding='utf-8') as f:
    json.dump(articles, f, ensure_ascii=False, indent=2)

print(f"Fixed {count} remaining articles in articles.json.")
