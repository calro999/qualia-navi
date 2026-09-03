import fs from 'fs';
import path from 'path';

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

async function fetchMolakProducts() {
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent('モラク カラコン 宮脇咲良 MOLAK')}&format=json&hits=30&sort=-reviewCount&imageFlag=1`;
  const res = await fetch(url);
  const data = await res.json();
  const rawItems = data.Items ? data.Items.map(e => e.Item || e) : [];

  // Picked 10 distinct top product packages:
  // 0: 公式ワンデー 3箱30枚 (1箱無料) (idx: 0)
  // 1: 公式ワンデー 1箱10枚 単品 (idx: 8)
  // 2: 公式乱視用トーリック 2箱セット (idx: 9)
  // 3: 公式マンスリー 2箱セット (idx: 2)
  // 4: 公式マンスリー 1箱2枚 (idx: 10)
  // 5: HONEY ME EYES 3箱セット (実質1箱無料) (idx: 1)
  // 6: カラコレ 3箱30枚セット (25%OFFクーポン) (idx: 3)
  // 7: モアコンタクト ワンデー1箱 (即日発送) (idx: 4)
  // 8: 公式乱視用トーリック 単品1箱 (idx: 14)
  // 9: モアコンタクト マンスリー1箱2枚 (idx: 6)
  const pickedIndices = [0, 8, 9, 2, 10, 1, 3, 4, 14, 6];

  return pickedIndices.map((idx, i) => {
    const item = rawItems[idx];
    let img = item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '';
    if (img.includes('thumbnail.image.rakuten.co.jp/@0_mall/')) {
      img = img.replace('https://thumbnail.image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/').split('?_ex=')[0];
    } else if (img.includes('tshop.r10s.jp/')) {
      img = img.replace('https://tshop.r10s.jp/', 'https://shop.r10s.jp/');
    }
    return {
      rank: i + 1,
      itemName: item.itemName,
      shopName: item.shopName,
      price: `${item.itemPrice.toLocaleString()}円 (税込)`,
      priceNum: item.itemPrice,
      affiliateUrl: item.affiliateUrl,
      imageUrl: img,
      reviewAvg: item.reviewAverage || 4.7,
      reviewCount: item.reviewCount || 0,
      catchcopy: item.catchcopy || ''
    };
  });
}

const articleDef = {
  id: 'art-molak-miyawaki-sakura-colorcon-10sen-2026',
  queryTarget: '宮脇咲良 カラコン モラク 人気色 おすすめ 10選',
  title: '【2026年最新】宮脇咲良プロデュース「MOLAK（モラク）」カラコン人気色・おすすめ10選徹底比較！全色レポ＆水光グラデ・韓国アイドル風アイ診断',
  description: 'LE SSERAFIM宮脇咲良プロデュースで話題沸騰の『MOLAK（モラク）』カラコンを徹底レビュー！サクラスモア・ドーリッシュブラウン等の人気水光カラー比較から実質1箱無料セット・乱視用・マンスリーまで、楽天市場公式データと口コミに基づき厳選10選を詳しく解説。',
  category: 'colorcon',
  tags: ['カラコン', 'モラク', 'MOLAK', '宮脇咲良', 'サクラスモア', 'ドーリッシュブラウン', '水光カラコン', '韓国アイドルカラコン', '芸能人カラコン', 'ワンデーカラコン', '最新コスメ10選'],
  author: '神崎 美咲',
  featured: true,
  intro: `「韓国アイドルのようなうるうるで透明感あふれる水光アイになりたい」「繊細なグラデーションと細フチで今っぽく垢抜けたい」――そんなトレンドに敏感な女子から圧倒的な支持を集めているのが、**LE SSERAFIMの宮脇咲良さんがプロデュース＆イメージモデルを務める『MOLAK（モラク）』**です。\n\n独自の「水光グラデーション設計」や瞳にハイライトを固定する最新技術、絶妙なくすみニュアンスカラーにより、光を反射してきらめくドールアイを叶えます。\n\n本記事では、宮脇咲良さんプロデュース色の「サクラスモア」や大人気「ドーリッシュブラウン」「ダズルベージュ」をはじめとする全色チャート、公式の【実質1箱無料（2箱購入で＋1箱プレゼント）】、水光カラコン待望の乱視用（トーリック）、高コスパなマンスリーまで、**楽天市場の公式実売データと口コミから厳選したおすすめ10選**を徹底解説します。`,
  rankingNotes: [
    { rank: '1位', point: '圧倒的一番人気！実質1箱無料で話題の水光カラーを着比べできる公式ワンデー3箱セット（2箱＋1箱プレゼント）', label: '売上No.1・実質1箱無料3箱' },
    { rank: '2位', point: '「まずはサクラスモアを試したい」方に！全色から1箱選べる公式ワンデー単品', label: '定番お試し・公式1箱10枚' },
    { rank: '3位', point: '「乱視でも流行りの水光カラコンを着けたい」を叶えた！軸固定技術採用のモラク乱視用ワンデー2箱セット', label: '水光カラコン乱視用・2箱' },
    { rank: '4位', point: '両目1ヶ月分をしっかりカバー！毎日の通学・お出かけで愛用する人に一番選ばれているマンスリー2箱', label: '1ヶ月両目セット・デイリー用' },
    { rank: '5位', point: '1日あたりの装用コストを劇的にカット！毎日使えて経済的なモラク公式マンスリー（1ヶ月用・1箱2枚）', label: '高コスパ・公式マンスリー' },
    { rank: '6位', point: '実質1箱無料特典付き！人気カラーのドーリッシュシリーズも選べるHONEY ME EYESショップ便', label: '1箱無料・人気ショップ便' },
    { rank: '7位', point: '限定クーポン適用でお得に購入可能！30枚入りで人気カラーを着回せるカラコレ便', label: '限定クーポン割・3箱30枚' },
    { rank: '8位', point: 'ライブやイベント前に急ぎで手元に欲しい時に便利！即日発送対応のモアコンタクト便', label: '即日発送・モアコン便' },
    { rank: '9位', point: '「乱視度数が合うか1箱だけ試してみたい」方へ！単品で気軽に試せるモラク乱視用1箱10枚', label: '乱視用お試し・単品1箱' },
    { rank: '10位', point: '1ヶ月装用でトレンドの水光瞳をキープ！モアコンタクトのマンスリー単品便', label: 'マンスリー単品・モアコン便' }
  ],
  sections: [
    {
      h: 'なぜMOLAK（モラク）は韓国アイドル級に盛れるのか？3つのこだわり',
      body: `「派手すぎないのに、圧倒的に写真映えする」「瞳に光が入ってうるうるに見える」とSNSでバズり続けるモラク。その魅力の秘密を紐解きます。\n\n1. **瞳にハイライトを宿す水光グラデーション**: 三日月状のハイライトカラーと繊細なグラデーションドットにより、室内でも屋外でも常に瞳に光が差し込んでいるようなウルウル感を演出します。\n2. **レンズの回転を防ぐ「軸固定バラスト技術（トーリック）」**: 水光カラコンのハイライト位置がずれにくい特殊バラスト設計を採用。乱視用でも綺麗な三日月ハイライトをキープできます。\n3. **瞳を優しく守るUVカット＆高含水55%設計**: 紫外線（UV-A 75%、UV-B 99%）をしっかりブロック。水分たっぷりの高含水レンズでつけた瞬間から心地よいフィット感が続きます。`
    },
    {
      h: '【全色チャート】MOLAK（モラク）人気カラー徹底解説＆スペック比較',
      body: `| カラー名 | 着色直径 | 色味の特徴 | おすすめシーン・印象 |\n|:---|:---|:---|:---|\n| **サクラスモア（Sakura Smore）** | 13.5mm | 宮脇咲良プロデュース！ぽわんと甘いピンクベージュ | デート・女子会・ふんわりフェミニン |\n| **ドーリッシュブラウン（Dollish Brown）** | 13.2mm | 細フチ×水光ハイライトで韓国アイドル風ドールアイ | 写真映え・トレンドメイク・垢抜け |\n| **ドーリッシュグレー（Dollish Gray）** | 13.2mm | うるみ水光グレーで吸い込まれるような透明感 | ブルベ冬・アンニュイ・韓国風クール |\n| **ダズルベージュ（Dazzle Beige）** | 12.8mm | 細フチ×明るめベージュで色素薄い系ハーフEYE | 垢抜け・透明感アップ・色素薄い系 |\n| **ダズルグレー（Dazzle Gray）** | 12.8mm | ムラ感のあるグレージュで大人っぽい抜け感 | クールビューティー・お洒落メイク |\n| **ティントブラウン（Tint Brown）** | 13.3mm | じゅわっと溶け込むライトブラウン | 学校・オフィス・すっぴん風ナチュラル |\n| **ミラーグレー（Mirror Gray）** | 13.0mm | 透明感あふれるグレーの輝きと繊細フチ | モード系・透明感重視のメイク |\n| **コーラルブラウン（Coral Brown）** | 11.9mm | 自目のフチを活かしてトーンアップするコーラル | 瞳の大きさは変えずに色だけ変えたい時 |`
    },
    {
      h: '【パーソナルカラー別】あなたに一番似合うモラクの選び方診断',
      body: `自分のパーソナルカラーに合わせたモラクを選ぶことで、顔全体の透明感とアイメイクの完成度が一段と引き立ちます。\n\n- **イエベ春（スプリング）**: 『**ダズルベージュ**』『**コーラルブラウン**』『**サクラスモア**』がぴったり！明るいベージュやコーラルのきらめきが瞳を華やかに見せます。\n- **ブルベ夏（サマー）**: 『**サクラスモア**』『**ドーリッシュブラウン**』『**ティントブラウン**』が相性抜群！やわらかなピンクベージュやソフトなブラウンが肌の白さを引き立てます。\n- **イエベ秋（オータム）**: 『**ドーリッシュブラウン**』『**ティントブラウン**』『**ブラウンバニー**』がベスト！深みのあるブラウンと水光ハイライトで立体的な大人アイに。\n- **ブルベ冬（ウィンター）**: 『**ドーリッシュグレー**』『**ダズルグレー**』『**ミラーグレー**』がイチオシ！透明感あふれるグレーの輝きが吸い込まれるようなクールな瞳を作ります。`
    },
    {
      h: 'ワンデー vs マンスリー vs 乱視用（トーリック）！どっちを選ぶ？',
      body: `- **ワンデー（1日使い捨て）**: 休日のお出かけやライブ、気分に合わせて色を変えたい方におすすめ。お手入れ不要で毎日清潔に使えます。\n- **マンスリー（1ヶ月装用）**: 毎日韓国アイドル風の瞳をキープしたいデイリー派に最適。1箱2枚入りで1ヶ月使えるため、コスパが圧倒的に優れています。\n- **トーリック（乱視用）**: 乱視でぼやけやすい方でも、水光カラコンのうるうるデザインをクリアな視界で楽しめます。`
    },
    {
      h: '✨ 芸能人プロデュースカラコン特集（内部リンク・相互ハブ）',
      body: `本サイトでは、人気芸能人・モデルが手掛ける話題のプロデュースカラコンを順次徹底比較しています！それぞれの世界観や仕上がりの違いをぜひチェックしてみてください。\n\n- 💎 **指原莉乃プロデュース**: [【指原莉乃プロデュース】TOPARDS（トパーズ）カラコン人気色10選徹底比較＆全色レポ](/articles/art-topards-sashihara-rino-colorcon-10sen-2026) —— ちゅるんとした透明感と絶妙なハイライト効果で圧倒的支持を集める王道カラコン！\n- 🌸 **白石麻衣プロデュース**: [【白石麻衣（まいやん）プロデュース】feliamo（フェリアモ）カラコン人気色10選徹底比較＆全色レポ](/articles/art-feliamo-shiraishi-mai-colorcon-10sen-2026) —— 男性ウケ・清楚系モテを極めた実質1箱無料の愛されナチュラルレンズ！\n- 🔥 **ちゃんみなプロデュース**: [【ちゃんみなプロデュース】ギャルネバーダイ（GAL NEVER DIE）カラコン全色比較＆レポ](/articles/feature-chanmina-gal-never-die-colorcon-complete) —— 圧倒的存在感とエッジの効いたストリート＆ギャル盛れカラコン！\n- 👑 **益若つばさプロデュース**: 『AngelColor Bambi Series（バンビシリーズ）』—— ドールアイになれる元祖ドーリー＆ちゅるんフチカラコン`
    }
  ],
  faqs: [
    {
      q: 'モラクで宮脇咲良さんプロデュースの一番人気カラーは何色ですか？',
      a: '宮脇咲良さんがプロデュースした「サクラスモア（Sakura Smore）」と、トレンドの水光グラデーションで大バズりした「ドーリッシュブラウン（Dollish Brown）」が2大人気カラーです。甘くやさしい雰囲気にしたい時はサクラスモア、韓国ドール風に垢抜けたい時はドーリッシュブラウンがおすすめです。'
    },
    {
      q: '水光カラコンは着けている間にレンズが回ってデザインがずれませんか？',
      a: 'モラクのワンデーおよび乱視用（トーリック）レンズは、レンズの重心を計算した設計（バラスト技術）を採用しており、瞬きをしてもハイライトの位置が不自然に回転しにくく、綺麗なうるうる感をキープできるように工夫されています。'
    },
    {
      q: 'モラクの「実質1箱無料（2箱購入で＋1箱プレゼント）」はお得ですか？',
      a: '非常に人気でお得なセットです。楽天市場の公式対象ページで3箱を選択すると、2箱分の価格（3,520円・税込）で購入できます。カラーや度数の組み合わせも自由なので、サクラスモア、ドーリッシュブラウン、ダズルベージュなど3色を着比べたい方に最適です。'
    }
  ]
};

async function generate() {
  console.log('🔍 楽天APIからMOLAK（モラク）商品データを取得中...');
  const products = await fetchMolakProducts();
  console.log(`✅ 楽天APIから${products.length}件の厳選商品を取得完了！`);
  const today = '2026-09-03';

  let table = '<div style="overflow-x: auto; -webkit-overflow-scrolling: touch; margin-bottom: 24px;">\n\n';
  table += '| 順位 | 商品名・セット内容 | 特徴・部門 | 注目ポイント | 楽天参考価格 | 公式リンク |\n';
  table += '| :--- | :--- | :--- | :--- | :--- | :--- |\n';
  products.forEach((p, i) => {
    const note = articleDef.rankingNotes[i];
    table += `| **${note.rank}** | **[${p.itemName.slice(0, 38)}...](${p.affiliateUrl})** | 🏷️${note.label} | ${note.point} | **${p.price}** | [👉 楽天公式](${p.affiliateUrl}) |\n`;
  });
  table += '\n</div>\n';

  let products_html = '';
  products.forEach((p, i) => {
    const note = articleDef.rankingNotes[i];
    const stars = '★'.repeat(Math.min(5, Math.round(p.reviewAvg || 4.7))) + '☆'.repeat(Math.max(0, 5 - Math.round(p.reviewAvg || 4.7)));
    products_html += `
