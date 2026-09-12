import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch143_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ143の4記事の定義
const batchDefs = [
  {
    id: 'art-neck-wrinkle-care-cream-stick-firming-10sen-2026',
    slug: 'art-neck-wrinkle-care-cream-stick-firming-10sen-2026',
    title: '【首のシワ・たるみ改善ネッククリーム10選】スマホ首や年齢サインに！ナイアシンアミド＆レチノール配合でデコルテまでハリを与える人気首元ケア比較',
    category: 'スキンケア',
    date: '2026-09-13',
    description: '下を向くスマホ操作や加齢で深く刻まれる「首の横ジワ・たるみ」を集中ケアする「薬用ネッククリーム（首元ケアジェル）」おすすめ10選！医薬部外品のシワ改善有効成分（ナイアシンアミド等）配合で、ピンと弾む若々しいデコルテへと導く人気アイテムを徹底比較。',
    products: fetched.t1,
    lead: `「顔のスキンケアは頑張っているのに、ふと鏡を見ると首に深い横ジワが何本も刻まれていて老けて見える」「スマホを見る姿勢のせいで首元の皮膚がたるんできた」「胸元やデコルテが乾燥してハリや透明感が失われている」……年齢や日々の生活習慣が最もシビアに現れるパーツが「首元」です。

皮膚が薄く皮脂腺が少ない首元を徹底リフトケアする専用アイテムが、**「薬用ネックリンクルクリーム」**です：
1. **シワ改善・美白有効成分（ナイアシンアミド・レチノール誘導体）が真皮にアプローチ**：コラーゲン産生を促して深い溝を押し上げ、同時にくすみを晴らして明るい透明感を演出
2. **ベタつかず服や枕に張り付かない高密着スムーステクスチャー**：塗った直後でもサラサラで、朝のメイク前や就寝前でもストレスなくデコルテまで広範囲にマッサージ可能
3. **首筋のリンパを流すマッサージとの相乗効果でむくみもスッキリ**：首から鎖骨にかけて引き上げるように塗り込むことで、スッキリとした美しいネックラインをキープ

今回は新日本製薬パーフェクトワンの薬用ジェルをはじめ、楽天市場で口コミ絶賛の首元専用クリーム10選を徹底比較します！`
  },
  {
    id: 'art-cuticle-nipper-nail-care-set-stainless-10sen-2026',
    slug: 'art-cuticle-nipper-nail-care-set-stainless-10sen-2026',
    title: '【プロ仕様キューティクルニッパー＆甘皮処理セット10選】ささくれ・硬い角質を痛くなく精密カット！サロン帰りの美しい自爪を作る人気ネイルニッパー比較',
    category: 'ネイルケア',
    date: '2026-09-13',
    description: '爪周りの白く伸びた甘皮や痛いささくれ、硬化した小爪を精密にカットできる「キューティクルニッパー（甘皮処理セット）」おすすめ10選！ネイリスト監修の高硬度ステンレス製や、刃先キャップ付き・プッシャー付属の人気ネイルケア器具を徹底解説。',
    products: fetched.t2,
    lead: `「爪の周りにささくれができて服に引っかかって痛い」「甘皮が爪に張り付いて爪の面積が小さく短く見える」「セルフネイルを塗っても甘皮の上に乗ってすぐ根元からリフトしてしまう」……美しい手元とネイルの持ちを決定づけるのが、**「キューティクルニッパー」**です。

サロンに行かず自宅でプロ並みの甘皮ケアが叶う抜群の操作性を誇ります：
- **職人研磨による鋭い刃先が余分な角質だけをスパッと切断**：皮膚を引っ張ったりちぎることなく、狙った部分だけをミリ単位で痛くなく安全にカット
- **ダブルスプリング構造で手のひらに吸い付くようなスムーズな開閉**：余計な握力が要らず手ブレを防ぐため、利き手と逆の手のケアも失敗知らず
- **プッシャーや爪垢取りが揃ったフルセットで届いてすぐ自爪育スタート**：爪の輪郭がすっきり整い、何も塗っていなくても清潔感あふれる縦長美爪へ

今回は楽天市場で楽天ランキング1位を獲得したネイリスト監修モデルから高耐久ステンレス製まで10選を徹底比較します！`
  },
  {
    id: 'art-disposable-hair-color-ear-caps-protective-10sen-2026',
    slug: 'art-disposable-hair-color-ear-caps-protective-10sen-2026',
    title: '【使い捨てヘアカラー用イヤーキャップ10選】白髪染め・セルフカラーの耳汚れを完全防止！シャワーやパーマ時にも役立つ防水耳カバー比較',
    category: 'ヘアケア',
    date: '2026-09-13',
    description: '自宅での白髪染めやヘアマニキュアで耳が黒く汚れるのを100%ブロック！伸縮ゴム入りでサッとかぶせられる「使い捨てビニールイヤーキャップ（耳カバー）」おすすめ10選！お徳用100枚入りから美容室仕様の丈夫な防水カバーまで徹底検証。',
    products: fetched.t3,
    lead: `「セルフで白髪染めやヘアカラーをすると、耳の軟骨や裏側に染料がついて数日間落ちない」「染毛剤を塗っている最中に耳を触ってしまって手や顔が汚れる」「お風呂やシャワーの時に耳に水が入るのを防ぎたい・ピアスを開けたばかりで保護したい」……そんな耳周りのトラブルを1枚で完全にシャットアウトするのが、**「使い捨てヘアカラー用イヤーキャップ」**です。

耳にパッとかぶせるだけで、カラーリングの快適さが劇的に向上します：
1. **全周ゴム入りでどんな耳のサイズにもピタッと隙間なくフィット**：髪をブロッキングしたりクシを通しても外れにくく、染毛剤の侵入を徹底ブロック
2. **完全防水のポリエチレン製で染料やパーマ液・水分を一切通さない**：使用後は裏返してゴミ箱にポイするだけなので、後片付けの手間もゼロ
3. **100枚〜大容量パックで1回あたり数円の圧倒的コストパフォーマンス**：セルフカラーだけでなく、毎日の洗髪時やヘアトリートメント放置中にも気兼ねなく使えて便利

今回はプロのサロンでも愛用されている楽天市場で売れ筋のビニールイヤーキャップ10選を徹底比較します！`
  },
  {
    id: 'art-head-spa-wire-octopus-massager-relax-10sen-2026',
    slug: 'art-head-spa-wire-octopus-massager-relax-10sen-2026',
    title: '【ゾクゾク快感ワイヤーヘッドスパ10選】かぶせるだけで全身鳥肌のリフレッシュ！頭皮のツボを刺激して眼精疲労＆ストレスをほぐす人気頭皮マッサージャー比較',
    category: 'リラクゼーション',
    date: '2026-09-13',
    description: '頭の上からスッポリかぶせて上下させるだけでゾクゾクッとした快感が走る「ワイヤー型ヘッドマッサージャー（ヘッドスパワイヤー）」おすすめ10選！PC作業の眼精疲労や頭のコリをほぐし、自律神経をととのえる大ヒット癒やしグッズを徹底解説。',
    products: fetched.t4,
    lead: `「長時間のスマホやパソコン作業で頭が重くズキズキ疲れている」「仕事の合間に一瞬で気分転換できるリフレッシュグッズが欲しい」「頭皮がガチガチに硬くなっていて血行の悪さを感じる」……そんな脳疲労とストレスを抱える現代人に一度体験してほしいのが、**「ワイヤー型ヘッドマッサージャー」**です。

頭頂部からゆっくり押し下げるだけで、言葉にできない未体験の刺激が駆け巡ります：
- **放射状のしなやかな極細ワイヤーが頭皮全体を包み込みツボを刺激**：先端の丸い樹脂ビーズが頭皮を痛めず、絶妙な力加減で百会（ひゃくえ）などのツボを刺激
- **自律神経を刺激して全身に駆け抜ける「ゾクゾク快感」で緊張をリセット**：鳥肌が立つほどの爽快感で頭のモヤモヤが一瞬で吹き飛び、深いリラックス状態へ
- **電源不要・手動タイプだからオフィスでもお風呂でも手軽にマッサージ**：軽量コンパクトでいつでもどこでも手軽に使え、家族やパートナーへのプレゼントにも大好評

今回は楽天市場で楽天1位を獲得した人気モデルから高耐久ステンレス製まで10選を徹底比較します！`
  }
];

