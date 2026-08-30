import fs from 'fs';
import path from 'path';

console.log('🚀 [Perfect Full Coverage] 残り全クエリの完全一致・徹底網羅生成開始...');

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

const targetDefs = [
  // 1. メイクアップリムーバー たるみ 口コミ
  {
    id: 'art-sachiko-makeup-remover-tarumi-cleansing-review',
    queryTarget: 'メイクアップリムーバー たるみ 口コミ',
    searchKeyword: 'クレンジング 摩擦レス たるみ リムーバー',
    title: '【たるみを防ぐ摩擦レス】メイクアップリムーバーおすすめ10選！目元・毛穴のたるみを作らないクレンジング口コミ比較',
    description: 'クレンジング時のゴシゴシ摩擦がまぶたや頬のたるみの原因に。するんと落ちて肌に負担をかけないおすすめメイクアップリムーバー10選と、たるませない正しい落とし方を徹底解説します。',
    category: 'skincare',
    tags: ['メイクアップリムーバー', 'たるみ対策', '摩擦レスクレンジング', 'クレンジング口コミ', 'ポイントメイクリムーバー', 'たるみ毛穴', 'エイジングクレンジング'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `毎日のメイク落としで強く擦ると、皮膚の薄いまぶたや頬のコラーゲン繊維がダメージを受け、将来のたるみや小ジワの原因になります。ウォータープルーフのアイメイクもこすらずスルンと落とせる摩擦レスなメイクアップリムーバーをご紹介します。`,
    sections: [
      { h: 'たるみを引き起こすクレンジングの間違い', body: `コットンで強く擦る・熱いお湯ですすぐ・時間をかけすぎる行為は肌のたるみを加速させます。専用リムーバーをコットンにたっぷり含ませ、5秒置いてから優しく滑らせるのが基本です。` }
    ],
    faqs: [{ q: '全顔用クレンジングとポイントリムーバーは分けるべき？', a: '目元や口元は皮膚が非常に薄いため、専用のポイントリムーバーで素早く落とすことがたるみ予防の最善手です。' }]
  },

  // 2. ランコム ジェネフィック お得な買い方・キット
  {
    id: 'art-sachiko-lancome-genifique-deal-guide',
    queryTarget: 'ジェネフィック お得 ランコム 定期便 キット',
    searchKeyword: 'ランコム ジェニフィック アドバンスト 美容液',
    title: '【一番安く買う裏ワザ】ランコム ジェニフィックのお得な買い方＆限定キット完全ガイド！最安値比較',
    description: 'ランコムの美肌菌美容液「ジェニフィック アドバンスト」を最安値でお得に購入する方法を徹底解説。楽天公式ショップのポイント高還元デー、限定コフレ、定期お届け便の特典を比較します。',
    category: 'skincare',
    tags: ['ジェネフィックお得', 'ジェニフィックお得', 'ランコムジェニフィック', 'ランコム最安値', 'ジェニフィックキット', '美肌菌美容液', 'デパコスお得'],
    author: '橘 えりか',
    featured: true,
    intro: `肌の回復力を高める名品美容液「ランコム ジェニフィック アドバンスト」。高価格だからこそ絶対に損せずお得に手に入れたい方へ、楽天お買い物マラソンや公式限定キットを活用した最もコスパの良い購入ルートをまとめました。`,
    sections: [
      { h: 'ジェニフィックを最もお得に買う3大ルール', body: `1. **楽天公式ショップのポイント最大20倍還元デーを狙う**\n2. **ミニサイズやシートマスクが無料でついてくる限定キットを選ぶ**\n3. **並行輸入品の正規品保証ショップをチェックする**` }
    ],
    faqs: [{ q: '30mlと50mlどちらがお得ですか？', a: '1mlあたりの単価は50mlや115mlのジャンボサイズの方が大幅にお得です。リピート予定なら大容量がおすすめです。' }]
  },

  // 3. コンシーラー テカリ・ベタつかない・高級崩れない
  {
    id: 'art-sachiko-concealer-tekari-non-greasy-luxury',
    queryTarget: 'コンシーラー テカリ ベタつかない 高級 崩れない',
    searchKeyword: 'コンシーラー テカリ防止 崩れない デパコス',
    title: '【皮脂テカリ・ベタつきゼロ】崩れない高級コンシーラーおすすめ10選！夕方までサラサラ密着キープ比較',
    description: 'Tゾーンや小鼻の皮脂テカリ、脂性肌でもドロドロ崩れないデパコス＆高級コンシーラーおすすめ10選。ベタつかないサラサラ仕上がりと圧倒的カバー力を両立した名品を徹底比較します。',
    category: 'makeup',
    tags: ['コンシーラーテカリ', 'コンシーラーベタつかない', '高級コンシーラー崩れない', 'デパコスコンシーラー', '脂性肌コンシーラー', '密着コンシーラー', 'テカリ防止ベース'],
    author: '松本 結衣',
    featured: true,
    intro: `「コンシーラーを塗った部分だけ皮脂でドロドロに浮いてくる」「油分でベタついて毛穴落ちする」とお悩みの方へ。皮脂吸着パウダーを配合し、塗った瞬間にピタッと密着して一日中テカらない最強コンシーラーを厳選しました。`,
    sections: [
      { h: 'テカらないコンシーラーの選び方と密着テクニック', body: `オイルフリーやパウダーインのリキッドタイプを選び、塗布後はスポンジで余分な油分を吸い取ってからフェイスパウダーを薄く重ねることで、皮脂崩れを鉄壁ガードできます。` }
    ],
    faqs: [{ q: 'スティック型とリキッド型どちらがテカリにくい？', a: '揮発性シリコンや皮脂吸着成分が配合された速乾リキッドタイプが最もテカリにくく崩れに強いです。' }]
  },

  // 4. シーブリーズ 高い理由・効果検証
  {
    id: 'art-sachiko-sea-breeze-price-effects-comparison',
    queryTarget: 'シーブリーズ 高い 効果 デオ＆ウォーター',
    searchKeyword: 'シーブリーズ デオ＆ウォーター 制汗',
    title: '【なぜ値上げ？】シーブリーズは高い？その理由と制汗・ひんやり効果の真相を徹底検証！コスパ比較',
    description: '「シーブリーズが高くなった？」と言われる理由やリニューアルによる成分強化、汗とニオイを抑える制汗効果の持続力を徹底検証。ドラッグストアや楽天での最安値購入法も解説します。',
    category: 'bodycare',
    tags: ['シーブリーズ高い', 'シーブリーズ効果', 'シーブリーズデオウォーター', '制汗剤口コミ', '夏の汗対策', 'ひんやりミスト', 'シーブリーズ最安値'],
    author: 'トレンド編集部',
    featured: true,
    intro: `夏の定番「シーブリーズ デオ＆ウォーター」。「昔より値段が高くなった気がする」という疑問に対し、制汗有効成分の改良やパウダー増量による持続性アップの背景と、他社制汗ローションとのコスパ比較をまとめました。`,
    sections: [
      { h: 'シーブリーズが進化した3つの効果ポイント', body: `1. **持続型サラサラパウダーの増量**：汗をかいても肌がサラサラに保たれる時間が大幅アップ\n2. **薬用殺菌成分（塩化ベンザルコニウム）**：汗のニオイの原因菌を根本殺菌\n3. **ひんやりメントール爽快感**：猛暑の火照った肌を一瞬でクールダウン` }
    ],
    faqs: [{ q: '詰め替え用はありますか？', a: '現在は大容量ボトルやネット通販でのまとめ買いセットが最もコスパ良く購入できます。' }]
  },

  // 5. 毛穴吸引器 人気おすすめ・いちご鼻ケア
  {
    id: 'art-sachiko-keana-suction-device-ranking',
    queryTarget: '毛穴吸引 人気 毛穴吸引器 いちご鼻 角栓',
    searchKeyword: '毛穴吸引器 美顔器 いちご鼻 角栓クリア',
    title: '【いちご鼻の角栓をごっそり】毛穴吸引器おすすめ人気10選！肌を傷めない正しい使い方と効果徹底検証',
    description: '小鼻の頑固な黒ずみや角栓をパワフルに吸引する人気毛穴吸引器おすすめ10選。内出血や赤みを防ぐ正しいスチームの使い方、サロン級の毛穴レス肌を叶える自宅ケアを解説します。',
    category: 'device',
    tags: ['毛穴吸引人気', '毛穴吸引器おすすめ', 'いちご鼻解消', '角栓ケア', '毛穴美顔器', '黒ずみ毛穴', 'スキンケア家電'],
    author: '美容家電スペシャリスト',
    featured: true,
    intro: `クレンジングや洗顔では落ちない頑固な角栓や酸化した黒ずみ。「毛穴吸引器」を使って自宅で安全にごっそり汚れを取り除き、ツルツルの陶器肌を手に入れるための人気モデルと失敗しない使用法をご紹介します。`,
    sections: [
      { h: '内出血させない毛穴吸引の正しいステップ', body: `1. 入浴中またはホットタオルで毛穴をしっかり開く\n2. 吸引ヘッドを一箇所に3秒以上留めず、優しく滑らせる\n3. 吸引後は必ず冷水やビタミンC化粧水で毛穴をキュッと引き締める` }
    ],
    faqs: [{ q: '使用頻度はどのくらいが良いですか？', a: '肌への負担を避けるため、週に1回（頑固な小鼻でも最大週2回）のスペシャルケアが理想です。' }]
  },

  // 6. デコルテ しわ ネックレス・首のシワ＆手の甲シワ改善
  {
    id: 'art-sachiko-neck-decollete-hands-wrinkle-care',
    queryTarget: 'デコルテ しわ ネックレス 手の甲 シワ 改善',
    searchKeyword: '首のシワ デコルテクリーム 手の甲 ハンドクリーム シワ改善',
    title: '【首元・デコルテ・手の甲のシワ改善】おすすめクリーム10選！ネックレスが映える若見えケア徹底比較',
    description: '年齢が出やすいデコルテの横ジワ、ネックレスをつけると目立つ首のシワ、手の甲の血管浮き・小ジワを改善する高機能クリームおすすめ10選。ナイアシンアミドやレチノール配合の人気アイテムを比較します。',
    category: 'skincare',
    tags: ['デコルテしわネックレス', '手の甲シワ改善', '首のシワ改善', 'デコルテクリーム', 'ネッククリーム', 'ハンドセラム', 'エイジングケアパーツ'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `顔は念入りにスキンケアしていても、首元やデコルテ、手の甲のシワで年齢がバレてしまう…そんなお悩みに。皮膚が薄く皮脂腺が少ないパーツ専用に開発された、有効成分配合のシワ改善＆ハリ回復クリームを比較します。`,
    sections: [
      { h: '首・デコルテのシワを撃退する毎日の塗り方', body: `下から上へリンパを流すように手のひら全体で引き上げ、最後に首の後ろから鎖骨へ流します。スマートフォンを見る際の下向き姿勢を正すことも最大のシワ予防です。` }
    ],
    faqs: [{ q: '顔用のアイクリームや美容液を首に使ってもいい？', a: 'もちろん効果的ですが、首やデコルテは面積が広いため大容量で伸びの良いネック専用クリームの方がコスパ高く続けられます。' }]
  },

  // 7. エリクシール レチノパワー リンクルクリーム 最安値 2026
  {
    id: 'art-sachiko-elixir-retinopower-wrinkle-cream-deal-2026',
    queryTarget: 'エリクシール レチノパワー リンクルクリーム 最安値 2026',
    searchKeyword: 'エリクシール レチノパワー リンクルクリーム L 22g',
    title: '【2026年最新最安値】エリクシール レチノパワー リンクルクリームL（22g）のお得な購入先＆本音シワ改善効果レビュー',
    description: '純粋レチノール配合で日本初承認のシワ改善美容液「資生堂 エリクシール レチノパワー リンクルクリーム」の2026年楽天最安値・ポイント還元・偽物の見分け方を徹底検証します。',
    category: 'skincare',
    tags: ['エリクシールレチノパワーリンクルクリーム最安値2026', 'エリクシール最安値', '純粋レチノール', 'シワ改善クリーム', '資生堂リンクルクリーム', 'レチノパワー口コミ'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `目元や口元の深いシワをふっくら押し上げる資生堂の最高傑作「エリクシール レチノパワー リンクルクリーム」。お得なLサイズ（22g）の楽天実売最安値情報と、A反応を出さずに効果を最大化する使い方を解説します。`,
    sections: [
      { h: '純粋レチノールが深いシワに効くメカニズム', body: `ヒアルロン酸を生み出し水分量を増やすことで柔軟な肌へと導き、硬くなった真皮のシワを内側から押し戻します。酸素を通さない特殊チューブ設計で鮮度をキープしています。` }
    ],
    faqs: [{ q: '朝使っても大丈夫ですか？', a: 'レチノールの紫外線劣化を防ぐため、朝使用する場合は必ずSPF30以上の日焼け止めを上から重ねてください。' }]
  },

  // 8. ニベア メンズ 日焼け止め おすすめ
  {
    id: 'art-sachiko-nivea-men-uv-sunscreen-guide',
    queryTarget: '日焼け止め メンズ ニベア テカリ防止 ベタつかない',
    searchKeyword: 'ニベアメン 日焼け止め UV プロテクター',
    title: '【男のテカリ＆日焼け完全ブロック】ニベアメン日焼け止めおすすめ10選！白浮きしない・ベタつかないUVケア比較',
    description: '男性の皮脂テカリを防ぎながら強力な紫外線をカットするニベアメン（NIVEA MEN）の日焼け止め特集。汗に強いウォータープルーフ、洗顔料で落とせるメンズ向け人気UVを徹底比較します。',
    category: 'suncare',
    tags: ['日焼け止めメンズニベア', 'ニベアメンUV', 'メンズ日焼け止めおすすめ', '男のテカリ防止', '白浮きしない日焼け止め', '洗顔オフUV', '男性スキンケア'],
    author: 'メンズ美容班',
    featured: true,
    intro: `「日焼け止め特有のベタつきや白浮きが嫌」「午後になると顔がアブラっぽくテカる」という男性のために。皮脂吸着成分配合でサラサラ肌が持続するニベアメンの最新UVプロテクターを解説します。`,
    sections: [
      { h: '男性がニベアメンUVを選ぶべき理由', body: `ベタつきを極限まで抑えたウォータージェル処方で、ヒゲ剃り後の肌にも優しく馴染みます。毛穴を引き締めながら紫外線によるシミ・老化を予防します。` }
    ],
    faqs: [{ q: 'クレンジングは必要ですか？', a: '普段お使いの洗顔料やボディソープだけで綺麗に落とせます。' }]
  },

  // 9. ブレスラボ マウスウォッシュ 口コミ・口臭評価
  {
    id: 'art-sachiko-breath-labo-mouthwash-review',
    queryTarget: 'ブレスラボ マウスウォッシュ 評価 口コミ 口臭予防',
    searchKeyword: 'ブレスラボ マウスウォッシュ 洗口液 口臭',
    title: '【口臭を元から断つ】ブレスラボ マウスウォッシュの口コミ評価！薬用成分の殺菌力と使い心地を本音レビュー',
    description: '第一三共ヘルスケアが開発した薬用洗口液「ブレスラボ（Breath Labo）」の口コミ・評価を徹底検証。口臭の2大原因（菌と生理的口臭）をダブルブロックする効果と人気フレーバーを比較します。',
    category: 'bodycare',
    tags: ['ブレスラボマウスウォッシュ評価', 'ブレスラボ口コミ', '薬用マウスウォッシュ', '口臭予防洗口液', '第一三共ヘルスケア', 'オーラルケアおすすめ'],
    author: 'ヘルスケア取材班',
    featured: true,
    intro: `マスクを外したときの口臭や朝起きた時のネバつきが気になる方へ。製薬会社の研究から生まれた「ブレスラボ」の殺菌力と爽快感のリアルな口コミ評価をお届けします。`,
    sections: [
      { h: 'ブレスラボが他の洗口液より優れている点', body: `薬用成分CPCと塩化セチルピリジニウムが口臭原因菌を瞬時に殺菌し、抗炎症成分グリチルリチン酸ジカリウムが歯肉炎を防ぎます。アルコールタイプとノンアルコール低刺激タイプから選べます。` }
    ],
    faqs: [{ q: '使った後に水ですすぐ必要はありますか？', a: '有効成分を口腔内にとどめるため、使用後は水ですすがずにそのままにしておくのが最も効果的です。' }]
  },

  // 10. サボリーノ 目ざまシート 朝用マスク 肌荒れ真相
  {
    id: 'art-sachiko-saborino-morning-mask-skin-trouble-truth',
    queryTarget: 'サボリーノ 朝用マスク 肌荒れ 口コミ 目ざまシート',
    searchKeyword: 'サボリーノ 目ざまシート 朝用マスク',
    title: '【60秒で洗顔＋スキンケア】サボリーノ朝用マスクは肌荒れする？口コミの真相と敏感肌向けタイプ徹底比較',
    description: '朝の時短マスクとして定番のサボリーノ（Saborino）目ざまシートの口コミ検証。「アルコールで肌荒れする・ピリピリする？」という噂の真相と、肌質に合った安心の選び方を解説します。',
    category: 'skincare',
    tags: ['サボリーノ朝用マスク肌荒れ口コミ', 'サボリーノ目ざまシート', '朝用シートマスク', '時短スキンケア', '朝マスク肌荒れ', 'プチプラフェイスパック'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `起きてすぐ顔に乗せるだけで「洗顔・スキンケア・保湿下地」が完了するサボリーノ。一部で言われる「メントールが染みる」「肌荒れした」という原因と、刺激レスでしっとり仕上がる最新リニューアル版の魅力を解説します。`,
    sections: [
      { h: '肌荒れを防ぐサボリーノの選び方', body: `敏感肌や乾燥肌の方は、アルコールフリー・メントール無配合の「ボタニカルタイプ」や「高保湿お米タイプ」を選ぶことで、刺激なく朝の潤いチャージが可能です。` }
    ],
    faqs: [{ q: '本当に洗顔しなくて大丈夫ですか？', a: 'リンゴ酸などの角質ケア成分が含まれているため、マスクを剥がす際にサッと拭き取るだけで皮脂や汚れをしっかり除去できます。' }]
  },

  // 11. 2026年秋メイク・秋リップ・ブルベ秋ブラウン
  {
    id: 'art-sachiko-autumn-2026-makeup-lip-trends',
    queryTarget: '2026年秋メイク リップ 秋 プチプラ 口紅 ブルベ 秋 ブラウンリップ 似合う人 ローズ系 血色リップ 赤 リップ 高級',
    searchKeyword: '2026 秋 コスメ リップ トレンド ブルベ イエベ ブラウン',
    title: '【2026年秋メイク完全攻略】秋リップ＆新作コスメおすすめ10選！イエベ・ブルベに似合うブラウン・ローズ・血色リップ比較',
    description: '2026年秋のメイクトレンドを完全網羅。深みのあるブラウンリップ、ブルベ秋に映える上品ローズ、大人の高級赤リップ、ドラッグストアで買えるプチプラ秋コスメまで人気アイテムを徹底比較します。',
    category: 'lip',
    tags: ['2026年秋メイク', '秋リップ2026', '口紅ブルベ秋', 'ブラウンリップ似合う人', '上品リップカラー', 'ローズ系リップ人気', '血色リップ', '赤リップ高級', 'ワインレッドリップ'],
    author: '橘 えりか',
    featured: true,
    intro: `こっくりとした深みと透明感が同居する2026年秋のメイクトレンド。イエベ・ブルベ別の似合うブラウンリップの選び方や、ひと塗りで洗練された表情を作る大人の秋色ルージュを徹底比較します。`,
    sections: [
      { h: 'パーソナルカラー別・秋リップの似合わせ術', body: `- **イエベ秋**：テラコッタ、キャラメルブラウン、ウォームレッド\n- **ブルベ冬・夏**：ワインレッド、プラムローズ、深みチェリーベリー\n- **透け感マット**：重くならず抜け感のある上品な発色が今季のトレンドです。` }
    ],
    faqs: [{ q: 'ブラウンリップが顔色が悪く見えるのを防ぐには？', a: '黄みや赤みがほんのり混ざったシアーな質感を選び、チークに血色感をしっかり仕込むのがポイントです。' }]
  },

  // 12. 肘の黒ずみ・角質ケア
  {
    id: 'art-sachiko-elbow-dark-spots-smooth-skin-guide',
    queryTarget: '肘 きれい 肘の黒ずみ 角質ケア クリーム',
    searchKeyword: 'ひじ 黒ずみ ピーリング クリーム 美白',
    title: '【ひじの黒ずみ・ガサガサ解消】肘をきれいにするおすすめボディケア10選！つるすべ透明肌をつくる角質＆美白ケア',
    description: '半袖やノースリーブで目立つ「肘（ひじ）の黒ずみ・ザラつき」を根本からきれいにするおすすめケア10選。尿素配合クリームやスクラブピーリングで柔らかな明るい肘を取り戻す方法を解説します。',
    category: 'bodycare',
    tags: ['肘きれい', 'ひじの黒ずみ', '肘の角質ケア', 'ボディスクラブ', '尿素クリーム', '黒ずみ解消', 'つるすべ肌'],
    author: '佐々木 遥',
    featured: true,
    intro: `机に肘をつく癖や摩擦で黒ずみ・ゴワつきが溜まりやすい肘の皮膚。古い角質をやさしくオフして高保湿＆美白成分を浸透させる、つるんとキレイな肘をつくるケアアイテムをご紹介します。`,
    sections: [
      { h: '肘をきれいにする3ステップ', body: `1. 湯船で角質をふやかす\n2. 細かいボディスクラブで優しくなでる\n3. お風呂上がりに尿素またはセラミドクリームをすり込む` }
    ],
    faqs: [{ q: '軽石でこすってもいいですか？', a: '軽石などの強い摩擦は肌を守ろうとして逆に皮膚を厚く黒くするため、マイルドなスクラブやクリームをご使用ください。' }]
  },

  // 13. 指原莉乃プロデュース Ririmew（リリミュウ）コスメ完全網羅
  {
    id: 'art-sachiko-sashihara-ririmew-complete-ranking',
    queryTarget: '指原莉乃コスメ 指原莉乃 コスメ Ririmew リリミュウ',
    searchKeyword: '指原莉乃 コスメ Ririmew リリミュウ',
    title: '【さっしー買い必至】指原莉乃プロデュースコスメ「Ririmew（リリミュウ）」おすすめ人気10選！アイシャドウ・ティント全色比較',
    description: '指原莉乃さん完全プロデュースで話題の「Ririmew（リリミュウ）」人気コスメランキング。バズりアイシャドウパレット、落ちないミューテッドシアーティント、透明感チークを徹底レビューします。',
    category: 'makeup',
    tags: ['指原莉乃コスメ', '指原莉乃プロデュース', 'Ririmew', 'リリミュウ', 'センシュアルフィックスティント', 'インザミラーアイパレット', 'さっしーコスメ'],
    author: 'トレンド編集部',
    featured: true,
    intro: `コスメ愛好家としても名高い指原莉乃さんがこだわり抜いて開発した「Ririmew（リリミュウ）」。捨て色なしの絶妙カラーとデパコス級の粉質でプロからも絶賛される名品を一挙に紹介します。`,
    sections: [
      { h: 'Ririmewの絶対買うべき神アイテムTOP3', body: `1. **インザミラーアイパレット**：計算された光と影で自然な立体アイを作る\n2. **センシュアルフィックスティント**：濃密発色とツヤが続く落ちないリップ\n3. **トーンアップカラープライマー**：黄ぐすみや赤みをコントロールする透明感下地` }
    ],
    faqs: [{ q: '初心者でも使いやすいカラーは？', a: 'アイパレットの「01 オレンジアーモンド」やティントの「01 カーディナルローズ」が肌馴染み抜群でおすすめです。' }]
  },

  // 14. 20代向けリキッド＆クッションファンデ・口紅
  {
    id: 'art-sachiko-20s-cushion-liquid-lipstick-best',
    queryTarget: 'クッションファンデーション おすすめ 20代 20代 リキッドファンデーション おすすめ 20代 口紅 人気 おすすめ',
    searchKeyword: '20代 クッションファンデ リキッドファンデ 口紅 人気',
    title: '【20代女子が本当に選ぶ】クッション＆リキッドファンデーション＆人気口紅おすすめ10選！崩れない・垢抜けリップ比較',
    description: '20代のトレンド肌をつくる人気クッションファンデ・高密着リキッドファンデ・落ちない人気口紅を総まとめ。毛穴レスな素肌感と、ひと塗りで今っぽ顔になれるリップを徹底比較します。',
    category: 'makeup',
    tags: ['クッションファンデーションおすすめ20代', '20代リキッドファンデーションおすすめ', '20代口紅人気', '20代口紅おすすめ', '素肌感ベース', '落ちないリップ20代', 'トレンドメイク'],
    author: '松本 結衣',
    featured: true,
    intro: `学校やオフィス、デートにも大活躍！薄膜で毛穴をカバーするクッション＆リキッドファンデーションと、血色感をキープする20代大人気のベストコスメを一挙に比較します。`,
    sections: [
      { h: '20代が押さえるべきベース＆リップの黄金バランス', body: `ベースは素肌感を活かしたセミグロウに仕上げ、リップは粘膜カラーのティントにほんのりツヤを重ねるのが最も垢抜ける今季の黄金比です。` }
    ],
    faqs: [{ q: 'プチプラでもデパコス並みに持ちますか？', a: '最近の韓国コスメや日本のプチプラは皮脂吸着・密着ポリマー技術が進化しており、デパコスに匹敵するキープ力を持っています。' }]
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

  for (const def of targetDefs) {
    console.log(`\n🔍 [処理中] ${def.id}`);
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

  // 既存記事のタグ・タイトル・キーワード網羅性の肉付け補正
  console.log("\n🛠️ [既存記事のキーワード肉付け補正中...]");
  articlesData.forEach(a => {
    if (!a.tags) a.tags = [];
    // クエリに関連するタグの網羅追加
    if (a.id && a.id.includes('avene')) {
      if (!a.tags.includes('アベンヌウォーター効果ない')) a.tags.push('アベンヌウォーター効果ない', 'アベンヌ汗疹', 'アベンヌウォーターニキビ悪化');
    }
    if (a.id && a.id.includes('reedle')) {
      if (!a.tags.includes('リードルショット100効果')) a.tags.push('リードルショット100効果', 'リードルショット効果', 'リードルショット効果なし', 'リードルショット老ける');
    }
    if (a.id && (a.id.includes('eyeshadow-base') || a.id.includes('eye-base'))) {
      if (!a.tags.includes('アイメイク用下地')) a.tags.push('アイメイク用下地', 'アイ下地', 'アイシャドウが夕方に二重の溝に溜まる。発色を長持ちさせるには？');
    }
    if (a.id && a.id.includes('curel')) {
      if (!a.tags.includes('キュレル皮脂トラブルケア保湿ジェル')) a.tags.push('キュレル皮脂トラブルケア保湿ジェル', 'キュレル皮脂トラブルケア保湿ジェル120ml');
    }
    if (a.id && (a.id.includes('scalp') || a.id.includes('touhi') || a.id.includes('uv-spray'))) {
      if (!a.tags.includes('頭皮の日焼け止めスプレー')) a.tags.push('頭皮の日焼け止めスプレー', '頭皮日焼け止めスプレー', '日焼け止めスプレー頭皮');
    }
    if (a.id && a.id.includes('megumi')) {
      if (!a.tags.includes('megumi愛用化粧品')) a.tags.push('megumi愛用化粧品', 'megumi愛用');
    }
    if (a.id && a.id.includes('lancome') && a.id.includes('foundation')) {
      if (!a.tags.includes('ランコムファンデーション成分')) a.tags.push('ランコムファンデーション成分', 'タンイドルウルトラウェア');
    }
    if (a.id && a.id.includes('cezanne') && (a.id.includes('palette') || a.id.includes('concealer'))) {
      if (!a.tags.includes('セザンヌパレットコンシーラーハイカバー')) a.tags.push('セザンヌパレットコンシーラーハイカバー');
    }
    if (a.id && a.id.includes('innisfree') && a.id.includes('primer')) {
      if (!a.tags.includes('イニスフリーノーセバムブラープライマー')) a.tags.push('イニスフリーノーセバムブラープライマー', 'innisfreeノーセバムブラープライマー25ml');
    }
    if (a.id && a.id.includes('browlash')) {
      if (!a.tags.includes('ブロウラッシュexブロウコーティングr')) a.tags.push('ブロウラッシュexブロウコーティングr');
    }
    if (a.id && (a.id.includes('giselle') || a.id.includes('senka'))) {
      if (!a.tags.includes('ジゼル洗顔')) a.tags.push('ジゼル洗顔', '専科ジゼル');
    }
    if (a.id && (a.id.includes('jin') || a.id.includes('laneige'))) {
      if (!a.tags.includes('ジン化粧品ラネージュ')) a.tags.push('ジン化粧品ラネージュ', 'ラネージュjin', 'ジンヘアーインプレッション美容院');
    }
    if (a.id && (a.id.includes('illit') || a.id.includes('wonhee'))) {
      if (!a.tags.includes('illit化粧品')) a.tags.push('illit化粧品', 'アイリット化粧品', 'illitリップ');
    }
    if (a.id && (a.id.includes('sanrio') || a.id.includes('cinnamon'))) {
      if (!a.tags.includes('シナモンコラボ化粧品2026')) a.tags.push('シナモンコラボ化粧品2026', 'サンリオコラボコスメ2026');
    }
  });

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
  console.log(`\n🎉 [完全網羅完了] 新規作成: ${createdCount}件, 更新: ${updatedCount}件 (総記事数: ${articlesData.length}件)`);
}

main().catch(e => { console.error('❌ エラー:', e); process.exit(1); });
