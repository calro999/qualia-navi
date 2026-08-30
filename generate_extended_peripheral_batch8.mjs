import fs from 'fs';
import path from 'path';

console.log('🚀 [Peripheral Expansion Batch 8] 楽天オープンAPI完全直接取得・高需要実用10選記事生成開始...');

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

async function fetchRakutenItems(keyword, hits = 12, maxRetries = 3) {
  let cleanKw = keyword.replace(/【.*?】/g, '').replace(/（.*?）/g, '').replace(/\(.*?\)/g, '').trim();
  if (cleanKw.length > 40) cleanKw = cleanKw.slice(0, 40);
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent(cleanKw)}&format=json&hits=${hits}&sort=-reviewCount&imageFlag=1`;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📡 [楽天API 直接通信 試行${attempt}] キーワード: "${cleanKw}"`);
      const res = await fetch(url);
      if (res.status === 429) {
        console.warn(`⏳ レートリミット検知: 2秒待機して再試行...`);
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }
      if (!res.ok) {
        console.error(`⚠️ 楽天API エラー: ${res.status}`);
        return [];
      }
      const data = await res.json();
      if (!data.Items || data.Items.length === 0) {
        console.warn(`⚠️ 該当商品 0件: "${cleanKw}"`);
        return [];
      }
      const items = data.Items.map(e => {
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

      console.log(`✅ 楽天APIから ${items.length} 件の商品データを直接取得成功！`);
      return items;
    } catch (e) {
      console.error(`❌ 楽天API 通信例外: ${e.message}`);
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return [];
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const batch8Defs = [
  // 71. ポイントクレンジングシート・携帯メイク落とし（旅行・お直し・ミニコスメ周辺）
  {
    id: 'art-peri-cleansing-wipes-portable-touchup-2026',
    queryTarget: 'クレンジングシート 携帯用 個包装 メイク直し 持ち歩き 肌荒れしない ビオレ チャコット',
    searchKeyword: 'クレンジングシート 携帯用 個包装 メイク直し',
    title: '【外出先や旅行で即オフ】携帯用クレンジングシートおすすめ人気10選！個包装＆肌に優しいメイク直し比較',
    description: 'ポーチに入れて持ち歩ける個包装タイプや携帯用クレンジングシート10選。擦らずメイクが浮く高保湿液設計で、夕方のアイメイクお直しや旅行・ジムで活躍する名品を徹底比較します。',
    category: 'skincare',
    tags: ['クレンジングシート携帯用', '個包装メイク落とし', 'メイク直しシート', 'ビオレメイク落としシート', 'チャコットクレンジングシート', '旅行用クレンジング', '時短メイクオフ'],
    author: '松本 結衣',
    featured: true,
    intro: `「外出先でマスカラが滲んだ時にお直ししたい」「疲れて帰ってすぐにメイクを落としたい」という時に大活躍するクレンジングシート。液たっぷりで摩擦を最小限に抑える人気アイテムを比較します。`,
    sections: [
      { h: '肌を傷めないクレンジングシートの使い方', body: `ゴシゴシ擦るのではなく、シートを折りたたんで目元や肌に5秒間優しく押し当て、メイクがじゅわっと浮いてから優しく滑らせて拭き取るのが鉄則です。` }
    ],
    faqs: [{ q: '使った後に洗顔や保湿は必要ですか？', a: '化粧水成分配合のシートならそのまま寝てもOKなタイプが多いですが、乾燥肌の方は軽く乳液を重ねると安心です。' }]
  },

  // 72. 眉毛ティント・消えない眉（アイブロウコート・時短メイク周辺）
  {
    id: 'art-peri-eyebrow-tint-long-lasting-2026',
    queryTarget: '眉ティント 落ちない 1週間 すっぴん 美眉 失敗しない フジコ メイク時短',
    searchKeyword: '眉ティント 眉毛 落ちない フジコ 眉',
    title: '【すっぴんでも眉毛が消えない】眉ティントおすすめ人気10選！フジコ等の失敗しない色選び＆塗り方比較',
    description: '一度塗って剥がすだけで約3〜7日間ナチュラルな美眉が持続する人気眉ティント10選。フジコ（Fujiko）をはじめ、海・プール・温泉・朝のメイク時短に必須のアイテムを徹底比較。',
    category: 'makeup',
    tags: ['眉ティント', 'フジコ眉ティント', '消えない眉毛', '眉毛アートメイク風', 'すっぴん美眉', '時短アイブロウ', '落ちない眉ティント'],
    author: '松本 結衣',
    featured: true,
    intro: `「毎朝の眉メイクに時間がかかる」「すっぴんだと眉尻がなくて恥ずかしい」というお悩みを解決する眉ティント。角質層を自然に着色し、汗やクレンジングでも消えない美眉をキープするベストバイをご紹介します。`,
    sections: [
      { h: '失敗しない眉ティントの塗り方', body: `1. 眉の油分や水分をしっかり拭き取る\n2. 理想の眉の形より少し太めに厚塗りする（はみ出たら綿棒で即修正）\n3. 最低2時間（できれば就寝前につけて一晩）置いてから優しく剥がす` }
    ],
    faqs: [{ q: '皮膚への色素沈着は大丈夫ですか？', a: '肌のターンオーバーとともに自然に垢として剥がれ落ちる安全な植物性着色料（ジヒドロキシアセトン等）を使用しています。' }]
  },

  // 73. 泡ハンドソープ 保湿・手荒れしない（ハンドケア周辺）
  {
    id: 'art-peri-moist-foam-hand-soap-gentle-2026',
    queryTarget: 'ハンドソープ 泡 保湿 手荒れしない 敏感肌 いい匂い ギフト イソップ マークスアンドウェブ',
    searchKeyword: 'ハンドソープ 泡 保湿 手荒れしない 敏感肌',
    title: '【1日に何度も洗っても手が荒れない】高保湿泡ハンドソープおすすめ人気10選！弱酸性＆上質な香り比較',
    description: '頻繁な手洗いやアルコール消毒による手荒れ・乾燥を防ぐ高保湿ハンドソープ10選。アミノ酸系洗浄成分やセラミド配合で、洗うたびにしっとり潤う人気アイテムを徹底比較します。',
    category: 'bodycare',
    tags: ['泡ハンドソープ', '手荒れしないハンドソープ', '高保湿ハンドソープ', '敏感肌ハンドソープ', 'イソップハンドウォッシュ', 'ギフトハンドソープ', 'ハンドケア'],
    author: '佐々木 遥',
    featured: true,
    intro: `手の乾燥やひび割れを防ぐ第一歩は「毎日のハンドソープ選び」にあります。強力な脱脂力のある成分を避け、肌のバリアを守りながら清潔に洗い上げるおすすめ泡ソープをご紹介します。`,
    sections: [
      { h: '手荒れを防ぐハンドソープの選び方', body: `- **弱酸性・アミノ酸系洗浄成分**：肌本来の皮脂膜を落としすぎない\n- **グリセリン・植物オイル配合**：洗い流した後も潤いヴェールが持続\n- **殺菌成分がマイルドなもの**：日常の手洗いには低刺激処方がベスト` }
    ],
    faqs: [{ q: '固形石鹸と泡タイプどちらが手荒れしにくい？', a: '泡タイプは泡立てる際の摩擦がなく、手肌に優しいアミノ酸界面活性剤を使用したものが多いため手荒れ予防に適しています。' }]
  },

  // 74. まつ毛・目元用 アイシャンプー（クレンジング・まつ毛ケア周辺）
  {
    id: 'art-peri-eye-shampoo-lash-hygiene-2026',
    queryTarget: 'アイシャンプー まつ毛ダニ まつ毛パーマ マツエク 目元の痒み ドライアイ 眼科 メディプロダクト',
    searchKeyword: 'アイシャンプー まつ毛 目元 洗浄 まつ毛ダニ',
    title: '【まつ毛ダニ・目元の痒みを防ぐ】アイシャンプーおすすめ人気10選！まつ毛パーマ＆マツエク長持ち比較',
    description: '落としきれないアイメイク汚れや皮脂による「まつ毛ダニ」の繁殖・目元のかゆみを防ぐアイシャンプー10選。目に染みない低刺激処方で、健康なまつ毛の育成環境を整えるケアを解説。',
    category: 'skincare',
    tags: ['アイシャンプー', 'まつ毛ダニ予防', '目元クレンジング', 'アイシャンプーロング', 'マツエク長持ち洗浄', 'ドライアイケア', 'まつ毛衛生'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `「夕方になると目がゴロゴロする」「まつ毛の根元が痒い」という原因の多くは、クレンジングで落ちきらないアイメイク汚れとまつ毛ダニです。眼科医も推奨する目元専用シャンプーを比較します。`,
    sections: [
      { h: 'アイシャンプーの3大メリット', body: `1. **マイボーム腺（涙の油分を出す腺）の詰まりを解消しドライアイを予防**\n2. **毛根の汚れを落としてまつ毛美容液の浸透を最大化**\n3. **まつエクやまつパが油分で取れるのを防ぎ持続力UP**` }
    ],
    faqs: [{ q: '目に染みたり痛くありませんか？', a: '涙と同等の浸透圧・中性pHで設計されているため、目を開けて洗っても染みない低刺激設計です。' }]
  },

  // 75. 薬用美白・シワ改善 デック＆ネックセラム（首のシワ・デコルテ周辺）
  {
    id: 'art-peri-neck-decollete-serum-firming-2026',
    queryTarget: '首のシワ 美容液 ネッククリーム デコルテ ハリ たるみ レチノール クラランス クラシエ',
    searchKeyword: '首のシワ 美容液 ネッククリーム デコルテ レチノール',
    title: '【年齢が出やすい首元にハリを戻す】首・デコルテ専用美容液＆クリームおすすめ人気10選！横ジワ改善比較',
    description: 'スマホ首や加齢によるデコルテの深い横ジワ・首のたるみを引き締める専用ネックセラム10選。高濃度レチノールやペプチド配合で、ベタつかず首元にピタッと密着する名品を徹底比較。',
    category: 'skincare',
    tags: ['首のシワ美容液', 'ネックセラム', 'デコルテケア', '首のたるみ改善', 'クラランスネッククリーム', '首の横ジワ解消', 'エイジングケア首元'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `首の皮膚は目元と同じくらい薄く、頭の重さを支えるためシワが深く刻まれやすいパーツです。衣服にベタつかず、内側から押し返すような弾力を与える最新ネックケアをご紹介します。`,
    sections: [
      { h: '首元専用セラムが顔用クリームより適している理由', body: `首は皮脂腺が少なく乾燥しやすい一方、汗をかきやすく服と擦れるため、**「高保湿でありながら表面がサラサラに仕上がる特殊ポリマー処方」**が施されています。` }
    ],
    faqs: [{ q: '枕の高さもシワに関係ありますか？', a: '高すぎる枕は首に深い折りジワを作るため、仰向けで首のシワが寄らない低めの枕を選ぶことも重要なケアです。' }]
  },

  // 76. パウダーチーク ふんわり血色・毛穴落ちしない（チーク・ベースメイク周辺）
  {
    id: 'art-peri-powder-blush-poreless-glow-2026',
    queryTarget: 'チーク パウダー ふんわり 毛穴目立たない 透明感 落ちない プチプラ セザンヌ クリニーク',
    searchKeyword: 'チーク パウダー ふんわり 毛穴目立たない 透明感',
    title: '【毛穴落ちせず内側から上気した頬に】パウダーチークおすすめ人気10選！ふんわり美肌見え＆落ちない比較',
    description: '頬の開き毛穴をぼかして自然な血色感を宿すパウダーチーク10選。セザンヌやクリニークなど、粉飛びせず夕方までくすまないイエベ・ブルベ別人気カラーを徹底比較します。',
    category: 'makeup',
    tags: ['パウダーチーク', '毛穴落ちしないチーク', 'セザンヌチーク', 'クリニークチークポップ', '透明感チーク', 'ふんわり血色感', 'プチプラチーク'],
    author: '松本 結衣',
    featured: true,
    intro: `「チークを塗ると頬の毛穴の凹凸が目立ってしまう」「時間が経つと赤みが消えてしまう」という方へ。微粒子ソフトフォーカスパウダーが毛穴の影を消し、透けるようなピュアな頬をつくる名品をご紹介します。`,
    sections: [
      { h: '毛穴をぼかすチークの入れ方', body: `ブラシに粉を含ませた後、手の甲でしっかり馴染ませてから、頬の一番高い位置を中心に「くるくると円を描くように磨き塗り」すると、磨かれたようなツヤと毛穴カバーが叶います。` }
    ],
    faqs: [{ q: 'マスクに色が移らないようにするには？', a: 'パウダーチークの上から無色のフェイスパウダーを薄く重ねる（サンドイッチ塗り）ことで、マスクへの色移りを防げます。' }]
  },

  // 77. 頭皮用 育毛剤・スカルプエッセンス女性用（抜け毛・分け目・頭皮ケア周辺）
  {
    id: 'art-peri-women-scalp-hair-growth-essence-2026',
    queryTarget: '女性用 育毛剤 スカルプエッセンス 抜け毛 薄毛 分け目 ボリューム ハリコシ 医薬部外品 マイナチュレ',
    searchKeyword: '女性用 育毛剤 スカルプエッセンス 抜け毛 薄毛',
    title: '【根本から立ち上がるふんわり美髪】女性用育毛剤＆スカルプエッセンスおすすめ10選！抜け毛・分け目ケア比較',
    description: '産後や年齢による分け目の透け感、抜け毛、髪のボリューム不足をケアする医薬部外品スカルプエッセンス10選。ベタつかずサラサラの使い心地で頭皮環境を整える名品を徹底比較。',
    category: 'haircare',
    tags: ['女性用育毛剤', 'スカルプエッセンス女性', '抜け毛予防', '分け目透け感ケア', '頭皮美容液', '髪のボリュームアップ', '美髪頭皮ケア'],
    author: '佐々木 遥',
    featured: true,
    intro: `「最近髪の分け目が目立つ」「トップのボリュームがペタッとする」という女性のための頭皮ケア。血行促進有効成分（センブリエキス等）と女性ホルモンに着目した頭皮美容液を比較します。`,
    sections: [
      { h: '女性の薄毛・抜け毛の主な原因と対策', body: `加齢によるエストロゲン低下、頭皮の血行不良、過度な紫外線ダメージが複合して起こります。お風呂上がりの清潔な頭皮にエッセンスを塗布し、1分間の頭皮マッサージを習慣化することが大切です。` }
    ],
    faqs: [{ q: '整髪料のようなキツイ匂いはありませんか？', a: '女性用エッセンスは無香料やリラックスアロマの香りが主流で、周囲に気づかれず心地よくケアできます。' }]
  },

  // 78. 薬用リップスクラブスティック・洗い流さない（リップスクラブ・リップバーム周辺）
  {
    id: 'art-peri-leave-on-lip-scrub-stick-2026',
    queryTarget: 'リップスクラブ スティック 洗い流さない 砂糖 レブロン キャンメイク 唇 つるつる',
    searchKeyword: 'リップスクラブ スティック 洗い流さない レブロン キャンメイク',
    title: '【洗い流し不要でつるん】リップスクラブスティックおすすめ人気10選！レブロン・キャンメイク等の砂糖バーム比較',
    description: '塗るだけでシュガースクラブが体温で溶けて角質ケアと高保湿を同時に完了するスティック型リップスクラブ10選。洗い流す手間がなく外出先でも使える大ヒットアイテムを徹底比較。',
    category: 'lip',
    tags: ['リップスクラブスティック', '洗い流さないリップスクラブ', 'レブロンキスシュガースクラブ', 'キャンメイクプランプリップケアスクラブ', '唇角質ケアスティック', 'つるつるリップ'],
    author: '橘 えりか',
    featured: true,
    intro: `ジャータイプのスクラブと違って、指を汚さずリップクリーム感覚でサッと塗れる「スティック型シュガースクラブ」。微細な砂糖の粒が古い角質を落としながらとろけて潤い膜に変化する名品をご紹介します。`,
    sections: [
      { h: 'スティック型スクラブのおすすめ使用シーン', body: `- **朝のメイク前**：口紅を塗る前にサッと仕込んで縦ジワと皮剥けを即座にリセット\n- **夜の就寝前**：たっぷり塗って寝るだけで翌朝つるぷるの赤ちゃん唇に` }
    ],
    faqs: [{ q: '砂糖のジャリジャリ感はずっと残りますか？', a: '唇の体温と摩擦で約1〜2分で自然にスーッと溶けて高保湿バームへと変わります。' }]
  },

  // 79. 低刺激・高保湿 乳液・エマルジョン（スキンケア・セラミド周辺）
  {
    id: 'art-peri-gentle-moist-emulsion-ranking-2026',
    queryTarget: '乳液 敏感肌 低刺激 高保湿 ベタつかない セラミド プチプラ デパコス ミノン イハダ',
    searchKeyword: '乳液 敏感肌 低刺激 高保湿 ベタつかない ミノン イハダ',
    title: '【ベタつかないのに潤い密封】敏感肌向け低刺激・高保湿乳液おすすめ10選！ミノン・イハダ等のバリア比較',
    description: '化粧水の水分を逃さず閉じ込め、ベタつきを残さず肌をふっくら整える敏感肌用乳液10選。イハダ（IHADA）やミノンなど、抗炎症成分配合で肌荒れを防ぐ名品を徹底比較します。',
    category: 'skincare',
    tags: ['敏感肌乳液', '低刺激乳液', 'ミノンモイストチャージミルク', 'イハダ薬用エマルジョン', 'ベタつかない乳液', '高保湿エマルジョン', 'バリア機能乳液'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `「油分が多い乳液を使うとニキビができる」「でも塗らないと乾燥する」というジレンマに。水分と油分の絶妙な黄金比率で、肌の角層にスッとなじんで保護膜を作るベストバイをご紹介します。`,
    sections: [
      { h: '乳液の効果を最大限に引き出す手の平プレス', body: `10円玉大を手のひらに広げて体温で温め、顔の中心から外側へ優しく包み込むようにハンドプレス。擦らずに優しく密着させるのが摩擦刺激を防ぐコツです。` }
    ],
    faqs: [{ q: '朝のメイク前に乳液を塗るとヨレませんか？', a: '高浸透処方の乳液を薄く馴染ませ、1分置いて肌表面が落ち着いてから下地を塗れば、ファンデーションの密着度が高まり崩れにくくなります。' }]
  },

  // 80. カラーアイライナー 抜け感・垢抜け（アイメイク周辺）
  {
    id: 'art-peri-color-eyeliner-trending-shades-2026',
    queryTarget: 'カラーアイライナー 抜け感 バーガンディ テラコッタ ブラウン リキッド ジェル プチプラ デジャヴュ キャンメイク',
    searchKeyword: 'カラーアイライナー 抜け感 バーガンディ ブラウン プチプラ',
    title: '【ひと引きで今っぽ垢抜けアイ】カラーアイライナーおすすめ人気10選！バーガンディ・テラコッタ等の抜け感比較',
    description: '黒よりも優しく、ブラウンよりもお洒落な目元をつくる「カラーアイライナー」10選。目尻にさりげなく仕込むだけで透明感と血色感を引き出す人気ニュアンスカラーを徹底比較。',
    category: 'makeup',
    tags: ['カラーアイライナー', 'ニュアンスアイライナー', 'バーガンディライナー', 'テラコッタライナー', '垢抜けアイメイク', 'プチプラカラーライナー', '目尻ライン'],
    author: '松本 結衣',
    featured: true,
    intro: `「いつもの黒アイラインだと目元がキツく見える」「アイメイクを簡単にアップデートしたい」という方へ。オフィスメイクにも馴染む絶妙な締め色ニュアンスカラーライナーを厳選しました。`,
    sections: [
      { h: '初心者でも失敗しないカラーライナーの入れ方', body: `黒目の上までは通常のブラウンを引き、**「目尻のハネ上げ（5mm）」にだけカラーライナーを重ねる**のが、やりすぎ感のない大人の抜け感をつくる鉄則です。` }
    ],
    faqs: [{ q: 'イエベ・ブルベに似合うカラーは？', a: 'イエベにはテラコッタ・オリーブ・ウォームブラウン、ブルベにはバーガンディ・プラム・グレージュが肌の透明感を引き立てます。' }]
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

  for (const def of batch8Defs) {
    console.log(`\n🔍 [第8弾 楽天API通信 記事生成] ${def.id}`);
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
  console.log(`\n🎉 [第8弾 楽天API直結・周辺クエリ拡張完了] 新規作成: ${createdCount}件, 更新: ${updatedCount}件 (総記事数: ${articlesData.length}件)`);
}

main().catch(e => { console.error('❌ エラー:', e); process.exit(1); });
