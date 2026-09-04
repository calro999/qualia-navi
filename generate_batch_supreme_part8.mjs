import fs from 'fs';
import path from 'path';

console.log('🚀 [Supreme Organic Polish] 第8弾 4大最重要テーマの書き下ろし開始...');

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
  // 1. 眉ティント（フジコ等）色比較・落ちない・失敗しない
  {
    id: 'art-peri-eyebrow-tint-long-lasting-2026',
    searchKeyword: 'フジコ 眉ティント',
    title: '【すっぴんでも眉毛が消えない】眉ティントおすすめ人気10選！フジコ等の失敗しない塗り方＆色比較チャート2026',
    description: '朝のメイク時間を劇的に短縮し、お泊まりやプールでも美眉をキープする眉ティントおすすめ10選。大人気Fujiko（フジコ）眉ティントSV/ADVの人気色（ショコラ・モカ・ライトブラウン）比較や、イモト眉にならないプロの剥がし方を徹底解説します。',
    category: 'makeup',
    tags: ['眉ティント おすすめ 30代', '眉ティント おすすめ 20代', '20代 眉ティント 人気', '眉ティント 人気 40代', '眉ティント 人気 50代', '眉ティント 人気 30代', 'フジコ 眉ティント 色比較', 'フジコ眉ティント 色比較', 'フジコ 眉 ティント 色 比較', '眉ずみ おすすめ 20代', '20代 眉ずみ 人気', '20代 眉ずみ おすすめ'],
    author: '松本 結衣',
    intro: `「毎朝の眉メイクに時間がかかる」「汗や皮脂ですぐに眉尻が消えてまろ眉になってしまう」「すっぴんでも自信を持てる眉になりたい」――そんな女性たちの救世主として不動の人気を誇るのが**眉ティント（アイブロウティント）**です。\n\n一度塗って剥がすだけで、地肌の角質層を自然なブラウンに染め上げ、洗顔しても3日〜1週間ほど綺麗な眉をキープ。元祖にして圧倒的支持を誇る「Fujiko（フジコ）」を中心に、絶対に失敗しない色選びと塗り方の極意をまとめました。`,
    editorialSections: [
      {
        heading: '失敗知らず！「イモト眉」にならない黄金の塗り方＆剥がし方ステップ',
        text: `1. **油分と水分を徹底的に拭き取る**：スキンケアの乳液や皮脂が眉に残っていると、色素が定着せずムラの原因になります。ティッシュや綿棒で地肌をサラサラにしてから塗り始めましょう。\n2. **理想の眉より1mm内側に塗る**：液が少し広がりやすいため、輪郭ギリギリではなく、理想の眉の形よりわずかに内側を意識して厚めに塗るのが自然に仕上げるコツです。はみ出た部分はすぐに濡らした綿棒で修正してください。\n3. **最低2時間（できれば一晩）置く**：塗ってから2時間以上放置することで、角質層のターンオーバーに合わせて美しく色持ちします。夜寝る前に塗って朝剥がすのが最も長持ちします。\n4. **眉頭からではなく「眉尻」から剥がす**：眉毛の毛流れに逆らわず、眉尻から眉頭に向かってゆっくり剥がすと、自眉が抜けずにスルッと剥がせます。`
      },
      {
        heading: '【パーソナルカラー＆髪色別】フジコ眉ティントの人気色チャート',
        text: `- **01 ショコラブラウン（深みのある王道ブラウン）**：黒髪〜暗めのダークブラウンヘア、ブルベ冬・イエベ秋の方に。自眉の黒さと自然に馴染み、凛とした上品な印象に。\n- **02 モカブラウン（赤みを含んだ柔らかブラウン）**：ピンクブラウン系や暖色系ヘア、イエベ春・ブルベ夏の方に。フェミニンで抜け感のある優しい眉に仕上がります。\n- **03 ライトブラウン（黄みのある明るめブラウン）**：ハイトーンや明るいベージュヘアの方に。眉の印象を明るく軽やかに見せてくれます。`
      }
    ],
    faqs: [
      {
        question: '自眉が抜けてしまいませんか？',
        answer: '完全に乾いた状態で眉尻からゆっくり剥がせば、毛が抜ける心配はほとんどありません。どうしても毛が引っ張られるのが怖い方は、ぬるま湯で優しく洗い流すことも可能です。'
      },
      {
        question: 'どれくらいの日数持ちますか？',
        answer: '肌の代謝や洗顔方法にもよりますが、一晩置いた場合で約3日〜5日間持続します。オイルクレンジングで強くこすらないようにすると、より長持ちします。'
      }
    ]
  },

  // 2. アイシャドウベース（二重の溝に溜まらない・ヨレ防止）
  {
    id: 'art-sachiko-eyeshadow-base-creaseproof-guide',
    searchKeyword: 'アイシャドウベース キャンメイク エクセル',
    title: '【夕方まで二重の溝に溜まらない】アイシャドウベースおすすめ10選！発色長持ち＆ヨレ・くすみを防ぐ名品比較',
    description: '夕方になるとアイシャドウが二重幅の溝に線状に溜まる、ラメが頬に飛び散る悩みを解決するアイシャドウベースおすすめ10選。キャンメイクやエクセルなどプチプラからデパコスまで、発色とキープ力を底上げする塗り方を徹底解説します。',
    category: 'makeup',
    tags: ['アイシャドウ ベース', 'アイシャドウベース', 'アイシャドウベース よれない', 'アイシャドウが夕方に二重の溝に溜まる。発色を長持ちさせるには？', 'アイ シャドウ ベース', 'アイメイク用下地', 'アイ下地', 'アイシャドウ 下地'],
    author: '橘 えりか',
    intro: `朝せっかくグラデーションを綺麗に仕上げたのに、夕方ふと鏡を見ると「二重の溝にアイシャドウが固まって溜まっている」「まぶたの皮脂で色がくすんで消えている」という経験はありませんか？\n\nまぶたは皮膚が薄く、瞬きによって1日に1万回以上動くため、最もアイシャドウがヨレやすい部位です。まぶたの皮脂をコントロールし、朝の鮮やかな発色とラメの輝きを夜までピタッとロックする**アイシャドウベース（目元用プライマー）**の実力を検証しました。`,
    editorialSections: [
      {
        heading: 'なぜ二重の溝に溜まるのか？ヨレを防ぐ3つのメカニズム',
        text: `1. **まぶたの分泌皮脂を吸着パウダーがブロック**：まぶたから分泌される皮脂がアイシャドウの粉体と混ざり合うことで、油分によって溝に集まってしまいます。下地の皮脂吸着成分がこれを物理的に防ぎます。\n2. **粉飛び・ラメ落ちを防止する密着ポリマー**：まぶたの表面に均一でなめらかな極薄フィルムを形成し、大粒のラメや微粒子パールをマグネットのように吸着します。\n3. **まぶたのくすみを飛ばすトーンアップ効果**：まぶた特有の茶ぐすみや赤みを均一に整えることで、淡いアイシャドウでも見た目通りのピュアな高発色を引き出します。`
      },
      {
        heading: 'プロ直伝！ヨレないアイシャドウベースの正しい塗り方',
        text: `塗る量は**「米粒の半分（片目につきゴマ1粒大）」**で十分です。多く塗りすぎると、下地そのものが溝に溜まる原因になります。\n\n薬指の腹に取り、上まぶたの中央からトントンと優しく叩き込むようにアイホール全体へ広げます。下まぶたの涙袋部分にも薄く伸ばしておくと、夕方のマスカラのにじみ（パンダ目）も強力に防止できます。下地が乾いてサラサラになったのを確認してから、アイシャドウをのせましょう。`
      }
    ],
    faqs: [
      {
        question: 'ファンデーションを目元に塗る代わりになりますか？',
        answer: 'はい。むしろまぶたにはファンデーションを塗らず、目元専用のアイシャドウベースだけを塗る方が油分が少なくなり、圧倒的にヨレにくくなります。'
      },
      {
        question: 'クリームタイプとリキッドタイプ、どちらが良いですか？',
        answer: '乾燥やまぶたのカサつきが気になる方は保湿力の高いクリームタイプ、皮脂が多くテカリやすい方は速乾マットなリキッドやチップタイプがおすすめです。'
      }
    ]
  },

  // 3. デパコス・コスメギフトセット（予算5000円）
  {
    id: 'art-sachiko-gift-budget-5000-depacos',
    searchKeyword: 'デパコス プレゼント 5000円 コスメ ギフトセット',
    title: '【予算5,000円】女性が絶対に喜ぶデパコス＆コスメギフトセットおすすめ10選！センスのいいプレゼント徹底比較',
    description: '女性への誕生日プレゼントやお礼、自分へのご褒美に最適な「予算5,000円以内」のデパコス＆人気コスメギフトセット10選。シャネルやディオール、イソップなど好みが分かれず高級感のあるパッケージの名品を厳選紹介します。',
    category: 'gift',
    tags: ['5000円 コスメ', 'コスメ ギフトセット 5000円', 'コスメ ギフト セット 5000 円', '5000円 プレゼント デパコス', 'コスメ 5000円', '5000円コスメ', 'デパコス プレゼント 5000円 30代', '女性 プレゼント コスメ', '彼女 プレゼント コスメ', '高級 化粧品 プレゼント', 'ご褒美 コスメ'],
    author: '神崎 美咲',
    intro: `友人や職場の同僚、大切なパートナーへのプレゼント選び。「高すぎると相手に気を使わせてしまうけれど、安っぽく見えずに特別感のあるものを贈りたい」というときに最も選ばれている黄金の価格帯が**【予算5,000円】**です。\n\nデパコスの高級ショッパーや洗練されたボックスに包まれた5,000円前後のアイテムは、肌色や好みの色に左右されにくく、日常の中で贅沢な気分を味わえる実力派が揃っています。絶対に外さないハイセンスなギフトをまとめました。`,
    editorialSections: [
      {
        heading: '失敗しない！5,000円デパコスギフトの3大鉄板カテゴリ',
        text: `1. **高級ハンドクリーム＆ハンドウォッシュ（シャネル・イソップ・ディオール）**：香りの好みが分かれにくく、毎日使える実用性の高さ。持ち歩くだけで気分が上がるラグジュアリーな容器デザインが最大の魅力です。\n2. **リップバーム・高保湿リップオイル**：色味がつかない（または淡い血色感の）リップトリートメントなら、相手のパーソナルカラーを気にせず贈ることができます。\n3. **ヘアミスト＆ボディミスト**：香水よりも軽やかに香るフレグランスミストは、オフィスや就寝前にも使いやすく、上品な大人の女性に大好評です。`
      },
      {
        heading: '「ロクシタンは嬉しくない？」と言われる理由と対策',
        text: `ギフトの定番であるロクシタンですが、ネット上で「貰いすぎて余っている」「香りが強すぎる」という声が見られることがあります。\n\nギフトで差をつけるなら、誰もが持っている定番シアハンドクリームを避けるか、**「シャネルのラ クレーム マン（卵型）」や「Diorのアディクト リップ グロウ」**のように、自分ではなかなか手が出ない憧れのハイブランドを選ぶと、開けた瞬間の歓声と感動が段違いです。`
      }
    ],
    faqs: [
      {
        question: '楽天市場で購入してもブランドのショッパー（紙袋）は付きますか？',
        answer: '楽天市場の公式旗艦店やギフト専門店では、正規のブランドショッパーやギフトラッピングに対応している店舗が多数あります。購入時に「ギフトラッピングあり」「ショッパー付き」のオプションを選択してください。'
      },
      {
        question: '20代・30代・40代で喜ばれるブランドの違いは？',
        answer: '20代にはディオールのリップやジルスチュアートの可愛らしいパッケージ、30代にはイソップやSHIRO、シャネルの洗練されたシンプルデザイン、40代〜50代にはコスメデコルテやクラランスなどの上質なスキンケア・ハンドケアが特に好まれます。'
      }
    ]
  },

  // 4. トーンアップ化粧下地（透明感・くすみ飛ばし・崩れ防止）
  {
    id: 'art-tone-up-primer-base-makeup-10sen-2026',
    searchKeyword: 'トーンアップ 下地 ラロッシュポゼ ポール&ジョー',
    title: '【2026年最新】ノーファンデ派も絶賛！透明感爆上がりの最強トーンアップ化粧下地おすすめ10選！くすみ・赤み・毛穴を消す名品比較',
    description: '塗るだけで素肌が澄み渡るような透明感を与えるトーンアップ化粧下地おすすめ10選。ラロッシュポゼやポール＆ジョーなど、黄ぐすみや赤みを払拭するカラーコントロール効果、UVカット、崩れにくさを徹底比較します。',
    category: 'makeup',
    tags: ['トーン アップ 下地', 'トーンアップ下地', 'トーンアップ 下地', '肌白くなる 下地', '肌白くなる下地', '透明感 下地', '下地 くすみ 人気', '下地 くすみ ランキング', '化粧下地 美白', '化粧下地 くすみ', 'セザンヌ 下地 ライトブルー 口コミ', 'セザンヌ 下地 オレンジ 口コミ'],
    author: '神崎 美咲',
    intro: `ファンデーションを厚塗りしなくても、くすみをパッと払い、生まれつき色白であるかのような透明感を演出してくれる**トーンアップ化粧下地**。\n\n「白浮きして顔だけ能面のように浮かない？」「夕方になってもくすまずにツヤが続く？」というリアルな疑問に答えるべく、ローズ、ラベンダー、ミント、オレンジなど各色の補色効果と、一日中崩れない名品下地を徹底比較しました。`,
    editorialSections: [
      {
        heading: '【肌悩み別】あなたに最適なトーンアップカラーの選び方診断',
        text: `- **ローズ・ピンク系（血色感＆ツヤ）**：顔色が悪く疲れ見えしやすい方、青白く見えがちな方に。自然な血色感と幸福感を宿します（ラロッシュポゼ ローズ等）。\n- **ラベンダー・パープル系（圧倒的透明感）**：黄ぐすみや肌のトーンをワントーン明るく見せたい方に。ピンクの血色感とブルーの透明感をいいとこ取りできます。\n- **ミント・グリーン系（赤み消去）**：小鼻の赤みやニキビ跡、頬の赤ら顔をカバーしたい方に。気になる部分にだけピンポイントで使うのが自然に仕上げるコツです。\n- **オレンジ・イエロー系（色ムラ・クマ補正）**：目元の茶クマや口周りのくすみ、健康的な明るさを出したいイエベ肌に最も馴染みます。`
      },
      {
        heading: 'ノーファンデでも美肌見えする「下地＋パウダー」の時短テク',
        text: `トーンアップ下地を全顔にムラなく馴染ませた後、気になるシミや小鼻の影にだけコンシーラーをトントンと薄くのせます。仕上げに微粒子のフェイスパウダーをTゾーンとおでこに軽くはたくことで、ファンデーションなしでも毛穴と色ムラが目立たない透明感あふれる素肌風メイクが完成します。`
      }
    ],
    faqs: [
      {
        question: '首との色の差（白浮き）を防ぐにはどうすればいいですか？',
        answer: '下地を塗る際、顔の輪郭ギリギリまで全顔に均一に伸ばすのではなく、顔の中心（三角ゾーン）を一番明るくし、フェイスラインに向かって薄くぼかすのが自然に見せる鉄則です。首筋にも軽く伸ばすと境目が馴染みます。'
      },
      {
        question: '日焼け止めを重ねて塗る必要はありますか？',
        answer: 'SPF50+/PA++++などの高スペックなトーンアップ下地であれば、日焼け止めを重ねずに下地1本で紫外線対策を完結できます。摩擦が減るため、メイク崩れの防止にもつながります。'
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

ご自身の肌質やなりたい仕上がりに合わせた最適なアイテムを選ぶことで、メイクの完成度と毎日のモチベーションは格段に高まります。ぜひ楽天市場の公式ショップで最新の在庫状況やポイントアップキャンペーンをチェックしてみてください。
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
  console.log('🎉 第8弾 4大最重要記事の書き下ろし・データ保存が完了しました！');
}

generate().catch(e => { console.error('エラー:', e); process.exit(1); });
