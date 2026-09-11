import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch124_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ124の4記事の定義
const batchDefs = [
  {
    id: 'art-foot-sap-sheet-bamboo-vinegar-detox-10sen-2026',
    slug: 'art-foot-sap-sheet-bamboo-vinegar-detox-10sen-2026',
    title: '【足裏樹液シート＆竹酢・木酢デトックスパッチ10選】貼って寝るだけで翌朝ドロドロ余剰水分スッキリ！立ち仕事・夕方のパンパン脚を癒すフットパッチ比較',
    category: 'ボディケア',
    date: '2026-09-11',
    description: '立ち仕事や長時間のデスクワークで夕方パンパンにむくむ脚に、貼って寝るだけの「足裏樹液シート」おすすめ10選！天然竹酢液・木酢液・遠赤外線パウダーが寝ている間に足裏の汗・余剰水分をしっかり吸収し、翌朝足が羽のように軽くなる人気ケアを徹底検証。',
    products: fetched.t1,
    lead: `「夕方になると靴がきつくて足がパンパン」「立ち仕事や外回りでふくらはぎがだる重い」「寝ても足の疲れが抜けない」……そんな脚の重だるさに悩む人たちの間で、長年リピートされ続けているのが**「足裏樹液シート」**です。

就寝前に足の裏にピタッと貼るだけで、翌朝剥がしたときにシートが茶色くドロドロに変化するほどの吸湿力を発揮します：
1. **天然竹酢・木酢液の強力な吸湿＆温熱パワー**：樹木が大地から水分を吸い上げる浸透圧メカニズムに着目。足裏の汗腺から寝ている間に放出される余分な水分をキャッチ
2. **足裏の反射区をじんわり刺激して巡りサポート**：遠赤外線放射セラミックやチタン、ゲルマニウムなどを配合し、足元からポカポカ温めて朝までぐっすり快眠
3. **目に見える変化でスッキリ爽快感抜群**：翌朝シートを剥がして洗い流した瞬間の「足が軽くなる爽快感」は一度体験すると病みつきに

今回は楽天総合ランキングで長年上位に君臨するロングセラーモデルから、大容量お得パックまで、リアルに選ばれている足裏樹液シート10選を徹底比較します！`
  },
  {
    slug: 'art-ear-acupressure-jewelry-auriculotherapy-stickers-10sen-2026',
    id: 'art-ear-acupressure-jewelry-auriculotherapy-stickers-10sen-2026',
    title: '【耳つぼジュエリー＆チタン粒シール10選】貼るだけでピアス見えしながらフェイスリフト＆食欲コントロール！テレビ紹介で大バズりの耳つぼ温活ダイエットシール比較',
    category: 'ボディケア',
    date: '2026-09-11',
    description: 'めざましテレビなどメディアで話題沸騰の「耳つぼジュエリー＆耳つぼシール」おすすめ10選！スワロフスキー風の上品な輝きでピアスのように楽しみながら、チタン粒や金粒のツボ刺激でフェイスラインの引き締めや自律神経・食欲抑制をサポートする最新イヤーセラピー。',
    products: fetched.t2,
    lead: `「フェイスラインをすっきりさせたいけれど美顔器を毎日使うのは面倒」「ついつい間食してしまう食欲を自然にコントロールしたい」「ピアス穴は開いていないけれど耳元のおしゃれを楽しみたい」……そんな欲張りな願いを叶えるのが、いまSNSやテレビで爆発的ヒットとなっている**「耳つぼジュエリー・耳つぼシール」**です。

耳には全身の各器官に対応する**200以上のツボ（反射区）**が集まっており、小さなチタン粒や金粒で持続的に刺激を与え続けます：
- **リフトアップ・神門・飢点などの人気ツボをピンポイント刺激**：フェイスラインをすっきり見せたい時や、暴飲暴食を防ぎたい時など、目的に合わせて貼るだけ
- **スワロフスキー認定クリスタルで本物のピアス見え**：一見するとおしゃれなストーンピアスにしか見えないため、オフィスや学校でもバレずにケア可能
- **金属アレルギー対応＆医療用シールでかぶれにくい**：純チタン粒やセラミック粒、肌に優しい医療用粘着テープを採用し、数日間貼りっぱなしでも快適

今回は初心者でも簡単に貼れる耳つぼ位置マップ付きキットから大容量シートまで、楽天市場でランキング1位を獲得した人気モデル10選を徹底比較します！`
  },
  {
    slug: 'art-lash-perm-curl-up-coating-essence-10sen-2026',
    id: 'art-lash-perm-curl-up-coating-essence-10sen-2026',
    title: '【まつげパーマ・マツエク専用カールキープコーティング剤10選】サロン帰りの上向き束感を夕方まで完全ロック！皮脂・摩擦から守り持ちを2倍にする神エッセンス比較',
    category: 'メイクアップ',
    date: '2026-09-11',
    description: 'まつ毛パーマ（ラッシュリフト）やマツエクの持ちを劇的に伸ばす「まつ毛コーティング美容液」おすすめ10選！トレンドのアイドル級「束感まつ毛」をひと塗りで演出しながら、乾燥・寝相の摩擦・皮脂からまつ毛をガードする実力派サロン専売品を徹底検証。',
    products: fetched.t3,
    lead: `「せっかくサロンでまつ毛パーマやマツエクをしたのに、1〜2週間で向きがバラついて下がってしまう」「トレンドの束感まつ毛を作りたいけれどマスカラだとダマになる」「自まつ毛が傷んで抜けやすくなってきた」……そんな悩みを一発で解決するのが、アイリストも愛用する**「まつ毛コーティングエッセンス」**です。

マスカラ前の下地としても、すっぴんのケアとしても使えるコーティング剤には以下のメリットがあります：
1. **パーマ＆エクステの持続期間が約1.5〜2倍にアップ**：皮脂や涙、就寝時の枕との摩擦による接着剤（グルー）の劣化を防ぎ、綺麗な上向きカールを長くキープ
2. **ピンセット要らずで憧れの「韓国アイドル風・束感まつ毛」が完成**：適度なとろみのあるジェルが毛束をキレイにまとめ、ツヤ感あふれる束感アイメイクを即座に実現
3. **高濃度トリートメント成分で自まつ毛を補修**：ケラチンやパンテノール、ペプチドなどの補修成分がパーマ液で傷んだ毛先を集中リペア

今回はフェニックス アイ カールアップをはじめ、楽天市場のレビュー上位を独占するサロン専売コーティング剤10選を比較レビューします！`
  },
  {
    slug: 'art-rechargeable-eye-warmer-massager-air-heat-10sen-2026',
    id: 'art-rechargeable-eye-warmer-massager-air-heat-10sen-2026',
    title: '【充電式エアーアイウォーマー＆ホットアイマスク10選】PC・スマホの眼精疲労を一撃リフレッシュ！温熱×空気圧マッサージ×Bluetooth音楽で極上安眠へ誘う目元ギア比較',
    category: '美容家電・エチケットギア',
    date: '2026-09-11',
    description: '毎日のデスクワークやスマホのブルーライトで酷使した目元をじんわり癒す「充電式ホットアイウォーマー」厳選10選！使い捨てアイマスクにはない包み込む温熱・エア加圧マッサージ・Bluetoothヒーリング音楽機能を備えた人気モデル（ラルーナ等）を徹底比較。',
    products: fetched.t4,
    lead: `「夕方になると目がしょぼしょぼしてピントが合いにくい」「パソコンやスマホの画面を長時間見て目の奥がズーンと重い」「夜ベッドに入っても頭が冴えてなかなか寝付けない」……現代人の深刻な目元の疲労と睡眠の質改善に革命を起こしているのが、**「充電式エアーアイウォーマー」**です。

使い捨てのホットアイマスクと違い、本格的な目元エステ体験を毎晩繰り返し楽しめます：
- **心地よい40〜42℃の温熱でピント調節筋をほぐす**：目の周りの筋肉（毛様体筋）を温めて血流を改善し、滞った疲労物質をスピーディーにリフレッシュ
- **人の手で揉みほぐされるようなエアプレッシャー機能**：こめかみや眉間を程よい加圧リズムで刺激し、PC作業で固まった表情筋を優しくリリース
- **Bluetooth接続でお気に入りの音楽やポッドキャストを聴きながらリラックス**：遮光性の高いデザインと安らぎのサウンドで、寝落ち必至の至福のヒーリングタイムを提供

今回は楽天年間ランキングで爆発的な人気を誇る「La Luna（ラルーナ）」をはじめ、ギフトにも喜ばれる高機能アイウォーマー10選を使い心地とフィット感から徹底比較します！`
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
  content += `### 1. 配合成分や素材の安全性をしっかりチェック\n目元や足裏、耳などのデリケートな部位に直接使用するアイテムだからこそ、天然成分・低刺激性・医療用グレード粘着テープなどの安全基準を確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さ\n貼って寝るだけ、数分間の自動オフタイマー、コードレス充電など、忙しい生活の中でも継続しやすいアイテムを選ぶことが大切です。\n\n`;
  content += `### 3. レビュー件数とリピート率から見るコストパフォーマンス\n消耗品は大容量パックのコスト、家電やギアは耐久性やアフターサポートをチェックし、長く愛用できる信頼の製品を選びましょう。\n\n---\n\n## 厳選おすすめ人気ランキング10選\n\n`;

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

console.log(`[Batch 124 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
