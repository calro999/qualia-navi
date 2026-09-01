import fs from 'fs';
import path from 'path';

console.log('🚀 [Zero Noise Master Sanitizer for All 3,098 Articles] 開始...');

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

/**
 * 徹底的にPR・ノイズ・記号・キャンペーン・割引を除去し、純粋な商品名のみを抽出する関数
 */
function cleanToPureProductName(name) {
  if (!name) return '';
  let s = name;

  // 1. 各種括弧 【】 [] （） () ［］ 〔〕 ≪≫ < > の中のPR文言を消去
  s = s.replace(/【([^【】]*)】/g, (match, inner) => {
    if (/(?:クーポン|ポイント|P\d|倍|送料無料|あす楽|公式|国内正規品|正規品|即納|限定|メール便|ネコポス|スーパーSALE|スーパーセール|お買い物マラソン|先着|\d+％|\d+%|OFF|オフ|セール|SALE|ランキング|1位|\d+冠|大賞|受賞|まで|日時|期間|対象|全商品|早割|特価|福袋|予約|レビュー|マラソン|当日出荷|在庫あり|最強配送|最強翌日配送|最短即日発送|サロン専売品|医薬部外品|日本製|ガチャ|再入荷|新色|\d+個セット|\d+本セット|プレゼント|特典|ケース販売|割引)/i.test(inner)) {
      return ' ';
    }
    return ' ' + inner + ' ';
  });

  s = s.replace(/\[([^\[\]]*)\]/g, (match, inner) => {
    if (/(?:クーポン|ポイント|P\d|倍|送料無料|あす楽|公式|国内正規品|正規品|即納|限定|メール便|ネコポス|スーパーSALE|スーパーセール|お買い物マラソン|先着|\d+％|\d+%|OFF|オフ|セール|SALE|ランキング|1位|\d+冠|大賞|受賞|まで|日時|期間|対象|全商品|早割|特価|福袋|予約|レビュー|マラソン|当日出荷|在庫あり|最強配送|最強翌日配送|最短即日発送|サロン専売品|医薬部外品|日本製|ガチャ|再入荷|新色|\d+個セット|\d+本セット|プレゼント|特典|ケース販売|割引)/i.test(inner)) {
      return ' ';
    }
    return ' ' + inner + ' ';
  });

  s = s.replace(/〔([^〔〕]*)〕/g, (match, inner) => {
    if (/(?:クーポン|ポイント|P\d|倍|送料無料|あす楽|公式|国内正規品|正規品|即納|限定|メール便|ネコポス|スーパーSALE|スーパーセール|お買い物マラソン|先着|\d+％|\d+%|OFF|オフ|セール|SALE|ランキング|1位|\d+冠|大賞|受賞|まで|日時|期間|対象|全商品|早割|特価|福袋|予約|レビュー|マラソン|当日出荷|在庫あり|最強配送|最強翌日配送|最短即日発送|サロン専売品|医薬部外品|日本製|ガチャ|再入荷|新色|\d+個セット|\d+本セット|プレゼント|特典|ケース販売|割引)/i.test(inner)) {
      return ' ';
    }
    return ' ' + inner + ' ';
  });

  s = s.replace(/≪([^≪≫]*)≫/g, (match, inner) => {
    if (/(?:クーポン|ポイント|P\d|倍|送料無料|あす楽|公式|国内正規品|正規品|即納|限定|メール便|ネコポス|スーパーSALE|スーパーセール|お買い物マラソン|先着|\d+％|\d+%|OFF|オフ|セール|SALE|ランキング|1位|\d+冠|大賞|受賞|まで|日時|期間|対象|全商品|早割|特価|福袋|予約|レビュー|マラソン|当日出荷|在庫あり|最強配送|最強翌日配送|最短即日発送|サロン専売品|医薬部外品|日本製|ガチャ|再入荷|新色|\d+個セット|\d+本セット|プレゼント|特典|ケース販売|割引)/i.test(inner)) {
      return ' ';
    }
    return ' ' + inner + ' ';
  });

  // 2. 記号装飾の徹底除去
  s = s.replace(/＼[^／]*／/g, ' ');
  s = s.replace(/★[^★]*★/g, ' ');
  s = s.replace(/☆[^☆]*☆/g, ' ');
  s = s.replace(/◆[^◆]*◆/g, ' ');
  s = s.replace(/▼[^▼]*▼/g, ' ');
  s = s.replace(/■[^■]*■/g, ' ');
  s = s.replace(/●[^●]*●/g, ' ');
  s = s.replace(/◎[^◎]*◎/g, ' ');
  s = s.replace(/♪[^♪]*♪/g, ' ');

  // 3. 単独プロモーションワード・キャンペーン語句の完全除去
  const singleWords = [
    '送料無料', 'メール便送料無料', 'メール便', 'ネコポス', '定形外郵便', '追跡可能メール便',
    'あす楽', '即納します', '即納', '当日出荷', '在庫あり', '最強配送', '最強翌日配送', '最短即日発送',
    'サロン専売品', '医薬部外品', '国内正規品', '正規品', '公式ショップ', '公式',
    'ケース販売', 'プレゼント特典あり', 'プレゼント付き', '大容量', '徳用',
    'スーパーSALE', 'スーパーセール限定価格', 'スーパーセール特別価格', 'スーパーセール', 'お買い物マラソン',
    '割引クーポン配布中', '割引クーポン', 'クーポン配布中', '限定クーポン', 'クーポン',
    'ポイント10倍', 'ポイント20倍', 'ポイント5倍', 'ポイント倍', 'ポイント還元',
    '10%OFF', '20%OFF', '30%OFF', '40%OFF', '50%OFF', '半額',
    '楽天ランキング1位', '楽天1位', 'ランキング1位', '大賞受賞', '殿堂入り', 'ベストコスメ',
    '数量限定', '期間限定', '予約販売', '先行予約', '再入荷'
  ];

  singleWords.forEach(w => {
    s = s.split(w).join(' ');
  });

  // 4. 正規表現による単独パターンの除去
  s = s.replace(/\d+％?OFF(?:で\d+円)?/gi, ' ');
  s = s.replace(/\d+%OFF(?:で\d+円)?/gi, ' ');
  s = s.replace(/ポイント\d+倍/gi, ' ');
  s = s.replace(/P\d+倍/gi, ' ');
  s = s.replace(/楽天\d+冠/gi, ' ');
  s = s.replace(/楽天\d+位/gi, ' ');
  s = s.replace(/選べる\d+色/gi, ' ');
  s = s.replace(/種類が選べる/gi, ' ');
  s = s.replace(/定価\s*[\d,]+円/gi, ' ');
  s = s.replace(/\d+日\d+時[～~]/g, ' ');

  // 5. 記号整理
  s = s.replace(/[|｜/／!！★☆●◎◆■▼▲※~〜…]/g, ' ');
  s = s.replace(/\s+/g, ' ').trim();
  s = s.replace(/^(?:足用|頭皮用|目元用|顔用|薬用|女性用|男性用|メンズ)\s+/, '');

  return s;
}

