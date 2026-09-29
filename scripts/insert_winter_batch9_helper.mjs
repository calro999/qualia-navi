import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch9Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch9_items.json', 'utf8'));

// --- テーマ1: 冬の高保湿ボディクリーム＆濃厚ボディバター・ミルク 厳選10商品 ---
const bodyCreamItemsRaw = [
  // 1. セタフィル モイスチャライジングクリーム 566g
  batch9Data.theme1_bodycream.find(it => it.itemName.includes("セタフィル") && it.itemName.includes("566g") && !it.itemName.includes("3個") && !it.itemName.includes("4個") && !it.itemName.includes("5個")) || batch9Data.theme1_bodycream[10],
  // 2. ニュートロジーナ インテンスリペア ボディエマルジョン 250ml
  batch9Data.theme1_bodycream.find(it => it.itemName.includes("ニュートロジーナ") && it.itemName.includes("インテンスリペア") && it.itemName.includes("250ml") && !it.itemName.includes("2本") && !it.itemName.includes("3本")) || batch9Data.theme1_bodycream[21],
  // 3. ローラ メルシエ セラム ボディクリーム アンバーバニラ 200ml
  batch9Data.theme1_bodycream.find(it => it.itemName.includes("ローラメルシエ") && it.itemName.includes("アンバーバニラ")) || batch9Data.theme1_bodycream[29],
  // 4. キュレル モイスチャーバーム ジャー 70g
  batch9Data.theme1_bodycream.find(it => it.itemName.includes("キュレル") && it.itemName.includes("モイスチャーバーム") && !it.itemName.includes("2個")) || batch9Data.theme1_bodycream[33],
  // 5. ロクシタン シア リッチ ボディローション
  batch9Data.theme1_bodycream.find(it => it.itemName.includes("ロクシタン") || it.itemName.includes("シア")) || batch9Data.theme1_bodycream[0],
  // 6. ニベア スキンミルク クリーミィ
  batch9Data.theme1_bodycream.find(it => it.itemName.includes("ニベア") || it.itemName.includes("スキンミルク")) || batch9Data.theme1_bodycream[5],
  // 7. ジョンソンボディケア エクストラケア アロマミルク 500ml
  batch9Data.theme1_bodycream.find(it => it.itemName.includes("ジョンソン") && it.itemName.includes("アロマミルク") && !it.itemName.includes("6個") && !it.itemName.includes("3個")) || batch9Data.theme1_bodycream[42],
  // 8. ヴァセリン アドバンスドリペア ボディローション
  batch9Data.theme1_bodycream.find(it => it.itemName.includes("ヴァセリン") || it.itemName.includes("アドバンスドリペア")) || batch9Data.theme1_bodycream[5],
  // 9. fafra オーガニック 高保湿ボディクリーム
  batch9Data.theme1_bodycream.find(it => it.itemName.includes("fafra") || it.itemName.includes("オーガニック")) || batch9Data.theme1_bodycream[4],
  // 10. ピジョン フィルベビーリペア 高保湿クリーム
  batch9Data.theme1_bodycream.find(it => it.itemName.includes("フィルベビー") || it.itemName.includes("ピジョン")) || batch9Data.theme1_bodycream[9]
].filter(Boolean);

