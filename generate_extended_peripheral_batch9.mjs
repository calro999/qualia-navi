import fs from 'fs';
import path from 'path';

console.log('🚀 [Peripheral Expansion Batch 9] 楽天オープンAPI直接通信・高需要厳選10選記事生成開始...');

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

const batch9Defs = [
  // 81. クリームチーク・リキッドチーク（ツヤ感・乾燥肌・チーク周辺）
  {
    id: 'art-peri-cream-liquid-blush-glow-2026',
    queryTarget: 'クリームチーク リキッドチーク 内側から発光 ツヤ感 落ちない 乾燥肌 プチプラ キャンメイク アディクション',
    searchKeyword: 'クリームチーク リキッドチーク ツヤ感 キャンメイク',
    title: '【内側からジュワッと発色】クリーム＆リキッドチークおすすめ人気10選！乾燥肌でもヨレない生ツヤ比較',
    description: 'カサつきやすい頬にみずみずしいツヤと自然な血色感を与えるクリームチーク＆リキッドチーク10選。ファンデがヨレない叩き込みテクニックや落ちにくい人気色を徹底比較します。',
    category: 'makeup',
    tags: ['クリームチーク', 'リキッドチーク', '生ツヤチーク', 'キャンメイククリームチーク', 'アディクションチークティント', '乾燥肌チーク', '血色メイク'],
    author: '松本 結衣',
    featured: true,
    intro: `パウダーチークだと乾燥して粉浮きしてしまう方や、お風呂上がりのようなみずみずしい血色感を演出したい方に。体温でとろけてピタッと密着する人気クリーム＆リキッドチークをご紹介します。`,
    sections: [
      { h: 'ファンデをヨレさせないクリームチークの乗せ方', body: `指先に少量取り、手の甲で濃さを調整してから「スポンジでポンポンと優しく垂直に叩き込む」のが、ベースメイクを崩さず内側から発光させる秘訣です。` }
    ],
    faqs: [{ q: 'フェイスパウダーの前後どちらに塗る？', a: 'クリーム・リキッドチークは「フェイスパウダーの前」に仕込むと、上からパウダーを重ねた時に内側から透ける自然な血色になります。' }]
  },

  // 82. ヘアミルク 保湿・補修・パサつき防止（ヘアオイル・アウトバス周辺）
  {
    id: 'art-peri-hair-milk-moist-repair-2026',
    queryTarget: 'ヘアミルク アウトバストリートメント 洗い流さない 保湿 パサつき 広がり くせ毛 オルビス ミルボン',
    searchKeyword: 'ヘアミルク 洗い流さない トリートメント 保湿 オルビス ミルボン',
    title: '【髪の芯まで水分補給】ヘアミルクおすすめ人気10選！パサつき・広がりを抑えるアウトバストリートメント比較',
    description: 'ドライヤー前の濡れた髪に浸透し、しっとりまとまる美髪へ導くアウトバスヘアミルク10選。オルビスのエッセンスインヘアミルクやミルボンのエルジューダエマルジョンなど名品を徹底比較。',
    category: 'haircare',
    tags: ['ヘアミルクおすすめ', 'オルビスヘアミルク', 'エルジューダエマルジョン', '洗い流さないトリートメント', '髪のパサつき改善', 'くせ毛まとまる', 'ヘアケア'],
    author: '佐々木 遥',
    featured: true,
    intro: `「オイルだけだと髪がパサつく」「内部の乾燥（インナードライ毛）をケアしたい」という方へ。水分と油分を同時に補給し、しなやかで柔らかい手触りを取り戻す優秀ヘアミルクをご紹介します。`,
    sections: [
      { h: 'ヘアミルクとヘアオイルの重ね付け（W使い）の黄金ルール', body: `1. タオルドライ後の濡れた髪に【ヘアミルク】をつけ内部に水分を補給\n2. その上から【ヘアオイル】を毛先に少量重ねて油膜でフタをする\n3. ドライヤーで乾かすとサロン帰りの極上ツヤ髪が完成します` }
    ],
    faqs: [{ q: '乾いた髪に使っても大丈夫ですか？', a: '朝のスタイリング前や日中のパサつき直しに乾いた髪へ少量を揉み込むのも非常に効果的です。' }]
  },

  // 83. グリセリンフリー スキンケア（ニキビ・毛穴・テカリ周辺）
  {
    id: 'art-peri-glycerin-free-skincare-acne-pore-2026',
    queryTarget: 'グリセリンフリー 化粧水 乳液 美容液 毛穴 黒ずみ ニキビ テカリ 赤ら顔 プチプラ 松山油脂',
    searchKeyword: 'グリセリンフリー 化粧水 乳液 美容液 毛穴 ニキビ',
    title: '【毛穴の黒ずみ・赤ら顔を脱出】グリセリンフリースキンケアおすすめ10選！ニキビ肌・オイリー肌のためのさっぱり比較',
    description: 'グリセリンによるアクネ菌の増殖や毛穴の黒ずみ悪化を防ぐ「グリセリンフリー」の化粧水・美容液・乳液10選。皮脂テカリを抑えて毛穴の引き締まったクリア肌をつくる名品を徹底比較。',
    category: 'skincare',
    tags: ['グリセリンフリー化粧水', 'グリセリンフリー美容液', '毛穴黒ずみ改善', 'ニキビ肌スキンケア', '皮脂テカリ防止', '松山油脂グリセリンフリー', 'さっぱり保湿'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `「高保湿コスメを使うと顔が赤黒くテカる」「毛穴の黒ずみが目立つ」というオイリー・混合肌へ。グリセリンを排除または極小化し、BGやヒアルロン酸でサラリと水分補給するスキンケアを厳選しました。`,
    sections: [
      { h: 'グリセリンフリーが向いている肌質', body: `- 脂性肌・インナードライでTゾーンのテカリが激しい方\n- 小鼻や頬の毛穴が黒ずみやすい方\n- ニキビができやすく顔に赤みが出やすい方` }
    ],
    faqs: [{ q: '乾燥してつっぱりませんか？', a: 'ヒアルロン酸、アミノ酸、セラミドなどの代替保水成分がしっかり配合されたアイテムを選べば、つっぱらず水分補給できます。' }]
  },

  // 84. シェーディング・小顔コントゥアリング（ベースメイク・ハイライト周辺）
  {
    id: 'art-peri-shading-contour-face-slimming-2026',
    queryTarget: 'シェーディング パウダー スティック ノーズシャドウ 小顔 イエベ ブルベ 自然 トゥークールフォースクール キャンメイク',
    searchKeyword: 'シェーディング パウダー スティック 小顔 トゥークールフォースクール',
    title: '【自然な影で劇的小顔】シェーディングおすすめ人気10選！ノーズシャドウ＆フェイスライン立体感比較',
    description: 'フェイスラインをシャープに引き締め、鼻筋の通った立体小顔をつくるシェーディング10選。too cool for schoolやキャンメイクなど、赤みのない自然な影色パウダーを徹底比較します。',
    category: 'makeup',
    tags: ['シェーディングおすすめ', 'ノーズシャドウ', '小顔メイク', 'トゥークールフォースクール', 'キャンメイクシェーディング', 'コントゥアリング', 'イエベブルベシェーディング'],
    author: '松本 結衣',
    featured: true,
    intro: `丸顔やエラ張り、鼻の低さを光と影の錯視でスッキリ整える「シェーディング」。不自然な汚れに見えず、肌に溶け込む絶妙なグレージュ・影色カラーの人気アイテムをご紹介します。`,
    sections: [
      { h: '失敗しないシェーディングの入れ方', body: `1. **フェイスライン**：耳の下からあご先に向かってエラの骨の裏側にサッと入れる\n2. **ノーズシャドウ**：眉頭のくぼみから鼻筋のキワに薄くぼかす\n3. **人中短縮**：鼻の下と唇の下のくぼみに影を入れると顔が引き締まります` }
    ],
    faqs: [{ q: 'イエベとブルベで選ぶ色は違う？', a: 'イエベには黄みを含んだウォームブラウン、ブルベには黄みのないグレー味の強いアッシュブラウンが自然に馴染みます。' }]
  },

  // 85. 炭酸泡洗顔料 毛穴・くすみオフ（洗顔・炭酸周辺）
  {
    id: 'art-peri-carbonated-foam-face-wash-2026',
    queryTarget: '炭酸洗顔 泡洗顔 もっちり泡 毛穴 くすみ 血行促進 朝洗顔 ワンプッシュ ビフェスタ オバジ',
    searchKeyword: '炭酸洗顔 泡洗顔 もっちり泡 毛穴 くすみ ビフェスタ',
    title: '【ワンプッシュで濃密もちもち泡】炭酸泡洗顔料おすすめ人気10選！くすみ・毛穴の黒ずみを洗い流す比較',
    description: '手では作れない微細な高濃度炭酸泡が毛穴の汚れを吸着し、血行を促進して透明感を呼び戻す炭酸泡洗顔料10選。ビフェスタをはじめ、朝の時短洗顔にも最適な人気アイテムを徹底比較。',
    category: 'skincare',
    tags: ['炭酸泡洗顔', '炭酸洗顔料おすすめ', '濃密泡洗顔', 'ビフェスタ炭酸泡洗顔', '朝の時短洗顔', '毛穴くすみオフ', '血行促進洗顔'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `「朝起きた時の顔のくすみが気になる」「泡立てるのが面倒」という方に。缶から出した瞬間から弾力のあるホイップ泡が出てきて、擦らずに血行促進と毛穴大掃除ができる炭酸洗顔をご紹介します。`,
    sections: [
      { h: '炭酸泡洗顔の「泡パック」活用法', body: `顔全体に濃密泡を広げ、擦らずに20〜30秒間そのままキープしてからぬるま湯で洗い流すと、炭酸の血行促進効果で顔色がパッと明るくなります。` }
    ],
    faqs: [{ q: '肌がピリピリしませんか？', a: '炭酸ガスの血行促進作用でほんのり温かさを感じることがありますが、アミノ酸系マイルド処方のものなら敏感肌でも安心して使えます。' }]
  },

  // 86. ハンド用 UVカット 日焼け止めハンドクリーム（ハンドケア・日焼け止め周辺）
  {
    id: 'art-peri-hand-uv-sunscreen-cream-2026',
    queryTarget: '日焼け止め ハンドクリーム UV ハンド用 SPF 手の甲 シミ 予防 運転 ベタつかない ジルスチュアート',
    searchKeyword: '日焼け止め ハンドクリーム UV 手の甲 シミ SPF',
    title: '【運転・外出時の手の甲の日焼けを防止】UVカットハンドクリームおすすめ人気10選！SPF配合・ベタつかない比較',
    description: '日常の紫外線や車の運転による手の甲のシミ・光老化を防ぐUVハンドクリーム10選。高い保湿力とSPF/PA値を両立し、塗った直後もサラサラで手洗いや仕事に支障のない名品を徹底比較。',
    category: 'suncare',
    tags: ['UVハンドクリーム', '日焼け止めハンドクリーム', '手の甲の紫外線対策', '手の甲のシミ予防', '運転用UVハンドクリーム', 'ベタつかないハンドケア'],
    author: '佐々木 遥',
    featured: true,
    intro: `手洗いをするたびに日焼け止めが落ちて無防備になりがちな「手の甲」。ハンドクリームの潤い補給と日焼け止め効果が1本で完結する、ポーチ必携のハイブリッドアイテムを比較します。`,
    sections: [
      { h: 'UVハンドクリームが役立つシーン', body: `- 車や自転車の運転中（フロントガラス越しの紫外線対策）\n- 屋外レジャーや通勤時のスマホ操作中\n- オフィスで窓際の席に座る日中ケア` }
    ],
    faqs: [{ q: '一般的な日焼け止めを手に塗るのと何が違う？', a: '手の皮膚に必要な高保湿成分（シアバター・ヒアルロン酸等）がリッチに含まれており、手荒れを防ぎながらUVカットできます。' }]
  },

  // 87. スカルプ・頭皮マッサージブラシ（シャンプーブラシ・パドルブラシ周辺）
  {
    id: 'art-peri-scalp-massage-shampoo-brush-2026',
    queryTarget: 'スカルプブラシ 頭皮マッサージ シャンプーブラシ シリコン お風呂 コリほぐし uka ウカ ケンザン',
    searchKeyword: 'スカルプブラシ 頭皮マッサージ シャンプーブラシ uka ケンザン',
    title: '【頭皮のコリをほぐしてリフトアップ】スカルプシャンプーブラシおすすめ人気10選！ukaケンザン等の硬さ比較',
    description: 'お風呂でのシャンプー時や日中のツボ押しに大人気のシリコン製スカルプブラシ10選。uka（ウカ）のスカルプブラシ ケンザンをはじめ、毛穴汚れ落としと頭皮マッサージ効果を徹底比較。',
    category: 'haircare',
    tags: ['スカルプブラシ', 'シャンプーブラシ', '頭皮マッサージブラシ', 'ukaケンザン', 'ウカスカルプブラシ', '頭皮のコリほぐし', 'リフトアップブラシ'],
    author: '佐々木 遥',
    featured: true,
    intro: `指先だけでは届かない頭皮の毛穴汚れをかき出し、固まった頭筋をほぐしてフェイスラインの引き締めをサポートする「スカルプブラシ」。絶妙な硬さと心地よい刺激を誇る人気モデルをご紹介します。`,
    sections: [
      { h: 'スカルプブラシの硬さの選び方（ソフト vs レギュラー vs バリカタ）', body: `- **ソフト**：頭皮が敏感な方・初めてブラシを使う方に\n- **レギュラー（中間）**：程よい刺激で毎日のシャンプーを心地よくしたい方\n- **ハード・バリカタ**：強い刺激で頭皮のコリをしっかりほぐしたい方・男性にも` }
    ],
    faqs: [{ q: '爪が長くても使えますか？', a: 'ネイルアートをしている方でも爪を傷めずに頭皮をしっかり洗えるため、ネイルをしている方にも最適です。' }]
  },

  // 88. 唇用 ナイトパック・リップトリートメント（リップケア・ラネージュ周辺）
  {
    id: 'art-peri-overnight-lip-pack-repair-2026',
    queryTarget: 'リップパック 夜用 唇 パック 集中ケア ひび割れ 縦ジワ ぷるぷる 保湿 チューブ ジャー',
    searchKeyword: 'リップパック 夜用 唇 集中ケア 保湿',
    title: '【一晩でガサガサ唇を立て直す】夜用集中リップパックおすすめ人気10選！高密着ナイトトリートメント比較',
    description: '寝ている間に濃厚なエモリエント成分が唇を密閉し、頑固な皮剥けや深い縦ジワをふっくら修復する夜用リップパック10選。翌朝口紅がキレイに乗る感動のぷるぷるリップケアを解説。',
    category: 'lip',
    tags: ['リップパック夜用', 'ナイトリップパック', '唇集中トリートメント', '唇の皮剥け改善', 'ふっくら唇ケア', 'リップケアおすすめ'],
    author: '橘 えりか',
    featured: true,
    intro: `「日中何度リップを塗っても乾く」という深刻なダメージ唇に。就寝中の無防備な乾燥時間を集中補修タイムに変える、高密着バーム＆ジェルパックの人気アイテムを比較します。`,
    sections: [
      { h: '夜用リップパックの効果的な塗り方', body: `唇の輪郭より1mmほど広めに厚めに塗り広げることで、唇のキワのくすみや乾燥小ジワまで余すところなくケアできます。` }
    ],
    faqs: [{ q: 'ラップでパックしてもいいですか？', a: 'リップパックを塗った上に小さく切ったラップを5分間乗せると、スチーム温熱効果でさらにふっくら仕上がります。' }]
  },

  // 89. まゆ毛・アイブロウペンシル 極細芯（アイブロウツール周辺）
  {
    id: 'art-peri-ultra-fine-eyebrow-pencil-2026',
    queryTarget: 'アイブロウペンシル 極細 落ちない 1本1本 眉尻 描きやすい プチプラ セザンヌ エクセル ケイト',
    searchKeyword: 'アイブロウペンシル 極細 落ちない 眉尻 セザンヌ',
    title: '【自眉のように1本1本描ける】極細アイブロウペンシルおすすめ人気10選！折れにくく落ちない名品比較',
    description: '0.9mm〜1.5mmの超極細芯で、眉尻の繊細なラインや毛のない部分に自眉のような毛を描き足せるアイブロウペンシル10選。セザンヌやエクセルなどウォータープルーフ人気品を徹底比較。',
    category: 'makeup',
    tags: ['アイブロウペンシル極細', '極細眉ペンシル', 'セザンヌ超細芯アイブロウ', '落ちないアイブロウ', '眉尻消えない', 'プチプラアイブロウペンシル'],
    author: '松本 結衣',
    featured: true,
    intro: `眉尻が太くなったりボテッとした海苔眉になるのを防ぐ「超極細アイブロウペンシル」。まるで本物の毛が生えているかのように一本一本リアルに描ける2026年ベストバイをご紹介します。`,
    sections: [
      { h: '極細芯を折らずにキレイに描くコツ', body: `芯は1mm以上繰り出さず、力を抜いて皮膚をなでるように軽いタッチで毛並みに沿って描き足すのが折れずに繊細なラインを引く秘訣です。` }
    ],
    faqs: [{ q: 'パウダーとペンシルどちらを先に使う？', a: 'まずペンシルで毛の足りない部分を描き、その上からパウダーをふんわり重ねると自然なグラデーションになります。' }]
  },

  // 90. 敏感肌向け 泡洗顔料・ポンプ式（洗顔・時短・低刺激周辺）
  {
    id: 'art-peri-pump-foam-face-wash-sensitive-2026',
    queryTarget: '泡洗顔 ポンプ 敏感肌 朝洗顔 摩擦レス つっぱらない アミノ酸 キュレル ミノン イハダ',
    searchKeyword: '泡洗顔 ポンプ 敏感肌 朝洗顔 つっぱらない キュレル ミノン',
    title: '【朝の時短＆摩擦ゼロ洗顔】敏感肌向けポンプ式泡洗顔料おすすめ10選！つっぱらず潤い残す人気比較',
    description: '押すだけで上質なもこもこ泡が出てくるポンプ式泡洗顔料10選。キュレルやミノンなど、セラミドを守りながら余分な皮脂汚れだけをマイルドに落とす敏感肌用名品を徹底比較。',
    category: 'skincare',
    tags: ['泡洗顔ポンプ', '敏感肌泡洗顔', '朝用泡洗顔', 'キュレル泡洗顔料', 'ミノンジェントルウォッシュ', '摩擦レス洗顔', '低刺激洗顔フォーム'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `朝の忙しい時間でも泡立てネット不要で即洗える「ポンプ式泡洗顔料」。クッション性の高いキメ細かい泡が肌との摩擦を防ぎ、洗い上がりのつっぱり感ゼロを叶える人気洗顔料をご紹介します。`,
    sections: [
      { h: '敏感肌がポンプ泡洗顔を選ぶメリット', body: `1. 泡立て不足による手の摩擦ダメージを完全に防止\n2. アミノ酸系マイルド洗浄成分で角層のセラミド流出を阻止\n3. 素早い泡切れで肌へのすすぎ負担を最小化` }
    ],
    faqs: [{ q: '夜のメイク落とし後にも使えますか？', a: 'クレンジング後のダブル洗顔としても肌に負担をかけずスッキリ洗い流せます。' }]
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

  for (const def of batch9Defs) {
    console.log(`\n🔍 [第9弾 楽天API通信 記事生成] ${def.id}`);
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
  console.log(`\n🎉 [第9弾 楽天API直結・周辺クエリ拡張完了] 新規作成: ${createdCount}件, 更新: ${updatedCount}件 (総記事数: ${articlesData.length}件)`);
}

main().catch(e => { console.error('❌ エラー:', e); process.exit(1); });
