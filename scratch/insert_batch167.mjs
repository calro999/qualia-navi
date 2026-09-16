import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch167_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ167の4記事の定義
const batchDefs = [
  {
    id: 'art-foot-peeling-pack-callus-exfoliation-10sen-2026',
    slug: 'art-foot-peeling-pack-callus-exfoliation-10sen-2026',
    title: '【足裏角質パックおすすめ10選】履いて待つだけでガサガサ皮がズルむけ！赤ちゃんのようなツルふわ足裏へ導く人気ピーリングフットパック比較',
    category: 'ボディケア',
    date: '2026-09-16',
    description: '頑固な角質やガチガチかかとがペロリと脱皮！「足裏角質ピーリングフットパック」おすすめ10選！ベビーフットをはじめ、AHA（フルーツ酸）や乳酸の力で古い角質を浮かせ、約5〜7日後に自然と皮が剥がれ落ちて生まれたての素足へ再生する人気商品を徹底比較。',
    products: fetched.t1,
    lead: `「かかとが白くひび割れてストッキングが引っかかる・伝線する」「軽石ややすりで削ってもすぐに硬い角質が復活してしまう」「サンダルや素足の季節に向けて足裏全体を一気にリセットしたい」……そんな頑固な角質トラブルを一度のケアで解決するのが、**「足裏角質ピーリングフットパック」**です。

削るケアとは根本的に異なる、ケミカルピーリング発想の脱皮体験が特徴です：
1. **フルーツ酸（AHA）や乳酸・グリコール酸が古い角質細胞の結合を優しく分解**：生きている皮膚を傷めることなく、蓄積した死んだ角質層だけを浮かせて剥離準備
2. **専用ソックス型シートに足を浸して約60分〜90分待つだけの簡単ステップ**：浸透させた数日後からお風呂に入った際に足裏の皮がポロポロと剥け始め、快感のズルむけ体験へ
3. **ヒアルロン酸やコラーゲン・植物エキス配合で脱皮後の肌もぷるぷる保湿**：剥がれた後のデリケートな新しい肌をしっとり保護し、モチモチとした柔らかい素足をキープ

今回は楽天市場で口コミ数千件を超えるロングセラー足裏角質パック10選を徹底比較します！`
  },
  {
    id: 'art-natural-pony-hair-eyeshadow-brush-set-10sen-2026',
    slug: 'art-natural-pony-hair-eyeshadow-brush-set-10sen-2026',
    title: '【天然馬毛・アイシャドウブラシセット10選】プロ級の美しいグラデーションが一瞬！携帯ケース付き人気柔らかメイクブラシ比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: '指塗りやチップでは出せない極上の発色とぼかし！「天然馬毛（ポニー毛）アイシャドウブラシセット」おすすめ10選！粉含みが良く敏感なまぶたにもチクチクしない極上の肌触りで、ベース・メイン・締め色・ノーズシャドウまで完璧に仕上げる人気セットを徹底解説。',
    products: fetched.t2,
    lead: `「パレットの付属チップでアイシャドウを塗ると境目がくっきり線になってぼかせない」「指で塗るとまぶたにムラができたりラメがつきすぎてしまう」「デパコス級の美しい立体グラデーションアイを毎朝簡単に作りたい」……アイメイクの完成度を劇的に引き上げるのが、**「天然馬毛（ポニー毛）アイシャドウブラシセット」**です。

人工毛にはない天然毛ならではの微細なキューティクルが粉を均一にキャッチします：
- **優れた粉含みと粉離れでアイシャドウの発色とグラデーションがプロ級に**：まぶたの上に滑らせるだけで色の境目を自然にぼかし、自然な陰影と立体感を演出
- **コシがありながら毛先が丸く柔らかいためデリケートな目元もチクチクしない**：皮膚が薄いまぶたに摩擦ダメージを与えず、繊細なキワのぼかしや涙袋メイクも自由自在
- **専用の巻きポーチやミラー付き携帯ケース付属で旅行や出先でのメイク直しにも最適**：太筆・平筆・ブレンディング筆・つくし型筆など、必要な形状がすべて揃う高コスパセット

今回はSIXPLUSをはじめ楽天市場で絶大な人気を誇るアイシャドウブラシセット10選を徹底比較します！`
  },
  {
    id: 'art-clear-silicone-french-nail-stamper-10sen-2026',
    slug: 'art-clear-silicone-french-nail-stamper-10sen-2026',
    title: '【シリコン製フレンチネイルスタンパー10選】爪先を押し込むだけで秒速アート！クリア透明ヘッドで失敗しない人気ネイルスタンパー比較',
    category: 'ネイルケア',
    date: '2026-09-16',
    description: '筆では難しいフレンチネイルのカーブが1秒で完成！「透明クリアシリコン製フレンチネイルスタンパー」おすすめ10選！ぷにぷにのゼリーヘッドにマニキュアやジェルを塗り、爪先を斜めに押し込むだけで均一で美しいスマイルラインが描ける話題のセルフネイルツールを徹底検証。',
    products: fetched.t3,
    lead: `「手描きでフレンチネイルをしようとするとラインが歪んで左右対称にならない」「利き手のアートが難しくてサロンに行かないと綺麗なフレンチができない」「スキニーフレンチやグラデーションフレンチを時短で楽しみたい」……世界中のセルフネイラーの間で革命を起こしたのが、**「シリコン製フレンチネイルスタンパー」**です。

透明なゼリー状シリコンヘッドが爪のカーブに柔軟にフィットします：
- **スタンパーの表面にカラーを塗り、爪先をグッと押し当てるだけで完璧なラインが完成**：押し込む深さや角度を変えるだけで、細めのスキニーフレンチから深めフレンチまで自由自在
- **底面から透けて見えるクリアボディ設計で爪の位置を確認しながら作業可能**：狙った位置にブレずにスタンプできるため、失敗や塗り直しのストレスがゼロ
- **専用スクレーパー付きで繊細なスタンプネイルプレートの転写アートにも対応**：レース柄や幾何学模様など、手描き不可能な極細ネイルアートも一瞬で爪へ転写

今回は楽天市場で「不器用でもサロン級」と話題沸騰のシリコンフレンチスタンパー10選を徹底比較します！`
  },
  {
    id: 'art-anti-wrinkle-neck-firming-cream-retinol-10sen-2026',
    slug: 'art-anti-wrinkle-neck-firming-cream-retinol-10sen-2026',
    title: '【首のシワ改善・ネッククリーム10選】スマホ首ジワ・たるみを撃退！レチノール＆ナイアシンアミド配合の人気デコルテクリーム比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: '首元の深い横ジワやたるみにピンポイント密着！「首用シワ改善ネッククリーム（デコルテファーミングクリーム）」おすすめ10選！シワ改善有効成分ナイアシンアミドや純粋レチノール、ペプチド配合で、ピンと張った若々しい首元へ導く人気アイテムを徹底解説。',
    products: fetched.t4,
    lead: `「スマホを長時間下を向いて見るせいで首にくっきりと深い横ジワが刻まれてしまった」「首元の皮膚が薄くたるんで年齢よりも老けて見られる」「顔と同じスキンケアをしていても首の乾燥やハリ不足が改善しない」……顔以上に年齢サインが目立ちやすい首元の集中ケアが、**「首用シワ改善ネッククリーム」**です。

首元の皮膚は目元と同じくらい薄く皮脂腺が少ないため、専用の引き締め処方が不可欠です：
1. **シワ改善・美白有効成分ナイアシンアミドが真皮層のコラーゲン産生を促進**：定着してしまった深いシワの凹凸を下から押し上げ、ピンとした弾力とハリを再生
2. **純粋レチノールやペプチドが肌のターンオーバーを整え滑らかな首筋へ**：首のざらつきや乾燥小ジワを滑らかに整え、光を反射するみずみずしい透明感をプラス
3. **ベタつかず洋服や寝具につかないサラッとした高密着テクスチャー**：塗った直後に服を着たり寝返りを打っても髪が首に張り付かず、朝晩のルーティンにストレスなく定着

今回は楽天市場でシワ改善コスメとして大ヒット中の人気ネッククリーム10選を徹底比較します！`
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
      title: '選び方ポイント1：成分の有効性と浸透・剥離スピードをチェック',
      desc: 'フルーツ酸の濃度や足裏パックの浸透時間、シワ改善の有効成分（ナイアシンアミド等）、馬毛の毛質など、確かな手応えを感じられる処方を選びましょう。'
    },
    {
      title: '選び方ポイント2：操作性と使い勝手・持ちやすさ',
      desc: '透明で見やすいスタンパー、握りやすいブラシハンドル、浸漬中に歩きやすいフットソックスなど使い勝手の良さが重要です。'
    },
    {
      title: '選び方ポイント3：肌への優しさと低刺激設計',
      desc: '皮むけ後の保湿成分配合や、首元の薄い皮膚に優しい無添加処方、まぶたを痛めない柔らかい毛先など安全性の高い設計を確認しましょう。'
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
