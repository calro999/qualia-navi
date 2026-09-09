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
  s = s.replace(/選べる\d+本/g, " ");

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

async function searchRakutenDirect(keyword, usedImageUrls) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&keyword=${encodeURIComponent(keyword)}&hits=15`;
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
                itemPrice: it.itemPrice ? `約 ${it.itemPrice.toLocaleString()} 円（税込）` : "オープン価格",
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

const targetConfigs = {
  'art-silk-keratin-acid-heat-hair-oil-10sen-2026': [
    "オルナオーガニック ヘアオイル",
    "ミルボン エルジューダ エマルジョン",
    "モロッカンオイル トリートメント 100ml",
    "エイトザタラソ ヘアオイル 100ml",
    "トラックオイル No3 90ml",
    "ナプラ N. ポリッシュオイル 150ml",
    "ボタニスト ヘアオイル スムース 80ml",
    "ロレアル パリ エルセーヴ エクストラオーディナリー",
    "ラサーナ 海藻 ヘア エッセンス しっとり",
    "アンレーベル ラボ ヘアオイル 100ml"
  ],
  'art-pellicer-hydrolyzed-silk-hair-milk-10sen-2026': [
    "オルナオーガニック ヘアミルク",
    "ミルボン エルジューダ サンプロテクト エマルジョン",
    "オルビス エッセンスインヘアミルク",
    "ナプラ N. シアミルク 150g",
    "パンテーン ミラクルズ リペア ヘアミルク",
    "スティーブンノル プレミアムスリーク ヘアミルク",
    "ボタニスト ヘアミルク モイスト",
    "ジュレーム リラックス ヘアミルク",
    "ダイアン パーフェクトビューティー ヘアミルク",
    "マシェリ ヘアジュレ EX"
  ],
  'art-ultrasonic-thermal-cold-skin-scrubber-10sen-2026': [
    "ANLAN ウォーターピーリング 美顔器",
    "サロニア アクアピーリング 美顔器",
    "COSBEAUTY アクリアルピーリングプロ",
    "Kiboer ウォーターピーリング 超音波",
    "ヤーマン ミーゼ スカルプリフト",
    "Areti アレティ 毛穴吸引美顔器",
    "パナソニック イオン美顔器 イオンブースト",
    "Bellabaci フェイスカップ",
    "NIPLUX 美顔器 EMS",
    "マイトレックス プルーヴ 美顔器"
  ],
  'art-ultrasonic-water-peeling-pore-cleansing-10sen-2026': [
    "ANLAN ピーリング 美顔器 超音波",
    "サロニア ウォーターピーリング",
    "COSBEAUTY ピーリングプロEX",
    "ヤーマン スカルプリフト プラス",
    "Kiboer 毛穴吸引機 超音波",
    "Areti 美顔器 ポアスコープ",
    "パナソニック バイタリフト かっさ",
    "マイトレックス ビドー 美顔ローラー",
    "NIPLUX アイマッサージャー 目元ケア",
    "フェスティノ フェイシャル クレンジング ナノスチーマー"
  ],
  'art-solid-perfume-stick-and-sashihara-romand-guide': [
    "シロ SHIRO ホワイトリリー 練り香水",
    "ロクシタン チェリーブロッサム ソリッドパフューム",
    "ヴァシリーサ パフュームスティック ベンジャミン",
    "ディプティック ソリッドパフューム ドソン",
    "ジョーマローン ソリッド パフューム イングリッシュペアー",
    "アクアシャボン 練り香水 サボン",
    "フィアンセ パルファンドトワレ ピュアシャンプー",
    "オゥパラディ サボン ハンドクリーム",
    "ロムアンド ジューシーラスティングティント",
    "リリミュウ センシュアルフィックスティント 指原莉乃"
  ],
  'art-electric-scalp-face-ems-brush-device-10sen-2026': [
    "ヤーマン ミーゼ スカルプリフト アクティブ プラス",
    "サロニア EMS リフトブラシ",
    "マイトレックス EMS ヘッドスパ",
    "アデランス バスタイムエステ スパニスト",
    "ドクターシーラボ エステアップ4",
    "NIPLUX EMS HEAD SPA",
    "パナソニック バイタリフト ブラシ",
    "ルメント ヘッドスパ 頭皮マッサージ",
    "Festino チャージング ヘッドスパ",
    "リファ イオンケアブラシ"
  ],
  'art-nano-bubble-facial-steamer-device-10sen-2026': [
    "パナソニック スチーマー ナノケア EH-SA0B",
    "ヤーマン ブライトクリーン 美顔スチーマー",
    "サロニア ピュアブライト スチーマー フェイス",
    "ツインバード フェイススチーマー ホワイト",
    "Kiboer ハンディミスト スチーマー 充電式",
    "Areti フェイススチーマー ナノミスト 保湿",
    "Festino フェイシャル モイスト ナノスチーマー",
    "アイリスオーヤマ フェイススチーマー ナノ",
    "アグレクション ナノスチーマー ピンク",
    "テスコム フェイシャルスチーマー 保湿"
  ],
  'art-winter-cool-straight-royal-bordeaux-makeup-10sen-2026': [
    "エクセル リアルクローズシャドウ CX03",
    "ロムアンド ベターザンアイズ ドライバイオレット",
    "クリオ プロ アイ パレット 01 シンプルピンク",
    "ケイト デザイニングブラウンアイズ BR-6",
    "キャンメイク シルキースフレアイズ M06",
    "リンメル ロイヤルヴィンテージアイズ 014",
    "セザンヌ トーンアップアイシャドウ 08",
    "デイジーク シャドウパレット 04 パステルドリーム",
    "エチュード プレイカラーアイズ クールパレット",
    "ヴィセ リシェ パノラマデザイン アイパレット BR-2"
  ],
  'art-spring-warm-wave-peach-coral-makeup-10sen-2026': [
    "キャンメイク シルキースフレアイズ 07 ネクタリンオレンジ",
    "ロムアンド ベターザンアイズ ドライマンゴーチューリップ",
    "エクセル リアルクローズシャドウ CX05 フリンジハット",
    "クリオ プロ アイ パレット 02 ブラウンシュー",
    "ケイト デザイニングブラウンアイズ BR-1 ウォームブラウン",
    "デイジーク シャドウパレット 03 ヌードポーション",
    "セザンヌ トーンアップアイシャドウ 06 オレンジカシス",
    "リンメル ロイヤルヴィンテージアイズ 016 アンバーオレンジ",
    "エチュード プレイカラーアイズ ピーチファーム",
    "ヴィセ リシェ パノラマデザイン アイパレット OR-1"
  ],
  'art-electroporation-ion-facial-device-10sen-2026': [
    "ヤーマン フォトプラス シャイニー 多機能美顔器",
    "パナソニック イオン美顔器 イオンブースト マルチ",
    "サロニア RF フェイシャルリフト EMS",
    "ANLAN RF 温冷美顔器 イオン導入",
    "メディキューブ AGE-R スキンブースター プロ",
    "COSBEAUTY リフトアイロンEX",
    "マイトレックス プルーヴ トータルリフト美顔器",
    "NIPLUX ビューティーローラー EMS",
    "Areti トライエンジェル 美顔器",
    "ドクターアリーヴォ ザ ゼウス エレクトロポレーション"
  ]
};

async function executeDeepClean() {
  const articlesPath = path.resolve('src/data/articles.json');
  const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

  for (const [artId, keywords] of Object.entries(targetConfigs)) {
    const art = articles.find(a => a.id === artId);
    if (!art) continue;

    console.log(`\n==================================================`);
    console.log(`徹底再構築: ${art.id} (${art.title.slice(0, 30)}...)`);

    const usedImages = new Set();
    const resolvedItems = [];

    for (let i = 0; i < keywords.length; i++) {
      const kw = keywords[i];
      const rank = i + 1;
      const res = await searchRakutenDirect(kw, usedImages);
      if (res && res.imageUrl) {
        const cleanName = cleanProductName(res.itemName);
        const base = res.imageUrl.split("?")[0];
        usedImages.add(base);
        resolvedItems.push({
          rank,
          cleanName,
          imageUrl: res.imageUrl,
          price: res.itemPrice,
          shop: res.shopName,
          affiliateUrl: res.affiliateUrl
        });
        console.log(`  [第${rank}位] ${cleanName.slice(0, 25)} => OK`);
      } else {
        console.log(`  [第${rank}位] ${kw} => NOT FOUND`);
      }
      await new Promise(r => setTimeout(r, 600));
    }

    if (resolvedItems.length >= 8) {
      // Find where ranking starts
      const lines = art.content.split('\n');
      const prefixLines = [];
      let foundFirstRank = false;

      for (const line of lines) {
        if (/^###\s*(?:\d+\.|\d+\s+|第\d+位[：:]|【第\d+位】)/.test(line)) {
          foundFirstRank = true;
          break;
        }
        prefixLines.push(line);
      }

      let newRankingMarkdown = "\n\n";
      for (const item of resolvedItems) {
        newRankingMarkdown += `### 第${item.rank}位：${item.cleanName}\n\n`;
        newRankingMarkdown += `![${item.cleanName}](${item.imageUrl})\n\n`;
        newRankingMarkdown += `- **価格**: ${item.price}\n`;
        newRankingMarkdown += `- **取扱ショップ**: ${item.shop}\n`;
        newRankingMarkdown += `- [楽天市場で詳細・在庫・最安値をチェックする](${item.affiliateUrl})\n\n`;
        newRankingMarkdown += `#### 【専門家・愛用者目線の詳細レビュー＆おすすめポイント】\n`;
        newRankingMarkdown += `楽天市場で圧倒的な支持と口コミを集める${item.cleanName}。成分バランス・仕上がりの満足度が高く、デイリーケアで確かな手応えを実感できる厳選アイテムです。\n\n---\n\n`;
      }

      art.content = prefixLines.join('\n') + newRankingMarkdown;
      art.imageUrl = resolvedItems[0].imageUrl;
      console.log(`✅ ${art.id} のランキングセクションを完全ユニークな ${resolvedItems.length} 商品に刷新完了！`);
    }
  }

  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
  console.log('\n🎉 全対象記事の徹底クリーンアップが完了しました！');
}

executeDeepClean().catch(console.error);
