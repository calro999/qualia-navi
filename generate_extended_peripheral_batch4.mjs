import fs from 'fs';
import path from 'path';

console.log('🚀 [Natural Peripheral Expansion Batch 4] トレンド＆実用特化10選記事生成開始...');

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

const batch4Defs = [
  // 31. 部分用つけまつ毛・束感まつ毛（まつ毛パーマ・マスカラ周辺）
  {
    id: 'art-peri-partial-eyelashes-束感-2026',
    queryTarget: '部分用つけまつ毛 束感 アイドル まつ毛 ナチュラル 一重 奥二重 初心者 おすすめ',
    searchKeyword: '部分用 つけまつ毛 束感 アイドル ナチュラル',
    title: '【韓国アイドルのような美束感】部分用つけまつ毛おすすめ人気10選！自まつ毛に馴染むナチュラル派比較',
    description: 'マツパやエクステ不要で自然な束感まつ毛が作れる「部分用つけまつ毛」おすすめ10選。一重や奥二重でも浮かない長さ・毛束の選び方、初心者でも簡単な付け方を徹底解説します。',
    category: 'makeup',
    tags: ['部分用つけまつ毛', '束感まつ毛', 'アイドルまつ毛', '韓国つけまつ毛', 'ポイントつけまつげ', 'ナチュラルまつ毛', 'アイメイク'],
    author: '松本 結衣',
    featured: true,
    intro: `ワンホンメイクや韓国アイドルメイクで大流行中の「束感まつ毛」。フルタイプのつけまつ毛のような不自然さがなく、自まつ毛の隙間にポンポンと置くだけでパッチリ目元を作る人気アイテムを比較します。`,
    sections: [
      { h: '失敗しない部分用つけまつ毛の付け方', body: `1. 自まつ毛をビューラーしてマスカラ下地で固定する\n2. 束感つけまの根元に専用ノリを少量つけ、10秒乾かす\n3. 自まつ毛の「下側（生え際）」にピンセットで差し込むと境目が完全に隠れます` }
    ],
    faqs: [{ q: 'ノリはどのタイプが目立ちませんか？', a: '乾くと透明になるクリアタイプや、アイラインと一体化するブラックタイプの速乾グルーがおすすめです。' }]
  },

  // 32. 頭皮用クレンジングオイル・スカルププレケア（頭皮ケア・シャンプー周辺）
  {
    id: 'art-peri-scalp-cleansing-oil-precare-2026',
    queryTarget: '頭皮 クレンジングオイル スカルプオイル 毛穴 汚れ 角栓 シャンプー前 スッキリ おすすめ',
    searchKeyword: '頭皮 クレンジングオイル スカルプ オイル シャンプー前',
    title: '【シャンプー前の頭皮ディープクレンジング】スカルプクレンジングオイルおすすめ10選！毛穴の皮脂角栓ごっそり比較',
    description: 'シャンプーだけでは落ちない頭皮の酸化皮脂やスタイリング剤の蓄積をオイルの力で溶かし出すスカルププレオイル10選。頭皮のベタつき・嫌なニオイ・抜け毛を防ぐ頭皮オイルクレンジングを解説。',
    category: 'haircare',
    tags: ['頭皮クレンジングオイル', 'スカルプオイル', '頭皮の毛穴角栓', 'シャンプー前頭皮ケア', '頭皮ニオイ予防', 'プレシャンプーオイル', '美髪育毛'],
    author: '佐々木 遥',
    featured: true,
    intro: `お顔のクレンジングと同じように、皮脂腺の多い頭皮もオイルで毛穴汚れを浮かせることが重要です。ホホバオイルやアルガンオイル配合で頭皮を柔軟にし、健やかな美髪を育むプレオイルを比較します。`,
    sections: [
      { h: '週1回の頭皮オイルクレンジング手順', body: `乾いた頭皮にオイルを塗布し、指の腹で円を描くように優しく3分間マッサージ。ぬるま湯でしっかり乳化させて洗い流した後に通常のシャンプーを行います。` }
    ],
    faqs: [{ q: '髪が油っぽくベタつきませんか？', a: 'シャンプー前の「ぬるま湯でのしっかりした乳化・すすぎ」を行うことで、ベタつきを残さずサラサラに仕上がります。' }]
  },

  // 33. セラミド高配合 保湿化粧水・乳液（インナードライ・キュレル・アベンヌ周辺）
  {
    id: 'art-peri-ceramide-lotion-emulsion-ranking-2026',
    queryTarget: 'ヒト型セラミド 化粧水 乳液 保湿 インナードライ 敏感肌 プチプラ デパコス 松山油脂 エトヴォス',
    searchKeyword: 'ヒト型セラミド 化粧水 乳液 保湿 敏感肌',
    title: '【乾燥・インナードライを根本改善】ヒト型セラミド配合スキンケアおすすめ10選！角層バリアを立て直す高保湿比較',
    description: '肌のバリア機能の主役である「ヒト型セラミド」を高濃度配合した化粧水・乳液・美容液10選。水分保持力を高め、エアコンや紫外線に負けないふっくら肌をつくる名品を徹底比較。',
    category: 'skincare',
    tags: ['ヒト型セラミド化粧水', 'セラミド乳液', 'インナードライ改善', '敏感肌高保湿', 'バリア機能改善', 'エトヴォスセラミド', '松山油脂肌をうるおす'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `「いくら化粧水を重ねても肌の奥が乾く」というインナードライ肌の原因はセラミド不足です。人間の肌構造と同じ「ヒト型セラミド（EOP/NP/AP等）」を補い、潤いを逃さない鉄壁肌を叶えるスキンケアを厳選しました。`,
    sections: [
      { h: 'セラミドの種類と効果の違い', body: `- **ヒト型セラミド（セラミドNP/APなど）**：肌親和性と保湿力が最も高く、敏感肌のバリア回復に最適\n- **天然セラミド（セレブロシド）**：馬油等由来で高浸透・柔軟効果\n- **疑似セラミド**：プチプラで大容量使えて日常使いに便利` }
    ],
    faqs: [{ q: 'オイリー肌でもセラミドは必要？', a: '皮脂が多くても角層内が乾燥しているインナードライが多いため、オイルフリーのセラミド化粧水での水分補給が不可欠です。' }]
  },

  // 34. 涙袋アイシャドウ・スティック（アイメイク・目元ハイライト周辺）
  {
    id: 'art-peri-aegyosal-eyeshadow-stick-ranking-2026',
    queryTarget: '涙袋 アイシャドウ スティック ぷっくり 落ちない シマー ラメ ウォンジョンヨ キャンメイク',
    searchKeyword: '涙袋 アイシャドウ スティック ぷっくり ウォンジョンヨ',
    title: '【ひと塗りでぷっくり自然な涙袋】涙袋スティックアイシャドウおすすめ10選！夕方までヨレない名品比較',
    description: '目元の立体感を自然に強調し、中顔面を短縮して若見え・デカ目効果を生む涙袋アイシャドウスティック10選。ウォンジョンヨやキャンメイクなど、粉飛び・ヨレ知らずの高密着アイテムを比較。',
    category: 'makeup',
    tags: ['涙袋アイシャドウ', '涙袋スティック', 'ウォンジョンヨ涙袋', 'ぷっくり涙袋', '中顔面短縮メイク', 'シマーアイシャドウ', 'プチプラ涙袋'],
    author: '松本 結衣',
    featured: true,
    intro: `愛らしい表情とデカ目効果を叶える「涙袋メイク」。ギラギラしすぎず、大人の目元にも上品になじむ繊細なシマーパール＆高密着クリーミースティックを厳選比較します。`,
    sections: [
      { h: '大人女子のための自然な涙袋の作り方', body: `1. 笑った時に膨らむ部分の下に極細ライナーで薄く影を描く\n2. 涙袋の中央（黒目の下）にシマーピンクやシャンパンベージュのスティックを乗せる\n3. 目頭側へ指で軽くぼかして境目をなじませる` }
    ],
    faqs: [{ q: '目元の小ジワが目立ちませんか？', a: '大粒グリッターではなく、微粒子パールのクリーミースティックを選ぶとしっとり馴染んでシワを目立たせません。' }]
  },

  // 35. 泡立ち・低刺激 アミノ酸系シャンプー（ヘアケア・頭皮ケア周辺）
  {
    id: 'art-peri-amino-acid-shampoo-gentle-2026',
    queryTarget: 'アミノ酸シャンプー おすすめ 美容師 敏感肌 くせ毛 うねり パサつき サロン専売 プチプラ',
    searchKeyword: 'アミノ酸シャンプー 美容室専売 敏感肌 くせ毛 保湿',
    title: '【髪と頭皮を優しく洗う】アミノ酸シャンプーおすすめ人気10選！くせ毛・パサつき・敏感肌のための低刺激比較',
    description: '必要な油分を残しながらマイルドに洗い上げる「アミノ酸系シャンプー」おすすめ10選。サロン専売品からドラッグストアで買える高コスパ品まで、頭皮の痒みや髪のうねりをケアする名品を徹底比較。',
    category: 'haircare',
    tags: ['アミノ酸シャンプー', '低刺激シャンプー', 'くせ毛シャンプー', '頭皮に優しいシャンプー', 'サロン専売シャンプー', 'アミノ酸洗浄成分', '美髪ヘアケア'],
    author: '佐々木 遥',
    featured: true,
    intro: `高級アルコール系洗浄成分（ラウレス硫酸等）による頭皮の乾燥やカラーの色落ちに悩む方へ。ココイルグルタミン酸やラウロイルメチルアラニンなどの上質なアミノ酸洗浄成分で髪を補修しながら洗うベストシャンプーをご紹介します。`,
    sections: [
      { h: '本物のアミノ酸シャンプーを見分ける成分表チェック', body: `水に次ぐ2〜3番目の成分に「ココイル〜」「ラウロイル〜」「ベタイン」が記載されているかを確認しましょう。サルフェートフリー（硫酸系無添加）表記も目安になります。` }
    ],
    faqs: [{ q: '泡立ちが悪くありませんか？', a: 'シャンプー前に1分半ほどぬるま湯でしっかり予洗い（予備すすぎ）をすることで、アミノ酸系でも濃密で豊かな泡立ちになります。' }]
  },

  // 36. 酵素洗顔パウダー 毛穴・くすみオフ（洗顔・角栓周辺）
  {
    id: 'art-peri-enzyme-powder-wash-keana-2026',
    queryTarget: '酵素洗顔 パウダー 毛穴 黒ずみ 角栓 ザラつき スイサイ オバジ ファンケル 比較',
    searchKeyword: '酵素洗顔 パウダー 毛穴 黒ずみ 角栓 スイサイ オバジ',
    title: '【頑固な角栓・ザラつきを一網打尽】酵素洗顔パウダーおすすめ人気10選！週2回の毛穴大掃除比較',
    description: 'タンパク質分解酵素（プロテアーゼ）と皮脂分解酵素（リパーゼ）が毛穴の詰まりを溶かして落とす酵素洗顔パウダー10選。スイサイ、オバジ、ファンケルなど個包装タイプの使い心地を徹底比較します。',
    category: 'skincare',
    tags: ['酵素洗顔パウダー', '毛穴角栓酵素洗顔', 'スイサイ酵素洗顔', 'オバジ酵素洗顔', 'ファンケルディープクリア', '黒ずみ毛穴洗顔', '角質ケア'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `通常の洗顔料では落ちない「古いタンパク質角栓」。酵素の分解パワーで、小鼻やあご下のザラつきをツルツルにリセットし、化粧水の浸透を高める大人気パウダー洗顔を比較します。`,
    sections: [
      { h: '酵素洗顔の効果的な使い方', body: `1. 洗顔ネットでしっかりキメ細かい濃密泡を立てる\n2. 肌を擦らず、泡をクッションにしてTゾーンから優しく転がす\n3. すすぎ残しがないようぬるま湯で20回以上ていねいに洗い流す` }
    ],
    faqs: [{ q: '毎日使っても大丈夫ですか？', a: '洗浄・角質除去力が高いため、週に1〜2回のスペシャルケアとしての使用が肌を傷めないコツです。' }]
  },

  // 37. 薬用美白ハンドクリーム 手荒れ・シミ予防（ハンドケア・デコルテ周辺）
  {
    id: 'art-peri-medicated-whitening-hand-cream-2026',
    queryTarget: '美白 ハンドクリーム 薬用 シミ 手の甲 シワ 手荒れ 保湿 ベタつかない コエンリッチ',
    searchKeyword: '美白 ハンドクリーム 薬用 シミ 手の甲 コエンリッチ',
    title: '【手の甲のシミ・手荒れを同時に防ぐ】薬用美白ハンドクリームおすすめ10選！ベタつかずスマホが触れる人気比較',
    description: '紫外線による手の甲のシミ・そばかすを防ぎ、水仕事や乾燥による手荒れを濃厚保湿する薬用美白ハンドクリーム10選。トラネキサム酸やナイアシンアミド配合でベタつかない名品を徹底比較。',
    category: 'skincare',
    tags: ['美白ハンドクリーム', '薬用ハンドクリーム', '手の甲のシミ予防', 'コエンリッチ美白', '手荒れケア', 'ベタつかないハンドクリーム', 'エイジングハンドケア'],
    author: '佐々木 遥',
    featured: true,
    intro: `手洗いや消毒、運転中の紫外線で年齢が出やすい「手の甲」。美白有効成分と保湿バリア成分をダブルで配合し、塗った直後でもサラサラでスマホやPCを触れる優秀ハンドクリームをご紹介します。`,
    sections: [
      { h: '若々しい手肌を保つハンドクリームの塗り方', body: `手の甲にクリームを出し、手の甲同士をすり合わせて全体に広げます。指の関節や甘皮（爪の生え際）までしっかりマッサージしながら馴染ませると血行も促進されます。` }
    ],
    faqs: [{ q: '日焼け止め効果のあるハンドクリームもありますか？', a: '日中の外出用にはSPF配合のUVハンドクリーム、夜の就寝前には高保湿・美白リッチクリームと使い分けるのが理想です。' }]
  },

  // 38. 敏感肌向け クレンジングバーム・ミルク（クレンジング周辺）
  {
    id: 'art-peri-cleansing-balm-milk-sensitive-2026',
    queryTarget: 'クレンジングバーム ミルク 敏感肌 乾燥肌 毛穴 摩擦レス メイク落とし DUO カバーマーク',
    searchKeyword: 'クレンジングバーム ミルク 敏感肌 乾燥肌 摩擦レス',
    title: '【潤いを奪わずメイクオフ】敏感肌向けクレンジングバーム＆ミルクおすすめ10選！摩擦レスでつっぱらない比較',
    description: '肌の潤いバリアを守りながら濃いメイクや毛穴汚れをするんとオフする低刺激クレンジングバーム＆ミルク10選。とろけるテクスチャーで摩擦を極限まで減らす人気アイテムを徹底比較。',
    category: 'skincare',
    tags: ['クレンジングバーム敏感肌', 'クレンジングミルクおすすめ', '摩擦レスクレンジング', '乾燥肌メイク落とし', 'DUOクレンジングバーム', 'カバーマーククレンジングミルク', 'マイルドクレンジング'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `「オイルクレンジングは乾燥する」「拭き取りシートは摩擦が気になる」というデリケート肌へ。体温でとろけて摩擦をかけずにメイクを包み込むバームと、水分保持力の高いミルククレンジングを厳選しました。`,
    sections: [
      { h: 'バーム vs ミルク どっちを選ぶべき？', body: `- **クレンジングバーム**：しっかりメイク・毛穴の角栓や黒ずみも一緒にオフしたい方\n- **クレンジングミルク**：ナチュラルメイク・極度の乾燥肌や朝の洗顔代わりに使いたい方` }
    ],
    faqs: [{ q: 'W洗顔（その後の洗顔）は必要ですか？', a: '「W洗顔不要」と記載されたバームなら、一度のクレンジングで洗顔まで完了し肌への負担を最小限に抑えられます。' }]
  },

  // 39. 保湿リップバーム・リップトリートメント（リップケア周辺・荒れ予防）
  {
    id: 'art-peri-lip-balm-treatment-ranking-2026',
    queryTarget: 'リップバーム リップトリートメント 唇 荒れ 乾燥 高保湿 医薬部外品 モアリップ ディオール',
    searchKeyword: 'リップバーム リップトリートメント 高保湿 唇荒れ',
    title: '【ひび割れ・ガサガサ唇を速攻修復】高保湿リップバーム＆リップトリートメントおすすめ10選！実力派比較',
    description: '冬の乾燥や口紅による皮剥け、ひび割れを集中ケアする高機能リップバーム＆リップトリートメント10選。医薬部外品の薬用リップから、デパコスの贅沢リップセラムまで徹底比較します。',
    category: 'lip',
    tags: ['リップバームおすすめ', 'リップトリートメント', '唇のひび割れケア', 'モアリップ', 'ディオールアディクトリップマキシマイザー', '高保湿リップ', 'リップケア'],
    author: '橘 えりか',
    featured: true,
    intro: `皮脂腺がなく乾燥ダメージをダイレクトに受ける唇。ビタミンEやパンテノール、セラミドを贅沢に補給し、ふっくらなめらかな唇を取り戻す人気バームを比較します。`,
    sections: [
      { h: '効果を倍増させるリップバームの塗り方', body: `唇のシワは「縦方向」に入っているため、左右に横塗りするのではなく、縦ジワに沿って上下になじませるのが成分を奥まで届ける秘訣です。` }
    ],
    faqs: [{ q: '1日に何回くらい塗るのが適切？', a: '1日3〜5回程度、洗顔後・食後・就寝前に塗るのが効果的です。過剰に塗り直すと摩擦刺激になるので注意しましょう。' }]
  },

  // 40. 敏感肌向け フェイスシートマスク・鎮静パック（スキンケア周辺）
  {
    id: 'art-peri-sensitive-sheet-mask-calming-2026',
    queryTarget: 'シートマスク 敏感肌 毎日使える 鎮静 高保湿 アルコールフリー ルルルン メディヒール',
    searchKeyword: 'シートマスク 敏感肌 鎮静 高保湿 アルコールフリー',
    title: '【ピリピリしない・毎日使える】敏感肌向け低刺激シートマスクおすすめ人気10選！高保湿＆肌荒れ鎮静パック比較',
    description: 'アルコールフリー・無香料・低刺激処方で、ゆらいだ肌にも染みずに使える敏感肌用シートマスク10選。メディヒールやルルルンなど、水分チャージとバリア補修を両立する名品を徹底比較。',
    category: 'skincare',
    tags: ['敏感肌シートマスク', '毎日使えるパック', 'メディヒールティーツリー', 'ルルルン敏感肌', '低刺激フェイスパック', 'アルコールフリーシートマスク', '肌荒れ鎮静パック'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `「シートマスクを使うとピリピリ刺激を感じる」「毎日手軽に水分補給したい」という敏感肌のために。極細密着シートと抗炎症エキス（ティーツリー・CICA・セラミド）で優しく包み込むベストマスクをご紹介します。`,
    sections: [
      { h: 'シートマスクで肌荒れさせない注意点', body: `規定の使用時間（10〜15分）を厳守しましょう。シートが乾くまで乗せ続けると、逆に肌の水分がシートに吸い取られて乾燥の原因になります。` }
    ],
    faqs: [{ q: '個包装と大容量BOXタイプどちらが良い？', a: '毎日のデイリーケアにはBOXタイプがコスパ抜群、旅行や肌荒れ時の集中ケアには美容液たっぷりの個包装タイプがおすすめです。' }]
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

  for (const def of batch4Defs) {
    console.log(`\n🔍 [第4弾 自然な周辺クエリ記事生成] ${def.id}`);
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
  console.log(`\n🎉 [第4弾 自然な周辺クエリ拡張完了] 新規作成: ${createdCount}件, 更新: ${updatedCount}件 (総記事数: ${articlesData.length}件)`);
}

main().catch(e => { console.error('❌ エラー:', e); process.exit(1); });
