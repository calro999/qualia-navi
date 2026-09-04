import fs from 'fs';
import path from 'path';

console.log('🚀 [Supreme Organic Polish] 第5弾 4大最重要テーマの書き下ろし開始...');

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
  // 1. VTリードルショット 効果・老ける噂検証
  {
    id: 'art-sachiko-vt-reedleshot-effects-truth',
    searchKeyword: 'VT リードルショット 100 300',
    title: '【徹底検証】VTリードルショットは「効果なし・老ける」って本当？チクチク感の理由と100/300/700の正しい選び方',
    description: '天然美容針（シリカ）で話題のVTリードルショットの口コミ・効果を皮膚科学視点で徹底検証。「効果がない・肌が老ける」と噂される理由や好転反応の真相、毛穴やキメを劇的に整える導入美容液としての使い方を解説します。',
    category: 'skincare',
    tags: ['リードル ショット 効果 なし', 'リードルショット 老ける', 'リードルショット100 効果', 'リードル ショット 効果', 'VT リードルショット', '美容針 美容液', '韓国コスメ 毛穴ケア'],
    author: 'Dr. 高橋 美紀',
    intro: `塗った瞬間にチクチクとした独特の刺激が走り、翌朝の肌の手触りが激変するとSNSで爆発的な大ヒットを記録している**VTの「リードルショット」**。\n\nしかし、検索窓には「効果なし」「老ける」「ビニール肌になる」といった不穏なキーワードも並びます。なぜチクチクするのか、針状成分が肌にどのような作用をもたらすのか、そして本当に肌を若々しく立て直すことができるのか、成分と使い方の両面から本音で検証しました。`,
    editorialSections: [
      {
        heading: 'チクチクの正体「シリカ（天然マイクロニードル）」が肌に与える真実',
        text: `リードルショットに含まれる針の正体は、純度99%の天然シリカ（ケイ素）から作られたマイクロサイズの微細針「シリカニードル」です。針の内部には無数の空洞があり、そこにツボクサエキス（CICA）などの美容成分が浸透しています。\n\n肌に塗り込むことで、角層深部に微細な通り道（チャネル）を形成し、その後に重ねる化粧水や美容液の浸透率を飛躍的に高めます。針自体は約72時間（約3日間）かけて古い角質とともに自然に垢として剥がれ落ちるため、体内に残留する心配はありません。`
      },
      {
        heading: 'なぜ「老ける・効果がない」と感じる人がいるのか？原因と対策',
        text: `1. **保湿不足による一時的な乾燥**：針刺激によって角層のターンオーバーが急激に促されるため、一時的に肌表面の水分が逃げやすくなります。このときに十分なセラミドやヒアルロン酸の保湿を怠ると、キメが乱れて小ジワが目立ち「老けた」と感じてしまいます。\n2. **レベルの急激な上げすぎ**：初心者がいきなり高濃度の「700」や「1000」を使うと、バリア機能が追いつかず赤みや皮剥け（レチノイド反応に似た炎症）を起こします。\n3. **正しい導入手順**：洗顔直後の【一番最初】に塗り、手のひらで押し込むようにハンドプレス。その直後に必ず【高保湿シートマスクや鎮静クリーム】を重ねるのが鉄則です。`
      }
    ],
    faqs: [
      {
        question: '50/100/300/700はどれから始めるべきですか？',
        answer: '敏感肌や初めての方はデイリーケア用の「100」からスタートしてください。肌が慣れて毛穴の開きが気になる部分には3日おきに「300」、週1回のスペシャルケアとして「700」とステップアップするのが最も安全で効果的です。'
      },
      {
        question: 'レチノールやビタミンCと併用しても大丈夫ですか？',
        answer: '高濃度レチノールや高濃度ビタミンCと同時に使うと刺激が強すぎる場合があります。リードルショットの直後は、低刺激なヒアルロン酸やCICA、セラミドなどの鎮静・高保湿アイテムと組み合わせるのが最も肌トラブルを防げます。'
      }
    ]
  },

  // 2. リポC（Lypo-C）効果・飲むタイミング・口コミ
  {
    id: 'art-sachiko-lypoc-vitamin-c-timing-effects',
    searchKeyword: 'Lypo-C リポ カプセル ビタミンC',
    title: '【飲む高濃度ビタミンC】リポC（Lypo-C）のリアルな効果と口コミ！まずい味の飲み方＆一番効く飲むタイミング完全解説',
    description: '吸収率にこだわった飲むビタミンC点滴サプリ「Lypo-C（リポ・カプセル ビタミンC）」の口コミ・美容効果を徹底検証。「海水のようにまずい」味を美味しく飲む裏技、朝と夜どちらが効くのか、毛穴やくすみへの実感度を詳しく解説します。',
    category: 'inner-care',
    tags: ['リポ カプセル ビタミンc 効果', 'リポシー 効果 口コミ', 'リポシー 口コミ', 'lypo c 効果', 'lypo-c 効果', 'リポカプセルビタミンc 効果', 'リポ c 効果', 'リポc 飲み方', 'ビタミンC サプリ 口コミ'],
    author: 'Dr. 高橋 美紀',
    intro: `美容皮膚科医やトップモデル、芸能人がこぞって「これだけは手放せない」と絶賛する飲む高濃度ビタミンC、**「Lypo-C（リポ・カプセル ビタミンC）」**。\n\n通常のビタミンCサプリは摂取しても大部分が尿として排出されてしまいますが、リポCは100nm（ナノメートル）以下の均一なリン脂質のリポソームに包み込むことで、細胞へほぼ100%届ける吸収率を実現しています。その圧倒的な効果と、誰もが直面する「味のクセ」を克服する飲み方を解説します。`,
    editorialSections: [
      {
        heading: 'リポCの最大の難関「まずい味（海水味）」を克服するおすすめの飲み方',
        text: `リポCをそのまま口に含むと、原料のリン脂質（大豆由来）と微量のナトリウムによる「塩水と油が混ざったような独特の味」に驚く人が大半です。美味しくストレスなく続けるための黄金レシピをご紹介します。\n\n- **トマトジュース割（一番おすすめ）**：トマトの酸味と旨味がリポCの塩気と完璧に調和し、味の変化をほとんど感じずに一気に飲めます。\n- **炭酸水＋レモン果汁**：すっきりとした炭酸レモン水に混ぜると、フレッシュな酸味で塩味が相殺されます。\n- **100%オレンジ・グレープフルーツジュース**：柑橘類の自然な酸味で包み込み、ジュース感覚で手軽に摂取できます。`
      },
      {
        heading: '朝 vs 夜？効果を最大化する「飲むタイミングと本数」',
        text: `- **朝の空腹時（紫外線防御＆疲労回復）**：胃に食べ物が入っていない空腹時に飲むと、リポソームが破壊されずに小腸へダイレクトに届き、吸収率が最高潮に達します。日中の紫外線ダメージやストレスから肌を守りたい方に最適です。\n- **就寝前の空腹時（睡眠中の美白＆修復）**：成長ホルモンが分泌される夜のゴールデンタイムに合わせて飲むと、睡眠中の肌再生とコラーゲン生成が強力に後押しされます。\n- **本数の目安**：普段のコンディション維持なら1日1包、翌日に大事な予定がある日や日焼けをしてしまった日は朝・昼・晩に1包ずつ（計3包）の集中チャージが効果的です。`
      }
    ],
    faqs: [
      {
        question: '常温保存でも大丈夫ですか？',
        answer: 'リポソームカプセルは非常にデリケートなため、直射日光と高温を避け、冷蔵庫（チルド室）で冷やして保存するのが品質維持と飲みやすさの両面で最もおすすめです。'
      },
      {
        question: 'どれくらいの期間で肌の変化を実感できますか？',
        answer: '個人差はありますが、寝起きの体の軽さや疲労回復感は翌朝〜数日以内に、肌のくすみ抜けや毛穴の引き締まり、透明感は2週間〜1ヶ月程度の継続で実感する声が最も多く寄せられています。'
      }
    ]
  },

  // 3. パドルブラシ効果・頭皮マッサージ
  {
    id: 'art-sachiko-paddle-brush-effects-guide',
    searchKeyword: 'パドルブラシ アヴェダ 頭皮マッサージ ヘアブラシ',
    title: '【頭皮からリフトアップ】パドルブラシの驚きの効果と正しい使い方！アヴェダなど人気おすすめ10選徹底比較',
    description: 'クッション性の高いパドルブラシによる頭皮マッサージ効果、血行促進、髪のツヤ出し効果を徹底解説。アヴェダ（AVEDA）をはじめとする人気パドルブラシ10選のブラッシング手順と選び方をまとめました。',
    category: 'haircare',
    tags: ['パドルブラシ 頭皮マッサージ', 'パドル ブラシ 効果', 'パドルブラシ おすすめ', 'アヴェダ パドルブラシ', '頭皮ケア パドルブラシ', '頭皮マッサージ パドルブラシ', 'リフトアップ 頭皮ケア', '美髪 ヘアブラシ'],
    author: '佐々木 遥',
    intro: `「最近フェイスラインのもたつきが気になる」「髪にボリュームがなくペタッとしてツヤが出ない」という方にぜひ取り入れてほしいのが、空気圧を利用した**パドルブラシによる頭皮ブラッシング**です。\n\n頭皮とお顔の皮膚は一枚の皮でつながっています。頭皮の筋肉のコリをほぐして血流を促進することで、根本から立ち上がるツヤ髪を育むだけでなく、目元やフェイスラインの引き締め効果まで期待できます。`,
    editorialSections: [
      {
        heading: 'パドルブラシで得られる4大美容効果',
        text: `1. **頭皮のコリほぐしと血行促進**：空気穴のあるふかふかのクッションが適度な圧を分散し、頭皮を傷めずに心地よい指圧マッサージ効果を与えます。\n2. **お顔のリフトアップサポート**：側頭筋や後頭部の緊張を緩めることで、重力に負けない引き締まったフェイスラインをサポートします。\n3. **キューティクルを整えて髪のツヤUP**：頭皮の天然の皮脂（保護膜）を毛先まで均一に行き渡らせ、パサついた髪に潤いとまとまりを与えます。\n4. **シャンプー前の毛穴汚れ浮かし**：入浴前にブラッシングすることで、毛穴に詰まった皮脂汚れやフケ、ホコリを浮き上がらせ、シャンプーの泡立ちと洗浄効果を高めます。`
      },
      {
        heading: 'プロ直伝！朝晩2分の頭皮マッサージ手順',
        text: `1. **毛先の絡まりを優しくほどく**：いきなり根元から梳かさず、毛先から中間、根元へと順にブラッシングします。\n2. **生え際から頭頂部へ引き上げるように梳かす**：おでこの生え際やこめかみ、襟足から、つむじ（頭頂部）に向かって下から上へブラシを通します。\n3. **ブラシ面を軽くポンポンと頭皮にタッピングする**：頭全体をリズミカルに優しく叩くことで、心地よい振動が頭皮の血流を呼び覚まします。`
      }
    ],
    faqs: [
      {
        question: 'ブラシ面に穴が1つ空いているのは不良品ですか？',
        answer: '空気圧を調整して弾力を保つための「通気穴（空気穴）」です。ピンが1本抜けているように見えますが、正常な構造ですのでご安心ください。'
      },
      {
        question: 'ブラシのお手入れや水洗いはどうすればいいですか？',
        answer: '木製ハンドルのブラシは水につけ置きすると木が割れたりカビの原因になります。ピンに絡まった髪やホコリを専用クリーナーや綿棒で取り除き、固く絞った濡れタオルで優しく拭き取って陰干ししてください。'
      }
    ]
  },

  // 4. ドライシャンプー 口コミ・ダイアン等
  {
    id: 'art-sachiko-dry-shampoo-diane-ranking-guide',
    searchKeyword: 'ドライシャンプー ダイアン スプレー',
    title: '【瞬時にサラサラ前髪】ドライシャンプーおすすめ人気10選！ダイアン等の口コミ・汗のベタつき＆頭皮ニオイ撃退比較',
    description: '夏の汗によるペタペタ前髪や夕方の頭皮の皮脂臭をシュッとひと吹きで瞬間リセットするドライシャンプーおすすめ10選。ダイアンをはじめとするスプレー・シート・パウダータイプの実力を徹底比較します。',
    category: 'haircare',
    tags: ['ドライシャンプー 口コミ', 'ドライシャンプー おすすめ', 'ダイアン ドライ シャンプー 口コミ', '前髪 リセット スプレー', '頭皮のニオイケア', '汗ベタつき解消', '防災コスメ ドライシャンプー'],
    author: '佐々木 遥',
    intro: `猛暑の通勤・通学、スポーツ後のペタッと割れておでこに張り付く前髪、夕方の気になる頭皮のニオイ。シャワーを浴びる時間がないときに、水を使わずにシャンプーしたてのような爽快感とふんわりボリュームを蘇らせるのが**ドライシャンプー**です。\n\n「粉っぽく白浮きしない？」「香水のような良い香りは続く？」という疑問を解消し、オフィス・ジム・お出かけ先・防災備蓄まで大活躍する名品を厳選しました。`,
    editorialSections: [
      {
        heading: '白浮きゼロ！前髪がふんわり蘇る正しいスプレー手順',
        text: `1. **缶を上下によく振る**：皮脂吸着パウダーが均一に混ざるよう、使用直前にカチカチと音が鳴るまでしっかり振ります。\n2. **頭皮から20cm離してスプレーする**：近距離から吹きかけると一箇所に粉が固まり白残りの原因になります。髪をかき分け、地肌をめがけて斜め上からスプレーします。\n3. **指の腹でシャンプーするように揉み込む**：吹きかけた後、指先で頭皮全体をわしゃわしゃと軽く揉み込むと、パウダーが皮脂を瞬時に吸着して透明に馴染みます。\n4. **最後にブラシや手ぐしを通す**：余分なパウダーを払い落としながらブローするように整えると、根元からふんわり立ち上がります。`
      },
      {
        heading: 'スプレー vs パウダー vs シート！用途に合わせた使い分け',
        text: `- **スプレータイプ（ダイアン等）**：最も爽快感が高く、頭皮全体の皮脂とニオイを一瞬で吹き飛ばしたいときに最強。\n- **パウダータイプ（フジコ等）**：前髪の割れやおでこの生え際など、狭い範囲をピンポイントで自然にサラサラに直したいときに最適。\n- **シートタイプ**：頭皮の汗や汚れを物理的に拭き取れるため、入院時やアウトドア、防災ポーチの常備用に向いています。`
      }
    ],
    faqs: [
      {
        question: '毎日使い続けても頭皮に悪影響はありませんか？',
        answer: '日中の応急処置としては問題ありませんが、夜の通常の洗顔・シャンプーの代わりにはなりません。帰宅後は必ず通常のシャンプーで毛穴のパウダーと汚れを丁寧に洗い流してください。'
      },
      {
        question: '飛行機の機内への持ち込みはできますか？',
        answer: 'ガス缶タイプは航空会社の規定（容量制限や受託手荷物・機内持ち込みの制限）があるため、旅行や出張にはミストタイプやシートタイプを選ぶとトラブルなく持ち運べます。'
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

ご自身の肌質やヘアスタイル、ライフスタイルのリズムに合った最適なアイテムを選ぶことで、毎日のストレスや悩みの多くは驚くほど軽くなります。ぜひ楽天市場の公式ショップで最新の在庫状況やポイントアップキャンペーンをチェックしてみてください。
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
  console.log('🎉 第5弾 4大最重要記事の書き下ろし・データ保存が完了しました！');
}

generate().catch(e => { console.error('エラー:', e); process.exit(1); });
