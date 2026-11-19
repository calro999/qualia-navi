// scripts/lib/rakuten_hub_client.mjs
const DEFAULT_APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const DEFAULT_ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const DEFAULT_AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function normalizeRakutenImageUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  let img = rawUrl.trim();
  if (img.includes('thumbnail.image.rakuten.co.jp/@0_mall/')) {
    img = img
      .replace('https://thumbnail.image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/')
      .split('?_ex=')[0];
  } else if (img.includes('tshop.r10s.jp/')) {
    img = img.replace('https://tshop.r10s.jp/', 'https://shop.r10s.jp/').split('?_ex=')[0];
  } else if (img.includes('?_ex=')) {
    img = img.split('?_ex=')[0];
  }
  return img;
}

/**
 * 楽天商品名から過剰な装飾・プロモ文言を除去して読みやすい商品名を整える
 */
export function cleanProductName(rawName) {
  if (!rawName) return '注目コスメ';
  let name = String(rawName)
    .replace(/＼[^／]*／/g, ' ')
    .replace(/★[^★]*★/g, ' ')
    .replace(/☆[^☆]*☆/g, ' ')
    .replace(/【[^】]*(?:クーポン|ポイント|エントリー|送料無料|P\d+倍|Pアップ|OFF|倍|発送|営業日|イチオシ|プレゼント|おまけ|オマケ|レビュー|最大|1位|第1位|受賞|国内配送|あす楽|即納|マラソン|スーパーSALE|楽天|限定特価|割引|再入荷|在庫処分|半額|選べる|新色|セール|SALE)[^】]*】/gi, ' ')
    .replace(/\[[^\]]*(?:送料無料|公式|限定|ポイント|即納|メール便|ネコポス|定形外|選べる|個数|個セット)[^\]]*\]/gi, ' ')
    .replace(/※.*$/g, ' ')
    .replace(/送料無料|即納|あす楽対応/g, ' ');

  const pipeParts = name
    .split(/\s*[|｜│◆■]\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (pipeParts.length > 1) {
    name = pipeParts[0].length >= 8 ? pipeParts[0] : `${pipeParts[0]} ${pipeParts[1]}`;
  }

  name = name.replace(/\s+/g, ' ').trim();
  if (name.length > 56) {
    const tokens = name.split(' ');
    let acc = '';
    for (const token of tokens) {
      if ((acc + ' ' + token).trim().length > 54) break;
      acc = (acc + ' ' + token).trim();
    }
    name = acc.length >= 12 ? acc : name.slice(0, 52);
  }

  name = name
    .replace(/[\(\[【「（][^)\]】」）]*$/, '')
    .replace(/[\/／・\-－:：,、]+$/, '')
    .trim();

  return name.length >= 4 ? name : String(rawName).replace(/\s+/g, ' ').trim().slice(0, 48);
}

const KNOWN_SERIES_SIGNATURES = [
  ['yunth', /yunth|ユンス/i],
  ['decorte_powder', /コスメデコルテ.*(ルース|フェイス)パウダー/i],
  ['elegance_poudre', /エレガンス.*プードル/i],
  ['kose_keep_mist', /(コーセー|kose).*メイク\s*キープ\s*ミスト/i],
  ['mac_fix_plus', /(m・a・c|mac).*フィックス\+/i],
  ['vim_primer', /vim\s*beauty.*primer/i],
  ['chacott_base', /チャコット.*ラスティングベース/i],
  ['yaman_shiny', /(ヤーマン|ya-man).*フォトプラス\s*シャイニー/i],
  ['niplux_refine_eye', /niplux.*refine\s*eye|リファインアイ/i],
  ['clione_fit', /clione\s*fit|クリオネフィット/i],
  ['belulu_rebirth', /美ルル\s*リバース|belulu\s*rebirth/i],
  ['cicibella_mask', /cicibella|シシベラ.*シートマスク/i],
  ['mitomo_mask', /mitomo.*(パック|マスク)/i],
  ['puru_eye_mask', /puru.*アイシート/i],
  ['earthful_mask', /earthful.*シートマスク/i],
  ['milbon_elujuda', /ミルボン.*エルジューダ/i],
  ['refa_lock_balm', /(リファ|refa).*ロック\s*バーム/i],
  ['carecera_ap', /ケアセラ.*ap/i],
  ['attenir_cleansing', /アテニア.*スキンクリア\s*クレンズ/i],
  ['shu_ultime8', /シュウ.*アルティム8/i],
  ['deep_keratin_shampoo', /deep.*シャンプー/i],
  ['luty_shampoo', /luty|ルーティー.*シャンプー/i],
  ['samourai_woman', /サムライウーマン|samourai\s*woman/i],
  ['maybelline_brow', /メイベリン.*ファッションブロウ/i],
  ['excel_brow', /エクセル.*ザ\s*プライムアイブロウ/i],
  ['merica_brow', /メリカ.*アイブロウ/i],
  ['pdc_wrinkle_eye', /ピュア\s*ナチュラル.*リンクルセラム/i],
  ['nameraka_eye', /なめらか本舗.*リンクルアイクリーム/i],
  ['wella_ultime', /ウエラ.*アルタイム/i],
  ['allmic_hair', /アルミック.*ヘア(ミルク|オイル)/i],
  ['fafra_body', /fafra.*クリーム/i],
  ['josephine_hand', /ジョセフィン.*ハンドクリーム/i],
  ['revi_foundation', /revi|ルヴィ.*ファンデーション/i],
  ['kate_lipmonster', /リップモンスター/i],
  ['romand_juicy', /ロムアンド.*ジューシー/i],
  ['etude_overglow', /エチュード.*オーバーグロウ/i],
  ['banilaco_plumper', /バニラコ.*プランパー/i],
  ['clio_pro_eye', /クリオ.*プロ\s*アイ\s*パレット/i]
];