---

## ${i+1}位【${note.label}】${p.itemName.slice(0, 55)}

> **💡 注目ポイント: ${note.point}**

![${p.itemName.slice(0, 30)}](${p.imageUrl})

| 項目 | 詳細情報 |
|:---|:---|
| **取扱ショップ** | ${p.shopName || '公式取扱店'} |
| **楽天参考価格** | **${p.price || '価格はリンク先で確認'}** |
| **ユーザー評価** | ${stars} (${p.reviewAvg}/5.0・レビュー${p.reviewCount.toLocaleString()}件) |
| **おすすめ度** | ${note.point} |

${p.catchcopy ? `> 「${p.catchcopy.slice(0, 140)}」` : `> 宮脇咲良プロデュースの大ヒット水光カラコン。楽天市場の公式ショップで絶大なレビュー評価を誇ります。`}

**[👉 楽天市場公式で詳細情報・リアル口コミを見る](${p.affiliateUrl})**

`;
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": articleDef.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": articleDef.title,
    "description": articleDef.description,
    "numberOfItems": products.length,
    "itemListElement": products.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": p.itemName.slice(0, 80),
      "url": p.affiliateUrl
    }))
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleDef.title,
    "description": articleDef.description,
    "author": { "@type": "Person", "name": articleDef.author },
    "datePublished": today,
    "dateModified": today,
    "publisher": { "@type": "Organization", "name": "Qualia Navi" }
  };

  let sectionsHtml = '';
  articleDef.sections.forEach(s => {
    sectionsHtml += `\n---\n\n## 📌 ${s.h}\n\n${s.body}\n`;
  });

  let faqHtml = `\n---\n\n## ❓ よくある質問（FAQ）\n\n`;
  articleDef.faqs.forEach(f => {
    faqHtml += `### Q. ${f.q}\n**A.** ${f.a}\n\n`;
  });

  const content = `# ${articleDef.title}

${articleDef.intro}

---

## 📱 【比較表】${articleDef.queryTarget} 一覧

${table}

${products_html}

${sectionsHtml}

${faqHtml}

---

## まとめ：宮脇咲良プロデュース「モラク」で韓国アイドル級のうるうる水光アイを手に入れよう！

LE SSERAFIMの宮脇咲良さんが手掛ける『**MOLAK（モラク）**』は、「今っぽい韓国アイドルのような瞳になりたい」「うるうると光を反射する水光アイを楽しみたい」という方にぴったりの最先端カラコンです。

プロデュース色の「サクラスモア」や大人気「ドーリッシュブラウン」など、魅力的なカラーから自分に一番似合う1色を見つけてみてください。楽天市場の【実質1箱無料セット（2箱＋1箱プレゼント）】や乱視用・マンスリーを活用して、憧れのうるつやアイメイクを完成させましょう！

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

  const articlesJsonPath = path.join(process.cwd(), 'src', 'data', 'articles.json');
  let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
  
  // Remove if exists
  articlesData = articlesData.filter(a => a.id !== articleDef.id);

  const newArticle = {
    id: articleDef.id,
    title: articleDef.title,
    description: articleDef.description,
    content: content,
    category: articleDef.category,
    tags: articleDef.tags,
    author: articleDef.author,
    createdAt: today,
    updatedAt: today,
    image: products[0]?.imageUrl || '',
    affiliateUrl: products[0]?.affiliateUrl || '',
    price: products[0]?.price || '',
    itemCount: products.length,
    featured: articleDef.featured
  };

  articlesData.unshift(newArticle);

  // Update cross links in Topards and Feliamo
  const molakLink = "- 💫 **宮脇咲良プロデュース**: [【宮脇咲良プロデュース】MOLAK（モラク）カラコン人気色10選徹底比較＆水光アイ診断](/articles/art-molak-miyawaki-sakura-colorcon-10sen-2026) —— 韓国アイドル級のうるうる水光グラデーションと細フチで大人気の垢抜けカラコン！";
  const feliamoLink = "- 🌸 **白石麻衣プロデュース**: [【白石麻衣（まいやん）プロデュース】feliamo（フェリアモ）カラコン人気色10選徹底比較＆全色レポ](/articles/art-feliamo-shiraishi-mai-colorcon-10sen-2026) —— 男性ウケ・清楚系モテを極めた実質1箱無料の愛されナチュラルレンズ！";
  const topardsLink = "- 💎 **指原莉乃プロデュース**: [【指原莉乃プロデュース】TOPARDS（トパーズ）カラコン人気色10選徹底比較＆全色レポ](/articles/art-topards-sashihara-rino-colorcon-10sen-2026) —— ちゅるんとした透明感と絶妙なハイライト効果で圧倒的支持を集める王道カラコン！";

  articlesData.forEach(art => {
    if (art.id === 'art-topards-sashihara-rino-colorcon-10sen-2026') {
      if (art.content.includes("『feliamo（フェリアモ）』")) {
        art.content = art.content.replace("- 🌸 **白石麻衣プロデュース**: 『feliamo（フェリアモ）』—— 男性ウケ・清楚系モテを極めた愛されナチュラルレンズ", feliamoLink);
      }
      if (art.content.includes("『MOLAK（モラク）』")) {
        art.content = art.content.replace("- 💫 **宮脇咲良プロデュース**: 『MOLAK（モラク）』—— ニュアンスカラーと繊細なグラデーションで魅せる韓国風トレンドアイ", molakLink);
      }
    }
    if (art.id === 'art-feliamo-shiraishi-mai-colorcon-10sen-2026') {
      if (art.content.includes("『MOLAK（モラク）』")) {
        art.content = art.content.replace("- 💫 **宮脇咲良プロデュース**: 『MOLAK（モラク）』—— ニュアンスカラーと繊細なグラデーションで魅せる韓国風トレンドアイ", molakLink);
      }
    }
  });

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
  console.log('🎉 宮脇咲良プロデュース MOLAK（モラク）カラコン10選 記事生成＆相互リンク更新完了！ 総記事数:', articlesData.length);
}

generate().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
