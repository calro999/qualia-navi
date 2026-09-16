import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch155_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ155の4記事の定義
const batchDefs = [
  {
    id: 'art-electric-face-eyebrow-shaver-gentle-10sen-2026',
    slug: 'art-electric-face-eyebrow-shaver-gentle-10sen-2026',
    title: '【レディース用フェイス＆眉毛シェーバー10選】肌を傷めず産毛を一掃！メイクノリ激変＆透明感アップの電動カッター比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: 'カミソリ負けやヒリヒリ感をゼロに！「レディース用フェイス＆眉毛シェーバー」おすすめ10選！丸い刃先でデリケートな肌を守りながら、顔全体の微細な産毛や眉周りをサロン級の美しさに整える人気電動シェーバーを徹底比較。',
    products: fetched.t1,
    lead: `「ファンデーションを塗ると産毛のせいで粉浮きやムラになる」「普通のカミソリを使うと肌がカサついたり赤み・ニキビができる」「眉毛の形を整えるとき、ハサミや毛抜きだと失敗して薄眉になってしまう」……そんな顔周りのムダ毛悩みを一発で解決し、肌のトーンアップを叶える必須ギアが、**「レディース用フェイス＆眉毛シェーバー」**です。

肌に刃が直接触れないセーフティ設計で、プロのエステ顔そり級の仕上がりを実現します：
1. **丸みを帯びた薄刃設計で敏感肌やニキビ肌でもヒリつかず安心**：皮膚を巻き込まず、目元・口元のデリケートな皮膚も撫でるだけで産毛をスルスルカット
2. **眉毛の長さを均一に揃えられる専用コーム＆細部用アタッチメント付属**：眉上・眉下の細かい産毛処理から全体の毛量調整まで、不器用な方でも左右均等な美眉が完成
3. **ポーチに入るコンパクトなペン型＆水洗い可能なヘッド**：ポーチに忍ばせて外出先のメイク直し前のチェックにも活躍し、使用後は水洗いでいつも清潔

今回は楽天市場で口コミ高評価を獲得している人気フェイスシェーバー10選を徹底比較します！`
  },
  {
    id: 'art-microcurrent-face-roller-contouring-10sen-2026',
    slug: 'art-microcurrent-face-roller-contouring-10sen-2026',
    title: '【マイクロカレント美顔ローラー10選】朝のむくみ・二重あごを速攻すっきり！微弱電流でフェイスラインを引き締める人気Y字ローラー比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: 'プロの手技「ニーディング」を自宅で再現！「マイクロカレント美顔ローラー（Y字型美容ローラー）」おすすめ10選！ソーラーパネルから光を取り込んで微弱電流を発生させ、顔のむくみやたるみ、ほうれい線、首筋のリンパを心地よくつまみ流す人気モデルを徹底検証。',
    products: fetched.t2,
    lead: `「朝起きると顔がパンパンにむくんで目が小さく見える」「年齢とともにフェイスラインがもたつき、二重あごやほうれい線が目立ってきた」「高額な美顔器は充電が面倒で続かないけれど手軽に引き締めケアがしたい」……そんな大人のたるみ・むくみ悩みを毎朝3分でリセットしてくれるのが、**「マイクロカレント美顔ローラー」**です。

充電不要のソーラー式微弱電流と立体ローラーが抜群のリフトケア効果を発揮します：
- **生体電流に近いマイクロカレントが肌深層を刺激しハリとキメを蘇らせる**：細胞を活性化させてターンオーバーを整え、引き締まったシャープなフェイスラインへ誘導
- **計算し尽くされた3Dダイヤモンドカットボールが老廃物をギュギュッと揉み流す**：エステティシャンの指先のような吸い付くタッチで、フェイスラインから首・鎖骨までリンパを強力ドレナージュ
- **防水仕様（IPX7等）でお風呂の中やシートマスクの上からでも使える**：入浴中の血行が良いタイミングでコロコロ転がすだけで、むくみを根本から撃退

今回は楽天市場でロングセラーを誇る人気マイクロカレントローラー10選を徹底比較します！`
  },
  {
    id: 'art-heated-ems-guasha-facial-lifting-plate-10sen-2026',
    slug: 'art-heated-ems-guasha-facial-lifting-plate-10sen-2026',
    title: '【温熱EMS電動かっさ美顔器10選】ほうれい線・首コリ・フェイスライン一掃！じんわり温めて表情筋をリフトケアする人気かっさプレート比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: '伝統のかっさに最先端テクノロジーが融合！「温熱EMS電動かっさプレート」おすすめ10選！約42℃のじんわり温熱、微小振動、EMS電気刺激で凝り固まった表情筋や首・肩コリをほぐし、驚くほどスッキリとした小顔印象へ導く人気アイテムを徹底解説。',
    products: fetched.t3,
    lead: `「昔ながらの天然石かっさだと手が疲れるし摩擦で肌を痛めそう」「スマホ首のせいで首や肩がバキバキになり、顔全体の血色が悪くたるんでいる」「頬の位置をグッと引き上げて若々しい小顔印象を作りたい」……伝統の東洋美容と最新テクノロジーを融合させた最強の時短ケアが、**「温熱EMS電動かっさ美顔器」**です。

手動のかっさでは絶対に届かない筋肉層へアプローチします：
- **約42℃の心地よい温熱プレートが肌を温めて血行とリンパの巡りを急速UP**：化粧水や美容液の角質層への浸透率を爆上げし、もっちりとした弾力肌を再生
- **EMS（微弱電気刺激）が普段使えていない表情筋を強制的に動かしてリフトアップ**：エラやフェイスライン、口元のたるみに当てるだけで、ピクピクと筋肉が刺激されてシャープに
- **毎分1万回以上の高周波マイクロ振動が老廃物の詰まりを分散・排出**：首筋から鎖骨へ流すことで、頑固な首こり・肩こりもスッキリ解消

今回は楽天市場で美容家やインフルエンサーが愛用する人気電動かっさ10選を徹底比較します！`
  },
  {
    id: 'art-automatic-electric-makeup-brush-cleaner-dryer-10sen-2026',
    slug: 'art-automatic-electric-makeup-brush-cleaner-dryer-10sen-2026',
    title: '【全自動電動メイクブラシクリーナー10選】10秒で洗浄＆高速脱水乾燥！雑菌・肌荒れを防ぎブラシをふわふわに保つ人気洗浄器比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: '手洗い＆自然乾燥の面倒な手間から完全解放！「全自動電動メイクブラシクリーナー＆乾燥機」おすすめ10選！高速回転スピン技術で毛の奥深くに詰まったファンデーションや皮脂を10秒で徹底洗浄し、そのまま遠心力で即乾燥させる人気ツールを徹底比較。',
    products: fetched.t4,
    lead: `「メイクブラシの汚れを放置すると雑菌が繁殖して肌荒れやニキビの原因になると分かっていても洗うのが面倒」「手洗いすると毛先が広がったり乾くのに丸一日以上かかって使えない」「高価なブラシの毛質を痛めずにいつも新品のようなふわふわ感をキープしたい」……世界中のメイクアップアーティストや美容マニアが手放せないと話題なのが、**「全自動電動メイクブラシクリーナー」**です。

手洗いとは比較にならない圧倒的な洗浄スピードと速乾性を誇ります：
1. **超音波または360度高速回転で奥に入り込んだリキッドファンデ・皮脂汚れを瞬時に浮遊・分解**：毛束を傷めることなく、わずか数十秒で新品同様の透明な洗浄水に
2. **遠心力を利用した高速回転スピンで洗浄後すぐにサラサラに完全乾燥**：洗った直後にそのままポーチにしまえたり、翌朝待たずにすぐにメイクに使える
3. **太筆から細筆までどんなブラシ径にもフィットするマルチシリコンホルダー付き**：アイシャドウブラシから大型チーク・ファンデーションブラシまで一括ケア可能

今回は楽天市場で時短美容グッズとして注文殺到中の人気電動ブラシクリーナー10選を徹底比較します！`
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
      title: '選び方ポイント1：機能性と肌への優しさ・安全設計をチェック',
      desc: 'デリケートな顔や目元に使用するアイテムは、肌を傷つけないセーフティガードや刺激の強弱を調整できる機能が備わっているかを確認しましょう。'
    },
    {
      title: '選び方ポイント2：給電方式と使いやすさ・携帯性',
      desc: '毎日ストレスなく続けるために、USB充電式やコードレス設計、持ちやすい形状や軽量設計であることが重要です。'
    },
    {
      title: '選び方ポイント3：水洗い・防水性能とお手入れのしやすさ',
      desc: '肌に直接触れる美顔器やブラシクリーナーは、ヘッドの水洗いや防水機能（IPX規格）が付いているといつでも衛生的に使えます。'
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
