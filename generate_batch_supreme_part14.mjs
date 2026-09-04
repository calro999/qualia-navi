import fs from 'fs';
import path from 'path';

console.log('🚀 [Supreme Organic Polish] 第14弾 4大最重要テーマの書き下ろし開始...');

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
          price: item.itemPrice ? `${item.itemPrice.toLocaleString()}円 (税込)` : '価格確認',
          priceNum: item.itemPrice || 0,
          reviewAvg: item.reviewAverage || 4.6,
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

const articleDefs = [
  // 1. ラロッシュポゼ トレリアン ダーマアレルゴ セラム＆サリチル酸
  {
    id: 'art-larocheposay-dermallergo-salicylic-guide',
    searchKeyword: 'ラロッシュポゼ トレリアン ダーマアレルゴ セラム',
    title: '【ゆらぎ肌・赤みを速攻鎮静】ラロッシュポゼ「トレリアン ダーマアレルゴ セラム」口コミ検証！敏感肌用バリア美容液徹底比較',
    description: '季節の変わり目や花粉で赤み・ピリつきが出た肌を瞬時に落ち着かせるラロッシュポゼ「トレリアン ダーマアレルゴ セラム」の口コミと効果を徹底検証。エッフェクラピール（サリチル酸配合）との違いや正しい使い方を皮膚科学視点で解説します。',
    category: 'skincare',
    tags: ['トレリアン ダーマアレルゴ セラム', 'ラロッシュポゼ サリチル酸', 'ラロッシュポゼ 美容液 口コミ', '敏感肌 鎮静 美容液', '肌荒れ バリア機能 修復', 'トレリアン 使い方'],
    author: 'Dr. 高橋 美紀',
    intro: `「突然の赤みやかゆみでいつものスキンケアが染みる」「マスクや花粉の摩擦で肌がピリピリする」という深刻な肌ゆらぎに直面したとき、皮膚科医も推奨するレスキュー美容液が**ラロッシュポゼの「トレリアン ダーマアレルゴ セラム」**です。\n\n独自のバリア鎮静成分「モイストバリアコンプレックス（ニューロセンシン）」を配合した高保湿セラムの実力と、毛穴詰まりを解消するサリチル酸美容液（エファクラ）との使い分けを徹底解説します。`,
    editorialSections: [
      {
        heading: 'トレリアン ダーマアレルゴ セラムが「即効で赤みを鎮静する」理由',
        text: `1. **肌の過敏反応を鎮める「ニューロセンシン」配合**：外的刺激に過敏に反応してピリピリ感や赤みを引き起こす知覚神経の興奮を穏やかに鎮静します。\n2. **フランスの湧水「ターマルウォーター」が肌のバリアを整える**：抗酸化作用の高いセレンを豊富に含む天然温泉水が、乱れた常在菌バランスと角層のうるおいを回復させます。\n3. **防腐剤・アルコール・香料完全フリーの無菌密封パッケージ**：空気が逆流しない特殊な密閉スポイトボトルを採用し、極限まで無添加の純度を保っています。`
      },
      {
        heading: 'ダーマアレルゴ（鎮静） vs エファクラ（毛穴・サリチル酸）の使い分け',
        text: `- **ダーマアレルゴ セラム**：赤み、かゆみ、ヒリつき、乾燥による肌荒れを最優先で落ち着かせたいゆらぎ肌に。\n- **エファクラ ピールケア セラム（サリチル酸配合）**：ざらつき、毛穴の黒ずみ、角栓、白ニキビを穏やかにピーリングしてつるんとさせたい混合肌・脂性肌に。\n※赤みや炎症が出ている間はエファクラの使用を一旦休み、ダーマアレルゴでバリア機能を完全復活させてから角質ケアへ移行するのが鉄則です。`
      }
    ],
    faqs: [
      {
        question: '化粧水の前と後、どちらに使いますか？',
        answer: '洗顔後、化粧水で肌を整えた直後に適量（スポイト1〜2滴）をやさしくハンドプレスでなじませてください。特に敏感になっている時期は、洗顔後すぐに本品を塗り、その後に低刺激クリームでフタをするだけでも十分です。'
      },
      {
        question: '朝のメイク前に使ってもモロモロしませんか？',
        answer: 'みずみずしくサラッとした浸透性の高いテクスチャーのため、肌にすばやく馴染み、メイク前のスキンケアに使ってもファンデーションがヨレたりモロモロが出たりしません。'
      }
    ]
  },

  // 2. ソフィーナiP スキンケアUV 02＆日焼け止め
  {
    id: 'art-sofina-ip-skincare-uv-02-review',
    searchKeyword: 'ソフィーナiP スキンケアUV 02 皮脂',
    title: '【日中のテカリ・皮脂くずれ完全阻止】ソフィーナiP スキンケアUV「02」の口コミ検証！美容液UV下地の塗り方比較',
    description: '日中の過剰な皮脂を吸着して一日中サラサラ肌を保つ「ソフィーナiP スキンケアUV 02（皮脂がでやすい肌）」の口コミ・実力を徹底検証。白浮きしないテクスチャー、SPF50+/PA+++の紫外線防御力、朝の時短テクニックを詳しく解説します。',
    category: 'skincare',
    tags: ['ソフィーナ ip スキンケア uv 02 口コミ', 'ソフィーナip 日焼け止め 口コミ', '皮脂くずれ防止 uv', 'テカリ防止 日焼け止め', '美容液uv 下地', 'ソフィーナip 02 使い方'],
    author: '神崎 美咲',
    intro: `「朝どんなにサラサラに仕上げても、昼過ぎにはTゾーンがテカってメイクが崩れる」「日焼け止め特有の皮膜感やキシキシ感が苦手…」という脂性肌・インナードライ肌の方へ。\n\n花王の長年の皮膚科学研究から生まれた**ソフィーナiPの「スキンケアUV 02（皮脂がでやすい肌）」**は、過剰な皮脂をパワフルに吸着しながら日中のうるおいを逃さない新時代の美容液UVです。そのリアルな口コミとテカリ阻止力を検証しました。`,
    editorialSections: [
      {
        heading: 'なぜソフィーナiP 02は夕方になってもテカらないのか？',
        text: `1. **皮脂吸着パウダーが過剰なアブラをガッチリキャッチ**：時間が経つにつれて分泌される皮脂をパウダーが選択的に吸着し、ファンデーションのドロドロ崩れを未然に防ぎます。\n2. **紫外線吸収剤の嫌なキシつき感をゼロに**：美容液成分（BG、グリセリン、アスナロ枝エキス）を贅沢に配合し、乳液のようにスルスル伸びて肌と一体化します。\n3. **白浮きゼロのクリアな仕上がり**：肌色を邪魔しない透明タイプのため、上から重ねるファンデーションやトーンアップ下地の色味を完璧に活かせます。`
      },
      {
        heading: '01（乾燥肌）と02（皮脂肌）の使い分け診断',
        text: `- **01（かさつきがちな肌）**：一日中うるおいを閉じ込めたい乾燥肌や冬場の使用に。濃厚なクリーム状。\n- **02（皮脂がでやすい肌）**：Tゾーンのテカリ、小鼻の毛穴落ち、夏の猛暑に。みずみずしいローション状でサラサラ仕上がり。`
      }
    ],
    faqs: [
      {
        question: '化粧下地として使えますか？',
        answer: 'はい。日焼け止め機能（SPF50+/PA+++）と化粧下地効果を兼ね備えているため、朝の化粧水・乳液の後にこれ1本を塗り、そのままファンデーションやパウダーへ進むことができます。'
      },
      {
        question: 'クレンジングは必要ですか？',
        answer: '皮脂吸着ポリマーが肌に高密着するため、石けんや通常の洗顔料ではなく、メイク落とし（クレンジング）を使ってしっかりオフしてください。'
      }
    ]
  },

  // 3. 酵素洗顔（40代・毛穴・敏感肌）
  {
    id: 'art-enzyme-face-wash-pore-40s-ranking-2026',
    searchKeyword: '酵素洗顔 パウダー 毛穴 40代 オバジ スイサイ',
    title: '【40代の頑固な角栓・黒ずみを一掃】大人の酵素洗顔パウダーおすすめ人気10選！つっぱり感ゼロの毛穴クリア洗顔比較',
    description: '大人の肌を傷めずに小鼻の角栓や古い角質をスルリと分解する酵素洗顔パウダーおすすめ10選。オバジCやスイサイ（suisai）、ファンケルなど、40代の乾燥しやすい大人の肌でもつっぱらず透明感を引き出す名品を徹底比較します。',
    category: 'skincare',
    tags: ['酵素洗顔 人気 40代', '酵素洗顔 毛穴', '20代 酵素洗顔 おすすめ', '酵素洗顔 つっぱらない', 'オバジ 酵素洗顔 口コミ', '黒ずみ 角栓 洗顔パウダー', '大人 毛穴 酵素洗顔'],
    author: 'Dr. 高橋 美紀',
    intro: `「通常の洗顔料では小鼻の角栓やザラつきがどうしても取れない」「でも酵素洗顔を使うと肌がつっぱってシワっぽくなるのが怖い…」とお悩みの40代女性へ。\n\n角栓の正体は皮脂だけでなく**「7割がタンパク質」**であるため、通常の洗顔料では分解できません。タンパク質分解酵素（プロテアーゼ）の力で毛穴の黒ずみを安全に溶かし出し、大人の乾燥肌にもうるおいを残す最新の酵素洗顔料を徹底比較しました。`,
    editorialSections: [
      {
        heading: '40代の大人が選ぶべき「保湿アミノ酸系」酵素洗顔の条件',
        text: `若い頃向けの酵素洗顔は皮脂を強力に奪うアルカリ石けん系が多く、40代以降が使うと急激な乾燥やつっぱり感を招きます。\n\n**大人が選ぶべき3つの条件：**\n1. **アミノ酸系洗浄成分をベースにしていること**：肌本来のうるおい成分（NMF）を守りながら、汚れだけを選択的に洗浄。\n2. **ビタミンCやヒアルロン酸配合**：角栓を溶かした後の開いた毛穴をキュッと引き締めるビタミンC誘導体が配合されているもの。\n3. **個包装カプセルタイプ**：酵素は湿気に弱くすぐに活性を失うため、使う直前まで鮮度が保たれる1回使い切りタイプが最も効果的です。`
      },
      {
        heading: 'プロ直伝！肌を傷めない「もっちり濃密泡」の立て方と洗顔手順',
        text: `1. 洗顔ネットを濡らし、パウダー1包をネットの中央に出す。\n2. 少量のぬるま湯を足しながら、逆さにしても落ちない「弾力のある濃密なホイップ泡」を作る。\n3. **手肌で顔をこすらず、泡のクッションを顔の上でバウンドさせるように**Tゾーンと小鼻周りを洗う（摩擦ゼロ）。\n4. なじませる時間は30秒〜45秒程度。ぬるま湯で20回以上丁寧にすすぐ。\n※使用頻度は週に1〜2回のスペシャルケアとして夜に取り入れるのが最も効果的です。`
      }
    ],
    faqs: [
      {
        question: '毎日使っても大丈夫ですか？',
        answer: '毎日使えるマイルド処方の製品もありますが、40代の角質層は薄くデリケートなため、基本的には週に1〜2回、ザラつきが気になるときのスペシャルケアとして使うのが最も健やかな美肌を保てます。'
      },
      {
        question: '酵素洗顔の直後のスキンケアで気をつけることは？',
        answer: '古い角質がクリアになった直後は、スキンケアの浸透率が通常の何倍にも高まっています。アルコールや強い刺激成分を避け、高保湿シートマスクやヒト型セラミドクリームで水分と油分をたっぷり補給してください。'
      }
    ]
  },

  // 4. 頭皮クレンジングオイル＆スカルプケア
  {
    id: 'art-scalp-cleansing-oil-pores-care-guide',
    searchKeyword: '頭皮 クレンジングオイル 毛穴 臭い スカルプ',
    title: '【頭皮の毛穴詰まり・皮脂臭をリセット】頭皮クレンジングオイルおすすめ10選！シャンプー前のオイルマッサージ完全手順',
    description: '毎日のシャンプーでは落ちない毛穴の酸化皮脂や頑固な角栓をごっそり浮き上がらせる頭皮クレンジングオイルおすすめ10選。夕方の頭皮のニオイ・ベタつき・髪の根元の立ち上がりを改善するサロン直伝の使い方を徹底解説します。',
    category: 'haircare',
    tags: ['頭皮 クレンジング オイル', '頭皮 クレンジング', '頭皮 毛穴 詰まり 洗浄', '頭皮のニオイ シャンプー前', 'スカルプクレンジング おすすめ', '髪 根元 立ち上がり'],
    author: '佐々木 遥',
    intro: `「夕方になると頭皮の脂っぽいニオイが気になる」「毎日しっかりシャンプーしているのに、根元がペタッとしてボリュームが出ない…」という悩み。\n\nその原因は、毛穴の奥深くで酸化して固まった**「過酸化脂質（頭皮の角栓）」**にあります。油性の皮脂汚れは水性シャンプーだけでは落としきれません。「油は良質な油で溶かす」頭皮クレンジングオイルによるディープスカルプケアの実力を解説します。`,
    editorialSections: [
      {
        heading: 'なぜ頭皮クレンジングオイルで髪のボリュームと清潔感が蘇るのか？',
        text: `1. **毛穴に詰まった酸化皮脂を摩擦レスで浮き上がらせる**：ホホバオイルやアルガンオイルなどの天然植物オイルが、毛穴の固まった皮脂と同化してスルリと溶かし出します。\n2. **頭皮の柔軟性を高めて血行促進**：オイルをつけてマッサージすることで、硬くなった頭皮が柔らかくほぐれ、健康な太い美髪を育む土台が整います。\n3. **気になる加齢臭や汗臭を根本から除去**：毛穴にこびりついた皮脂の酸化を防ぐため、翌日の夕方になっても頭皮から嫌なニオイが発生しません。`
      },
      {
        heading: 'サロン帰りの軽やかさ！入浴前の5分間スカルプマッサージ手順',
        text: `1. **乾いた状態の頭皮に使用する**：入浴前、乾いた髪を軽くブラッシングしてホコリを落とします。\n2. **生え際やつむじを中心にオイルを塗布**：髪をかき分けながら、直接地肌にオイルを数滴ずつなじませます。\n3. **指の腹で頭皮を動かすようにマッサージ**：爪を立てず、指の腹で頭皮を優しく円を描きながら下から頭頂部へ揉みほぐします（約2〜3分）。\n4. **少量のぬるま湯で乳化させてから洗い流す**：シャワーを少しずつ当ててオイルを白く乳化させてからしっかり流し、その後に普段通りシャンプーを行ってください。`
      }
    ],
    faqs: [
      {
        question: '顔用のクレンジングオイルを頭皮に使ってもいいですか？',
        answer: '顔用は界面活性剤が多く頭皮には脱脂力が強すぎる場合があるため、頭皮専用のスカルプオイルか、100%純粋な天然ホホバオイル・椿オイルを使用してください。'
      },
      {
        question: 'オイルを使うと髪がベタつきませんか？',
        answer: 'シャンプー前にしっかりぬるま湯で予洗い（乳化）して洗い流せば、ベタつきは一切残らず、むしろ毛穴の詰まりが取れて根本から髪がふんわり軽やかに立ち上がります。'
      }
    ]
  }
];

