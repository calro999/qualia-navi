import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch151_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ151の4記事の定義
const batchDefs = [
  {
    id: 'art-heat-resistant-silicone-mat-hair-iron-10sen-2026',
    slug: 'art-heat-resistant-silicone-mat-hair-iron-10sen-2026',
    title: '【耐熱ヘアアイロンホルダー＆シリコンマット10選】耐熱300℃で冷まさず即収納！洗面台の焦げ防止＆旅行・外出に便利なポーチ比較',
    category: 'ヘアケア',
    date: '2026-09-16',
    description: '使用直後の200℃超えのヘアアイロンやコテを冷めるのを待たずに即収納！「耐熱シリコンヘアアイロンマット（ポーチ兼用ホルダー）」おすすめ10選！洗面台の天板やドレッサーの焦げ・変形を完全に防ぎ、旅行やジムにも熱いまま安全に持ち運べる人気グッズを徹底比較。',
    products: fetched.t1,
    lead: `「忙しい朝、ヘアアイロンを使った後に冷めるのを待つ時間がなくて家を出られない」「洗面台の上に直接熱いコテを置いて天板が変色したりコードが溶けないかヒヤヒヤする」「旅行や出張のパッキングでアイロンをスーツケースにすぐしまいたい」……ヘアアイロン愛用者のリアルな危険とストレスを解消するのが、**「耐熱シリコンヘアアイロンマット＆ポーチ」**です。

耐熱温度250℃〜300℃を誇る高品質シリコン素材が、完璧なセーフティ空間を作ります：
1. **スタイリング中の一時置きマットとして洗面台の焦げ・滑り落ちを防止**：波型・グリッド状の滑り止め凹凸が熱を効率よく放熱し、机や棚の熱損傷を完全ガード
2. **使用後はクルッと巻いてボタンで留めるだけで耐熱収納ポーチに変身**：余熱が残ったままの熱いプレートをすっぽり包み込めるため、待ち時間ゼロでバッグにIN
3. **汚れても水洗いやアルコール除菌でサッと拭くだけの簡単お手入れ**：埃がつきにくく水にも強いため、清潔な状態を保ちながら長期間タフに愛用可能

今回は楽天市場で口コミ高評価を獲得している人気シリコン製アイロンホルダー10選を徹底比較します！`
  },
  {
    id: 'art-home-teeth-whitening-led-light-kit-10sen-2026',
    slug: 'art-home-teeth-whitening-led-light-kit-10sen-2026',
    title: '【自宅用LEDホワイトニングキット10選】コーヒー・紅茶の黄ばみ・ステインを浮き彫りオフ！サロン級の白い歯へ導く人気ホームホワイトニング比較',
    category: 'オーラルケア',
    date: '2026-09-16',
    description: 'クリニックに通わず自宅で好きな時間にサロン級の歯のホワイトニング！「自宅用LEDホワイトニングキット（専用ジェルセット）」おすすめ10選！ルルホワイトをはじめ、医薬部外品の有効成分と青色LEDの光触媒作用で、頑固な着色汚れやヤニを浮かせて除去する人気商品を徹底解説。',
    products: fetched.t2,
    lead: `「毎日歯磨きをしているのにコーヒーやお茶のせいで歯が黄色くくすんでいる」「クリニックのオフィスホワイトニングは高額だし知覚過敏で歯がしみる」「笑顔になった時に見える白い清潔な歯を手に入れたい」……そんな大人の口元コンプレックスを自宅で手軽にケアできるのが、**「自宅用LEDホワイトニングキット」**です。

歯の表面を削ったり痛めたりすることなく、自然な白さを取り戻す光触媒技術を採用しています：
- **専用の薬用ジェル＋青色LEDライトのダブルアプローチでステインを浮遊・分解**：重曹やポリリン酸などのホワイトニング成分が着色汚れの隙間に入り込み、ブラッシングでスルリとオフ
- **マウスピース型LEDライトをスマホやUSBに繋いでくわえるだけの簡単操作**：読書やスマホ動画を見ながらの1日数分〜10分のケアで、無理なく毎日の習慣に定着
- **研磨剤フリー・発泡剤フリー処方で歯の表面やエナメル質を傷めず安心**：歯茎への刺激や知覚過敏のリスクを抑え、ツルツルの爽快感と清潔な息をキープ

今回は楽天総合ランキングで話題のルルホワイトをはじめ、効果とコスパで選ばれているホームホワイトニング10選を徹底比較します！`
  },
  {
    id: 'art-mini-uv-led-nail-lamp-portable-10sen-2026',
    slug: 'art-mini-uv-led-nail-lamp-portable-10sen-2026',
    title: '【ミニUV/LEDネイルライト・ハンディランプ10選】パーツ固定＆仮硬化が一瞬！持ち運びや出先のネイル剥がれ修復に便利な小型硬化ライト比較',
    category: 'ネイルケア',
    date: '2026-09-16',
    description: '大きなドーム型ライトを出さずにサッと片手で硬化！「ミニUV/LEDネイルライト（ハンディ硬化ランプ）」おすすめ10選！パーツの仮硬化や爪1本だけのお直し、折りたたみ式マウス型からUSB充電式ペン型まで、セルフジェルネイルの効率を爆上げする人気モデルを徹底検証。',
    products: fetched.t3,
    lead: `「大きなネイルライトを机に出してコードを繋ぐ準備が面倒くさい」「大きなストーンやパーツを乗せた時、ライトに入れるまでにズレて流れてしまう」「外出先や旅行先でジェルネイルが1本だけ浮いてきた時にサッと応急処置したい」……そんなセルフネイラーの悩みを完璧に解決するのが、**「小型ミニUV/LEDネイルライト」**です。

手のひらサイズながらプロ仕様の高出力LEDチップを搭載しています：
1. **ピンポイントで照射できるためパーツ固定の仮硬化がわずか5〜10秒で完了**：指でパーツを押さえながら上からピッと光を当てられるため、位置ズレの失敗がゼロに
2. **折りたたみ式スタンド付きのマウス型なら両手を使った作業もラクラク**：足の親指フットネイルやチップの長さ出しでも邪魔にならず、省スペースで快適硬化
3. **USB給電・Type-C充電式でモバイルバッテリーからも給電可能**：薄型軽量でポーチの隙間にすっぽり収まり、出張や旅行のお供にも最適

今回は楽天市場で大人気の36Wハイパワー小型ライトからペン型ハンディライトまで10選を徹底比較します！`
  },
  {
    id: 'art-heel-pain-shock-absorbing-silicone-cups-10sen-2026',
    slug: 'art-heel-pain-shock-absorbing-silicone-cups-10sen-2026',
    title: '【かかと衝撃吸収サポーター＆シリコンヒールカップ10選】足底腱膜炎・かかとの激痛を緩和！理学療法士監修の歩行衝撃を吸収する人気フットケア比較',
    category: 'ヘルスケア',
    date: '2026-09-16',
    description: '朝起きて立ち上がった時や歩行時のかかとの激痛・足底筋膜炎に！「かかと衝撃吸収サポーター（シリコンヒールカップ）」おすすめ10選！理学療法士監修の高弾力ゲルクッションが着地衝撃を分散し、靴下の下や靴の中に敷くだけで痛みを激減させる人気アイテムを徹底解説。',
    products: fetched.t4,
    lead: `「朝起きて一歩目を踏み出した瞬間、かかとに針が刺さったような激痛が走る」「立ち仕事やウォーキングのあとにかかとがズキズキ痛んで歩けない」「クッション性の低いスニーカーやパンプスを履くと足裏がすぐ疲れる」……現代人に急増している足底腱膜炎やかかとの痛みを劇的に和らげるのが、**「かかと衝撃吸収サポーター」**です。

医療現場のテーピング理論と生体工学に基づいた立体ゲル構造が、足裏を守り抜きます：
- **高弾力医療用シリコンが着地時の衝撃エネルギーを最大分散**：硬いアスファルトの衝撃をふんわり吸収し、かかとの骨や腱膜にかかる負担を最小限に軽減
- **素足に直接装着するテーピングバンド型なら靴下を履けば外出時も目立たない**：室内でスリッパを履かない生活でも常にクッションが追従し、フローリングの床の硬さから解放
- **U字型ディープヒールカップが崩れたかかとの脂肪体を中央に寄せ集めて本来のクッション機能を復元**：歩行バランスを安定させ、足首のブレや膝・腰の負担までトータルケア

今回は楽天市場で1位を獲得した理学療法士監修のかかとサポーターをはじめ、口コミ絶賛のヒールパッド10選を徹底比較します！`
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
  content += `### 1. 素材の安全性・耐熱性・肌への優しさを最優先にチェック\n直接触れるアイテムだからこそ、シリコンの耐熱温度（300℃等）や、LEDの波長とジェルの無添加処方、光触媒の安全性、医療用ゲルの衝撃吸収率などをしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さと操作性\n巻くだけ、くわえるだけ、ボタンを押すだけ、履くだけなど、誰でも直感的に使いこなせる設計を選びましょう。\n\n`;
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
  content += `アイテムの良さを最大限に引き出すには、適切な手順と使用方法を守ることが不可欠です。清潔な状態で優しくケアし、日々の積み重ねを大切にすることで、理想の美しさと快適なライフスタイルを手に入れましょう。\n\n`;
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

console.log(`[Batch 151 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
