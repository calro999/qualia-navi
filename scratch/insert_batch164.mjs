import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch164_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ164の4記事の定義
const batchDefs = [
  {
    id: 'art-invisible-water-activated-mesh-eyelid-tape-10sen-2026',
    slug: 'art-invisible-water-activated-mesh-eyelid-tape-10sen-2026',
    title: '【水で貼るメッシュアイテープ10選】至近距離でも絶対にバレない！テカらず自然な平行二重が作れる人気ふたえテープ比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: 'テカリ・浮きゼロで整形級の自然な二重へ！「水で貼るメッシュアイテープ」おすすめ10選！水を吹きかけるだけで透明化してまぶたの皮膚と一体化し、アイシャドウの上からでもバレずにクッキリとした幅広二重をキープする人気アイテムを徹底比較。',
    products: fetched.t1,
    lead: `「従来のアイテープやアイプチはテカって瞬きのたびにバレる」「メイクの上に貼るとテープの端が白く浮いてきて不自然」「重い一重やまぶたの厚みでテープが跳ね返されて二重が作れない」……そんな二重メイクの長年の悩みを完全に過去のものにしたのが、**「水で貼るメッシュアイテープ」**です。

極薄の網目状メッシュ素材に水溶性接着成分を塗布した最新構造を採用しています：
1. **霧吹きで水を吹きかけるだけで透明化し、肌のキメと完全に同化**：至近距離で見られてもテープが貼ってあることが分からない驚異のステルス性を発揮
2. **アイシャドウの上から貼っても粉飛びせず、自然なグラデーションを阻害しない**：上からアイメイクを重ねてもヨレず、伏し目にしたときのテカリや引きつり感がゼロ
3. **まぶたのたるみや加齢による三重・奥二重の幅調整にも強力フィット**：重い脂肪に負けないコシのあるメッシュが、理想のクッキリ平行二重を一日中がっちりホールド

今回は楽天市場で「もうこれ以外使えない」とリピーター続出のメッシュアイテープ10選を徹底比較します！`
  },
  {
    id: 'art-eyeshadow-primer-base-crease-proof-10sen-2026',
    slug: 'art-eyeshadow-primer-base-crease-proof-10sen-2026',
    title: '【アイシャドウベースおすすめ10選】夕方の二重幅の溝落ち・ラメ飛び防止！プチプラでもデパコス級の高発色が続く人気アイプライマー比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: 'ひと塗りでアイシャドウの発色＆密着度が劇的アップ！「アイシャドウベース（アイプライマー）」おすすめ10選！夕方になると二重の溝にアイシャドウがたまる・粉飛びする・ラメが頬に落ちる悩みを解消し、朝の鮮やかな発色を一日中キープする名品を徹底解説。',
    products: fetched.t2,
    lead: `「アイシャドウを塗っても時間が経つとくすんで発色が悪くなる」「二重の線や目元の小じわにアイシャドウがたまっていわゆる“二重溝落ち”する」「大粒ラメやグリッターが頬に飛び散って顔中キラキラになってしまう」……アイメイクの完成度とキープ力を底上げするプロの秘密兵器が、**「アイシャドウベース」**です。

まぶたの油分をコントロールし、パウダーを磁石のように吸着させます：
- **まぶたのくすみや色ムラをトーンアップしてアイシャドウ本来の色を120%引き出す**：プチプラのアイシャドウでもデパコスのような濃密で鮮やかな発色へと変化
- **皮脂吸着成分がまぶたのテカリを防ぎ、二重幅のヨレ・溝落ちを完全ブロック**：まばたきによる摩擦や皮脂崩れをシャットアウトし、夜まで塗りたての美しさを維持
- **微細ラメから大粒グリッターまで粉飛びをゼロにしてピタッと固定**：美容液成分配合で乾燥しやすいデリケートな目元の皮膚もしっとり保湿ケア

今回はキャンメイクやナーズをはじめ楽天市場で絶大な信頼を集める人気アイシャドウ下地10選を徹底比較します！`
  },
  {
    id: 'art-vacuum-pore-cleaner-blackhead-remover-10sen-2026',
    slug: 'art-vacuum-pore-cleaner-blackhead-remover-10sen-2026',
    title: '【毛穴吸引器・美顔器おすすめ10選】小鼻の角栓・黒ずみをごっそり吸引！真空吸引＆水流洗浄でいちご鼻を解消する人気毛穴クリーナー比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: '毛穴パックより肌に優しく頑固な角栓をスポンと除去！「真空毛穴吸引器（ウォーターピーリング水流吸引美顔器）」おすすめ10選！吸引力の多段階調整、部位別の専用ヘッド、スマホカメラ連動で毛穴を確認しながら汚れを吸い取る最新人気ギアを徹底検証。',
    products: fetched.t3,
    lead: `「小鼻の黒ずみ（いちご鼻）やあごの角栓が洗顔ではどうしても取れない」「指で無理やり押し出すと毛穴が開いて跡が残ったり炎症を起こす」「自宅でサロンのハイドラフェイシャルのような本格毛穴洗浄がしたい」……頑固な角栓を根こそぎ吸い出す爽快感で大ヒットしているのが、**「毛穴吸引器・美顔器」**です。

真空負圧吸引テクノロジーで肌を痛めずに毛穴の奥の角栓だけをピンポイントで引き抜きます：
1. **3〜5段階の吸引力調整で肌質に合わせた安心セーフティケア**：敏感肌のライト吸引から頑固な角栓専用のディープ吸引まで、内出血や赤みを防ぎながら安全に使用可能
2. **水流吸引（ウォーター毛穴吸引）モデルなら汚れを吸いながら同時に美容液洗浄**：水や化粧水で毛穴を柔らかく潤しながら吸着するため、摩擦レスで毛穴の開きも即座に引き締め
3. **小鼻用・Tゾーン用・リフトアップ用など多彩なシリコンヘッド付属**：細かい鼻のキワや凹凸にもジャストフィットし、顔全体の老廃物や古い角質を一網打尽

今回は楽天市場でレビュー高評価を集める人気毛穴吸引器10選を徹底比較します！`
  },
  {
    id: 'art-pocket-mini-massage-gun-fascia-release-10sen-2026',
    slug: 'art-pocket-mini-massage-gun-fascia-release-10sen-2026',
    title: '【ミニマッサージガン・軽量小型10選】スマホサイズで超強力！肩こり・首コリ・顔の筋膜リリースまでこなす人気ハンディ振動マシン比較',
    category: 'ボディケア',
    date: '2026-09-16',
    description: '重いマッサージ器はもう不要！「超軽量ミニマッサージガン（ポケット筋膜リリースガン）」おすすめ10選！約300g前後の手のひらサイズながら毎分3,000回超の強力ストロークで深層筋肉をほぐし、フェイスモードで顔のむくみやたるみケアもこなす人気ギアを徹底解説。',
    products: fetched.t4,
    lead: `「長時間のPC作業やスマホで首・肩・肩甲骨がガチガチに凝っている」「昔のマッサージガンは重すぎて腕が疲れるし音がうるさくて使わなくなった」「オフィスやジム、出張先にも手軽に持ち運べるコンパクトで本格的な筋膜ケアギアが欲しい」……現代人のボディメンテナンスに革命を起こしたのが、**「ポケットミニマッサージガン」**です。

スマホ並みのサイズと驚異のハイパワーを兼ね備えています：
- **片手で軽々扱える超軽量設計（約250g〜350g）で女性でも腕が疲れない**：バッグに入れていつでも持ち歩け、仕事の休憩中や移動時間にもサッと肩や首をリフレッシュ
- **毎分1,500〜3,200回の高精度ブラシレスモーターが深層筋肉へピンポイント直撃**：手揉みやマッサージチェアでは届かない深部のトリガーポイントを瞬時に振動で解放
- **フェイスモード（低振動）＆ソフトアタッチメント付属で顔のむくみ・エラ張りもケア**：フェイスラインや咬筋に優しく当てることで、すっきりとした小顔印象と目元の開きをサポート

今回はマイトレックスやドクターエアをはじめ楽天市場で圧倒的な支持を集める人気ミニマッサージガン10選を徹底比較します！`
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
      title: '選び方ポイント1：機能性と密着力・パワー・キープ力をチェック',
      desc: 'メッシュの透明度、アイシャドウベースの密着持続力、吸引器のパワー調整幅、マッサージガンの振動ストロークなど用途に合った性能を選びましょう。'
    },
    {
      title: '選び方ポイント2：肌や筋肉への安全性と刺激の少なさ',
      desc: '目元や顔などのデリケートな部位に使うアイテムだからこそ、低刺激な接着剤、肌を吸いすぎない安全設計、アタッチメントの素材を重視しましょう。'
    },
    {
      title: '選び方ポイント3：携帯性と使いやすさ・日常での取り入れやすさ',
      desc: 'ポーチに入るコンパクトさ、USB充電式のコードレス仕様、水洗いや拭き取りなどのお手入れの手軽さが継続利用のポイントです。'
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
