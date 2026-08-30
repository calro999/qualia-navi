import fs from 'fs';
import path from 'path';

console.log('🚀 [Natural Peripheral Expansion Batch 3] 自然な検索動線・超実用特化10選記事生成開始...');

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

async function fetchRakutenItems(keyword, hits = 10, maxRetries = 3) {
  let cleanKw = keyword.replace(/【.*?】/g, '').replace(/（.*?）/g, '').replace(/\(.*?\)/g, '').trim();
  if (cleanKw.length > 40) cleanKw = cleanKw.slice(0, 40);
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent(cleanKw)}&format=json&hits=${hits}&sort=-reviewCount&imageFlag=1`;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url);
      if (res.status === 429) { await new Promise(r => setTimeout(r, 2000)); continue; }
      if (!res.ok) return [];
      const data = await res.json();
      if (!data.Items || data.Items.length === 0) return [];
      return data.Items.map(e => {
        const item = e.Item || e;
        let img = item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '';
        if (img.includes('thumbnail.image.rakuten.co.jp/@0_mall/')) img = img.replace('https://thumbnail.image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/').split('?_ex=')[0];
        else if (img.includes('tshop.r10s.jp/')) img = img.replace('https://tshop.r10s.jp/', 'https://shop.r10s.jp/');
        return {
          itemName: item.itemName || '',
          shopName: item.shopName || '',
          affiliateUrl: item.affiliateUrl || '',
          imageUrl: img,
          price: item.itemPrice ? `${item.itemPrice.toLocaleString()}円 (税込)` : '',
          priceNum: item.itemPrice || 0,
          reviewAvg: item.reviewAverage || 4.5,
          reviewCount: item.reviewCount || 0,
          catchcopy: item.catchcopy || ''
        };
      }).filter(p => p.affiliateUrl && p.imageUrl);
    } catch (e) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return [];
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const batch3Defs = [
  // 21. スティック型日焼け止め・UVスティック（日焼け止めスプレー周辺・塗り直し）
  {
    id: 'art-peri-uv-stick-sunscreen-touch-up-2026',
    queryTarget: '日焼け止め スティック UVスティック 手が汚れない メイクの上から 塗り直し 韓国 プチプラ',
    searchKeyword: '日焼け止め スティック UVスティック 塗り直し',
    title: '【手を汚さずメイクの上から塗り直せる】日焼け止めスティックおすすめ人気10選！サラサラ＆白浮きなしUV比較',
    description: '外出先でのUV塗り直しに大活躍の「日焼け止めスティック（UVバーム）」おすすめ10選。メイクの上から直接塗ってもファンデが崩れず、サラサラ質感が続く韓国・日本のおすすめを徹底比較します。',
    category: 'suncare',
    tags: ['日焼け止めスティック', 'UVスティック', 'メイクの上から塗り直し', '手を汚さない日焼け止め', '韓国UVスティック', 'サラサラ日焼け止め', '日焼け止め塗り直し'],
    author: '橘 えりか',
    featured: true,
    intro: `「日焼け止めの塗り直しで手がベタつくのが嫌」「メイクの上から塗るとファンデがヨレる」という悩みを一挙に解決するUVスティック。直接肌に滑らせるだけで透明に密着し、Tゾーンのテカリも抑える人気アイテムを比較します。`,
    sections: [
      { h: 'メイクの上から崩さず塗り直すテクニック', body: `ティッシュで軽く皮脂を押さえてから、スティックを肌に強く押し付けず、優しくなでるように滑らせます。首の後ろや耳、手の甲のUV対策にも最適です。` }
    ],
    faqs: [{ q: 'ファンデーションの色がスティックにつきませんか？', a: '使用後にティッシュでスティックの表面をサッと拭き取れば、常に清潔な状態を保てます。' }]
  },

  // 22. 夜用リップマスク・リップスリーピングマスク（リップケア周辺）
  {
    id: 'art-peri-lip-sleeping-mask-night-care-2026',
    queryTarget: 'リップ スリーピングマスク 夜用 リップケア 唇の縦ジワ 乾燥 皮剥け ラネージュ',
    searchKeyword: 'リップ スリーピングマスク ラネージュ 夜用 リップ',
    title: '【翌朝ぷるんとした赤ちゃん唇】リップスリーピングマスクおすすめ人気10選！ラネージュ等の夜用高保湿ケア比較',
    description: '寝ている間に濃厚な保湿成分が唇を集中トリートメントする「夜用リップスリーピングマスク」10選。翌朝の皮剥けや縦ジワをリセットし、口紅のノリを劇的に向上させる名品を徹底比較します。',
    category: 'lip',
    tags: ['リップスリーピングマスク', '夜用リップケア', 'ラネージュリップマスク', '唇の縦ジワケア', '唇の皮剥け改善', 'リップバームおすすめ', 'ナイトリップケア'],
    author: '橘 えりか',
    featured: true,
    intro: `エアコン乾燥やティントの使用でカサついた唇に。就寝前にたっぷり塗るだけで、古い角質をやわらげて翌朝ふっくら弾むような美唇へ導く人気リップマスクを厳選しました。`,
    sections: [
      { h: '一般的なリップクリームとの違い', body: `リップクリームよりも油膜の密着力と抗酸化ベリーエキスなどの美容成分濃度が高く、寝返りの摩擦でも剥がれずに一晩中潤いを密封し続けます。` }
    ],
    faqs: [{ q: '日中のリップ下地としても使えますか？', a: 'ごく少量を薄く塗れば日中の高保湿リップバームとしても非常に優秀です。' }]
  },

  // 23. 前髪キープミスト・ヘアキープスプレー（前髪アホ毛周辺・湿気対策）
  {
    id: 'art-peri-bangs-keep-mist-spray-humidity-2026',
    queryTarget: '前髪 キープ スプレー ミスト 束感 固まらない 湿気 雨の日 パリパリしない ケープ',
    searchKeyword: '前髪 キープ スプレー ミスト 固まらない',
    title: '【雨の日も風でも崩れない】前髪キープミスト＆スプレーおすすめ人気10選！パリパリに固まらない自然な束感比較',
    description: '湿気や汗、強風でも理想の前髪を一日中キープするおすすめスプレー＆ミスト10選。白く固まらず、透け感のあるシースルーバングや立ち上げ前髪を自然にロックする名品を徹底比較。',
    category: 'haircare',
    tags: ['前髪キープスプレー', '前髪キープミスト', 'シースルーバングキープ', '前髪崩れない', '雨の日の前髪', '固まらないヘアスプレー', '湿気対策ヘア'],
    author: '佐々木 遥',
    featured: true,
    intro: `「朝せっかくアイロンで巻いた前髪が、湿気や汗でペタッと割れてしまう」というお悩みへ。バリバリに固めず、手触りは柔らかいのに形を形状記憶する最新前髪キープコスメをご紹介します。`,
    sections: [
      { h: '崩れない前髪を作る3ステップ', body: `1. コームに直接スプレーを吹きかけて前髪をとかす\n2. 前髪の内側（根元付近）に軽くひと吹きする\n3. おでこにフェイスパウダーを仕込んで皮脂をブロックする` }
    ],
    faqs: [{ q: 'おでこにスプレーがつくと肌荒れしませんか？', a: 'コームに吹きかけて塗布する方法なら、おでこの皮膚に直接スプレー液がつかず肌荒れを防げます。' }]
  },

  // 24. CICA（ツボクサエキス）シカクリーム 鎮静ケア（肌荒れ・アベンヌ・リードル周辺）
  {
    id: 'art-peri-cica-cream-skin-calming-ranking-2026',
    queryTarget: 'シカクリーム CICA おすすめ 鎮静 ニキビ 肌荒れ 赤み 韓国 VT ドクタージャルト',
    searchKeyword: 'シカクリーム CICA 鎮静 肌荒れ VT',
    title: '【繰り返す肌荒れ・赤みを鎮静】CICA（シカ）クリームおすすめ人気10選！VT・ドクタージャルト等の効果比較',
    description: 'マスク荒れ、ニキビの赤み、日焼け後の火照りを素早く落ち着かせる人気シカクリーム10選。ツボクサエキス（CICA）の配合濃度、ベタつかないジェルタイプと高保湿バームタイプの使い分けを解説。',
    category: 'skincare',
    tags: ['シカクリーム', 'CICAクリームおすすめ', 'VTシカクリーム', 'ドクタージャルトシカペア', '肌荒れ鎮静', '赤みケア', '韓国スキンケア'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `韓国スキンケアの代名詞となった「CICA（シカ）」。肌のターンオーバーを整え、炎症を抑えるツボクサ由来成分が、ゆらぎやすい敏感肌を健やかに保護するベストバイを比較します。`,
    sections: [
      { h: '肌質に合わせたシカコスメの選び方', body: `- **脂性肌・ニキビ肌**：油分控えめでみずみずしいシカジェルクリーム\n- **乾燥肌・バリア低下肌**：セラミドやシアバターがブレンドされた高密着シカバーム` }
    ],
    faqs: [{ q: 'ニキビができている患部に直接塗っても大丈夫？', a: '抗炎症作用があるためニキビの上からでも使用できますが、擦らず優しく乗せるように塗布してください。' }]
  },

  // 25. クマ・くすみ飛ばし ハイライト（コンシーラー・ベースメイク周辺）
  {
    id: 'art-peri-highlighter-kuma-glow-ranking-2026',
    queryTarget: 'ハイライト クマ消し くすみ飛ばし ツヤ肌 スティック パウダー プチプラ デパコス セザンヌ シャネル',
    searchKeyword: 'ハイライト ツヤ肌 クマ くすみ飛ばし スティック パウダー',
    title: '【光で影とくすみを消す】ハイライトおすすめ人気10選！目元のクマ消し＆内側発光ツヤ肌比較',
    description: 'コンシーラーだけでは隠しきれない頑固なクマやほうれい線の影を光の反射で飛ばすハイライト10選。ギラつかない上品な濡れツヤスティックと、透明感を引き出す微粒子パウダーを徹底比較。',
    category: 'makeup',
    tags: ['ハイライトおすすめ', 'クマ消しハイライト', 'くすみ飛ばし', '濡れツヤハイライト', 'スティックハイライト', 'プチプラハイライト', '立体感メイク'],
    author: '松本 結衣',
    featured: true,
    intro: `厚塗りにならずに若々しいハリと透明感を演出する「ハイライト」。目頭のくぼみや頬骨の上、Cゾーンに乗せるだけで顔全体のくすみを一掃する神アイテムを比較します。`,
    sections: [
      { h: '失敗しないハイライトの黄金配置ポイント', body: `1. **目頭の「く」の字**：白目をクリアに見せて透明感UP\n2. **目尻下の三角ゾーン**：クマの影を光で打ち消す\n3. **鼻根と鼻先**：自然な立体感と小顔効果` }
    ],
    faqs: [{ q: '毛穴が目立ってしまう場合の対処法は？', a: '大粒ラメは避け、肌に溶け込むパール粒子が細かいものやバームタイプを選ぶと毛穴が悪目立ちしません。' }]
  },

  // 26. レチノール初心者向け スキンケア（エリクシール・リードル周辺）
  {
    id: 'art-peri-retinol-beginner-skincare-guide-2026',
    queryTarget: 'レチノール 初心者 使い方 A反応 順番 おすすめ プチプラ 韓国 イニスフリー エリクシール',
    searchKeyword: 'レチノール 初心者 美容液 クリーム 低刺激',
    title: '【A反応を出さない】初心者向けレチノールスキンケアおすすめ10選！皮剥けしない低刺激アイテムと正しい使い方',
    description: '毛穴の引き締めやキメ改善、ハリ感アップで話題のレチノールを初めて使う方向けの入門ガイド。赤みや皮剥け（A反応）を防ぐ濃度選び、使う順番、肌慣らしステップを徹底解説します。',
    category: 'skincare',
    tags: ['レチノール初心者', '低刺激レチノール', 'イニスフリーレチノールシカ', 'A反応対策', '毛穴レチノール', 'シワ改善入門', 'レチノール使い方'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `「レチノールを使ってみたいけれど、皮剥けや赤みが怖い」というビギナーへ。シカ成分やヒアルロン酸と組み合わせたマイルドな低濃度レチノール美容液と、失敗しないステップをご紹介します。`,
    sections: [
      { h: '初心者が守るべきレチノール導入の3大ルール', body: `1. **最初の2週間は2〜3日に1回、夜のみ使用する**\n2. **化粧水・乳液で肌をしっかり保湿した後に重ねる（バッファリング）**\n3. **翌朝は必ず日焼け止めを塗る**` }
    ],
    faqs: [{ q: '首にも使って大丈夫ですか？', a: '首の皮膚は顔よりも薄くA反応が出やすいため、まずはフェイスラインで慣らしてから少量ずつ試してください。' }]
  },

  // 27. 眉マスカラ 自眉の黒さを消す 脱色風（アイブロウコート周辺）
  {
    id: 'art-peri-eyebrow-mascara-bleach-effect-2026',
    queryTarget: '眉マスカラ 黒眉消し 脱色風 垢抜け ふんわり プチプラ ロムアンド ヘビーローテーション',
    searchKeyword: '眉マスカラ 脱色風 黒眉 垢抜け プチプラ',
    title: '【塗るだけで脱色級の垢抜け眉】眉マスカラおすすめ人気10選！自眉の黒さをしっかり消す高発色比較',
    description: '剛毛・黒眉でも自眉の存在感をやわらげ、ふんわり色素薄い系の垢抜け眉をつくる眉マスカラ10選。地肌につかない極細ブラシや、パリパリに固まらない人気プチプラアイテムを徹底比較。',
    category: 'makeup',
    tags: ['眉マスカラ脱色風', '黒眉消し', '垢抜け眉マスカラ', 'ロムアンド眉マスカラ', 'ヘビーローテーション眉マスカラ', 'ふんわり眉', 'プチプラアイブロウ'],
    author: '松本 結衣',
    featured: true,
    intro: `眉メイクの印象をガラリと変える「眉マスカラ」。自眉の黒さをカバーして髪色やアイメイクとトーンを合わせることで、一気に洗練された今っぽ顔になれるベストアイテムをご紹介します。`,
    sections: [
      { h: '地肌につかない綺麗な眉マスカラの塗り方', body: `まず毛流れに逆らって眉尻から眉頭に向かって毛の裏側に液を絡ませ、次に眉頭から眉尻へ毛流れを整えるようにとかすと、ムラなく均一に染まります。` }
    ],
    faqs: [{ q: '黒髪に合う眉マスカラの色は？', a: 'アッシュグレーやオリーブブラウン、シアーグレージュを選ぶと、自眉の重さが抜けて自然な透明感が出ます。' }]
  },

  // 28. ナイアシンアミド 美容液・化粧水（シミ・シワ・美白周辺）
  {
    id: 'art-peri-niacinamide-serum-lotion-ranking-2026',
    queryTarget: 'ナイアシンアミド 美容液 化粧水 シワ改善 美白 プチプラ デパコス 敏感肌',
    searchKeyword: 'ナイアシンアミド 美容液 化粧水 シワ 美白',
    title: '【シワ改善と美白を一本で両立】ナイアシンアミド配合スキンケアおすすめ10選！敏感肌でも使える万能成分比較',
    description: 'コラーゲン産生によるシワ改善と、メラニン転送をブロックする美白効果を併せ持つ「ナイアシンアミド」配合の美容液＆化粧水10選。低刺激で朝晩使える実力派アイテムを徹底比較します。',
    category: 'skincare',
    tags: ['ナイアシンアミド美容液', 'ナイアシンアミド化粧水', 'シワ改善美白', '敏感肌エイジングケア', 'プチプラナイアシンアミド', 'コラーゲンケア', '美白スキンケア'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `レチノールやビタミンCよりも肌刺激が少なく、乾燥肌や敏感肌でも毎日安心してエイジングケアができる「ナイアシンアミド（ビタミンB3）」。肌のバリア機能を高めながらクリアなハリ肌へと導く名品を比較します。`,
    sections: [
      { h: 'ナイアシンアミドが支持される理由', body: `1. **朝晩いつでも使えて紫外線や光の影響を受けない**\n2. **セラミド合成を促し肌自体の保水力をアップさせる**\n3. **毛穴の引き締めと皮脂バランス調整効果**` }
    ],
    faqs: [{ q: 'レチノールやビタミンCと一緒に使ってもいい？', a: 'ナイアシンアミドは他の美容成分と非常に相性が良く、併用することで互いのスキンケア効果を高め合います。' }]
  },

  // 29. 導入美容液・ブースターセラム（スキンケア浸透・角質柔軟）
  {
    id: 'art-peri-booster-serum-penetration-ranking-2026',
    queryTarget: '導入美容液 ブースター 化粧水が入らない ゴワつき 角質ケア コスメデコルテ ソフィーナ',
    searchKeyword: '導入美容液 ブースターセラム 浸透 毛穴 角質柔軟',
    title: '【化粧水がぐんぐん浸透する】導入美容液・ブースターおすすめ人気10選！肌のゴワつきをほぐす名品比較',
    description: '「化粧水が肌表面で弾いて入っていかない」という大人の肌のゴワつきを柔らかくほぐし、潤いの通り道を作る導入美容液おすすめ10選。オイルインやマイクロカプセル技術の人気セラムを徹底比較。',
    category: 'skincare',
    tags: ['導入美容液おすすめ', 'ブースターセラム', '化粧水浸透', '角質柔軟美容液', 'コスメデコルテリポソーム', 'スキンケアブースター', 'インナードライ対策'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `紫外線ダメージやターンオーバーの乱れで硬くなった角層。「洗顔後すぐのファーストステップ」に仕込むだけで、その後の化粧水や美容液の吸い込みが格段に変わる神ブースターをご紹介します。`,
    sections: [
      { h: '導入美容液のタイプ別特徴', body: `- **リポソーム・カプセル型**：超微粒子カプセルが角層深くまで潤いを届ける\n- **角質ケア・ピーリング型**：不要な古い角質をやさしくオフしてなめらかにする\n- **オイルインブースター型**：硬くなった肌の油分バランスを整え柔らかくほぐす` }
    ],
    faqs: [{ q: 'シートマスクの前に使ってもいい？', a: '洗顔直後、シートマスクの前に導入美容液を塗布しておくと、シートマスクの美容液成分がより深く浸透します。' }]
  },

  // 30. ウォータープルーフ アイライナー 滲まない（アイメイク・パンダ目防止周辺）
  {
    id: 'art-peri-waterproof-eyeliner-smudgeproof-2026',
    queryTarget: 'アイライナー 滲まない ウォータープルーフ 落ちない パンダ目にならない リキッド ジェル プチプラ',
    searchKeyword: 'アイライナー 滲まない ウォータープルーフ リキッド ジェル',
    title: '【涙・皮脂でも絶対に滲まない】ウォータープルーフアイライナーおすすめ人気10選！パンダ目ゼロのリキッド＆ジェル比較',
    description: '夕方になると目尻が黒く滲む・パンダ目になる悩みを解消する最強アイライナー10選。速乾密着フィルム処方で、涙・汗・まばたきの摩擦に負けない極細リキッド＆とろけるジェルを徹底比較します。',
    category: 'makeup',
    tags: ['アイライナー滲まない', 'ウォータープルーフアイライナー', 'パンダ目防止', '落ちないアイライナー', 'ラブライナー', 'キャンメイククリーミータッチライナー', 'プチプラアイライナー'],
    author: '松本 結衣',
    featured: true,
    intro: `涙目になりやすい方や奥二重・一重まぶたで「アイラインが下まぶたに転写してしまう」とお悩みの方へ。描いた瞬間ピタッと定着し、夜のクレンジングまでクッキリ美ラインが続く名品をご紹介します。`,
    sections: [
      { h: 'アイラインを滲ませないための仕込みテクニック', body: `アイラインを引く前に、目のキワやまつ毛の生え際の油分を綿棒で軽く拭き取り、フェイスパウダーを薄く乗せておくことで密着度が格段にアップします。` }
    ],
    faqs: [{ q: '初心者でもガタつかずに引けるタイプは？', a: '0.1mm以下の極細筆リキッドや、力を入れずにとろけるように描ける1.5mm極細ジェルライナーがおすすめです。' }]
  }
];

async function buildContent(def, products) {
  const top10 = products.slice(0, 10);
  const today = '2026-08-31';

  let table = `| 順位 | 商品名 | 価格帯 | 特徴・おすすめポイント | リンク |\n|:---:|:---|:---:|:---|:---:|\n`;
  top10.forEach((p, idx) => {
    const rank = idx + 1;
    const shortName = p.itemName.slice(0, 32).replace(/[|\[\]]/g, ' ');
    table += `| **${rank}位** | **${shortName}** | ${p.price || '価格確認'} | ${p.catchcopy ? p.catchcopy.slice(0, 26) : '高評価・リピート多数'} | [楽天市場で見る](${p.affiliateUrl}) |\n`;
  });

  let productsHtml = '';
  top10.forEach((p, idx) => {
    const rank = idx + 1;
    const cleanName = p.itemName.replace(/[<>"']/g, '');
    productsHtml += `
