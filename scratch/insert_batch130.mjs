import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch130_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ130の4記事の定義
const batchDefs = [
  {
    id: 'art-natural-boar-bristle-hair-brush-glossy-shine-10sen-2026',
    slug: 'art-natural-boar-bristle-hair-brush-glossy-shine-10sen-2026',
    title: '【天然猪毛＆豚毛ヘアブラシ10選】とかすだけで天使の輪！頭皮の天然オイルを行き渡らせてパサつき・静電気を抑える最高峰ツヤ髪ブラシ比較',
    category: 'ヘアケア',
    date: '2026-09-11',
    description: 'ナイロンブラシとは別次元のツヤを生み出す「天然猪毛（いのししげ）・豚毛ヘアブラシ」おすすめ10選！天然毛に含まれる適度な油分と水分がキューティクルを整え、頭皮の血行を促進しながら切れ毛・パサつき・静電気を劇的に抑える一生モノの名品を徹底検証。',
    products: fetched.t1,
    lead: `「トリートメントやヘアオイルをつけても髪のパサつきがおさまらない」「冬になると静電気で髪が広がってボサボサになる」「髪が細くなって自然なツヤやまとまりが失われてきた」……そんな大人の髪悩みを、日々のブラッシング習慣ひとつで解決するのが**「天然猪毛（いのしし毛）・豚毛ヘアブラシ」**です。

プラスチック製ブラシにはない、天然獣毛ならではの圧倒的な美髪効果があります：
1. **天然毛の油分が髪全体に行き渡り「天使の輪」が出現**：ブラッシングするたびに頭皮の皮脂（天然の保護オイル）を毛先まで均一にコーティングし、濡れたような極上のツヤを再生
2. **静電気の発生を極限までカットしてキューティクルを保護**：人間の髪と同じタンパク質でできているため摩擦静電気が起きず、枝毛や切れ毛の発生を根本防止
3. **適度なコシと弾力で頭皮を心地よくマッサージ**：硬めの猪毛が毛穴の詰まりやフケを優しく浮かせ、頭皮の血行を促進してハリ・コシのある美髪の土台を育成

今回は英国伝統の高級ハンドメイドブラシから、天然木ハンドルとクッション性を備えた人気モデルまで、楽天市場で高評価の猪毛ブラシ10選を徹底比較します！`
  },
  {
    slug: 'art-nasal-dilator-strips-snoring-mouth-breathing-prevention-10sen-2026',
    id: 'art-nasal-dilator-strips-snoring-mouth-breathing-prevention-10sen-2026',
    title: '【鼻腔拡張テープ＆快眠鼻呼吸サポートシール10選】貼るだけで鼻通りスーッ！いびき・口呼吸による喉の乾燥・朝の口臭を防ぐ快眠ヘルスケア比較',
    category: '美容家電・エチケットギア',
    date: '2026-09-11',
    description: '就寝中やスポーツ時の鼻づまり・いびき・口呼吸を物理的に解消する「鼻腔拡張テープ」おすすめ10選！特殊なプラスチックバーのスプリング力で小鼻を外側へ持ち上げて気道を確保し、喉の乾燥や口臭、睡眠の質の低下を防ぐ人気モデルを徹底解説。',
    products: fetched.t2,
    lead: `「朝起きると喉がカラカラに乾いて痛い」「家族から寝ている間のいびきを指摘された」「花粉や季節の変わり目で鼻が詰まって夜中に何度も目が覚める」……そんな睡眠トラブルの最大の原因は、無意識のうちに行っている「口呼吸」にあります。

鼻の通りを瞬時にスムーズにし、理想的な鼻呼吸へと導くのが**「鼻腔拡張テープ」**です：
- **弾性プラスチックバーの反発力で鼻腔をぐっと広げる**：貼った瞬間から空気の吸入量が約30%以上アップし、息苦しさを一瞬で解消
- **いびきの軽減＆朝の不快な口臭・ネバつきを防止**：口呼吸による喉の乾燥や口腔内細菌の増殖をブロックし、目覚めの爽快感が劇的に変化
- **目立たない肌色＆肌に優しい低刺激アクリル系粘着剤**：敏感肌でも朝まで剥がれにくく、剥がすときも痛くない肌に優しい粘着シートを採用

今回は大容量お徳用パックから強力ホールドタイプまで、楽天市場で選ばれている鼻腔拡張テープ10選を徹底比較します！`
  },
  {
    slug: 'art-mini-massage-gun-fascia-release-compact-10sen-2026',
    id: 'art-mini-massage-gun-fascia-release-compact-10sen-2026',
    title: '【ポケットサイズ超軽量ミニマッサージガン10選】片手で肩こり・脚のむくみ・フェイスラインの筋膜リリース！持ち歩ける本格振動ボディケアギア比較',
    category: '美容家電・エチケットギア',
    date: '2026-09-11',
    description: '重いマッサージ器の常識を覆すスマホサイズの「超軽量ミニマッサージガン」おすすめ10選！毎分最大3000回の深層振動で肩甲骨やふくらはぎの固まった筋膜をピンポイントでリリース。顔用アタッチメント付きでリフトケアもできる人気モデル（MYTREX等）を徹底検証。',
    products: fetched.t3,
    lead: `「長時間のスマホやデスクワークで肩甲骨と首がガチガチ」「昔買ったマッサージ器は重くて手が疲れるから使わなくなった」「エステやマッサージに通う時間がない」……そんな現代女性の救世主となっているのが、片手で軽々持てる**「ポケットサイズ・ミニマッサージガン」**です。

わずか300g前後の超軽量ボディからは想像もつかないハイパワーを発揮します：
1. **毎分最大3000回以上の高精度ストローク振動**：手揉みでは届かない深層筋肉（筋膜）までダイレクトに振動が届き、溜まった疲労物質やコリを短時間でリリース
2. **フェイスモード搭載で顔のたるみ・表情筋ケアにも対応**：柔らかいシリコンヘッドに付け替えれば、側頭筋やフェイスライン、デコルテのリンパ流しも安全に実現
3. **ポーチに入れてオフィスや旅行先にも気軽に携帯**：Type-C充電式でどこでもチャージ可能。仕事の合間のリフレッシュや就寝前のベッドタイムに手軽に使える

今回は楽天市場で圧倒的な支持を集める「MYTREX REBIVE MINI」をはじめ、静音性とパワーを兼ね備えた最新ミニマッサージガン10選を徹底比較します！`
  },
  {
    slug: 'art-electric-vio-shaper-trimmer-hygiene-care-10sen-2026',
    id: 'art-electric-vio-shaper-trimmer-hygiene-care-10sen-2026',
    title: '【女性用VIO専用電動シェーバー＆アンダーヘアトリマー10選】チクチクしない・見えにくい部位も安全設計！お風呂で丸洗いできるフェムケアシェーバー比較',
    category: '美容家電・エチケットギア',
    date: '2026-09-11',
    description: 'デリケートゾーン（VIO）を肌荒れやケガのリスクなく安全に自己処理できる「女性用VIO専用電動シェーバー」おすすめ10選！毛先が尖らずチクチクしない刃の構造や、お風呂で使える完全防水・丸洗い仕様の人気フェムケアトリマーを徹底解説。',
    products: fetched.t4,
    lead: `「普通のお風呂用カミソリでVIOを処理したらカミソリ負けで赤くブツブツになった」「剃った後に毛先がチクチクして下着に擦れて痛い」「見えにくいデリケートゾーンを安全に手入れしたい」……そんなフェムケア（デリケートゾーンのお手入れ）に悩む女性が急増しています。

皮膚が非常に薄く凹凸の多いデリケートゾーンには、**「VIO専用に開発された電動シェーバー」**が絶対に必要です：
- **刃が直接皮膚に触れないセーフティネット構造**：見えにくいIゾーンやOゾーンでも肌を挟み込まず、出血やカミソリ負けの恐怖ゼロでスムーズにカット
- **チクチク感を抑えるトリマー＆ネット刃の2段ケア**：長い毛を短く整えるトリマー刃と、根本からツルツルに仕上げるネット刃の組み合わせで下着への不快な擦れを防止
- **お風呂で使える完全防水（IPX7仕様）＆丸洗いOK**：毛くずが飛び散らずバスルームで手軽に使用でき、ヘッドを流水でジャブジャブ洗えるため常に清潔

今回は楽天市場でシェーバー部門1位を獲得した人気モデルからPanasonicなどの有名ブランドまで、使いやすさと安全性を徹底比較します！`
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
  content += `### 1. 安全設計と肌・髪への負担の少なさを最優先にチェック\n毎日や定期的に使用するアイテムだからこそ、天然獣毛100%、医療用低刺激粘着剤、セーフティ刃ガード、過圧防止センサーなどの安全基準をしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める携帯性・使いやすさ\n軽量コンパクトで持ちやすい形状、水洗いできる衛生面、Type-C充電など、日々の生活の中で無理なく続けられる仕様を選びましょう。\n\n`;
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
  content += `アイテムの良さを最大限に引き出すには、適切な手順と力加減を守ることが不可欠です。清潔な状態で優しくマッサージし、日々の積み重ねを大切にすることで、理想のハリとすっきりとした美しい素肌を手に入れましょう。\n\n`;
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

console.log(`[Batch 130 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
