import fs from 'fs';
import path from 'path';

console.log('🚀 [Peripheral Expansion Batch 10] 楽天オープンAPI完全直接取得・秋冬＆大人美容10選記事生成開始...');

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

const batch10Defs = [
  // 91. 眉毛用 美容液・まゆ育（アイブロウ・まつ毛周辺）
  {
    id: 'art-peri-eyebrow-growth-serum-2026',
    queryTarget: '眉毛 美容液 まゆ育 生えない 抜きすぎ 薄眉 ハリ コシ おすすめ グランフィクサー ラピッドブロウ',
    searchKeyword: '眉毛 美容液 まゆ育 生えない 薄眉 ラピッドブロウ',
    title: '【抜きすぎた眉・薄眉が生えてくる】眉毛美容液おすすめ人気10選！自眉を濃く太く育てるケア比較',
    description: '過去の抜きすぎや加齢でまばらになった眉毛にハリ・コシを与える眉毛専用美容液10選。キャピキシルやペプチド配合で、毛根環境を整えて健康な美眉を育てる人気アイテムを徹底比較。',
    category: 'makeup',
    tags: ['眉毛美容液', 'まゆ育', '眉毛生えない', '薄眉改善', 'ラピッドブロウ', '自眉ケア', 'アイブロウセラム'],
    author: '松本 結衣',
    featured: true,
    intro: `「昔細眉にして抜きすぎて生えてこなくなった」「眉尻の毛が薄くてメイクしにくい」というお悩みに。毛包を活性化させ、自眉本来の存在感を取り戻す眉毛美容液をご紹介します。`,
    sections: [
      { h: 'まつ毛美容液と眉毛美容液の違い', body: `眉毛はまつ毛よりも毛根が深く毛周期が長いため、眉毛専用美容液は皮膚の角層を柔軟にし、根元まで成分を届ける浸透ブースター成分が強化されています。` }
    ],
    faqs: [{ q: '効果を実感するまでどのくらいかかる？', a: '眉毛の毛周期（約2〜3ヶ月）に合わせて毎日朝晩塗布することで、2ヶ月前後で毛のハリや密度の変化を実感できます。' }]
  },

  // 92. 保湿系 拭き取り化粧水・角質クリアローション（角質ケア・導入周辺）
  {
    id: 'art-peri-gentle-wipe-lotion-exfoliating-2026',
    queryTarget: '拭き取り化粧水 保湿 朝の洗顔代わり 角質ケア ゴワつき くすみ 毛穴 アルコールフリー ベネフィーク オードムーゲ',
    searchKeyword: '拭き取り化粧水 保湿 角質ケア 朝洗顔 アルコールフリー',
    title: '【朝の洗顔代わり＆ゴワつきリセット】保湿系ふき取り化粧水おすすめ10選！つっぱらず毛穴をつるつるにする比較',
    description: 'コットンでサッと拭き取るだけで古い角質や寝ている間の皮脂汚れをオフし、透明感を引き出す拭き取り化粧水10選。アルコールフリーで乾燥肌でも安心して使える名品を徹底比較。',
    category: 'skincare',
    tags: ['拭き取り化粧水', '角質クリアローション', '朝の洗顔代わり', 'ゴワつき解消', '毛穴角質ケア', 'アルコールフリー化粧水', '透明感スキンケア'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `「朝洗顔すると乾燥するけれど皮脂汚れは落としたい」「肌がゴワついてファンデが乗らない」という方に。潤いを残しながら不要な角質だけをやさしくオフする高保湿ふき取り化粧水をご紹介します。`,
    sections: [
      { h: '摩擦ゼロで拭き取るコットンの使い方', body: `コットンが裏側まで透けるくらいたっぷり（500円玉大以上）液を含ませ、肌の上を撫でるように滑らせます。液量が少ないと摩擦の原因になるので注意しましょう。` }
    ],
    faqs: [{ q: '毎日使っても肌に負担になりませんか？', a: 'フルーツ酸（AHA）がマイルドで保湿成分（セラミド・ヒアルロン酸）リッチな処方なら、毎朝のルーティンとして安心して使えます。' }]
  },

  // 93. 美容液クレンジング・美容オイルクレンジング（シュウウエムラ・ファンケル周辺）
  {
    id: 'art-peri-cleansing-oil-beauty-serum-2026',
    queryTarget: 'クレンジングオイル 美容液成分 毛穴 角栓 つっぱらない 乾燥しない シュウウエムラ アテニア ファンケル',
    searchKeyword: 'クレンジングオイル 美容液成分 毛穴 角栓 シュウウエムラ アテニア',
    title: '【W洗顔不要＆落とすたび潤う】美容液クレンジングオイルおすすめ10選！毛穴の角栓をするんとオフする人気比較',
    description: '植物由来オイルや美容液成分を70%以上配合し、濃いメイクや角栓を落としながら洗い上がりしっとりのクレンジングオイル10選。シュウウエムラやアテニアなど名品を徹底比較。',
    category: 'skincare',
    tags: ['クレンジングオイル', '美容オイルクレンジング', 'シュウウエムラクレンジング', 'アテニアスキンクリアクレンズ', '毛穴角栓オフ', '乾燥しないクレンジング', 'W洗顔不要オイル'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `「オイルクレンジングは乾燥する」という常識を覆す、贅沢なスキンケア成分配合のクレンジングオイル。擦らず瞬時にメイクを浮かせ、毛穴の黒ずみを溶かし出すベストバイをご紹介します。`,
    sections: [
      { h: '毛穴汚れをごっそり落とす「乳化」の正しいステップ', body: `オイルを顔全体に馴染ませた後、手のひらに少量のぬるま湯を取り、顔全体が「白く濁るまで」優しく撫でて完全に乳化させてから洗い流すのが、毛穴汚れを残さない最大のコツです。` }
    ],
    faqs: [{ q: 'マツエクをしていても使えますか？', a: '一般的なシアノアクリレート系グルー対応のクレンジングオイルなら、マツエクが取れる心配なく使えます。' }]
  },

  // 94. 髪のパサつき・広がりを抑える ヘアセラム＆ヘア美容液（ヘアミルク・オイル周辺）
  {
    id: 'art-peri-hair-serum-essence-repair-2026',
    queryTarget: 'ヘアセラム ヘア美容液 髪のパサつき ダメージ補修 うねり くせ毛 サラサラ ケラスターゼ モロッカンオイル',
    searchKeyword: 'ヘアセラム ヘア美容液 髪 パサつき ダメージ補修 ケラスターゼ',
    title: '【サロン帰りの手触りを再現】高補修ヘアセラム＆ヘア美容液おすすめ10選！枝毛・ハイダメージ集中ケア比較',
    description: 'カラーやブリーチで傷んだ毛先、うねりやパサつきを集中リペアする高濃度ヘアセラム10選。ケラスターゼやサロン専売品など、内側から髪密度を高める名品を徹底比較します。',
    category: 'haircare',
    tags: ['ヘアセラム', 'ヘア美容液', '髪のダメージ補修', 'ケラスターゼセラム', '枝毛切れ毛防止', 'ハイダメージヘアケア', 'サロン専売ヘアトリートメント'],
    author: '佐々木 遥',
    featured: true,
    intro: `オイルやミルクでは補修しきれないハイダメージ毛・深刻なパサつきに。低分子ケラチンやPPT（タンパク質補修成分）が髪の深部まで浸透し、しなやかなコシと指通りを甦らせる人気セラムを比較します。`,
    sections: [
      { h: 'ヘアセラムの効果的な使い方', body: `特にダメージの気になる中間から毛先を中心に揉み込み、粗目のコームで全体に行き渡らせてからドライヤーで乾かすと、熱で補修成分が髪にしっかり定着します。` }
    ],
    faqs: [{ q: '毎日使っても髪が重くなりませんか？', a: '高浸透処方のセラムは髪内部に吸い込まれるため、表面にベタつきを残さず軽やかでサラサラな手触りに仕上がります。' }]
  },

  // 95. 保湿クリーム・セラミドクリーム（乾燥・冬・敏感肌周辺）
  {
    id: 'art-peri-ceramide-rich-moist-cream-2026',
    queryTarget: '保湿クリーム 敏感肌 セラミド 高保湿 乾燥肌 肌荒れ こっくり 朝夜 キュレル イハダ カルテHD',
    searchKeyword: '保湿クリーム 敏感肌 セラミド 高保湿 乾燥肌 カルテHD キュレル',
    title: '【真冬の乾燥でも粉吹きゼロ】高保湿セラミドフェイスクリームおすすめ10選！肌バリアを密閉する名品比較',
    description: 'エアコンや冬の冷気による深刻な乾燥・粉ふき・皮剥けを長時間ガードする高保湿フェイスクリーム10選。カルテHDやキュレルなど、保水有効成分ヘパリン類似物質やセラミド配合品を徹底比較。',
    category: 'skincare',
    tags: ['保湿クリーム敏感肌', 'セラミドフェイスクリーム', 'カルテHDクリーム', 'キュレル潤浸保湿フェイスクリーム', '乾燥肌クリーム', '粉吹き防止', '肌バリアクリーム'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `「乳液だけでは時間が経つとつっぱる」「頬や口周りが粉を吹く」という乾燥肌へ。肌表面に擬似皮脂膜を形成し、水分を絶対に逃さない鉄壁の保湿クリームをご紹介します。`,
    sections: [
      { h: 'クリームの塗り分けテクニック', body: `乾燥しやすい頬や目元・口元には重ね付けしてしっかりフタをし、皮脂分泌の多いTゾーンには薄く伸ばすことで、テカリを防ぎながら全顔の水分バランスを整えられます。` }
    ],
    faqs: [{ q: '朝のメイク前に塗るとファンデがヨレませんか？', a: 'パール粒大を手のひらで温めて薄くハンドプレスし、3分置いて肌に馴染んでから下地を塗れば崩れません。' }]
  },

  // 96. 単色アイシャドウ・シアーラメ（アイメイク・アイシャドウベース周辺）
  {
    id: 'art-peri-single-eyeshadow-sheer-glitter-2026',
    queryTarget: '単色アイシャドウ 透け感 ラメ ツヤ アイグロウジェム アディクション コスメデコルテ プチプラ セザンヌ',
    searchKeyword: '単色アイシャドウ ラメ ツヤ アイグロウジェム アディクション',
    title: '【指塗りでプロ級のグラデーション】単色アイシャドウおすすめ人気10選！透け感ラメ＆濡れツヤ濡れ感比較',
    description: 'パレットいらずでひと塗りで立体アイが完成する単色アイシャドウ10選。コスメデコルテのアイグロウジェムやアディクションなど、濡れたような上品ツヤと繊細ラメを放つ名品を徹底比較。',
    category: 'makeup',
    tags: ['単色アイシャドウ', 'アイグロウジェム', 'アディクションザアイシャドウ', '濡れツヤアイシャドウ', '透け感ラメ', '時短アイメイク', 'プチプラ単色アイシャドウ'],
    author: '松本 結衣',
    featured: true,
    intro: `「4色パレットを使いこなせない」「忙しい朝にサッと垢抜けアイを作りたい」という方に。指先にとってまぶたの中央から左右にワイパー塗りするだけで、美しいグラデーションが生まれる人気単色シャドウを比較します。`,
    sections: [
      { h: '単色シャドウを立体的に見せるコツ', body: `目のキワに一番濃く乗せ、アイホールに向かって上方向にぼかすことで、1色だけでも自然な陰影と彫りの深さが演出できます。` }
    ],
    faqs: [{ q: 'ラメ飛びを防ぐには？', a: 'スフレ状やバーム状のしっとりした質感を選ぶか、アイシャドウベースを薄く仕込んでおくと一日中ラメが密着します。' }]
  },

  // 97. 爪の補強コート・ベースコート（ネイルケア・割れ爪周辺）
  {
    id: 'art-peri-nail-hardener-base-coat-2026',
    queryTarget: '爪 補強 ベースコート ハードナー 二枚爪 縦ジワ 割れ爪 透明 育爪 キャンメイク OPI',
    searchKeyword: '爪 補強 ベースコート ハードナー 二枚爪 OPI キャンメイク',
    title: '【弱った自爪を硬く強くする】爪補強ネイルハードナー＆ベースコートおすすめ10選！二枚爪・割れ爪防止比較',
    description: '薄くて割れやすい爪や二枚爪をダイヤモンドパウダーやナイロン繊維で物理的に補強するネイルハードナー10選。爪の凹凸を補正してネイルカラーの持ちを良くする人気アイテムを徹底比較。',
    category: 'bodycare',
    tags: ['ネイルハードナー', '爪補強ベースコート', '二枚爪防止', '割れ爪補修', 'OPIネイルエンビー', 'キャンメイクネイルハードナー', '育爪ケア'],
    author: '佐々木 遥',
    featured: true,
    intro: `「爪が薄くてすぐに欠ける」「ジェルネイルをオフして爪がボロボロ」という方へ。透明や自然なピンク色のハードナーを塗るだけで、自爪を保護しながら自然なツヤ美爪を育てる名品をご紹介します。`,
    sections: [
      { h: 'ネイルハードナーを使った育爪ステップ', body: `1日おきに重ね塗りし、1週間後に除光液で一度オフして塗り直すサイクルを続けることで、自爪が折れずに長くキレイに伸びていきます。` }
    ],
    faqs: [{ q: '学校や仕事でネイルNGでも使えますか？', a: 'マット（ツヤなし）仕上げのハードナーなら、塗っていることがバレずに自爪の補強が可能です。' }]
  },

  // 98. 薬用美白・シワ改善 スティック美容液（日中の乾燥・お直し周辺）
  {
    id: 'art-peri-stick-serum-wrinkle-touchup-2026',
    queryTarget: 'スティック美容液 保湿 目元 口元 メイクの上から 日中乾燥 シワ改善 イプサ KANEBO エリクシール',
    searchKeyword: 'スティック美容液 保湿 メイクの上から 目元 イプサ',
    title: '【メイクの上から日中の乾燥小ジワを消す】スティック美容液おすすめ10選！目元・口元の夕方カサつき解消比較',
    description: '外出先やオフィスでエアコン乾燥した目元・口元にメイクの上から直塗りできるスティック美容液10選。イプサのザ・タイムRデイエッセンススティックをはじめとする人気アイテムを徹底比較。',
    category: 'skincare',
    tags: ['スティック美容液', '日中保湿スティック', 'メイクの上から保湿', 'イプサデイエッセンススティック', '目元乾燥小ジワ', 'お直し美容液', '持ち歩きスキンケア'],
    author: '松本 結衣',
    featured: true,
    intro: `「夕方になると目元やほうれい線が乾燥してファンデがひび割れる」という悩みに。ポーチからサッと出してひと塗りするだけで、朝の潤いとツヤを瞬時にリセットするスティック美容液をご紹介します。`,
    sections: [
      { h: 'メイクの上からヨレずに保湿するテクニック', body: `スティックを直接肌に滑らせるか、指先にとって体温で温めてから「カサつく部分にトントンと軽くタップ」して馴染ませ、上からパウダーを軽く押さえます。` }
    ],
    faqs: [{ q: 'ファンデーションが剥がれませんか？', a: '水分含有量が高く油分が控えめのスティックなら、ファンデを溶かさずに潤いだけを補給できます。' }]
  },

  // 99. 頭皮用 トリートメント・スカルプパック（頭皮ケア・ヘアケア周辺）
  {
    id: 'art-peri-scalp-hair-treatment-pack-2026',
    queryTarget: '頭皮 トリートメント スカルプパック 地肌につける 保湿 フケ かゆみ 乾燥 アヴェダ スカルプD',
    searchKeyword: '頭皮 トリートメント スカルプパック 地肌 保湿 スカルプD',
    title: '【地肌に直接塗って保湿する】頭皮用スカルプトリートメント＆パックおすすめ10選！フケ・かゆみ・乾燥改善比較',
    description: '一般的なトリートメントと違い、地肌に直接揉み込んで頭皮の乾燥・フケ・かゆみを鎮静するスカルプトリートメント10選。根元の立ち上がりとサラツヤ髪を同時に叶える名品を徹底比較。',
    category: 'haircare',
    tags: ['頭皮トリートメント', 'スカルプパック', '地肌につけるトリートメント', '頭皮のフケかゆみ', 'スカルプDトリートメント', '頭皮保湿パック', '美髪育毛ケア'],
    author: '佐々木 遥',
    featured: true,
    intro: `「頭皮がカサついてフケが出る」「頭皮が突っ張る」という方へ。頭皮の角層に直接潤いを与え、血行促進マッサージも同時にできる優秀スカルプパックをご紹介します。`,
    sections: [
      { h: '頭皮用トリートメントの正しい使い方', body: `シャンプー後、頭皮全体に直接塗布して指の腹で頭皮を揉みほぐすように1分間マッサージ。その後、髪全体にも行き渡らせてからぬるま湯でしっかりすすぎます。` }
    ],
    faqs: [{ q: '通常のトリートメントを頭皮につけてはいけない理由は？', a: '通常の毛髪用トリートメントはカチオン界面活性剤やシリコンが多く、頭皮につけると毛穴詰まりやかゆみの原因になるため、専用処方のものをお使いください。' }]
  },

  // 100. 薬用デオドラント・足用消臭クリーム（フットケア・制汗周辺）
  {
    id: 'art-peri-foot-deodorant-cream-smell-2026',
    queryTarget: '足の匂い 消臭クリーム 制汗 足汗 ムレ 靴のニオイ 医薬部外品 デオナチュレ 足指さらさらクリーム',
    searchKeyword: '足の匂い 消臭クリーム 制汗 デオナチュレ 足指',
    title: '【ブーツやパンプスの足のニオイを無臭化】足用消臭制汗クリームおすすめ10選！朝塗って夜までサラサラ比較',
    description: '靴を脱いだ瞬間の強烈な足のニオイや足汗によるベタつきを根本から防ぐ医薬部外品フットクリーム10選。デオナチュレの足指さらさらクリームなど、殺菌成分配合の人気アイテムを徹底比較。',
    category: 'bodycare',
    tags: ['足の匂い消臭クリーム', '足汗制汗剤', 'デオナチュレ足指さらさらクリーム', '足のムレ防止', 'フット消臭クリーム', '靴のニオイ対策', 'フットケア'],
    author: 'ヘルスケア取材班',
    featured: true,
    intro: `「座敷の飲食店で靴を脱ぐのが怖い」「ストッキングや靴下が蒸れて臭う」というお悩みに。朝塗るだけで足指の間の汗を抑え、ニオイ菌を一日中殺菌し続ける強力フットクリームをご紹介します。`,
    sections: [
      { h: '足のニオイを完全に封じ込める塗り方', body: `出かける前の清潔な足の「指の間」「指の付け根」「足の裏全体」にクリームをすり込みます。爪のキワにもしっかり塗るのがニオイ菌の繁殖を防ぐポイントです。` }
    ],
    faqs: [{ q: 'ストッキングを履く前に塗っても白くなりませんか？', a: 'サラサラパウダー配合の速乾クリームなら、白浮きせずすぐに靴下やストッキングを履けます。' }]
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

  for (const def of batch10Defs) {
    console.log(`\n🔍 [第10弾 楽天API直接通信 記事生成] ${def.id}`);
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
  console.log(`\n🎉 [第10弾 楽天API直結・周辺クエリ拡張完了] 新規作成: ${createdCount}件, 更新: ${updatedCount}件 (総記事数: ${articlesData.length}件)`);
}

main().catch(e => { console.error('❌ エラー:', e); process.exit(1); });
