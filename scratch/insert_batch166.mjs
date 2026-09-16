import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch166_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ166の4記事の定義
const batchDefs = [
  {
    id: 'art-portable-water-flosser-jet-washer-10sen-2026',
    slug: 'art-portable-water-flosser-jet-washer-10sen-2026',
    title: '【口腔洗浄器・ジェットウォッシャー10選】歯間の歯垢・口臭をごっそり水流洗浄！完全防水＆お風呂で使える人気ジェット水流フロス比較',
    category: 'オーラルケア',
    date: '2026-09-16',
    description: '歯ブラシや糸ようじでは届かない奥歯や歯周ポケットの汚れを一網打尽！「口腔洗浄器（ジェットウォッシャー・ウォーターフロス）」おすすめ10選！パナソニックのドルツをはじめ、高圧パルス水流で歯茎をマッサージしながら口臭や歯周病を根本予防する人気モデルを徹底比較。',
    products: fetched.t1,
    lead: `「毎日丁寧に歯磨きをしているのに歯間から嫌なニオイや出血がある」「矯正器具やインプラントの周りに食べカスが挟まって取れない」「歯医者さんの定期検診で歯垢や磨き残しを毎回指摘されてしまう」……現代のオーラルケアで最も劇的な効果を実感できると話題なのが、**「口腔洗浄器（ジェットウォッシャー）」**です。

細く力強い微細パルス水流が、ブラシの毛先が絶対に届かない深部まで届きます：
1. **毎分1,400〜1,800回の高圧ジェット水流が歯間や歯周ポケットの汚れを瞬時に弾き飛ばす**：使用後に洗面台に吐き出した水を見て「こんなに汚れが残っていたのか」と驚愕する圧倒的な洗浄力
2. **IPX7完全防水仕様でお風呂場での丸洗い使用が可能**：水跳ねを気にせずバスタイム中に口を開けて思いっきり使え、使い終わったらそのまま丸洗いできて衛生的
3. **水圧の多段階調整＆歯茎ケアモード搭載で出血や痛みを防止**：初めての方や知覚過敏・歯茎が敏感な方でも、優しい水圧から徐々に慣らして歯茎の血行促進マッサージが可能

今回はパナソニックをはじめ楽天市場で絶賛のレビューが数万件集まる人気口腔洗浄器10選を徹底比較します！`
  },
  {
    id: 'art-dental-floss-picks-interdental-brush-10sen-2026',
    slug: 'art-dental-floss-picks-interdental-brush-10sen-2026',
    title: '【デンタルフロス＆糸ピックスおすすめ10選】歯垢除去率80%超！切れにくくスルンと入る人気フロス＆歯間ブラシ比較',
    category: 'オーラルケア',
    date: '2026-09-16',
    description: '歯ブラシだけでは歯垢の約4割が残っている！「デンタルフロス＆糸ピックス（ホルダータイプ・ロールタイプ）」おすすめ10選！極細高強度繊維や膨らむフロス、フッ素加工やキシリトール配合で、狭い歯間にも引っ掛からずスルリと通る人気オーラルケアを徹底解説。',
    products: fetched.t2,
    lead: `「歯磨きだけでは歯と歯の間の汚れが取れず虫歯や歯周病が心配」「フロスを使うと糸が切れて歯の間に挟まったり引っかかって痛い」「外出先や食後にサッと使える手軽でコスパの良い糸ようじが欲しい」……歯の寿命を延ばすために歯科医師が100%推奨する基本習慣が、**「デンタルフロス＆糸ピックス」**です。

歯ブラシのみの歯垢除去率約60%に対し、フロスを併用することで80%〜90%まで跳ね上がります：
- **超高分子量ポリエチレン（高強度繊維）採用で狭い歯間でも絶対に切れない・毛羽立たない**：詰め物や被せ物がある歯でもスムーズに抜き差しでき、歯茎を傷つけない優しい当たり心地
- **唾液や水分を含むとスポンジ状にふっくら膨らんで歯垢を根こそぎ絡め取るエキスパンドタイプ**：歯の側面に沿わせて引き上げるだけで、目に見えて汚れをごっそり吸着
- **初心者でも奥歯まで届きやすいY字型ホルダー＆大容量でお得な個包装パック**：ポーチやデスクの引き出しに常備でき、食後の身だしなみエチケットとしても大活躍

今回は小林製薬の糸ようじやクリニカ、海外実力派フロスまで楽天市場で売れ筋の10選を徹底比較します！`
  },
  {
    id: 'art-silicone-eyemakeup-eyeliner-stencil-guide-10sen-2026',
    slug: 'art-silicone-eyemakeup-eyeliner-stencil-guide-10sen-2026',
    title: '【アイライン補助プレート＆シリコン定規10選】跳ね上げラインが一発で決まる！手ブレ・左右非対称・マスカラまぶた付きを防ぐ人気メイクツール比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: '不器用さんでもプロ級の美しいアイラインが描ける！「アイメイク補助プレート（シリコン製アイライナーステンシル定規）」おすすめ10選！目元のカーブに沿わせて描くだけで左右対称の跳ね上げラインや切開ラインが完成し、マスカラガードとしても使える人気ツールを徹底検証。',
    products: fetched.t3,
    lead: `「リキッドアイライナーを引くときに手が震えてガタガタになってしまう」「目尻の跳ね上げラインの角度や長さが左右でバラバラになる」「せっかく仕上げたアイシャドウの上にマスカラ液が付いて台無しになる」……そんなアイメイク最大の難関を秒速でクリアしてくれるのが、**「シリコン製アイメイク補助テンプレート」**です。

柔らかいシリコン素材がどんな目の形・カーブにもぴったり吸い付きます：
- **プレートのガイドに沿ってペン先を滑らせるだけで、均一な極細跳ね上げラインが完成**：海外セレブのような美しいキャットアイや韓国風の自然な目尻ラインがテクニック不要で一発フィックス
- **上まつ毛・下まつ毛のマスカラガードとしても大活躍**：まぶたの皮膚をガードしながら根元からグイッとマスカラを塗れるため、ダマにならずセパレートまつ毛が作れる
- **丸洗い可能な高品質シリコン製で何度でも繰り返し衛生的に使用可能**：メイク汚れもウェットティッシュで拭くだけで簡単に落ち、ポーチに入れて持ち歩きもラクラク

今回はSNSや美容インフルエンサーの間でバズっている話題のアイライン定規10選を徹底比較します！`
  },
  {
    id: 'art-waterproof-reusable-shower-cap-bath-10sen-2026',
    slug: 'art-waterproof-reusable-shower-cap-bath-10sen-2026',
    title: '【完全防水シャワーキャップおすすめ10選】髪を濡らさず快適バスタイム！二重構造＆トリートメント浸透スチームパックにも使える人気ヘアキャップ比較',
    category: 'バスグッズ',
    date: '2026-09-16',
    description: 'シャワーの水滴や湯気から巻き髪・ストレートを完全ガード！「完全防水シャワーキャップ（二重構造・洗える大人用）」おすすめ10選！外側は撥水ナイロン、内側は吸水シルクやEVA防水フィルムで湿気を遮断し、トリートメント時のスチーム加温パックにも使える人気モデルを徹底解説。',
    products: fetched.t4,
    lead: `「お風呂に入りたいけれど今日は髪を洗いたくない・ブローしたヘアスタイルを崩したくない」「使い捨てのペラペラなシャワーキャップだと水が染み込んできたりゴムの跡がおでこにつく」「高級トリートメントの効果をサロン級に高めるスチームキャップが欲しい」……バスタイムの快適性とヘアケア効率を格上げするのが、**「完全防水シャワーキャップ」**です。

ホテルにある簡易キャップとは別次元の耐久性と高機能二重構造を誇ります：
1. **高密度撥水アウター×防水インナーの完全シールド構造**：勢いよくシャワーを浴びても内側に水滴や湿気を一切通さず、セットした前髪や巻き髪を完璧にキープ
2. **額にゴム跡がつかない幅広ソフトゴム＆ロングヘアもすっぽり収まる大容量設計**：締め付けによる頭痛やおでこの赤みを防ぎ、お風呂上がりにそのまま外出できる美しさを維持
3. **トリートメントを塗って湯船に浸かれば「温熱スチームトリートメント」に変身**：お風呂の蒸気を利用してキューティクルを開き、補修成分を毛髪の芯までグングン浸透させる

今回は楽天市場でおしゃれで可愛いと絶賛されている人気シャワーキャップ10選を徹底比較します！`
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
      title: '選び方ポイント1：機能性と水圧・耐久性・密着度の基本スペック',
      desc: '水流のパルス数や水圧調整段階、フロス糸の切れにくさ、テンプレートのフィット感、シャワーキャップの防水二重構造など実用的なスペックを重視しましょう。'
    },
    {
      title: '選び方ポイント2：操作性と持ちやすさ・使いやすさ',
      desc: '濡れた手でも滑らないエルゴノミクスグリップや、口内・目元に当てやすい設計など、毎日のルーティンで扱いやすい形状を選びましょう。'
    },
    {
      title: '選び方ポイント3：丸洗い・お手入れのしやすさと衛生面',
      desc: 'お風呂や洗面所など水回りで使うものだからこそ、完全防水仕様（IPX7等）や丸洗い可能でカビにくい抗菌素材であることが大切です。'
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
