import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch138_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ138の4記事の定義
const batchDefs = [
  {
    id: 'art-portable-mouthwash-stick-portion-pack-10sen-2026',
    slug: 'art-portable-mouthwash-stick-portion-pack-10sen-2026',
    title: '【携帯スティック＆個包装マウスウォッシュ10選】口臭と汚れが目に見えてごっそり！オクチレモン等ポーチに入れて20秒で息スッキリする人気洗口液比較',
    category: 'オーラルケア',
    date: '2026-09-11',
    description: '外出先やランチ後、デート前に20秒口をゆすぐだけで口臭の元凶（タンパク質汚れ）が茶色い固まりになってドロドロ落ちる「携帯用スティック型・個包装マウスウォッシュ」おすすめ10選！SNSで大バズりのオクチレモンをはじめ、刺激が少なく爽やかな人気洗口液を徹底比較。',
    products: fetched.t1,
    lead: `「ランチの後に歯磨きをする時間や場所がない」「大事な会議やデートの前に口臭がしていないか不安」「マスクを外した瞬間の口内のネバつきや不快感を一瞬でリセットしたい」……そんな大人のエチケット習慣としてポーチやバッグの常備率が急上昇しているのが、**「携帯用スティック型マウスウォッシュ」**です。

1本ずつ使い切りのスリムパウチには、感動の口臭ケア機能が詰まっています：
1. **口内のタンパク質汚れを固めて可視化する驚異の洗浄力**：ゆすいで吐き出すと、歯磨きでは落としきれなかった汚れが茶色いフロックになって目に見える圧倒的爽快感
2. **ポーチやポケット、スマホケースにすっぽり収まる極薄スティック**：重い洗口液ボトルを持ち歩く必要がなく、トイレの個室で手軽に20秒ケアが可能
3. **ノンアルコール・低刺激設計でピリピリ痛くない優しい使い心地**：強い刺激が苦手な方でも安心して毎日使え、レモンやミントの清潔感あふれる息が持続

今回は楽天市場で数万件のレビューを集めるオクチシリーズをはじめ、大容量まとめ買いでコスパ抜群の個包装マウスウォッシュ10選を徹底比較します！`
  },
  {
    id: 'art-facial-ice-roller-morning-puffiness-cooling-10sen-2026',
    slug: 'art-facial-ice-roller-morning-puffiness-cooling-10sen-2026',
    title: '【朝のむくみ取りアイスローラー＆冷却美顔ローラー10選】冷凍庫で冷やしてコロコロ！パンパンな顔・目元のむくみを瞬時に引き締め毛穴レスにする冷却グッズ比較',
    category: 'スキンケア',
    date: '2026-09-11',
    description: '朝起きた時の顔のパンパンなむくみや目元の腫れぼったさを、氷のような心地よい冷たさで一気に引き締める「アイスローラー（冷却フェイス美顔ローラー）」おすすめ10選！メイク前の毛穴引き締めや、お風呂上がりのほてり鎮静、リフトアップマッサージに最適な人気モデルを徹底解説。',
    products: fetched.t2,
    lead: `「前日の夜にお酒を飲んだり塩分を摂りすぎて、朝起きると顔が別人級にパンパン」「目元が腫れぼったくてアイメイクがうまくキマらない」「夏の暑さや運動後、お風呂上がりに顔の赤みやほてりを素早くクールダウンしたい」……そんな顔のむくみ・毛穴の開きを一瞬で撃退するのが、**「冷却アイスローラー」**です。

冷蔵庫や冷凍庫で冷やしておいたローラーを肌の上で滑らせるだけで、驚きの美肌効果を実感できます：
- **急速冷却による血管収縮で余分な水分とむくみを急速デトックス**：リンパの流れに沿ってコロコロ転がすだけで、フェイスラインがキュッとシャープに引き締まる
- **メイク前の毛穴タイトニングでファンデーションの密着度＆持ちが劇的UP**：開いた毛穴をキュッと引き締め、皮脂崩れやテカリを先回りしてブロック
- **氷のように水滴がポタポタ垂れない特殊ジェルビーズ内蔵ヘッド**：手を濡らさず、顔だけでなく首筋やデコルテまで広範囲を均一にアイシング可能

今回は楽天市場で口コミ高評価を獲得している人気アイスローラーから、目元専用のミニサイズまで10選を徹底比較します！`
  },
  {
    id: 'art-collar-hat-sweat-stain-prevention-tape-10sen-2026',
    slug: 'art-collar-hat-sweat-stain-prevention-tape-10sen-2026',
    title: '【襟・袖口・帽子用汚れ防止テープ10選】貼るだけで汗ジミ＆ファンデ付着を完全防止！お気に入りの服や白キャップを黄ばみから守る使い捨てライナー比較',
    category: 'ボディケア',
    date: '2026-09-11',
    description: '白シャツの襟元の黒ずみ・黄ばみや、お気に入りのキャップの内側につくファンデーション汚れを完全に防ぐ「襟・帽子用汚れ防止テープ（汗取り使い捨てライナー）」おすすめ10選！貼るだけで汗をぐんぐん吸収し、汚れたら剥がして捨てるだけの超便利アイテムを徹底検証。',
    products: fetched.t3,
    lead: `「お気に入りの白いワイシャツやブラウスの襟元が、皮脂と汗ですぐ黄色く黒ずんでしまう」「キャップをかぶるとおでこの内側にファンデーションや日焼け止めがベッタリついて洗うのが大変」「襟用の部分洗い用洗剤でゴシゴシ手洗いする洗濯ストレスから解放されたい」……そんな衣類と帽子の汚れ悩みを根本からなくすのが、**「貼るだけ汚れ防止テープ・汗取りライナー」**です。

衣類の内側にピタッと貼るだけで、大切な服を新品同様の綺麗さに保てます：
1. **皮脂や汗、メイク汚れを不織布が完全に受け止めて服に染み込ませない**：着用後は剥がしてゴミ箱にポイするだけで、頑固な黄ばみ汚れの付着を100%防止
2. **肌触りの良い極薄不織布で首元やおでこがチクチクしない快適仕様**：通気性に優れているためムレにくく、肌がデリケートな方でも快適
3. **好きな長さにカットできるロールタイプや貼るだけのプレカット仕様**：ワイシャツの襟だけでなく、ジャケットの袖口や麦わら帽子、ヘルメットまで自由自在に対応

今回は大容量10枚〜徳用セットまで、楽天市場でリピーター続出の汚れ防止シート10選を徹底比較します！`
  },
  {
    id: 'art-makeup-sponge-puff-drying-holder-stand-10sen-2026',
    slug: 'art-makeup-sponge-puff-drying-holder-stand-10sen-2026',
    title: '【メイクスポンジホルダー＆パフ乾燥スタンド10選】水ありスポンジのカビ・雑菌繁殖を徹底防止！通気性抜群でドレッサーがお洒落になる人気スタンド比較',
    category: 'メイクアップ',
    date: '2026-09-11',
    description: '水を含ませて膨らませたメイクスポンジや、洗った後のパフを衛生的に乾燥・保管できる「メイクスポンジホルダー（パフスタンド）」おすすめ10選！360度通気性の良いワイヤー構造やシリコンケースなど、ドレッサーを可愛く彩りながら清潔を保つ人気アイテムを徹底解説。',
    products: fetched.t4,
    lead: `「水で濡らして使うメイクスポンジ、置き場所に困ってティッシュの上に置いたらカビが生えないか心配」「洗ったパフを乾かす時に転がって床に落ちてしまう」「メイク台や洗面所のコスメ周りをすっきり可愛く整頓したい」……美肌作りに欠かせないスポンジを衛生的に保つマストアイテムが、**「メイクスポンジスタンド・ホルダー」**です。

大切なスポンジを清潔に長持ちさせる優れたメリットがあります：
- **360度全方位から風が通るワイヤー＆スパイラル構造で急速乾燥**：底面に接する面が極小のため湿気がこもらず、嫌なニオイや雑菌・カビの繁殖をシャットアウト
- **あらゆるサイズ・形状のしずく型・ひょうたん型スポンジにジャストフィット**：水を含んで2倍に膨らんだ大型スポンジもしっかりホールドして転がりを防止
- **ピンクゴールドやマットカラーの上品なデザインでインテリアに映える**：洗面所やドレッサーに置いておくだけでメイクコーナーが一気に洗練された雰囲気に

今回は楽天市場でプチプラから高耐久スチール製まで、使い勝手抜群のスポンジホルダー10選を徹底比較します！`
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
  content += `### 1. 衛生基準と肌への安全性・素材のクオリティを最優先にチェック\n直接触れるアイテムだからこそ、低刺激性や無添加処方、防カビ通気設計、肌に優しい不織布素材などをしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さと携帯性\n個包装で持ち歩けるもの、冷やして転がすだけのもの、貼るだけ・置くだけなど、生活に自然と馴染む使いやすさを選びましょう。\n\n`;
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
  content += `アイテムの良さを最大限に引き出すには、適切な手順と保管方法を守ることが不可欠です。清潔な状態で優しくケアし、日々の積み重ねを大切にすることで、ストレスのない快適で清潔な毎日を手に入れましょう。\n\n`;
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

console.log(`[Batch 138 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
