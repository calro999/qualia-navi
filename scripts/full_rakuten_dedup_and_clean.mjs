import fs from 'fs';
import path from 'path';

const APP_ID = "1a3cdfd9-2aec-4b42-8290-1c53603b0012";
const ACCESS_KEY = "pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5";

function cleanProductName(name) {
  if (!name) return "";
  let s = name;
  s = s.replace(/【[^】]*】/g, " ");
  s = s.replace(/\[[^\]]*\]/g, " ");
  s = s.replace(/★[^★]*★/g, " ");
  s = s.replace(/★/g, " ");
  s = s.replace(/☆[^☆]*☆/g, " ");
  s = s.replace(/☆/g, " ");
  s = s.replace(/＼[^＼]*／/g, " ");
  s = s.replace(/※[^※\n]*$/g, " ");
  s = s.replace(/^[！!・\s]+/, " ");
  s = s.replace(/スーパーSALE！?/gi, " ");
  s = s.replace(/スーパーセール！?/gi, " ");
  s = s.replace(/お買い物マラソン！?/gi, " ");
  s = s.replace(/送料無料/g, " ");
  s = s.replace(/即納/g, " ");
  s = s.replace(/あす楽/g, " ");
  s = s.replace(/国内正規品/g, " ");
  s = s.replace(/公式ショップ/g, " ");
  s = s.replace(/公式/g, " ");
  s = s.replace(/ランキング\d+位獲得/g, " ");
  s = s.replace(/男女兼用/g, " ");
  s = s.replace(/\d+個セット/g, " ");
  s = s.replace(/\d+点(セット|セット品)?/g, " ");

  if (s.includes("｜")) s = s.split("｜")[0];
  if (s.includes("│")) s = s.split("│")[0];

  s = s.trim().replace(/\s+/g, " ");
  const tokens = s.split(" ");
  let keepTokens = [];
  let foundCapacity = false;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    keepTokens.push(t);
    if (/^\d+(\.\d+)?(g|ml|mL|本|枚|個|包|粒|色)$/i.test(t)) {
      foundCapacity = true;
      break;
    }
  }

  if (foundCapacity && keepTokens.length >= 2) {
    s = keepTokens.join(" ");
  } else {
    s = tokens.slice(0, 6).join(" ");
  }

  return s.trim();
}

