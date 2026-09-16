import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch158_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ158の4記事の定義
const batchDefs = [
  {
    id: 'art-ultra-fine-bubble-micro-nano-shower-head-10sen-2026',
    slug: 'art-ultra-fine-bubble-micro-nano-shower-head-10sen-2026',
    title: '【ウルトラファインバブル・シャワーヘッド10選】毛穴の奥まで洗浄＆最大80%節水！塩素除去・美肌ミストの人気美容シャワー比較',
    category: 'ボディケア',
    date: '2026-09-16',
    description: '浴びるだけでシルクのような美肌＆艶髪へ！「ウルトラファインバブル・マイクロナノバブルシャワーヘッド」おすすめ10選！毛穴より遥かに小さい超微細気泡で皮脂汚れや頭皮のニオイを洗い流し、驚異の節水効果と塩素除去機能を兼ね備えた人気モデルを徹底比較。',
    products: fetched.t1,
    lead: `「毛穴の黒ずみや頭皮のベタつき・ニオイをスッキリ落としたい」「家族全員で毎日使うお風呂だから水道代やガス代を大幅に節約したい」「水道水の残留塩素で肌がカサついたり髪がきしむのを防ぎたい」……毎日のバスタイムを極上の美肌スパ空間に変える必須アイテムが、**「ウルトラファインバブルシャワーヘッド」**です。

一般的なシャワーでは届かない毛穴の奥深くまで超微細な泡が入り込みます：
1. **毛穴よりも微細なナノバブルが皮脂やメイク残り、頭皮汚れを吸着・洗浄**：ゴシゴシ擦らなくてもミスト水流を浴びるだけで汚れが浮き上がり、すべすべの素肌とサラサラ髪を実現
2. **最大50%〜80%の節水率で年間の水道・ガス料金を数万円単位で削減**：水圧をキープしながら水量を抑える特殊散水板により、贅沢な浴び心地と家計への優しさを両立
3. **塩素除去カートリッジ＆肌温度をキープする温浴・保湿効果**：デリケートな敏感肌やお子様の肌を守り、お風呂上がりも湯冷めしにくくしっとり感が持続

今回はリファやボリーナなど楽天市場で口コミ数万件を超える人気美容シャワーヘッド10選を徹底比較します！`
  },
  {
    id: 'art-ultrasonic-water-peeling-pore-cleaner-10sen-2026',
    slug: 'art-ultrasonic-water-peeling-pore-cleaner-10sen-2026',
    title: '【超音波ウォーターピーリング美顔器10選】水だけで小鼻の角栓・黒ずみをごっそり吹き飛ばす！イオン導入＆EMSリフト対応の人気美顔器比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: 'エステ級の毛穴洗浄を自宅で手軽に体験！「超音波ウォーターピーリング美顔器」おすすめ10選！毎秒数万回の超音波振動で水をミスト化し、頑固な角栓や古い角質を瞬時に弾き飛ばす。さらにイオン導入やEMS引き締めまでこなす1台多機能モデルを徹底検証。',
    products: fetched.t2,
    lead: `「毛穴パックを使うと毛穴が余計に広がりそうで怖い」「小鼻のイチゴ鼻やあご下のザラザラを根本からツルツルにしたい」「高価な美容液が肌にぐんぐん入っていく土台を作りたい」……水と超音波の力だけで肌への負担を最小限に抑えながら毛穴を洗浄するのが、**「超音波ウォーターピーリング美顔器」**です。

薬剤や強い摩擦を使わず、超音波のミスト振動で汚れを弾き飛ばします：
- **毎秒24,000回〜30,000回の超音波振動で角栓や皮脂汚れを瞬時に乳化・吹き飛ばし**：水で濡らした肌の上を滑らせるだけで、ブレードにびっしり汚れが浮き出る圧倒的爽快感
- **イオン導出（クレンジング）＆イオン導入で美容成分の浸透率を爆上げ**：手塗りでは届かない角質層の深くまでビタミンCやヒアルロン酸を送り届け、内側から発光するツヤ肌へ
- **EMS微弱電流＆タッピング機能でキュッと引き締まったフェイスラインへ**：毛穴を引き締めながら表情筋を心地よく刺激し、たるみ毛穴のリフトケアも同時に完了

今回は楽天市場で毛穴ケア美顔器ランキング上位を独占する人気ウォーターピーリング10選を徹底比較します！`
  },
  {
    id: 'art-natural-hemp-gold-leaf-oil-blotting-paper-10sen-2026',
    slug: 'art-natural-hemp-gold-leaf-oil-blotting-paper-10sen-2026',
    title: '【天然麻・金箔入り高級あぶらとり紙おすすめ10選】ファンデを崩さず皮脂だけ瞬間吸収！Tゾーンのテカリ・メイク崩れを防ぐ人気あぶらとり紙比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: 'メイクの上から押さえるだけで朝のサラサラ肌が復活！「天然麻・金箔打紙製法あぶらとり紙」おすすめ10選！ファンデーションやお肌の水分は奪わず、酸化した余分な皮脂だけを強力に吸着する京都老舗品質の人気アイテムを徹底解説。',
    products: fetched.t3,
    lead: `「昼過ぎになると鼻やおでこが皮脂でギトギト・テカってしまう」「パウダーを重ねると厚塗り感や毛穴落ちして汚く崩れる」「普通のあぶらとり紙だと必要なうるおいまで取れて乾燥しそう」……メイク直しの仕上がりをワンランク格上げするプロ愛用アイテムが、**「天然麻・金箔打紙製法の高級あぶらとり紙」**です。

伝統の箔打ち技術によって極限まで繊維を高密度化させた最高品質の和紙です：
- **必要な水分やファンデーションはそのままに、余分な皮脂だけを瞬間キャッチ**：肌に軽く押し当てるだけで余分な油分だけを透き通るように吸い取り、メイクしたての清潔感が即復活
- **天然麻100%の極上肌触りで敏感肌でも摩擦ストレスゼロ**：ゴワゴワせず滑らかな感触で、小鼻のキワや目元などの細かい凹凸にもピタッと密着
- **携帯に便利なポップアップ式ケースや鏡付きタイプなど多彩なラインナップ**：ポーチから取り出す姿も上品で、日常使いから特別なギフトにも大人気

今回はよーじやをはじめ楽天市場で長年愛され続ける名品あぶらとり紙10選を徹底比較します！`
  },
  {
    id: 'art-natural-boar-bristle-hair-brush-shine-10sen-2026',
    slug: 'art-natural-boar-bristle-hair-brush-shine-10sen-2026',
    title: '【天然豚毛＆猪毛ヘアブラシおすすめ10選】梳かすだけで艶髪・アホ毛撃退！静電気を防ぎキューティクルを整える人気ツヤ出しブラシ比較',
    category: 'ヘアケア',
    date: '2026-09-16',
    description: '毎日のブラッシングでサロン帰りの天使の輪が蘇る！「天然豚毛＆猪毛ヘアブラシ」おすすめ10選！天然毛に含まれる適度な油分と水分が髪に自然な光沢を与え、静電気による広がりやパサつき、アホ毛を抑えてまとまりのある美髪へ導く人気ブラシを徹底比較。',
    products: fetched.t4,
    lead: `「プラスチックのブラシで梳かすと静電気が起きて髪が広がったりパサつく」「頭頂部のアホ毛がピョンピョン立って生活感が出てしまう」「トリートメントに頼るだけでなく、地毛そのもののツヤとコシを取り戻したい」……美髪のプロがこぞって推奨する王道のケアアイテムが、**「天然豚毛＆猪毛ヘアブラシ」**です。

化学繊維のブラシには真似できない天然素材ならではの美髪効果が詰まっています：
1. **天然毛に含まれる油分がブラッシングするたびに髪全体へ行き渡りツヤを再現**：パサついた毛先もしっとりまとまり、オイルをつけなくても自然なツヤのヴェールを形成
2. **静電気の発生を大幅に抑えてキューティクルの剥がれや摩擦ダメージを防止**：髪に優しい当たり心地で、冬場のパサつきやアホ毛の浮き立ちを瞬時に落ち着かせる
3. **適度な硬さの毛先が頭皮を心地よくマッサージし血行促進**：頭皮環境を健やかに整え、根元から立ち上がるハリ・コシのある豊かな美髪の土台を育成

今回はメイソンピアソンをはじめ楽天市場で圧倒的な口コミ評価を集める人気天然毛ブラシ10選を徹底比較します！`
  }
];

