import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch161_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ161の4記事の定義
const batchDefs = [
  {
    id: 'art-overnight-compression-socks-anti-swelling-10sen-2026',
    slug: 'art-overnight-compression-socks-anti-swelling-10sen-2026',
    title: '【夜用・おやすみ着圧ソックス10選】翌朝の脚のむくみ・ダルさを速攻リセット！履いて寝るだけの人気段階圧力ソックス比較',
    category: 'ボディケア',
    date: '2026-09-16',
    description: 'パンパンに張ったふくらはぎが翌朝スッキリ軽くなる！「夜用おやすみ着圧ソックス（オープントゥ・太もも丈）」おすすめ10選！メディキュットやスリムウォークなど、就寝時の姿勢に合わせた医学に基づく段階圧力設計と通気性抜群の人気ソックスを徹底比較。',
    products: fetched.t1,
    lead: `「夕方になると足首やふくらはぎがパンパンにむくんで靴がきつい」「立ち仕事やデスクワークの後に脚が重だるくて眠れない」「寝ている間に手軽に美脚ケアと疲労回復を両立させたい」……そんな現代女性のナイトルーティンの必需品が、**「夜用おやすみ着圧ソックス」**です。

昼用の強い締め付けとは異なり、就寝時の血流を考慮した医学発想の設計です：
1. **足首からふくらはぎ、太ももへと段階的に圧力を下げる黄金比設計**：重力で足元に溜まったリンパ液や血液を心臓へスムーズに押し戻し、翌朝の圧倒的なスッキリ感を実現
2. **つま先オープン設計＆吸放湿性に優れたメッシュ編みで熱がこもらない**：寝苦しさやムレを完全に防ぎ、就寝中の自然な体温調節（放熱）を邪魔しない快適な履き心地
3. **太ももまで包み込むロングタイプや骨盤サポート機能付きなど豊富なバリエーション**：寝返りを打ってもズレ下がりにくいリブ口ゴム設計で、朝までしっかり美脚ホールド

今回は楽天市場で口コミ数万件を超える人気おやすみ着圧ソックス10選を徹底比較します！`
  },
  {
    id: 'art-high-waist-compression-leggings-slimming-10sen-2026',
    slug: 'art-high-waist-compression-leggings-slimming-10sen-2026',
    title: '【ハイウエスト着圧レギンス10選】履くだけで美脚・くびれ・ヒップアップ！ベルミス系強力加圧の人気骨盤補正スパッツ比較',
    category: 'ボディケア',
    date: '2026-09-16',
    description: '履いた瞬間マイナス3cm見え！「ハイウエスト強力着圧レギンス（骨盤補正スパッツ）」おすすめ10選！胸下までカバーする超ハイウエスト設計でお腹のハミ肉や浮き輪肉を抑え込み、強圧リブ編みで美脚ラインと上向きヒップを作る人気モデルを徹底解説。',
    products: fetched.t2,
    lead: `「産後や運動不足でぽっこりお腹や骨盤の開き・歪みが気になる」「スキニーパンツやタイトスカートを綺麗に着こなしたい」「外出時も部屋着としても24時間履けるおしゃれな着圧スパッツが欲しい」……SNSや雑誌で爆発的大ヒットを記録しているのが、**「ハイウエスト強力着圧レギンス」**です。

従来のインナーとは一線を画す、全身補正テクノロジーが凝縮されています：
- **胸下まで届く超ロング丈で下腹・ぽっこりお腹・くびれを瞬時にフラット化**：クルクル丸まりにくい特殊編みで、長時間のデスクワークでもお腹に食い込まず美姿勢をアシスト
- **太もも・ふくらはぎを全方位からギューッと引き締める強力な段階着圧**：たるんだお肉を引き締めて脚の隙間を演出し、履いて歩くだけでカロリー消費と運動効率をUP
- **3Dヒップアップ立体成型でお尻を下からグッと持ち上げる**：垂れ下がったお尻をまあるく高い位置にキープし、後ろ姿の若々しいシルエットを劇的に底上げ

今回はベルミスをはじめ楽天市場で爆売れ中の人気着圧レギンス10選を徹底比較します！`
  },
  {
    id: 'art-women-scalp-shampoo-volume-hair-care-10sen-2026',
    slug: 'art-women-scalp-shampoo-volume-hair-care-10sen-2026',
    title: '【女性用スカルプシャンプー10選】頭皮のニオイ・ベタつき・髪のペタンコ髪撃退！根元からふんわり立ち上がる人気アミノ酸育毛シャンプー比較',
    category: 'ヘアケア',
    date: '2026-09-16',
    description: '夕方の頭皮のニオイや分け目の薄毛感を根本から解消！「女性用薬用スカルプシャンプー」おすすめ10選！低刺激なアミノ酸系洗浄成分と頭皮環境を整える薬用有効成分が、毛穴詰まりをスッキリ洗い流してハリ・コシのある豊かなボリューム髪へ導く人気アイテムを徹底検証。',
    products: fetched.t3,
    lead: `「夕方になると頭皮の皮脂臭や分け目のペタンコ感が目立つ」「髪が細くなってトップのボリュームが出ず老け見えしてしまう」「市販のシャンプーだと洗浄力が強すぎて頭皮が乾燥・フケ・かゆみが出る」……大人女性の髪と頭皮の悩みに特化したのが、**「女性用スカルプシャンプー」**です。

男性用のような脱脂力の強すぎるメントール系とは違い、女性のデリケートな頭皮に寄り添います：
- **濃密アミノ酸系洗浄成分で頭皮の潤いを残しながら酸化皮脂汚れだけを優しくオフ**：必要な皮脂を守りバリア機能を維持することで、皮脂の過剰分泌や乾燥フケを根本予防
- **植物由来の頭皮保湿エキスやケラチン・コラーゲンで根元からハリ・コシ復活**：ドライヤーで乾かした瞬間から髪の根元がふわっと立ち上がり、若々しいふんわりヘアに
- **ノンシリコン＆サルフェートフリー処方で頭皮トラブルをリセット**：毛穴に成分が残留せず、健やかで美しい髪が育つ土台環境をしっかりと育成

今回は楽天市場で育毛・スカルプケア部門1位常連の人気スカルプシャンプー10選を徹底比較します！`
  },
  {
    id: 'art-medical-silicone-toe-separator-foot-care-10sen-2026',
    slug: 'art-medical-silicone-toe-separator-foot-care-10sen-2026',
    title: '【医療用シリコン足指セパレーター10選】外反母趾の痛み・足の疲れを緩和！縮こまった指を広げて血行促進する人気フットケアパッド比較',
    category: 'ボディケア',
    date: '2026-09-16',
    description: '靴の中でギュッと縮こまった足指をパーッと解放！「医療用シリコン足指セパレーター＆外反母趾サポーター」おすすめ10選！ぷにぷにの柔軟ゲルが親指から小指まで心地よく広げ、足裏のアーチを支えて足のむくみや疲れ、外反母趾の痛みを和らげる人気アイテムを徹底解説。',
    products: fetched.t4,
    lead: `「ヒールや先細りの靴、パンプスを長時間履くと親指の付け根が痛む」「足の指が縮こまって足裏が冷えやすく、夕方になると足が重い」「フットネイル（ペディキュア）を塗るときに指同士がくっついて塗りにくい」……足元のバランスと血行を整える名脇役が、**「医療用シリコン足指セパレーター」**です。

素肌に吸い付くような高弾力バイオゲル素材が足指を自然な位置へ補正します：
1. **親指と人差し指の間を適度に広げて外反母趾の圧迫と痛みを軽減**：曲がってしまった親指を正しい骨格ポジションへ誘導し、歩行時の接地バランスを整える
2. **足指をグッと広げることで足先の末梢血管の血流が劇的にアップ**：お風呂上がりやリラックスタイムに装着するだけで足先の冷えやむくみがじんわり解消
3. **水洗い可能でいつでも清潔＆靴下やスニーカーの下に装着できる薄型設計も人気**：目立たず一日中足裏アーチをサポートし、長時間の立ち仕事やウォーキングを快適に

今回は楽天市場で理学療法士や整体師も推奨する人気足指セパレーター10選を徹底比較します！`
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
      title: '選び方ポイント1：機能性と圧力設計・補正力のバランス',
      desc: '着圧の強さ（hPa値）、アミノ酸成分の質、シリコンの柔軟性など、無理なく毎日続けられる最適な設計を選びましょう。'
    },
    {
      title: '選び方ポイント2：素材の通気性と肌への優しさ',
      desc: '就寝時や長時間の着用でも蒸れず痒くならない吸湿速乾メッシュや、アレルギーフリーの医療グレード素材が理想です。'
    },
    {
      title: '選び方ポイント3：お手入れのしやすさと洗濯耐性・耐久性',
      desc: '毎日洗って繰り返し使うアイテムだからこそ、ネットに入れて洗濯機で丸洗いできる耐久性の高いものを選びましょう。'
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
