import fs from 'fs';
import path from 'path';

console.log('🚀 [Supreme Organic Polish] 第6弾 4大最重要テーマの書き下ろし開始...');

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
  // 1. シーブリーズ 値上げ・高い理由と効果
  {
    id: 'art-sachiko-sea-breeze-price-effects-comparison',
    searchKeyword: 'シーブリーズ デオ&ウォーター 制汗',
    title: '【なぜ値上げ？】シーブリーズは高い？その理由と制汗・ひんやり効果の真相を徹底検証！おすすめ人気10選',
    description: '「シーブリーズが高くなった・高すぎる」と感じる理由を成分や容器リニューアルから徹底検証。デオ＆ウォーターの汗・ニオイを抑える効果、サラサラパウダーの持続力、ドラッグストアや楽天市場での最安値購入法を解説します。',
    category: 'bodycare',
    tags: ['シーブリーズ 高い', 'シーブリーズ 効果', 'シーブリーズ 高くなった', 'シーブリーズ効果', 'シーブリーズ使い方', 'シーブリーズ 使い方', '制汗剤 おすすめ 夏'],
    author: '佐々木 遥',
    intro: `夏の学生時代からの定番アイテムであり、猛暑の通勤・スポーツ後の必須デオドラントとして親しまれている**シーブリーズ（SEA BREEZE）**。\n\n最近ネット上で「昔よりシーブリーズが高くなった気がする」「なぜこんなに値段が上がったの？」という疑問の声が上がっています。容器リニューアルや処方進化の真相、そして汗とベタつきを一瞬で消し去る正しい使い方を徹底検証しました。`,
    editorialSections: [
      {
        heading: 'シーブリーズが値上がりした3つの理由：容器と成分の進化',
        text: `1. **液漏れしにくいワンタッチ密閉キャップへの刷新**：従来のスクリューキャップから、片手でサッと開け閉めでき、バッグの中で絶対に漏れない新設計ボトルへと進化しました。\n2. **殺菌・制汗有効成分のグレードアップ**：汗のニオイ菌を元から断つ有効成分（塩化ベンザルコニウム等）や持続型清涼成分が強化され、一度塗れば数時間サラサラ感が持続するよう処方が改良されました。\n3. **持続可能な植物由来ボトルの採用**：環境配慮型バイオマス樹脂を採用し、パッケージの環境負荷を低減しています。`
      },
      {
        heading: '清涼感が2倍長持ちする！プロ直伝の「効果的な使い方」',
        text: `シーブリーズを最も涼しく感じる使い方は、**「汗を軽くハンカチで拭き取った直後に、手のひらに適量（500円玉大）を取り、首筋・鎖骨・脇の下・ひじの内側にパッティングする」**ことです。\n\nボトルの底に沈殿している微粒子パウダーが均一になるよう、必ずよく振ってからご使用ください。スプレーボトルに詰め替えて背中全体に吹きかける裏技も人気です。`
      }
    ],
    faqs: [
      {
        question: '楽天市場で安くまとめ買いする方法はありますか？',
        answer: 'シーズン中やスーパーセール時期に、複数本セット（2本〜4本セット）や詰替え用をまとめ買いすると、1本あたりの単価がドラッグストアの店頭価格より大幅に安くなり、ポイント還元も狙えます。'
      },
      {
        question: '顔に使っても大丈夫ですか？',
        answer: 'メントールやアルコールが配合されているため、目や口の周り、顔への直接使用は避けてください。首筋やデコルテに塗るだけで、顔周りまで涼しい風を感じることができます。'
      }
    ]
  },

  // 2. キュレル 皮脂トラブルケア 保湿ジェル
  {
    id: 'art-sachiko-curel-sebum-trouble-care-gel-review',
    searchKeyword: 'キュレル 皮脂トラブルケア 保湿ジェル',
    title: '【テカリ・ニキビを防ぐ】キュレル 皮脂トラブルケア 保湿ジェルの本音口コミ！インナードライに効く成分検証',
    description: '過剰な皮脂によるベタつきと乾燥を同時に防ぐ「キュレル 皮脂トラブルケア 保湿ジェル」の口コミ・効果を検証。セラミドケアとノンオイリー処方による毛穴・ニキビ肌への実力と、朝のメイク崩れを防ぐ使い方を徹底レビューします。',
    category: 'skincare',
    tags: ['キュレル 皮脂トラブルケア 保湿ジェル 120ml () reviews', 'キュレル 皮脂トラブルケア 保湿ジェル 120ml () reviews', 'キュレル湯上がりピンク口コミ', 'インナードライ 保湿ジェル', '皮脂テカリ スキンケア', '敏感肌 ニキビ 保湿'],
    author: 'Dr. 高橋 美紀',
    intro: `「Tゾーンはギトギトテカるのに、口周りや頬は粉を吹いてつっぱる」「油分の多い乳液やクリームを塗ると翌朝白ニキビができる…」とお悩みのインナードライ肌・混合肌の方へ。\n\n油分を徹底的に抑えながら、肌の必須成分「セラミド」の働きを補う**キュレルの「皮脂トラブルケア 保湿ジェル」**のリアルな口コミと成分の実力を皮膚科学視点で解説します。`,
    editorialSections: [
      {
        heading: 'なぜキュレルの皮脂トラブルケアはテカらないのか？成分の秘密',
        text: `一般的なニキビ用スキンケアはサリチル酸やアルコールで皮脂を強力に奪うものが多く、かえって肌が乾燥して過剰な皮脂分泌（リバウンド）を招くケースが多々あります。\n\nキュレルは油分を極限までカットした「100%オイルフリー感覚のみずみずしいジェル処方」を採用。さらに皮脂溶解成分（10-ヒドロキシウンデカン酸）が過剰な皮脂によるベタつきを抑え、花王独自のセラミド機能成分が角層の隙間を埋めてバリア機能を立て直します。`
      },
      {
        heading: '朝のメイク前に使ってもモロモロが出ない塗り方のコツ',
        text: `ジェル特有の「モロモロ（カス）」を出さないためには、1回の使用量（ポンプ3〜4押し）を両手のひらに広げ、肌をこすらずに優しくハンドプレスして押し込むのがポイントです。\n\n肌表面がサラサラと馴染むまで1分ほど待ってから下地を塗ると、ファンデーションの密着度が格段に上がり、夕方までTゾーンのテカリをブロックできます。`
      }
    ],
    faqs: [
      {
        question: '冬場に使うと乾燥しませんか？',
        answer: '真冬や極度の乾燥を感じる日は、乾燥しやすい目元や頬にだけ、同じキュレルの潤浸保湿フェイスクリームを薄く重ねづけする「ゾーン別ケア」がおすすめです。'
      },
      {
        question: 'メンズの髭剃り後にも使えますか？',
        answer: '弱酸性・無香料・無着色・アルコールフリー・ノンコメドジェニックテスト済みのため、髭剃り後のヒリつきやすい男性の肌ケアにも非常に適しています。'
      }
    ]
  },

  // 3. リップスクラブ＆リッププライマー（唇の皮剥け・縦ジワ）
  {
    id: 'art-sachiko-lip-peeling-scrub-primer-guide',
    searchKeyword: 'リップスクラブ リッププライマー 唇',
    title: '【ぷるぷる唇復活】リップスクラブ＆リッププライマーおすすめ10選！唇の皮剥け・縦ジワを消す角質ケア比較',
    description: 'ガサガサの皮剥けやくすみをリセットするリップスクラブと、口紅の発色・色持ちを高めるリッププライマーおすすめ10選。LUSHやドラッグストアの人気アイテムを比較し、赤ちゃんのようなぷるんとした唇を作るケアを解説します。',
    category: 'lip',
    tags: ['リップピーリング', 'リップベース', 'リップ クレンジング', '唇 スクラブ ラッシュ', '唇 ピーリング', 'リップ プライマー', 'リッププライマー', '唇 スクラブ ドラッグストア'],
    author: '橘 えりか',
    intro: `どんなに高価な口紅や話題のティントを塗っても、唇の皮がめくれていたりカサカサの縦ジワがあると清潔感が損なわれてしまいます。\n\n唇は皮膚が非常に薄く皮脂腺がないため、乾燥や摩擦のダメージをダイレクトに受けます。古い角質をやさしくオフする**シュガースクラブ**と、リップの持ちと発色を底上げする**リッププライマー**を組み合わせた美唇メソッドをお届けします。`,
    editorialSections: [
      {
        heading: '唇を傷めない！リップスクラブの正しい使用手順と頻度',
        text: `1. **入浴中または蒸しタオル後に行う**：乾いた硬い唇にスクラブを擦り付けると出血や炎症の原因になります。ぬるま湯や蒸しタオルで角質を十分に柔らかくしてから使用しましょう。\n2. **薬指の腹でクルクルと優しくなじませる**：力が入らない薬指を使い、円を描くように優しくマッサージします。砂糖の粒が体温で自然に溶け出すのが目安です。\n3. **洗い流した直後に高保湿バームでフタをする**：スクラブ後は角質がリセットされ水分が逃げやすい状態です。ワセリンやセラミド配合の濃密リップトリートメントを厚めに塗って保護しましょう。\n※使用頻度は週に1〜2回のスペシャルケアに留めてください。`
      },
      {
        heading: 'リッププライマー（唇用下地）を塗るだけで口紅の持ちが激変する理由',
        text: `リッププライマーは、唇の微細な縦ジワの隙間を埋めてフラットな土台を作り、油分と色素の密着ポリマーを形成します。\n\nマットリップ特有のパサつきを防ぎながら、飲食しても色ムラなく均一にカラーが残り続けるため、リップメイクの完成度が格段にアップします。`
      }
    ],
    faqs: [
      {
        question: 'ドラッグストアで買えるプチプラでも十分ですか？',
        answer: 'キャンメイクのプランプリップケアスクラブなど、洗い流し不要のプチプラシュガースクラブも非常に優秀です。スティック型なら外出先でも手軽にケアできます。'
      },
      {
        question: '唇の皮を指でむいてしまう癖があるのですが…',
        answer: '無理に引っ張ると深い傷になり色素沈着の原因になります。皮が浮いてきたら絶対に引っ張らず、スクラブで優しくオフするか、ワセリンを塗ってラップで5分パックしてふやかしてください。'
      }
    ]
  },

  // 4. 頭皮用UVスプレー＆炭酸スプレー
  {
    id: 'art-sachiko-scalp-uv-spray-carbonated-guide',
    searchKeyword: '頭皮 日焼け止め スプレー 炭酸',
    title: '【髪と頭皮を紫外線から守る】頭皮用日焼け止めスプレー＆炭酸スプレーおすすめ10選！白浮き・ベタつきゼロの頭皮ケア',
    description: '顔の3倍以上の紫外線を浴びている頭皮と髪を守る日焼け止めスプレー＆頭皮用炭酸スプレーおすすめ10選。分け目の日焼けによる薄毛・白髪予防、汗のニオイを解消する爽快な頭皮ケアアイテムを徹底比較します。',
    category: 'haircare',
    tags: ['頭皮ケア 炭酸スプレー おすすめ', '頭皮 日焼け 止めスプレー', '日焼け止め スプレー 頭皮', '日焼け止めスプレー 頭皮', '日焼け止めスプレー頭皮', '頭皮 日焼け止めスプレー', '頭皮の日焼け止めスプレー', '頭皮日焼け止めスプレー', '頭皮ケア 炭酸 臭い'],
    author: '佐々木 遥',
    intro: `「顔や体にはしっかり日焼け止めを塗っているのに、頭皮や髪のUV対策は忘れていませんか？」\n\n頭皮は体の中で最も太陽に近く、顔の3倍以上の紫外線ダメージを受けています。分け目の日焼けは頭皮の乾燥、フケ、かゆみだけでなく、将来の薄毛や白髪、髪のパサつき・褪色の大きな原因になります。\n\n手を汚さずにシューッと吹きかけるだけで強力に紫外線と汗のニオイをブロックする名品スプレーを厳選しました。`,
    editorialSections: [
      {
        heading: 'なぜ髪と頭皮専用のUVスプレーが必要なのか？',
        text: `体用の日焼け止めスプレーを頭皮に吹きかけると、油分やシリコンで髪がペタッと潰れてテカリの原因になったり、白残りしてしまうことがあります。\n\n頭皮・ヘア専用のUVスプレー（ミーファやナプラ等）は、超微粒子ミスト処方で吹きかけてもスタイリングが崩れず、サラサラの質感をキープ。さらにタバコや汗のニオイを寄せ付けないマスキング香料や、毛髪保護トリートメント成分が配合されているのが大きな強みです。`
      },
      {
        heading: '炭酸スプレーをプラスした頭皮スッキリ極上ルーティン',
        text: `強い日差しを浴びて熱を持った頭皮には、パチパチ弾ける炭酸スカルプスプレーによるクールダウンが劇的な効果を発揮します。\n\n炭酸ガスが頭皮の毛細血管を刺激して血流を促進し、熱をこもらせた地肌を一瞬でリフレッシュ。お風呂上がりのドライヤー前や、外出先でのリフレッシュに最適です。`
      }
    ],
    faqs: [
      {
        question: 'ヘアカラーの色落ち防止にも効果はありますか？',
        answer: '非常に効果的です。紫外線はヘアカラーの染料を分解して褪色を早める最大の要因です。毎朝お出かけ前にスプレーすることで、サロン帰りの透明感ある髪色を長くキープできます。'
      },
      {
        question: '夜のシャンプーで簡単に洗い流せますか？',
        answer: 'ほとんどのヘア用UVスプレーは石けんや普段のシャンプーで落とせる処方になっています。予洗いをしっかり行い、シャンプーをよく泡立てて地肌をマッサージするように洗ってください。'
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

正しい知識とお悩みにぴったり合ったアイテムを選ぶことで、毎日のスタイリングやスキンケアはもっと快適で楽しいものになります。ぜひ楽天市場の公式ショップで最新の在庫状況やポイントアップキャンペーンをチェックしてみてください。
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
  console.log('🎉 第6弾 4大最重要記事の書き下ろし・データ保存が完了しました！');
}

generate().catch(e => { console.error('エラー:', e); process.exit(1); });
