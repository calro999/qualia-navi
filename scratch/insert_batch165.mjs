import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch165_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ165の4記事の定義
const batchDefs = [
  {
    id: 'art-glove-style-moisturizing-hand-mask-pack-10sen-2026',
    slug: 'art-glove-style-moisturizing-hand-mask-pack-10sen-2026',
    title: '【手袋型ハンドマスク＆ハンドパック10選】スマホ操作しながら手肌・指先集中保湿！手のシワ・カサつきを防ぐ人気ハンドケア比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: '手にはめるだけでエステ帰りのふっくら白肌！「手袋型ハンドマスク（高保湿ハンドパック）」おすすめ10選！シアバターやパラフィン、アルガンオイル配合の美容液が指先・甘皮・手の甲の小じわに浸透し、スマホ操作も可能な人気アイテムを徹底比較。',
    products: fetched.t1,
    lead: `「ハンドクリームを何度塗っても手の甲がカサついて血管やシワが浮き出て老け見えする」「水仕事やアルコール消毒で指先や甘皮がガサガサに荒れてしまう」「パックしながらスマホを触ったりテレビを見たりして手軽にハンドエステをしたい」……年齢が最も出やすい手肌を集中ケアする救世主が、**「手袋型高保湿ハンドマスク」**です。

美容液をたっぷりと閉じ込めた二重構造の手袋が極上の潤い密封空間を作ります：
1. **シアバターやヒアルロン酸・セラミド・パラフィン配合の高濃度美容液が手指全体を密閉パック**：乾燥で硬くなった角質層を柔らかくほぐし、ワントーン明るい透明感としっとりモチモチの手肌を再生
2. **パックをつけたままスマートフォンのタッチパネル操作が可能な特殊フィルム設計**：液漏れせず、ケア中もSNSチェックや動画鑑賞、読書を中断せずにストレスフリー
3. **爪先やハイポニキウム、ささくれまで丸ごとケア**：手袋を外した後は余った美容液を腕まで伸ばして馴染ませるだけで、サロンのパラフィンパック級の贅沢トリートメントが完了

今回は楽天市場で口コミ高評価を集める人気手袋型ハンドパック10選を徹底比較します！`
  },
  {
    id: 'art-heated-hand-massager-finger-air-pressure-10sen-2026',
    slug: 'art-heated-hand-massager-finger-air-pressure-10sen-2026',
    title: '【温熱ハンドマッサージャー10選】手の疲れ・冷え・腱鞘炎をエアー指圧でほぐす！指先まで包み込む人気ハンドエステ機比較',
    category: 'ボディケア',
    date: '2026-09-16',
    description: '1日のスマホ・PC作業で疲れた手を極上リフレッシュ！「温熱ハンドマッサージャー（手専用エアー指圧器）」おすすめ10選！独立したマルチエアバッグが指の1本1本から手のひらのツボまで力強く揉みほぐし、じんわり温める人気リラクゼーションギアを徹底解説。',
    products: fetched.t2,
    lead: `「毎日のパソコン作業やスマホ操作で親指の付け根や手首がピキピキ痛む・だるい」「冬だけでなく一年中指先が冷えてかじかんでしまう」「家事や育児で手がパンパンに張って寝る前につらい」……現代人の酷使された手を奥深くまで癒やす大ヒット家電が、**「温熱ハンドマッサージャー」**です。

まるでプロのマッサージ師に一本ずつ指を引っ張られ、手のひらを指圧されているかのような感覚を再現：
- **複数の独立したエアバッグが指1本1本から手のひら・手首まで立体的に圧迫＆ストレッチ**：こわばった手の筋肉をギューッと包み込んで解放し、血行不良による重だるさを一網打尽
- **じんわり温まるヒーター機能搭載で冷えた指先を芯からポカポカに**：温めながらマッサージすることでリラックス効果が倍増し、ハンドクリームを塗ってビニール手袋をして使えば保湿効果も爆上げ
- **コードレス充電式＆コンパクト設計でリビングやオフィス・ベッドサイドでも即使用可能**：男女問わず使えるゆったりサイズや強弱調整機能付きで、自分へのご褒美やプレゼントにも大人気

今回はルルドをはじめ楽天市場で絶大な人気を誇るハンドマッサージャー10選を徹底比較します！`
  },
  {
    id: 'art-oval-toothbrush-foundation-brush-poreless-10sen-2026',
    slug: 'art-oval-toothbrush-foundation-brush-poreless-10sen-2026',
    title: '【歯ブラシ型ファンデーションブラシ10選】毛穴ゼロの陶器肌！筋ムラ・厚塗り感を防ぐ超高密度オーバルブラシ比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: '撫でるだけでリキッドファンデがプロ級の薄膜均一密着！「歯ブラシ型（オーバル型）ファンデーションブラシ」おすすめ10選！約20万本の極細高密度毛が毛穴の凹凸を完全にフラットに埋め、筋ムラや粉浮きのない毛穴レス美肌を作る人気ブラシを徹底検証。',
    products: fetched.t3,
    lead: `「リキッドファンデを指やスポンジで塗ると毛穴落ちしたり厚塗り感が出てしまう」「ファンデーションブラシを使うと刷毛の筋ムラが残って綺麗に塗れない」「テクニックいらずで誰でも一瞬でちゅるんとした陶器肌を作りたい」……メイクアップアーティストが絶賛する究極の時短ツールが、**「歯ブラシ型（オーバル型）高密度ファンデーションブラシ」**です。

従来の平筆や丸筆とは次元の違う、密集した超微細毛束が毛穴を消し去ります：
1. **ベルベットのように密集した約20万本の超極細毛が肌の凹凸に完全密着**：ファンデーションを肌の奥へ吸い込みすぎず、表面をサッと滑らせるだけで薄く均一なヴェールを形成
2. **人間工学に基づいたカーブハンドルが顔の丸みにピタッと吸い付く**：余計な力がかからず、均一な筆圧でストロークできるため、テクニック不要で筋ムラが一切残らない
3. **リキッド・クッション・パウダー・BBクリーム・下地まで全ファンデーション対応**：どんなテクスチャーのコスメでも極上のツヤ肌に仕上がり、小鼻のキワや目元も尖った先端で完璧カバー

今回はアーティスをはじめ楽天市場で「メイク時間が半分になった」と高評価のオーバルブラシ10選を徹底比較します！`
  },
  {
    id: 'art-natural-foot-sap-sheet-anti-swelling-10sen-2026',
    slug: 'art-natural-foot-sap-sheet-anti-swelling-10sen-2026',
    title: '【天然樹液・足裏シートおすすめ10選】貼って寝るだけで翌朝ドロリ！足のむくみ・だるさをスッキリ解消する人気デトックスシート比較',
    category: 'ボディケア',
    date: '2026-09-16',
    description: '朝起きた瞬間の足の軽さに感動！「天然樹液・足裏デトックスシート」おすすめ10選！木酢液・竹酢液・ハーブの力で就寝中に足裏の余分な水分と老廃物を吸い出し、パンパンのむくみや冷えを解消してサラサラ軽快な足へ導く人気商品を徹底解説。',
    products: fetched.t4,
    lead: `「立ち仕事や長時間の移動で足の裏やふくらはぎがパンパンに張って重い」「足先が冷えて寝付きが悪く、朝起きても足の疲れが抜けていない」「足裏に貼るだけで翌朝の爽快感がやみつきになる話題の樹液シートを試したい」……日々のフットケアとして何百万人ものリピーターを持つ定番アイテムが、**「天然樹液・足裏シート」**です。

足裏のツボ（反射区）を集中ケアする天然樹液パワーが老廃物を引き出します：
- **竹酢液・木酢液・天然ハーブの吸湿作用で就寝中に足裏から余分な水分をごっそり吸収**：翌朝剥がすとシートが茶色くドロドロになり、目に見えるデトックス感とともに足が羽のように軽くなる
- **チタングレープフルーツ・よもぎ・ラベンダー・唐辛子など豊富な成分バリエーション**：リフレッシュや冷え対策、安眠サポートなど気分や体調に合わせて選べるアロマ効果
- **足裏だけでなくふくらはぎや肩・腰・手のひらにも使用可能**：凝り固まった部位にピタッと貼るだけで、ポカポカとした温もりとともに巡りを整えるマルチリフレッシュケア

今回は足リラシートをはじめ楽天市場でまとめ買い注文が殺到する人気足裏樹液シート10選を徹底比較します！`
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
      title: '選び方ポイント1：成分の質とエアー加圧・毛密度の基本スペック',
      desc: '高保湿成分の種類、エアーバッグの配置や温熱機能、ブラシの毛の密度（20万本クラス）、天然樹液の純度など目的に合ったスペックを選びましょう。'
    },
    {
      title: '選び方ポイント2：操作性と使いやすさ・日常での時短性',
      desc: 'スマホ操作可能な手袋、ワンタッチ操作のマッサージャー、ムラなく均一に伸びるブラシなど、ストレスなく続けられる使い勝手が重要です。'
    },
    {
      title: '選び方ポイント3：肌への低刺激性と衛生面・お手入れのしやすさ',
      desc: '敏感肌でも安心の低刺激処方や、水洗い可能で乾きやすいブラシ構造など、長期間清潔に愛用できる設計を確認しましょう。'
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
