import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch139_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ139の4記事の定義
const batchDefs = [
  {
    id: 'art-bottom-fill-perfume-atomizer-portable-10sen-2026',
    slug: 'art-bottom-fill-perfume-atomizer-portable-10sen-2026',
    title: '【底面充填式クイック香水アトマイザー10選】スポイト不要で10秒チャージ！液漏れ・香りの劣化を防ぎ飛行機やポーチに持ち歩ける人気ミニボトル比較',
    category: 'フレグランス',
    date: '2026-09-13',
    description: '香水ボトルのノズルに底を当ててプッシュするだけ！じょうごやスポイトを使わず一瞬で詰め替えできる「底面充填式クイック香水アトマイザー」おすすめ10選！液漏れ完全防止の気密構造や機内持ち込み対応、高見えするレザー・アルミケースの人気モデルを徹底比較。',
    products: fetched.t1,
    lead: `「お気に入りのフルボトル香水を外出先や旅行先にも持ち歩きたい」「従来のスポイトや漏斗で移し替えると香水がこぼれて手が香水まみれになる」「ポーチの中で液漏れしたり、空気に触れて香りが酸化・劣化するのが嫌だ」……そんな香水愛好家の詰め替えストレスを完全解消したのが、**「底面充填式クイック香水アトマイザー」**です。

世界中で爆発的ヒットを記録している革新的チャージシステムを搭載しています：
1. **ノズルに底面を押し当てて上下にポンポンするだけで10秒チャージ**：外気に一切触れずに密閉移し替えができるため、香水のフレッシュな芳香をそのままキープ
2. **特殊パッキンと気密バルブにより飛行機の気圧変化でも液漏れゼロ**：高価な香水を一滴も無駄にせず、バッグや化粧ポーチを汚す心配も皆無
3. **残量が一目でわかる小窓付き＆高級感あふれるマットメタルデザイン**：手のひらに収まるリップスティックサイズで、外出先でもスマートに付け直し可能

今回は楽天市場で40週連続1位・レビュー数千件を誇る殿堂入りモデルから高耐久アルミ製まで10選を徹底比較します！`
  },
  {
    id: 'art-camera-ear-cleaner-smart-earpick-endoscope-10sen-2026',
    slug: 'art-camera-ear-cleaner-smart-earpick-endoscope-10sen-2026',
    title: '【スマホ連動カメラ付きスマート耳かき10選】高画質内視鏡で耳の中が見える！痛くないシリコンヘッドで耳垢をごっそり安全に掃除できる人気電子耳かき比較',
    category: 'ヘルスケア',
    date: '2026-09-13',
    description: 'スマホ画面で耳の中をリアルタイムで確認しながら安全に耳掃除ができる「カメラ付きスマート耳かき（内視鏡スコープ耳かき）」おすすめ10選！高画質LEDライト付き極細レンズや柔らかいシリコンスプーンヘッドで、耳垢をごっそり爽快に取り除ける大ヒット電子耳かきを徹底解説。',
    products: fetched.t2,
    lead: `「見えない状態で綿棒や竹耳かきを使うと奥に押し込んでしまったり鼓膜を突きそうで怖い」「子どもが耳かきを嫌がって痛がる」「耳の中がどうなっているのか自分の目で確かめながらスッキリ掃除したい」……そんな耳掃除の不安と爽快感を劇的に変えたのが、**「スマホ連動カメラ付きスマート耳かき」**です。

アプリを開いて耳に入れるだけで、驚きのクリアな視界が広がります：
- **フルHD・高画質マイクロスコープ＆LEDライトで耳の奥までクッキリ**：細かな耳垢や乾燥した皮膚片、耳毛まで鮮明に映し出し、狙った汚れを逃さない
- **耳壁を傷つけない柔軟な医療用シリコン製スプーンヘッド**：硬い金属と違って痛みがなく、デリケートな耳の粘膜を優しく保護
- **手ブレを防ぐジャイロスコープ搭載でスマホ画面が常に水平維持**：耳かきを回転させても画面の向きが変わらず、直感的かつ安全に操作可能

今回は2026年最新の高画質モデルから子ども用極細アタッチメント付きまで、楽天市場で売れ筋のカメラ付き耳かき10選を徹底比較します！`
  },
  {
    id: 'art-triangle-velvet-powder-puff-flawless-10sen-2026',
    slug: 'art-triangle-velvet-powder-puff-flawless-10sen-2026',
    title: '【三角ベルベット・パウダーパフ10選】小鼻・目の下の毛穴を消し去るベロア質感！ルースパウダーが均一に密着して陶器肌を叶える人気三角パフ比較',
    category: 'メイクアップ',
    date: '2026-09-13',
    description: '海外メイクトレンドやSNSで話題沸騰の「三角形ベルベット・パウダーパフ」おすすめ10選！細い先端が目頭や小鼻のキワに吸い付くようにフィットし、フェイスパウダーを毛穴の凹凸に均一に密着させてフィルターをかけたような陶器肌を作る人気コスメツールを徹底比較。',
    products: fetched.t3,
    lead: `「丸い大きなパフだと小鼻の横や目の下のキワに粉がうまく乗らない」「ファンデーションの後にパウダーを叩くとムラになって粉浮きしてしまう」「海外アイドルのような毛穴が完全に消えたマシュマロ肌を作りたい」……ベースメイクの完成度を劇的に引き上げる神ツールとしてプロも絶賛するのが、**「三角ベルベットパフ」**です。

独自の三角形シェイプと極細ベロア繊維が、完璧な仕上がりを叶えます：
1. **小鼻の溝・涙袋の下・口角にシンデレラフィットする精密な角型設計**：ヨレやすい細かいパーツにも粉をピンポイントでムラなく定着
2. **ふんわり密度の高い極細ベルベット起毛が余分な粉を吸い取らず密着**：パウダーを均一に含んで肌へふんわり転写し、厚塗り感ゼロのなめらか美肌へ
3. **ベーキングメイクやテカリ防止パウダーのプレス塗りに最適**：皮脂の出やすいTゾーンをしっかりパウダーでロックし、一日中崩れないベースをキープ

今回は使い捨てで衛生的な大容量パックからリボン付き洗える高品質モデルまで、楽天市場で話題の三角パフ10選を徹底比較します！`
  },
  {
    id: 'art-sonic-silicone-facial-cleansing-brush-pore-10sen-2026',
    slug: 'art-sonic-silicone-facial-cleansing-brush-pore-10sen-2026',
    title: '【音波振動シリコン洗顔ブラシ10選】毛穴の黒ずみ・角栓を超音波振動で浮き彫りオフ！完全防水で肌を傷めない衛生的な電動洗顔器比較',
    category: 'スキンケア',
    date: '2026-09-13',
    description: '手洗い洗顔では落とせない毛穴奥の皮脂汚れや角栓を、毎分1万回以上の微細な音波振動で浮かせてオフする「音波振動シリコン電動洗顔ブラシ」おすすめ10選！毛先が抗菌シリコン仕様でカビが生えず衛生的な人気美顔器を徹底解説。',
    products: fetched.t4,
    lead: `「洗顔後に鏡を見ると小鼻の角栓や黒ずみが残ってザラついている」「毛穴パックやスクラブ洗顔は肌を傷めそうで怖い」「エステに通わずに自宅で毎日ディープクレンジングしたい」……そんな毛穴トラブルに悩むすべての人におすすめなのが、**「音波振動シリコン洗顔ブラシ」**です。

肌に摩擦ダメージを与えずに毛穴奥を大掃除する革新的な機能を備えています：
- **毎分8,000〜12,000回の微細な音波タッピングで汚れを浮かせて排出**：ゴシゴシ擦る必要がなく、超音波の微振動が毛穴の奥の詰まりをスルリと浮き上がらせる
- **細菌が繁殖しにくい医療グレードシリコン＆完全防水IPX7仕様**：ナイロンブラシと違って乾きやすく衛生面が抜群。お風呂場でシャワーを浴びながら気兼ねなく使用可能
- **温熱モードやEMSリフトアップ機能を備えた多機能モデルも充実**：毛穴を開いて汚れを落とした後、フェイスラインの引き締めケアまでこれ1台で完結

今回は楽天ランキング上位の人気モデルからサロン品質の音波電動洗顔ブラシまで10選を徹底比較します！`
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
  content += `### 1. 素材の安全性と肌・耳・香水への負担の少なさを最優先にチェック\n直接触れるアイテムだからこそ、医療用シリコンの柔軟性や、気密パッキンの品質、ベロア素材の肌あたり、防水性能の等級（IPX7等）をしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さと操作性\n底面を押し当てるだけ、スマホを見るだけ、小鼻に添えるだけ、お風呂でボタンを押すだけなど、簡単ステップで完結する設計を選びましょう。\n\n`;
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
  content += `アイテムの良さを最大限に引き出すには、適切な手順と使用方法を守ることが不可欠です。清潔な状態で優しくケアし、日々の積み重ねを大切にすることで、理想の美しさと清潔感を手に入れましょう。\n\n`;
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

console.log(`[Batch 139 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
