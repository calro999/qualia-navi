import fs from 'fs';
import path from 'path';

console.log('🚀 [Natural Peripheral Expansion Batch 6] 季節＆実力派美容特化10選記事生成開始...');

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

const batch6Defs = [
  // 51. 白髪隠しスティック・マスカラ（ヘアカラー・アホ毛スティック周辺）
  {
    id: 'art-peri-gray-hair-cover-stick-mascara-2026',
    queryTarget: '白髪隠し スティック マスカラ ファンデーション 生え際 分け目 落ちない 自然 サロンドプロ ミルボン',
    searchKeyword: '白髪隠し スティック マスカラ 生え際 ファンデーション',
    title: '【生え際・分け目の白髪を瞬間カバー】白髪隠しスティック＆マスカラおすすめ人気10選！手につかない自然な仕上がり比較',
    description: '美容院に行くまでの気になる分け目や生え際の白髪をサッと隠す白髪用コンシーラー・マスカラ10選。汗や雨でも落ちにくく、パリパリに固まらない人気アイテムを徹底比較します。',
    category: 'haircare',
    tags: ['白髪隠しスティック', '白髪マスカラ', '生え際白髪隠し', '白髪ファンデーション', '分け目白髪', '簡単白髪リタッチ', 'ヘアケア'],
    author: '佐々木 遥',
    featured: true,
    intro: `お出かけ直前に鏡を見て気づく「分け目や生え際のチラ見え白髪」。マスカラ型やパウダー型で手を汚さずにひと塗りで自然な黒髪・茶髪に馴染ませる名品を比較します。`,
    sections: [
      { h: 'タイプ別の使い分けガイド', body: `- **マスカラ・スティック型**：ピンポイントの飛び出す白髪やもみあげに\n- **ファンデーション・パウダー型**：頭頂部の分け目や広範囲の地肌透けカバーに` }
    ],
    faqs: [{ q: 'シャンプーで簡単に落ちますか？', a: '一時着色料のため、夜の通常のシャンプーで綺麗に洗い流せます。' }]
  },

  // 52. ネイルオイル・キューティクルオイル（ハンドケア・ネイル周辺）
  {
    id: 'art-peri-nail-cuticle-oil-pen-care-2026',
    queryTarget: 'ネイルオイル ペンタイプ キューティクルオイル ささくれ 爪 割れ 二枚爪 保湿 いい匂い OPI uka',
    searchKeyword: 'ネイルオイル ペンタイプ キューティクルオイル ささくれ 爪',
    title: '【ささくれ・二枚爪を防ぐ】ネイルオイル＆キューティクルオイルおすすめ人気10選！持ち歩きペンタイプ比較',
    description: '乾燥によるささくれ、爪の縦ジワ、割れやすい爪を補修する人気ネイルオイル10選。ポーチに入れて手軽に使えるペンタイプや、指先から良い香りが漂う名品を徹底比較。',
    category: 'bodycare',
    tags: ['ネイルオイル', 'キューティクルオイル', 'ペン型ネイルオイル', 'ささくれケア', '爪の割れ防止', 'OPIネイルオイル', 'ukaネイルオイル'],
    author: '佐々木 遥',
    featured: true,
    intro: `手洗いやアルコール消毒で油分が抜けやすい指先や甘皮。浸透性の高い植物オイルで爪の根元（爪母）を保湿し、健康で美しいツヤ爪を育てる人気オイルをご紹介します。`,
    sections: [
      { h: 'ネイルオイルを塗るゴールデンタイム', body: `手洗い後やハンドクリームを塗る「前」に、爪の根元とハイポニキウム（爪と指の皮膚の境目）に塗布して揉み込むのが最も浸透を高めます。` }
    ],
    faqs: [{ q: 'ジェルネイルの上から塗っても効果ある？', a: '爪の根元の皮膚や裏側から浸透するため、ジェルネイルの持ちを良くし自爪を保護する効果があります。' }]
  },

  // 53. ティントリップの縦ジワ消し プランパーリップオイル（リップメイク周辺）
  {
    id: 'art-peri-plump-lip-oil-glass-shine-2026',
    queryTarget: 'リップオイル プランパー ガラスツヤ 縦ジワ消し 重ね塗り クラランス ディオール ロムアンド',
    searchKeyword: 'リップオイル プランパー ツヤ 縦ジワ クラランス',
    title: '【ちゅるんとガラスツヤ】プランパーリップオイルおすすめ人気10選！縦ジワを飛ばしてボリュームUP比較',
    description: 'ティントや口紅の上から重ねてぷるぷるの立体リップをつくる「リップオイル」10選。ベタつかずみずみずしいガラスのようなツヤと、プランプ効果による縦ジワ補正力を徹底比較。',
    category: 'lip',
    tags: ['リップオイル', 'プランパーリップオイル', 'ガラスツヤリップ', 'クラランスリップオイル', '縦ジワ消しリップ', 'グロスおすすめ', 'ぷるぷるリップ'],
    author: '橘 えりか',
    featured: true,
    intro: `グロスよりも軽やかでベタつかず、美容オイル成分で唇をパックする「リップオイル」。唇の中央にぽってり重ねるだけで、憧れの韓国水光リップを作るベストアイテムを比較します。`,
    sections: [
      { h: 'リップオイルの垢抜け重ね付けテクニック', body: `マットティントを塗った後、上下の唇の中央（M字部分と下唇の中央）にのみオイルを点置きして広げると、立体感のあるグラデーションリップが完成します。` }
    ],
    faqs: [{ q: 'マスクにベッタリつきませんか？', a: '高粘度オイルではなく「水光オイルフィルム処方」のものを選べば、薄膜密着して不快なベタつきがありません。' }]
  },

  // 54. 薬用美白・シワ改善 オールインワンジェル（時短スキンケア周辺）
  {
    id: 'art-peri-medicated-all-in-one-gel-antiaging-2026',
    queryTarget: 'オールインワンジェル 薬用 美白 シワ改善 40代 50代 30代 時短 ナイアシンアミド カナデル パーフェクトワン',
    searchKeyword: 'オールインワンジェル 薬用 美白 シワ改善 ナイアシンアミド',
    title: '【化粧水〜クリームまで1個で完結】薬用シワ改善＆美白オールインワンジェルおすすめ10選！大人の手抜きなし時短ケア比較',
    description: '1品で化粧水・美容液・乳液・クリーム・パックの役割を果たす高機能オールインワンジェル10選。ナイアシンアミド配合でシミとシワを同時にケアする実力派を徹底比較します。',
    category: 'skincare',
    tags: ['オールインワンジェル薬用', 'シワ改善オールインワン', '美白オールインワン', 'カナデルプレミアホワイト', 'パーフェクトワン', '時短スキンケア', '40代50代オールインワン'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `忙しい朝や疲れた夜でも、妥協せず本格的なエイジングケアを行いたい大人世代へ。角層深くまで浸透して一日中乾燥させない最新の薬用高保湿オールインワンをご紹介します。`,
    sections: [
      { h: 'モロモロ（カス）を出さない塗り方', body: `手のひらで温めてから顔全体に優しくハンドプレスするように馴染ませ、擦らずに完全に浸透してからメイク下地を重ねるのがポイントです。` }
    ],
    faqs: [{ q: '本当にこれ1つで乾燥しませんか？', a: '濃密な液晶ゲルカプセル構造やセラミド配合のアイテムなら、化粧水＋クリームを重ねた以上の潤い持続力を発揮します。' }]
  },

  // 55. ヘアアイロン用 ヒートプロテクトオイル・ミルク（ヘアケア・アイロン周辺）
  {
    id: 'art-peri-heat-protect-hair-oil-iron-2026',
    queryTarget: 'ヘアアイロン 前 オイル ミルク ヒートプロテクト 髪 傷まない カールキープ リファ ナプラ',
    searchKeyword: 'ヘアアイロン 前 オイル ヒートプロテクト リファ ロックオイル',
    title: '【アイロンの熱ダメージをゼロに】ヒートプロテクトヘアオイル＆ミルクおすすめ10選！カール＆ストレートキープ比較',
    description: 'コテやストレートアイロンを通す前に使うことで、熱ダメージから髪を守りツヤとキープ力を高めるヒートガードオイル10選。リファのロックオイルをはじめとする人気アイテムを徹底比較。',
    category: 'haircare',
    tags: ['ヒートプロテクトオイル', 'ヘアアイロン前オイル', 'リファロックオイル', 'アイロン傷まない', 'カールキープオイル', '熱ダメージ予防', 'サロンスタイリング'],
    author: '佐々木 遥',
    featured: true,
    intro: `「毎日のヘアアイロンで毛先がチリチリに傷む」「夕方になると巻きが取れる」というお悩みに。熱に反応してキューティクルを補修・固定するヒートケアアイテムを厳選しました。`,
    sections: [
      { h: 'アイロン前につけていいオイルの条件', body: `一般のオイルをアイロン前につけると油焼け（ジュージュー焼ける）の原因になります。「ヒートプロテクト処方」「アイロン前専用」と明記されたものをご使用ください。` }
    ],
    faqs: [{ q: 'ストレートアイロンにも使えますか？', a: 'ストレートアイロン前に塗布すると、うねりや湿気戻りを防ぎサラツヤのストレートが一日中持続します。' }]
  },

  // 56. 薬用デオドラント・ワキ汗ロールオン＆クリーム（シーブリーズ・制汗周辺）
  {
    id: 'art-peri-medicated-roll-on-deodorant-sweat-2026',
    queryTarget: 'ワキ汗 止め 制汗剤 ロールオン クリーム 脇汗 匂い 医薬部外品 パースピレックス デオナチュレ',
    searchKeyword: '制汗剤 ワキ汗 ロールオン クリーム 医薬部外品 脇汗',
    title: '【ワキ汗ジミ・嫌なニオイを根本遮断】薬用ロールオン制汗剤＆クリームおすすめ10選！服に汗ジミを作らない最強比較',
    description: '緊張や猛暑によるワキの汗ジミ・黄ばみ・ワキガ臭を徹底ブロックする医薬部外品制汗剤10選。密着ロールオンタイプや直塗りクリームの制汗持続力を徹底比較します。',
    category: 'bodycare',
    tags: ['ワキ汗制汗剤', '脇汗ロールオン', 'デオナチュレソフトストーン', 'パースピレックス', '汗ジミ防止', 'ワキガ対策', '制汗クリーム'],
    author: 'ヘルスケア取材班',
    featured: true,
    intro: `白シャツや色のついた服を着た時のワキ汗ジミの恐怖。汗腺にフタをして汗そのものを止める有効成分（クロルヒドロキシアルミニウム等）配合の最強制汗アイテムを比較します。`,
    sections: [
      { h: '制汗剤の効果を100%引き出す塗り方', body: `汗をかいた後ではなく、**「前夜の入浴後、清潔で完全に乾いた状態の肌」**に塗るのが最も汗腺をブロックする効果を発揮します。` }
    ],
    faqs: [{ q: '肌が痒くなりやすい場合の選び方は？', a: 'アルコールフリー処方や、消炎成分（アラントイン等）が配合された敏感肌用ロールオンがおすすめです。' }]
  },

  // 57. 眉・まつ毛 コーミングスクリューブラシ（メイクツール周辺）
  {
    id: 'art-peri-screw-brush-eyebrow-lash-comb-2026',
    queryTarget: 'スクリューブラシ まつ毛コーム 眉マスカラ ダマ取り マスカラコーム 折りたたみ 金属製 チャスティ',
    searchKeyword: 'スクリューブラシ マスカラコーム 金属 まつ毛 ダマ取り',
    title: '【マスカラのダマを瞬時に解消】スクリューブラシ＆金属製まつ毛コームおすすめ10選！繊細セパレート比較',
    description: 'マスカラを塗った後のダマを解いて繊細な美まつ毛に仕上げる金属製マスカラコームや、眉マスカラのムラをぼかすスクリューブラシ10選。チャスティなどの人気ツールを徹底比較。',
    category: 'makeup',
    tags: ['スクリューブラシ', 'マスカラコーム', '金属製まつ毛コーム', 'チャスティマスカラコーム', 'マスカラダマ取り', 'セパレートまつ毛', 'アイメイクツール'],
    author: '松本 結衣',
    featured: true,
    intro: `アイメイクの完成度をプロ級に引き上げる「コーム＆スクリューブラシ」。毛先まで一本一本スッと伸びたダマのないセパレートまつ毛をつくる必須ツールをご紹介します。`,
    sections: [
      { h: '金属製コームが選ばれる理由', body: `プラスチック製よりも歯先が細く間隔が均一なため、乾きかけのマスカラでも引っかからずにスーッとダマだけを梳き落とせます。` }
    ],
    faqs: [{ q: 'マスカラが完全に乾いてからとかすべき？', a: 'マスカラを塗った直後、液が完全に乾き切る前の「半乾きの状態」で下から上へ通すのが一番キレイにセパレートします。' }]
  },

  // 58. 薬用美白・抗炎症 ニキビパッチ＆スポッツケア（スキンケア・部分ケア周辺）
  {
    id: 'art-peri-acne-patch-spots-care-ranking-2026',
    queryTarget: 'ニキビパッチ 貼ったまま メイク 目立たない 薬用 スポッツケア 赤ニキビ 韓国 VT メディヒール',
    searchKeyword: 'ニキビパッチ 目立たない メイクの上から 鎮静 韓国',
    title: '【目立たず触らず治す】ニキビパッチ＆スポッツケアおすすめ人気10選！メイクの上から貼れる超薄型比較',
    description: '急にできた赤ニキビや白ニキビを外敵刺激や無意識の摩擦から守り、鎮静成分でケアする人気ニキビパッチ10選。ハイドロコロイド素材や目立たない極薄パッチを徹底比較。',
    category: 'skincare',
    tags: ['ニキビパッチ', 'ニキビパッチ目立たない', 'VTシカニキビパッチ', 'メディヒールパッチ', '赤ニキビケア', 'スポッツ美容液', '肌荒れ保護'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `「大事な日の前にニキビができてしまった」「無意識にニキビを触ってしまう」という方へ。貼ったままメイクができ、美容成分を密閉浸透させる最新ニキビパッチを比較します。`,
    sections: [
      { h: 'ニキビパッチを剥がれにくく貼るコツ', body: `患部に化粧水や乳液の油分が残っていると剥がれやすいため、スキンケア前の清潔な肌に貼るか、患部の油分を軽くティッシュオフしてから密着させてください。` }
    ],
    faqs: [{ q: 'ニードル（針）付きパッチはどう使い分ける？', a: '初期のこもりニキビには微細マイクロニードル付きパッチで奥まで成分を届ける集中ケアが効果的です。' }]
  },

  // 59. 唇用UVカット リップクリーム SPF配合（日焼け止め・リップ周辺）
  {
    id: 'art-peri-uv-lip-cream-spf-ranking-2026',
    queryTarget: 'UVリップクリーム SPF 日焼け止め 唇 紫外線対策 色付き 荒れない プチプラ ニベア ロート',
    searchKeyword: 'UV リップクリーム SPF 日焼け止め 唇',
    title: '【唇の日焼け・くすみを完全ガード】UVカットリップクリームおすすめ人気10選！SPF配合・荒れない高保湿比較',
    description: '紫外線による唇のシミ・くすみ・皮剥けを防ぐSPF配合のUVカットリップクリーム10選。無色タイプから自然な血色をプラスする色付きタイプまで徹底比較します。',
    category: 'lip',
    tags: ['UVリップクリーム', '唇の日焼け止め', 'SPFリップ', '唇の紫外線対策', 'ニベアUVリップ', 'メンソレータムリップ', '唇のくすみ予防'],
    author: '橘 えりか',
    featured: true,
    intro: `顔や体には日焼け止めを塗っていても見落としがちな「唇の紫外線対策」。メラニンが少なく日焼けしやすい唇を紫外線から守り、ぷるんとした血色感をキープするUVリップをご紹介します。`,
    sections: [
      { h: '唇が紫外線を浴びるとどうなるか？', body: `唇は皮脂膜がないため紫外線ダメージで水分が蒸発し、縦ジワや皮剥け、将来の唇のシミ・黒ずみの大きな要因となります。日中のこまめなUVリップ塗り直しが不可欠です。` }
    ],
    faqs: [{ q: '口紅の下地として使っても大丈夫？', a: 'ベタつきの少ない高密着UVリップなら、口紅の発色を邪魔せずキレイなベースとして機能します。' }]
  },

  // 60. まつ毛・眉毛用 ホットビューラー（まつ毛パーマ・アイメイク周辺）
  {
    id: 'art-peri-heated-eyelash-curler-usb-2026',
    queryTarget: 'ホットビューラー USB充電式 まつ毛 カールキープ 一重 奥二重 下まつ毛 火傷しない おすすめ パナソニック',
    searchKeyword: 'ホットビューラー USB充電 まつ毛 カール パナソニック',
    title: '【湿気でも落ちない上向きカール】ホットビューラーおすすめ人気10選！USB充電式＆火傷しない安全設計比較',
    description: '熱の力でまつ毛を根元から立ち上げ、一日中カールをロックする人気ホットビューラー10選。コーム型とカーラー型の違い、一重・奥二重でも使いやすい最新モデルを徹底比較します。',
    category: 'device',
    tags: ['ホットビューラー', 'USB充電ホットビューラー', 'パナソニックまつげくるん', 'ホットビューラー一重', 'まつ毛カールキープ', 'アイメイク家電', '下まつ毛ビューラー'],
    author: '美容家電スペシャリスト',
    featured: true,
    intro: `普通のビューラーでは時間が経つと下がってしまう頑固な下向きまつ毛に。適度な温熱でまつ毛を傷めず、マスカラのダマを溶かしながら放射状に広げるホットビューラーをご紹介します。`,
    sections: [
      { h: 'カールが夜まで持続するホットビューラーの当て方', body: `マスカラを塗った後、温まったコームをまつ毛の根元に当てて3秒キープ。毛先に向かってゆっくり回転させながら滑らせると、くるんと綺麗な扇状カールが固定されます。` }
    ],
    faqs: [{ q: '自まつ毛が熱で傷んだり抜けたりしませんか？', a: '適温（60〜70℃前後）に自動制御された安全設計のものを選び、同じ場所に長時間押し当てなければダメージなく使用できます。' }]
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

  for (const def of batch6Defs) {
    console.log(`\n🔍 [第6弾 自然な周辺クエリ記事生成] ${def.id}`);
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
  console.log(`\n🎉 [第6弾 自然な周辺クエリ拡張完了] 新規作成: ${createdCount}件, 更新: ${updatedCount}件 (総記事数: ${articlesData.length}件)`);
}

main().catch(e => { console.error('❌ エラー:', e); process.exit(1); });
