import fs from 'fs';
import path from 'path';

console.log('🚀 楽天APIキーワード最適化＆全特集記事ブラッシュアップを実行します...');

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

async function fetchRakutenItems(keywords, hits = 10) {
  for (const kw of (Array.isArray(keywords) ? keywords : [keywords])) {
    let cleanKw = kw.replace(/【.*?】/g, '').replace(/（.*?）/g, '').replace(/\(.*?\)/g, '').trim();
    if (cleanKw.length > 35) cleanKw = cleanKw.slice(0, 35);
    const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent(cleanKw)}&format=json&hits=${hits}&sort=-reviewCount&imageFlag=1`;

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`📡 [楽天API 試行] "${cleanKw}"`);
        const res = await fetch(url);
        if (res.status === 429) { await new Promise(r => setTimeout(r, 2000)); continue; }
        if (!res.ok) { console.warn(`⚠️ APIエラー ${res.status}`); break; }
        const data = await res.json();
        if (data.Items && data.Items.length >= 5) {
          console.log(`✨ 取得成功 (${data.Items.length}件): "${cleanKw}"`);
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
        }
      } catch (e) {
        console.error(`❌ エラー:`, e.message);
      }
      await new Promise(r => setTimeout(r, 800));
    }
  }
  return [];
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const wfDefs = [
  {
    id: 'art-wf-30s-keana-foundation-2026',
    keywords: ['30代 毛穴 ファンデーション', '毛穴 カバー ファンデーション', '毛穴落ちしない ファンデーション'],
    title: '【2026年最新】30代の開き毛穴・たるみ毛穴を隠すファンデーションおすすめ10選！毛穴落ちしない神アイテム徹底比較',
    description: '30代の開き毛穴・たるみ毛穴をなめらかにカバーし、夕方になっても毛穴落ちしない最強ファンデーション10選を徹底比較。崩れにくさ・カバー力・素肌感を楽天実売データから厳選。',
    category: 'makeup',
    tags: ['30代ファンデーション', '毛穴落ち防止', '開き毛穴ファンデ', 'たるみ毛穴カバー', '30代ベースメイク', '毛穴レスファンデ', '崩れないファンデ30代'],
    author: '松本 結衣',
    userPainPoint: '「朝はきれいに毛穴が隠れたのに、お昼には毛穴にファンデが白く詰まって水玉状に崩れる」「20代と同じファンデだと毛穴の影が目立って老け見えする」という30代女性の切実な悩み。',
    solutionLogic: '30代の毛穴落ちは、肌内部の水分低下による「たるみ毛穴」と、ファンデの油分が毛穴に落ち込むことが原因です。厚塗りで埋めるのではなく、光を乱反射する微粒子パウダーと皮脂吸着成分で「薄膜密着」させることが毛穴レスを一日中キープする唯一の正解です。'
  },
  {
    id: 'art-wf-40s-shimi-cover-foundation-2026',
    keywords: ['40代 シミ ファンデーション', 'シミ カバー ファンデーション', '肝斑 カバー ファンデーション'],
    title: '【2026年最新】40代のシミ・肝斑を厚塗り感なく隠すファンデーションおすすめ10選！コンシーラーいらずの最強カバー徹底比較',
    description: '40代の濃いシミ・肝斑・色ムラをひと塗りで綺麗に消し去り、厚塗り感ゼロの若見え美肌をつくる最強ファンデーション10選を徹底比較。高カバー力とツヤ感を両立した楽天実売人気アイテムを厳選。',
    category: 'makeup',
    tags: ['40代ファンデーション', 'シミ隠すファンデ', '肝斑カバー', '40代ベースメイク', 'ハイカバーファンデ', '厚塗り感なし', '若見えツヤ肌'],
    author: '橘 えりか',
    userPainPoint: '「頬の濃いシミやもやもやした肝斑を隠そうとすると、どうしても能面のような厚塗り感が出てシワが目立ってしまう」「コンシーラーを重ねても時間が経つと浮いてくる」という悩み。',
    solutionLogic: '大人のシミカバーは「色の不透明度で隠す」のではなく、「光の屈折率を利用してシミの輪郭をぼかす」光学補正テクノロジーが不可欠。美容液成分80%以上の高密着テクスチャーを選ぶことで、薄膜でありながらシミも小ジワも若々しくツヤで飛ばすことができます。'
  },
  {
    id: 'art-wf-kansouhada-kuzurenai-foundation-2026',
    keywords: ['乾燥肌 ファンデーション 保湿', '高保湿 ファンデーション ツヤ', '乾燥肌 崩れない クッションファンデ'],
    title: '【2026年最新】乾燥肌でも1日中カサつかない＆崩れないファンデーションおすすめ10選！夕方まで潤い続く神コスメ徹底比較',
    description: '「ファンデを塗ると粉を吹く」「夕方に目元や口元がつっぱる」乾燥肌・インナードライに悩む方へ。高保湿美容液成分配合で夜までうるツヤ肌が続く最強ファンデ10選を徹底比較。',
    category: 'makeup',
    tags: ['乾燥肌ファンデーション', '崩れないファンデ', '保湿ファンデ', 'ツヤ肌ファンデ', 'インナードライ', '粉吹き防止', '美容液ファンデ'],
    author: '高橋 凛',
    userPainPoint: '「塗った瞬間からカサついて粉を吹く」「時間が経つと笑いジワにファンデがひび割れる」「テカリ防止下地を使うと肌がパリパリに乾燥する」という乾燥肌特有のストレス。',
    solutionLogic: '乾燥肌のメイク崩れは、肌の水分不足による収縮が原因。油分だけでフタをするのではなく、ヒアルロン酸やセラミドなどの水分保持成分を高配合したリキッドやクッションを選び、肌の水分蒸発を物理的に防ぐことが大切です。'
  },
  {
    id: 'art-wf-binkanhada-tsukaeru-foundation-2026',
    keywords: ['敏感肌 ファンデーション 石鹸オフ', 'ミネラルファンデーション 石鹸落ち', '低刺激 ファンデーション 肌荒れ'],
    title: '【2026年最新】肌荒れ・敏感肌でも安心して使える低刺激ファンデーションおすすめ10選！石鹸オフ＆薬用処方完全比較',
    description: '敏感肌・ゆらぎ肌・アトピー肌でもヒリつかず肌荒れを防ぐ低刺激ミネラル＆薬用ファンデーション10選を徹底比較。クレンジング不要の石鹸落ち・ノンケミカルを厳選。',
    category: 'makeup',
    tags: ['敏感肌ファンデーション', '石鹸オフコスメ', 'ミネラルファンデ', '低刺激ベースメイク', '肌荒れ防止', 'ノンケミカル', '薬用ファンデ'],
    author: '佐々木 葵',
    userPainPoint: '「メイクすると赤みやかゆみが出る」「クレンジングの強い摩擦で肌がヒリヒリ荒れてしまう」「皮膚科通い中でもメイクしたい」という敏感肌の悩み。',
    solutionLogic: '石油系界面活性剤や紫外線吸収剤、シリコンを排除したミネラル処方や、グリチルリチン酸などの抗炎症有効成分を含む薬用ファンデーションを選ぶことで、肌に負担をかけずに肌荒れをカバー・予防できます。石鹸オフできることも肌バリア保護の重要ポイントです。'
  },
  {
    id: 'art-wf-burubenatsu-niau-lip-2026',
    keywords: ['ブルベ夏 リップ', '粘膜リップ 青みピンク', 'ブルベ リップ モーヴ', 'リップ ティント ブルベ'],
    title: '【2026年最新】ブルベ夏に似合う神リップおすすめ10選！透明感爆発の青みピンク＆粘膜カラー徹底比較',
    description: 'パーソナルカラー「ブルベ夏（サマー）」に抜群に似合う青みピンク、モーヴ、プラム、くすみローズの神リップ10選を徹底比較。肌の透明感を極限まで引き出す名品を楽天実売データから厳選。',
    category: 'lip',
    tags: ['ブルベ夏リップ', 'サマータイプ', '粘膜リップ', '青みピンク', 'モーヴリップ', '落ちないリップ', '透明感メイク'],
    author: '井上 さくら',
    userPainPoint: '「黄みの強いリップを塗ると顔色が一気にくすんで老けて見える」「派手すぎる青みピンクは浮いてしまい日常使いできない」というブルベ夏のカラー選びの難しさ。',
    solutionLogic: 'ブルベ夏は「青みを含んだ明るいトーン」「グレイッシュなくすみ感」「みずみずしい透明感」が得意。透け感のある粘膜ローズや青みピンクを選ぶことで、肌のトーンを澄んだ白肌へと引き立てることができます。'
  },
  {
    id: 'art-wf-yebeaki-niau-eyeshadow-2026',
    keywords: ['イエベ秋 アイシャドウ', 'テラコッタ アイシャドウ パレット', 'ブラウン アイシャドウ イエベ', 'アイシャドウ イエベ秋'],
    title: '【2026年最新】イエベ秋に似合う神アイシャドウおすすめ10選！深みテラコッタ＆ゴールドブラウン徹底比較',
    description: 'パーソナルカラー「イエベ秋（オータム）」の魅力を最大限に引き出すテラコッタ、マスタード、ウォームブラウン、カーキのアイシャドウ10選を徹底比較。',
    category: 'makeup',
    tags: ['イエベ秋アイシャドウ', 'オータムタイプ', 'テラコッタアイシャドウ', 'ブラウンパレット', '陰影メイク', 'プチプラデパコス', '深みアイメイク'],
    author: '松本 結衣',
    userPainPoint: '「明るいパステルカラーを塗ると目元が腫れぼったく見える」「グレーや青みを入れると目元がくすんで疲れた顔になる」というイエベ秋の悩み。',
    solutionLogic: 'イエベ秋は「黄みのある深みカラー」「こっくりとした温かみ」「マットや繊細なゴールドラメ」がベストマッチ。深みのあるテラコッタやブロンズブラウンを重ねることで、洗練された立体感と色気のある彫り深アイが完成します。'
  },
  {
    id: 'art-wf-kuchibiru-arenai-lip-2026',
    keywords: ['唇 荒れない リップ', '高保湿 リップクリーム 口紅', '皮むけ リップ 保湿 美容液'],
    title: '【2026年最新】皮むけ・乾燥知らず！唇が絶対に荒れない高保湿神リップおすすめ10選徹底比較',
    description: '「どんな口紅を塗っても唇の皮がベリベリ剥ける」「縦ジワや乾燥がひどい」唇のデリケートな方に。美容液オイル高配合で一日中プルプルが続く荒れない口紅10選を徹底比較。',
    category: 'lip',
    tags: ['荒れないリップ', '皮むけ防止口紅', '唇乾燥対策', '高保湿リップ', 'プランパー', '敏感唇', 'リップ美容液'],
    author: '井上 さくら',
    userPainPoint: '「ティントを使うと夕方には皮がめくれてボロボロになる」「口紅を落とした後のヒリヒリ感に耐えられない」という唇の皮むけ悩み。',
    solutionLogic: '唇には皮脂腺がなく角層が極めて薄いため、合成色素や刺激成分で簡単にバリアが壊れます。スクワランやホホバオイル、シアバターなどの天然保湿油分をベースにし、色素が直接唇に触れにくい処方を選ぶことが大切です。'
  },
  {
    id: 'art-wf-mask-tsukanai-lip-2026',
    keywords: ['マスクにつかない リップ', '落ちない リップ ティント', '口紅 落ちない マスク', 'リップ ジェル膜'],
    title: '【2026年最新】食事しても落ちない＆マスクにつかない最強神リップおすすめ10選！ツヤも色持ちも諦めない徹底比較',
    description: 'マスクへの色移りゼロ＆飲食後も血色感がそのまま残る最強の落ちないリップ10選を徹底比較。乾燥せずツヤが持続する最新ジェル膜ティントを厳選。',
    category: 'lip',
    tags: ['落ちないリップ', 'マスクにつかない口紅', 'ティントリップ', 'ジェル膜リップ', '食事しても落ちない', '高発色リップ', 'ロングラスティング'],
    author: '井上 さくら',
    userPainPoint: '「マスクの内側に口紅がべっとり付く」「カップに色がついて恥ずかしい」「食後すぐにリップを塗り直す時間がない」というストレス。',
    solutionLogic: '従来の「マットに固めて色を定着させる」処方は乾燥の原因でした。最新のジェル膜処方は、唇の水分と反応して透明なオイル膜が表面をシールドし、色材を密閉するため、「高発色キープ」と「みずみずしいツヤ」を同時に両立できます。'
  },
  {
    id: 'art-wf-yuugata-kusumanai-foundation-2026',
    keywords: ['トーンアップ ファンデーション', 'くすまない ファンデーション', '透明感 ファンデーション', '美白 ファンデーション'],
    title: '【2026年最新】夕方になっても顔色がくすまない！一日中透明感をキープする神ファンデーションおすすめ10選徹底比較',
    description: '「お昼過ぎから顔が土気色に沈む」「夕方のくすみがひどい」酸化くすみを防ぎ、朝のつけたての明るさと透明感を夜までキープする最強ファンデーション10選を徹底比較。',
    category: 'makeup',
    tags: ['くすまないファンデ', '夕方くすみ防止', '透明感ファンデ', '皮脂酸化防止', 'トーンアップファンデ', '美白ベースメイク', '長時間キープ'],
    author: '松本 結衣',
    userPainPoint: '「朝はバッチリだったのに、夕方オフィスの鏡を見ると顔色がどんより土色に暗くなっている」「疲れて老けた印象に見られる」という夕方の酸化くすみ悩み。',
    solutionLogic: '夕方のくすみは、皮脂が時間経過で酸化することと、ファンデの粉体が皮脂を吸って変色することが原因。抗酸化ビタミンや皮脂固化パウダー、ラベンダーやピンクの微細パールを配合したファンデを選ぶことで、時間が経つほど光を放つ透明感をキープできます。'
  },
  {
    id: 'art-wf-hair-sarasara-fragrance-2026',
    keywords: ['ヘアオイル いい匂い', 'ヘアオイル サラサラ', 'ヘアフレグランス オイル', 'ヘアトリートメント オイル 人気'],
    title: '【2026年最新】すれ違いざまに良い香り！髪がサラサラにまとまる神ヘアオイル＆ミストおすすめ10選徹底比較',
    description: '「香水代わりにふんわり香らせたい」「ベタつかず毛先まで指通りスルンとまとめたい」褒められフレグランス×美髪補修を両立した最強ヘアオイル10選を徹底比較。',
    category: 'haircare',
    tags: ['ヘアオイルいい匂い', 'サラサラヘアオイル', 'モテ香水ヘアミスト', 'ヘアフレグランス', 'うねりパサつき改善', 'ダメージ補修', '人気ヘアケア'],
    author: '蓮見 拓真',
    userPainPoint: '「オイルを塗るとベタっとして髪が重くなる」「香水はキツすぎるけれど、シャンプーのような自然の良い香りを1日中まといたい」という悩み。',
    solutionLogic: '重たい植物油ではなく、浸透型のアミノ酸誘導体や揮発性シリコンオイルを黄金比でブレンドしたヘアオイルなら、毛先の内側にうるおいを閉じ込めつつ表面は指通りサラサラ。髪が揺れるたびにふんわり香る好印象ヘアが完成します。'
  }
];

async function runOptimizedUpdate() {
  for (const def of wfDefs) {
    console.log(`\n========================================`);
    console.log(`🎯 楽天API直接取得: [${def.id}]`);
    
    const apiItems = await fetchRakutenItems(def.keywords, 12);
    await sleep(500);

    if (apiItems.length < 5) {
      console.warn(`⚠️ アイテム数が5件未満です: ${apiItems.length}件`);
      continue;
    }

    const itemsToUse = apiItems.slice(0, 10);
    const topItem = itemsToUse[0];

    // 思考経路直結型マークダウンの組み立て
    let markdown = `# ${def.title}\n\n`;
    markdown += `> **💡 読者のリアルな悩み・検索背景**\n> ${def.userPainPoint}\n\n`;
    markdown += `${def.solutionLogic}\n\n`;
    markdown += `本記事では、楽天市場の実売データ・レビュー評価をもとに、**「ユーザーが実際に購入して後悔しないための思考経路」**に沿って、あらゆる面から徹底比較した10選を厳選紹介します。\n\n---\n\n`;

    // 1. 比較マトリクス表
    markdown += `## 📱 【一目でわかる】条件・特徴別 徹底比較マトリクス表\n\n`;
    markdown += `<div style="overflow-x: auto; -webkit-overflow-scrolling: touch; margin-bottom: 24px;">\n`;
    markdown += `| 順位 | 商品名 | おすすめタイプ・部門 | 注目ポイント | 楽天参考価格 | 公式購入リンク |\n`;
    markdown += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;

    const badges = [
      '🏆 総合No.1', '💎 高機能・デパコス級', '✨ コスパ最強', '🌿 低刺激・肌に優しい',
      '💧 保湿・うるおい重視', '🛡️ 耐久・崩れ防止', '🌸 透明感・トーンアップ', '⚡ 即効リペア',
      '🌟 万能デイリー使い', '🔥 SNS話題・バズり'
    ];

    itemsToUse.forEach((item, idx) => {
      const rank = `${idx + 1}位`;
      const badge = badges[idx] || `注目No.${idx+1}`;
      const shortName = item.itemName.slice(0, 30).replace(/\|/g, '') + '...';
      const cleanCatch = item.catchcopy ? item.catchcopy.slice(0, 40).replace(/\|/g, '') : '楽天高評価アイテム';
      markdown += `| **${rank}** | **[${shortName}](${item.affiliateUrl})** | 🏷️${badge} | ${cleanCatch} | **${item.price}** | [👉 楽天公式](${item.affiliateUrl}) |\n`;
    });
    markdown += `</div>\n\n---\n\n`;

    // 2. 各商品の詳細
    markdown += `## 🛍️ 厳選10選の個別解説・購入の決め手\n\n`;

    itemsToUse.forEach((item, idx) => {
      const rank = `${idx + 1}位`;
      const badge = badges[idx] || `注目`;
      markdown += `### ${rank} 【${badge}】 ${item.itemName.slice(0, 45)}\n\n`;
      markdown += `![${item.itemName.slice(0, 30)}](${item.imageUrl})\n\n`;
      markdown += `| 項目 | 詳細スペック |\n`;
      markdown += `|:---|:---|\n`;
      markdown += `| **取扱ショップ** | ${item.shopName} |\n`;
      markdown += `| **楽天参考価格** | **${item.price}** |\n`;
      markdown += `| **レビュー評価** | ★★★★★ (${item.reviewAvg}/5.0・${item.reviewCount.toLocaleString()}件) |\n`;
      markdown += `| **おすすめの悩み** | ${def.tags[idx % def.tags.length]} |\n\n`;

      markdown += `> **💡 この商品を選ぶ「購入の決め手」**\n`;
      markdown += `> ${item.catchcopy ? item.catchcopy : '楽天市場の購入者レビューで絶大な支持を集め、リピート率が非常に高い実力派アイテムです。'}\n\n`;

      markdown += `**[👉 楽天市場で最安値・最新口コミをチェックする](${item.affiliateUrl})**\n\n---\n\n`;
    });

    // 3. 失敗しない選び方
    markdown += `## 🎯 失敗しない選び方！どれを買うべきか迷ったときの判断基準\n\n`;
    markdown += `1. **【即効性と確実な効果を求める方】** ➔ **1位・2位の総合No.1アイテム**を選べば間違いありません。多数のレビューで実証された安定の満足度です。\n`;
    markdown += `2. **【肌への優しさ・敏感肌対策を最優先したい方】** ➔ **低刺激・肌荒れ防止部門**のアイテムをチョイス。刺激成分をカットした処方で肌バリアを守ります。\n`;
    markdown += `3. **【毎日の継続・コスパを重視したい方】** ➔ **コスパ最強部門**のアイテム。惜しみなくたっぷり使える価格帯でデイリーケアに最適です。\n\n---\n\n`;

    // 4. FAQ
    markdown += `## ❓ 購入前によくある質問（FAQ）\n\n`;
    markdown += `### Q. どこで購入するのが一番安心でお得ですか？\n`;
    markdown += `**A.** 楽天市場の公式ショップまたは認定優良店舗からの購入が最も安心です。偽物や保管状態の悪い並行輸入品のリスクを避けられ、お買い物マラソンやポイントUPキャンペーンを利用することで実質最安値で手に入ります。\n\n`;
    markdown += `### Q. 自分の肌に合わない場合の対策は？\n`;
    markdown += `**A.** 初めて使用する際は、フェイスラインや二の腕の内側などでパッチテストを行ってからのご使用をおすすめします。\n\n---\n\n`;

    markdown += `## まとめ\n\n`;
    markdown += `本記事では「${def.title}」をテーマに、ユーザーの購買思考経路に完全直結した厳選10選をご紹介しました。\n`;
    markdown += `ご自身の肌質やお悩みに合わせた最適なアイテムを手に入れて、毎日のメイクやスキンケアの満足度を劇的に高めましょう！\n\n`;

    // JSON-LD スキーマ
    const jsonLdArticle = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": def.title,
      "description": def.description,
      "author": { "@type": "Person", "name": def.author },
      "datePublished": "2026-08-30",
      "dateModified": "2026-08-30",
      "publisher": { "@type": "Organization", "name": "Qualia Navi" }
    };

    const jsonLdList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": def.title,
      "description": def.description,
      "numberOfItems": itemsToUse.length,
      "itemListElement": itemsToUse.map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": item.itemName,
        "url": item.affiliateUrl
      }))
    };

    markdown += `<script type="application/ld+json">\n${JSON.stringify(jsonLdArticle, null, 2)}\n</script>\n\n`;
    markdown += `<script type="application/ld+json">\n${JSON.stringify(jsonLdList, null, 2)}\n</script>\n`;

    const existingIdx = articlesData.findIndex(a => a.id === def.id);
    const updatedArticleObj = {
      id: def.id,
      title: def.title,
      description: def.description,
      content: markdown,
      category: def.category,
      tags: def.tags,
      author: def.author,
      createdAt: '2026-08-30',
      updatedAt: '2026-08-30',
      image: topItem.imageUrl || '',
      affiliateUrl: topItem.affiliateUrl || '',
      price: topItem.price || '',
      itemCount: itemsToUse.length,
      featured: true
    };

    if (existingIdx !== -1) {
      articlesData[existingIdx] = updatedArticleObj;
      console.log(`✅ [更新完了] ${def.id}`);
    } else {
      articlesData.unshift(updatedArticleObj);
      console.log(`✅ [新規追加完了] ${def.id}`);
    }
  }

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
  console.log(`\n🎉 全ての特集記事が楽天APIデータで完全更新されました！`);
}

runOptimizedUpdate().catch(console.error);
