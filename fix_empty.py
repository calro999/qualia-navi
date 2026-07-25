import urllib.request, urllib.parse, json, ssl, time

ssl._create_default_https_context = ssl._create_unverified_context
app_id = '1a3cdfd9-2aec-4b42-8290-1c53603b0012'
access_key = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5'
aff_id = '54d2a438.4bc4abc2.54d2a439.aa1be583'
base_url = 'https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401'

with open('src/data/articles.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

fixes = {
    'ラ ロッシュ ポゼ UVイデア XL プロテクショントーンアップ ローズ': 'ラロッシュポゼ トーンアップ ローズ',
    'ファシオ パワフルステイ リキッドライナー': 'ファシオ リキッドライナー',
    'Fujiko アブラトリウォーター': 'フジコ あぶらとり',
    'バブ クール 涼みレモン': 'バブ クール'
}

for a in articles:
    if a['productName'] in fixes:
        kw = fixes[a['productName']]
        params = {
            'applicationId': app_id,
            'accessKey': access_key,
            'affiliateId': aff_id,
            'keyword': kw,
            'format': 'json',
            'hits': 1
        }
        api_url = f"{base_url}?{urllib.parse.urlencode(params)}"
        time.sleep(1)
        try:
            req = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0'})
            res = urllib.request.urlopen(req)
            data = json.loads(res.read().decode('utf-8'))
            if data.get('Items'):
                item = data['Items'][0]['Item']
                a['affiliateLink'] = item['affiliateUrl']
                a['imageUrl'] = item['mediumImageUrls'][0]['imageUrl'].split('?')[0]
                a['rakutenPrice'] = f"¥{item['itemPrice']:,}"
                print(f"Fixed {a['productName']}")
            else:
                print(f"Still NOT FOUND: {kw}")
        except Exception as e:
            print(f"Error fetching {kw}: {e}")

with open('src/data/articles.json', 'w', encoding='utf-8') as f:
    json.dump(articles, f, ensure_ascii=False, indent=2)