---

### 👑 第${rank}位：${cleanName}

<div class="product-card">
  <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: center; margin: 16px 0;">
    <img src="${p.imageUrl}" alt="${cleanName}" style="max-width: 200px; height: auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
    <div style="flex: 1; min-width: 240px;">
      <p style="font-size: 1.25rem; font-weight: bold; color: #e11d48; margin-bottom: 8px;">実売価格: ${p.price || 'ショップ価格を参照'}</p>
      <p style="font-size: 0.95rem; color: #475569; margin-bottom: 12px;"><strong>取扱ショップ:</strong> ${p.shopName} (★${p.reviewAvg} / レビュー${p.reviewCount}件)</p>
      <a href="${p.affiliateUrl}" target="_blank" rel="nofollow noopener noreferrer" style="display: inline-block; background: #bf1e2e; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 14px rgba(191,30,46,0.35);">楽天市場で最安値・ポイント還元をチェック ❯</a>
    </div>
  </div>
  <p style="color: #334155; line-height: 1.7; margin-top: 12px;">${p.catchcopy ? `<strong>【特徴】</strong> ${p.catchcopy}` : `楽天市場で高い支持を集める人気定番アイテム。実力派の使い心地と高評価レビューが証明する確かなクオリティです。`}</p>
</div>
`;
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": def.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": def.title,
    "description": def.description,
    "numberOfItems": top10.length,
    "itemListElement": top10.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": p.itemName.slice(0, 80),
      "url": p.affiliateUrl
    }))
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": def.title,
    "description": def.description,
    "author": { "@type": "Person", "name": def.author },
    "datePublished": today,
    "dateModified": today,
    "publisher": { "@type": "Organization", "name": "Qualia Navi" }
  };

  let sectionsHtml = '';
  def.sections.forEach(s => {
    sectionsHtml += `\n---\n\n## 📌 ${s.h}\n\n${s.body}\n`;
  });

  let faqHtml = `\n---\n\n## ❓ よくある質問（FAQ）\n\n`;
  def.faqs.forEach(f => {
    faqHtml += `### Q. ${f.q}\n**A.** ${f.a}\n\n`;
  });

  return `# ${def.title}

${def.intro}

---

## 📱 【比較表】${def.queryTarget} おすすめ人気10選 一覧

${table}

${productsHtml}

${sectionsHtml}

${faqHtml}

---

## 🎯 まとめ

本記事では「${def.queryTarget}」をテーマに、楽天市場の実売データと口コミに基づいた**本当におすすめできる10選**をご紹介しました。

ご自身の肌質やお悩みに合わせた最適なアイテムを選ぶことで、毎日のメイクやスキンケアの満足度は劇的に向上します。ぜひ気になったアイテムから試してみてください。

---

<script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
</script>

<script type="application/ld+json">
${JSON.stringify(listSchema, null, 2)}
</script>

<script type="application/ld+json">
${JSON.stringify(faqSchema, null, 2)}
</script>
`;
}