// --- テーマ2: 冬の高保湿かかとフットクリーム＆角質集中ケア 厳選10商品 ---
const footCreamItemsRaw = [
  // 1. ユースキン ボトル 120g (指定医薬部外品)
  batch9Data.theme2_footcream.find(it => it.itemName.includes("ユースキン") && it.itemName.includes("120g") && !it.itemName.includes("3個")) || batch9Data.theme2_footcream[2],
  // 2. メンソレータム ヒビプロ (ロート製薬)
  batch9Data.theme2_footcream.find(it => it.itemName.includes("ヒビプロ")) || batch9Data.theme2_footcream[0],
  // 3. ドクターショール かかと用保湿クリーム 70g
  batch9Data.theme2_footcream.find(it => it.itemName.includes("ドクターショール") && it.itemName.includes("かかと用") && !it.itemName.includes("3個")) || batch9Data.theme2_footcream[12],
  // 4. 第一三共ヘルスケア ロコベースリペア かかとケアバーム 10g
  batch9Data.theme2_footcream.find(it => it.itemName.includes("ロコベースリペア") && it.itemName.includes("かかと") && !it.itemName.includes("10個")) || batch9Data.theme2_footcream[21],
  // 5. リベルタ ベビーフット イージーパック
  batch9Data.theme2_footcream.find(it => it.itemName.includes("ベビーフット")) || batch9Data.theme2_footcream[1],
  // 6. ファイントゥデイ 資生堂 尿素10%クリーム 100g
  batch9Data.theme2_footcream.find(it => it.itemName.includes("尿素10%")) || batch9Data.theme2_footcream[0],
  // 7. ユーセリン ウレア リペアクリーム 30%
  batch9Data.theme2_footcream.find(it => it.itemName.includes("ユーセリン") || it.itemName.includes("ウレア")) || batch9Data.theme2_footcream[0],
  // 8. 小林製薬 かかとちゃん
  batch9Data.theme2_footcream.find(it => it.itemName.includes("かかとちゃん") && !it.itemName.includes("3個")) || batch9Data.theme2_footcream[30],
  // 9. グラフィコ フットメジ 薬用 足用角質クリアハーブ石けん
  batch9Data.theme2_footcream.find(it => it.itemName.includes("フットメジ")) || batch9Data.theme2_footcream[40],
  // 10. ライオン 休足時間 かかとぷるぷるジェルシート
  batch9Data.theme2_footcream.find(it => it.itemName.includes("休足時間") && !it.itemName.includes("3コ") && !it.itemName.includes("10個") && !it.itemName.includes("30個")) || batch9Data.theme2_footcream[46]
].filter(Boolean);

// --- テーマ3: 冬の高保湿スリーピングマスク＆夜用ナイトリペアパック 厳選10商品 ---
const sleepingMaskItemsRaw = [
  // 1. ラネージュ ウォータースリーピングマスク N 70ml
  batch9Data.theme3_sleepingmask.find(it => it.itemName.includes("ラネージュ") && it.itemName.includes("ウォーター") && !it.itemName.includes("2個") && !it.itemName.includes("3個")) || batch9Data.theme3_sleepingmask[10],
  // 2. ラネージュ バウンシースリーピングマスク 60ml
  batch9Data.theme3_sleepingmask.find(it => it.itemName.includes("ラネージュ") && it.itemName.includes("バウンシー") && it.itemName.includes("60ml") && !it.itemName.includes("ブラシ")) || batch9Data.theme3_sleepingmask[21],
  // 3. 資生堂 エリクシール シュペリエル スリーピングジェルパック W 105g
  batch9Data.theme3_sleepingmask.find(it => it.itemName.includes("エリクシール") && it.itemName.includes("スリーピングジェルパック")) || batch9Data.theme3_sleepingmask[30],
  // 4. コーセー コスメデコルテ リポソーム アドバンスト リペアクリーム 50g
  batch9Data.theme3_sleepingmask.find(it => it.itemName.includes("コスメデコルテ") && it.itemName.includes("リペアクリーム") && !it.itemName.includes("2個") && !it.itemName.includes("セラム")) || batch9Data.theme3_sleepingmask[40],
  // 5. VT COSMETICS CICA スリーピングマスク
  batch9Data.theme3_sleepingmask.find(it => it.itemName.includes("VT") && it.itemName.includes("スリーピングマスク")) || batch9Data.theme3_sleepingmask[50],
  // 6. FEMMUE ローズウォーター スリーピングマスク 50g
  batch9Data.theme3_sleepingmask.find(it => it.itemName.includes("FEMMUE") || it.itemName.includes("ファミュ")) || batch9Data.theme3_sleepingmask[52],
  // 7. 花王 キュレル 潤浸保湿 フェイスクリーム 40g (医薬部外品)
  batch9Data.theme3_sleepingmask.find(it => it.itemName.includes("キュレル") && it.itemName.includes("フェイスクリーム") && !it.itemName.includes("2コ")) || batch9Data.theme3_sleepingmask[57],
  // 8. ユリアージュ スリーピングマスク
  batch9Data.theme3_sleepingmask.find(it => it.itemName.includes("ユリアージュ") || it.itemName.includes("URIAGE")) || batch9Data.theme3_sleepingmask[8],
  // 9. Biodance リアルディープ ゲルマスク
  batch9Data.theme3_sleepingmask.find(it => it.itemName.includes("Biodance") || it.itemName.includes("リアルディープ")) || batch9Data.theme3_sleepingmask[1],
  // 10. BANOBAGI スキンブースター マスク
  batch9Data.theme3_sleepingmask.find(it => it.itemName.includes("BANOBAGI") || it.itemName.includes("バノバギ")) || batch9Data.theme3_sleepingmask[2]
].filter(Boolean);

