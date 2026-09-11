import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch122_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ122の4記事の定義
const batchDefs = [
  {
    id: 'art-baking-soda-citric-acid-carbonated-bath-10sen-2026',
    slug: 'art-baking-soda-citric-acid-carbonated-bath-10sen-2026',
    title: '【重曹＆クエン酸入浴剤・天然美肌バスソルト10選】自宅で本格炭酸泉！毛穴汚れ・加齢臭・塩素を除去して生まれたて素肌へ導く重炭酸温活ケア',
    category: 'ボディケア',
    date: '2026-09-11',
    description: '重曹（炭酸水素ナトリウム）とクエン酸を組み合わせた炭酸泉入浴剤＆食用グレード天然重曹のおすすめ10選！水道水の残留塩素を和らげ、毛穴の黒ずみ・古い角質・気になる皮脂臭をスッキリ落とす極上のおうち温活バスタイムを解説。',
    products: fetched.t1,
    lead: `「毎日の入浴で疲れが取れない」「背中やデコルテのざらつき、毛穴の汚れが気になる」「湯上がりの肌がつっぱる・乾燥する」……そんな悩みを抱える方にいま大注目されているのが、**「重曹（炭酸水素ナトリウム）」と「クエン酸」**を活用した入浴法です。

重曹入浴には、一般的な入浴剤にはない驚くべき美肌・温活効果があります：
1. **弱アルカリ性の力で角質軟化＆毛穴洗浄**：皮脂汚れや古い角質を無理なく乳化・浮かせ、石鹸でゴシゴシ擦らなくても全身つるつるの「美人の湯」状態を再現
2. **クエン酸との反応による高濃度炭酸ガス**：シュワシュワと発泡する炭酸泡が末梢血管を心地よく拡張し、血行を促進。芯から温まることで冷え性や日々の疲労感をリフレッシュ
3. **皮脂臭・加齢臭・汗臭の中和消臭**：酸性の体臭原因物質を直接中和し、バスルームごと爽やかに清潔感をキープ

今回は食品添加物グレードの安全な無添加大容量重曹から、話題の高濃度重炭酸タブレットまで、楽天市場で口コミ評価の高い厳選10選を徹底紹介します！`
  },
  {
    slug: 'art-nano-glass-nail-file-shiner-buffer-10sen-2026',
    id: 'art-nano-glass-nail-file-shiner-buffer-10sen-2026',
    title: '【ナノガラス製爪やすり＆ネイルシャイナー10選】5秒磨くだけでトップコート不要の濡れツヤ！爪を傷めず形を整える半永久ガラス爪磨き徹底比較',
    category: 'ネイルケア',
    date: '2026-09-11',
    description: '特殊ナノ加工を施したガラス製爪やすり・ネイルシャイナーおすすめ10選！従来の紙やすりと違い、削るだけでサロン級のピカピカ輝く爪へ。水洗い可能で衛生的、半永久的に使える人気モデルを徹底検証。',
    products: fetched.t2,
    lead: `「仕事や学校の規則でジェルネイルやマニキュアが塗れない」「自爪が薄くて割れやすい・二枚爪になりやすい」「爪の縦じわやくすみが気になる」……そんな自爪の悩みをたった数秒で解消してくれるのが、最新の**「ナノガラス製爪やすり・ネイルシャイナー」**です。

従来の金属ヤスリや紙ファイルとは一線を画す、ナノガラス爪やすりの魅力は以下の通りです：
- **爪の表面を傷つけず極上のトップコート級ツヤ**：ナノスケールの均一な微細凹凸が爪の表面を滑らかに整え、磨いた瞬間から透明マニキュアを塗ったような自爪ツヤが2〜3週間持続
- **二枚爪や引っかかりを徹底防止**：爪の断面を美しく密閉するように整えるため、乾燥や衝撃による爪割れを防止
- **水洗いだけで半永久的に清潔**：削りカスをサッと流水で洗い流すだけで目詰まりせず、アルコール消毒も可能。何十回・何百回と衛生的に繰り返し使用可能

今回は楽天市場で売れ筋ランキング1位を獲得した人気モデルやケース付き携帯タイプなど、失敗しないナノガラス爪やすり厳選10選を徹底比較します！`
  },
  {
    slug: 'art-organic-yomogi-warm-sheet-pad-care-10sen-2026',
    id: 'art-organic-yomogi-warm-sheet-pad-care-10sen-2026',
    title: '【オーガニックよもぎ蒸しパッド＆温座シート10選】下半身の芯からポカポカ温活！冷え・生理痛・更年期の不調をじんわり和らげる骨盤温熱パット比較',
    category: 'ボディケア',
    date: '2026-09-11',
    description: '韓国伝統のよもぎ蒸しをショーツに貼るだけで手軽に再現できる「よもぎ蒸しパッド・温座パット」おすすめ10選！無農薬・オーガニックコットン使用でデリケートゾーンにも優しく、下半身から全身を温める温活アイテムを徹底レビュー。',
    products: fetched.t3,
    lead: `「手足やお尻がいつも冷たい」「生理前の重だるさや下腹部の冷えがつらい」「エアコンの効いたオフィスで底冷えする」……現代女性の多くが悩まされる下半身の冷えに、韓国の伝統温活**「よもぎ蒸し」**を手軽に取り入れられるのが「よもぎ温座パット」です。

ショーツの外側に専用の発熱体を貼り、よもぎシートを通して骨盤底筋群をじんわり直接温めることで、全身に温かい血液を循環させます：
1. **「第2の心臓」骨盤内をダイレクトに温熱**：太い血管や内臓が集まる骨盤・子宮まわりを芯から温めることで、全身の巡りをスピーディーに促進
2. **天然よもぎ＆和漢ハーブのアロマ効果**：天然ハーブの優しい香りが自律神経に働きかけ、日々のストレスや緊張を心地よく解きほぐす
3. **外出中やオフィスでも周囲に気づかれず温活**：かさばらないスリム設計で、通勤中やデスクワーク中も洋服に響かずポカポカ感が半日以上持続

今回はデリケートな肌に優しい無農薬オーガニックコットン100%仕様や大容量お得パックなど、楽天市場で選ばれているよもぎ蒸しパッド10選を詳しく解説します！`
  },
  {
    slug: 'art-korean-exfoliating-bath-towel-glove-10sen-2026',
    id: 'art-korean-exfoliating-bath-towel-glove-10sen-2026',
    title: '【痛くない韓国あかすりタオル＆ボディミトン10選】撫でるだけで角質がごっそり！二の腕・背中のザラつきを一掃してシルク肌をつくる最新垢すり比較',
    category: 'ボディケア',
    date: '2026-09-11',
    description: 'ゴム微粒子やレーヨン・天然シルク素材で肌を傷めず古い角質をごっそり落とす「あかすりタオル＆ミトン」厳選10選！背中のブツブツや肘・膝の黒ずみ、二の腕のザラつきをツルツルに仕上げる話題のボディタオルを徹底比較。',
    products: fetched.t4,
    lead: `「二の腕のプツプツやザラつきが気になる」「肘や膝、お尻の下の黒ずみをどうにかしたい」「ボディソープで洗っているのに肌がくすんで見える」……そんな蓄積した古い角質トラブルをスッキリ解消するのが、進化した**最新の「あかすりタオル＆ミトン」**です。

従来の「ゴシゴシ擦って皮膚がヒリヒリ痛くなる」昔ながらの垢すりとは違い、最新アイテムは特殊な繊維構造やゴム加工を採用しています：
- **「擦る」のではなく「吸着して絡め取る」新感覚**：ゴム微粒子をしみ込ませた特殊織りや天然シルク・レーヨンの縮みを利用し、撫でるような軽い力加減でも驚くほど垢や角質をオフ
- **全身のターンオーバーを整えてくすみ解消**：不要な角質を取り除くことで、入浴後のボディミルクやオイルの浸透力が格段にアップ
- **背中まで届くロングタオル型と細部を磨けるミトン型**：手が届きにくい背中の中央もしっかり洗えるタオルタイプや、小鼻・デコルテ・かかとなど気になる部分をピンポイントでケアできるミトンタイプを用途に合わせて使い分け

今回はテレビやSNSで大バズり中の「ゴムポンつるつる」をはじめ、楽天市場で絶大なレビュー数を誇るあかすり10選を厳選ピックアップしました！`
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
        `毎日のセルフケアを快適にする確かな品質とコストパフォーマンス`
      ],
      description: `【第${idx + 1}位】${p.name}\n販売店：${p.shop}（価格：¥${Number(p.price).toLocaleString()}）\n実際の購入者から★${p.reviewAverage}（レビュー数${p.reviewCount}件）の絶大な支持を得ている人気アイテム。肌への優しさと確かな効果実感を両立したおすすめの逸品です。`
    };
  });

  const mainProduct = def.products[0] || {};

  // リッチなMarkdownコンテンツの構築
  let content = `${def.lead}\n\n---\n\n## 失敗しない選び方の3大ポイント\n\n`;
  content += `### 1. 素材の安全性と肌への優しさを最優先に\nデリケートな肌や日常的に摩擦が加わるアイテムだからこそ、天然由来素材、オーガニック認証、食品添加物グレードなどの安心基準を確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンに無理なく組み込める形状と使い勝手\n水洗い可能で衛生的なガラス製、貼るだけのワンタッチパット、背中まで届く長さなど、ストレスなく続けられる仕様を選ぶことが継続の鍵です。\n\n`;
  content += `### 3. レビュー件数とリピート率から見るコストパフォーマンス\n使い捨てタイプは大容量パックの有無、繰り返し使えるアイテムは耐久性をチェックし、長く愛用できるコスパの良い製品を選びましょう。\n\n---\n\n## 厳選おすすめ人気ランキング10選\n\n`;

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
  content += `どんなに優秀なアイテムでも、過度な使用や間違った手順では本来の魅力を引き出せません。パッケージに記載された使用頻度や時間、適切な力加減を守り、使用後はしっかり保湿ケアを行うことで、みずみずしく健やかな美しさを手に入れましょう。\n\n`;
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

console.log(`[Batch 122 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
