import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch157_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ157の4記事の定義
const batchDefs = [
  {
    id: 'art-nano-facial-steamer-deep-pore-cleansing-10sen-2026',
    slug: 'art-nano-facial-steamer-deep-pore-cleansing-10sen-2026',
    title: '【ナノ美顔フェイススチーマー10選】毛穴の奥から汚れを浮かせてモチモチ素肌！温冷機能＆アロマ対応の人気保湿スチーマー比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: 'エステ級のディープクレンジングと濃密保湿を自宅で再現！「ナノ微粒子美顔フェイススチーマー」おすすめ10選！毛穴を開いて頑固な黒ずみや角栓をスルンと浮かせ、化粧水の浸透力を劇的に高める人気モデルを徹底比較。',
    products: fetched.t1,
    lead: `「毎日クレンジングしても小鼻の黒ずみや角栓のザラつきが取れない」「乾燥肌で高価な美容液やシートマスクを使っても肌表面で弾かれてしまう」「お風呂上がりにエステのような極上のスチームケアでリラックスしたい」……毛穴ケアと素肌の透明感を根本から引き上げる美容家電の代表格が、**「ナノ美顔フェイススチーマー」**です。

水道水の水分子をナノサイズに微細化することで、毛穴の奥深くへ水分を届けます：
1. **ナノ温スチームが毛穴を柔らかく押し広げて詰まりを浮遊・排出**：クレンジング前に浴びるだけでファンデーションや皮脂汚れが溶け出し、摩擦レスなディープクレンジングが可能
2. **温スチーム×冷ミストの交互浴でキュッと引き締まったハリ肌へ**：温めて緩め、冷やして引き締めるエステ手技をボタン一つで再現し、キメの整った化粧ノリ抜群の肌へ
3. **アロマトレイ付きや大容量タンクで就寝中の乾燥対策にも最適**：お気に入りの精油の香りで癒やされながら、長時間の加湿ケアもこなす多機能設計

今回はパナソニックをはじめ楽天市場で絶大な人気を誇るおすすめ美顔スチーマー10選を徹底比較します！`
  },
  {
    id: 'art-lip-plumper-volume-gloss-serum-10sen-2026',
    slug: 'art-lip-plumper-volume-gloss-serum-10sen-2026',
    title: '【ぷっくりボリュームリッププランパー10選】縦じわ消滅＆血色感UP！カプサイシン・ヒアルロン酸配合の人気唇用美容液比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: '塗った瞬間ピリリと刺激で唇ふっくら！「ぷっくりボリュームリッププランパー（リップ用美容液グロス）」おすすめ10選！カプサイシンやトウガラシエキス、ボルフィリン、高保湿ヒアルロン酸で、縦じわのない赤ちゃんのようなツヤ唇を作る人気アイテムを徹底検証。',
    products: fetched.t2,
    lead: `「唇が薄くてボリュームがないのがコンプレックス」「唇の縦じわが深くてマットリップやティントを塗ると老け見えしてしまう」「乾燥でカサついて血色が悪く、すっぴんだと顔色が悪く見える」……そんな唇の悩みを塗るだけで瞬時に解消するのが、**「リッププランパー（唇ボリューム美容液）」**です。

心地よいピリピリ感とともに唇本来のふっくら感と血色感を呼び覚まします：
- **カプサイシンや温感ペプチドが血行を促進し、ぷっくりとした立体感を演出**：ヒアルロン酸注射をしたかのような自然なボリュームアップ効果で、ぷるんとした魅力的な唇へ
- **贅沢な美容液成分（ヒアルロン酸・コラーゲン・セラミド）で集中保湿**：乾いた唇を濃密な潤いの膜で包み込み、皮むけを防いでうるおいを一日中キープ
- **クリアタイプはリップ下地やナイトリップマスクに、色付きタイプは1本で主役グロスに**：手持ちの口紅の上に重ねてニュアンスチェンジやガラス玉のような透明感ツヤをプラス

今回はディオールや韓国コスメをはじめ楽天市場でリピーター続出の人気リッププランパー10選を徹底比較します！`
  },
  {
    id: 'art-pen-type-nail-cuticle-oil-portable-10sen-2026',
    slug: 'art-pen-type-nail-cuticle-oil-portable-10sen-2026',
    title: '【ペンタイプ・ネイルオイル10選】持ち運び便利で液だれゼロ！爪の乾燥・ささくれ・二枚爪を防ぐ人気キューティクルオイル比較',
    category: 'ネイルケア',
    date: '2026-09-16',
    description: 'ポーチやポケットに入れてどこでもサッと保湿！「ペンタイプ・ネイルオイル（キューティクルオイル）」おすすめ10選！ブラシやハケ付きのダイヤル式・ノック式で指先を汚さず、ジェルネイルの持ちを良くして美しいハイポニキウムを育てる人気アイテムを徹底解説。',
    products: fetched.t3,
    lead: `「手指のささくれが服に引っかかって痛い・出血する」「爪が乾燥して二枚爪になったり縦スジが目立つ」「マニキュアやジェルネイルをしても爪周りがカサついて長持ちしない」……手元の清潔感と若々しさを保つ必須ケアアイテムが、**「ペンタイプ・ネイルオイル」**です。

マニキュアボトルのように倒れてこぼれる心配がなく、外出先でもストレスフリー：
- **カチッと回すだけのダイヤル式ペン構造で適量をピンポイント塗布**：先端のコシのあるブラシで爪の生え際（甘皮）や爪裏のハイポニキウムまで余すことなく浸透
- **ホホバオイルやアーモンドオイルなど植物由来の天然保湿成分が角質層に浸透**：ベタつきにくくサラッとしたテクスチャーで、塗った直後にスマホやPCを触っても指紋がつかない
- **ホワイトムスクやローズなど癒やされる豊かな香りバリエーション**：仕事や家事の合間に塗るだけで、指先の保湿と同時に気分転換のアロマケアとしても大人気

今回は楽天市場で「まとめ買い常連」となっている人気ペン型キューティクルオイル10選を徹底比較します！`
  },
  {
    id: 'art-nano-glass-heel-callus-remover-file-10sen-2026',
    slug: 'art-nano-glass-heel-callus-remover-file-10sen-2026',
    title: '【特殊ナノガラス製・かかとやすり10選】撫でるだけでガサガサ角質が粉雪に！水洗い丸ごとOKで長持ちする人気かかと削り比較',
    category: 'ボディケア',
    date: '2026-09-16',
    description: '力いらずで感動のツルふわかかとへ！「特殊ナノガラス製かかとやすり（角質リムーバー）」おすすめ10選！超微細な半導体技術のエッチング加工により、健康な皮膚を傷つけずに硬い角質だけを削り落とし、水洗いだけで清潔に半永久使用できる人気アイテムを徹底比較。',
    products: fetched.t4,
    lead: `「ストッキングや靴下がガサガサのかかとに引っかかって伝線する」「軽石や金属ヤスリで擦りすぎて皮膚がヒリヒリ痛くなった」「かかとのひび割れや角質が恥ずかしくて素足やサンダルを履けない」……そんな長年の頑固なかかとトラブルをたった数分で解決するのが、**「特殊ナノガラス製かかとやすり」**です。

従来の金属ブレードや紙やすりとは別次元の精密構造を採用しています：
1. **ナノテクノロジーによる超微細ドット突起が古い角質だけを優しく削り落とす**：まるで粉雪のように角質がサラサラ削れ、健康な生きている皮膚は傷つけない安心設計
2. **削った直後から触りたくなるようなツルツル＆すべすべの仕上がり**：やすりの目が非常に細かいため、研磨後のザラザラ感が残らず滑らかな肌触りを実感
3. **使用後は流水でサッと流すだけで目詰まり解消＆アルコール除菌対応**：錆びる心配がなく、カビやバクテリアの繁殖を防いで半永久的に清潔・長寿命に愛用可能

今回は楽天市場で総合評価★4.5以上を連発している人気ガラス製かかと削り10選を徹底比較します！`
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
      title: '選び方ポイント1：成分や機能性と効果の実感度をチェック',
      desc: 'ナノスチームの細かさ、プランパーの刺激成分や保湿力、やすりの加工精度など、目的に合った実力派スペックを選びましょう。'
    },
    {
      title: '選び方ポイント2：持ち運びやすさと使い勝手の良さ',
      desc: 'ポーチに入るペン型や、片手で扱いやすいエルゴノミクスデザインなど、毎日のケアにストレスがない形状が大切です。'
    },
    {
      title: '選び方ポイント3：水洗い・お手入れのしやすさと衛生面',
      desc: '肌や爪に直接使うアイテムだからこそ、流水でサッと洗えたりアルコール消毒できる高耐久な素材を選びましょう。'
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
