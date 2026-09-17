process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const RAKUTEN_APP_ID = process.env.RAKUTEN_APP_ID || '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const RAKUTEN_ACCESS_KEY = process.env.RAKUTEN_ACCESS_KEY || 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const RAKUTEN_AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID || '54d2a438.4bc4abc2.54d2a439.aa1be583';

const keywords = [
  '割れ爪 補修 ネイル グルー シルクラップ',
  '白髪隠し スティック ファンデーション 生え際',
  'ナノガラス かかと 角質削り つるつる',
  '鼻毛 ワックス 脱毛 ズポーン',
  'まつ毛美容液 色素沈着しない 国産'
];

async function run() {
  console.log('Testing Rakuten OpenAPI directly for 5 high-demand themes...');
  for (const kw of keywords) {
    const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${RAKUTEN_APP_ID}&accessKey=${RAKUTEN_ACCESS_KEY}&affiliateId=${RAKUTEN_AFFILIATE_ID}&keyword=${encodeURIComponent(kw)}&hits=1`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const item = data.Items?.[0]?.Item;
      console.log(`✅ [${kw}] -> ${item?.itemName?.slice(0, 35)}... (価格: ${item?.itemPrice?.toLocaleString()}円, ショップ: ${item?.shopName})`);
    } else {
      console.log(`❌ [${kw}] -> Status: ${res.status}`);
    }
    await new Promise(r => setTimeout(r, 600));
  }
}
run();
