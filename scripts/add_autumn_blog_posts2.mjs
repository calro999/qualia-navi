import fs from 'fs';

const autumnDryBlogPosts2 = [
  {
    id: 'blog-autumn-hair-loss-scalp-care',
    slug: 'autumn-hair-loss-scalp-care',
    title: '9-10月に急増する抜け毛・頭皮の秋バテをストップ！美髪が育つスカルプ＆ナイトケア特集',
    subtitle: '「抜け毛が激減して髪が根元から立ち上がると大バズり」全人類使うべき秋のスカルプシャンプー＆夜用オイル。',
    targetGender: 'unisex',
    coverImage: '/images/products/art-topic-hair-uka-kenzan.jpg',
    authorId: 'author-tacma',
    authorName: '蓮見 拓真',
    authorRole: '統括編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-09-02',
    readTimeMinutes: 10,
    introText: '9-10月は夏に受けた強烈な紫外線ダメージの蓄積で「一年で最も抜け毛が増える季節」。「シャンプー時の抜け毛」「髪がペタンこ」とお悩みの方へ、バズり中の頭皮血行ケア＆ナイトリペアを楽天API連携で紹介！',
    recommendedItemCodes: [
      "art-topic-hair-orbis-scalp",
      "art-topic-hair-uka-kenzan",
      "art-topic-hair-yolu-nightrepair",
      "art-topic-hair-diane-repair"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 9-10月に「抜け毛」が急増する理由とは？

秋は頭皮のターンオーバーが乱れ、夏の紫外線の後遺症で一時的に毛根が弱まる季節です。放っておくと頭皮が固くなり、細毛や白髪の原因にも！

### 秋の抜け毛をブロックするスカルプケア3ステップ
1. **頭皮のコリをほぐして血行促進**: シリコンブラシで毛根まで栄養を行き渡らせる
2. **アミノ酸系スカルプシャンプーで優しく洗浄**: 頭皮の皮脂バランスを整える
3. **ナイトリペア成分で睡眠中の乾燥をガード**: 摩擦から髪と頭皮を守る

---

### 楽天API厳選！9-10月頭皮＆抜け毛対策
- **uka スカルプブラシ ケンザン**: 「頭皮のコリがほぐれて抜け毛が減る」とバズり中の大ヒットスカルプブラシ
- **オルビス スカルプリファイニング シャンプー**: アミノ酸系泡で頭皮のフケ・かゆみ・ニオイを根本クレンジング
- **YOLU カームナイトリペア シャンプー**: 睡眠中の髪と頭皮の乾燥をガードし翌朝さらツヤ髪へ
`
  },
  {
    id: 'blog-autumn-sensitive-skin-care',
    slug: 'autumn-sensitive-skin-care',
    title: '9-10月の寒暖差で荒れるゆらぎ肌・赤みを沈静！バリア機能を高める低刺激保湿コスメ特集',
    subtitle: '「赤みや粉吹きが速攻でおさまるとバズり中」季節の変わり目に手放せない神リペア美容液。',
    targetGender: 'unisex',
    coverImage: '/images/products/anua_toner.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-09-02',
    readTimeMinutes: 11,
    introText: '昼は暑く夜は冷え込む9-10月は、気温差でバリア機能が低下し「肌の赤み」「かゆみ」「吹き出物」が急増。「何を使っても染みる」とお悩みの方へ、SNSで沈静・バリア機能補強と絶賛されるコスメを厳選！',
    recommendedItemCodes: [
      "anua-heartleaf-77-soothing-toner",
      "skin1004-centella-ampoule",
      "curel-uv-essence-spf30",
      "art-topic-skincare-bioderma-sensibio"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 9-10月の「寒暖差ギャップ」が肌バリアを壊す！

気象の変化が激しい秋口は、皮脂分泌量が急減するため肌の水分保持力が弱まります。刺激の強いスキンケアは一旦お休みし、鎮静＆低刺激保湿にシフトするのが鉄則！

### ゆらぎ肌を速攻リセットする沈静テクニック
- **ドクダミ・ツボクサ（シカ）成分で赤みを沈静**: 炎症を抑えて健やかな状態へ
- **セラミド配合の低刺激UV＆クリームで保護**: 秋の乾燥風から肌をバリア

---

### 楽天API厳選！9-10月ゆらぎ肌鎮静コスメ
- **Anua ドクダミ 77% スージングトナー**: 「肌のニキビや赤みが一瞬で引く」とバズり続ける韓国No.1スージングトナー
- **Skin1004 センテラ アンプル**: ツボクサエキス100%配合で敏感に傾いた秋肌をやさしく包み込む美容液
- **キュレル 潤浸保湿 UVエッセンス**: セラミド機能成分で肌荒れを防ぎながら秋の日差しをガード
`
  },
  {
    id: 'blog-autumn-lash-eye-care',
    slug: 'autumn-lash-eye-care',
    title: '夏の日差しで傷んだまつ毛・目元を集中補修！9-10月に試したい高保湿アイケア＆まつ毛美容液特集',
    subtitle: '「自まつ毛がバチバチ伸びるとバズり中」目元の小ジワと乾燥が一瞬で消える神アイケア。',
    targetGender: 'female',
    coverImage: '/images/products/maybelline_skyhigh.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-09-02',
    readTimeMinutes: 10,
    introText: '夏場の強力なウォータープルーフマスカラや日焼けで傷んだ9-10月のまつ毛と目元。「まつ毛が細くなった」「目元がカサつく」とお悩みの方へ、SNSで自まつ毛覚醒と噂される高機能アイケアを楽天API連携で紹介！',
    recommendedItemCodes: [
      "autodiscover_6_1786092503",
      "maybelline-sky-high-mascara",
      "heroinemake-mascara-advanced-film",
      "art-topic-makeup-nars-reflecting"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 9-10月はまつ毛と目元も秋のダメージ補修シーズン！

強い日差しやクレンジングの摩擦を受けた目元は、秋の乾燥風にさらされると細小ジワやまつ毛の抜け毛の原因に。目元専用の集中美容液で栄養を与えるのがマスト！

### 魅力的な目元を取り戻すケアポイント
- **幹細胞・ペプチド配合美容液でまつ毛ケア**: 根元からハリコシのある強い自まつ毛へ
- **お湯オフ＋WPのハイブリッドマスカラで負担軽減**: 摩擦を減らしながらカールキープ

---

### 楽天API厳選！9-10月まつ毛＆目元美肌コスメ
- **まつ毛美容液 幹細胞コスメ**: 「自まつ毛がぐんぐん伸びてマツエクいらず」とバズり中の高濃度美容液
- **メイベリン スカイハイ マスカラ**: 伸ばして引き上げる最新ブラシでぱっちり上向きまつ毛を持続
- **NARS ライトリフレクティング パウダー**: 乾燥させずに目元の影やくすみを光で飛ばすサラサラパウダー
`
  }
];

function addAutumnBlogPosts2() {
  const dataPath = '/Users/calro/Downloads/raku-cosme/src/data.ts';
  let content = fs.readFileSync(dataPath, 'utf-8');

  const targetStr = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
  const targetIdx = content.indexOf(targetStr);
  if (targetIdx === -1) {
    console.error('INITIAL_BLOG_POSTS が見つかりませんでした。');
    return;
  }

  const insertPos = targetIdx + targetStr.length;
  const jsonStr = JSON.stringify(autumnDryBlogPosts2, null, 2).slice(1, -1);

  const updatedContent = content.slice(0, insertPos) + '\n' + jsonStr + ',' + content.slice(insertPos);

  fs.writeFileSync(dataPath, updatedContent, 'utf-8');
  console.log('9-10月秋特有お悩み解決ブログ記事第2弾3件を src/data.ts に追加しました。');
}

addAutumnBlogPosts2();
