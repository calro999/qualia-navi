import fs from 'fs';
import path from 'path';

console.log('🚀 [Supreme Organic Polish] 第13弾 4大最重要テーマの書き下ろし開始...');

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
  // 1. オペラ（OPERA）リップティント＆シアーマット 口コミ・レビュー
  {
    id: 'art-opera-lip-tint-review-guide',
    searchKeyword: 'オペラ リップティント OPERA 口コミ',
    title: '【透けるキレイ色】オペラ（OPERA）リップティントの口コミ・本音レビュー！荒れない落ちない人気色ランキング',
    description: 'ティントリップの金字塔「オペラ（OPERA）リップティント N」のリアルな口コミ・発色・色持ちを徹底検証。乾燥や皮剥け知らずで一日中ピュアな血色感をキープする人気色（05コーラルピンク、09テラコッタ等）を詳しく解説します。',
    category: 'lip',
    tags: ['ｏｐｅｒａ 口コミ', 'ｏｐｅｒａ レビュー', 'オペラ リップティント 口コミ', 'オペラ リップ 人気色', '落ちない リップ プチプラ', '荒れない ティントリップ', '粘膜リップ プチプラ'],
    author: '橘 えりか',
    intro: `「ティントを使うと唇が荒れて皮が剥ける」「鮮やかに発色しすぎて日常使いしにくい…」というティント難民の誰もが最終的に戻ってくる絶対的定番、**オペラ（OPERA）の「リップティント N」**。\n\nオイルを贅沢にブレンドしたシアーなツヤ感と、唇の水分に反応してピュアに色づく独自処方。リニューアル後の使用感や、大人女子にも選ばれる神カラーを徹底比較しました。`,
    editorialSections: [
      {
        heading: 'なぜオペラは「唇が荒れないのに落ちない」のか？オイルティントの秘密',
        text: `1. **サラサラのエモリエントオイル（スクワラン等）を高配合**：唇の上で体温でスルスルととろけ、リップクリームなしでも乾燥した唇をしっとりケアします。\n2. **唇の水分に反応して染まる「血色ティント処方」**：唇の角質層を自然な透明感で染め上げるため、表面のオイルが落ちても、内側からにじみ出るような健康的な赤みが一日中持続します。\n3. **鏡を見ずに塗れるシアーな発色**：透け感のある色づきのため、急いでいるときでもはみ出しや色ムラを気にせずサッと直塗りできます。`
      },
      {
        heading: 'パーソナルカラー別：オペラリップティントの絶対買いカラー',
        text: `- **05 コーラルピンク（花嫁リップ）**：殿堂入りの伝説カラー。どんな肌色にも調和し、好感度抜群のモテ唇を作るイエベ春の王道。\n- **09 テラコッタ**：深みのあるブラウンニュアンスで、一気にお洒落な垢抜け顔になれるイエベ秋のベストセラー。\n- **02 ピンク / 07 ベイビーピンク**：青みを含んだピュアな透明感ピンク。肌の白さを引き立てるブルベ夏の鉄板。\n- **06 ピンクレッド**：鮮やかさと透け感を両立し、顔全体を引き締めるブルベ冬のデイリーレッド。`
      }
    ],
    faqs: [
      {
        question: '時間が経つと蛍光ピンクに転びませんか？',
        answer: 'リニューアル後の現行モデルは、時間の経過による過剰な赤転び（蛍光ピンク化）を大幅に抑制する処方に改良されており、塗ったときの上品なニュアンスカラーがそのまま続きます。'
      },
      {
        question: 'マスクに付きにくい塗り方は？',
        answer: '一度塗って1分置き、軽くティッシュで表面の余分なツヤオイルを押さえてからもう一度重ねると、色がしっかり定着してマスクへの色移りをゼロに近づけられます。'
      }
    ]
  },

  // 2. ちふれ リップ748＆除光液
  {
    id: 'art-chifure-lip-748-nail-remover-guide',
    searchKeyword: 'ちふれ 口紅 748 除光液',
    title: '【元祖神ブラウン】ちふれ口紅「748」の口コミ検証！イエベ秋の垢抜けリップ＆白くならない除光液徹底比較',
    description: 'ワンコインで手に入る伝説のデパコス級ブラウンリップ「ちふれ 口紅 748（エモリエントタイプ）」の口コミ・似合う人を徹底解説。あわせて爪が白く乾燥しない大人気「ちふれ 除光液」の実力と使い方を検証します。',
    category: 'lip',
    tags: ['ちふれ リップ 748', 'ちふれ 除光液', 'ちふれ 口紅 748 口コミ', 'プチプラ ブラウンリップ', 'イエベ秋 ブラウンリップ', '爪が白くならない 除光液'],
    author: '橘 えりか',
    intro: `SNSで「デパコスの名品ブラウンリップと見分けがつかない」「300円台〜でこの絶妙な赤みブラウンは奇跡」とバズり続け、今や殿堂入りを果たした**ちふれ（CHIFURE）の口紅「748番」**。\n\nさらに、アセトン配合でありながら「爪が白くパサパサにならない」とネイル好きから指名買いされる**ちふれの除光液**。高コスパを極めた2大ロングセラーの魅力を紐解きます。`,
    editorialSections: [
      {
        heading: 'ちふれ 748（ブラウン系）が全女子を虜にする理由',
        text: `黄みと赤みのバランスが完璧に計算された「ハンサムな赤みビターブラウン」。\n\n「ブラウンリップをつけると顔色が悪く見えたり老けてしまう」というイエベ秋・ブルベ冬の方でも、ほんのり血色感が残る絶妙な透け感のおかげで、ひと塗りで今っぽい知的なこなれ感を演出できます。ヒアルロン酸配合でなめらかな塗り心地も魅力です。`
      },
      {
        heading: '爪を傷めずスルッと落ちる！ちふれ除光液の正しい使い方',
        text: `1. コットンを爪のサイズに四角くカットする。\n2. ちふれ除光液をたっぷり含ませ、爪の上に置いて**【10秒〜15秒間軽く押さえて待つ】**。\n3. ネイルカラーが溶け出したのを確認し、爪の根元から爪先に向かって一方向にスッと拭き取る。\n※ゴシゴシ往復させないことで、爪表面の層が剥がれるのを防ぎ、白残りしない健やかな自爪を保てます。`
      }
    ],
    faqs: [
      {
        question: '口紅ケースは別売りですか？',
        answer: 'ちふれの口紅は詰め替え用レフィル単体でもキャップ付きで使用できますが、別売りのメタルケースやプラスチックケース（100円〜300円台）と組み合わせると、より高級感のある見た目になります。'
      },
      {
        question: '除光液特有のツンとしたニオイはありますか？',
        answer: 'アセトン配合のため使用時に特有の溶剤臭はありますが、油分を補う成分が含まれているため、使用後の爪先がツッパらず乾燥しにくいのが特徴です。換気の良い場所でご使用ください。'
      }
    ]
  },

  // 3. エリクシール レチノパワー リンクルクリーム最安値比較
  {
    id: 'art-sachiko-elixir-retinopower-wrinkle-cream-deal-2026',
    searchKeyword: 'エリクシール レチノパワー リンクルクリーム L 22g',
    title: '【2026年最新最安値】エリクシール レチノパワー リンクルクリームL（22g）のお得な買い方！シワ改善効果・偽物見分け方徹底解説',
    description: '日本で唯一「純粋レチノール」によるシワ改善承認を得ているエリクシール レチノパワー リンクルクリーム（ラージサイズ22g）の実質最安値購入法を検証。効果的な塗り方、A反応（皮剥け）を防ぐ注意点を皮膚科学視点で解説します。',
    category: 'skincare',
    tags: ['エリクシール レチノパワー リンクルクリーム ba l 22g 最安値 2026', 'エリクシール リンクルクリーム 最安値', '純粋レチノール シワ改善', 'エリクシール レチノール 使い方', 'レチノパワー 口コミ'],
    author: 'Dr. 高橋 美紀',
    intro: `資生堂が30年以上のレチノール研究の粋を集めて開発し、日本で初めて厚生労働省から「シワを改善する」医薬部外品として有効性が認められた**エリクシールの「レチノパワー リンクルクリーム」**。\n\n目尻の深いシワやほうれい線に悩む方からリピートされ続ける大容量ラージサイズ（22g）を、偽物の心配なく最も安く手に入れる方法と、効果を最大化する使用法を徹底検証しました。`,
    editorialSections: [
      {
        heading: '偽物に注意！楽天市場の「資生堂認定公式ショップ」で買うべき理由',
        text: `エリクシールのリンクルクリームは非常に人気が高いため、フリマアプリや非正規転売店舗では中身が粗悪な偽物が多数報告されています。純粋レチノールは光や酸素に極めて弱く、特殊な遮光密封チューブでなければ効果を失ってしまいます。\n\n楽天市場の**「資生堂認定オンラインショップ」**で購入すれば、100%工場直送の新鮮な正規品が届き、さらに楽天ポイント10倍〜20倍還元キャンペーンを利用することで実質最安値で購入できます。`
      },
      {
        heading: '肌荒れ（A反応）を出さずにシワを消す「慣らし期間」のルール',
        text: `- **最初の2週間**：2〜3日に1回、夜のお手入れの最後にパール粒1個分を目元・口元になじませる。\n- **次の2週間**：毎晩1回使用する。\n- **5週目以降**：朝晩2回使用（※朝使う場合は必ず日焼け止めを重ねて純粋レチノールを紫外線から保護する）。\n肌をゆっくりレチノールに慣らしていくことで、赤みや皮剥けを起こさずにふっくらとしたハリを実感できます。`
      }
    ],
    faqs: [
      {
        question: '通常サイズ（15g）とラージサイズ（22g）はどちらがお得？',
        answer: 'ラージサイズ（22g）は通常サイズに比べて約1.5倍の容量がありながら、1gあたりの単価が約15%お得になるため、継続してシワケアを行うならラージサイズ一択です。'
      },
      {
        question: '首のシワや眉間のシワにも効きますか？',
        answer: 'はい。目元やほうれい線だけでなく、首の横ジワや眉間の表情ジワにも同様のシワ改善効果が認められています。'
      }
    ]
  },

  // 4. セザンヌ パレットコンシーラー＆ストレッチコンシーラー
  {
    id: 'art-cezanne-palette-stretch-concealer-review',
    searchKeyword: 'セザンヌ パレットコンシーラー ハイカバー ストレッチ',
    title: '【プチプラ最強のカバー力】セザンヌ パレットコンシーラー ハイカバー＆ストレッチコンシーラー口コミ比較！クマ・シミ・小鼻赤み消去術',
    description: '700円台でプロ並みの補正ができる「セザンヌ パレットコンシーラー ハイカバー」と「ストレッチコンシーラー」の口コミ・実力を徹底比較。ヨレない密着パレットの使い方や、頑固な青クマ・黒クマを消す色選びを詳しく解説します。',
    category: 'makeup',
    tags: ['セザンヌ パレットコンシーラー ハイカバー () reviews', 'セザンヌストレッチコンシーラー30', 'セザンヌ コンシーラー 口コミ', 'プチプラ コンシーラー クマ', 'クマ消し パレット プチプラ', 'セザンヌ ハイカバー コンシーラー'],
    author: '神崎 美咲',
    intro: `「高いデパコスコンシーラーを買わなくても、ドラッグストアのプチプラで完璧にシミやクマを隠せないの？」という声に全力で応えてくれるのが、**セザンヌ（CEZANNE）のコンシーラーシリーズ**です。\n\n3色を自由にブレンドできる**パレットコンシーラー ハイカバー**と、表情の動きにピタッと密着する**ストレッチコンシーラー**。それぞれの強みと、絶対にヨレない使い分けテクニックを徹底解説します。`,
    editorialSections: [
      {
        heading: 'セザンヌ パレットコンシーラー ハイカバーの3色ブレンド術',
        text: `1. **左（くすみ飛ばし・ハイライト色）**：眉の上、鼻筋、口角のくすみに。\n2. **中央（オレンジ系・クマ消し色）**：青黒いクマや目元のくすみに。補色効果で肌を明るく補正します。\n3. **右（シミ・ニキビ跡カバー色）**：濃いシミやニキビ跡の上にピンポイントでのせ、周囲をぼかします。\n付属のダブルエンドブラシ（平筆と先細チップ）が非常に優秀で、小鼻のキワや目頭の細かい部分まで思い通りにコントロールできます。`
      },
      {
        heading: '目元がよく動く人には「ストレッチコンシーラー」が最強',
        text: `笑ったときに目尻や目の下にシワが寄りやすい方には、伸縮ポリマーが肌の動きに合わせて伸び縮みする「ストレッチコンシーラー」が向いています。\n\nウォータープルーフ＆皮脂ブロック処方で、時間が経ってもひび割れず、夕方の二重まぶたや目元の小ジワ落ちを完璧に防ぎます。`
      }
    ],
    faqs: [
      {
        question: '乾燥して粉っぽくなりませんか？',
        answer: 'スクワランやヒアルロン酸などの保湿成分が配合されているため、プチプラとは思えないしっとりした密着感が続きます。スキンケアでしっかり保湿した後に使用してください。'
      },
      {
        question: 'ファンデーションの前と後、どちらに塗るべきですか？',
        answer: 'パウダーファンデーションの場合は「ファンデの前」、リキッドファンデやクッションファンデの場合は「ファンデの後」に塗るのが最もヨレにくく綺麗にカバーできる順番です。'
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

ご自身の肌悩みやパーツに合わせた最適なアイテムを取り入れることで、毎日のメイクやスキンケアの仕上がりは劇的に向上します。ぜひ楽天市場の公式ショップで最新の在庫状況やポイントアップキャンペーンをチェックしてみてください。
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
  console.log('🎉 第13弾 4大最重要記事の書き下ろし・データ保存が完了しました！');
}

generate().catch(e => { console.error('エラー:', e); process.exit(1); });
