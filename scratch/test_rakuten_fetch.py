import os
import requests
import json

def load_dotenv(dotenv_path):
    if os.path.exists(dotenv_path):
        with open(dotenv_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    k, v = k.strip(), v.strip().strip('"\'')
                    if k and v and k not in os.environ:
                        os.environ[k] = v

load_dotenv('.env')

app_id = os.environ.get("RAKUTEN_APP_ID")
access_key = os.environ.get("RAKUTEN_ACCESS_KEY")
affiliate_id = os.environ.get("RAKUTEN_AFFILIATE_ID")

print(f"App ID: {app_id}")
print(f"Access Key: {access_key}")
print(f"Affiliate ID: {affiliate_id}")

keywords = [
    "コスメデコルテ リポソーム アドバンスト リペアセラム",
    "アネッサ パーフェクトUV スキンケアミルク NA",
    "VT リードルショット 100",
    "ロムアンド ジューシーラスティングティント",
    "パナソニック バイタリフト ブラシ EH-SP60",
    "KATE リップモンスター 03 陽炎",
    "ラ ロッシュ ポゼ UVイデア XL プロテクショントーンアップ ローズ",
    "キュレル 潤浸保湿 UVエッセンス"
]

url = "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401"

for kw in keywords:
    params = {
        "applicationId": app_id,
        "accessKey": access_key,
        "keyword": kw,
        "format": "json",
        "hits": 1
    }
    if affiliate_id:
        params["affiliateId"] = affiliate_id

    try:
        res = requests.get(url, params=params, timeout=10)
        print(f"Keyword: {kw} -> Status: {res.status_code}")
        if res.status_code == 200:
            data = res.json()
            items = data.get("Items", [])
            if items:
                item = items[0].get("Item", {})
                print(f"  Item Name: {item.get('itemName')}")
                print(f"  Affiliate URL: {item.get('affiliateUrl')}")
                print(f"  Medium Images: {item.get('mediumImageUrls')}")
    except Exception as e:
        print(f"  Error: {e}")
