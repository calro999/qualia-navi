import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch170_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ170の4記事の定義
const batchDefs = [
  {
    id: 'art-medicated-foot-deodorant-cream-anti-odor-10sen-2026',
    slug: 'art-medicated-foot-deodorant-cream-anti-odor-10sen-2026',
    title: '【足用消臭デオドラントクリーム10選】朝塗るだけで1日中足の激臭・汗・ムレを完全ブロック！人気薬用フットクリーム比較',
    category: 'ボディケア',
    date: '2026-09-16',
    description: 'ブーツや革靴を脱いだ瞬間の強烈な足のニオイを元から断つ！「足用薬用消臭デオドラントクリーム」おすすめ10選！イソプロピルメチルフェノールやクロルヒドロキシアルミニウム配合で、雑菌の繁殖を殺菌し、汗を抑えてサラサラ素足をキープする人気商品を徹底比較。',
    products: fetched.t1,
    lead: `「飲み会やお座敷で靴を脱ぐときに自分の足のニオイが漂わないか恐怖」「一日中スニーカーやブーツを履いていると足の指の間が蒸れて納豆のような激臭がする」「市販の靴用スプレーでは足自体の嫌なニオイが消えない」……そんな足元の深刻なエチケット悩みを朝のひと塗りで解決するのが、**「足用薬用消臭デオドラントクリーム」**です。

肌に直接密着するクリームだからこそ、スプレーでは得られない持続力を発揮します：
1. **有効成分がニオイの発生源である皮膚常在菌を99.9%殺菌**：汗そのものは無臭でも、皮膚の雑菌が皮脂や角質を分解して発生するイソ吉草酸を根本からシャットアウト
2. **制汗有効成分が汗腺にフタをして足裏の嫌なベタつき・蒸れをストップ**：靴の中が高温多湿になるのを防ぎ、一日中サラサラの快適な履き心地を維持
3. **指の隙間やかかとの角質までしっかり塗り込める高密着ウォータープルーフ処方**：汗や摩擦で落ちにくく、朝出かける前に塗れば夜帰宅するまで効果が持続

今回はラヴィリンやデオナチュレなど楽天市場で圧倒的なレビュー数を誇る人気足用消臭クリーム10選を徹底比較します！`
  },
  {
    id: 'art-hair-oil-mist-spray-shine-gloss-10sen-2026',
    slug: 'art-hair-oil-mist-spray-shine-gloss-10sen-2026',
    title: '【ツヤ髪ヘアオイルミスト＆スプレー10選】手が汚れず均一噴射！外出先でも瞬時に天使の輪＆アホ毛を抑える人気オイルスプレー比較',
    category: 'ヘアケア',
    date: '2026-09-16',
    description: 'シューッと吹きかけるだけでサロン帰りの濡れツヤ髪！「ヘアオイルミスト＆ツヤ出しオイルスプレー」おすすめ10選！アルガンオイルや椿油を微細ミスト化し、手がベタつかずに髪全体へ均一にツヤを与え、静電気やパサつき・アホ毛を瞬時に落ち着かせる人気アイテムを徹底解説。',
    products: fetched.t2,
    lead: `「ヘアオイルを手のひらに出して塗ると手がギトギトになって洗うのが面倒」「オイルのつけムラで一部だけベタッとした束感になってしまう」「外出先でパサつきや静電気・アホ毛をサッと直したいけれどオイルを持ち歩くのは液漏れが怖い」……そんなヘアスタイリングの不満を一発で解消するのが、**「ヘアオイルミスト＆スプレー」**です。

微細な霧状スプレーが髪一本一本を軽やかなツヤのヴェールで包み込みます：
- **微粒子ミストだから重くならず、サラサラの軽やかさとみずみずしいツヤを両立**：ペタンコになりやすい細毛・軟毛の方でもボリュームを潰さずに天使の輪を演出
- **手で触らずに直接スプレーできるため手が一切汚れず忙しい朝やお直しの最強時短に**：頭頂部のアホ毛や後頭部のパサつきなど、手の届きにくい部分にもムラなく均一塗布
- **UVカット成分やヒートプロテクト成分配合で紫外線やドライヤー熱からも保護**：ふんわり良い香りが広がるフレグランス効果も兼ね備え、タバコや食事のニオイ移りもガード

今回は楽天市場で「ツヤ感がすごい」とリピーター続出の人気ヘアオイルスプレー10選を徹底比較します！`
  },
  {
    id: 'art-overnight-double-eyelid-crease-serum-10sen-2026',
    slug: 'art-overnight-double-eyelid-crease-serum-10sen-2026',
    title: '【夜用・二重まぶたクセ付け美容液10選】寝ている間に本物の二重ライン定着！まぶたが荒れない高密着ナイトアイプチ比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: '昼間アイプチをしなくても自然な二重へ！「夜用二重クセ付け美容液（ナイトアイプチ）」おすすめ10選！ナイトアイボーテをはじめ、まばたきをしない就寝中のゴールデンタイムに着目し、強力な接着力と豊富な美容液成分でまぶたを優しくケアしながら本物の二重を定着させる人気アイテムを徹底検証。',
    products: fetched.t3,
    lead: `「昼間にアイプチやアイテープをするとバレないか不安だしメイクに時間がかかる」「毎日アイプチを使い続けていたらまぶたが伸びたり赤くかぶれてしまった」「整形手術をせずに自力で自然なクッキリ平行二重を定着させたい」……そんな一重や奥二重に悩む方の間で王道のセルフケアが、**「夜用二重クセ付け美容液」**です。

まばたきをしない就寝中に理想のラインを記憶させる独自のアプローチが特徴です：
1. **寝返りや皮脂でも剥がれない超強力な夜用接着ホールド力**：寝ている間の無意識な摩擦やまぶたの動きに負けず、朝まで理想の折り込みラインをしっかりキープ
2. **贅沢な目元保湿・引き締め美容成分（ヒアルロン酸・植物エキス）配合**：接着成分による皮膚の乾燥やかぶれを防ぎ、腫れぼったいまぶたのむくみをスッキリ引き締め
3. **継続使用することでまぶたの皮膚が形状記憶され、すっぴんでも二重の線が定着**：昼間のアイプチから卒業でき、朝のメイク時間を劇的に短縮

今回は楽天市場で口コミ件数トップクラスを誇る人気ナイトアイプチ10選を徹底比較します！`
  },
  {
    id: 'art-makeup-brush-drying-rack-stand-hanging-10sen-2026',
    slug: 'art-makeup-brush-drying-rack-stand-hanging-10sen-2026',
    title: '【メイクブラシ干しスタンド・速乾ホルダー10選】逆さ吊りで毛先長持ち＆速乾！柄の劣化・水浸入を防ぐ人気ブラシスタンド比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: '洗ったブラシを寝かせて干すのはNG！「メイクブラシ干しスタンド（逆さ吊り速乾ホルダー）」おすすめ10選！シリコンスリットにブラシを差し込んで毛先を下向きに吊るすことで、柄の内部への水の侵入による接着剤の劣化・抜け毛を防ぎ、美しい毛並みのまま乾かす人気収納アイテムを徹底解説。',
    products: fetched.t4,
    lead: `「メイクブラシを洗ったあと、平置きでタオルに置いて乾かすと毛が変形して広がってしまう」「毛先を上にして立てて干すと柄の中に水が入り込んでカビや接着剤剥がれの原因になる」「たくさんのブラシを一気に省スペースで風通しよく干したい」……大切なメイクブラシを長持ちさせる必須ケアツールが、**「逆さ吊りメイクブラシ干しスタンド」**です。

プロのメイクアップアーティストが推奨する「毛先下向き乾燥」をスマートに実現：
- **弾力のあるシリコンスリットがどんな太さのブラシもギュッとホールド**：極細アイライナーブラシから太いフェイスパウダーブラシまで、サイズを問わずしっかり固定
- **毛先を下に吊るすことで重力で水滴が抜け、内部に水がたまらず乾燥スピードが2倍に**：根元の接着剤が溶け出すのを防ぎ、ブラシの抜け毛や柄のひび割れを完全予防
- **折りたたみ式で使わないときはコンパクトに収納＆普段のブラシ立てとしても兼用可能**：アクリル製のおしゃれなデザインで、ドレッサーや洗面台をスッキリ美しく演出

今回は楽天市場で「ブラシ洗いが格段に楽になった」と絶賛されている人気ブラシドライスタンド10選を徹底比較します！`
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
      title: '選び方ポイント1：機能性と殺菌力・キープ力・保持力の基本スペック',
      desc: '消臭成分の殺菌持続時間、オイルスプレーの霧の細かさ、二重美容液の接着持続力、スタンドのシリコンホールド力など用途に合ったスペックを選びましょう。'
    },
    {
      title: '選び方ポイント2：操作性と使いやすさ・日常での手軽さ',
      desc: '手が汚れないスプレー缶、朝まで剥がれない二重液、差し込みやすいスタンドなど、毎日のルーティンでストレスがない形状がベストです。'
    },
    {
      title: '選び方ポイント3：肌やブラシへの優しさと安全性',
      desc: 'デリケートな目元や足裏に優しい低刺激処方、ブラシの毛先を痛めない柔らかいシリコンなど安心設計を確認しましょう。'
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