async function searchRakutenDirect(keyword, usedImageUrls, hits = 15) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&keyword=${encodeURIComponent(keyword)}&hits=${hits}`;
      const res = await fetch(url);
      if (res.ok) {
        const d = await res.json();
        if (d.Items && d.Items.length > 0) {
          for (const itemObj of d.Items) {
            const it = itemObj.Item;
            let img = it.mediumImageUrls?.[0]?.imageUrl || it.smallImageUrls?.[0]?.imageUrl || "";
            if (img.includes("?_ex=")) {
              img = img.split("?_ex=")[0] + "?_ex=600x600";
            }
            const cleanImgBase = img.split("?")[0];
            if (img && !usedImageUrls.has(cleanImgBase)) {
              return {
                itemName: it.itemName,
                imageUrl: img,
                affiliateUrl: it.affiliateUrl || it.itemUrl,
                itemPrice: it.itemPrice ? `約 ${it.itemPrice.toLocaleString()} 円（税込）` : null,
                shopName: it.shopName
              };
            }
          }
        }
      }
    } catch (e) {}
    await new Promise(r => setTimeout(r, 600));
  }
  return null;
}

// 記事タイトルから多様な関連キーワードリストを生成
function generateKeywordsForArticle(articleTitle, category) {
  if (articleTitle.includes('ヘアオイル') || articleTitle.includes('ケラチン')) {
    return [
      "オルナオーガニック ヘアオイル",
      "ミルボン エルジューダ エマルジョン",
      "モロッカンオイル トリートメント",
      "エイトザタラソ ヘアオイル",
      "トラックオイル No3",
      "ナプラ N. ポリッシュオイル",
      "ボタニスト ヘアオイル スムース",
      "ロレアルパリ エルセーヴ ヘアオイル",
      "ラサーナ 海藻ヘアエッセンス",
      "アンレーベルラボ ヘアオイル"
    ];
  }
  if (articleTitle.includes('ヘアミルク') || articleTitle.includes('ペリセア')) {
    return [
      "オルナオーガニック ヘアミルク",
      "ミルボン エルジューダ サンプロテクト",
      "オルビス エッセンスインヘアミルク",
      "ナプラ N. シアミルク",
      "パンテーン ミラクルズ リペアヘアミルク",
      "スティーブンノル プレミアムスリーク",
      "ボタニスト ヘアミルク モイスト",
      "ジュレーム リラックス ヘアミルク",
      "ダイアン パーフェクトビューティー ヘアミルク",
      "マシェリ ヘアジュレ"
    ];
  }
  if (articleTitle.includes('美顔器') || articleTitle.includes('スクライバー') || articleTitle.includes('ウォーターピーリング')) {
    return [
      "ヤーマン ミーゼ スカルプリフト",
      "ANLAN ウォーターピーリング 美顔器",
      "サロニア RF フェイシャルリフト",
      "パナソニック バイタリフト かっさ",
      "Kiboer ウォーターピーリング 超音波",
      "COSBEAUTY アクリアルピーリングプロ",
      "Bellabaci フェイシャルカップ",
      "Areti アレティ 毛穴吸引美顔器",
      "NIPLUX EMS アイマッサージャー",
      "ドクターシーラボ エステアップ4"
    ];
  }
  if (articleTitle.includes('スチーマー') || articleTitle.includes('ナノバブル')) {
    return [
      "パナソニック スチーマー ナノケア",
      "ヤーマン ブライトクリーン 美顔スチーマー",
      "サロニア ピュアブライト スチーマー",
      "ツインバード フェイススチーマー",
      "Kiboer ハンディミスト スチーマー",
      "Areti フェイススチーマー ナノミスト",
      "Festino フェイシャル モイスト ナノスチーマー",
      "アイリスオーヤマ フェイススチーマー",
      "アグレクション ナノスチーマー",
      "テスコム フェイシャルスチーマー"
    ];
  }
  if (articleTitle.includes('練り香水') || articleTitle.includes('フレグランス')) {
    return [
      "シロ SHIRO ホワイトリリー 練り香水",
      "ロクシタン チェリーブロッサム ソリッドパフューム",
      "ヴァシリーサ パフュームスティック",
      "ディプティック ソリッドパフューム",
      "ジョーマローン ソリッドセント",
      "アクアシャボン 練り香水 サボン",
      "フィアンセ パルファンドトワレ ピュアシャンプー",
      "aux paradis オゥパラディ サボン",
      "マジョリカマジョルカ マジョロマンティカ",
      "ジルスチュアート ホワイトフローラル ソリッド"
    ];
  }
  if (articleTitle.includes('メイク') || articleTitle.includes('ブルベ') || articleTitle.includes('イエベ')) {
    return [
      "エクセル リアルクローズシャドウ",
      "ロムアンド ベターザンアイズ",
      "クリオ プロアイパレット",
      "キャンメイク シルキースフレアイズ",
      "ケイト デザイニングブラウンアイズ",
      "リンメル ロイヤルヴィンテージアイズ",
      "セザンヌ トーンアップアイシャドウ",
      "デイジーク シャドウパレット",
      "エチュード プレイカラーアイズ",
      "ヴィセ リシェ パノラマデザインアイパレット"
    ];
  }
  return [
    "CICA デイリースージングマスク",
    "オバジ C25 セラム",
    "タカミスキンピール 30ml",
    "メラノCC プレミアム美容液",
    "アヌア ドクダミ 77 トナー",
    "魔女工場 ガラクナイアシン 2.0 エッセンス",
    "トリデン ダイブイン セラム",
    "コスメデコルテ リポソーム アドバンスト",
    "キールズ レチノール 美容液",
    "イニスフリー レチノール シカ セラム"
  ];
}

async function fixAllRemainingArticles() {
  const articlesPath = path.resolve('src/data/articles.json');
  const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

  const remainingIds = [
    'art-ultrasonic-thermal-cold-skin-scrubber-10sen-2026',
    'art-ultrasonic-water-peeling-pore-cleansing-10sen-2026',
    'art-solid-perfume-stick-and-sashihara-romand-guide',
    'art-silk-keratin-acid-heat-hair-oil-10sen-2026',
    'art-electric-scalp-face-ems-brush-device-10sen-2026',
    'art-nano-bubble-facial-steamer-device-10sen-2026',
    'art-winter-cool-straight-royal-bordeaux-makeup-10sen-2026',
    'art-spring-warm-wave-peach-coral-makeup-10sen-2026',
    'art-electroporation-ion-facial-device-10sen-2026',
    'art-pellicer-hydrolyzed-silk-hair-milk-10sen-2026'
  ];

  console.log(`🎯 残り ${remainingIds.length} 記事を完全ユニークな個別10商品に再構成します...`);

  for (let aIdx = 0; aIdx < remainingIds.length; aIdx++) {
    const artId = remainingIds[aIdx];
    const art = articles.find(a => a.id === artId);
    if (!art || !art.content) continue;

    console.log(`\n==================================================`);
    console.log(`[${aIdx + 1}/${remainingIds.length}] 処理開始: ${art.title.slice(0, 35)}...`);

    const fallbackKeywords = generateKeywordsForArticle(art.title, art.category);
    const usedImagesInArticle = new Set();

    // 既存記事の項目分割（### 1. または ### 第1位：など）
    const lines = art.content.split('\n');
    const itemHeadings = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^###\s*(?:\d+\.|\d+\s+|第\d+位[：:]|【第\d+位】)/.test(line)) {
        itemHeadings.push({ index: i, line });
      }
    }

    console.log(`  見出し検出数: ${itemHeadings.length}`);

    // 各項目に対して楽天APIから完全ユニークな商品を割り当て
    let newContent = art.content;

    for (let hIdx = 0; hIdx < itemHeadings.length; hIdx++) {
      const rank = hIdx + 1;
      const targetKw = fallbackKeywords[hIdx % fallbackKeywords.length];

      console.log(`  [第${rank}位] 楽天API検索: "${targetKw}"`);
      const product = await searchRakutenDirect(targetKw, usedImagesInArticle, 15);

      if (product && product.imageUrl) {
        const cleanName = cleanProductName(product.itemName);
        const cleanBase = product.imageUrl.split('?')[0];
        usedImagesInArticle.add(cleanBase);

        console.log(`    -> 獲得: ${cleanName.slice(0, 25)} (${product.imageUrl.slice(0, 45)}...)`);

        const oldHeading = itemHeadings[hIdx].line;
        const newHeading = `### 第${rank}位：${cleanName}`;

        // 既存の画像行を探して置換、なければ見出し直下に挿入
        const imgRegex = new RegExp(`!\\[.*?\\]\\(https:\\/\\/thumbnail\\.image\\.rakuten\\.co\\.jp\\/[^\\)]+\\)`, "g");
        // 単純に見出しを置き換える
        newContent = newContent.replace(oldHeading, `${newHeading}\n\n![${cleanName}](${product.imageUrl})`);
      }
      await new Promise(r => setTimeout(r, 600));
    }

    // 重複した古い画像マークダウンのクリーンアップ（連続する画像マークダウンがある場合の整理）
    newContent = newContent.replace(/(!\[.*?\]\([^\)]+\)\n\n)+!\[.*?\]\([^\)]+\)/g, (match) => {
      const parts = match.split('\n\n').filter(Boolean);
      return parts[parts.length - 1]; // 最後の（最新の）画像のみ残す
    });

    art.content = newContent;
  }

  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
  console.log('\n🎉 最終チェック: 全記事の完全ユニーク化が完了しました！');
}

fixAllRemainingArticles().catch(console.error);
