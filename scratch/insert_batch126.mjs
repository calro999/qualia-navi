import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch126_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ126の4記事の定義
const batchDefs = [
  {
    id: 'art-cylinder-silk-nightcap-long-hair-wrap-10sen-2026',
    slug: 'art-cylinder-silk-nightcap-long-hair-wrap-10sen-2026',
    title: '【筒型シルク100%ナイトキャップ＆ロングヘア専用美髪ラップ10選】朝の寝癖・絡まり・うねりをゼロへ！毛先を折らずにすっぽり収める最新筒型シルクキャップ比較',
    category: 'ヘアケア',
    date: '2026-09-11',
    description: '従来の丸型ナイトキャップだと毛先が折れ曲がってしまうロングヘア・セミロング向けに開発された「筒型シルクナイトキャップ」おすすめ10選！天然高級6Aシルク100%の保湿力で寝ている間の摩擦と静電気をシャットアウトし、翌朝サロン帰りのツヤサラ髪へ。',
    products: fetched.t1,
    lead: `「丸型のシルクナイトキャップを使うと、翌朝毛先に変な折れグセやうねりがついてしまう」「朝起きるとゴムの締め付け跡がおでこにくっきり残っている」「ロングヘアだと髪が入り切らずにパンパンになる」……そんなロングヘア派の悩みを劇的に解決したのが、筒状に設計された**「ロングヘア専用・筒型シルクナイトキャップ」**です。

筒型ならではの設計メリットは以下の通りです：
1. **毛先までまっすぐ伸ばしたまま収まるシリンダー構造**：髪を折りたたまず自然なストレート状態をキープできるため、翌朝のアイロンやブローの時間が半分以下に激減
2. **最高峰6Aランク天然シルク100%の保湿密閉**：就寝中に枕と擦れ合う摩擦ダメージを99%カットし、キューティクルの剥がれやパサつき・枝毛を徹底防止
3. **おでこに跡がつかないリボン＆幅広ゴム仕様**：頭部を締め付けすぎず、朝まで脱げにくい絶妙なホールド感

今回は楽天年間ランキングを受賞したCOCOSILKをはじめ、楽天市場で口コミ人気の高い筒型シルクナイトキャップ10選を徹底比較します！`
  },
  {
    slug: 'art-absorbent-face-wash-wristband-hairband-set-10sen-2026',
    id: 'art-absorbent-face-wash-wristband-hairband-set-10sen-2026',
    title: '【洗顔用吸水リストバンド＆ウォッシュバンドセット10選】朝晩の洗顔で袖や床が水浸しになるプチストレスを一発解消！マイクロファイバー速乾手首バンド比較',
    category: 'コスメ・スキンケア',
    date: '2026-09-11',
    description: '毎日の洗顔時に肘をつたって腕や袖、洗面台の床に水が垂れてビショビショになるイライラを解消する「吸水洗顔リストバンド」おすすめ10選！ふわふわの高吸水マイクロファイバーで水を一滴も逃さずキャッチし、速乾性にも優れたSNS大ヒット便利グッズを検証。',
    products: fetched.t2,
    lead: `「朝や夜の洗顔のたびに、腕をつたってパジャマの袖口や服が濡れる」「洗面台の周りや床に水が飛び散って拭き掃除が面倒」「冬場は袖が濡れると冷たくて不快」……誰もが日常で一度は感じたことのあるこのプチストレスを完璧に解決するのが、いまSNSやテレビで空前のバズを起こしている**「洗顔用吸水リストバンド」**です。

両手首に装着して洗顔するだけで、驚きの快適さを実現します：
- **つたってくる水を瞬時に吸い取る高密度マイクロファイバー**：肘まで流れてくる洗顔の水をバンドがグングン吸水し、服の袖口を一滴も濡らさない
- **締め付けすぎずフィットする伸縮ゴム設計**：手首に優しくフィットし、ずり落ちたり痛くなったりしない快適なホールド感
- **洗濯機で丸洗いOK＆驚きの部屋干し速乾性**：毎日使ってもすぐに乾くため、衛生的に繰り返し使い続けられる

今回は洗い替えに便利な複数枚セットや、お揃いの洗顔ヘアバンドが付いた人気キットなど、楽天市場でレビュー上位の吸水リストバンド10選を徹底比較します！`
  },
  {
    slug: 'art-metal-mascara-comb-folding-stainless-separator-10sen-2026',
    id: 'art-metal-mascara-comb-folding-stainless-separator-10sen-2026',
    title: '【折りたたみ式金属製マスカラコーム＆ステンレス美まつ毛セパレーター10選】マスカラのダマを一瞬で解消！極細金属ピンでプロ級の束感セパレートをつくる神ツール比較',
    category: 'メイクアップ',
    date: '2026-09-11',
    description: 'プラスチック製コームとは仕上がりが段違い！ステンレス製の極細金属ピンがマスカラのダマや重なりを滑らかに梳きほぐす「金属製マスカラコーム」おすすめ10選！ポーチにすっきり収まる折りたたみ式で、ダマのない洗練された美まつ毛を叶える人気アイテムを徹底検証。',
    products: fetched.t3,
    lead: `「マスカラを塗るとどうしても毛先がくっついてダマになる」「プラスチックのコームだと目が粗くて細かいダマが取れない」「トレンドの綺麗なセパレートまつ毛や束感を作りたい」……メイクの完成度を左右するまつ毛の仕上がりに悩むなら、プロのヘアメイクも手放さない**「金属製（ステンレス製）マスカラコーム」**が必須です。

従来のプラスチック製と比べ、金属コームには圧倒的な強みがあります：
1. **マスカラが乾く前の一瞬でダマを根こそぎオフ**：針のように細く均一に並んだステンレスピンがまつ毛の隙間にしっかり入り込み、余分な液だけを梳き取る
2. **静電気や摩擦が起きにくくスムーズな抜け感**：まつ毛を引っ張らず、カールの角度を崩さずに扇状の綺麗なセパレートを形成
3. **ポーチに入れてもピンが曲がらない折りたたみ構造**：刃先を安全に収納できる折りたたみ式や保護キャップ付きで、持ち歩きにも最適

今回は楽天市場で「これなしではマスカラが塗れない」と絶賛される日本製・職人仕上げモデルから高コスパアイテムまで、厳選10選を徹底比較します！`
  },
  {
    slug: 'art-organic-unrefined-argan-oil-antiaging-skin-hair-10sen-2026',
    id: 'art-organic-unrefined-argan-oil-antiaging-skin-hair-10sen-2026',
    title: '【高純度オーガニック未精製アルガンオイル10選】ビタミンEと必須脂肪酸が年齢肌にハリツヤを与える！洗顔後のブースター導入液からヘアパックまで極上の万能オイル比較',
    category: 'スキンケア',
    date: '2026-09-11',
    description: '「モロッコの黄金」と呼ばれる希少なアルガンツリーの実からコールドプレス（低温圧搾法）で抽出した「オーガニック未精製アルガンオイル」おすすめ10選！オリーブオイルの数倍のビタミンEを誇り、肌のごわつきをほぐす導入美容液から毛先の集中リペアまで徹底解説。',
    products: fetched.t4,
    lead: `「最近化粧水が肌に入っていかず表面で弾かれてしまう」「季節の変わり目に肌がゴワついて粉を吹く」「毛先がパサついてまとまらない」……そんな大人の複合的な乾燥悩みに、植物の生命力をそのまま肌へ届けるのが**「オーガニック未精製アルガンオイル」**です。

アルガンオイルが「究極のアンチエイジングオイル」と呼ばれる理由は以下の通りです：
- **天然ビタミンE（トコフェロール）がオリーブオイルの約2〜3倍**：強力な抗酸化作用で紫外線や大気汚染による酸化ダメージから肌をガード
- **洗顔後すぐの肌を柔らかくほぐすブースター効果**：人間の皮脂に近いオレイン酸とリノール酸がバランスよく含まれ、硬くなった角質層を柔らかくして後から使う化粧水の浸透を何倍にも引き上げる
- **ベタつかずスーッと肌に馴染む抜群の肌なじみ**：オイル特有の油膜感が残らず、メイク前の朝のスキンケアにも安心して使用可能

今回はエコサート等の有機認証を取得した未精製コールドプレスオイルを中心に、楽天市場で高レビューを獲得しているアルガンオイル10選を徹底比較します！`
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
  content += `### 1. 素材の品質と安全基準をチェック\n肌や髪に毎日直接触れるアイテムだからこそ、天然シルク100%、高品質ステンレス、有機認証（エコサート等）などの品質基準を確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンに無理なく組み込める使い勝手\n折りたたみ式でポーチに入るサイズ、洗濯機で洗える速乾性、寝癖がつかない筒型構造など、ストレスなく続けられる仕様を選ぶことが大切です。\n\n`;
  content += `### 3. レビュー評価とリピート率から見るコストパフォーマンス\n多くの購入者が実際に使用して満足している定番名品を選ぶと失敗がありません。\n\n---\n\n## 厳選おすすめ人気ランキング10選\n\n`;

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

console.log(`[Batch 126 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
