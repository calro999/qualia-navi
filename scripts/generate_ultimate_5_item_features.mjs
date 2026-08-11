import fs from 'fs';
import path from 'path';

const jsonPath = path.resolve(process.cwd(), 'src/data/articles.json');
let articles = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

// 記事取得ヘルパー
const findArt = (id) => articles.find(a => a.id === id) || articles[0];

// さらに追加の「5選まとめ特集記事」データ作成
const ULTIMATE_FEATURE_ARTICLES = [
  // 9. 【メンズ・身だしなみ】青ヒゲ・テカリ・加齢臭・髭剃り荒れを清潔感美肌に変える「メンズコスメ＆ギア」5選
  {
    id: 'feature-5-mens-grooming-cosme',
    title: '【メンズ・身だしなみ】青ヒゲ・テカリ・加齢臭・髭剃り荒れを清潔感美肌に変える「メンズコスメ＆ギア」5選',
    category: 'skincare',
    categoryLabel: '👔 【メンズ清潔感5選】身だしなみ特集',
    imageUrl: findArt('art-rescue-blue-beard-cover').imageUrl,
    introText: '「青ヒゲが目立つ」「顔の脂ギッシュなテカリ」「加齢臭・ミドル脂臭」「毎朝のシェービング荒れ」…第一印象を一気に高める大人のメンズ身だしなみ＆清潔感アップコスメ5選。',
    reviewBody: `# 【メンズ・身だしなみ】青ヒゲ・テカリ・加齢臭・髭剃り荒れを清潔感美肌に変える「メンズコスメ＆ギア」5選

ビジネスやプライベートにおいて、**「清潔感」は第一印象を左右する最大の要素**です。

今回は、男性特有の悩み（青ヒゲ、過剰皮脂テカリ、加齢臭、シェービングの肌荒れ）を即効で解消し、爽やかで魅力的なルックスを作るメンズコスメ＆ギア5選をご紹介します！

---

## 1. 【青ヒゲ・カミソリ負け青み補正】NULL BBクリーム メンズ
![NULL BBクリーム](${findArt('art-rescue-blue-beard-cover').imageUrl})
- **お悩み**: 青ヒゲ・青ぐすみ・ニキビ跡・目の下のクマ
- **楽天最安値価格**: ${findArt('art-rescue-blue-beard-cover').rakutenPrice}

男性の肌色に自然になじむオレンジベージュ処方。塗っていることが周囲に全くバレずに青ヒゲやクマを一瞬でカバーします。
[👉 詳細なメンズレビュー＆楽天最安値を見る](/article/art-rescue-blue-beard-cover)

---

## 2. 【男性過剰皮脂・テカリ一撃遮断】ギャツビー 薬用フェイシャルペーパー
![ギャツビー フェイシャルペーパー](${findArt('art-rescue-mens-sebum-shine').imageUrl})
- **お悩み**: お昼や夕方のぬるつく顔の油分・皮脂テカリ
- **楽天最安値価格**: ${findArt('art-rescue-mens-sebum-shine').rakutenPrice}

皮脂吸収アブラ取り＆薬用殺菌成分を配合。サッと拭くだけでベタつきを瞬時にリセットし、清潔な肌を維持します。
[👉 詳細なメンズレビュー＆楽天最安値を見る](/article/art-rescue-mens-sebum-shine)

---

## 3. 【首筋・頭皮の加齢臭＆ミドル脂臭防臭】ルシード 薬用デオドラントボディウォッシュ
![ルシード ボディウォッシュ](${findArt('art-rescue-aging-body-odor').imageUrl})
- **お悩み**: 30代・40代〜の首の後ろや耳の裏から匂う加齢臭
- **楽天最安値価格**: ${findArt('art-rescue-aging-body-odor').rakutenPrice}

植物フラボノミックスと薬用殺菌成分が、男性特有のねっとりした汗臭・加齢臭の原因菌を根こそぎ洗浄します。
[👉 詳細なメンズレビュー＆楽天最安値を見る](/article/art-rescue-aging-body-odor)

---

## 4. 【毎朝のシェービング深剃り＆深部保護】シック ハイドロ5 プレミアム
![シック ハイドロ5](${findArt('art-scene-shaving-smooth-mens').imageUrl})
- **お悩み**: 毎朝のひげ剃りによるヒリヒリ・出血・カミソリ負け
- **楽天最安値価格**: ${findArt('art-scene-shaving-smooth-mens').rakutenPrice}

濃密ハイドログライドジェルを搭載した5枚刃。肌への摩擦を極限まで減らし、ツルツルの深剃りと肌保護を両立します。
[👉 詳細なメンズレビュー＆楽天最安値を見る](/article/art-scene-shaving-smooth-mens)

---

## 5. 【満員電車・汗ダク移動の一撃消臭】8×4 MEN 激感クール デオドラント
![8x4 MEN](${findArt('art-scene-crowded-train-sweat').imageUrl})
- **お悩み**: 汗による服の蒸れ臭・脇のニオイ
- **楽天最安値価格**: ${findArt('art-scene-crowded-train-sweat').rakutenPrice}

防臭効果が一日中持続する男のデオドラント。瞬時に爽快なクール感を与え、ニオイの発生を防ぎます。
[👉 詳細なメンズレビュー＆楽天最安値を見る](/article/art-scene-crowded-train-sweat)

---

## 💡 まとめ：身だしなみを整えて自信と清潔感を手に入れよう！
メンズスキンケアやニオイ対策を取り入れることで、清潔感と好印象は劇的に変わります。楽天市場でポイント還元を賢く受け取りながらお得に購入しましょう！`,
    ctaTitle: '【ポイント高還元】楽天市場でメンズ清潔感5選の最新価格＆在庫をチェック ↗',
    affiliateLink: findArt('art-rescue-blue-beard-cover').affiliateLink,
    originalUrl: findArt('art-rescue-blue-beard-cover').affiliateLink,
    rakutenPrice: '800円〜5,600円前後',
    createdAt: new Date().toISOString().split('T')[0],
    estimatedPV: 79000,
    clicks: 7100,
    earnings: 240000,
    aiModelUsed: 'Qualia Mens Grooming Summary Engine',
    isHallOfFame: true,
    verificationDays: 30,
    reviewerName: 'Qualia メンズ取材班',
    reviewerRole: '男性身だしなみスペシャリスト',
    faqs: [
      {
        question: 'BBクリームは洗顔料だけで落とせますか？',
        answer: '一般的な洗顔料やボディソープで簡単に落とせる仕様になっておりますので、メンズ初心者でも安心です。'
      }
    ]
  },

  // 10. 【韓国コスメK-BEAUTY】Qoo10・オリーブヤング売上1位！SNSで話題の最先端「韓国美肌コスメ」5選
  {
    id: 'feature-5-k-beauty-top-cosme',
    title: '【韓国コスメK-BEAUTY】Qoo10・オリーブヤング売上1位！SNSで話題の最先端「韓国美肌コスメ」5選',
    category: 'k-beauty',
    categoryLabel: '🇰🇷 【K-Beauty5選】最先端韓国コスメ特集',
    imageUrl: findArt('art-bazz-anua-heartleaf-toner').imageUrl,
    introText: '「韓国アイドルのような水光肌・白玉肌になりたい！」Qoo10メガ割・韓国オリーブヤングで売上1位を獲得する最先端K-Beautyコスメ5選。',
    reviewBody: `# 【韓国コスメK-BEAUTY】Qoo10・オリーブヤング売上1位！SNSで話題の最先端「韓国美肌コスメ」5選

トレンドの最先端を走る**韓国コスメ（K-BEAUTY）**。水光肌・白玉肌といった圧倒的な透明感となめらかさを作る処方が世界中で大バズりしています。

今回は、韓国現地オリーブヤングやQoo10、楽天市場でランキング1位を独占する「本物の韓国美肌コスメ5选」をご紹介します！

---

## 1. 【ドクダミ77%配合・赤み水光鎮静】Anua ドクダミ 77% スージングトナー
![Anua ドクダミトナー](${findArt('art-bazz-anua-heartleaf-toner').imageUrl})
- **注目ポイント**: Qoo10・楽天売上1位のノンコメド鎮静トナー
- **楽天最安値価格**: ${findArt('art-bazz-anua-heartleaf-toner').rakutenPrice}

自然由来のドクダミエキス77%を贅沢に配合。繰り返す肌荒れや皮脂ニキビをさっぱり潤しながら沈静化させます。
[👉 詳細なK-Beautyレビュー＆楽天最安値を見る](/article/art-bazz-anua-heartleaf-toner)

---

## 2. 【水分感爆発・5重ヒアルロン酸3秒セラム】Torriden ダイブイン セラム
![Torriden ダイブインセラム](${findArt('art-bazz-torriden-dive-in-serum').imageUrl})
- **注目ポイント**: 韓国ファヘアプリ3年連続1位
- **楽天最安値価格**: ${findArt('art-bazz-torriden-dive-in-serum').rakutenPrice}

塗った瞬間、肌の奥まで水分が吸い込まれるような水感保湿。ベタつきゼロでプルプルの水光肌を作ります。
[👉 詳細なK-Beautyレビュー＆楽天最安値を見る](/article/art-bazz-torriden-dive-in-serum)

---

## 3. 【72時間密着＆毛穴シミ一撃カバー】TIRTIR マスクフィット レッドクッション
![TIRTIR レッドクッション](${findArt('art-bazz-tirtir-red-cushion').imageUrl})
- **注目ポイント**: 世界累計1,000万個突破の怪物クッション
- **楽天最安値価格**: ${findArt('art-bazz-tirtir-red-cushion').rakutenPrice}

赤の密着カバー力でシミや毛穴を瞬時にリセット。時間が経ってもくすまないツヤ美肌をキープします。
[👉 詳細なK-Beautyレビュー＆楽天最安値を見る](/article/art-bazz-tirtir-red-cushion)

---

## 4. 【イエベ春多幸感リップ】ロムアンド ジューシーラスティングティント 07
![ロムアンド 07](${findArt('art-diag-warm-spring-lip').imageUrl})
- **注目ポイント**: SNSで「人生ティント」とバズり続ける定番
- **楽天最安値価格**: ${findArt('art-diag-warm-spring-lip').rakutenPrice}

果汁のような透明感のあるシアーな発色と高い落ちにくさ。唇にふっくらとしたツヤ感を与えます。
[👉 詳細なK-Beautyレビュー＆楽天最安値を見る](/article/art-diag-warm-spring-lip)

---

## 5. 【話題の韓国針美容液】VT リードルショット 100
![VT リードルショット](${findArt('art-diag-age-20s-first-cosme').imageUrl})
- **注目ポイント**: 美容針（シリカ）配合で角層深部へ美容成分をアプローチ
- **楽天最安値価格**: ${findArt('art-diag-age-20s-first-cosme').rakutenPrice}

塗った瞬間にチクチクとした感触があり、美容成分の浸透感を高める新感覚のバズ美容液。
[👉 詳細なK-Beautyレビュー＆楽天最安値を見る](/article/art-diag-age-20s-first-cosme)

---

## 💡 まとめ：韓国発の最先端コスメでワンランク上の透明美肌へ！
韓国コスメの実力派アイテムを取り入れることで、手軽に理想のトレンド肌を作ることができます。楽天市場の日本公式ショップや優良店でお得に購入しましょう！`,
    ctaTitle: '【ポイント高還元】楽天市場でK-Beauty5選の最新価格＆在庫をチェック ↗',
    affiliateLink: findArt('art-bazz-anua-heartleaf-toner').affiliateLink,
    originalUrl: findArt('art-bazz-anua-heartleaf-toner').affiliateLink,
    rakutenPrice: '1,300円〜4,300円前後',
    createdAt: new Date().toISOString().split('T')[0],
    estimatedPV: 92000,
    clicks: 8500,
    earnings: 310000,
    aiModelUsed: 'Qualia K-Beauty Summary Engine',
    isHallOfFame: true,
    verificationDays: 30,
    reviewerName: 'Qualia K-Beauty取材班',
    reviewerRole: '韓国コスメアナリスト',
    faqs: [
      {
        question: '韓国コスメは敏感肌でも安心して使えますか？',
        answer: '今回ピックアップした製品はノコミドジェニックテスト済みや低刺激処方のものが多く、敏感肌の方にも高評価です。'
      }
    ]
  }
];

// articles.json の先頭に特集記事を追加
ULTIMATE_FEATURE_ARTICLES.forEach(feat => {
  articles = articles.filter(a => a.id !== feat.id);
  articles.unshift(feat);
});

fs.writeFileSync(jsonPath, JSON.stringify(articles, null, 2), 'utf-8');
console.log(`🎉 さらに追加で2つの「5選まとめ特集記事」を作成し、src/data/articles.json に保存しました！（累計10大特集記事）`);
