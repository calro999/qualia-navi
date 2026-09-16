import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch168_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ168の4記事の定義
const batchDefs = [
  {
    id: 'art-self-eyelash-perm-kit-lash-lift-10sen-2026',
    slug: 'art-self-eyelash-perm-kit-lash-lift-10sen-2026',
    title: '【セルフまつげパーマキットおすすめ10選】自宅でサロン級の根元立ち上げ！失敗しないシリコンロッド＆低刺激カール液セット比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: '1回数百円で約1ヶ月上向きまつ毛キープ！「自宅用セルフまつげパーマキット（ラッシュリフトセット）」おすすめ10選！まぶたにフィットする柔らかシリコンロッド、目に染みにくい低刺激グルー＆パーマ液、初心者でも簡単に束感を作れる人気セットを徹底比較。',
    products: fetched.t1,
    lead: `「毎月サロンに通ってまつげパーマをするのは時間もお金もかかりすぎる」「ビューラーでいくら上げても夕方や湿気でまつ毛が落ちてくる」「自宅で好きな時間に好きな角度のパリジェンヌラッシュリフトを楽しみたい」……そんな節約＆美意識の高い女性たちの間で空前の大ヒットとなっているのが、**「セルフまつげパーマキット」**です。

サロンと同等の成分と扱いやすい進化系シリコンロッドがセットになっています：
1. **SS〜LLまでサイズが揃った高密着シリコンロッドでどんなまつ毛の長さにも対応**：くるんとした自然なCカールから根元から80度立ち上げるストレートLカールまで自由自在
2. **目に染みにくく毛先を傷めないトリートメント成分配合の優しいカール液**：ケラチンやコラーゲン配合で自まつ毛の潤いを守りながら、綺麗な上向きカールを約1ヶ月持続
3. **専用グルー・Y字コーム・巻き上げスティックが全同封されたオールインワン仕様**：不器用な初心者でも毛の交差や乱れを綺麗にセパレートしてプロ級の仕上がりを実現

今回は楽天市場で口コミ数千件を超えるベストセラーまつげパーマキット10選を徹底比較します！`
  },
  {
    id: 'art-sugar-lip-scrub-exfoliating-care-10sen-2026',
    slug: 'art-sugar-lip-scrub-exfoliating-care-10sen-2026',
    title: '【リップシュガースクラブおすすめ10選】塗るだけで古い角質＆皮むけオフ！洗い流し不要でぷるぷる唇を作る人気リップケア比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: 'カサカサ唇がひと塗りで赤ちゃんのような柔らかリップへ！「リップシュガースクラブ（スティック型・ジャー型）」おすすめ10選！レブロンのキスシュガースクラブをはじめ、体温でとろける微細シュガー粒子が唇の古い角質を優しくオフして高保湿する人気コスメを徹底解説。',
    products: fetched.t2,
    lead: `「リップクリームを何度塗っても唇の皮がむけて口紅が綺麗に乗らない」「指で擦ったり皮を引っ張って唇から血が出てしまう」「ティントを塗ると唇の乾燥や縦じわが目立って老けて見える」……そんなデリケートな唇のガサガサトラブルを瞬時に解決するのが、**「リップシュガースクラブ」**です。

ソルト（塩）スクラブとは異なり、砂糖の粒子は非常にマイルドで高保湿：
- **唇の上で優しくマッサージするだけで古い角質をオフしつつ体温で自然に溶ける**：粒々が自然に馴染むため洗い流しや拭き取りが不要で、寝る前や日中のメイク前にも即使用可能
- **砂糖本来の優れた保水力＆フルーツオイル・シアバターが濃密な潤いヴェールを形成**：スクラブと同時に集中保湿パックが完了し、ぷるんと弾力のあるうるツヤ唇をキープ
- **スティック型なら外出先でも手を汚さずにリップクリーム感覚でサッとケア**：ミントやベリー・ピーチなど甘く爽やかな香りで、塗るたびにリフレッシュできる心地よさ

今回はレブロンやディオールの人気作をはじめ楽天市場で売れ筋のリップスクラブ10選を徹底比較します！`
  },
  {
    id: 'art-pelvic-support-hip-up-girdle-slimming-10sen-2026',
    slug: 'art-pelvic-support-hip-up-girdle-slimming-10sen-2026',
    title: '【骨盤補正・美尻ヒップアップガードル10選】履いた瞬間マイナス3cm！ぽっこりお腹＆下垂尻を引き締める人気補正下着比較',
    category: 'ボディケア',
    date: '2026-09-16',
    description: 'パンツスタイルに圧倒的な自信！「骨盤補正＆美尻ヒップアップガードル（ロング・ハイウエスト）」おすすめ10選！歪んだ骨盤を正しい位置へサポートしながら、たるんだお尻を下から持ち上げてまあるい美尻を作り、下腹のぽっこりを抑え込む人気インナーを徹底検証。',
    products: fetched.t3,
    lead: `「年齢とともにお尻の位置が下がって太ももとの境目がなくなってきた」「産後の骨盤の開きや歪みのせいで下腹だけがぽっこり出て戻らない」「タイトスカートや白パンツを履いた時の下着の段差やヒップラインが気になる」……大人のスタイル崩れを瞬時に補正する必須下着が、**「骨盤美尻ガードル」**です。

苦しくないのにしっかり引き締める最新の立体着圧編みを採用しています：
- **骨盤まわりを360度クロス構造でギュッと支えて正しい美姿勢をキープ**：骨盤の開きや前傾・後傾を整えることで、自然と下腹が引っ込み美しい立ち姿へ
- **お尻のお肉を太ももから持ち上げて高いトップ位置で丸くホールド**：垂れ尻を上向きのキュッとした美尻にリフトアップし、脚長効果も劇的にアップ
- **裾が切りっぱなし（ヘム仕様）でアウターに一切響かない薄型設計**：通気性抜群のメッシュ素材で夏場でも蒸れず、クルクル丸まりにくいウエストボーン付き

今回は楽天市場でレビュー数万件を誇る殿堂入り骨盤ガードル10選を徹底比較します！`
  },
  {
    id: 'art-compact-portable-detangling-hair-brush-10sen-2026',
    slug: 'art-compact-portable-detangling-hair-brush-10sen-2026',
    title: '【カバー付き携帯用ヘアブラシ10選】ポーチに入れて持ち歩く美髪ケア！絡まる髪を一撃でサラサラにほぐす人気コンパクトブラシ比較',
    category: 'ヘアケア',
    date: '2026-09-16',
    description: '風や静電気でボサボサになった髪を外出先で即座にリセット！「カバー付き携帯用コンパクトヘアブラシ」おすすめ10選！タングルティーザーのコンパクトスタイラーをはじめ、繊細なブラシピンを埃や折れから守る保護カバー付きで、バッグの中でかさばらない人気モデルを徹底解説。',
    products: fetched.t4,
    lead: `「外出先で風に吹かれたりマフラーの摩擦で毛先が絡まって手ぐしが通らない」「バッグの中にブラシを直接入れるとピンが折れたりホコリがついて不衛生」「デートや仕事の合間にトイレでサッと髪を梳かして天使の輪を作りたい」……いつでもどこでもサラツヤ髪を保つポーチの必需品が、**「カバー付き携帯用ヘアブラシ」**です。

持ち運びに特化したスマートな保護構造と圧倒的なディタングリング性能が魅力です：
1. **ワンタッチで着脱できる専用カバーがブラシピンを完全に保護**：バッグの中でピンが曲がったりホコリを巻き込む心配がなく、いつでも清潔な状態をキープ
2. **長短交互の柔軟ピンがもつれた髪を無理に引っ張らずスムーズに解きほぐす**：摩擦や静電気を抑えてキューティクルを整え、梳かした瞬間からサラサラの指通りへ
3. **手のひらにすっぽり収まる美しいエルゴノミクスカーブデザイン**：握りやすく力を均一に伝えられ、おしゃれなカラーリングや限定コラボデザインも豊富でプレゼントにも最適

今回はタングルティーザーをはじめ楽天市場で大人気の携帯用コンパクトブラシ10選を徹底比較します！`
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
      title: '選び方ポイント1：機能性とキープ力・補正力の基本スペック',
      desc: 'まつパの立ち上がり持続期間、シュガースクラブの粒子サイズと保湿力、ガードルの骨盤サポート圧、ブラシのピン配列など実用スペックを重視しましょう。'
    },
    {
      title: '選び方ポイント2：操作性と持ちやすさ・使いやすさ',
      desc: 'スティック型で塗りやすいリップ、丸まりにくいウエスト設計、手のひらにフィットするブラシ形状など毎日のルーティンで扱いやすいものがベストです。'
    },
    {
      title: '選び方ポイント3：肌への優しさと低刺激・安全設計',
      desc: '目に染みにくいパーマ液、デリケートな唇を傷めない微細シュガー、蒸れにくい通気性メッシュなど肌への優しさをしっかり確認しましょう。'
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
