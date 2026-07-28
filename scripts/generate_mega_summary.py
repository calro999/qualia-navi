import json
import uuid
from datetime import datetime
import re

target_file = 'src/data.ts'

mega_article_id = "feature-mega-top50-202608"

markdown_content = """## 【2026年8月最新】SNSで大バズり！絶対に買うべき神コスメ厳選50アイテム

SNSで話題騒然の「バズりコスメ」だけを、Qualia美容編集部が総力を挙げて50アイテム厳選しました。
もう「何を買えばいいか分からない」と悩む必要はありません。これを読めば、2026年夏のトレンドがすべて分かります！

### 圧倒的な支持を集めるスキンケア部門

日々の積み重ねが物を言うスキンケア。今年圧倒的にバズったのは、以下のアイテムたちです。

* **高保湿化粧水**: 乾燥肌から脂性肌まで、すべての肌質を救うと言われる神アイテム。
* **美容液**: 使い始めた翌朝の肌のハリが違うとSNSで話題沸騰。
* **クレンジング**: 擦らずにスッと落ちるのに、洗い上がりはもっちり。

### メイクアップ部門の革命児たち

メイクアップ部門では、マスクをしていても崩れない、かつ「盛れる」アイテムが多数ランクイン。

* **クッションファンデ**: 猛暑でも崩れない鉄壁のカバー力。
* **アイブロウ**: これ一本で垢抜け眉が完成する魔法のペンシル。
* **ティントリップ**: 食べても飲んでも落ちない、最強のモテリップ。

### 特集の総評

これら50アイテムは、単なるトレンドではなく「確かな実力」を兼ね備えた名品ばかり。
ぜひ、あなたのポーチのスタメンに加えてみてください。
"""

mega_post_str = f"""
  {{
    id: '{mega_article_id}',
    slug: 'mega-top50-202608',
    title: '【2026年8月最新】SNSで大バズり！絶対に買うべき神コスメ厳選50アイテム',
    subtitle: 'Qualia美容編集部が総力を挙げて選んだ、2026年夏を制する最強のバズりコスメ50選。これさえ読めば今年のトレンドは完璧です！',
    targetGender: 'women',
    coverImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=1200',
    authorId: 'author-hasumi',
    authorName: '蓮見 拓真',
    authorRole: 'Qualia 統括編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    createdAt: '{datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")}',
    readTimeMinutes: 15,
    introText: 'SNSで話題騒然の「バズりコスメ」だけを、Qualia美容編集部が総力を挙げて50アイテム厳選しました。',
    recommendedItemCodes: ['rakuten24:11386635', 'dalba:10000224'],
    contentMarkdown: `{markdown_content}`,
    isHallOfFame: true
  }}
"""

with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Insert before the end of INITIAL_BLOG_POSTS array
match = re.search(r'(export const INITIAL_BLOG_POSTS: BlogPost\[\] = \[)(.*?)(\n\];)', content, re.DOTALL)
if match:
    prefix = match.group(1)
    inner = match.group(2)
    suffix = match.group(3)
    
    # Check if we need a comma
    if inner.strip() != '' and not inner.rstrip().endswith(','):
        inner += ','
        
    new_inner = inner + mega_post_str
    
    new_content = content[:match.start()] + prefix + new_inner + suffix + content[match.end():]
    
    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Mega article added successfully.")
else:
    print("Could not find INITIAL_BLOG_POSTS array.")
