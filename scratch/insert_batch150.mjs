import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch150_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ150の4記事の定義
const batchDefs = [
  {
    id: 'art-posture-corrector-back-support-belt-10sen-2026',
    slug: 'art-posture-corrector-back-support-belt-10sen-2026',
    title: '【美姿勢・猫背矯正サポーター＆背筋ベルト10選】巻き肩・スマホ首を自然に後ろへ牽引！薄型で服の下に目立たない人気姿勢補正サポーター比較',
    category: 'ヘルスケア',
    date: '2026-09-15',
    description: '長時間のデスクワークやスマホ操作で丸まった背中・巻き肩を、クロスボーンと幅広ベルトで無理なくリセット！「美姿勢・猫背矯正サポーター（背筋補正ベルト）」おすすめ10選！服の下に着けてもアウターに響かない極薄メッシュ仕様や肩甲骨引き締めタイプを徹底比較。',
    products: fetched.t1,
    lead: `「デスクワーク中に気づくと背中が丸まって猫背になっている」「巻き肩のせいで首や肩がパンパンに凝り固まり呼吸が浅い」「姿勢が悪いせいで老けて見えたりポッコリお腹が気になる」……現代人の多くが抱える姿勢の歪みと上半身のコリを根本から整えるのが、**「美姿勢・猫背矯正サポーター」**です。

たすき掛けの原理を応用したクロス牽引構造が、装着した瞬間から理想の美姿勢へと導きます：
1. **両肩を後ろへ優しく開き、胸を張った美しいS字ラインを自然にキープ**：無理な締め付け感なく肩甲骨を中央に引き寄せ、背筋がスッと伸びた凛とした立ち姿へ
2. **通気性抜群の薄型メッシュ素材で服の下に着けても周囲にバレない**：オフィスワークや外出時でもアウターに響かず、蒸れにくい快適な着け心地
3. **骨盤や肋骨の開きをホールドしてバストアップ＆お腹引き締め効果も**：上半身の重心が正しい位置に戻ることで、背中やデコルテのラインが見違えるほどスッキリ

今回は楽天市場で1位を獲得したトリプルエスの公式姿勢補正ベルトをはじめ、口コミ高評価のサポーター10選を徹底比較します！`
  },
  {
    id: 'art-aluminum-insulation-hair-treatment-cap-10sen-2026',
    slug: 'art-aluminum-insulation-hair-treatment-cap-10sen-2026',
    title: '【アルミ保温ヘアトリートメントキャップ10選】体温反射でサロンスチーム効果！トリートメントやヘアカラーの浸透力を高める人気加温キャップ比較',
    category: 'ヘアケア',
    date: '2026-09-15',
    description: 'いつものインバストリートメントやかかとケアの上からかぶるだけ！アルミの熱反射作用で頭皮と髪の熱を逃さずスチームサウナ状態を作る「アルミ保温ヘアトリートメントキャップ」おすすめ10選！毛先深くまでトリートメント成分を浸透させる人気アイテムを徹底解説。',
    products: fetched.t2,
    lead: `「高級トリートメントを使っているのに髪のパサつきや広がりが治まらない」「美容院のスチームサロントリートメントのような仕上がりを自宅で再現したい」「セルフカラーや白髪染めの染まりをムラなく早く定着させたい」……そんなお風呂場でのヘアケア効果を何倍にも跳ね上げるのが、**「アルミ保温ヘアトリートメントキャップ」**です。

頭皮から発せられる体温を逃さず閉じ込めるサーマルシールド効果を発揮します：
- **アルミ蒸着フィルムが熱を反射し、キャップ内部をじんわりスチーム加温**：キューティクルを優しく開いてトリートメントの補修成分を毛髪芯まで一気に浸透
- **お風呂に浸かりながらかぶるだけで「完全ながらヘアエステ」が完成**：湯船の蒸気と相まって浸透スピードが加速し、洗い流した瞬間のとぅるんとぅるん感を実感
- **ヘアカラーやヘナ・白髪染めの定着率をアップさせ放置時間を大幅短縮**：体温で均一に温めるため染めムラを防ぎ、生え際から毛先まで美しく発色

今回は洗って繰り返し使える高耐久仕様からまとめ買いお得セットまで、楽天市場で人気のアルミキャップ10選を徹底比較します！`
  },
  {
    id: 'art-facial-muscle-trainer-jawline-exerciser-10sen-2026',
    slug: 'art-facial-muscle-trainer-jawline-exerciser-10sen-2026',
    title: '【表情筋トレーニング・美顔エクササイズ10選】口元を動かしてほうれい線＆たるみ撃退！口輪筋を鍛えてシャープなフェイスラインを作る人気グッズ比較',
    category: 'フェイスケア',
    date: '2026-09-15',
    description: '口にくわえて呼吸や開閉運動をするだけで、普段使わない表情筋・口輪筋を強力トレーニング！「表情筋エクササイズ器具（口元リフトアップギア）」おすすめ10選！ほうれい線やマリオネットライン、二重あごを内側から引き締める人気セルフケアアイテムを徹底検証。',
    products: fetched.t3,
    lead: `「マスク生活や長時間の無言スマホで口角が下がって不機嫌に見える」「ほうれい線や口元のたるみが深くなってきて老け見えが加速した」「高価な美顔器を使わずに自力の筋肉でリフトアップしたい」……顔の若々しさを支える土台である表情筋を鍛え直すのが、**「表情筋トレーニンググッズ」**です。

口にくわえて数分間エクササイズするだけで、顔全体の血行とハリが蘇ります：
1. **顔の筋肉の7割と連動する「口輪筋」を効率よく刺激して全体をリフトアップ**：頬のたるみを持ち上げ、キュッと上がった魅力的な口角と笑顔を形状記憶
2. **負荷がかかるバネ構造やシリコン抵抗で短時間でも確かな筋トレ効果**：テレビを見ながらやお風呂に入りながらの1日2〜3分で、あご下の余分なお肉をすっきりシェイプ
3. **食品グレードシリコン採用で水洗いOK＆いつでも衛生的に使用可能**：いつでも清潔に保て、家族に内緒でこっそり続けられる手軽さも大好評

今回は新発売で話題のsmoow（スムー）をはじめ、楽天市場で口コミ絶賛の表情筋トレーニング器具10選を徹底比較します！`
  },
  {
    id: 'art-reusable-under-eye-cooling-gel-pads-10sen-2026',
    slug: 'art-reusable-under-eye-cooling-gel-pads-10sen-2026',
    title: '【冷却アイジェルマスク＆目元クールパッド10選】冷蔵庫で冷やして乗せるだけ！朝の腫れぼったい目・充血・眼精疲労を急速アイシングする人気アイピロー比較',
    category: 'アイケア・アイウェア',
    date: '2026-09-15',
    description: 'PCやスマホで酷使した目の奥の熱感や、泣いた翌朝・寝不足のパンパンに腫れた目元を心地よい冷たさで一気に引き締める「冷却ジェルアイマスク（目元クールパッド）」おすすめ10選！冷温両用タイプや遮光デザイン、洗って何度でも使える人気モデルを徹底解説。',
    products: fetched.t4,
    lead: `「前夜に泣いたり塩分を摂りすぎて、朝起きるとまぶたが別人のように腫れている」「一日中モニターを見ていて目の奥がズキズキ熱を持って重だるい」「お風呂上がりや夏の寝苦しい夜に頭や目元をひんやりクールダウンしたい」……そんな目元のSOSに秒速で応えるのが、**「冷却ジェルアイマスク」**です。

冷蔵庫や冷凍庫で冷やしておくだけで、極上のアイシングスパが手に入ります：
- **柔軟性のある特殊ジェルビーズが目の周りやまぶたの凹凸にすき間なく密着**：冷たさがじんわりと均一に伝わり、拡張した血管を引き締めて腫れぼったさを急速鎮静
- **レンジで温めればホットアイマスクとしても使える便利な2WAY仕様**：朝は冷やして目元スッキリ引き締め、夜は温めて疲れ目をほぐすマルチな使い分けが可能
- **マジックテープバンド付きで寝返りを打ってもズレず手ぶらでリラックス**：頭全体を包み込む冷感キャップタイプもあり、頭痛や熱冷まし用としても常備率急上昇

今回は楽天市場で大人気のUNE冷却ジェルアイマスクをはじめ、口コミ高評価のクールアイピロー10選を徹底比較します！`
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
  content += `### 1. 素材の安全性と肌・髪・筋肉への負担の少なさを最優先にチェック\n毎日触れるアイテムだからこそ、通気性メッシュの肌あたりや、アルミの密閉保温性、シリコンの食品グレード基準、ジェルの柔軟性と耐久性をしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さと操作性\n装着するだけ、かぶるだけ、くわえて動かすだけ、冷やして乗せるだけなど、無理なく自然に習慣化できる使いやすさを選びましょう。\n\n`;
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

console.log(`[Batch 150 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
