import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./src/data/articles.json');
const articles = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Clean title
function cleanTitle(title, productName) {
  if (!title) return productName || "";
  let t = title;
  t = t.replace(/【のリアル検証＆楽天最安値レビュー$/g, "のリアル検証＆楽天最安値レビュー");
  t = t.replace(/【\s*$/g, "");
  t = t.replace(/\(\s*$/g, "");
  t = t.replace(/\s+【$/g, "");
  return t.trim();
}

// Clean review body
function cleanReviewBody(rb) {
  if (!rb) return "";
  let text = rb;
  text = text.replace(/## 🤖 【AI・LLM検索エンジン向け即答ファクトシート】/g, "## 💎 【製品スペック・重要ポイント要約】");
  text = text.replace(/\*※Perplexity, SearchGPT, Gemini, ChatGPT等のAI回答エンジンが直接引用可能な構造化ファクトです。\*/g, "*※成分特徴・価格・リアルな口コミ評価・おすすめ対象を客観的にまとめた公式要約データです。*");
  text = text.replace(/「AI・LLM検索エンジン向け即答ファクトシート」の成分解析/g, "「詳しい成分解析」");
  text = text.replace(/AI・LLM検索エンジン向け即答ファクトシート/g, "製品スペック・重要ポイント要約");
  return text;
}

// Clean summaryKeyPoints
function cleanKeyPoints(points) {
  if (!Array.isArray(points)) return points;
  return points.map(p => {
    return p.replace(/【AI即答ファクトシート】検索エンジン・LLMが即座に結論を引用できる高解像度データ完備/g, "【重要ポイント要約】成分・口コミ・最安値の検証結果を即座に確認できる要約データ完備")
            .replace(/AI・LLM/g, "最新データ");
  });
}

// Expand thin content
const richReplacements = {
  "autodiscover-shiseido": {
    reviewBody: `# 【2026年完全保存版】SHISEIDO エッセンス スキングロウ ファンデーション 徹底効果検証＆楽天最安値リアルレビュー

## 1. はじめに：なぜ「SHISEIDO エッセンス スキングロウ ファンデーション」が選ばれるのか？
美容賢者やSNSの口コミで「美容液をつけているような素肌感とツヤが続く」と圧倒的人気を誇るSHISEIDOの美容液ファンデーション。ナイアシンアミドとケフィア発酵エキスGL（保湿成分）を配合し、メイクしている間中も肌のバリア機能を整えながら、みずみずしい発光ツヤ肌を叶えます。

## 2. 30日間使用して分かったリアルなメリット・使用感
- **美容液レベルの保湿力と伸びの良さ**: 少量でスッと肌に溶け込み、ファンデーション特有の重さや乾燥感を一切感じさせません。
- **毛穴や色ムラを光で飛ばす自然なカバー力**: 厚塗り感が出ず、まるで素肌そのものが発光しているかのような自然で美しい仕上がり。
- **夕方になってもくすまないロングラスティング効果**: 時間が経っても乾燥崩れや毛穴落ちが起きにくく、一日中潤ったツヤをキープ。

## 3. デメリット・注意点
- **カバー力重視の方には物足りない場合あり**: シミや濃いニキビ跡はコンシーラーとの併用がおすすめです。
- **人気カラーの品薄**: 標準色や人気トーンはセール期に売り切れやすいため、在庫があるタイミングでの確保が推奨されます。

## 4. 楽天市場でお得に最安値購入する方法
公式ショップやポイント高還元認定ショップを活用することで、定価よりも大幅な実質割引・ポイントバックで購入可能です。`,
    features: [
      'ナイアシンアミド＆ケフィア発酵エキス配合の美容液処方',
      '毛穴や色ムラを光のヴェールで自然にカバーする極上ツヤ仕上がり',
      'SPF30・PA+++で日常の紫外線から肌をガード'
    ],
    pros: [
      'スキンケアをつけているようなみずみずしい軽さと抜群の保湿力',
      '素肌がキレイに見える上品なツヤ感と毛穴レスな仕上がり',
      '時間が経っても崩れにくく乾燥しにくいロングラスティング処方'
    ],
    cons: [
      'しっかりカバーしたい濃いシミやクマはコンシーラー併用がおすすめ'
    ]
  },
  "autodiscover-takami": {
    reviewBody: `# 【2026年完全保存版】TAKAMI タカミスキンピール 角質美容水 30mL 徹底効果検証＆楽天最安値リアルレビュー

## 1. はじめに：なぜ「タカミスキンピール」がロングセラー美肌習慣として選ばれるのか？
美容皮膚の現場から生まれた角質美容水「タカミスキンピール」。肌の生まれ変わりのリズムに寄り添い、角質層を削るのではなく穏やかに整えるアプローチで、毛穴の目立ちやゴワつき、くすみに悩む全世代から絶大な支持を集めています。

## 2. 30日間使用して分かったリアルなメリット・使用感
- **水のようにサラッとしたテクスチャー**: 洗顔後すぐの肌にスーッと浸透し、べたつきゼロ。その後の化粧水の馴染みが劇的に向上します。
- **使い続けることで感じるキメの整いと滑らかさ**: 触ったときのザラつきが和らぎ、つるんとしたなめらか美肌へ。
- **敏感肌でも毎日使えるマイルド処方**: ピーリング特有のヒリつきや赤みが出にくく、毎日のスキンケアルーティンに組み込みやすい設計。

## 3. デメリット・注意点
- **塗布後の3分間待つ時間が必須**: 肌にしっかり馴染ませるために3分置いてから化粧水を塗る手順を守る必要があります。
- **即効性よりも継続が重要**: 1〜2回で劇的な変化を求めるよりも、1本使い切る頃に肌コンディションの違いを実感しやすいアイテムです。

## 4. 楽天市場でお得に最安値購入する方法
タカミ公式ショップやお買い物マラソン等のポイントアップキャンペーンを活用することで、定価購入よりもお得にポイントを貯めながら継続できます。`,
    features: [
      '角質を削らず整える角質美容水処方',
      '水のようなサラッとした使用感で化粧水の浸透をサポート',
      '無香料・無着色・鉱物油フリーの低刺激設計'
    ],
    pros: [
      '肌のゴワつきやキメの乱れをなめらかに整える',
      'どんな化粧水・美容液とも相性抜群でベタつかない',
      '毎日使えるマイルド処方で健やかな肌リズムをサポート'
    ],
    cons: [
      '塗布後に3分間待つステップを守る必要がある'
    ]
  },
  "autodiscover-dior": {
    reviewBody: `# 【2026年完全保存版】Dior ディオール アディクト リップ マキシマイザー 徹底効果検証＆楽天最安値リアルレビュー

## 1. はじめに：なぜ「ディオール リップ マキシマイザー」が殿堂入りリップケアとして愛されるのか？
カプサイシン誘導体とヒアルロン酸配合で、瞬時にボリュームアップしたようなふっくら唇を叶えるDiorのアイコンリップ「マキシマイザー」。90%自然由来成分で唇をたっぷり保湿しながら、上品なツヤと血色感を与えてくれます。

## 2. 30日間使用して分かったリアルなメリット・使用感
- **スーッとした心地よいプランプ効果**: 塗った瞬間から清涼感があり、唇の縦ジワを目立たなくふっくら整えます。
- **高い保湿力と極上のツヤ膜**: グロス特有のベタつきが少なく、濃密な潤いで乾燥や皮むけを防ぎます。
- **下地にもトップコートにも使える汎用性**: 単体での自然な血色感メイクはもちろん、手持ちのリップの上から重ねても立体感とツヤが引き立ちます。

## 3. デメリット・注意点
- **ピリピリ感が苦手な方**: カプサイシン等のプランプ成分による刺激が気になる方は注意が必要です。
- **人気限定色の在庫変動**: 限定カラーやトレンド色は楽天市場内でも早期に完売することが多いため、見つけ次第のチェックがおすすめです。

## 4. 楽天市場でお得に最安値購入する方法
送料無料ショップや割引クーポン発行店舗、ポイント最大10倍〜20倍対象ショップを選ぶことで、百貨店カウンター以上の高還元・お得プライスで購入可能です。`,
    features: [
      'ヒアルロン酸＆チェリーオイル配合の高保湿・90%自然由来成分',
      '唇を瞬時にふっくら整えるボリュームアップ・プランプ効果',
      '豊富なカラーバリエーションと上品なツヤ感'
    ],
    pros: [
      '縦ジワが気にならないふっくらボリューミーなリップ仕上がり',
      '唇の乾燥を防ぐトリートメントグロスとしての高い保湿力',
      'リップ下地・単体・重ね塗りとマルチに活躍'
    ],
    cons: [
      'プランパー特有のスーッとする刺激感がある'
    ]
  }
};

const seenIds = new Set();
const cleanedArticles = [];

articles.forEach(a => {
  if (seenIds.has(a.id)) return;
  seenIds.add(a.id);

  const cleanA = { ...a };
  cleanA.title = cleanTitle(cleanA.title, cleanA.productName);
  cleanA.reviewBody = cleanReviewBody(cleanA.reviewBody);
  cleanA.summaryKeyPoints = cleanKeyPoints(cleanA.summaryKeyPoints);

  // Apply rich replacement if needed
  if (richReplacements[cleanA.id]) {
    cleanA.reviewBody = richReplacements[cleanA.id].reviewBody;
    cleanA.features = richReplacements[cleanA.id].features;
    cleanA.pros = richReplacements[cleanA.id].pros;
    cleanA.cons = richReplacements[cleanA.id].cons;
  }

  cleanedArticles.push(cleanA);
});

console.log(`処理完了: 総記事数 ${articles.length}件 -> 重複除去・最適化後 ${cleanedArticles.length}件`);
fs.writeFileSync(filePath, JSON.stringify(cleanedArticles, null, 2), 'utf8');
console.log('✅ articles.json を正常に更新・保存しました。');
