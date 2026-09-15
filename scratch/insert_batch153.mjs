import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch153_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ153の4記事の定義
const batchDefs = [
  {
    id: 'art-100-percent-blackout-folding-parasol-uv-10sen-2026',
    slug: 'art-100-percent-blackout-folding-parasol-uv-10sen-2026',
    title: '【完全遮光100%・折りたたみ日傘おすすめ10選】紫外線・赤外線完全カット！超軽量＆晴雨兼用の人気UV対策日傘比較',
    category: 'ボディケア',
    date: '2026-09-16',
    description: '照りつける日差しと熱線を完璧に遮断！「完全遮光100%折りたたみ日傘（晴雨兼用）」おすすめ10選！遮光率100%・UPF50+の多層コーティングで木陰のような涼しさを実現し、バッグに入れても負担にならない超軽量・コンパクトな人気モデルを徹底比較。',
    products: fetched.t1,
    lead: `「日焼け止めを塗っても直射日光のジリジリとした熱さで肌が赤くなる」「普通の日傘だと光が透けて眩しいし涼しさを感じられない」「毎日持ち歩くからとにかく軽くて晴雨兼用の丈夫な折りたたみ傘が欲しい」……強烈な紫外線と猛暑から美肌と体力を守るマストアイテムが、**「完全遮光100%折りたたみ日傘」**です。

単なる「UVカット」にとどまらない圧倒的な遮熱・遮光テクノロジーが特徴です：
1. **多層ラミネート黒コーティングによる紫外線・可視光線・赤外線の100%完全カット**：光を一切通さないため日傘の下に濃い影を作り、体感温度をグッと下げる「持ち歩く木陰」効果
2. **晴雨兼用＆高撥水テフロン加工で突然のゲリラ豪雨もこれ1本で完結**：撥水度最高ランクの生地を採用し、雨粒を弾いて一振りで水滴が落ちるため雨の日もストレスフリー
3. **スマホ並みの超軽量設計（150g〜200g台）＆カーボンファイバー耐風骨**：バッグの隙間にすっぽり収まるサイズ感と、ビル風や強風でも折れにくい高耐久フレームを両立

今回は楽天市場で圧倒的なレビュー件数と高評価を誇る人気完全遮光日傘10選を徹底比較します！`
  },
  {
    id: 'art-nose-hair-wax-removal-kit-10sen-2026',
    slug: 'art-nose-hair-wax-removal-kit-10sen-2026',
    title: '【鼻毛ワックス脱毛キットおすすめ10選】根こそぎゴッソリ抜けて痛くない！自宅でサロン級の爽快感が続く人気ノーズワックス比較',
    category: 'ボディケア',
    date: '2026-09-16',
    description: '飛び出し鼻毛の心配を1ヶ月ゼロに！「自宅用鼻毛ワックス脱毛キット（ブラジリアンノーズワックス）」おすすめ10選！奥の粘膜やフィルター機能を守る専用ストッパー付きスティックや、レンジで温めるだけの簡単サロン級ケアアイテムを徹底比較。',
    products: fetched.t2,
    lead: `「ふとした瞬間に鼻毛が1本チョロッと出ていないか常に不安」「ハサミや電動カッターで切ってもすぐに伸びてきてチクチクする」「サロンに行くのは恥ずかしいけれど根元からゴッソリ綺麗に処理したい」……そんな大人のエチケットの悩みをたった数分で爽快に解消するのが、**「鼻毛ワックス脱毛キット（ブラジリアンノーズワックス）」**です。

カッターやハサミとは段違いの持続力と清潔感が得られます：
- **毛根から一気に脱毛するため約3週間〜1ヶ月間も手入れ不要のツルツル状態がキープ**：断面が尖らないため伸び始めの不快なチクチク感やかゆみも激減
- **奥の毛を残し手前の見えやすい部分だけを抜く専用安全スティック設計**：鼻本来のフィルター機能・防御機能を損なわない深さでストップがかかるため安心
- **電子レンジでワックスをチンして鼻に入れて固まったら勢いよく引くだけの簡単3ステップ**：一瞬で抜けるため想像以上に痛みが少なく、抜けた毛の束を見る爽快感がクセに

今回は楽天総合ランキング常連のGOSSO（ゴッソ）をはじめ、コスパと使いやすさで選ばれている人気鼻毛ワックス10選を徹底比較します！`
  },
  {
    id: 'art-cordless-electric-fabric-shaver-lint-remover-10sen-2026',
    slug: 'art-cordless-electric-fabric-shaver-lint-remover-10sen-2026',
    title: '【電動毛玉取り器・コードレスUSB充電式10選】セーター・ニット・コートが見違える！生地を傷めず強力カットする人気ファブリックシェーバー比較',
    category: 'ボディケア',
    date: '2026-09-16',
    description: 'お気に入りの服が新品同様に蘇る！「電動コードレス毛玉取り器（USB充電式ファブリックシェーバー）」おすすめ10選！刃が直接生地に触れない安全ガード構造や高速回転6枚刃、ニットやスウェット・ソックスまで撫でるだけで毛玉を一掃する人気モデルを徹底解説。',
    products: fetched.t3,
    lead: `「お気に入りのニットやセーターに毛玉がびっしり付いて生活感が出てしまう」「100均の毛玉取り器だとパワー不足ですぐ止まるし、ハサミだと生地に穴を開けそうで怖い」「外出前に玄関でサッと服の毛玉を整えたい」……冬服やスウェット、タイツの清潔感を一瞬で復活させる必須家電が、**「電動コードレス毛玉取り器」**です。

進化したファブリックシェーバーは圧倒的なカット性能と安全性を誇ります：
- **大型6枚ステンレス刃＆ハイパワーモーターで撫でるだけで毛玉を瞬間粉砕**：引っ掛かりなくスムーズに刈り取れるため、作業時間を大幅に短縮
- **生地保護メッシュガード＆風合いガードで大事な洋服の繊維を一切傷めない**：モヘアやカシミヤなどのデリケート素材から厚手アウターまで、高さ調整で安全にケア
- **便利なUSB Type-C充電式＆コードレス仕様でリビングでも旅行先でも即起動**：大容量ダストボックス付きでゴミ捨ての手間も最小限

今回は楽天市場で口コミ数千件を超えるベストセラー電動毛玉取り器10選を徹底比較します！`
  },
  {
    id: 'art-cooling-plate-neck-fan-portable-cooler-10sen-2026',
    slug: 'art-cooling-plate-neck-fan-portable-cooler-10sen-2026',
    title: '【冷却プレート付きネックファン・首掛け扇風機10選】首元瞬間-15℃！ペルチェ素子＆静音設計で熱中症・汗ジミを防ぐ人気ネッククーラー比較',
    category: 'ボディケア',
    date: '2026-09-16',
    description: '猛暑の外出や通勤でも汗をかかずに涼しい！「冷却プレート搭載ネックファン（首掛けポータブルクーラー）」おすすめ10選！ペルチェ素子による首元の直接冷却と360度送風ファンのハイブリッドで、ハンズフリーに瞬間クールダウンできる人気ギアを徹底検証。',
    products: fetched.t4,
    lead: `「猛暑日の外出で首筋や背中に滝のような汗が流れてメイクや服が崩れる」「普通の手持ち扇風機は熱風を送るだけで全然涼しくないし片手が塞がって不便」「通勤電車や屋外フェス、ウォーキングを涼しく快適に乗り切りたい」……夏の熱中症対策と汗対策の決定版が、**「冷却プレート付き首掛けネックファン」**です。

従来の首掛けファンとは次元が違う「直接冷却」の冷感テクノロジーを搭載しています：
1. **冷蔵庫と同じペルチェ素子プレートが首の後ろや動脈を瞬間-10℃〜-15℃冷却**：冷えた缶ジュースを直接押し当てられたような極冷感が全身の体感を素早くクールダウン
2. **首周り360度からの立体送風で顔周りの熱気とマスク蒸れを一掃**：羽根なしブレード設計で髪の毛の巻き込みリスクをゼロにし、メイク崩れを防ぐ爽やかな風をキープ
3. **大容量バッテリー内蔵で長時間駆動＆人間工学フィット設計**：首や肩に負担をかけない軽量バランス構造で、ランニングや通勤・オフィスワークでも違和感なく使用可能

今回は楽天市場で熱中症対策グッズとして大ヒットを記録している人気ネッククーラー10選を徹底比較します！`
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
      title: '選び方ポイント1：機能性とパワー・効果の持続性をチェック',
      desc: '使用目的に合わせた冷却力、カット性能、遮光率などの基本スペックを重視し、長期間快適に使えるモデルを選びましょう。'
    },
    {
      title: '選び方ポイント2：持ち運びやすさと重量・サイズ感',
      desc: '毎日携帯したり手で持って使うアイテムは、バッグに入るコンパクトさや身体に負担のかからない軽量設計が継続の鍵になります。'
    },
    {
      title: '選び方ポイント3：安全性とお手入れ・メンテナンスの容易さ',
      desc: '肌に直接触れるものや刃物を扱う家電は、安全ガード機構やお手入れのしやすさがしっかり配慮されているか確認しましょう。'
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