/**
 * 重複判定用の正規化キーを生成（ショップ違い・セット違い・容量違いの同一製品を除外）
 */
export function extractCoreKey(rawName) {
  const raw = String(rawName || '');
  for (const [sig, re] of KNOWN_SERIES_SIGNATURES) {
    if (re.test(raw)) return `sig:${sig}`;
  }

  const cleaned = cleanProductName(raw)
    .replace(/【[^】]*】/g, '')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/（[^）]*）/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/\d+(?:個|本|袋|枚|ml|mL|g|L|色|種)(?:セット|組|入|入り)?/gi, '')
    .replace(/[\s\u3000・／\/\-－!！?？★☆♪]+/g, '')
    .toLowerCase();
  return cleaned.slice(0, 14);
}

/**
 * ノーブランド大量量産系（同一セラーのキーワード入れ替え出品）を弾くためのトークン署名
 */
export function extractSpamTokenSignature(rawName) {
  const words = String(rawName || '')
    .replace(/【[^】]*】/g, ' ')
    .replace(/\[[^\]]*\]/g, ' ')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length >= 2)
    .sort()
    .slice(0, 6);
  return words.join('|');
}

export function isEligibleProduct(item, genre, minReviewCount = 1) {
  if (!item || !item.itemName || !item.itemPrice || !item.imageUrl) return false;
  if (!(item.affiliateUrl || item.itemUrl)) return false;
  if (Number(item.itemPrice) < 350) return false;
  if (Number(item.reviewCount || 0) < minReviewCount) return false;

  const text = `${item.itemName} ${item.catchcopy || ''}`;
  if (
    /中古|訳あり|サンプルのみ|空箱|空き箱|試供品のみ|詰め替えボトルのみ|空容器|カタログギフト|ふるさと納税/.test(
      text
    )
  ) {
    return false;
  }

  // スパム的なキーワード羅列出品（例: 2026新登場...2本セット 等でレビュー0）を抑制
  if (Number(item.reviewCount || 0) === 0 && /【2026新登場】|当日発送.*color|4色.*コンシーラーパレット/i.test(item.itemName)) {
    return false;
  }

  if (genre?.requireRegex) {
    const reqRe = new RegExp(genre.requireRegex, 'i');
    if (!reqRe.test(item.itemName)) return false;
  }

  if (genre?.excludeRegex) {
    const excRe = new RegExp(genre.excludeRegex, 'i');
    if (excRe.test(item.itemName)) return false;
  }
  return true;
}

/**
 * 楽天OpenAPIから商品説明（itemCaption）やポイント倍率・送料条件を含めて取得する
 */
export async function searchRakutenRich(keyword, options = {}) {
  const {
    hits = 30,
    page = 1,
    sort = '-reviewCount',
    retries = 3
  } = options;

  const appId = process.env.RAKUTEN_APP_ID || DEFAULT_APP_ID;
  const accessKey = process.env.RAKUTEN_ACCESS_KEY || DEFAULT_ACCESS_KEY;
  const affiliateId = process.env.RAKUTEN_AFFILIATE_ID || DEFAULT_AFFILIATE_ID;

  const params = new URLSearchParams({
    applicationId: appId,
    accessKey,
    affiliateId,
    keyword,
    format: 'json',
    hits: String(hits),
    page: String(page),
    sort,
    imageFlag: '1',
    availability: '1'
  });

  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?${params.toString()}`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    await sleep(1200);
    const res = await fetch(url);
    if (res.status === 429) {
      console.log(`[楽天API 429] 2.5秒待機して再試行 (${attempt}/${retries})...`);
      await sleep(2500);
      continue;
    }
    if (!res.ok) {
      const errText = await res.text();
      if (attempt === retries) {
        throw new Error(`楽天API HTTP ${res.status}: ${errText}`);
      }
      await sleep(1500);
      continue;
    }

    const data = await res.json();
    const rawItems = (data.Items || []).map((e) => e.Item || e);

    return rawItems.map((item, idx) => {
      const img = normalizeRakutenImageUrl(
        item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || ''
      );
      const rawAvg = Number(item.reviewAverage || 0);
      const reviewAverage = rawAvg > 0 ? Math.round(rawAvg * 100) / 100 : 4.5;

      return {
        rank: idx + 1,
        itemCode: item.itemCode,
        itemName: item.itemName,
        cleanName: cleanProductName(item.itemName),
        catchcopy: (item.catchcopy || '').trim(),
        itemCaption: (item.itemCaption || '').replace(/\s+/g, ' ').trim(),
        itemPrice: Number(item.itemPrice || 0),
        priceFormatted: `${Number(item.itemPrice || 0).toLocaleString()}円 (税込)`,
        shopName: item.shopName || '楽天市場 取扱ショップ',
        shopCode: item.shopCode || '',
        affiliateUrl: item.affiliateUrl || item.itemUrl,
        itemUrl: item.itemUrl,
        imageUrl: img,
        reviewAverage,
        reviewCount: Number(item.reviewCount || 0),
        pointRate: Number(item.pointRate || 1),
        postageFlag: Number(item.postageFlag || 0),
        asurakuFlag: Number(item.asurakuFlag || 0),
        giftFlag: Number(item.giftFlag || 0),
        shopOfTheYearFlag: Number(item.shopOfTheYearFlag || 0)
      };
    });
  }

  throw new Error(`楽天API取得リトライ上限超過: ${keyword}`);
}
