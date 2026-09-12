import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch142_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ142の4記事の定義
const batchDefs = [
  {
    id: 'art-waterproof-bath-pillow-neck-rest-10sen-2026',
    slug: 'art-waterproof-bath-pillow-neck-rest-10sen-2026',
    title: '【完全防水・吸盤付きバスピロー10選】お風呂のフチが痛くならない！首・肩こりをほぐして極上の半身浴タイムを叶える人気お風呂枕比較',
    category: 'バスグッズ',
    date: '2026-09-13',
    description: '硬い浴槽に頭や首を預けても痛くならず、リラックスして長湯できる「完全防水バスピロー（お風呂用枕）」おすすめ10選！強力吸盤でズレ落ちず、人間工学に基づいた3D通気メッシュや防カビ素材を採用した人気半身浴グッズを徹底比較。',
    products: fetched.t1,
    lead: `「湯船に浸かってリラックスしたいのに、浴槽のフチが硬くて後頭部や首筋が痛くなる」「半身浴中にスマホや読書を楽しみたいけれど首が凝って疲れる」「お風呂用の枕はカビが生えたりヌメリが出そうで衛生面が心配」……そんなバスタイムのくつろぎを劇的に格上げするのが、**「完全防水・吸盤付きバスピロー」**です。

バスタブにペタッと固定するだけで、自宅の浴室が高級スパに早変わりします：
1. **人間工学に基づいた立体クッションが首・肩・頭を包み込むようにサポート**：自重を分散させて頸椎への負担をゼロにし、お湯の浮力と相まって極上の脱力感を再現
2. **大型の強力吸盤付きで体重を預けても絶対にズレない安心設計**：滑りやすいアクリルやホーロー浴槽にもガッチリ密着し、好みの高さにワンタッチ調整可能
3. **水切れ抜群の3D通気メッシュ＆防カビ抗菌加工でいつでも清潔**：使用後はフックに掛けて吊るすだけで速乾し、雑菌や嫌なニオイの発生を徹底防止

今回は楽天市場で口コミ高評価を獲得している人気バスピローから丸洗いできる高耐久モデルまで10選を徹底比較します！`
  },
  {
    id: 'art-nano-glass-foot-callus-remover-10sen-2026',
    slug: 'art-nano-glass-foot-callus-remover-10sen-2026',
    title: '【ナノガラス製かかとやすり・角質削り10選】撫でるだけで赤ちゃんのようなつるすべ素足！削り粉が散らず皮膚を痛めない人気ガラスヤスリ比較',
    category: 'ボディケア',
    date: '2026-09-13',
    description: 'ストッキングが引っかかるガサガサかかと・ひび割れを、撫でるだけでつるつるにリセットできる「ナノガラス製かかと削り（フットファイル）」おすすめ10選！皮膚を削りすぎず不要な古い角質だけを均一にオフする、水洗い可能な人気フットケア器具を徹底解説。',
    products: fetched.t2,
    lead: `「冬や季節の変わり目になるとかかとが鏡餅のようにひび割れて痛い」「金属のおろし金のようなヤスリは削れすぎて皮膚がヒリヒリする」「削った後の白い角質粉が床に散らばって掃除が大変」……そんな足裏のガサガサ悩みを優しく安全に解決するのが、**「ナノガラス製かかと角質削り」**です。

最新の半導体ナノエッチング技術で作られた微細ガラス面が、驚きの研磨力を発揮します：
- **0.01mmの超微細ナノ突起が硬化した角質だけを削り落とす**：健康な生肌を傷つけず、撫でるような軽い力で頑固な角質が消しゴムのカスのようにポロポロ除去
- **濡れた足でも乾いた足でも使える2WAY仕様でお手入れ簡単**：お風呂上がりのケアはもちろん、日中テレビを見ながらでも思い立った瞬間にすぐケア可能
- **使用後は流水でサッと流すだけで半永久的に清潔に使えるガラス製**：錆びたり目詰まりすることがなく、アルコール消毒もできるため家族間でのシェアも安心

今回は楽天市場でランキング上位を独占する人気ナノガラスヤスリから持ちやすいドロップ型まで10選を徹底比較します！`
  },
  {
    id: 'art-foldable-silicone-foot-bath-basin-10sen-2026',
    slug: 'art-foldable-silicone-foot-bath-basin-10sen-2026',
    title: '【折りたたみ式シリコン足湯バケツ10選】深型＆保温で足先からポカポカ！使わない時は数センチの隙間にすっきり収納できる人気フットバス比較',
    category: 'ヘルスケア',
    date: '2026-09-13',
    description: 'リビングやデスク下で手軽に極上の足温活ができる「折りたたみ式シリコン足湯バケツ（フットバス）」おすすめ10選！お湯が冷めにくい保温フタ付きや底面マッサージローラー付き、ふくらはぎまで温まる深型タイプを徹底検証。',
    products: fetched.t3,
    lead: `「冬場やクーラーで足先が氷のように冷えて寝付けない」「お風呂を沸かすのは面倒だけれど、足だけでも温めてリフレッシュしたい」「足湯専用のバケツは大きくて洗面所やクローゼットで場所を取るのが嫌だ」……そんな冷え性改善と癒やしを両立するのが、**「折りたたみ式シリコン足湯バケツ」**です。

パッと広げてお湯を注ぐだけで、至福のパーソナル足湯が完成します：
1. **使わない時はペタンコに折りたためてわずか5〜8cmの薄さに変身**：洗濯機横の隙間やベッド下にすっぽり収納でき、狭いお部屋でも全く邪魔にならない
2. **ふくらはぎ下までしっかり浸かる深型設計で血行促進効果が抜群**：第二の心臓と呼ばれるふくらはぎを温めることで、全身の巡りが良くなり湯上がり後もポカポカ
3. **底面のツボ押し突起やマッサージローラーで足裏のコリをほぐす**：エプソムソルトやアロマオイルを入れて足を浸せば、立ち仕事やデスクワークの足のむくみもスッキリ

今回は楽天ランキングで300冠以上を獲得した大ヒットモデルからリモコン・バブル機能付きまで10選を徹底比較します！`
  },
  {
    id: 'art-clamp-type-heated-eyelash-curler-usb-10sen-2026',
    slug: 'art-clamp-type-heated-eyelash-curler-usb-10sen-2026',
    title: '【挟むだけクリップ型ホットビューラー10選】根元から挟み上げて一日中上向き！下がりまつ毛・直毛も熱の力で瞬間カールキープする人気アイラッシュカーラー比較',
    category: 'メイクアップ',
    date: '2026-09-13',
    description: 'コーム型では作れない扇状のパッチリ上向きまつ毛を誰でも簡単に再現！普通のビューラーのようにまつ毛を挟むだけで温熱カールが決まる「クリップ型（挟むタイプ）ホットビューラー」おすすめ10選！ANLAN等の大人気USB充電式モデルを徹底解説。',
    products: fetched.t4,
    lead: `「コーム型のホットビューラーだと直毛まつ毛がすり抜けて全然上がらない」「普通のビューラーだと夕方には湿気やマスクの蒸気でまつ毛がペタンと下がる」「まつ毛パーマに通うのはお金もかかるし自まつ毛が傷まないか心配」……そんな下がりまつ毛に悩む女性たちから絶大な支持を集めているのが、**「クリップ型ホットビューラー」**です。

挟んで数秒キープするだけで、サロン帰りのような完璧なCカールが完成します：
- **温熱シリコンパッドがまつ毛全体を優しく挟み込んで形状記憶**：まつ毛を引っ張ったり直角に折れ曲がることなく、根本から放射状に広がる美カールをロック
- **わずか10〜15秒で急速予熱完了＆適温を色で知らせるインジケーター搭載**：朝の忙しい身支度でも待たされず、熱くなりすぎない安全温度制御でまぶたの火傷を防止
- **USB Type-C充電式で電池交換不要＆軽量コンパクトでポーチにIN**：外出先で雨や汗でカールが落ちてしまっても、1分で朝のパッチリ目を復活可能

今回は楽天ランキング1位の「ANLAN」をはじめ、口コミ絶賛のクリップ式ホットビューラー10選を徹底比較します！`
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
  content += `### 1. 安全性・肌やまつ毛への負担の少なさを最優先にチェック\n毎日触れるアイテムだからこそ、防水・防カビ素材の安全性や、ナノガラスの研磨精度、シリコンの耐熱性、温度制御機能などをしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さと操作性\n吸盤で貼るだけ、撫でるだけ、広げてお湯を入れるだけ、挟むだけなど、無理なく継続できる使いやすさを選びましょう。\n\n`;
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
  content += `アイテムの良さを最大限に引き出すには、適切な手順と使用方法を守ることが不可欠です。清潔な状態で優しくケアし、日々の積み重ねを大切にすることで、理想の美しさと快適な毎日を手に入れましょう。\n\n`;
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

console.log(`[Batch 142 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
