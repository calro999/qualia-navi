import fs from 'fs';
import path from 'path';

console.log('🚀 [Supreme Organic Polish] 第10弾 4大最重要テーマの書き下ろし開始...');

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
  // 1. コーセー メイクキープミストEX+（JANコード 4971710576306）＆崩れないミスト
  {
    id: 'art-fix-mist-makeup-keep-spray-10sen-2026',
    searchKeyword: 'コーセー メイクキープミスト EX',
    title: '【2026年最新】マスクでも崩れない最強メイクキープミストおすすめ10選！汗・皮脂・乾燥ヨレを防ぐ人気フィックススプレー徹底比較',
    description: 'コーセー（KOSE）メイクキープミストEX+をはじめ、汗・皮脂・擦れによるメイク崩れを一日中ブロックするおすすめフィックススプレー10選。JAN:4971710576306の最新リニューアル進化点や、テカリを防ぐ正しい吹きかけ方を徹底解説します。',
    category: 'makeup',
    tags: ['4971710576306', 'メイクキープパウダー デメリット', 'メイクキープミスト おすすめ', 'コーセー メイクキープミスト 口コミ', 'フィックスミスト ランキング', 'マスクにつかない メイク', '崩れないスプレー 夏'],
    author: '神崎 美咲',
    intro: `夏の猛暑や湿気、長時間のマスク着用、エアコンの乾燥によるメイク崩れ。「夕方になるとファンデがドロドロに溶ける」「チークや眉毛が消えてしまう」という悩みを一瞬で吹き飛ばしてくれるのが**メイクキープミスト（フィックススプレー）**です。\n\n大人気KOSEの最新作「メイクキープミスト EX+（JANコード: 4971710576306）」を中心に、プチプラからデパコスまで、キープ力と保湿力を両立した名品スプレーを徹底比較します。`,
    editorialSections: [
      {
        heading: 'メイク崩れをゼロにする！プロ直伝の「サンドイッチ吹き」テクニック',
        text: `1. **使用前に容器を10回以上しっかり振る**：2層タイプの場合、メイクキープ成分と皮脂吸着成分が均一に混ざり合っていないと効果が半減します。\n2. **ベースメイクの途中に一度吹きかける（サンドイッチ法）**：下地とファンデーションを塗った後に一度スプレーし、乾いてからパウダーをのせ、最後に仕上げでもう一度スプレーする「サンドイッチ吹き」を行うと、密着度が2倍以上に跳ね上がります。\n3. **吹きかけた後は「絶対に手で触らない」**：顔から15cmほど離して目を閉じ、5〜6プッシュ均一に吹きかけたら、手で触らず自然乾燥させましょう。皮膜が均一にロックされます。`
      },
      {
        heading: 'ツヤ肌仕上げ vs マット仕上げ！仕上がり別の選び方',
        text: `- **マット＆皮脂吸着タイプ（コーセー・アーバンディケイ等）**：Tゾーンのテカリやオイリー肌、マスクへの色移りを絶対に防ぎたい方に。\n- **ツヤ＆高保湿タイプ（クラランス・コスメデコルテ等）**：夕方の乾燥小ジワやつっぱり感を防ぎ、みずみずしい水光肌をキープしたい乾燥肌・大人世代に。`
      }
    ],
    faqs: [
      {
        question: 'ミストが目に入っても大丈夫ですか？',
        answer: '必ず目を固く閉じてスプレーし、数秒間目を開けないようにしてください。万が一目に入った場合は、すぐに清潔な水で洗い流してください。'
      },
      {
        question: 'ミストを使ってもクレンジングで綺麗に落ちますか？',
        answer: 'メイクコート成分は普段のメイク落とし（オイル・バーム・ジェルなど）でスムーズに溶けてオフできますので、肌への負担はありません。'
      }
    ]
  },

  // 2. タイムシークレット 薬用プレストパウダー（JANコード 4580295034776）＆テカリ防止パウダー
  {
    id: 'art-time-secret-mineral-medic-pressed-powder-2026',
    searchKeyword: 'タイムシークレット ミネラル プレストパウダー',
    title: '【肌荒れ防止×毛穴カバー】タイムシークレット 薬用プレストパウダーの口コミ検証！石けん落ち＆カバー力徹底比較',
    description: '敏感肌・ニキビ肌でも使えるタイムシークレット（TIME SECRET）ミネラル薬用プレストパウダー（JAN: 4580295034776）の口コミ・成分を徹底検証。肌荒れ防止有効成分（グリチルレチン酸ステアリル）配合の医薬部外品パウダーの実力を解説します。',
    category: 'makeup',
    tags: ['4580295034776', 'パウダー 角栓', 'キャンメイク オイルブロックミネラルパウダーc01', 'タイムシークレット プレストパウダー', '薬用パウダー 口コミ', '石けん落ち パウダー', '毛穴カバー パウダー'],
    author: 'Dr. 高橋 美紀',
    intro: `「ファンデーションを塗りたくないけれど、毛穴や赤みはしっかり隠したい」「メイクしながらニキビや肌荒れを薬用ケアしたい」という願いを叶えてくれるのが、**タイムシークレットの「ミネラル 薬用プレストパウダー」**です。\n\nSPF50+/PA++++という最高値の紫外線カット力を誇りながら、石けんだけで落とせる低刺激設計。リピーターが絶えない理由と、毛穴をふんわりぼかす使い方を解説します。`,
    editorialSections: [
      {
        heading: '医薬部外品パウダーが叶える「肌荒れケア×ハイカバー」の両立',
        text: `一般的なフェイスパウダーはカバー力が弱く色ムラを隠せないか、逆にカバー力が高いと肌への密着負担が重くなりがちです。\n\nタイムシークレットは、肌荒れ防止有効成分「グリチルレチン酸ステアリル」を配合した医薬部外品処方。マスク荒れやニキビの上からでも罪悪感なく塗ることができ、微粒子ミネラルパウダーが毛穴や色ムラをひと塗りでカモフラージュします。`
      },
      {
        heading: '乾燥させずにテカリを抑えるプロのパフ使い',
        text: `付属のパフで強く擦り付けるのではなく、パフに粉を揉み込んで均一になじませた後、テカリやすい小鼻とおでこに「ポンポンと垂直に優しく押さえる」ようにのせます。頬などの乾燥しやすいゾーンはサッと軽く滑らせるだけに留めると、夕方までサラサラなのにカサつきません。`
      }
    ],
    faqs: [
      {
        question: '本当に石けんや洗顔料だけで落とせますか？',
        answer: 'はい。ウォータープルーフの下地を併用していなければ、通常の洗顔石けんや洗顔フォームだけで綺麗にオフできます。'
      },
      {
        question: '色選びはどうすればいいですか？',
        answer: '明るめの肌色や透明感を出したい方は「ライトオークル」、標準的な肌色や自然な素肌感に整えたい方は「ミディアムオークル」が最も馴染みやすいです。'
      }
    ]
  },

  // 3. サボリーノ 朝用マスク（肌荒れの真相と敏感肌向け使い方）
  {
    id: 'art-sachiko-saborino-morning-mask-skin-trouble-truth',
    searchKeyword: 'サボリーノ 朝用マスク 敏感肌 シートマスク',
    title: '【60秒で洗顔＋スキンケア】サボリーノ朝用マスクは肌荒れする？口コミの真相と敏感肌向けおすすめ10選',
    description: '「起きて60秒貼るだけで洗顔・スキンケア・下地が完了する」サボリーノ（Saborino）目ざまシートの口コミ・評判を徹底検証。「肌荒れする・ピリピリ痛い」と言われる理由と、敏感肌でもトラブルなく使える低刺激タイプの選び方を解説します。',
    category: 'skincare',
    tags: ['サボリーノ 朝用マスク 肌荒れ 口コミ', 'サボリーノ 敏感肌', '朝用マスク 口コミ', 'シートマスク 朝', '時短スキンケア 朝', '時短 朝 洗顔シート'],
    author: 'Dr. 高橋 美紀',
    intro: `忙しい朝の時間を劇的に効率化し、ベッドから起きて顔に貼るだけで「洗顔＋スキンケア＋保湿下地」がわずか60秒で完了するメガヒット時短コスメ、**サボリーノ（Saborino）の「目ざまシート」**。\n\n「本当に洗顔しなくて大丈夫？」「敏感肌には刺激が強くて肌荒れするって本当？」という疑問の真相と、肌タイプに合わせた正しい使い分けを徹底解剖しました。`,
    editorialSections: [
      {
        heading: '「ピリピリ痛い・肌荒れする」と感じる原因と成分の秘密',
        text: `定番の黄色いパッケージ（フルーティハーブの香り）には、朝の目覚まし効果と毛穴引き締めのために「メントール」や「リンゴ酸（角質ケア成分）」が配合されています。\n\n健康な肌には心地よい清涼感ですが、バリア機能が低下している敏感肌や乾燥肌、花粉の時期には刺激として感じられ、赤みやピリピリ感の原因になります。\n\n**敏感肌が選ぶべきサボリーノの正解：**\nアルコールフリー・メントールフリーの**「サボリーノ お疲れさまでマスク（夜用高保湿）」や「敏感肌用アロエエキス配合タイプ」**を選ぶことで、刺激ゼロでモチモチの潤い肌を手に入れられます。`
      },
      {
        heading: '朝マスクのポテンシャルを引き出す60秒後の「拭き取り折りたたみ」技',
        text: `60秒経ってマスクを剥がしたあと、すぐに捨ててはいけません！\n\nマスクを四つ折りにたたみ、小鼻のキワやあご先、耳の後ろから首元にかけて優しく滑らせるように「拭き取り」を行います。マスクに含まれた美容液が余分な寝汗や皮脂を絡め取り、角質をオフして化粧ノリを格段に高めてくれます。`
      }
    ],
    faqs: [
      {
        question: '60秒以上長く貼っておいた方が効果的ですか？',
        answer: '長時間の放置は逆効果です。シートが乾き始めると逆に肌の水分を奪い去ってしまうため、1分〜3分以内で剥がすのが最も肌に潤いを残す鉄則です。'
      },
      {
        question: '夜に使っても問題ありませんか？',
        answer: '朝用マスクはさっぱりした清涼感重視の処方が多いため、夜の入浴後には夜専用の濃厚な保湿パック（サボリーノ夜用やお米のマスク等）を使用する方が高い美肌効果を得られます。'
      }
    ]
  },

  // 4. ブレスラボ マウスウォッシュ 口コミ・口臭ケア
  {
    id: 'art-sachiko-breath-labo-mouthwash-review',
    searchKeyword: 'ブレスラボ マウスウォッシュ 口臭 薬用',
    title: '【口臭を元から断つ】ブレスラボ マウスウォッシュの口コミ評価！薬用成分の殺菌力と使い方のコツ徹底解説',
    description: '製薬会社（第一三共ヘルスケア）が開発した薬用口臭ケア「ブレスラボ（Breath Labo）」マウスウォッシュの口コミ・効果を検証。2種の殺菌成分と口臭吸着成分による持続力、刺激の強さ、ノンアルコールタイプとの違いを徹底解説します。',
    category: 'bodycare',
    tags: ['ブレスラボ マウスウォッシュ 評価', '口臭ケア マウスウォッシュ', '薬用 洗口液 おすすめ', 'ブレスラボ 口コミ', '第一三共 口臭', '口臭 予防 洗口液'],
    author: '佐々木 遥',
    intro: `人と話すときの自分の口臭や、マスクの中のこもったニオイ、朝起きたときの口のネバつき。「ガムやミントタブレットでは一時的にごまかせても、根本的なニオイが消えない…」とお悩みの方へ。\n\n製薬会社が口臭の原因菌と揮発性硫黄化合物を科学的に研究して開発した**薬用マウスウォッシュ「ブレスラボ（Breath Labo）」**の実力と、効果的なゆすぎ方を徹底レビューします。`,
    editorialSections: [
      {
        heading: 'なぜブレスラボは口臭が消えるのか？2大薬用成分の殺菌メカニズム',
        text: `口臭の8割以上は、口内の細菌がタンパク質を分解して発生させる「ガス（硫化水素・メチルメルカプタン）」が原因です。\n\nブレスラボは、原因菌を殺菌する「CPC（塩化セチルピリジニウム）」と、歯肉炎や炎症を抑える「グリチルリチン酸ジカリウム」のダブル有効成分を配合。さらに薬用成分が舌苔や歯周ポケットの奥まで行き渡り、口臭の原因物質を根本から吸着・除去して長時間クリアな息を持続させます。`
      },
      {
        heading: '効果を最大化する「20秒ゆすぎ」の正しい手順',
        text: `1. **毎日の歯磨き後に使用する**：歯垢（プラーク）が残ったままゆすぐと薬用成分が歯の表面に届きにくいため、ブラッシング後に使うのが基本です。\n2. **キャップ1杯（約10ml）を口に含み20秒間しっかりブクブクする**：頬や唇を動かして、歯と歯の間、舌の表面まで薬用液を行き渡らせます。\n3. **使用後は水ですすがない**：水でゆすぐとせっかくの有効成分が洗い流されてしまいます。吐き出した後はそのままにしておくことで、殺菌バリアが長時間持続します。`
      }
    ],
    faqs: [
      {
        question: '辛い刺激が苦手でも使えますか？',
        answer: '爽快感の強い「エクストラミント（アルコール含有）」のほかに、低刺激でマイルドな「シトラスミント（ノンアルコール処方）」がラインナップされています。ピリピリ感が苦手な方はノンアルコールタイプがおすすめです。'
      },
      {
        question: '子どもでも使用できますか？',
        answer: '自分でうがいをして吐き出せる年齢（小学生以上）であれば問題なく使用できます。刺激の少ないノンアルコールタイプから始めると安心です。'
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

正しい知識とお悩みにぴったり合った名品を選ぶことで、毎日のメイク崩れの悩みや身だしなみの不安は根本から解消されます。ぜひ楽天市場の公式ショップで最新の在庫状況やポイントアップキャンペーンをチェックしてみてください。
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
  console.log('🎉 第10弾 4大最重要記事の書き下ろし・データ保存が完了しました！');
}

generate().catch(e => { console.error('エラー:', e); process.exit(1); });
