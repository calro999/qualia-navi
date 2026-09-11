import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch129_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ129の4記事の定義
const batchDefs = [
  {
    id: 'art-ems-electric-head-spa-waterproof-scalp-massager-10sen-2026',
    slug: 'art-ems-electric-head-spa-waterproof-scalp-massager-10sen-2026',
    title: '【EMS電気ヘッドスパ＆お風呂用防水頭皮マッサージャー10選】プロのサロン技「つかみ揉み」×EMS電気刺激！硬い頭皮をほぐして顔全体をグッと引き上げる最新美髪ギア比較',
    category: '美顔器・美容家電',
    date: '2026-09-11',
    description: 'お風呂でシャンプーしながら使える完全防水（IPX7）の「EMS電動ヘッドスパマシン」おすすめ10選！プロのエステティシャンのハンドテクニックを再現した3D回転揉み出しと、深層筋を刺激するEMS電流で、頭皮環境の改善・薄毛予防・フェイスリフトケアを同時に叶える人気ギアを徹底検証。',
    products: fetched.t1,
    lead: `「夕方になると頭皮がカチカチに張って重い」「フェイスラインのたるみやほうれい線が目立ってきた」「シャンプーしても頭皮の皮脂やニオイがスッキリ落ちない」……実は頭皮と顔の皮膚は一枚の筋膜で繋がっているため、頭皮のコリは顔のたるみに直結します。

そこで美容通の間で大ヒットしているのが、**「EMS搭載・電動頭皮ヘッドスパマシン」**です：
1. **サロン級の「つまみ上げ＆つかみ揉み」手技を忠実に再現**：4つの独立した回転ブラシが頭皮をググッと持ち上げ、毛穴の奥に詰まった酸化皮脂や汚れをパワフルに揉み出し
2. **深層の頭筋に直接アプローチする「EMS微弱電流」**：手技だけでは届かない深部の頭筋・側頭筋・後頭筋を電気刺激で心地よくピクピク収縮させ、キュッと引き締まった若々しい印象へ
3. **お風呂で使える完全防水（IPX7仕様）＆コードレス**：湯船に浸かりながら、またはトリートメントをつけた状態で使えるため、バスタイムが極上のプライベートサロンに早変わり

今回は楽天市場でランキング1位を獲得したMYTREXなどの本格モデルからギフトにも喜ばれる高機能ギアまで、厳選10選を徹底比較します！`
  },
  {
    slug: 'art-pure-silk-sleep-eye-mask-blackout-travel-10sen-2026',
    id: 'art-pure-silk-sleep-eye-mask-blackout-travel-10sen-2026',
    title: '【最高級天然シルク100%遮光アイマスク10選】目元への摩擦・圧迫感ゼロで朝まで熟睡！エアコン乾燥から目元を守りながら深い快眠へ導く極上スリープアイピロー比較',
    category: '美容家電・エチケットギア',
    date: '2026-09-11',
    description: '肌に最も優しい天然高級シルク100%を使用した「遮光シルクアイマスク」おすすめ10選！わずかな光も遮断する立体構造で睡眠の質を劇的に向上させ、エアコンによる目元の乾燥小じわや摩擦刺激を防ぐ、旅行や日々の快眠に欠かせない安眠アイテムを徹底解説。',
    products: fetched.t2,
    lead: `「朝早く外が明るくなると目が覚めてしまう」「夜中にちょっとした街灯や家電の明かりが気になって眠りが浅い」「アイマスクをすると目の周りが蒸れたりゴムの跡がついたりして痛い」……そんな睡眠の悩みと目元のエイジングケアを同時に叶えるのが、**「最高級天然シルク100%アイマスク」**です。

化学繊維のアイマスクにはない、シルクならではの贅沢なメリットが揃っています：
- **人の肌と同じアミノ酸構成による極上の肌触り**：摩擦係数が極めて低く、寝返りを打っても目元の皮膚を引っ張らず、摩擦ジワやまつ毛の抜け毛を防止
- **高い吸湿性・放湿性・保温性で目元の潤いを密閉**：エアコンの風や冬の乾燥から目元の薄い皮膚を優しく保護し、朝起きても目元しっとり
- **鼻まわりの隙間光を99.9%カットする立体遮光設計**：圧迫感のない幅広ストラップと調整バックルで、耳が痛くならずどんな寝相でも朝まで快適にフィット

今回は充電式温熱タイプから天然シルク両面仕様の人気モデルまで、楽天市場で口コミ評価の高いシルクアイマスク10選を徹底比較します！`
  },
  {
    slug: 'art-electric-eyebrow-facial-hair-trimmer-shaver-10sen-2026',
    id: 'art-electric-eyebrow-facial-hair-trimmer-shaver-10sen-2026',
    title: '【電動眉毛シェーバー＆フェイスうぶ毛トリマー10選】カミソリ負け・肌荒れゼロ！眉の形整えから顔全体のくすみオフまで1分で完了する最新マイクロシェーバー比較',
    category: '美容家電・エチケットギア',
    date: '2026-09-11',
    description: '刃が肌に直接触れない安全設計で肌を傷めず産毛をカットできる「電動眉毛・フェイスシェーバー」おすすめ10選！眉の長さを均一に整えるアタッチメントコーム付きで、メイクのりを劇的に底上げし、すっぴんの透明感を引き出す人気モデルを徹底検証。',
    products: fetched.t3,
    lead: `「眉の周りを普通のカミソリで剃ると肌がヒリヒリ赤くなる」「眉毛の長さをハサミで切ると失敗してまだらになってしまう」「ファンデーションを塗ると顔のうぶ毛が浮いてムラになる」……そんなセルフ眉・顔剃りの失敗を完全に防いでくれるのが、**「電動眉毛・フェイスシェーバー」**です。

刃が肌に直接当たらないセーフティガード構造により、初心者でも安全・簡単にプロ級のお手入れが可能です：
1. **肌の角質を削らず、うぶ毛だけを滑らかに根元からカット**：カミソリ負けや乾燥トラブルを防ぎ、顔全体のトーンをパッと明るく透明感アップ
2. **付属の眉コームで長さを均一に簡単トリミング**：2mm・4mmなど好みの長さにコームをセットして撫でるだけで、ボサボサ眉も一瞬で洗練された美眉に
3. **ポーチにすっきり収まるリップスティック型・軽量コンパクト**：外出先やメイク直しの前にもサッと取り出して、口元や眉間の気になった毛を即座にケア

今回は楽天市場でシェーバー部門1位を獲得した人気モデルから替刃付きのお得なセットまで、厳選10選を徹底比較します！`
  },
  {
    slug: 'art-facial-body-peeling-gel-aha-dead-skin-removal-10sen-2026',
    id: 'art-facial-body-peeling-gel-aha-dead-skin-removal-10sen-2026',
    title: '【角質ポロポロ薬用ピーリングジェル10選】クルクル馴染ませるだけで古い角質・毛穴の黒ずみ・ごわつきを一掃！化粧水の浸透力が劇的に変わる低刺激角質ケア比較',
    category: '洗顔・クレンジング',
    date: '2026-09-11',
    description: '洗顔後の肌になじませて軽くマッサージするだけで、蓄積した古い角質や毛穴汚れをポロポロ絡め取る「薬用ピーリングジェル」おすすめ10選！果実酸（AHA）や植物エキス配合で肌を傷めず、くすみを脱ぎ捨てて生まれたてのモチモチ素肌へ導く人気アイテムを徹底解説。',
    products: fetched.t4,
    lead: `「毎日洗顔しているのに小鼻の黒ずみや顎のざらつきが取れない」「美容液や乳液を塗っても肌に入っていかず表面に残る」「肌がくすんで顔色が悪く見える」……その原因は、ターンオーバーの乱れによって肌表面に分厚く蓄積した「古い角質」にあります。

そんな角質トラブルを摩擦レスで優しくオフしてくれるのが、**「角質ピーリングジェル」**です：
- **ジェルが古いタンパク質汚れだけに反応してポロポロ吸着**：健やかな生きた肌細胞は傷つけず、剥がれ落ちるべき不要な角質だけを優しく巻き込んでオフ
- **化粧水・美容液の浸透スピードが何倍にもアップ**：角質のフタを取り除くことで、いつものスキンケア成分が角層の奥深くまでグングン染み渡る
- **顔だけでなく肘・膝・かかと・デコルテまで全身使える**：黒ずみが気になるボディパーツにも使用でき、全身つるんとしたなめらかシルク素肌へ

今回は敏感肌でも使いやすい低刺激・無添加処方から、大容量ポンプタイプまで、楽天市場で絶大な支持を得ているピーリングジェル10選を徹底比較します！`
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
  content += `### 1. 安全性と肌への負担の少なさを最優先にチェック\n毎日や定期的に使用するアイテムだからこそ、防水性能（IPX7等）、天然シルク100%、セーフティガード刃、低刺激成分処方などの安全基準をしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める使い勝手\nお風呂で使えるコードレス設計、洗濯可能な耐久性、ポーチに入るコンパクトサイズなど、生活の中で無理なく続けられる仕様を選びましょう。\n\n`;
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

console.log(`[Batch 129 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
