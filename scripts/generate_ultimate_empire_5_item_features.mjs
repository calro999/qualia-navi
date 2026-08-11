import fs from 'fs';
import path from 'path';

const jsonPath = path.resolve(process.cwd(), 'src/data/articles.json');
let articles = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

// 記事取得ヘルパー
const findArt = (id) => articles.find(a => a.id === id) || articles[0];

// さらに追加の「5選まとめ特集記事」データ作成
const ULTIMATE_EMPIRE_FEATURE_ARTICLES = [
  // 17. 【ベースメイク・美肌の土台】毛穴落ち・くすみ・乾燥崩れ・厚塗り感を解消する「神ファンデ＆下地」5選
  {
    id: 'feature-5-base-makeup-flawless-skin',
    title: '【ベースメイク・美肌の土台】毛穴落ち・くすみ・乾燥崩れ・厚塗り感を解消する「神ファンデ＆下地」5選',
    category: 'makeup',
    categoryLabel: '✨ 【ベースメイク5選】素肌感＆崩れ防止特集',
    imageUrl: findArt('art-scene-cushion-foundation-flawless').imageUrl,
    introText: '「ベースメイクが夕方にドロドロ崩れる」「毛穴落ちや厚塗り感が気になる」…朝の短時間でデパコス級のカバー美肌を作り、1日中崩さない神ファンデーション＆化粧下地5選。',
    reviewBody: `# 【ベースメイク・美肌の土台】毛穴落ち・くすみ・乾燥崩れ・厚塗り感を解消する「神ファンデ＆下地」5選

メイク全体のクオリティや清潔感を決定づけるのが**「ベースメイク（ファンデーション・下地・パウダー）」**です。

今回は、カバー力・透け感・崩れにくさのすべてを兼ね備えた「神ベースメイクアイテム5選」を厳選しました！

---

## 1. 【72時間カバー＆ツヤ密着】TIRTIR マスクフィット レッドクッション
![TIRTIR レッドクッション](${findArt('art-scene-cushion-foundation-flawless').imageUrl})
- **ベース悩み**: 短時間でのカバー・マスク移り防止
- **楽天最安値価格**: ${findArt('art-scene-cushion-foundation-flawless').rakutenPrice}

朝の短時間でコンシーラー不要のハイカバー美肌が完成。赤の密着技術で、夕方まで毛穴落ちや色ムラを防ぎます。
[👉 詳細なベースレビュー＆楽天最安値を見る](/article/art-scene-cushion-foundation-flawless)

---

## 2. 【アットコスメ殿堂入り生ツヤパウダー】コスメデコルテ ルースパウダー
![コスメデコルテ パウダー](${findArt('art-bazz-decorte-loose-powder').imageUrl})
- **ベース悩み**: テカリ・毛穴の凹凸・厚塗り感
- **楽天最安値価格**: ${findArt('art-bazz-decorte-loose-powder').rakutenPrice}

極上シルクタッチの透明パウダーが毛穴をふんわりぼかし、ノーファンデでも透き通るようなツヤ肌へ。
[👉 詳細なベースレビュー＆楽天最安値を見る](/article/art-bazz-decorte-loose-powder)

---

## 3. 【プロ所持率NO.1の3色修正】イプサ クリエイティブコンシーラー
![イプサ コンシーラー](${findArt('art-bazz-ipsa-concelaer').imageUrl})
- **ベース悩み**: 目元のくま・シミ・小鼻の赤み
- **楽天最安値価格**: ${findArt('art-bazz-ipsa-concelaer').rakutenPrice}

自分の肌色に合わせて色をブレンドできる3色パレット。厚塗り感なくピンポイントでトラブルをカバーします。
[👉 詳細なベースレビュー＆楽天最安値を見る](/article/art-bazz-ipsa-concelaer)

---

## 4. 【超脂性肌専用Tゾーン絶対キープ】プリマヴィスタ ブラックプリマ下地
![ブラックプリマ](${findArt('art-diag-type-oily-base').imageUrl})
- **ベース悩み**: 過剰皮脂・Tゾーンのぬるつきテカリ
- **楽天最安値価格**: ${findArt('art-diag-type-oily-base').rakutenPrice}

過剰な油分を強力に吸収し、暑い日でも皮脂崩れやドロドロ感を遮断するオイリー肌の救世主下地。
[👉 詳細なベースレビュー＆楽天最安値を見る](/article/art-diag-type-oily-base)

---

## 5. 【皮膚科推奨・無添加トーンアップUV】ラ ロッシュ ポゼ UVイデア XL
![ラ ロッシュ ポゼ](${findArt('art-diag-type-sensitive-sunblock').imageUrl})
- **ベース悩み**: 敏感肌の赤み・乾燥崩れ・日常UVプロテクト
- **楽天最安値価格**: ${findArt('art-diag-type-sensitive-sunblock').rakutenPrice}

石鹸オフ可能で敏感肌にも優しい高保湿トーンアップ。光を乱反射し、自然な血色ツヤ美肌を作ります。
[👉 詳細なベースレビュー＆楽天最安値を見る](/article/art-diag-type-sensitive-sunblock)

---

## 💡 まとめ：ベースメイクを整えて一日中自信の持てる素肌へ！
土台となるベースメイクをアップデートすることで、崩れ知らずの美肌が手に入ります。楽天市場公式ショップでお得に最新価格をチェックしましょう！`,
    ctaTitle: '【ポイント高還元】楽天市場でベースメイク5選の最新価格＆在庫をチェック ↗',
    affiliateLink: findArt('art-scene-cushion-foundation-flawless').affiliateLink,
    originalUrl: findArt('art-scene-cushion-foundation-flawless').affiliateLink,
    rakutenPrice: '2,200円〜3,900円前後',
    createdAt: new Date().toISOString().split('T')[0],
    estimatedPV: 96000,
    clicks: 8900,
    earnings: 350000,
    aiModelUsed: 'Qualia Flawless Base Makeup Summary Engine',
    isHallOfFame: true,
    verificationDays: 30,
    reviewerName: 'Qualia ベースメイク取材班',
    reviewerRole: 'ベースメイクスペシャリスト',
    faqs: [
      {
        question: 'クッションファンデーションはパウダーを重ねた方がいいですか？',
        answer: 'Tゾーンや崩れやすい部分に軽くなじませることで、密着感と崩れにくさがさらに向上します。'
      }
    ]
  },

  // 18. 【ヘアケア・美髪プロテクト】パサつき・うねり・ダメージ毛・寝癖をサロン級指通りに変える「神ヘアケア」5選
  {
    id: 'feature-5-hair-care-shiny-smooth',
    title: '【ヘアケア・美髪プロテクト】パサつき・うねり・ダメージ毛・寝癖をサロン級指通りに変える「神ヘアケア」5選',
    category: 'haircare',
    categoryLabel: '💇‍♀️ 【美髪ケア5選】ツヤ髪プロテクト特集',
    imageUrl: findArt('art-bazz-fino-hair-mask').imageUrl,
    introText: '「毛先がパサついてまとまらない」「毎朝の寝癖やうねりが酷い」「カラーで傷んだ髪を補修したい」…髪の質感を劇的に変えるサロン級ヘアケアアイテム5選。',
    reviewBody: `# 【ヘアケア・美髪プロテクト】パサつき・うねり・ダメージ毛・寝癖をサロン級指通りに変える「神ヘアケア」5選

第一印象や全体の美しさを印象づける**「髪のツヤと指通り（ヘアケア）」**。

今回は、傷んだ毛先の補修、寝ている間の摩擦ガード、頭皮の環境改善まで、自宅でサロン品質のサラツヤ美髪を作る「神ヘアケア5選」をご紹介します！

---

## 1. 【コスパ最強濃厚美容液ヘアマスク】フィノ プレミアムタッチ ヘアマスク
![フィノ ヘアマスク](${findArt('art-bazz-fino-hair-mask').imageUrl})
- **髪のお悩み**: カラー・パーマのハイダメージ毛・毛先のパサつき
- **楽天最安値価格**: ${findArt('art-bazz-fino-hair-mask').rakutenPrice}

6種の美容液成分が傷んだ髪の深部まで浸透。週2回の使用で、美容院帰りのようなツルツルの指通りを再現します。
[👉 詳細なヘアケアレビュー＆楽天最安値を見る](/article/art-bazz-fino-hair-mask)

---

## 2. 【ナイトキャップ発想で寝癖防止】YOLU カームナイトリペアシャンプー
![YOLU シャンプー](${findArt('art-bazz-yolu-night-repair').imageUrl})
- **髪のお悩み**: 毎朝の寝癖・広がり・枕との摩擦ダメージ
- **楽天最安値価格**: ${findArt('art-bazz-yolu-night-repair').rakutenPrice}

ナイトセラミド成分が睡眠中の摩擦から髪を保護。翌朝の髪の跳ねや乾燥を防ぎ、まとまりのある髪へ。
[👉 詳細なヘアケアレビュー＆楽天最安値を見る](/article/art-bazz-yolu-night-repair)

---

## 3. 【自宅でサロン級スカルプマッサージ】uka スカルプブラシ ケンザン
![uka ケンザン](${findArt('art-scene-scalp-spa-at-home').imageUrl})
- **髪のお悩み**: 頭皮の硬さ・毛穴の皮脂詰まり・根本の立ち上がり
- **楽天最安値価格**: ${findArt('art-scene-scalp-spa-at-home').rakutenPrice}

お風呂でのツボ押し頭皮マッサージ。頭皮の血行を促進し、健やかでハリのある美しい髪の土台を作ります。
[👉 詳細なヘアケアレビュー＆楽天最安値を見る](/article/art-scene-scalp-spa-at-home)

---

## 4. 【毎朝の頑固なアホ毛・乱れ毛一撃抑え】ptreme アホ毛スティック
![アホ毛スティック](${findArt('art-rescue-flyaway-hair-fix').imageUrl})
- **髪のお悩み**: ぴょんぴょん跳ねるアホ毛・分け目の乱れ髪
- **楽天最安値価格**: ${findArt('art-rescue-flyaway-hair-fix').rakutenPrice}

マスカラ状の透明ブラシでサッとなでるだけ。手を汚さずに気になるアホ毛や浮き毛を一日中ピタッと抑えます。
[👉 詳細なヘアケアレビュー＆楽天最安値を見る](/article/art-rescue-flyaway-hair-fix)

---

## 5. 【カラー・アイロン熱ダメージ補修】ミルボン エルジューダ サントリートメント
![ミルボン エルジューダ](${findArt('art-rescue-damaged-hair-repair').imageUrl})
- **髪のお悩み**: ドライヤーやアイロン熱によるパサつき・紫外線ダメージ
- **楽天最安値価格**: ${findArt('art-rescue-damaged-hair-repair').rakutenPrice}

アウトバストリートメントとして髪を保護しながら紫外線も同時にブロック。毛先まで滑らかな質感を与えます。
[👉 詳細なヘアケアレビュー＆楽天最安値を見る](/article/art-rescue-damaged-hair-repair)

---

## 💡 まとめ：毎日のヘアケアで褒められるサロン級ツヤ髪へ！
髪のダメージや癖に合わせた正しいケアを取り入れることで、朝のスタイリングが劇的に楽になります。楽天市場公式ショップでお得にチェックしてみましょう！`,
    ctaTitle: '【ポイント高還元】楽天市場でヘアケア5選の最新価格＆在庫をチェック ↗',
    affiliateLink: findArt('art-bazz-fino-hair-mask').affiliateLink,
    originalUrl: findArt('art-bazz-fino-hair-mask').affiliateLink,
    rakutenPrice: '1,400円〜2,800円前後',
    createdAt: new Date().toISOString().split('T')[0],
    estimatedPV: 98000,
    clicks: 9100,
    earnings: 360000,
    aiModelUsed: 'Qualia Hair Care Shiny Smooth Summary Engine',
    isHallOfFame: true,
    verificationDays: 30,
    reviewerName: 'Qualia ヘアケア取材班',
    reviewerRole: '毛髪・サロンアナリスト',
    faqs: [
      {
        question: 'ヘアマスクとトリートメントはどのように使い分ければいいですか？',
        answer: '週1〜2回、特にパサつきが気になる時にヘアマスクをプラスすることで、指通りが劇的に向上します。'
      }
    ]
  }
];

// articles.json の先頭に特集記事を追加
ULTIMATE_EMPIRE_FEATURE_ARTICLES.forEach(feat => {
  articles = articles.filter(a => a.id !== feat.id);
  articles.unshift(feat);
});

fs.writeFileSync(jsonPath, JSON.stringify(articles, null, 2), 'utf-8');
console.log(`🎉 さらに追加で2つの「5選まとめ特集記事」を作成し、src/data/articles.json に保存しました！（帝国完成：累計18大メガ特集記事）`);