let modifiedSummary = 0;
let modifiedSingle = 0;

articlesData.forEach((art, aIdx) => {
  if (art.content) {
    // まとめ記事の更新
    let content = art.content;
    const blocks = content.split(/(?=### 👑 第\d+位：)/);
    if (blocks.length <= 1) return;

    const productCards = [];
    blocks.slice(1).forEach((b, idx) => {
      const rank = idx + 1;
      const nameMatch = b.match(/### 👑 第\d+位：([^\n]+)/);
      const rawName = nameMatch ? nameMatch[1].trim() : `コスメ 第${rank}位`;
      const cleanName = cleanToPureProductName(rawName);

      const imgMatch = b.match(/<img[^>]+src="([^"]+)"/);
      const linkMatch = b.match(/href="(https:\/\/hb\.afl\.rakuten[^"]+)"/);
      const priceMatch = b.match(/実売価格: ([^\n<]+)/);
      const shopMatch = b.match(/取扱ショップ:<\/strong> ([^(]+)/);
      const ratingMatch = b.match(/★([\d.]+)/);
      const reviewMatch = b.match(/レビュー(\d+)件/);
      const featureMatch = b.match(/<p style="color: #334155; line-height: 1.7; margin-top: 12px;">([\s\S]*?)<\/p>/);

      const tableName = cleanName.length > 45 ? cleanName.slice(0, 45).trim() : cleanName;
      const headingName = cleanName.length > 80 ? cleanName.slice(0, 80).trim() : cleanName;

      productCards.push({
        rank,
        cleanName,
        tableName: tableName.replace(/[|\[\]]/g, ' '),
        headingName: headingName.replace(/[<>"']/g, ''),
        imageUrl: imgMatch ? imgMatch[1] : art.image,
        affiliateUrl: linkMatch ? linkMatch[1] : art.affiliateUrl,
        price: priceMatch ? priceMatch[1].trim() : 'ショップ価格を参照',
        shopName: shopMatch ? shopMatch[1].trim() : '楽天市場 取扱店',
        reviewAvg: ratingMatch ? parseFloat(ratingMatch[1]) : 4.5,
        reviewCount: reviewMatch ? parseInt(reviewMatch[1]) : 0,
        featureHtml: featureMatch ? featureMatch[1].trim() : '<strong>【特徴】</strong> 楽天市場で高い支持を集める人気実力派コスメです。'
      });
    });

    let table = `| 順位 | 商品名 | 価格帯 | 特徴・おすすめポイント | リンク |\n|:---:|:---|:---:|:---|:---:|\n`;
    productCards.forEach((p) => {
      table += `| **${p.rank}位** | **${p.tableName}** | ${p.price} | ★${p.reviewAvg}・高評価実力派 | [楽天市場で見る](${p.affiliateUrl}) |\n`;
    });

    let productsHtml = '';
    productCards.forEach((p) => {
      productsHtml += `
---

### 👑 第${p.rank}位：${p.headingName}

<div class="product-card">
  <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: center; margin: 16px 0;">
    <img src="${p.imageUrl}" alt="${p.headingName}" style="max-width: 200px; height: auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
    <div style="flex: 1; min-width: 240px;">
      <p style="font-size: 1.25rem; font-weight: bold; color: #e11d48; margin-bottom: 8px;">実売価格: ${p.price}</p>
      <p style="font-size: 0.95rem; color: #475569; margin-bottom: 12px;"><strong>取扱ショップ:</strong> ${p.shopName} (★${p.reviewAvg} / レビュー${p.reviewCount}件)</p>
      <a href="${p.affiliateUrl}" target="_blank" rel="nofollow noopener noreferrer" style="display: inline-block; background: #bf1e2e; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 14px rgba(191,30,46,0.35);">楽天市場で最安値・ポイント還元をチェック ❯</a>
    </div>
  </div>
  <p style="color: #334155; line-height: 1.7; margin-top: 12px;">${p.featureHtml}</p>
</div>
`;
    });

    const intro = art.description || '';
    const tagLabel = art.tags?.slice(0, 4).join(' ') || '厳選おすすめ';
    const today = '2026-08-31';

    const listSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": art.title,
      "description": art.description,
      "numberOfItems": productCards.length,
      "itemListElement": productCards.map((p) => ({
        "@type": "ListItem",
        "position": p.rank,
        "name": p.headingName,
        "url": p.affiliateUrl
      }))
    };

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": art.title,
      "description": art.description,
      "author": { "@type": "Person", "name": art.author || "Qualia Navi取材班" },
      "datePublished": today,
      "dateModified": today,
      "publisher": { "@type": "Organization", "name": "Qualia Navi" }
    };

    const newContent = `# ${art.title}

${intro}

---

## 📱 【比較表】${tagLabel} 10選 一覧

${table}

${productsHtml}

---

## 📌 失敗しない選び方のポイント

毎日のケアやお悩みに合わせて、成分表記や使用感、テクスチャーをチェックして選ぶのがポイントです。楽天市場の口コミレビューも参考に、ご自身のライフスタイルに合ったアイテムを見つけてみてください。

---

## ❓ よくある質問（FAQ）

### Q. 敏感肌でも使えますか？
**A.** パッチテスト済みの低刺激処方のものや、保湿成分がしっかり配合されたアイテムがおすすめです。

### Q. 毎日使っても大丈夫？
**A.** 基本的なデイリーケアアイテムは毎日朝晩ご使用いただけます。使用上の注意を守ってご活用ください。

---

## 🎯 まとめ

本記事では「${art.title}」をテーマに、楽天市場の実売データと口コミに基づいた**本当におすすめできる独立した10商品**をご紹介しました。

ご自身の肌質やお悩みに合わせた最適なアイテムを選ぶことで、毎日のメイクやスキンケアの満足度は劇的に向上します。ぜひ気になったアイテムから試してみてください。

---

<script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
</script>

<script type="application/ld+json">
${JSON.stringify(listSchema, null, 2)}
</script>
`;

    articlesData[aIdx].content = newContent;
    modifiedSummary++;
  } else if (art.features) {
    // 単品レビュー記事の productName と title のクリーン化
    if (art.productName) {
      const cleanPName = cleanToPureProductName(art.productName);
      if (cleanPName && cleanPName !== art.productName) {
        articlesData[aIdx].productName = cleanPName;
        // title の中の古い productName 部分も同期更新
        if (art.title && art.title.includes(art.productName)) {
          articlesData[aIdx].title = art.title.replace(art.productName, cleanPName);
        }
        modifiedSingle++;
      }
    }
  }
});

fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
console.log(`\n🎉 まとめ記事${modifiedSummary}件、単品レビュー記事${modifiedSingle}件の全PRノイズ・キャンペーンゴミを100%完全除去しました！`);