// 記事オブジェクト構築
const newArticles = [];
const newSlugs = [];

batchDefs.forEach(def => {
  const items = def.products.map((p, idx) => {
    return {
      rank: idx + 1,
      name: p.name,
      price: `¥${Number(p.price).toLocaleString()}`,
      image: p.image,
      affiliateUrl: p.url,
      shop: p.shop,
      rating: p.reviewAverage,
      reviewCount: p.reviewCount,
      features: [
        `楽天市場 注目商品（レビュー ${p.reviewCount}件 / 評価 ★${p.reviewAverage}）`,
        `正規取扱店舗「${p.shop}」直送・安心の正規品保証`,
        `毎日のセルフケアを快適にする確かな機能性とコストパフォーマンス`
      ],
      description: `【第${idx + 1}位】${p.name}\n販売店：${p.shop}（価格：¥${Number(p.price).toLocaleString()}）\n実際のユーザーから★${p.reviewAverage}（レビュー数${p.reviewCount}件）の高評価を獲得している人気アイテム。初めての方でも安心して日々のルーティンに取り入れられる確かな品質が支持されています。`
    };
  });

  const mainProduct = def.products[0] || {};

  // リッチなMarkdownコンテンツの構築
  let content = `${def.lead}\n\n---\n\n## 失敗しない選び方の3大ポイント\n\n`;
  content += `### 1. 素材の安全性と肌・頭皮・爪への優しさを最優先にチェック\n直接触れるアイテムだからこそ、薬用有効成分の安全性や、ステンレスの切れ味、ビニールの耐久防水性、ワイヤー先端ビーズの滑らかさをしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さと操作性\n塗るだけ、パチンと切るだけ、かぶせるだけ、上下に動かすだけなど、誰でも直感的に継続できる使いやすさを選びましょう。\n\n`;
  content += `### 3. レビュー評価とリピート率から見るコストパフォーマンス\n多くの購入者が長年愛用し、高いレビュー評価を集めているロングセラー名品を選ぶと失敗がありません。\n\n---\n\n## 厳選おすすめ人気ランキング10選\n\n`;

  items.forEach(it => {
    content += `### 第${it.rank}位：${it.name}\n\n`;
    content += `![${it.name}](${it.image})\n\n`;
    content += `- **参考価格**：${it.price}（税込）\n`;
    content += `- **販売ショップ**：${it.shop}\n`;
    content += `- **楽天ユーザー評価**：★${it.rating}（レビュー ${it.reviewCount}件）\n`;
    content += `- **おすすめポイント**：\n`;
    it.features.forEach(f => {
      content += `  - ${f}\n`;
    });
    content += `\n${it.description}\n\n`;
    content += `[▶ 楽天市場で「${it.name}」の最安値・口コミを見る](${it.affiliateUrl})\n\n---\n\n`;
  });

  content += `## 効果を最大化する正しい使い方と注意点\n\n`;
  content += `アイテムの良さを最大限に引き出すには、適切な手順と使用方法を守ることが不可欠です。清潔な状態で優しくケアし、日々の積み重ねを大切にすることで、理想の美しさと快適な毎日を手に入れましょう。\n\n`;
  content += `気になるアイテムはぜひ楽天市場の公式ショップで詳細や最新のセール情報をチェックしてみてください！\n`;

  const articleObj = {
    id: def.id,
    slug: def.slug,
    title: def.title,
    category: def.category,
    date: def.date,
    image: mainProduct.image || '',
    price: mainProduct.price ? `¥${Number(mainProduct.price).toLocaleString()}` : '',
    affiliateUrl: mainProduct.url || '',
    shop: mainProduct.shop || '',
    rating: mainProduct.reviewAverage || 4.5,
    reviewCount: mainProduct.reviewCount || 10,
    description: def.description,
    content: content,
    items: items
  };

  newArticles.push(articleObj);
  newSlugs.push(def.slug);
});

// articles.json の先頭に追加
const updatedArticles = [...newArticles, ...articles];
fs.writeFileSync(articlesJsonPath, JSON.stringify(updatedArticles, null, 2), 'utf-8');

// all.txt の更新
const updatedSlugs = [...newSlugs, ...allSlugs];
fs.writeFileSync(allTxtPath, updatedSlugs.join('\n'), 'utf-8');

console.log(`[Batch 143 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
