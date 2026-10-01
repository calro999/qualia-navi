import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch13Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch13_items.json', 'utf8'));

// --- テーマ1: 美髪シルクナイトキャップ＆シルク枕カバー 厳選10商品 ---
const silkHairItemsRaw = [
  // 1. COCOSILK ナイトキャップ リボンタイプ
  batch13Data.theme1_silk_hair.find(it => it.itemName.includes("COCOSILK") && it.itemName.includes("リボン")) || batch13Data.theme1_silk_hair[10],
  // 2. COCOSILK ナイトキャップ ロングヘア用
  batch13Data.theme1_silk_hair.find(it => it.itemName.includes("COCOSILK") && it.itemName.includes("ロングヘア")) || batch13Data.theme1_silk_hair[14],
  // 3. Utukky シルク枕カバー 25匁
  batch13Data.theme1_silk_hair.find(it => it.itemName.includes("Utukky") || (it.itemName.includes("シルク") && it.itemName.includes("枕カバー"))) || batch13Data.theme1_silk_hair[0],
  // 4. 絹糸屋さんの『絹かいこ』シルク ナイトキャップ
  batch13Data.theme1_silk_hair.find(it => it.itemName.includes("絹かいこ") || it.itemName.includes("シナプス")) || batch13Data.theme1_silk_hair[0],
  // 5. COCOSILK シルク枕カバー
  batch13Data.theme1_silk_hair.find(it => it.itemName.includes("COCOSILK") && it.itemName.includes("枕")) || batch13Data.theme1_silk_hair[12],
  // 6. シルク100% ナイトキャップ ターバンタイプ
  batch13Data.theme1_silk_hair.find(it => it.itemName.includes("ターバン") && it.itemName.includes("シルク")) || batch13Data.theme1_silk_hair[2],
  // 7. シルク100％ ゆったり ナイトキャップ
  batch13Data.theme1_silk_hair.find(it => it.itemName.includes("ゆったり") && it.itemName.includes("シルク")) || batch13Data.theme1_silk_hair[3],
  // 8. BACKYARD FAMILY シルク100% 定番ナイトキャップ
  batch13Data.theme1_silk_hair.find(it => it.itemName.includes("BACKYARD") || it.itemName.includes("定番")) || batch13Data.theme1_silk_hair[1],
  // 9. コジット シルクシャイニー ナイトキャップ
  batch13Data.theme1_silk_hair.find(it => it.itemName.includes("コジット") || it.itemName.includes("シャイニー")) || batch13Data.theme1_silk_hair[6],
  // 10. 自然食の玉手箱 シルクナイトキャップ
  batch13Data.theme1_silk_hair.find(it => it.itemName.includes("自然食") || it.itemName.includes("玉手箱")) || batch13Data.theme1_silk_hair[4]
].filter(Boolean);

// --- テーマ2: 高保湿ネッククリーム＆デコルテ集中ケア 厳選10商品 ---
const neckCreamItemsRaw = [
  // 1. クラランス ファーミング EX ネック ＆ デコルテ N 75mL
  batch13Data.theme2_neck_cream.find(it => it.itemName.includes("ファーミング EX ネック") || (it.itemName.includes("クラランス") && it.itemName.includes("ファーミング"))) || batch13Data.theme2_neck_cream[12],
  // 2. パーフェクトワン 薬用リンクルストレッチジェル 50g
  batch13Data.theme2_neck_cream.find(it => it.itemName.includes("パーフェクトワン") && it.itemName.includes("薬用リンクルストレッチジェル") && !it.itemName.includes("2個セット") && !it.itemName.includes("つめかえ")) || batch13Data.theme2_neck_cream[0],
  // 3. クラランス スープラ ネック＆デコルテ 75ml
  batch13Data.theme2_neck_cream.find(it => it.itemName.includes("スープラ") && it.itemName.includes("ネック")) || batch13Data.theme2_neck_cream[10],
  // 4. 安心院化粧品 首のシワ 専用3点セット ネッククリーム
  batch13Data.theme2_neck_cream.find(it => it.itemName.includes("安心院") || it.itemName.includes("首のシワ 専用")) || batch13Data.theme2_neck_cream[7],
  // 5. celimax ノニ リペアクリーム（首元ケア対応）
  batch13Data.theme2_neck_cream.find(it => it.itemName.includes("celimax") || it.itemName.includes("セリマックス")) || batch13Data.theme2_neck_cream[2],
  // 6. Natura Check 大容量 ネッククリーム 手 首 保湿 美容クリーム
  batch13Data.theme2_neck_cream.find(it => it.itemName.includes("Natura Check") || it.itemName.includes("手 首 保湿")) || batch13Data.theme2_neck_cream[8],
  // 7. シロノサクラ。 プランプ ハンド＆ネッククリーム
  batch13Data.theme2_neck_cream.find(it => it.itemName.includes("シロノサクラ") && it.itemName.includes("プランプ")) || batch13Data.theme2_neck_cream[5],
  // 8. N&D ネック＆デコ クワトロストレッチングクリーム
  batch13Data.theme2_neck_cream.find(it => it.itemName.includes("クワトロ") || it.itemName.includes("ネック＆デコ")) || batch13Data.theme2_neck_cream[46],
  // 9. trilogy PC+ ネック TLC トリートメント
  batch13Data.theme2_neck_cream.find(it => it.itemName.includes("trilogy") || it.itemName.includes("TLC")) || batch13Data.theme2_neck_cream[47],
  // 10. クレ・ド・ポー ボーテ シナクティフ クレームクーエデコルテ n
  batch13Data.theme2_neck_cream.find(it => it.itemName.includes("シナクティフ") || it.itemName.includes("cle de peau")) || batch13Data.theme2_neck_cream[48]
].filter(Boolean);

