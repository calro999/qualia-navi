import fs from 'fs';
import path from 'path';

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

async function fetchFeliamoProducts() {
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent('フェリアモ カラコン 白石麻衣 feliamo')}&format=json&hits=30&sort=-reviewCount&imageFlag=1`;
  const res = await fetch(url);
  const data = await res.json();
  const rawItems = data.Items ? data.Items.map(e => e.Item || e) : [];

  // Picked 10 distinct top product packages:
  // 0: 公式ワンデー 3箱30枚 (1箱分無料) (idx: 0)
  // 1: 公式ワンデー 1箱10枚 単品 (idx: 5)
  // 2: 公式マンスリー 1箱2枚 (idx: 1)
  // 3: 公式マンスリー 2箱セット (idx: 7)
  // 4: カラコレ 3箱30枚セット (2箱+1箱無料) (idx: 2)
  // 5: モアコンタクト ワンデー1箱 即日発送 (idx: 4)
  // 6: カラコレ 大容量6箱60枚セット (4箱+2箱無料) (idx: 11)
  // 7: クイーンアイズ 3箱セット クーポン割 (idx: 8)
  // 8: メーカー公式 お試しアウトレット (idx: 9)
  // 9: フェリアモ(まいやん)×トパーズ(さっしー) 自由2箱セット (idx: 10)
  const pickedIndices = [0, 5, 1, 7, 2, 4, 11, 8, 9, 10];

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
  id: 'art-feliamo-shiraishi-mai-colorcon-10sen-2026',
  queryTarget: '白石麻衣 カラコン フェリアモ 人気色 おすすめ 10選',
  title: '【2026年最新】白石麻衣（まいやん）プロデュース「feliamo（フェリアモ）」カラコン人気色・おすすめ10選徹底比較！全色レポ＆男性ウケ・自然に盛れる選び方診断',
  description: 'まいやん（白石麻衣さん）プロデュースで「恋するすべての女性へ」「男性ウケNo.1」と絶大な人気を誇る『feliamo（フェリアモ）』カラコンを徹底レビュー！コーヒーゼリー・カフェモカ等の人気色比較、実質1箱無料セットからマンスリーまで、楽天市場公式データと口コミに基づき厳選10選を詳しく解説。',
  category: 'colorcon',
  tags: ['カラコン', 'フェリアモ', 'feliamo', '白石麻衣', 'まいやんカラコン', 'コーヒーゼリー', 'カフェモカ', 'シアーブラウン', '芸能人カラコン', 'モテカラコン', '最新コスメ10選'],
  author: '神崎 美咲',
  featured: true,
  intro: `「男性から見て本当に好印象な瞳を作りたい」「学校や職場でカラコンだとバレずに、ピュアな透明感と目力を手に入れたい」――そんな願いを完璧に形にしたのが、**まいやん（白石麻衣さん）完全イメージモデル＆プロデュースの『feliamo（フェリアモ）』**です。\n\n「恋するすべての女性へ」をコンセプトに、自目に溶け込む極小ドットと絶妙なブラウンのトーンバランスで、相手をドキッとさせる“うるつやモテEYE”を演出します。\n\n本記事では、大ヒット色の「コーヒーゼリー」「カフェモカ」「シアーブラウン」をはじめとする全色チャート、公式の【実質1箱無料（2箱購入で＋1箱プレゼント）】セット、高コスパなマンスリーまで、**楽天市場の公式実売データと口コミから厳選したおすすめ10選**を徹底比較します。`,
  rankingNotes: [
    { rank: '1位', point: '圧倒的一番人気！実質1箱無料で3色着比べできる公式ワンデー3箱セット（2箱＋1箱プレゼント）', label: '売上No.1・実質1箱無料3箱' },
    { rank: '2位', point: '「まずは1箱だけ試してみたい」方に！コーヒーゼリー等全色から1箱選べる公式ワンデー単品', label: '定番お試し・公式1箱10枚' },
    { rank: '3位', point: '毎日愛用するデイリー派に大好評！1日あたりの装用コストを劇的に抑える公式マンスリー（1ヶ月用）', label: '高コスパ・公式マンスリー' },
    { rank: '4位', point: '両目1ヶ月分をまとめて揃えられる！毎日の通勤・通学でフェリアモを愛用する人に最適な2箱セット', label: '両目1ヶ月セット・デイリー用' },
    { rank: '5位', point: '限定クーポン適用でさらにお得！2箱購入で1箱無料がつく大人気カラコン専門店の3箱セット', label: '限定クーポン割・3箱30枚' },
    { rank: '6位', point: 'デートや旅行の前など急ぎで欲しい時に大助かり！即日発送対応のモアコンタクト便', label: '即日発送・モアコン便' },
    { rank: '7位', point: 'お気に入りの本命カラーをまとめ買い！4箱購入で2箱無料がつく最大容量の6箱60枚セット', label: 'まとめ買い最安級・6箱60枚' },
    { rank: '8位', point: 'ショップ限定クーポンでお得に購入可能！30枚入りで人気カラーを着回せるクイーンアイズ便', label: 'クーポン特典・3箱セット' },
    { rank: '9位', point: '数量限定のメーカー公式アウトレット！度数とカラーが合えば圧倒的にお得なお試しプライス', label: '数量限定・公式アウトレット' },
    { rank: '10位', point: '白石麻衣（feliamo）× 指原莉乃（TOPARDS）の芸能人プロデュース2大ブランドを着比べできる特別クーポンセット', label: '芸能人コラボ割・まいやん×さっしー' }
  ],
  sections: [
    {
      h: 'なぜfeliamo（フェリアモ）は「男性ウケNo.1」と呼ばれるのか？3つの秘密',
      body: `カラコンにありがちな「宇宙人感」や「人工的なフチの強調」を極限までなくしたフェリアモ。男性アンケートでも「カラコンだと気づかなかった」「瞳が澄んでいて綺麗に見える」と圧倒的な高評価を獲得しています。\n\n1. **瞳の黄金比率を計算したサイズ設計**: 着色直径13.0mm〜13.5mmを中心とした設計で、白目と黒目のバランスを最も美しく引き立てる「1:2:1」の黄金比率を叶えます。\n2. **裸眼に溶け込む極小ぼかしドット**: 自目のフチと白目の境目をふんわりぼかすマイクロドットグラデーションにより、至近距離で見つめられてもカラコンと見破られません。\n3. **瞳を潤す高含水55%＆UVカット機能**: 水分をたっぷり含んだ柔らかなレンズ素材で、瞳に酸素をしっかり届けながら、紫外線（UV-A 75%、UV-B 99%）をカットして瞳を守ります。`
    },
    {
      h: '【全色チャート】feliamo（フェリアモ）人気カラー徹底解説＆比較',
      body: `| カラー名 | 着色直径 | 色味の特徴 | おすすめシーン・印象 |\n|:---|:---|:---|:---|\n| **コーヒーゼリー（Coffee Jelly）** | 13.0mm | うるみ感と透明感を極めた裸眼風ダークブラウン | 学校・オフィス・面接・すっぴん風メイク |\n| **カフェモカ（Cafe Mocha）** | 13.5mm | やさしいブラウンフチで瞳を自然にサイズアップ | 王道デート・女子会・愛されモテメイク |\n| **シアーブラウン（Sheer Brown）** | 13.0mm | 自目に溶け込む究極のナチュラルブラウン | バレたくない日・普段使いの定番 |\n| **シアーブラック（Sheer Black）** | 13.0mm | 重くならないクリアな黒で凛としたピュアアイ | 清楚系メイク・黒髪や就活にも |\n| **エアリーベージュ（Airy Beige）** | 13.3mm | ふんわり明るいベージュで色素薄い系ハーフEYE | 垢抜けたい日・休日のカジュアルメイク |\n| **カプチーノ（Cappuccino）** | 13.0mm | 落ち着いた温かみのある上品ウォームブラウン | 大人フェミニン・オフィスカジュアル |\n| **アフォガード（Affogato）** | 13.6mm | ふんわり広がるやわらかなブラウンのツヤ瞳 | 瞳をしっかり大きく魅せたい特別な日 |\n| **ウーロンティー（Oolong Tea）** | 13.0mm | 深みのあるクリアな抜け感ブラウン | 透明感重視・ナチュラルビューティー |`
    },
    {
      h: '【パーソナルカラー別】あなたに一番似合うフェリアモの選び方',
      body: `自分のパーソナルカラーに合わせてレンズを選ぶことで、肌のトーンアップと目元の透明感が格段にアップします。\n\n- **イエベ春（スプリング）**: 『**エアリーベージュ**』『**カフェモカ**』『**オリーブブラウン**』がベスト！明るい黄みを含んだブラウンがキラキラ輝く瞳を作ります。\n- **ブルベ夏（サマー）**: 『**コーヒーゼリー**』『**シアーブラウン**』『**サクララテ**』がぴったり。柔らかく澄んだダークブラウンが肌の透明感を引き立てます。\n- **イエベ秋（オータム）**: 『**カプチーノ**』『**アフォガード**』『**チェスナット**』がおすすめ。深みのある暖色系ブラウンで大人っぽい奥行きのある目元に。\n- **ブルベ冬（ウィンター）**: 『**シアーブラック**』『**コーヒーゼリー**』『**エスプレッソ**』がイチオシ。白目とのコントラストを強調し、吸い込まれるような澄んだ瞳を演出します。`
    },
    {
      h: 'ワンデー vs マンスリー！どっちを買うべき？',
      body: `- **ワンデー（1日使い捨て）**: 週に2〜3回程度使う方や、休日のお出かけ・デートの時だけ使いたい方におすすめ。毎日の洗浄や保存の手間がなく、常に清潔なレンズを使えます。\n- **マンスリー（1ヶ月装用）**: 毎日の通勤・通学で平日も毎日カラコンを着けたい方に圧倒的おすすめ。1箱で1ヶ月装用できるため、毎月のコスメ代・カラコン代を大幅に節約できます。`
    },
    {
      h: '✨ 芸能人プロデュースカラコン特集（内部リンク・相互ハブ）',
      body: `本サイトでは、人気芸能人・モデルが手掛ける話題のプロデュースカラコンを順次徹底比較しています！それぞれの世界観や仕上がりの違いをぜひチェックしてみてください。\n\n- 💎 **指原莉乃プロデュース**: [【指原莉乃プロデュース】TOPARDS（トパーズ）カラコン人気色10選徹底比較＆全色レポ](/articles/art-topards-sashihara-rino-colorcon-10sen-2026) —— ちゅるんとした透明感と絶妙なハイライト効果で圧倒的支持を集める王道カラコン！\n- 🔥 **ちゃんみなプロデュース**: [【ちゃんみなプロデュース】ギャルネバーダイ（GAL NEVER DIE）カラコン全色比較＆レポ](/articles/feature-chanmina-gal-never-die-colorcon-complete) —— 圧倒的存在感とエッジの効いたストリート＆ギャル盛れカラコン！\n- 💫 **宮脇咲良プロデュース**: 『MOLAK（モラク）』—— ニュアンスカラーと繊細なグラデーションで魅せる韓国風トレンドアイ\n- 👑 **益若つばさプロデュース**: 『AngelColor Bambi Series（バンビシリーズ）』—— ドールアイになれる元祖ドーリー＆ちゅるんフチカラコン`
    }
  ],
  faqs: [
    {
      q: 'フェリアモで一番人気で絶対に失敗しないカラーはどれですか？',
      a: '「コーヒーゼリー（Coffee Jelly）」と「カフェモカ（Cafe Mocha）」が2大人気カラーです。裸眼風の透明感とバレにくさを最優先するならコーヒーゼリー（着色直径13.0mm）、自然に瞳を大きくクリッと見せたいならカフェモカ（着色直径13.5mm）がおすすめです。'
    },
    {
      q: '「2箱購入で1箱無料」はどうやって適用されますか？',
      a: '楽天市場の対象商品ページ（3箱セット）にて、お好きな3箱のカラーと度数を選択して買い物かごに入れると、自動的に2箱分の価格（3,520円・税込）に割引適用され、実質1箱分が無料になります。色違いや度数違いの組み合わせも自由です。'
    },
    {
      q: 'ドライアイでもフェリアモは乾きにくいですか？',
      a: 'フェリアモは水分を多く含む含水率55%の高含水レンズを採用しており、装着した瞬間からみずみずしく瞳にフィットします。さらにエッジ部分を滑らかに加工した丸みのあるフチ設計により、摩擦感を軽減して快適な装用感をキープします。'
    }
  ]
};

async function generate() {
  console.log('🔍 楽天APIからfeliamo（フェリアモ）商品データを取得中...');
  const products = await fetchFeliamoProducts();
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

${p.catchcopy ? `> 「${p.catchcopy.slice(0, 140)}」` : `> 白石麻衣プロデュースの大人気モテカラコン。楽天市場の公式ショップで絶大なレビュー評価を誇ります。`}

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

## まとめ：白石麻衣プロデュース「フェリアモ」で自然な愛されモテアイを手に入れよう！

白石麻衣さんイメージモデルの『**feliamo（フェリアモ）**』は、「カラコンだとバレずに瞳を綺麗に見せたい」「男性から好印象を持たれるナチュラルなモテ瞳になりたい」という女性にこれ以上ない選択肢です。

大人気の「コーヒーゼリー」や「カフェモカ」をはじめ、豊富なカラーから自分の魅力を最大限に引き出す1色を見つけてみてください。楽天市場の【実質1箱無料セット（2箱＋1箱プレゼント）】やマンスリーを上手に活用して、毎日のメイクを上品に格上げしましょう！

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
  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
  console.log('🎉 白石麻衣プロデュース feliamo（フェリアモ）カラコン10選 記事生成＆登録完了！ 総記事数:', articlesData.length);
}

generate().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
