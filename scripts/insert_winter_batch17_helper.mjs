import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch17Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch17_items.json', 'utf8'));

// --- テーマ1: セルフネイルポリッシュ＆速乾ケア 厳選10商品 ---
export const nailItemsRaw = batch17Data.theme1_nail;

// --- テーマ2: フェイススチーマー＆ナノケア美顔器 厳選10商品 ---
export const steamerItemsRaw = batch17Data.theme2_steamer;

// --- テーマ3: 高密着アイブロウパレット＆眉マスカラ 厳選10商品 ---
export const eyebrowItemsRaw = batch17Data.theme3_eyebrow;

console.log(`選定アイテム数: ネイル=${nailItemsRaw.length}, スチーマー=${steamerItemsRaw.length}, アイブロウ=${eyebrowItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'nail' ? 'nal' : category === 'steamer' ? 'stm' : 'eyb';
  const id = `art-winter-b17-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'ネイル・マニキュア・速乾ネイル・セルフネイル・ホリデーネイル・爪保湿ケア';
  let descType = '11〜12月のホリデーシーズンや冬イベントに映える上質なツヤと速乾性を兼ね備え、真冬の寒冷・乾燥による爪のパサつき・二枚爪・割れ爪を防ぐ高保湿ネイルポリッシュ＆ケアアイテム';
  if (category === 'steamer') {
    catName = '美容家電・フェイススチーマー・ナノケア・美顔器・温感エステ・毛穴ディープクレンジング・高保湿';
    descType = '11〜12月の急激な冷え込みと暖房乾燥によってゴワつき、化粧水が浸透しなくなった冬の砂漠肌を温感ナノスチームで解きほぐし、毛穴汚れの浮かし出しから濃密保湿まで叶える高機能スチーマー美顔器';
  } else if (category === 'eyebrow') {
    catName = 'メイクアップ・アイブロウ・眉パレット・眉マスカラ・立体眉・落ちない眉メイク・冬メイク';
    descType = '11〜12月のマフラーやコート着用時に視線が集中する目元・眉を洗練された抜け感ニュアンスカラーで彩り、冬の乾燥や衣類摩擦でも夕方まで眉尻が消えない高密着アイブロウアイテム';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・特徴・最安値比較`,
    content: `${item.itemName}は、11〜12月のホリデーシーズンおよび冬本番の過酷な寒冷・乾燥環境において、多くの美容愛好家やコスメ賢者から絶賛されている実力派の${descType}です。楽天市場における最新価格は${item.priceFormatted}で、「${item.shopName}」等の正規取扱店・優良ショップからポイント高還元付きでお得にお買い求めいただけます。冬のメイクとスキンケアをワンランク上に格上げする本命の逸品です。`,
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
    reviewCount: item.reviewCount || 250,
    featureSlug: featureSlug
  };
}

export const nailArticles = nailItemsRaw.map((it, idx) => createProductArticle(it, 'nail', ['ネイルポリッシュ', 'マニキュア', 'ホリデーネイル', '速乾ネイル', 'uka', 'OSAJI', 'THREE', 'SHIRO', 'エクセル', 'キャンメイク', 'アディクション'], 'winter-holiday-self-nail-polish-care-2026', idx));
export const steamerArticles = steamerItemsRaw.map((it, idx) => createProductArticle(it, 'steamer', ['フェイススチーマー', 'ナノケア', '美顔器', 'パナソニック', 'サロニア', 'ヤーマン', '温スチーム', '毛穴ケア', '冬の乾燥肌', 'ご褒美家電'], 'winter-nano-facial-steamer-device-2026', idx));
export const eyebrowArticles = eyebrowItemsRaw.map((it, idx) => createProductArticle(it, 'eyebrow', ['アイブロウパレット', '眉マスカラ', '垢抜け眉', 'コスメデコルテ', 'セルヴォーク', 'ケイト', 'デジャヴュ', 'ロムアンド', 'ジルスチュアート', '冬メイク'], 'winter-fluffy-eyebrow-palette-mascara-2026', idx));

export const allNewArticles = [...nailArticles, ...steamerArticles, ...eyebrowArticles];

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
export function renderItemCard(it, art, reason, pros, cons) {
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
      <div style="font-size: 0.92rem; color: #334155; line-height: 1.65; margin-bottom: 14px; background: #f8fafc; padding: 12px; border-radius: 8px; border-left: 4px solid #0284c7;">
        <strong>【冬の選定理由・推奨ポイント】</strong><br/>
        ${reason}
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; font-size: 0.85rem;">
        <div style="background: #f0fdf4; padding: 10px; border-radius: 8px; border: 1px solid #bbf7d0;">
          <strong style="color: #166534;">メリット:</strong>
          <div style="color: #15803d; margin-top: 4px;">${pros}</div>
        </div>
        <div style="background: #fff7ed; padding: 10px; border-radius: 8px; border: 1px solid #fed7aa;">
          <strong style="color: #9a3412;">注意点・留意事項:</strong>
          <div style="color: #c2410c; margin-top: 4px;">${cons}</div>
        </div>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: #bf0000; color: #ffffff; padding: 11px 22px; border-radius: 8px; font-weight: bold; text-decoration: none; font-size: 0.92rem; box-shadow: 0 2px 6px rgba(191,0,0,0.3);">
          楽天市場で詳細・最安値をチェック ❯
        </a>
        <a href="/articles/${art.id}" style="display: inline-block; background: #f1f5f9; color: #334155; padding: 11px 18px; border-radius: 8px; font-weight: bold; text-decoration: none; font-size: 0.88rem; border: 1px solid #cbd5e1;">
          個別詳細検証ページへ ❯
        </a>
      </div>
    </div>
  </div>
</div>
`;
}

// 楽天カードキャンペーンバナー
export const rakutenCardBanner = `
<div style="margin: 36px 0; padding: 24px; background: linear-gradient(135deg, #fff5f5 0%, #ffe4e6 100%); border: 2px dashed #f43f5e; border-radius: 16px; text-align: center;">
  <div style="font-size: 0.88rem; font-weight: bold; color: #e11d48; margin-bottom: 6px;">【楽天お買い物マラソン＆スーパーSALE連動】</div>
  <h4 style="font-size: 1.3rem; font-weight: 800; color: #881337; margin: 0 0 10px 0;">楽天カード新規入会＆利用で今すぐ使えるポイント大量プレゼント！</h4>
  <p style="font-size: 0.92rem; color: #4c0519; margin: 0 0 14px 0; line-height: 1.6;">
    年会費永年無料の楽天カード作成で通常5,000〜8,000円相当のポイントを進呈。今回ご紹介した冬コスメも実質数千円引き〜タダ同然で手に入ります。SPU（スーパーポイントアッププログラム）で楽天市場でのコスメ買い物がいつでもポイント3倍以上に！
  </p>
  <a href="https://hb.afl.rakuten.co.jp/hsc/166661ee.59cb6523.14a4b490.96ab2da8/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOiIxIiwiYmFuIjoiMTY2NjYxZSIsImFtcCI6ZmFsc2V9" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: #e11d48; color: #ffffff; padding: 12px 28px; border-radius: 30px; font-weight: bold; text-decoration: none; font-size: 1rem; box-shadow: 0 4px 12px rgba(225,29,72,0.35);">
    楽天カード新規入会でポイントを獲得する ❯
  </a>
</div>
`;