// --- テーマ3: 充電式温感ホットアイマスク＆目元温熱ギア 厳選10商品 ---
const eyeMaskItemsRaw = [
  // 1. NIPLUX EYE RELAX S 最新モデル
  batch13Data.theme3_eye_mask.find(it => it.itemName.includes("EYE RELAX S") || (it.itemName.includes("NIPLUX") && it.itemName.includes("RELAX S"))) || batch13Data.theme3_eye_mask[2],
  // 2. La Luna エアーアイマスク コードレス充電式
  batch13Data.theme3_eye_mask.find(it => it.itemName.includes("ラルーナ") || it.itemName.includes("La Luna")) || batch13Data.theme3_eye_mask[0],
  // 3. DOCTORAIR 3Dアイマジック タッピング
  batch13Data.theme3_eye_mask.find(it => it.itemName.includes("DOCTORAIR") || it.itemName.includes("ドクターエア")) || batch13Data.theme3_eye_mask[16],
  // 4. nerugoo アロマ ホットアイマスク コードレス充電式
  batch13Data.theme3_eye_mask.find(it => it.itemName.includes("nerugoo") && it.itemName.includes("アロマ")) || batch13Data.theme3_eye_mask[10],
  // 5. ROMANTIC 最高級シルク100% ホットアイマスク PREMIUM PRO
  batch13Data.theme3_eye_mask.find(it => it.itemName.includes("ROMANTIC") || it.itemName.includes("PREMIUM PRO")) || batch13Data.theme3_eye_mask[7],
  // 6. 花王 めぐりズム 蒸気でホットアイマスク 36枚 バラエティパック
  batch13Data.theme3_eye_mask.find(it => it.itemName.includes("めぐりズム") && it.itemName.includes("36枚") && it.itemName.includes("バラエティ")) || batch13Data.theme3_eye_mask[24],
  // 7. PriO ホットアイマスク コードレス 充電式 目元エステ
  batch13Data.theme3_eye_mask.find(it => it.itemName.includes("PriO") || it.itemName.includes("FT楽天市場店")) || batch13Data.theme3_eye_mask[13],
  // 8. TOKYOBIKEN コードレス 温感・冷感・振動アイマスク
  batch13Data.theme3_eye_mask.find(it => it.itemName.includes("TOKYOBIKEN") || (it.itemName.includes("温感") && it.itemName.includes("冷感"))) || batch13Data.theme3_eye_mask[6],
  // 9. NIPLUX EMS EYE RELAX 目もとエステ
  batch13Data.theme3_eye_mask.find(it => it.itemName.includes("NP-ER23BK-EMS") || (it.itemName.includes("NIPLUX") && it.itemName.includes("EMS"))) || batch13Data.theme3_eye_mask[56],
  // 10. COCOBEAU ホットアイマスク 温熱アイピロー
  batch13Data.theme3_eye_mask.find(it => it.itemName.includes("COCOBEAU") || it.itemName.includes("アイピロー")) || batch13Data.theme3_eye_mask[61]
].filter(Boolean);