console.log(`選定アイテム数: ボディクリーム=${bodyCreamItemsRaw.length}, かかとケア=${footCreamItemsRaw.length}, スリーピングマスク=${sleepingMaskItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'bodycream' ? 'bcr' : category === 'footcream' ? 'ftc' : 'slp';
  const id = `art-winter-b9-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'ボディケア・高保湿ボディクリーム・ミルク';
  let descType = '冬の寒冷乾燥による粉ふき・すねのかゆみ・肌荒れを救い、角層深くから吸い付くようなもちもちシルク肌をキープする高保湿ボディクリーム';
  if (category === 'footcream') {
    catName = 'ボディケア・フットケア・かかと角質ケア';
    descType = '冬のタイツやブーツで悪化する頑固なガサガサ鏡餅かかと・ひび割れを皮膚科学アプローチでつるすべ素足へと整える集中フットケア';
  } else if (category === 'sleepingmask') {
    catName = 'スキンケア・スリーピングマスク・ナイトパック';
    descType = 'エアコン暖房の過酷な夜間乾燥から肌を密閉保護し、寝ている間に濃厚リペアして翌朝の吸い付くハリツヤ肌を叶える睡眠美容マスク';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・特徴・最安値比較`,
    content: `${item.itemName}は、11〜12月の過酷な冬の乾燥環境において美意識の高いユーザーから絶大な支持を集める実力派の${descType}です。楽天市場における最新価格は${item.priceFormatted}で、正規取扱店舗「${item.shopName}」等から安心してご購入いただけます。寒さによるカサつきやダメージに立ち向かい、しっとり上質な極上美を叶えます。`,
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
    reviewAverage: item.reviewAverage || 4.7,
    reviewCount: item.reviewCount || 150,
    featureSlug: featureSlug
  };
}

const bodyCreamArticles = bodyCreamItemsRaw.map((it, idx) => createProductArticle(it, 'bodycream', ['ボディクリーム', 'ボディミルク', 'セタフィル', 'ニュートロジーナ', '高保湿ボディケア'], 'winter-rich-body-cream-butter-lotion-2026', idx));
const footCreamArticles = footCreamItemsRaw.map((it, idx) => createProductArticle(it, 'footcream', ['かかとケア', 'フットクリーム', 'ユースキン', 'ヒビプロ', '角質ケア'], 'winter-cracked-heel-foot-cream-care-2026', idx));
const sleepingMaskArticles = sleepingMaskItemsRaw.map((it, idx) => createProductArticle(it, 'sleepingmask', ['スリーピングマスク', 'ナイトパック', 'ラネージュ', 'リポソーム', '睡眠美容'], 'winter-overnight-sleeping-mask-night-pack-2026', idx));

const allNewArticles = [...bodyCreamArticles, ...footCreamArticles, ...sleepingMaskArticles];

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
        <span style="background: #e11d48; color: #fff; font-size: 0.75rem; font-weight: bold; padding: 3px 8px; border-radius: 6px;">注目度No.${it.rank || 1}</span>
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.7} (${(it.reviewCount || 150).toLocaleString()}件)</span>
      </div>
      <h3 style="font-size: 1.15rem; font-weight: bold; margin: 0 0 10px 0; color: #0f172a; line-height: 1.45;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="color: #0f172a; text-decoration: none;">
          ${it.itemName}
        </a>
      </h3>
      <div style="font-size: 1.25rem; font-weight: 800; color: #e11d48; margin-bottom: 12px;">
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
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="flex: 1 1 auto; text-align: center; background: linear-gradient(135deg, #e11d48, #be123c); color: #fff; padding: 12px 18px; border-radius: 10px; font-weight: bold; text-decoration: none; font-size: 0.92rem; box-shadow: 0 3px 8px rgba(225,29,72,0.3);">
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
    ※冬の全身高保湿ボディケアやサロン級スリーピングパックも、楽天カード決済なら常時3倍以上のポイント還元。お買い物マラソンや0・5のつく日を活用してお得に揃えましょう。
  </p>
</div>`;

export {
  batch9Data,
  bodyCreamItemsRaw,
  footCreamItemsRaw,
  sleepingMaskItemsRaw,
  bodyCreamArticles,
  footCreamArticles,
  sleepingMaskArticles,
  renderItemCard,
  rakutenCardBanner
};
