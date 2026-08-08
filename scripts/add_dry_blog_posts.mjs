import fs from 'fs';

const lateSummerDryBlogPosts = [
  {
    id: 'blog-late-summer-dry-skincare',
    slug: 'late-summer-dry-skincare',
    title: '8-9月の夏枯れ肌を救う！エアコン乾燥・ごわつきを即リセットする極上保湿スキンケア特集',
    subtitle: '「エアコンで砂漠化した肌が秒で潤う」とSNSで話題！インナードライと夏枯れゴワつきを解きほぐす神コスメまとめ。',
    targetGender: 'unisex',
    coverImage: '/images/products/decorte_liposome.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '8-9月は連日の冷房と紫外線で肌内部がカラカラになるインナードライが急増。「肌がゴワつく」「メイクが乗らない」とお悩みの方へ、SNSでバズり中の角質・導入・濃密保湿コスメを厳選紹介！',
    recommendedItemCodes: [
      "decorte-liposome-repair-serum",
      "art-topic-skincare-takami-skinpeel",
      "art-topic-skincare-drcilabo-vc100",
      "art-topic-skincare-albion-floradrip"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 8-9月に急増する「夏枯れインナードライ肌」とは？

「表面は汗や皮脂でペタペタするのに、洗顔後は肌が突っ張る…」それは紫外線ダメージとガンガン効いたエアコンによる典型的なインナードライのサインです！

### 夏枯れ肌を復活させるSNSバズりケア3ステップ
1. **角質をやわらかくほぐす**: 水分が浸透しやすい土台を作る
2. **高浸透ビタミンCと発酵液で水分チャージ**: 夏のくすみと乾燥をWアプローチ
3. **高機能カプセル美容液でうるおいを閉じ込める**: 夜まで乾燥しないモッチリ肌を維持

---

### 楽天API厳選！8-9月マストバイ保湿コスメ
- **コスメデコルテ リポソーム アドバンスト リペアセラム**: 「朝使えば夜まで砂漠化しない」とSNSで神格化されているカーム美容液
- **タカミスキンピール**: 剥がさない角質ケアで夏終わりのゴワつきをつるんと卵肌へ
- **ドクターシーラボ VC100エッセンスローションEX**: 高浸透ビタミンCで毛穴を引き締めうるおい補給
`
  },
  {
    id: 'blog-late-summer-hair-damage-care',
    slug: 'late-summer-hair-damage-care',
    title: '紫外線でパサついた髪がツヤツヤに復活！8-9月に絶対使いたいサロン級ヘアケア特集',
    subtitle: '「パサパサの髪がサロン帰りのとぅるん髪になるとバズり中」夏のダメージ毛を集中トリートメント！',
    targetGender: 'unisex',
    coverImage: '/images/products/art-topic-hair-fino-hairmask.jpg',
    authorId: 'author-tacma',
    authorName: '蓮見 拓真',
    authorRole: '統括編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '夏の強力な日差し、汗、海水で傷みまくった8-9月の毛先。「キシキシしてまとまらない」とお悩みの方へ、SNSでバズり中のサロン級浸透ヘアマスクと紫外線プロテクトオイルを楽天API連携で紹介！',
    recommendedItemCodes: [
      "art-topic-hair-fino-hairmask",
      "art-topic-hair-kerastase-oleo",
      "art-topic-hair-milbon-elujuda-sun",
      "art-topic-hair-yolu-nightrepair"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 8-9月の髪は紫外線と汗でSOSを出している！

髪は肌の3倍もの紫外線を受けていると言われています。夏終盤の髪は水分とタンパク質が抜け落ち、毛先が枝毛やパサつきでまとまらなくなりがちです。

### バズりヘアケアで叶える「とぅるんツヤ髪」
- **週2回の濃密ヘアマスク**: 傷んだ髪内部に栄養をギューッと補給
- **外出前のUVプロテクトオイル**: 残暑の強烈な日光から髪を守る
- **夜のナイトリペアケア**: 睡眠中の摩擦と乾燥を防いで翌朝のまとまりをキープ

---

### 楽天API厳選！8-9月ダメージ髪レスキューアイテム
- **fino プレミアムタッチ 浸透美容液ヘアマスク**: 「プチプラなのに髪がとぅるんとぅるんになる」とバズり続ける伝説のヘアマスク
- **ケラスターゼ NU ソワン オレオ リラックス**: 湿気と乾燥で広がる髪を素直なツヤ髪へ導く美容オイル
- **ミルボン エルジューダ サントリートメント**: 日中の髪の日焼けを防ぎながらサラサラ手触りへ
`
  },
  {
    id: 'blog-late-summer-moist-makeup',
    slug: 'late-summer-moist-makeup',
    title: '8-9月の乾燥やくすみを払拭！一日中潤いツヤ肌が続く保湿下地＆美容液ファンデ特集',
    subtitle: '「夕方になっても全く乾燥・崩れゼロ」とTikTokで話題！エアコン冷房に負けない神ツヤベースメイク。',
    targetGender: 'female',
    coverImage: '/images/products/cledepeau_voir.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '8-9月は冷房による乾燥崩れや夏の日焼けによる肌のくすみが目立つ季節。「夕方になるとカピカピ・ファンデが浮く」とお悩みの方へ、SNSで優勝と話題の美容液下地＆クッションファンデを紹介！',
    recommendedItemCodes: [
      "cledepeau-voile-correcteur-n",
      "art-topic-makeup-excel-skintint",
      "pauljoe-protecting-foundation-primer",
      "art-topic-makeup-tirtir-crystalcushion"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 8-9月のベースメイクは「保湿力×くすみ補正」が命！

「朝はバッチリなのに、夕方オフィスを出ると顔がドス黒くくすむ・ファンデが粉を吹く」のは冷房による乾燥が原因です。8〜9月はスキンケア効果の高い美容液下地を仕込むのが成功の鍵！

### 美容ライター推奨のベースメイク術
- **トーンアップ保湿下地でくすみを払拭**: 肌に透明感と潤い膜を仕込む
- **メッシュクッションや美容液ファンデで薄づき密着**: 厚塗り感を減らして乾燥による割れを防止

---

### 楽天API厳選！乾燥知らずの神ベースメイク
- **クレ・ド・ポー ボーテ ヴォワールコレクチュール n**: 「塗った瞬間元から肌が綺麗な人になれる」とバズり続ける最高峰下地
- **エクセル スキンティント IC**: 美容液成分81%配合で夏終わりの乾燥肌を優しく包むファンデ
- **TIRTIR マスクフィット クリスタル メッシュクッション**: 薄づきなのにカバー力と宝石のようなツヤが持続
`
  }
];

function addDryBlogPosts() {
  const dataPath = '/Users/calro/Downloads/raku-cosme/src/data.ts';
  let content = fs.readFileSync(dataPath, 'utf-8');

  const targetStr = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
  const targetIdx = content.indexOf(targetStr);
  if (targetIdx === -1) {
    console.error('INITIAL_BLOG_POSTS が見つかりませんでした。');
    return;
  }

  const insertPos = targetIdx + targetStr.length;
  const jsonStr = JSON.stringify(lateSummerDryBlogPosts, null, 2).slice(1, -1);

  const updatedContent = content.slice(0, insertPos) + '\n' + jsonStr + ',' + content.slice(insertPos);

  fs.writeFileSync(dataPath, updatedContent, 'utf-8');
  console.log('8-9月夏枯れ・乾燥悩み解決ブログ記事3件を src/data.ts に追加しました。');
}

addDryBlogPosts();
