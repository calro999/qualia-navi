import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch140_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ140の4記事の定義
const batchDefs = [
  {
    id: 'art-curly-hair-diffuser-dryer-attachment-10sen-2026',
    slug: 'art-curly-hair-diffuser-dryer-attachment-10sen-2026',
    title: '【くせ毛＆パーマ用ドライヤーディフューザー10選】温風拡散でカールを崩さずふんわり速乾！熱ダメージを防ぎ天パ・ウェーブを美しくキープする人気アタッチメント比較',
    category: 'ヘアケア',
    date: '2026-09-13',
    description: 'ドライヤーの直撃風を優しく拡散し、くせ毛のうねりやパーマのカールを崩さずに速乾できる「ドライヤーディフューザー（風拡散アタッチメント）」おすすめ10選！シリコン折りたたみ式トラベル用から海外サロンスペック、カーリーガールメソッド公認モデルまで徹底比較。',
    products: fetched.t1,
    lead: `「パーマをかけたのにドライヤーで乾かすとウェーブが伸びてボサボサに広がる」「生まれつきの天パ・くせ毛を綺麗なウェーブとして活かしたい」「温風が一点に集中して髪がパサパサに熱ダメージを受けるのを防ぎたい」……そんなウェーブヘア・くせ毛特有の乾燥悩みを劇的に変えるのが、**「ドライヤーディフューザー」**です。

ドライヤーのノズルにカチッとはめるだけで、サロン帰りのカール再現が手に入ります：
1. **強風を全方位に均等分散し、カールをほぐさずに包み込むように乾かす**：髪が暴れず、パーマのリッジ感や天然パーマのカールが綺麗な束のまま定着
2. **頭皮近くにダイレクトに風を届けて根元からふんわりボリュームアップ**：ディフューザーの突起ピンが髪をすくい上げ、ペタンコになりがちなトップを立ち上げ
3. **熱の一点集中を防ぎ、過度な乾燥とキューティクル損傷を徹底ガード**：マイルドな温風が髪を均一に包み込み、毛先まで潤いを残したツヤツヤの仕上がりに

今回は市販のあらゆるドライヤーにフィットする伸縮シリコン型からプロ仕様まで、楽天市場で高評価のディフューザー10選を徹底比較します！`
  },
  {
    id: 'art-led-light-compact-mirror-dimmable-10sen-2026',
    slug: 'art-led-light-compact-mirror-dimmable-10sen-2026',
    title: '【LED女優ライト付き拡大コンパクトミラー10選】暗い場所でもメイクのムラ・厚塗りを防止！充電式＆無段階調光で細部までクッキリ映す人気携帯ミラー比較',
    category: 'メイクアップ',
    date: '2026-09-13',
    description: 'カフェの薄暗いパウダールームや車内でも自然光のような高演色LEDで顔を明るく照らす「LEDライト付きコンパクトミラー（拡大鏡付き女優ミラー）」おすすめ10選！Type-C充電式や等倍・3倍〜5倍拡大鏡、タッチ調光機能を搭載したポーチ常備コスメツールを徹底解説。',
    products: fetched.t2,
    lead: `「照明が暗いトイレでメイク直しをしたら、外に出た時にファンデーションが白浮きして厚塗りになっていた」「車の中や夕方のパウダールームでアイラインやマスカラを直そうとしても手元が暗くて見えない」「小鼻の毛穴落ちや目元の細かいシワまで見落とさずチェックしたい」……そんなメイク直しの失敗をゼロにするのが、**「LEDライト付きコンパクトミラー」**です。

手のひらサイズのラグジュアリーなミラーに、プロ仕様のライティングを搭載しています：
- **太陽光に近い自然な高演色LEDが顔全体に影を作らず均一照射**：ファンデの色浮きやチークの濃淡ムラを一瞬で見抜き、いつでも完璧な仕上がりに補正
- **等倍鏡と高精度拡大鏡（3倍〜5倍）の両面構造で細部までクリア**：アイラインのブレや眉毛の描き足し、毛穴のコンシーラー浮きもピンポイントで手直し
- **USB Type-C充電式＆指先ひとつで明るさを微調整できる無段階調光**：電池交換の手間がなく、シーンに合わせて暖色・白色の光色切り替えも自由自在

今回は楽天市場でランキング1位を獲得したお洒落なコンパクトミラーからギフトにも大人気のモデルまで10選を徹底比較します！`
  },
  {
    id: 'art-wall-mounted-hair-dryer-holder-no-drill-10sen-2026',
    slug: 'art-wall-mounted-hair-dryer-holder-no-drill-10sen-2026',
    title: '【穴あけ不要・壁掛けドライヤーホルダー10選】賃貸OK！マグネット＆強力粘着で洗濯機や洗面台にピタッと浮かせるすっきり収納グッズ比較',
    category: 'インテリア・収納',
    date: '2026-09-13',
    description: '重くてかさばるドライヤーをサッと片手で出し入れ！洗面台や洗濯機横の壁に穴を開けずに設置できる「壁掛けドライヤーホルダー」おすすめ10選！山崎実業towerのマグネット式から、ダイソン・リファ対応の強力粘着フック、コード巻き取りフック付き人気モデルを徹底検証。',
    products: fetched.t3,
    lead: `「毎日使うドライヤー、洗面台の引き出しにしまうのが面倒で出しっぱなしになり散らかる」「コードがグチャグチャに絡まって朝の身支度でイライラする」「洗面所が狭くてドライヤーを置くスペースがないけれど、賃貸だから壁に穴は開けられない」……そんな洗面台のごちゃつきを一撃で解決するのが、**「穴あけ不要・壁掛けドライヤーホルダー」**です。

浮かせる収納で洗面スペースをホテルのようにスマートに整えます：
1. **洗濯機横のマグネットやタイル・ガラス・壁紙への強力粘着で簡単設置**：工具不要で誰でも30秒で取り付けられ、賃貸住宅でも跡を残さず安心
2. **使いたい時に片手でワンアクションで出し入れできる快適さ**：収納の手間がゼロになり、洗面台の掃除もサッと拭くだけで常に清潔キープ
3. **長くて邪魔な電源コードをすっきり巻き取れる専用フック付き**：コードの断線トラブルを予防し、見た目も美しく安全に長持ち

今回は山崎実業（towerシリーズ）をはじめ、楽天市場で口コミ絶賛の壁掛けドライヤー収納10選を徹底比較します！`
  },
  {
    id: 'art-quiet-nail-dust-collector-suction-10sen-2026',
    slug: 'art-quiet-nail-dust-collector-suction-10sen-2026',
    title: '【静音ネイルダストコレクター・集塵機10選】ジェルネイルオフの削り粉を強力吸引！微細粉塵の吸い込み＆部屋への飛び散りを防ぐ人気ネイル機器比較',
    category: 'ネイルケア',
    date: '2026-09-13',
    description: 'セルフジェルネイルやマシンのオフ時に飛び散る細かなダスト（削り粉）を強力ファンで一網打尽！有害な粉塵の吸い込みを防ぎ机を汚さない「ネイルダストコレクター（集塵機）」おすすめ10選！プチトルをはじめ、静音設計・洗えるフィルター付き人気機種を徹底解説。',
    products: fetched.t4,
    lead: `「ジェルネイルをファイルやネイルマシンで削ると、部屋中に白い粉が飛び散って掃除が大変」「削り粉を吸い込んでむせてしまい、アレルギーや健康への影響が心配」「作業台や服に粉がビッシリついてセルフネイルが億劫になる」……セルフネイラーにとって最大のストレスであるダスト問題を劇的に解決するのが、**「ネイルダストコレクター（ネイル集塵機）」**です。

ネイルサロンと同じクリーンな空気環境を自宅で手軽に実現します：
- **強力シロッコファンが舞い散る粉塵を発生した瞬間に急速吸引**：爪を削る手元の下に置くだけで、机や床への粉の飛散を99%シャットアウト
- **微細な粉塵までキャッチする高性能プリーツフィルター搭載**：目に見えない超微粒子までしっかりトラップし、施術中の吸い込みリスクを徹底予防
- **夜間でも気兼ねなく使える静音モーター＆手首が疲れないリストレスト設計**：長時間のオフ作業でも手が疲れにくく、家族が寝静まった後でも安心して使用可能

今回は楽天ランキング1位の「プチトル」をはじめ、コスパ抜群の入門機からプロ仕様のハイパワーモデルまで10選を徹底比較します！`
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
  content += `### 1. 確かな機能性と素材の耐久性・安全性を最優先にチェック\n毎日使うアイテムだからこそ、風の拡散力、LED演色性と拡大倍率、耐荷重とマグネットの磁力、ファンの吸引力と静音性をしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さと操作性\nドライヤーにはめるだけ、開いてワンタッチ点灯、片手で出し入れ、ボタンひとつで集塵など、簡単操作で続けられるものを選びましょう。\n\n`;
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
  content += `アイテムの良さを最大限に引き出すには、適切な手順と使用方法を守ることが不可欠です。清潔な状態で優しくケアし、日々の積み重ねを大切にすることで、理想の美しさと快適なライフスタイルを手に入れましょう。\n\n`;
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

console.log(`[Batch 140 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
