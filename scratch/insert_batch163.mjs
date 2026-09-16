import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch163_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ163の4記事の定義
const batchDefs = [
  {
    id: 'art-co2-carbonated-gel-mask-pack-10sen-2026',
    slug: 'art-co2-carbonated-gel-mask-pack-10sen-2026',
    title: '【炭酸ガスパック・CO2ジェルパック10選】エステ級の毛穴引き締め＆発光透明感！ボーア効果で肌が蘇る人気炭酸パック比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: '1回でくすみ・毛穴・たるみをリセット！「炭酸ガスパック（CO2ジェルパック）」おすすめ10選！医療現場発祥のボーア効果（酸素供給メカニズム）により、肌本来の自活力を高めてエステ帰りのようなモチモチ発光素肌へ導く人気商品を徹底比較。',
    products: fetched.t1,
    lead: `「ファンデーションを塗っても肌のくすみや毛穴の開きが隠せない」「高級美容液を使っても肌の弾力やハリがいまひとつ実感できない」「大切な日の前夜に1回で肌が見違えるスペシャルケアがしたい」……そんな美肌を求める女性たちがこぞって絶賛する最高峰のホームエステが、**「炭酸ガスパック（CO2ジェルパック）」**です。

一般的な炭酸水パックとは全く異なる、医学的根拠に基づいた肌再生メカニズムを誇ります：
1. **皮膚深層へ浸透した炭酸ガスが「ボーア効果」を引き起こし大量の酸素を細胞へ供給**：血管を拡張して血流を劇的にアップさせ、肌細胞のターンオーバーとコラーゲン生成を猛烈に促進
2. **ジェルの中で均一に発泡し続けるため肌への刺激が少なくピリピリしにくい**：空気中に炭酸が逃げず肌へダイレクトに高濃度CO2を届けるため、赤ら顔や敏感肌でも安心
3. **剥がした瞬間から毛穴がキュッと引き締まり、ワントーン明るい透明感を実感**：古い角質もオフされてむくみもスッキリ抜け、フェイスラインまでキュッと上向きに

今回はエニシーグローパックをはじめ楽天市場でリピーター続出の本格炭酸ガスパック10選を徹底比較します！`
  },
  {
    id: 'art-peel-off-eyebrow-tint-long-lasting-10sen-2026',
    slug: 'art-peel-off-eyebrow-tint-long-lasting-10sen-2026',
    title: '【眉ティントおすすめ10選】1週間消えない自眉へ！すっぴんでも眉毛キープ＆朝のメイク時短を叶える人気アイブロウティント比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: '塗って剥がすだけで眉毛メイク完了！「消えない眉ティント（ピールオフアイブロウティント）」おすすめ10選！角質層を自然な植物性色素で染め上げ、汗・水・皮脂でも約3日〜1週間落ちないすっぴん美人を作る人気コスメを徹底解説。',
    products: fetched.t2,
    lead: `「すっぴんになると眉尻がなくて誰だか分からなくなる」「毎朝の眉毛描きに時間がかかるし左右対称に描くのが苦手」「ジムで汗をかいたりプール・温泉に入ると眉毛が消えて恥ずかしい」……そんな眉毛の悩みをたった一晩で解消してくれるのが、**「眉ティント（アイブロウティント）」**です。

地肌の表面（角質層）を着色するため、クレンジングでも簡単に落ちません：
- **塗って乾かしてペリペリ剥がすだけでナチュラルな自眉感が最長1週間持続**：タトゥーとは違って角質が剥がれ落ちるとともに自然に薄くなるため、流行の眉型にも柔軟に対応
- **汗・皮脂・水・摩擦に強く、夏のスポーツや長時間のフライトでも眉毛を完全死守**：お泊まりデートや温泉旅行でもすっぴんに自信が持て、朝のメイク時間を5分以上短縮
- **美容成分（パンテノール・植物エキス）配合で自眉の毛根もしっかりトリートメント**：自まつ毛や眉毛を傷めることなく、毛先までツヤのある健康的な眉毛を育成

今回はフジコ（Fujiko）をはじめ楽天市場で注文が殺到している人気眉ティント10選を徹底比較します！`
  },
  {
    id: 'art-micro-carbonated-bubble-face-wash-10sen-2026',
    slug: 'art-micro-carbonated-bubble-face-wash-10sen-2026',
    title: '【炭酸泡洗顔フォーム10選】ワンプッシュでホイップ濃密泡！毛穴の黒ずみ・くすみを摩擦レスで吸着する人気炭酸洗顔料比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: '泡立てネット不要で濃密マシュマロ泡！「炭酸泡洗顔フォーム（炭酸洗顔料）」おすすめ10選！毛穴より微細なミクロ炭酸泡が皮脂汚れや古い角質を浮かせて吸着し、擦らない摩擦レス洗顔で血行促進＆透明感アップを叶える人気アイテムを徹底検証。',
    products: fetched.t3,
    lead: `「忙しい朝に泡立てネットでモコモコ泡を作るのが面倒くさい」「手やネットでは作れない弾力のある高密度泡で摩擦レスに顔を洗いたい」「小鼻の黒ずみや顔全体のくすみを洗顔だけでパッと明るくしたい」……毎日の洗顔を極上の炭酸泡パックに変える時短＆美肌アイテムが、**「炭酸泡洗顔フォーム」**です。

手では絶対に作れないガス圧ならではのミクロ泡が毛穴の奥まで届きます：
1. **逆さにしても落ちないホイップクリーム級の超濃密弾力クッション泡**：肌に直接手が触れない完全摩擦レス洗顔が可能で、敏感肌やエイジング肌のバリア機能を死守
2. **ミクロサイズの炭酸泡が毛穴の奥の皮脂汚れや角栓をシュワシュワ浮遊・吸着**：ゴシゴシ擦らなくても泡を顔に乗せてハンドプレスするだけで、すっきり毛穴ディープクレンズ
3. **炭酸の血管拡張作用で洗顔しながら血流アップ＆くすみ一掃**：洗い流した瞬間から血色が良くなり、その後の化粧水や美容液のぐんぐん入っていく浸透力に感動

今回は楽天市場で口コミ高評価を集める人気炭酸泡洗顔料10選を徹底比較します！`
  },
  {
    id: 'art-luminous-glow-highlighter-powder-10sen-2026',
    slug: 'art-luminous-glow-highlighter-powder-10sen-2026',
    title: '【ツヤ肌ハイライトパウダー10選】内側から発光する濡れツヤ感！立体感小顔＆くすみを飛ばす人気ハイライター比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: 'ひと塗りでプロ級の立体感と透明感！「濡れツヤ肌ハイライトパウダー」おすすめ10選！白浮きや毛穴落ちしない微細パール＆偏光ラメ配合で、鼻筋・Cゾーン・唇の山に光を集めて内側から発光する水光肌を作る人気コスメを徹底解説。',
    products: fetched.t4,
    lead: `「肌がくすんで平面的に見え、老けて疲れた印象を与えてしまう」「クリームハイライトだとファンデがヨレるし、ラメが粗いと毛穴が目立ってしまう」「デパコス級のシルクのような上品な濡れツヤ肌をプチプラや実力派パウダーで作りたい」……メイクの完成度を一気に格上げする必須フィニッシュアイテムが、**「ツヤ肌ハイライトパウダー」**です。

肌に溶け込む微粒子パウダーが自然な光のヴェールをまとわせます：
- **微細な偏光パールが肌の凹凸にフィットし、毛穴を悪目立ちさせずに発光**：光の反射でくすみや影を飛ばし、まるで上質なシルクをまとったようなみずみずしいツヤを演出
- **Cゾーン・鼻筋・目頭・唇の上にサッと乗せるだけでキュッと引き締まった立体小顔へ**：顔の高い位置を自然に強調し、メリハリのある外国人風の骨格美人に
- **皮脂吸着パウダー配合でテカリに見えず、夕方までサラサラの濡れツヤをキープ**：汗や皮脂によるヨレを防ぎ、時間が経ってもくすまない発色の美しさを維持

今回はクレ・ド・ポーやセザンヌをはじめ楽天市場で絶賛されている人気ハイライト10選を徹底比較します！`
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
      title: '選び方ポイント1：成分濃度と発泡力・発色・キープ力をチェック',
      desc: '高濃度炭酸ガスの浸透力、眉ティントの持続日数、ハイライトのパール粒子の細かさなど、仕上がりと持続性を左右する性能を重視しましょう。'
    },
    {
      title: '選び方ポイント2：肌への優しさと摩擦レスな使用感',
      desc: 'デリケートな顔や目元・眉に使うものだからこそ、低刺激処方、ピリピリ感の少なさ、弾力のある濃密泡など肌を守る設計が大切です。'
    },
    {
      title: '選び方ポイント3：使いやすさと日々の時短・継続性',
      desc: 'ワンプッシュで出る炭酸泡や、剥がしやすいフィルム状ティントなど、忙しい毎日でもストレスなく取り入れられる使い勝手を確認しましょう。'
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