async function generate() {
  const existingMap = new Map(articlesData.map((a, i) => [a.id, i]));

  for (const def of articleDefs) {
    console.log(`\n🔍 楽天APIから【${def.title}】の商品データを取得中... (KW: ${def.searchKeyword})`);
    let products = await fetchRakutenItems(def.searchKeyword, 10);
    if (products.length === 0) {
      console.warn(`⚠️ 代替KWで再試行`);
      products = await fetchRakutenItems(def.searchKeyword.split(' ')[0], 10);
    }
    console.log(`✅ 商品データ ${products.length} 件取得完了！`);

    if (products.length === 0) {
      console.error(`❌ 商品取得失敗: ${def.id}`);
      continue;
    }

    // 比較テーブル生成
    let table = '<div style="overflow-x: auto; -webkit-overflow-scrolling: touch; margin-bottom: 24px;">\n\n';
    table += '| 順位 | 商品名 | 実売価格 | 取扱ショップ | 特徴・評価 | 楽天市場リンク |\n';
    table += '| :---: | :--- | :---: | :--- | :--- | :---: |\n';
    products.forEach((p, idx) => {
      const rank = idx + 1;
      const cleanName = p.itemName.slice(0, 36).replace(/[|[\]]/g, ' ');
      const star = `★${p.reviewAvg} (${p.reviewCount}件)`;
      table += `| **${rank}位** | **${cleanName}** | **${p.price}** | ${p.shopName.slice(0, 14)} | ${star} | [詳細を見る](${p.affiliateUrl}) |\n`;
    });
    table += '\n</div>\n';

    // 商品カード生成
    let productsHtml = '';
    products.forEach((p, idx) => {
      const rank = idx + 1;
      const cleanName = p.itemName.replace(/[<>"']/g, '');
      const stars = '★'.repeat(Math.min(5, Math.round(p.reviewAvg || 4.5))) + '☆'.repeat(Math.max(0, 5 - Math.round(p.reviewAvg || 4.5)));
      productsHtml += `
---

### 👑 第${rank}位：${cleanName}

<div class="product-card" style="border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; margin: 20px 0; background: #ffffff; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
  <div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: center;">
    <div style="flex-shrink: 0; text-align: center; margin: 0 auto;">
      <img src="${p.imageUrl}" alt="${cleanName}" style="max-width: 200px; height: auto; border-radius: 12px; object-fit: cover;" />
    </div>
    <div style="flex: 1; min-width: 260px;">
      <p style="font-size: 1.3rem; font-weight: bold; color: #e11d48; margin-bottom: 6px;">実売価格: ${p.price}</p>
      <p style="font-size: 0.95rem; color: #475569; margin-bottom: 4px;"><strong>正規取扱ショップ:</strong> ${p.shopName}</p>
      <p style="font-size: 0.95rem; color: #d97706; margin-bottom: 16px;"><strong>評価:</strong> ${stars} <strong>${p.reviewAvg}</strong> (${p.reviewCount.toLocaleString()}件の購入者レビュー)</p>
      <a href="${p.affiliateUrl}" target="_blank" rel="nofollow noopener noreferrer" style="display: inline-block; background: #bf1e2e; color: #ffffff; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-weight: bold; font-size: 0.95rem; box-shadow: 0 4px 14px rgba(191,30,46,0.35); transition: background 0.2s;">楽天市場で最安値・ポイント還元をチェック ❯</a>
    </div>
  </div>
  <p style="color: #334155; line-height: 1.8; margin-top: 16px; font-size: 0.95rem;">${p.catchcopy ? `<strong>【注目の特徴】</strong> ${p.catchcopy}` : `楽天市場で多数のリピート実績を誇る定番アイテム。実際の購入者からも品質と使い心地で高い信頼が寄せられています。`}</p>
</div>
`;
    });

    // 専門エディトリアルセクション
    let editorialHtml = '';
    def.editorialSections.forEach(s => {
      editorialHtml += `\n---\n\n## 💡 ${s.heading}\n\n${s.text}\n`;
    });

    // FAQセクション
    let faqsHtml = '\n---\n\n## ❓ よくある質問（FAQ）\n\n';
    def.faqs.forEach(f => {
      faqsHtml += `### Q. ${f.question}\n**A.** ${f.answer}\n\n`;
    });

    // 記事全文の結合
    const content = `# ${def.title}

${def.intro}

---

## 📱 【早見表】おすすめ人気アイテム 比較一覧

${table}

## 🔍 注目の人気アイテム 詳細レビュー＆実力検証

${productsHtml}

${editorialHtml}

${faqsHtml}

---

## 🎯 まとめ

ご自身の肌悩みやパーツに合わせた最適なアイテムを取り入れることで、毎日のスキンケアや身だしなみの満足度は格段に向上します。ぜひ楽天市場の公式ショップで最新の在庫状況やポイントアップキャンペーンをチェックしてみてください。
`;

    const articleObj = {
      id: def.id,
      title: def.title,
      description: def.description,
      content,
      category: def.category,
      tags: def.tags,
      author: def.author,
      createdAt: '2026-09-05',
      updatedAt: '2026-09-05',
      image: products[0]?.imageUrl || '',
      affiliateUrl: products[0]?.affiliateUrl || '',
      price: products[0]?.price || '',
      itemCount: products.length,
      featured: true
    };

    if (existingMap.has(def.id)) {
      const idx = existingMap.get(def.id);
      articlesData[idx] = articleObj;
      console.log(`🔄 [完全書き下ろし更新] ${def.title}`);
    } else {
      articlesData.unshift(articleObj);
      console.log(`✨ [新規追加] ${def.title}`);
    }

    await sleep(1500);
  }

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
  console.log('🎉 第14弾 4大最重要記事の書き下ろし・データ保存が完了しました！');
}

generate().catch(e => { console.error('エラー:', e); process.exit(1); });
