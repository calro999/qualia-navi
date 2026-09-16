import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch160_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ160の4記事の定義
const batchDefs = [
  {
    id: 'art-neck-skin-tag-apricot-coix-seed-oil-10sen-2026',
    slug: 'art-neck-skin-tag-apricot-coix-seed-oil-10sen-2026',
    title: '【首のポツポツ・イボ対策オイル＆美容液10選】杏仁オイル＆ハトムギ（ヨクイニン）で滑らか美首へ！角質粒をケアする人気アイテム比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: '首元やデコルテのざらざら・加齢によるポツポツ角質粒を撃退！「杏仁オイル＆ハトムギ（ヨクイニン）配合美容液」おすすめ10選！パルミトレイン酸豊富な天然アンズ核油と高濃度ハトムギエキスで、皮膚を柔らかくほぐしてつるすべ首元へ導く人気アイテムを徹底比較。',
    products: fetched.t1,
    lead: `「首元やデコルテ、目元に小さな茶色いポツポツ（角質粒・首イボ）ができて手触りがざらつく」「ネックレスやハイネックの服が擦れてチクチク痛い・気になる」「皮膚科に行く前にまずは自宅で肌に優しくポツポツをポロリとケアしたい」……年齢とともに現れる首元のざらつきや角質粒を滑らかに整える救世主が、**「杏仁オイル＆ハトムギ美容オイル」**です。

昔からイボ・角質ケアとして愛される和漢植物のパワーが凝縮されています：
1. **年齢とともに減少する若さの脂肪酸「パルミトレイン酸」豊富な南杏仁油**：硬くなった角質粒の隙間に浸透して皮膚を柔らかく柔軟化し、自然なターンオーバーを促進
2. **ヨクイニン（ハトムギ種子エキス）が肌の代謝を活性化しキメを整える**：肌の水分代謝とターンオーバーを正常化させ、古い角質が垢となって自然に剥がれ落ちるサイクルをサポート
3. **首元のシワや乾燥も同時に潤すエイジングケア設計**：ベタつかない上質な天然植物オイルが首筋全体を保湿し、ピンとハリのある若々しいデコルテラインをキープ

今回は楽天市場で口コミ高評価を集める人気ポツポツケアオイル10選を徹底比較します！`
  },
  {
    id: 'art-egg-apatite-teeth-whitening-powder-10sen-2026',
    slug: 'art-egg-apatite-teeth-whitening-powder-10sen-2026',
    title: '【卵殻アパタイト配合ホワイトニングパウダー10選】ペーストでは落ちない頑固な黄ばみ・ヤニを吸着！歯を傷めず白くする粉歯磨き比較',
    category: 'オーラルケア',
    date: '2026-09-16',
    description: '水なしで使えてステインをごっそり吸着！「高濃度卵殻アパタイト配合ホワイトニングパウダー（粉歯磨き）」おすすめ10選！ペースト歯磨き粉では配合できない40%〜50%超の高濃度アパタイト微粒子がエナメル質の隙間の着色汚れを吸着除去する人気商品を徹底解説。',
    products: fetched.t2,
    lead: `「毎日ホワイトニング歯磨き粉を使っているのにコーヒーや紅茶のステイン（黄ばみ）が取れない」「市販のホワイトニングは研磨剤で歯のエナメル質を削りそうで知覚過敏が心配」「クリニックに通わず自宅でサロン帰りのようなツルツルの白い歯をキープしたい」……次世代オーラルケアとして爆発的人気を集めるのが、**「卵殻アパタイト配合ホワイトニングパウダー」**です。

ペースト状歯磨き粉の限界を超えた吸着クレンジング構造が特徴です：
- **水分を限界まで排除した粉末だからこそ実現できるアパタイト高配合率（最大50%以上）**：歯の成分とほぼ同じハイドロキシアパタイトが、歯の微細な傷に入り込み汚れを絡め取って吸着
- **歯の表面を削らない「吸着除去」だからエナメル質を痛めず知覚過敏でも安心**：研磨剤フリー設計で、歯をツルツルのコーティング膜で包んで汚れの再付着も強力ブロック
- **乾いた歯ブラシに直接つけて磨くだけの簡単ケア**：口に入れた瞬間スーッと溶け、ブラッシング後のツルツル感と息の爽快感が一日中持続

今回はドクターオーラルをはじめ楽天市場で大ヒット中の人気ホワイトニング粉歯磨き10選を徹底比較します！`
  },
  {
    id: 'art-matte-mud-lip-smooth-powder-texture-10sen-2026',
    slug: 'art-matte-mud-lip-smooth-powder-texture-10sen-2026',
    title: '【泥リップ・リップマッド（MUD LIP）おすすめ10選】パウダリーなスフレ質感＆落ちない！チーク兼用で韓国・中華メイクが完成する人気リップ比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: '乾燥しない新感覚の泥質感マットリップ！「泥リップ・リップマッド」おすすめ10選！ふんわりとしたスフレ状の泥テクスチャーが唇の縦じわをフラットにぼかし、指でポンポン広げるだけでチークやアイシャドウとしてもワントーンメイクが完成する人気コスメを徹底検証。',
    products: fetched.t3,
    lead: `「従来のマットリップは唇がパサパサに乾燥したり縦じわが目立つ」「飲食すると内側だけハゲて不自然な輪郭が残ってしまう」「韓国アイドルや中華ワンホンのような、ぽわんとぼかした抜け感リップを作りたい」……今アジア中で爆発的ブームを巻き起こしているのが、**「泥リップ（リップマッド）」**です。

リキッドでもスティックでもない新感覚の泥スフレ処方が革命を起こしています：
- **泥のようにクリーミーに伸びて唇の上でサラサラのパウダリー質感へ変化**：唇の微細な縦じわの隙間を埋めてソフトフォーカス効果を発揮し、ふんわり立体的なマシュマロリップを演出
- **指先で唇の輪郭をぼかすだけでオーバーリップ・グラデーションがテクニックいらず**：パウダリーに密着するためマスクやコップにも色移りしにくく、自然な血色感が長時間ロングキープ
- **リップだけでなくチークやアイシャドウとしても使えるマルチコスメ**：頬や目元にトントンと馴染ませるだけで、統一感のある旬のワントーン垢抜けフェイスが完成

今回はINTOU（イントゥユー）をはじめ楽天市場で注文殺到中の人気泥リップ10選を徹底比較します！`
  },
  {
    id: 'art-wet-detangling-hair-brush-no-damage-10sen-2026',
    slug: 'art-wet-detangling-hair-brush-no-damage-10sen-2026',
    title: '【濡れ髪用ディタングリングブラシ10選】お風呂上がり・ブリーチ毛でも痛まずスルン！髪が絡まない人気タングルブラシ比較',
    category: 'ヘアケア',
    date: '2026-09-16',
    description: '濡れてデリケートな髪を無理なく解きほぐす！「濡れ髪専用ディタングリングブラシ（ヘアブラシ）」おすすめ10選！長短多段構造の特殊柔軟ピンが、絡まりやすい濡れ髪やダメージヘア、細いお子様の髪も引っ張らずに一撃でスルンと梳かす人気アイテムを徹底解説。',
    products: fetched.t4,
    lead: `「お風呂上がりや洗髪後に濡れた髪をブラシで梳かすとブチブチ切れて抜ける」「カラーやブリーチを繰り返したハイダメージ毛が毛先で絡まって指が通らない」「朝の寝癖や絡まりを引っ張って痛がる子どものブラッシングが大変」……髪が最もデリケートになる濡れ髪の救世主が、**「濡れ髪用ディタングリングブラシ」**です。

髪の毛を引っ張らず、無理なテンションをかけない特殊構造を採用しています：
1. **長短2段〜多段構造の超柔軟ピンが絡まりの隙間をすり抜けてスルリと解消**：どんなに頑固な結び目や毛先の絡まりも、一方向に優しく撫でるだけで痛みゼロで解きほぐす
2. **インバス（お風呂でのトリートメント塗布）＆アウトバス（ドライヤー前）の両用設計**：トリートメントを毛先まで均一に行き渡らせることで、浸透率を高めてサラサラ度を倍増
3. **人間工学に基づいた濡れた手でも滑らないハンドル形状＆丸洗い可能な防水構造**：水抜き穴が付いており、お風呂場に置きっぱなしでもカビにくく清潔を保てる

今回はタングルティーザーをはじめ楽天市場で殿堂入りしている人気ディタングリングヘアブラシ10選を徹底比較します！`
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
      title: '選び方ポイント1：成分濃度と配合バランスをチェック',
      desc: 'ハトムギや杏仁油の純度、アパタイトの配合比率、リップの保湿成分など、悩みにダイレクトに届く高濃度・高品質処方を選びましょう。'
    },
    {
      title: '選び方ポイント2：テクスチャーと使用感の心地よさ',
      desc: '毎日使うものだからこそ、ベタつきのないオイル、刺激の少ないパウダー、滑らかに伸びる泥リップなど心地よいテクスチャーが重要です。'
    },
    {
      title: '選び方ポイント3：肌・歯・髪への低刺激設計と安全性',
      desc: '研磨剤フリー、無添加処方、柔軟ピン構造など、摩擦やダメージを与えない安全性の高い設計であることを確認しましょう。'
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
