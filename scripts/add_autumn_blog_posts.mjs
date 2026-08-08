import fs from 'fs';

const autumnDryBlogPosts = [
  {
    id: 'blog-autumn-dullness-skincare',
    slug: 'autumn-dullness-skincare',
    title: '9-10月の秋バテ肌・急な寒暖差くすみを撃退！透明感が復活する極上濃密スキンケア特集',
    subtitle: '「寒暖差でくすんだ肌が秒で透明感復活するとSNS大バズり」全人類使うべき秋の白玉美容液＆濃密ローション。',
    targetGender: 'unisex',
    coverImage: '/images/products/art-topic-skincare-anua-peachserum.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-09-01',
    readTimeMinutes: 11,
    introText: '9-10月は夏の紫外線ダメージが表面化し、朝晩の冷え込みで血行不良やくすみが進行。「肌が暗く見える」「寒暖差でゴワつく」とお悩みの方へ、SNSでバズり中の高保湿美容液を楽天API連携で紹介！',
    recommendedItemCodes: [
      "art-topic-skincare-anua-peachserum",
      "art-topic-skincare-vt-pdrnessence",
      "orbis-u-essence-lotion",
      "shiseido-ultimune-powerizing-concentrate"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 9-10月に急増する「秋バテくすみ肌」の正体

9月後半から10月にかけては、一気に湿度が低下して秋風が吹き始めます。夏のメラニン蓄積に寒暖差による血行不良が重なると、肌が土色にくすむ「秋バテ肌」に。

### 秋バテくすみを一拭きで払拭するケア
1. **ナイアシンアミド配合セラムで透明感補給**: メラニン生成を抑えてワントーン明るい肌へ
2. **PDRNや高濃密発酵液でハリツヤ注入**: 朝晩の冷え込みに負けないぷるんと弾力肌をキープ

---

### 楽天API厳選！9-10月秋バテ肌救世主コスメ
- **Anua 桃70％ナイアシンセラム**: 「使った翌朝の透明感とツヤがヤバい」とTikTokでバズり中の白玉美容液
- **VT PDRNエッセンス**: 韓国で話題沸騰！水光肌のようなパンッとしたハリを速攻チャージ
- **オルビス ユー エッセンスローション**: とろみのある濃厚バリア膜で秋の乾燥から肌を徹底保護
`
  },
  {
    id: 'blog-autumn-hand-nail-care',
    slug: 'autumn-hand-nail-care',
    title: '秋風の乾燥でガサガサになる手元・指先を即保護！高密着ハンドクリーム＆ネイルケア特集',
    subtitle: '「塗り込んだ瞬間指先までモッチリになるとバズり中」秋ファッションに映えるツヤ手元の作り方。',
    targetGender: 'female',
    coverImage: '/images/products/loccitane_hand.jpg',
    authorId: 'author-tacma',
    authorName: '蓮見 拓真',
    authorRole: '統括編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-09-01',
    readTimeMinutes: 10,
    introText: '9-10月の秋風は手肌の水分を容赦なく奪い、ささくれや手荒れが目立つ季節。「指先が乾燥してガサガサ」とお悩みの方へ、ベタつかず速攻うるおうハンドケア＆秋に映えるネイルチップを紹介！',
    recommendedItemCodes: [
      "loccitane-shea-hand-cream",
      "atrix-medicated-extra-protection",
      "art-topic-nail-amber-nuance",
      "art-topic-nail-magnet-iceglass"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 9-10月の手元は乾燥とささくれの危険信号！

水仕事や手洗いに秋の乾いた空気が合わさると、手の甲や爪周りがすぐに粉を吹き始めます。美しい秋色ネイルも手肌がカサついていては台無しに！

### 秋手元を美しく魅せるケア3ステップ
- **シアバター配合クリームで手肌全体を包み込む**: 水分を密封してしっとり感キープ
- **爪周りに高密着ベールを密着**: ささくれを防ぎ健康的なツヤ爪へ
- **秋色の透け感べっこうネイルチップで即上級者**: べっこう・キャッツアイで秋ファッション完成

---

### 楽天API厳選！9-10月手元美肌アイテム
- **ロクシタン シア ハンドクリーム**: 世界中で愛される王道！シアバター20%配合で手肌をもちもちにリフレッシュ
- **アトリックス エクストラ プロテクション**: 水を弾く高密着ベールで手荒れ・ささくれを鉄壁ガード
- **韓国風 べっこう 琥珀 ネイルチップ**: 9-10月の秋ファッションに一瞬で馴染む琥珀グラデデザイン
`
  },
  {
    id: 'blog-autumn-trend-makeup',
    slug: 'autumn-trend-makeup',
    title: '9-10月の秋顔にシフト！乾燥を防ぎながら血色感をプラスする秋冬バズりコスメ特集',
    subtitle: '「秋メイクこれ塗るだけで一瞬で垢抜けるとTikTokでバズり中」唇が乾かない神ティント＆アイパレット。',
    targetGender: 'female',
    coverImage: '/images/products/art-topic-makeup-wakemake-eyepalette.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-09-01',
    readTimeMinutes: 11,
    introText: '9-10月は秋服に合わせてメイクも深みのあるカラーへ切り替えるベストシーズン！「秋カラーは乾燥して見える」とお悩みの方へ、高い保湿力と圧倒的な発色を両立したバズりコスメを厳選紹介！',
    recommendedItemCodes: [
      "art-topic-makeup-wakemake-eyepalette",
      "art-topic-makeup-romand-meltbalm",
      "art-topic-lip-fwee-puddingpot",
      "canmake-petite-palette-eyes"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 9-10月の秋メイクは「保湿感×こっくり血色」が成功の秘訣！

夏気分のマットメイクやシアーメイクから、秋らしい深みのあるボルドー・ブラウン・琥珀カラーへ。ただし、秋風で乾燥しやすい唇や目元には潤い膜が必須です。

### 秋メイクで垢抜けるポイント
- **16色パレットで繊細な秋グラデを作る**: 捨て色なしの柔らかいトーンで自然な陰影
- **粘膜ツヤリップで乾燥ゼロの血色感**: 縦ジワを包み込む保湿バームでツヤ感プラス

---

### 楽天API厳選！9-10月秋バズりコスメ
- **WAKEMAKE ソフトブラーリング アイパレット**: 16色入りでイエベ・ブルベ問わず理想の秋目元が作れるバズパレット
- **ロムアンド グラスティング メルトバーム**: 水光膜が包み込み秋の唇を一日中ぷるぷるに保つ神バーム
- **fwee リップアンドチーク ブラーパンディングポット**: むにゅっと質感でチークとリップに統一感を与える優秀ポット
`
  }
];

function addAutumnBlogPosts() {
  const dataPath = '/Users/calro/Downloads/raku-cosme/src/data.ts';
  let content = fs.readFileSync(dataPath, 'utf-8');

  const targetStr = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
  const targetIdx = content.indexOf(targetStr);
  if (targetIdx === -1) {
    console.error('INITIAL_BLOG_POSTS が見つかりませんでした。');
    return;
  }

  const insertPos = targetIdx + targetStr.length;
  const jsonStr = JSON.stringify(autumnDryBlogPosts, null, 2).slice(1, -1);

  const updatedContent = content.slice(0, insertPos) + '\n' + jsonStr + ',' + content.slice(insertPos);

  fs.writeFileSync(dataPath, updatedContent, 'utf-8');
  console.log('9-10月秋特有お悩み解決ブログ記事3件を src/data.ts に追加しました。');
}

addAutumnBlogPosts();
