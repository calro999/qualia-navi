import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch152_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ152の4記事の定義
const batchDefs = [
  {
    id: 'art-waterproof-silicone-swimming-earplugs-10sen-2026',
    slug: 'art-waterproof-silicone-swimming-earplugs-10sen-2026',
    title: '【完全防水・水泳用シリコン耳栓おすすめ10選】中耳炎防止＆外耳道フィット！プール・サーフィン・シャワーで水が入らない人気スイミング耳栓比較',
    category: 'ボディケア',
    date: '2026-09-16',
    description: 'プールでの水泳やサーフィン、お風呂やシャワー時に耳に水が入る不快感や中耳炎を防止！「完全防水シリコンスイミング耳栓」おすすめ10選！外耳道にしっかりフィットする3重フランジ構造や形状記憶ソフトシリコン、コード付きで紛失しない人気水泳用耳栓を徹底比較。',
    products: fetched.t1,
    lead: `「プールで泳いだあと、耳の中に水が入ってポコポコして何時間も抜けない」「サーフィンや海水浴で水が入って中耳炎や外耳炎になるのが怖い」「シャワーや洗髪のときに耳に水が入るのを防ぎたい」……水辺のアクティビティや日々の入浴で誰もが経験する水の侵入ストレスを完全に遮断するのが、**「水泳専用の防水シリコン耳栓」**です。

一般的なスポンジタイプの睡眠用耳栓とは異なり、水圧と水分に耐える専用設計が施されています：
1. **医療グレードの柔軟シリコン＆3層フランジ構造による驚異の防水密閉性**：耳穴のカーブに沿って隙間なく密着し、激しいクロールやターンでも水滴を一切侵入させない
2. **会話や周囲の指示音は聞き取りやすい音響スルー設計モデルも登場**：水はシャットアウトしつつ、インストラクターの声や周囲の環境音を適度に通して安全性を確保
3. **落下・紛失を防ぐ専用ストラップ付き＆水洗い可能な高耐久性**：プール内での紛失リスクをゼロにし、使用後は水道水でサッと洗って衛生的に何度でも使用可能

今回は楽天市場でスイマーやマリンスポーツ愛好家に売れている防水シリコン耳栓10選を徹底比較します！`
  },
  {
    id: 'art-fake-eyelash-applicator-clip-tweezer-10sen-2026',
    slug: 'art-fake-eyelash-applicator-clip-tweezer-10sen-2026',
    title: '【つけまつげ装着クリップ＆ピンセット10選】不器用でも1発でキワに密着！部分用・マグネットつけまも簡単装着できる専用器具比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: '指先や毛抜きではグラついて難しいつけまつげの装着が誰でも秒速で決まる！「つけまつげ専用クリップ＆装着ピンセット」おすすめ10選！目元の丸みに沿ったワイドカーブ設計やマグネットつけま対応モデル、自まつげと一体化させる人気アプリケーターを徹底比較。',
    products: fetched.t2,
    lead: `「つけまつげを付けるとき、指で持つと視界が遮られて狙ったキワに乗せられない」「目頭や目尻が浮いてしまい、糊がまぶたにベタベタついてアイメイクが台無しになる」「話題のマグネットつけまやワンラック・束感部分つけまを綺麗に挟んで付けたい」……つけまつげメイクの最大の難関であるポジショニングをプロ級に仕上げてくれるのが、**「つけまつげ専用装着クリップ＆ピンセット」**です。

一般的な毛抜きとは全く異なる人間工学に基づいた目元専用構造が魅力です：
- **まぶたの丸みに沿ったワイドカーブ形状でつけま全体をしっかりホールド**：目頭から目尻まで均一な力で挟めるため、まぶたのキワ1mmのベストポジションに一撃でフィックス
- **先端が丸みを帯びた安全設計でデリケートな目元を傷つけない**：鋭利な金属ピンセットと違って皮膚を挟みにくく、初心者でも恐怖感なくスムーズに操作可能
- **装着後の自まつげとの圧着・馴染ませ機能も搭載**：つけまつげと自まつげを根元から優しく挟み込んで密着させることで、不自然な浮きや二重ラインの崩れを防止

今回は楽天でコスパ抜群＆失敗しないと評判のつけまつげ装着アシストクリップ10選を徹底比較します！`
  },
  {
    id: 'art-shoe-sneaker-deodorant-balls-capsules-10sen-2026',
    slug: 'art-shoe-sneaker-deodorant-balls-capsules-10sen-2026',
    title: '【靴用消臭ボール・スニーカーカプセルおすすめ10選】ポンと入れるだけで汗臭・ムレ撃退！靴箱やジムバッグにも使える人気シューズ消臭剤比較',
    category: 'ボディケア',
    date: '2026-09-16',
    description: '脱いだ靴にポンと放り込むだけで翌朝爽快！「靴用消臭ボール（スニーカーカプセル）」おすすめ10選！スプレーのように靴を湿らせず、回転式ダイヤルで香りの強さを調節できる人気モデルや、下駄箱・ロッカー・スポーツバッグの臭い対策にも最適な便利アイテムを徹底解説。',
    products: fetched.t3,
    lead: `「一日中履きっぱなしの革靴やスニーカーから嫌な汗の臭いが漂う」「消臭スプレーを吹きかけると靴の中が湿って逆に雑菌が繁殖しそう」「ジムシューズや部活のスパイクバッグを開けた瞬間のモワッとした臭いをどうにかしたい」……足元の気になる悪臭トラブルを最もスマートに解決するのが、**「靴用消臭ボール（スニーカー消臭カプセル）」**です。

スプレーやパウダーのように手が汚れず、靴を濡らす心配が一切ありません：
- **靴の中にポイッと入れるだけで消臭・抗菌成分が空間全体に浸透**：靴の奥深く、つま先の届きにくい部分まで消臭香気成分が行き届き、汗臭や雑菌の繁殖を徹底ブロック
- **カプセルをひねるだけで香りの強弱＆ON/OFFを自在にコントロール**：使わないときは閉じておけるため長期間（数ヶ月〜半年）効果が持続し、コスパも極めて優秀
- **見た目もおしゃれで持ち運び自在**：スポーツバッグやシューズケース、下駄箱の隅、ロッカーにも転がしておくだけで清潔なフレッシュ空間をキープ

今回は楽天市場でスポーツ選手やスニーカーヘッズに絶賛されている人気消臭ボール10選を徹底比較します！`
  },
  {
    id: 'art-lip-exfoliator-double-sided-silicone-brush-10sen-2026',
    slug: 'art-lip-exfoliator-double-sided-silicone-brush-10sen-2026',
    title: '【両面シリコン製リップスクラブブラシ10選】唇の皮むけ・縦じわ・古い角質をスルンとオフ！ぷるぷるリップを作る人気リップエクスフォリエーター比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: 'カサつきや皮むけで口紅が綺麗に乗らない唇に！「両面シリコン製リップスクラブブラシ（リップエクスフォリエーター）」おすすめ10選！粗め凹凸と極細ブラシのダブルサイド仕様で、リップバームやスクラブと一緒に優しく撫でるだけで赤ちゃんのようなぷるぷる唇へ導く人気ツールを徹底比較。',
    products: fetched.t4,
    lead: `「リップクリームを何度塗っても唇の皮がポロポロめくれてしまう」「マットリップやティントを塗ると縦じわや乾燥が目立って綺麗に見えない」「指でゴシゴシ擦ると唇の皮膚が薄くて痛めてしまう」……そんなデリケートな唇のガサガサトラブルを優しくリセットしてくれるのが、**「両面シリコン製リップスクラブブラシ」**です。

指先では届かない細かな溝の汚れや角質を負担なくケアできます：
1. **太めの凹凸突起面でマッサージ＆血行促進**：リップバームやワセリンを塗って優しくクルクル回すことで、血色の良いふっくらとしたボリューム感をプラス
2. **極細シリコンブラシ面で浮き上がった古い角質・皮むけを優しくオフ**：刺激の強いスクラブ粒子を使わなくても、水洗いでツルツルのなめらかリップに整える
3. **シリコン製だから丸洗い＆煮沸・アルコール消毒可能でいつでも衛生的**：動物毛のブラシと違ってバクテリアが繁殖せず、速乾性にも優れているため長持ち

今回は楽天で韓国コスメファンやリップケアマニアに大人気のシリコン製リップブラシ10選を徹底比較します！`
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
      title: '選び方ポイント1：用途に合わせたフィット感とサイズ設計',
      desc: '使用する部位やシーンにぴったり密着する形状やサイズを選ぶことで、ズレやストレスなく本来の機能性を最大限に発揮できます。'
    },
    {
      title: '選び方ポイント2：水洗い・除菌がしやすく清潔に保てる衛生素材',
      desc: '直接肌や身の回りの物に触れるアイテムだからこそ、水洗いやアルコール除菌が手軽に行える耐久性の高いシリコンや抗菌仕様を選ぶのがベストです。'
    },
    {
      title: '選び方ポイント3：携帯性と収納ケースの有無をチェック',
      desc: 'ポーチやバッグに入れて持ち歩くことが多いアイテムは、専用ケース付きやコンパクトにまとめられる工夫があるものを選ぶと外出先でも重宝します。'
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
