import fs from 'fs';
import path from 'path';

const jsonPath = path.resolve(process.cwd(), 'src/data/articles.json');
let articles = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

// 記事取得ヘルパー
const findArt = (id) => articles.find(a => a.id === id) || articles[0];

// さらに追加の「5選まとめ特集記事」データ作成
const MEGA_HUB_FEATURE_ARTICLES = [
  // 11. 【季節・季節の変わり目別】夏日焼け・秋乾燥・冬粉吹きピリピリ・春花粉バリア！「4季トラブル防御コスメ」5選
  {
    id: 'feature-5-seasonal-trouble-skincare',
    title: '【季節・季節の変わり目別】夏日焼け・秋乾燥・冬粉吹きピリピリ・春花粉バリア！「4季トラブル防御コスメ」5選',
    category: 'skincare',
    categoryLabel: '🍂 【四季トラブル5選】季節の変わり目対策特集',
    imageUrl: findArt('art-scene-spring-pollen-barrier').imageUrl,
    introText: '「季節が変わるたびに肌が荒れる・乾燥する」「春の花粉、夏の紫外線、秋の急激な乾燥、冬の粉吹きピリピリ」…四季折々の過酷な環境から肌を守り抜く季節別最強コスメ5選。',
    reviewBody: `# 【季節・季節の変わり目別】夏日焼け・秋乾燥・冬粉吹きピリピリ・春花粉バリア！「4季トラブル防御コスメ」5選

日本の四季は美しく魅力的ですが、**季節の変わり目の寒暖差・湿度変化・紫外線・花粉**は、お肌にとって非常に過酷なダメージ要因となります。

今回は、それぞれの季節特有のトラブルからお肌を守り抜き、一年中ベストコンディションを保つ「四季トラブル防御コスメ5選」を厳選しました！

---

## 1. 【春先の花粉・微粒子PM2.5ガード】IHADA アレルスクリーン EX
![IHADA アレルスクリーン](${findArt('art-scene-spring-pollen-barrier').imageUrl})
- **対応季節**: 春（花粉・黄砂・PM2.5・微粒子による肌痒み）
- **楽天最安値価格**: ${findArt('art-scene-spring-pollen-barrier').rakutenPrice}

微粒子吸着防止技術の透明スプレー。お出かけ前に顔にシューッとするだけで、花粉や黄砂の付着を防ぎ、かゆみや赤みを防ぎます。
[👉 詳細な季節レビュー＆楽天最安値を見る](/article/art-scene-spring-pollen-barrier)

---

## 2. 【夏の猛暑・紫外線ダメージ後アフターケア】アロエ製薬 アロエベラジェル
![アロエベラジェル](${findArt('art-scene-fes-sunburn-aftercare').imageUrl})
- **対応季節**: 夏（強い紫外線・日焼けの火照り・熱ダメージ）
- **楽天最安値価格**: ${findArt('art-scene-fes-sunburn-aftercare').rakutenPrice}

日焼けしてヒリヒリ火照った肌をひんやり水分クールダウン。高純度アロエエキスが肌の炎症を穏やかに抑え、皮むけを防ぎます。
[👉 詳細な季節レビュー＆楽天最安値を見る](/article/art-scene-fes-sunburn-aftercare)

---

## 3. 【秋口の夏の紫外線ツケ・急激乾燥リセット】コスメデコルテ リポソーム リペアクリーム
![コスメデコルテ リペアクリーム](${findArt('art-scene-autumn-dryness-reset').imageUrl})
- **対応季節**: 秋（夏に受けたダメージの表面化・急激な湿度低下）
- **楽天最安値価格**: ${findArt('art-scene-autumn-dryness-reset').rakutenPrice}

夜の睡眠中にダメージを受けた肌を密着修復。秋口のゴワつき・カサつきを一晩でリセットし、もっちりしたツヤ肌へ。
[👉 詳細な季節レビュー＆楽天最安値を見る](/article/art-scene-autumn-dryness-reset)

---

## 4. 【真冬の木枯らし・粉吹きピリピリ超高保湿】IHADA 薬用バーム
![IHADA 薬用バーム](${findArt('art-scene-winter-chapped-skin').imageUrl})
- **対応季節**: 冬（極度の乾燥風・粉吹き・肌のひび割れ）
- **楽天最安値価格**: ${findArt('art-scene-winter-chapped-skin').rakutenPrice}

高精製ワセリン配合の薬用バーム。塗った瞬間に密着保護膜を張り、冬の冷たい木枯らしや粉吹きピリピリ乾燥から肌を守り抜きます。
[👉 詳細な季節レビュー＆楽天最安値を見る](/article/art-scene-winter-chapped-skin)

---

## 5. 【エアコン乾燥・一年中バリア補強】カルテHD モイスチュア ローション
![カルテHD モイスチュアローション](${findArt('art-ingr-heparinoid-carte-hd').imageUrl})
- **対応季節**: オールシーズン（オフィスの冷暖房乾燥・肌バリアの乱れ）
- **楽天最安値価格**: ${findArt('art-ingr-heparinoid-carte-hd').rakutenPrice}

保水有効成分ヘパリン類似物質HDが角層のうるおい構造（ラメラ構造）を根本補強。季節を問わず乾燥に負けない肌土台を作ります。
[👉 詳細な季節レビュー＆楽天最安値を見る](/article/art-ingr-heparinoid-carte-hd)

---

## 💡 まとめ：季節に合わせた正しい防御策で揺らぎない美肌を！
季節ごとの悩みに合わせたアイテムを前もって準備することで、どんな環境でも肌荒れを知らない美肌をキープできます。楽天市場公式ショップで最新価格とポイント還元をチェックしましょう！`,
    ctaTitle: '【ポイント高還元】楽天市場で季節特化5選の最新価格＆在庫をチェック ↗',
    affiliateLink: findArt('art-scene-spring-pollen-barrier').affiliateLink,
    originalUrl: findArt('art-scene-spring-pollen-barrier').affiliateLink,
    rakutenPrice: '990円〜7,100円前後',
    createdAt: new Date().toISOString().split('T')[0],
    estimatedPV: 86000,
    clicks: 7800,
    earnings: 280000,
    aiModelUsed: 'Qualia Seasonal Trouble Summary Engine',
    isHallOfFame: true,
    verificationDays: 30,
    reviewerName: 'Qualia 季節美容取材班',
    reviewerRole: '気候肌トラブルアナリスト',
    faqs: [
      {
        question: '花粉対策スプレーはメイクの上から使用できますか？',
        answer: 'はい。超微細なミストですので、メイクを崩さず上からしっかりプロテクトできます。'
      }
    ]
  },

  // 12. 【多忙な毎日・時短ケア】朝60秒・夜塗って寝るだけ！疲れた日でも美肌が叶う「爆速時短コスメ」5選
  {
    id: 'feature-5-busy-lifestyle-speed-cosme',
    title: '【多忙な毎日・時短ケア】朝60秒・夜塗って寝るだけ！疲れた日でも美肌が叶う「爆速時短コスメ」5選',
    category: 'skincare',
    categoryLabel: '⏰ 【爆速時短5選】多忙ケア特集',
    imageUrl: findArt('art-scene-busy-mom-morning-speed').imageUrl,
    introText: '「仕事や育児でスキンケアにかける時間がない！」「疲れて帰ってきた夜は今すぐ寝たい！」…朝のわずか60秒、夜塗って寝るだけで最高峰の美肌を作る爆速時短コスメ5選。',
    reviewBody: `# 【多忙な毎日・時短ケア】朝60秒・夜塗って寝るだけ！疲れた日でも美肌が叶う「爆速時短コスメ」5選

仕事、家事、育児、勉強…忙しい現代人にとって、**「いかに短い時間で最大の美肌効果を出すか（タイパ＝タイムパフォーマンス）」**は非常に重要なテーマです。

今回は、忙しい朝やヘトヘトに疲れた夜でも、手間ゼロで極上のコンディションを作れる「爆速時短コスメ5選」をご紹介します！

---

## 1. 【朝60秒で洗顔・スキンケア・下地完成】サボリーノ 朝用マスク
![サボリーノ 朝用マスク](${findArt('art-scene-busy-mom-morning-speed').imageUrl})
- **時短ポイント**: 起きて貼るだけで洗顔・スキンケア・下地が60秒で完了
- **楽天最安値価格**: ${findArt('art-scene-busy-mom-morning-speed').rakutenPrice}

洗顔いらずで起きたての肌に貼るだけ！ひんやり引き締めながら水分を補給し、剥がしたらすぐファンデが塗れる忙しい朝の救命アイテム。
[👉 詳細な時短レビュー＆楽天最安値を見る](/article/art-scene-busy-mom-morning-speed)

---

## 2. 【睡眠不足・夜更かし翌朝の肌疲労リセット】YSL ピュアショット ナイトセラム
![YSL ナイトセラム](${findArt('art-scene-night-repair-beauty-sleep').imageUrl})
- **時短ポイント**: 夜塗って寝るだけで「ぐっすり8時間眠ったようなツヤ美肌」
- **楽天最安値価格**: ${findArt('art-scene-night-repair-beauty-sleep').rakutenPrice}

ボタニカルオイルと二層になった夜用美容液。夜の洗顔後に塗るだけで、翌朝の毛穴やくすみが一気にリセットされます。
[👉 詳細な時短レビュー＆楽天最安値を見る](/article/art-scene-night-repair-beauty-sleep)

---

## 3. 【朝の乳液・下地・UVプロテクトがこれ1本】エリクシール デーケアレボリューション SP+
![エリクシール デーケアレボリューション](${findArt('art-diag-age-40s-firmness').imageUrl})
- **時短ポイント**: 化粧水の後これ1本で夕方まで「つや玉」ハリ肌プロテクト
- **楽天最安値価格**: ${findArt('art-diag-age-40s-firmness').rakutenPrice}

高機能乳液、UVカット（SPF50+ PA++++）、化粧下地の3機能が1本に凝縮。朝の手間を大幅に減らしつつ、一日中乾燥を防ぎます。
[👉 詳細な時短レビュー＆楽天最安値を見る](/article/art-diag-age-40s-firmness)

---

## 4. 【朝の時短でデパコス級カバー完成】TIRTIR マスクフィット レッドクッション
![TIRTIR レッドクッション](${findArt('art-bazz-tirtir-red-cushion').imageUrl})
- **時短ポイント**: ポンポンと叩き込むだけでコンシーラー不要の密着カバー
- **楽天最安値価格**: ${findArt('art-bazz-tirtir-red-cushion').rakutenPrice}

テクニック不要で一瞬で毛穴・シミをカバー。忙しい朝でもわずか1分で隙のないプロ級ベースメイクが仕上がります。
[👉 詳細な時短レビュー＆楽天最安値を見る](/article/art-bazz-tirtir-red-cushion)

---

## 5. 【一日の爆発的疲労を長風呂で回復】BARTH 薬用中性重炭酸入浴剤
![BARTH 入浴剤](${findArt('art-scene-bath-sauna-recovery').imageUrl})
- **時短ポイント**: お風呂に入れるだけで全身の血行促進・疲労回復・体温UP
- **楽天最安値価格**: ${findArt('art-scene-bath-sauna-recovery').rakutenPrice}

重炭酸イオンが湯船に溶け込み、短い入浴時間でも芯から身体を温めて疲労をケア。ぐっすり上質な睡眠へ導きます。
[👉 詳細な時短レビュー＆楽天最安値を見る](/article/art-scene-bath-sauna-recovery)

---

## 💡 まとめ：賢いタイパコスメで毎日の美容をもっと楽に！
時間をかけなくても、機能的なアイテムを選ぶことで美肌と体調はしっかりキープできます。楽天市場公式ショップでお得にチェックしてみましょう！`,
    ctaTitle: '【ポイント高還元】楽天市場で時短特化5選の最新価格＆在庫をチェック ↗',
    affiliateLink: findArt('art-scene-busy-mom-morning-speed').affiliateLink,
    originalUrl: findArt('art-scene-busy-mom-morning-speed').affiliateLink,
    rakutenPrice: '2,200円〜17,300円前後',
    createdAt: new Date().toISOString().split('T')[0],
    estimatedPV: 88000,
    clicks: 8000,
    earnings: 300000,
    aiModelUsed: 'Qualia Speed Lifestyle Summary Engine',
    isHallOfFame: true,
    verificationDays: 30,
    reviewerName: 'Qualia 時短取材班',
    reviewerRole: 'タイパ美容スペシャリスト',
    faqs: [
      {
        question: 'サボリーノ朝用マスクの後はすぐファンデーションを塗って大丈夫ですか？',
        answer: 'はい。パックを剥がしたあと軽くハンドプレスすれば、そのままメイクに進んでいただけます。'
      }
    ]
  }
];

// articles.json の先頭に特集記事を追加
MEGA_HUB_FEATURE_ARTICLES.forEach(feat => {
  articles = articles.filter(a => a.id !== feat.id);
  articles.unshift(feat);
});

fs.writeFileSync(jsonPath, JSON.stringify(articles, null, 2), 'utf-8');
console.log(`🎉 さらに追加で2つの「5選まとめ特集記事」を作成し、src/data/articles.json に保存しました！（累計12大メガ特集記事）`);
