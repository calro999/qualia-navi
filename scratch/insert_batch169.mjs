import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch169_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ169の4記事の定義
const batchDefs = [
  {
    id: 'art-korean-idol-point-cluster-eyelashes-10sen-2026',
    slug: 'art-korean-idol-point-cluster-eyelashes-10sen-2026',
    title: '【韓国アイドル風・束感部分用つけまつげ10選】ピンセットで置くだけ！ワンラック・コミックまつ毛が作れる人気部分つけま比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: 'マスカラで束を作るより100倍簡単＆綺麗！「韓国アイドル風・束感部分用つけまつげ（クラスターラッシュ）」おすすめ10選！自まつ毛の下から忍ばせるアンダー付け対応や、9mm〜12mmのMIXセット、極細透明芯でつけている感ゼロの人気つけまを徹底比較。',
    products: fetched.t1,
    lead: `「韓国アイドルのようなクッキリとした束感まつ毛にしたいけれどピンセットとマスカラで作るとダマになる」「フルタイプのつけまつげは目頭が浮いたり派手すぎて不自然」「自まつ毛の隙間を埋めて自然に目の縦幅を拡張したい」……今アジア中のアイメイクの常識を変えたのが、**「韓国アイドル風・束感部分用つけまつげ」**です。

1束ずつ分かれたワンラック設計により、プロ級の抜け感アイがテクニックいらずで完成します：
1. **あらかじめ三角形の美しい束に成型されているため置くだけで束感まつ毛が完成**：マスカラを何度も重ね塗りして固める手間がなく、一日中上向きの先細り美まつ毛をキープ
2. **自まつ毛の「下」から装着できる極細透明ベースでグルーや芯が一切見えない**：目を閉じても伏し目にしてもつけまつげだと絶対にバレない圧倒的なナチュラルさ
3. **黒目の上や目尻など欲しい部分だけにピンポイントで足せるカスタマイズ性**：長さを変えて猫目風やタレ目風など、その日のメイクに合わせて自由自在に目の形をデザイン可能

今回は楽天市場でセルフ派・メイク好きに絶賛されている人気束感部分用つけま10選を徹底比較します！`
  },
  {
    id: 'art-ultra-fine-micro-eyebrow-pencil-09mm-10sen-2026',
    slug: 'art-ultra-fine-micro-eyebrow-pencil-09mm-10sen-2026',
    title: '【0.9mm超極細アイブロウペンシル10選】眉毛を1本1本リアルに描き足せる！自眉のように自然で落ちない人気マイクロ眉ペンシル比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: '眉尻の細いラインもまばらな眉頭もこれ1本でプロ級！「0.9mm以下・超極細マイクロアイブロウペンシル」おすすめ10選！セザンヌの超細芯アイブロウをはじめ、折れにくく滑らかな描き心地と水・汗・皮脂に強いウォータープルーフ仕様の人気ペンシルを徹底解説。',
    products: fetched.t2,
    lead: `「普通のアイブロウペンシルだと線が太くなって眉毛がベタッと海苔のようになってしまう」「眉尻の消えかけた細いラインをシャープに描けない」「自眉が薄い部分に本物の毛が生えているかのように描き足したい」……眉メイクのクオリティを劇的に引き上げるのが、**「0.9mm超極細アイブロウペンシル」**です。

直径1mm未満の極細芯だからこそ可能な「毛並み再現」が最大の魅力です：
- **自眉の毛の太さとほぼ同じ0.9mm芯で眉毛を1本ずつ繊細に植毛するように描ける**：毛が足りない隙間やまろ眉の眉尻も、本物の毛と見分けがつかないほど自然に補正
- **力を入れずにスルスル描ける絶妙な硬さ＆折れにくい高硬度特殊処方**：肌に引っかかることなく滑らかに発色し、極細芯ながら最後までストレスなく使い切れる設計
- **汗・水・皮脂・こすれに強いスーパーウォータープルーフで夜まで眉尻消えない**：夕方になると眉尻が消えて麻呂になってしまう悩みを根本から解消

今回はセザンヌやエクセルなど楽天市場でリピート買いが絶えない人気極細アイブロウペンシル10選を徹底比較します！`
  },
  {
    id: 'art-deep-penetrating-nail-repair-serum-keratin-10sen-2026',
    slug: 'art-deep-penetrating-nail-repair-serum-keratin-10sen-2026',
    title: '【浸透型ネイルトリートメント美容液10選】二枚爪・割れ爪・縦スジを根本補修！ジェルオフで薄くなったペラペラ爪を強化する人気爪美容液比較',
    category: 'ネイルケア',
    date: '2026-09-16',
    description: 'オイルでは届かない爪の深部へタンパク質チャージ！「浸透型ネイルリペア美容液（爪用ケラチントリートメント）」おすすめ10選！水溶性でベタつかず、加水分解ケラチンやハイドドキシプロピルキトサンが爪の内部組織に直接浸透して強い自爪を育てる人気商品を徹底検証。',
    products: fetched.t3,
    lead: `「ジェルネイルのオフを繰り返して自爪がペラペラに薄くなり、お風呂で曲がって痛い」「爪の先が二枚爪になって服に引っかかる・すぐに欠ける」「爪の表面に縦じわや白い斑点が目立ってマニキュアが綺麗に塗れない」……傷んだ自爪を内側から根本補修する集中トリートメントが、**「浸透型ネイル美容液」**です。

表面をコーティングするオイルとは異なり、水溶性処方で爪のケラチン繊維の隙間に浸透します：
- **浸透補修成分（加水分解ケラチン・キトサン）が爪の内部組織と結びついて強度を再生**：薄く脆くなった爪に厚みとコシを取り戻し、強く折れにくい健康な自爪へと導く
- **ベタつかず数秒でサラサラに乾く速乾水溶性処方**：塗った直後にスマホ操作や料理・PC作業ができ、一日に何度でも手軽に塗り直して集中補修可能
- **マニキュアやジェルの上からでも生え際（甘皮）やハイポニキウムに塗布して自爪育成**：これから生えてくる新しい爪の土台もしっかり栄養補給し、ピンク色のネイルベッドを美しく伸ばす

今回はドクターネイルをはじめ楽天市場で「爪が硬くなった」と口コミ絶賛の人気ネイル美容液10選を徹底比較します！`
  },
  {
    id: 'art-medicated-back-acne-body-wash-soap-10sen-2026',
    slug: 'art-medicated-back-acne-body-wash-soap-10sen-2026',
    title: '【薬用背中ニキビ・ボディソープ10選】ブツブツ・赤み・ざらつきを一網打尽！殺菌＆毛穴洗浄で魅せる美背中を作る人気薬用石鹸比較',
    category: 'ボディケア',
    date: '2026-09-16',
    description: '手の届かない背中の頑固なブツブツを泡で殺菌オフ！「薬用背中ニキビ用ボディソープ＆石鹸」おすすめ10選！サリチル酸やイソプロピルメチルフェノール、薬用炭配合で、アクネ菌やマラセチア真菌を殺菌し、皮脂詰まりを洗い流してつるすべ素肌へ導く人気商品を徹底解説。',
    products: fetched.t4,
    lead: `「背中が大きく開いた服や水着を着たいのに赤みやニキビ跡が気になって隠してしまう」「シャンプーの洗い残しや汗のせいで背中や胸元に痛いブツブツが繰り返しできる」「市販のボディソープだと背中のベタつきやざらつきがすっきり落ちない」……そんな背中の肌トラブルを毎日の入浴で根本ケアするのが、**「薬用背中ニキビボディソープ」**です。

背中の皮脂腺は顔のTゾーン並みに多く、ニキビ菌（アクネ菌・真菌）の温床になりがちです：
1. **有効成分イソプロピルメチルフェノールやサリチル酸が原因菌を徹底殺菌＆角質軟化**：毛穴に詰まった古い角質と過剰な皮脂を溶かし出し、炎症や赤みを急速に鎮静
2. **薬用炭やクレイ（泥）成分が微細な毛穴汚れや気になる体臭・皮脂臭を強力吸着**：手の届きにくい背中のくぼみまで濃密泡が行き届き、洗い上がりはさっぱり爽快
3. **グリチルリチン酸2KやビタミンC誘導体・ヒアルロン酸配合でニキビ跡や乾燥をケア**：洗い流した後のつっぱり感を防ぎ、キメの整った明るく清潔な美背中をキープ

今回はペリカン石鹸のForBackをはじめ楽天市場でロングセラーを誇る人気背中ニキビ石鹸10選を徹底比較します！`
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
      title: '選び方ポイント1：有効成分の配合と殺菌・補修力をチェック',
      desc: 'サリチル酸やケラチンの濃度、アイブロウの芯の硬度、つけまの束の設計など、悩みにダイレクトに届くスペックを重視しましょう。'
    },
    {
      title: '選び方ポイント2：操作性と使いやすさ・日常での取り入れやすさ',
      desc: 'ピンセットで取りやすいトレイ、描きやすい0.9mm細芯、ベタつかない速乾美容液など、ストレスなく続けられる使い勝手が大切です。'
    },
    {
      title: '選び方ポイント3：肌や爪への優しさと低刺激設計',
      desc: 'デリケートな目元や背中の皮膚に負担をかけない無添加処方や、自爪を削らない補修処方など安全性の高い設計を確認しましょう。'
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