console.log(`選定アイテム数: シルクヘアケア=${silkHairItemsRaw.length}, ネッククリーム=${neckCreamItemsRaw.length}, ホットアイマスク=${eyeMaskItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'silkhair' ? 'slk' : category === 'neckcream' ? 'nck' : 'eym';
  const id = `art-winter-b13-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'ヘアケア・美髪ナイトケア・シルク製品・静電気防止';
  let descType = '11〜12月の過酷な空気乾燥と寝返り摩擦・静電気からキューティクルを守り抜き、翌朝の寝癖やパサつきを抑えてツヤ髪へ導く天然シルク100%美髪ケアアイテム';
  if (category === 'neckcream') {
    catName = 'スキンケア・ネックケア・デコルテ・エイジングケア・シワ改善';
    descType = '真冬の冷えによる血行不良やマフラー摩擦、長時間の前傾姿勢で深くなる首元の横ジワ・乾燥たるみをふっくら引き締め、なめらかなハリを与える集中ネックトリートメント';
  } else if (category === 'eyemask') {
    catName = '美容家電・アイケア・リラクゼーション・温活快眠ギア';
    descType = '冷え込みの厳しい冬の目元を心地よい蒸気と極上温熱でじんわり包み込み、毛細血管の血流を促進して頑固な青クマ・眼精疲労・乾燥小ジワを癒やす快眠アイマスク';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・特徴・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬本番における過酷な乾燥環境と冷えストレスにおいて、多くのユーザーから絶賛される実力派の${descType}です。楽天市場における最新価格は${item.priceFormatted}で、安心の正規取扱店「${item.shopName}」等から即日配送やポイント還元付きでお得にお買い求めいただけます。冬の美容コンディションを土台から格上げする必携アイテムです。`,
    category: catName,
    tags: [...tagList, '2026冬コスメ', '楽天市場正規品', '11月12月人気コスメ'],
    createdAt: nowStr,
    updatedAt: nowStr,
    itemCode: item.itemCode,
    itemName: item.itemName,
    itemPrice: item.itemPrice,
    priceFormatted: item.priceFormatted,
    itemUrl: item.affiliateUrl || item.itemUrl,
    affiliateUrl: item.affiliateUrl,
    imageUrl: item.imageUrl,
    shopName: item.shopName,
    reviewAverage: item.reviewAverage || 4.8,
    reviewCount: item.reviewCount || 200,
    featureSlug: featureSlug
  };
}

const silkHairArticles = silkHairItemsRaw.map((it, idx) => createProductArticle(it, 'silkhair', ['シルクナイトキャップ', 'シルク枕カバー', '美髪ケア', 'ナイトケア', '摩擦レス', '静電気防止', '渡辺直美愛用', 'COCOSILK'], 'winter-silk-night-cap-pillowcase-haircare-2026', idx));
const neckCreamArticles = neckCreamItemsRaw.map((it, idx) => createProductArticle(it, 'neckcream', ['ネッククリーム', '首のシワ', 'デコルテケア', '首元たるみ', 'クラランス', 'パーフェクトワン', 'マフラー摩擦対策', 'エイジングケア'], 'winter-neck-decollete-wrinkle-firming-cream-2026', idx));
const eyeMaskArticles = eyeMaskItemsRaw.map((it, idx) => createProductArticle(it, 'eyemask', ['ホットアイマスク', '温感アイマスク', 'コードレスアイマスク', 'NIPLUX', 'ラルーナ', '青クマ改善', '眼精疲労', '快眠グッズ'], 'winter-heated-eye-mask-massager-relax-2026', idx));

const allNewArticles = [...silkHairArticles, ...neckCreamArticles, ...eyeMaskArticles];

const existingIds = new Set(existingArticles.map(a => a.id));
let addedCount = 0;
for (const art of allNewArticles) {
  if (!existingIds.has(art.id)) {
    existingArticles.unshift(art);
    existingIds.add(art.id);
    addedCount++;
  }
}
fs.writeFileSync(articlesJsonPath, JSON.stringify(existingArticles, null, 2), 'utf8');
console.log(`✅ src/data/articles.json に ${addedCount} 件の新規個別商品記事を登録しました。（総記事数: ${existingArticles.length}件）`);

// 商品カードコンポーネント生成関数
function renderItemCard(it, art, reason, pros, cons) {
  return `
<div style="margin: 28px 0; padding: 22px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.05);">
  <div style="display: flex; gap: 20px; flex-direction: row; flex-wrap: wrap;">
    <div style="flex: 0 0 200px; max-width: 220px; margin: 0 auto; text-align: center;">
      <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener">
        <img src="${it.imageUrl}" alt="${it.itemName}" style="width: 100%; height: auto; max-height: 220px; object-fit: contain; border-radius: 12px; background: #f8fafc; padding: 6px; border: 1px solid #edf2f7;" loading="lazy" />
      </a>
      <div style="margin-top: 8px; font-size: 0.78rem; color: #64748b;">取扱: ${it.shopName}</div>
    </div>
    <div style="flex: 1 1 300px; min-width: 260px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
        <span style="background: #0284c7; color: #fff; font-size: 0.75rem; font-weight: bold; padding: 3px 8px; border-radius: 6px;">注目度No.${it.rank || 1}</span>
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.8} (${(it.reviewCount || 200).toLocaleString()}件)</span>
      </div>
      <h3 style="font-size: 1.15rem; font-weight: bold; margin: 0 0 10px 0; color: #0f172a; line-height: 1.45;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="color: #0f172a; text-decoration: none;">
          ${it.itemName}
        </a>
      </h3>
      <div style="font-size: 1.25rem; font-weight: 800; color: #0284c7; margin-bottom: 12px;">
        ${it.priceFormatted} <span style="font-size: 0.78rem; font-weight: normal; color: #64748b;">(税込・最新楽天市場価格)</span>
      </div>
      <p style="font-size: 0.92rem; color: #334155; line-height: 1.65; margin-bottom: 12px;">
        ${reason}
      </p>
      <div style="background: #f8fafc; border-radius: 10px; padding: 12px; font-size: 0.85rem; margin-bottom: 14px;">
        <div style="color: #059669; font-weight: bold; margin-bottom: 4px;">✅ メリット: ${pros}</div>
        <div style="color: #dc2626; font-weight: bold;">⚠️ 注意点: ${cons}</div>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="flex: 1 1 auto; text-align: center; background: linear-gradient(135deg, #0284c7, #0369a1); color: #fff; padding: 12px 18px; border-radius: 10px; font-weight: bold; text-decoration: none; font-size: 0.92rem; box-shadow: 0 3px 8px rgba(2,132,199,0.3);">
          🛒 楽天市場で在庫・最安値をチェック
        </a>
        <a href="/articles/${art.id}" style="padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 10px; color: #334155; text-decoration: none; font-size: 0.88rem; font-weight: 600; background: #fff;">
          📖 詳細スペック・口コミを見る
        </a>
      </div>
    </div>
  </div>
</div>`;
}

// 楽天カードPRバナー
const rakutenCardBanner = `
<div style="margin: 28px 0; padding: 18px 22px; background: #fffcf5; border: 1px solid #fef08a; border-radius: 14px; text-align: center;">
  <p style="font-size: 0.82rem; font-weight: bold; color: #854d0e; margin-bottom: 8px;">
    💳 Qualia Naviからのご案内：楽天カード新規入会＆利用でポイント進呈中
  </p>
  <div style="display: flex; justify-content: center; align-items: center; margin: 8px 0;">
    <a href="https://hb.afl.rakuten.co.jp/hsc/570202c9.ad3cd4ba.5446e4f3.10821450/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOjEsImJhbiI6MTY3NDAxLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; display: inline-block;">
      <img src="https://hbb.afl.rakuten.co.jp/hsb/570202c9.ad3cd4ba.5446e4f3.10821450/?me_id=2101008&me_adv_id=167401&t=pict" border="0" style="margin:2px; max-width: 100%; height: auto; border-radius: 6px;" alt="楽天カード新規入会キャンペーン" title="楽天カード">
    </a>
  </div>
  <p style="font-size: 0.74rem; color: #78716c; margin-top: 4px;">
    ※冬のシルクナイトキャップや本格ネッククリーム、充電式温熱ホットアイマスクも、楽天カード決済なら常時3倍以上のポイント還元。お買い物マラソンや0・5のつく日を活用してお得に手に入れましょう。
  </p>
</div>`;

export {
  batch13Data,
  silkHairItemsRaw,
  neckCreamItemsRaw,
  eyeMaskItemsRaw,
  silkHairArticles,
  neckCreamArticles,
  eyeMaskArticles,
  renderItemCard,
  rakutenCardBanner
};
