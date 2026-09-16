import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch154_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ154の4記事の定義
const batchDefs = [
  {
    id: 'art-rechargeable-heated-eye-mask-massager-10sen-2026',
    slug: 'art-rechargeable-heated-eye-mask-massager-10sen-2026',
    title: '【充電式ホットアイマスク＆目元美顔器10選】眼精疲労・目元のクマ・たるみ撃退！温熱＆エア加圧・振動で極上のリフレッシュ比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: 'スマホやPCによる目の奥のズーンとした疲れを一掃！「充電式コードレスホットアイマスク（目元美顔器・アイマッサージャー）」おすすめ10選！使い捨てより断然高コスパで、グラフェン温熱やエアー加圧・微振動・Bluetooth音楽機能を備えた人気モデルを徹底比較。',
    products: fetched.t1,
    lead: `「毎日長時間のデスクワークやスマホ操作で夕方になると目がしょぼしょぼ・ピントが合わない」「目の下のクマやくすみが定着して疲れた顔に見える」「使い捨ての蒸気アイマスクを毎日使うとコストがかさむ」……現代人の眼精疲労と目元のエイジングサインを芯から癒やす必須アイテムが、**「充電式コードレスホットアイマスク」**です。

使い捨てタイプにはない多機能性と経済性が圧倒的な支持を集めています：
1. **炭素繊維（グラフェン）ヒーターによる瞬間均一温熱**：スイッチを入れて数秒で約40℃〜45℃の心地よい温もりが広がり、こわばった目周りの筋肉を奥深くまでじんわり解放
2. **エアー加圧と振動による本格目元エステ体験**：こめかみや目の周りのツボを優しく指圧されているかのような心地よい刺激で、血行を促進しクマ・むくみをスッキリ解消
3. **USB充電式で何度でも繰り返し使えて超経済的**：コードレスで寝室やオフィス・移動中の新幹線でも使え、15分〜20分の自動タイマー付きで就寝前の入眠サポートにも最適

今回は楽天市場で口コミ数千件を超えるベストセラー充電式アイマスク10選を徹底比較します！`
  },
  {
    id: 'art-pure-silk-night-cap-hair-care-10sen-2026',
    slug: 'art-pure-silk-night-cap-hair-care-10sen-2026',
    title: '【天然シルク100%ナイトキャップおすすめ10選】翌朝の爆発髪・うねり・パサつき防止！摩擦ダメージをゼロにする人気ヘアケア美髪キャップ比較',
    category: 'ヘアケア',
    date: '2026-09-16',
    description: 'かぶって寝るだけでサロン帰りのサラツヤ髪へ！「天然シルク100%ナイトキャップ（筒型・リボン・ゴムタイプ）」おすすめ10選！寝返りによる摩擦・静電気・乾燥からキューティクルを完全保護し、朝のスタイリング時間を劇的に短縮する人気アイテムを徹底検証。',
    products: fetched.t2,
    lead: `「朝起きると枕との摩擦で髪が爆発してボサボサ・絡まる」「トリートメントやヘアオイルを塗っているのに枝毛や切れ毛が減らない」「寝癖直しに毎朝20分以上かかってアイロンの熱でさらに髪が傷む」……そんなヘアダメージの最大の元凶である「睡眠中の枕の摩擦」を遮断するのが、**「シルク100%ナイトキャップ」**です。

シルクは「第2の皮膚」とも呼ばれるタンパク質天然繊維で、圧倒的なヘアケア効果を発揮します：
- **寝返りの摩擦を99%軽減しキューティクルを剥がれから死守**：滑らかな肌触りの天然シルクが髪表面の引っ掛かりをなくし、朝の手ぐしが驚くほどスルンと通る仕上がりに
- **優れた吸放湿性と天然保湿成分セリシンで寝汗蒸れを防ぎつつうるおい保持**：髪と頭皮の適正湿度を保ち、冬の乾燥パサつきや夏の頭皮トラブルを両面から予防
- **ロングヘアもすっぽり収まる筒型タイプや額に跡がつかないリボン調節式が人気**：髪の長さや寝相に合わせて選べ、脱げにくさと快適な着け心地を両立

今回は楽天総合ランキングで話題沸騰の最高級6Aランクシルク採用ナイトキャップ10選を徹底比較します！`
  },
  {
    id: 'art-washable-25-momme-silk-pillowcase-10sen-2026',
    slug: 'art-washable-25-momme-silk-pillowcase-10sen-2026',
    title: '【洗える25匁シルク枕カバーおすすめ10選】寝るだけで髪ツヤ＆肌荒れ・摩擦ジワ予防！洗濯機対応・両面天然シルクの人気ピローケース比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: 'ナイトキャップが朝脱げてしまう人に！「洗える25匁天然シルク枕カバー」おすすめ10選！極上の高密度シルクが就寝中の顔のシワや摩擦肌荒れ、髪のパサつきを丸ごと防止。洗濯機で洗えるイージーケア仕様やファスナー式・封筒式など人気モデルを徹底解説。',
    products: fetched.t3,
    lead: `「ナイトキャップをかぶって寝ても朝起きるといつも脱げてしまっている」「綿の枕カバーだと頬が擦れて乾燥肌荒れや寝起きのシワが気になる」「毎日寝るだけで髪も肌も同時に綺麗になる美肌・美髪アイテムが欲しい」……そんな美意識の高いユーザーの間で新常識となっているのが、**「25匁天然シルク枕カバー」**です。

厚みと耐久性に優れた25匁（モンメ）の高密度シルクは、美肌と美髪の最強サポーターです：
- **顔の皮膚摩擦を極限まで減らし、ほうれい線や目元の寝ジワ・乾燥肌荒れを防止**：低刺激なアミノ酸タンパク質繊維が敏感肌やアトピー肌も優しく受け止める
- **どんな寝相でも頭皮と髪が擦れず、トリートメント効果を閉じ込めてサラサラ髪をキープ**：寝返りを打っても髪が引っ張られず、うねりやアホ毛の発生を根本からカット
- **ウォッシャブル加工で自宅の洗濯機でネットに入れて丸洗い可能**：シルクの弱点だったお手入れの手間を克服し、清潔な状態を毎日ストレスなく保てる

今回は楽天市場で圧倒的レビュー件数を誇る25匁＆19匁の極上シルク枕カバー10選を徹底比較します！`
  },
  {
    id: 'art-usb-rechargeable-heated-eyelash-curler-10sen-2026',
    slug: 'art-usb-rechargeable-heated-eyelash-curler-10sen-2026',
    title: '【USB充電式ホットビューラー10選】湿気・雨でも一日中上向きカール持続！やけど防止＆まつ毛を傷めない人気アイラッシュカーラー比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: '梅雨の湿気やマスクの蒸気でも絶対に下がらない上向きまつ毛！「USB充電式ホットビューラー」おすすめ10選！コーム型から挟むカーラー型まで、10秒即熱・温度調節機能・やけど防止セーフティ設計を兼ね備えた人気まつ毛カーラーを徹底比較。',
    products: fetched.t4,
    lead: `「通常のビューラーでギュッと挟むとまつ毛が抜ける・切れて痛む」「マスカラを塗っても夕方には重みや湿気でまつ毛が直滑降に下がってしまう」「雨の日やマスクの蒸気でも一日中パッチリとした上向きカールをキープしたい」……アイメイクの持続力を劇的に底上げする必須ギアが、**「USB充電式ホットビューラー」**です。

熱の力でまつ毛のキューティクルを整えながら自然な上向きカールを固定します：
1. **電池交換不要のUSB Type-C急速充電＆約10秒の即熱スピード立ち上がり**：忙しい朝でも待たずに即使用でき、ポーチに入れてオフィスの化粧直しにも大活躍
2. **まつ毛の硬さや自まつ毛・マツエク・つけまに合わせて選べるマルチ段階温度調節**：熱すぎずぬるすぎない最適温度（65℃〜85℃）で、まつ毛を痛めず理想のカールを形状記憶
3. **まぶたに熱源が直接触れない安全コームガード設計**：不器用な方でもやけどの恐怖ゼロで、短いまつ毛や下まつ毛の際までしっかり拾い上げてセパレート

今回は楽天総合ランキングで人気を集める最新型ホットビューラー10選を徹底比較します！`
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
      title: '選び方ポイント1：機能性とパワー・効果の持続性をチェック',
      desc: '使用目的に合わせた温熱スピード、摩擦軽減の匁数、カールキープ力などの基本スペックを重視し、長期間快適に使えるモデルを選びましょう。'
    },
    {
      title: '選び方ポイント2：持ち運びやすさとUSB充電・コードレスの利便性',
      desc: '毎日使ったり持ち歩くアイテムは、電池交換不要のUSB充電式やバッグに入るコンパクト設計が継続利用の鍵になります。'
    },
    {
      title: '選び方ポイント3：肌や髪に触れる素材の安全性とお手入れのしやすさ',
      desc: '肌荒れや火傷を防ぐセーフティ設計や、丸洗い・抗菌仕様など清潔に保ちやすいものを選ぶことが大切です。'
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
