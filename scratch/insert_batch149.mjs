import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch149_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ149の4記事の定義
const batchDefs = [
  {
    id: 'art-extendable-bathtub-caddy-tray-rack-10sen-2026',
    slug: 'art-extendable-bathtub-caddy-tray-rack-10sen-2026',
    title: '【伸縮式バスタブラック＆お風呂テーブル10選】スマホ・タブレット・半身浴ドリンク置きに！水切り抜群でカビにくい人気バスタブトレー比較',
    category: 'バスグッズ',
    date: '2026-09-15',
    description: 'どんな浴槽の幅にもジャストフィット！スマホやiPad、読書本、アロマキャンドル、水分補給ボトルを安全に置ける「伸縮式バスタブラック（お風呂用テーブルトレー）」おすすめ10選！山崎実業towerのマグネット・伸縮トレーから、水切りスリット付き人気アイテムを徹底比較。',
    products: fetched.t1,
    lead: `「半身浴中にスマホやタブレットで映画を見たいけれど、湯船に落としそうで怖い」「入浴中の水分補給用ペットボトルやスキンケアグッズを置く場所がない」「お風呂時間を贅沢なプライベートスパに変えてリラックスしたい」……そんなバスタイムの快適性を極限まで高めるのが、**「伸縮式バスタブラック（バスタブトレー）」**です。

バスタブの両端にサッと渡すだけで、理想のお風呂テーブルが完成します：
1. **スライド式でどんな幅の浴槽にもぴったりフィットする伸縮アジャスター**：50cm〜80cm前後までスムーズに調整でき、賃貸住宅の一般的なユニットバスから広めの浴槽まで幅広く対応
2. **水が溜まらず速乾性に優れた通気・水切りスリット構造**：底面に水滴が溜まらないためカビやヌメリの発生を防ぎ、シャワーで流すだけで常に清潔キープ
3. **タブレットスタンドやワイングラスホルダー、小物ポケットを完備**：入浴中の動画鑑賞や読書、フェイスマッサージツールの置き場に困らず、手ぶらで至福のバスタイムを満喫

今回は山崎実業towerシリーズをはじめ、楽天市場で口コミ絶賛のバスタブラック10選を徹底比較します！`
  },
  {
    id: 'art-scalp-massage-tonic-roller-ball-10sen-2026',
    slug: 'art-scalp-massage-tonic-roller-ball-10sen-2026',
    title: '【ロールオン式頭皮マッサージブラシ＆スカルプエッセンス10選】金属ボールで直接ツボ押し！手を汚さず育毛美容液を毛根へ届ける人気頭皮ケア比較',
    category: 'ヘアケア',
    date: '2026-09-15',
    description: '手を汚さずに頭皮の気になる分け目やつむじへダイレクトに薬用育毛エッセンスを塗布！「ロールオン式スカルプアプリケーター（頭皮マッサージローラー）」おすすめ10選！ひんやり心地よい金属ボールが頭皮のコリをほぐし、血行促進と抜け毛予防を同時に叶える人気ギアを徹底解説。',
    products: fetched.t2,
    lead: `「頭皮用の育毛剤やローションをスプレーすると顔に垂れてきたり髪についてベタつく」「手のひらで頭皮を揉むと手がベタベタになって毎日のケアが億劫」「PC作業のせいで頭頂部や側頭部がガチガチに凝り固まって重い」……そんな頭皮ケアのストレスをゼロにする画期的アイテムが、**「ロールオン式頭皮マッサージローラー（スカルプアプリケーター）」**です。

頭皮に押し当てて転がすだけで、プロのヘッドスパのような刺激と浸透力を発揮します：
- **回転するステンレスローラーボールが頭皮をほぐしながら美容液を均一吐出**：液だれせずに毛根の根元へダイレクトに届き、高価な育毛エッセンスを一滴も無駄にしない
- **ひんやりとした金属の冷感タッチが頭皮のほてりを鎮静しツボを刺激**：百会や風池などのツボを心地よい圧で刺激し、眼精疲労や首コリまでスッキリ爽快
- **好きな育毛ローションやヘアトニックを詰め替えられるタンク式も充実**：分解して水洗いできるため衛生面も完璧で、朝晩のルーティンに無理なく組み込み可能

今回は楽天市場で大人気のスカルプアプリケーターから話題のヘッドマッサージローラー10選を徹底比較します！`
  },
  {
    id: 'art-sponge-nail-buffer-block-4way-10sen-2026',
    slug: 'art-sponge-nail-buffer-block-4way-10sen-2026',
    title: '【爪磨き4WAYブロック＆高弾力ネイルバッファー10選】爪の縦ジワ・凹凸を補正してサロン級の濡れツヤ！トップコート不要で輝く人気爪やすり比較',
    category: 'ネイルケア',
    date: '2026-09-15',
    description: '爪の表面の縦すじ・ガタつき・黄ばみを4ステップで消し去り、マニキュアを塗ったかのような自然なツヤを自爪に宿す「4面ブロックバッファー（高弾力スポンジ爪磨き）」おすすめ10選！仕事でネイルができない方やメンズケア、ジェルネイル前のサンディングに最適な人気アイテムを徹底検証。',
    products: fetched.t3,
    lead: `「加齢とともに爪の表面に深い縦じわや筋が入って老けて見える」「仕事柄ネイルポリッシュやジェルが塗れないけれど指先を清潔に美しく見せたい」「金属のヤスリだと削れすぎて爪が薄くペラペラになってしまうのが心配」……そんな自爪の悩みをたった数分でピカピカに生まれ変わらせるのが、**「4WAYブロックネイルバッファー」**です。

目の粗さが異なる4つの面を順番に使うだけで、感動のガラスのような輝きが生まれます：
1. **ステップ1＆2で表面の凹凸や爪の形を優しく均一にスムージング**：高弾力スポンジが爪のカーブに柔軟に沿うため、削りすぎずに滑らかなフラット面に補正
2. **ステップ3＆4の超極細バッファー面でキュッキュッと磨くだけで圧倒的ツヤ出し**：摩擦熱で爪表面の天然成分がなめらかに密閉され、透明マニキュアを塗ったようなピカピカの光沢へ
3. **厚みのあるブロック形状で握りやすく利き手と逆の手でも力加減が簡単**：指先に負担をかけず、1個で何十回も繰り返し使えてコスパも最強

今回はネイルサロン愛用の本格4面ブロックからお得な複数個セットまで、楽天市場で売れ筋の爪磨きバッファー10選を徹底比較します！`
  },
  {
    id: 'art-back-hair-shaver-extendable-handle-10sen-2026',
    slug: 'art-back-hair-shaver-extendable-handle-10sen-2026',
    title: '【背中用ロングボディシェーバー10選】手が届かない背中のムダ毛・産毛を一人で安全シェービング！折りたたみ伸縮ハンドル付き人気ボディカミソリ比較',
    category: 'ボディケア',
    date: '2026-09-15',
    description: '誰にも頼めない背中や肩甲骨のムダ毛処理を一人で完璧に！「背中専用ロングボディシェーバー（折りたたみ伸縮カミソリ）」おすすめ10選！脱毛前の自己処理やドレス・水着を着る前のエチケットとして、肌を傷つけずに広範囲をスピーディーに剃れる人気アイテムを徹底解説。',
    products: fetched.t4,
    lead: `「脱毛サロンに行く前に背中の毛を自分で剃ってきてと言われたけれど手が届かない」「夏場やドレスを着る時に背中の開いた服を着たいのに産毛や濃い毛が恥ずかしい」「家族やパートナーに背中のムダ毛処理を頼むのは気まずい」……そんな自分では見えない背中の毛の悩みを1人で解決するのが、**「背中用ロングボディシェーバー」**です。

孫の手のように背中全体へラクラク届く革新的デザインを採用しています：
- **最大40〜50cm前後まで伸びるロング伸縮ハンドルで背中の中心・肩甲骨までカバー**：無理な姿勢で身体をひねることなく、自然な角度で背中全体を軽くなぞるだけで除毛完了
- **横滑りしても肌を切らない安全ガード付きワイド刃を採用**：見えない背中を剃っても皮膚を切り裂くリスクがなく、シェービングフォームなしのドライ剃りにも対応
- **折りたたみ式でコンパクトに収納でき旅行やジムにもスマートに携帯可能**：水洗い可能な完全防水仕様でお風呂場でのセルフケアも安心

今回は脱毛器ケノン等の同時購入で大ヒットしている人気モデルから電動背中シェーバーまで10選を徹底比較します！`
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
  content += `### 1. 素材の安全性と耐久性・肌への優しさを最優先にチェック\n直接触れるアイテムだからこそ、防水性や耐荷重、ボール部分の滑らかさ、スポンジの密度、刃先のセーフティガードの構造などをしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さと操作性\n置くだけ、転がすだけ、磨くだけ、柄を伸ばすだけなど、誰でも直感的に使いこなせる設計を選びましょう。\n\n`;
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
  content += `アイテムの良さを最大限に引き出すには、適切な手順と力加減を守ることが不可欠です。清潔な状態で優しくケアし、日々の積み重ねを大切にすることで、理想の美しさと快適な毎日を手に入れましょう。\n\n`;
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

console.log(`[Batch 149 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