// 記事データを構築
for (const def of batchDefs) {
  const ranking = (def.products || []).slice(0, 10).map((p, index) => {
    return {
      rank: index + 1,
      name: p.name,
      price: p.price,
      url: p.url,
      image: p.image,
      shop: p.shop,
      reviewCount: p.reviewCount,
      reviewAverage: p.reviewAverage,
      description: `${p.name}は、${def.category}ジャンルで楽天市場ユーザーから高い評価（★${p.reviewAverage}・レビュー数${p.reviewCount}件）を集める人気アイテム。実用性とコスパに優れ、日々のケアやお悩みをスマートに解決してくれます。`
    };
  });

  const buyingGuide = [
    {
      title: '選び方ポイント1：機能性と素材の質・洗浄力・節水率をチェック',
      desc: 'ナノバブルの発生数や節水率、超音波の振動数、天然毛の硬さなど、自分の肌質や髪質に合ったスペックを重視しましょう。'
    },
    {
      title: '選び方ポイント2：持ちやすさと使い勝手・メンテナンス性',
      desc: '毎日手に取って使うものだからこそ、握りやすい形状やヘッドの重さ、丸洗いなどのお手入れのしやすさが重要です。'
    },
    {
      title: '選び方ポイント3：肌や髪への低刺激設計と耐久性',
      desc: '肌や頭皮を傷めない安全ガードや塩素除去機能、長期間毛先がへたらない高耐久な造りであるかを確認しましょう。'
    }
  ];

  const fullArticle = {
    id: def.id,
    slug: def.slug,
    title: def.title,
    category: def.category,
    date: def.date,
    updatedAt: def.date,
    author: 'ラクコスメ編集部',
    description: def.description,
    lead: def.lead,
    buyingGuide: buyingGuide,
    ranking: ranking,
    content: `## はじめに\n\n${def.lead}\n\n## 失敗しない選び方の3つのポイント\n\n${buyingGuide.map((g, i) => `### ${i+1}. ${g.title}\n\n${g.desc}`).join('\n\n')}\n\n## おすすめ人気ランキング10選\n\n${ranking.map(r => `### 第${r.rank}位：${r.name}\n\n- **価格**: ¥${r.price.toLocaleString()}（税込）\n- **ショップ**: ${r.shop}\n- **評価**: ★${r.reviewAverage} (${r.reviewCount}件)\n\n${r.description}\n\n[楽天市場で詳細を見る](${r.url})`).join('\n\n')}\n\n## まとめ\n\n毎日のビューティー＆ライフスタイルを格上げする便利アイテム。ぜひ自分にぴったりの商品を見つけてみてください！`
  };

  // 重複チェック
  const existingIdx = articles.findIndex(a => a.id === def.id || a.slug === def.slug);
  if (existingIdx >= 0) {
    articles[existingIdx] = fullArticle;
    console.log(`Updated existing article: ${def.slug}`);
  } else {
    articles.push(fullArticle);
    console.log(`Added new article: ${def.slug}`);
  }

  if (!allSlugs.includes(def.slug)) {
    allSlugs.push(def.slug);
  }
}

// 保存
fs.writeFileSync(articlesJsonPath, JSON.stringify(articles, null, 2), 'utf-8');
fs.writeFileSync(allTxtPath, allSlugs.join('\n') + '\n', 'utf-8');

console.log(`Successfully updated articles.json and all.txt. Total articles: ${articles.length}`);