async function main() {
  const existingMap = new Map(articlesData.map((a, i) => [a.id, i]));
  let updatedCount = 0;
  let createdCount = 0;

  for (const def of batch3Defs) {
    console.log(`\n🔍 [第3弾 自然な周辺クエリ記事生成] ${def.id}`);
    console.log(`   クエリ: ${def.queryTarget} | KW: ${def.searchKeyword}`);

    let products = await fetchRakutenItems(def.searchKeyword, 12);
    if (products.length === 0) {
      console.warn(`⚠️ 商品取得0件のため代替KWで再試行`);
      await sleep(1000);
      products = await fetchRakutenItems(def.queryTarget.split(' ')[0], 12);
    }

    if (products.length === 0) {
      console.error(`❌ 商品取得失敗 スキップ: ${def.id}`);
      continue;
    }

    console.log(`✅ 商品${products.length}件取得完了`);
    const content = await buildContent(def, products);
    const top10 = products.slice(0, 10);

    const articleObj = {
      id: def.id,
      title: def.title,
      description: def.description,
      content,
      category: def.category,
      tags: def.tags,
      author: def.author,
      createdAt: '2026-08-31',
      updatedAt: '2026-08-31',
      image: top10[0]?.imageUrl || '',
      affiliateUrl: top10[0]?.affiliateUrl || '',
      price: top10[0]?.price || '',
      itemCount: top10.length,
      featured: def.featured
    };

    if (existingMap.has(def.id)) {
      const idx = existingMap.get(def.id);
      articlesData[idx] = articleObj;
      console.log(`🔄 [既存記事を徹底更新] ${def.title.slice(0, 40)}...`);
      updatedCount++;
    } else {
      articlesData.unshift(articleObj);
      console.log(`✨ [新規特化記事を追加] ${def.title.slice(0, 40)}...`);
      createdCount++;
    }
    await sleep(1200);
  }

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
  console.log(`\n🎉 [第3弾 自然な周辺クエリ拡張完了] 新規作成: ${createdCount}件, 更新: ${updatedCount}件 (総記事数: ${articlesData.length}件)`);
}

main().catch(e => { console.error('❌ エラー:', e); process.exit(1); });
