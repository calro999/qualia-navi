import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch159_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ159の4記事の定義
const batchDefs = [
  {
    id: 'art-electric-scalp-massager-brush-ems-10sen-2026',
    slug: 'art-electric-scalp-massager-brush-ems-10sen-2026',
    title: '【EMS電動頭皮ブラシ＆ヘッドスパ美顔器10選】頭皮を揉みほぐして顔全体リフトケア！完全防水・サロン級の爽快マッサージ器比較',
    category: 'ヘアケア',
    date: '2026-09-16',
    description: 'ガチガチ頭皮を極上リフレッシュしてフェイスラインまでスッキリ！「EMS電動頭皮マッサージブラシ（ヘッドスパ美顔器）」おすすめ10選！完全防水（IPX7）でお風呂で使え、プロの揉み出し手技とEMS電気刺激、赤色LED美肌光を兼ね備えた人気ギアを徹底比較。',
    products: fetched.t1,
    lead: `「デスクワークやスマホのせいで頭皮が岩のように硬く凝り固まっている」「夕方になると目が重く開きにくい・顔のたるみが気になる」「お風呂で美容院のようなヘッドスパ体験を手軽に味わいたい」……頭皮と顔の筋肉のつながりに着目した大ヒット美容家電が、**「EMS搭載電動頭皮ブラシ（ヘッドスパ美顔器）」**です。

プロのサロン手技を超える圧倒的な揉み出し力と電気刺激が魅力です：
1. **4つの独立した立体ローラーが頭皮を360度つまみ揉みほぐす**：指先では届かない筋膜の奥深くまでグイグイ刺激し、血行不良による薄毛・白髪・重だるさを根本ケア
2. **EMS微弱電流が頭筋と表情筋にダイレクトにアプローチ**：頭皮のコリを緩めるだけでなく、引き上げ効果で目元パッチリ＆フェイスラインのたるみを引き締め
3. **お風呂で使えるIPX7完全防水設計＆シャンプーブラシとしても大活躍**：毛穴に詰まった皮脂汚れやフケをしっかりかき出し、洗い上がりの根元ふんわり立ち上がり感を実感

今回は楽天市場でレビュー数数万件を超える人気電動ヘッドスパブラシ10選を徹底比較します！`
  },
  {
    id: 'art-kenzan-silicone-scalp-shampoo-brush-10sen-2026',
    slug: 'art-kenzan-silicone-scalp-shampoo-brush-10sen-2026',
    title: '【ケンザン型スカルプブラシ10選】シャンプーしながら頭皮ツボ押し＆コリほぐし！uka系シリコン製人気頭皮ブラシ比較',
    category: 'ヘアケア',
    date: '2026-09-16',
    description: '手のひらサイズでサロン帰りのスッキリ頭皮！「ケンザン型シリコンスカルプシャンプーブラシ」おすすめ10選！適度な硬さの円錐状突起が頭皮のツボを心地よく刺激し、毛穴の皮脂汚れを一掃して目の疲れや首コリまでほぐす人気モデルを徹底検証。',
    products: fetched.t2,
    lead: `「指先だけでシャンプーすると爪で頭皮を痛めたり毛穴汚れが落ちきらない」「頭皮のニオイや夕方のベタつきが気になる」「PC作業の合間にこめかみや頭頂部のツボを押してリフレッシュしたい」……そんな現代人のセルフケア習慣として爆発的人気を誇るのが、**「ケンザン型シリコンスカルプブラシ」**です。

絶妙な弾力を持つシリコン突起が頭皮のあらゆるコリを捕らえます：
- **シャンプー時に頭皮の上をジグザグ滑らせるだけで濃密泡と毛穴ディープクレンジング**：指では届かない毛穴の隙間に入り込み、気になるニオイやベタつきの元をスッキリ除去
- **蝶々型や握りやすいエルゴノミクス形状で濡れた手でも滑らない**：手のひらにフィットし、軽い力でも頭皮のツボにグッと圧をかけられるため手が疲れない
- **つなぎ目のない一体成型シリコンで水が溜まらずカビ知らず**：お風呂場に立てて乾かせる自立設計など、衛生面と耐久性も抜群

今回はukaをはじめ楽天市場で爆売れ中の人気ケンザン型スカルプブラシ10選を徹底比較します！`
  },
  {
    id: 'art-wireless-support-night-bra-bust-care-10sen-2026',
    slug: 'art-wireless-support-night-bra-bust-care-10sen-2026',
    title: '【ノンワイヤー育乳ナイトブラおすすめ10選】寝ている間の横流れ・下垂防止！苦しくないのに美胸キープの人気補正ブラ比較',
    category: 'ボディケア',
    date: '2026-09-16',
    description: '寝返りを打ってもバストが崩れない！「ノンワイヤー育乳補正ナイトブラ」おすすめ10選！仰向けや横向き寝でもクーパー靭帯の伸びやバストの横流れ・背中肉のハミ出しを360度全方位から包み込んでホールドする人気ランジェリーを徹底解説。',
    products: fetched.t3,
    lead: `「ノーブラで寝るとバストが横に流れて形が崩れる・離れ胸になるのが心配」「昼用のワイヤーブラで寝ると締め付けが苦しくて息苦しい・ワイヤーが当たって痛い」「背中や脇のお肉を逃さず、ふっくら丸みのある理想の美胸を育てたい」……就寝中のバストケアの新常識が、**「ノンワイヤー育乳ナイトブラ」**です。

締め付け感ゼロの極上フィットと確かな補正力を両立しています：
1. **特許構造の3D立体カップ＆脇高サイドボーンで寝返りでもお肉を逃さない**：重力で上下左右に動くバストを優しく中心に集め、クーパー靭帯への負担を徹底カット
2. **完全ワイヤーレス＆タグレス・肌触り滑らかな吸汗速乾コットン素材**：アンダーや肩への食い込みがなく、寝返りを邪魔しないストレスフリーな着用感
3. **フロントホックや調整アジャスターで昼夜兼用できるデザインも人気**：おうち時間のリラックスブラやテレワーク中のインナーとしても24時間大活躍

今回はViageやルルクシェルなど楽天市場でレビュー数万件を超える人気ナイトブラ10選を徹底比較します！`
  },
  {
    id: 'art-water-drop-marshmallow-makeup-sponge-10sen-2026',
    slug: 'art-water-drop-marshmallow-makeup-sponge-10sen-2026',
    title: '【水で膨らむメイクスポンジ＆パフ10選】薄膜密着で崩れない！韓国アイドルのような水光ツヤ肌を作る人気マシュマロパフ比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: 'ファンデーションの厚塗り・ムラ・毛穴落ちを撲滅！「水で膨らむマシュマロメイクスポンジ（しずく型・多面カット）」おすすめ10選！水を含ませて絞るとプルプルに膨らみ、極薄のツヤヴェールを作って一日中ヨレない美肌に仕上げる人気ツールを徹底比較。',
    products: fetched.t4,
    lead: `「リキッドファンデを手で塗るとムラになったり厚塗り感が出て老け見えする」「夕方になると小鼻やほうれい線にファンデが毛穴落ちして崩れる」「韓国アイドルのような内側から発光するうるツヤ水光肌を作りたい」……メイクの完成度とキープ力を劇的に引き上げるのが、**「水で膨らむマシュマロメイクスポンジ」**です。

水を含ませることでテクスチャーが激変し、プロ級のベースメイクが完成します：
- **水を含ませて絞ると約1.5〜2倍に膨らみ、もっちり柔らかなマシュマロタッチに**：余分なファンデや油分をスポンジが適度に吸着し、驚くほど薄づきで均一な膜を形成
- **しずく型・斜めカット面が顔の全パーツにミリ単位でシンデレラフィット**：底面で頬や額の広い面を素早く叩き込み、尖った先端で目元や小鼻のキワを完璧にカバー
- **非ラテックス親水性ポリウレタン採用でアレルギー肌にも安心**：きめ細かい気泡構造でファンデーションを吸いすぎず、コスメの節約にも貢献

今回はビューティーブレンダーやアンドビーをはじめ楽天市場で大人気のメイクスポンジ10選を徹底比較します！`
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
      title: '選び方ポイント1：機能性とパワー・ホールド力の持続性',
      desc: 'EMSの刺激の強さ、シリコンの硬度（ソフト・ハード）、ナイトブラのホールド力など、自分の悩みや好みに合ったスペックを選びましょう。'
    },
    {
      title: '選び方ポイント2：肌や髪への優しさとストレスフリーな着け心地・握りやすさ',
      desc: '毎日手に取って使うアイテムだからこそ、摩擦が少ない素材、手のひらに馴染む形状、締め付けすぎない設計が継続利用に直結します。'
    },
    {
      title: '選び方ポイント3：水洗い・お手入れのしやすさと衛生面',
      desc: 'お風呂や寝室、洗面所で毎日使うものだからこそ、完全防水仕様や丸洗い可能で乾きやすい構造であるかを確認しましょう。'
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
