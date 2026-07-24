import re

new_articles = """
  ,
  {
    itemCode: 'topic-body-agdeo24',
    itemName: 'エージーデオ24 パウダースプレー (無香性) LL 180g',
    itemPrice: 1080,
    itemUrl: 'https://item.rakuten.co.jp/rakuten24/4901872464128/',
    mediumImageUrls: [{ imageUrl: 'https://images.unsplash.com/photo-1615397323114-16f5c5314781?w=400&auto=format&fit=crop&q=80' }],
    shopName: '楽天24',
    reviewCount: 350,
    reviewAverage: 4.6,
    genreId: 'body-care',
    catchcopy: '【夏の体臭ケア特集】全身の汗のベタつきとニオイを瞬間リセット！高密着パウダースプレーでサラサラ無臭空間へ。'
  },
  {
    itemCode: 'topic-body-footdeo',
    itemName: 'デオナチュレ ソフトストーンW 20g 制汗剤',
    itemPrice: 1100,
    itemUrl: 'https://item.rakuten.co.jp/rakuten24/4971825016582/',
    mediumImageUrls: [{ imageUrl: 'https://images.unsplash.com/photo-1570194065650-d99fb4b8e05a?w=400&auto=format&fit=crop&q=80' }],
    shopName: '楽天24',
    reviewCount: 1200,
    reviewAverage: 4.8,
    genreId: 'body-care',
    catchcopy: '【夏の体臭ケア特集】ワキの強烈なニオイに！お出かけ前の「直塗り」で、ミョウバンがニオイ菌を元からブロック。'
  },
  {
    itemCode: 'topic-skincare-anessa',
    itemName: 'アネッサ パーフェクトUV スキンケアミルク N 60mL',
    itemPrice: 3300,
    itemUrl: 'https://item.rakuten.co.jp/rakuten24/4901872136612/',
    mediumImageUrls: [{ imageUrl: 'https://images.unsplash.com/photo-1555529771-468132479e49?w=400&auto=format&fit=crop&q=80' }],
    shopName: '楽天24',
    reviewCount: 850,
    reviewAverage: 4.7,
    genreId: 'uv-care',
    catchcopy: '【夏のUVケア特集】絶対に焼かない！汗・水・摩擦に強い、スーパーウォータープルーフの金ミルク。'
  },
  {
    itemCode: 'topic-skincare-bioreuv',
    itemName: 'ビオレUV アクアリッチ ウォータリーエッセンス 50g',
    itemPrice: 880,
    itemUrl: 'https://item.rakuten.co.jp/rakuten24/4901301363183/',
    mediumImageUrls: [{ imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&auto=format&fit=crop&q=80' }],
    shopName: '楽天24',
    reviewCount: 950,
    reviewAverage: 4.5,
    genreId: 'uv-care',
    catchcopy: '【夏のUVケア特集】水のようにスッと伸びる！日常使いに最適な、ベタつかない水感UVエッセンス。'
  }
"""

with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# target DEFAULT_ARTICLES array ending `\n];`
target = r'(export const DEFAULT_ARTICLES: RakutenProductArticle\[\] = \[\s*[\s\S]*?)(\n\];)'
new_content = re.sub(target, r'\1' + new_articles.replace('\\', '\\\\') + r'\2', content, count=1)

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)
    
print("Added summer feature items to DEFAULT_ARTICLES")
