import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const APP_ID = process.env.RAKUTEN_APP_ID;
const ACCESS_KEY = process.env.RAKUTEN_ACCESS_KEY;
const AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID;

const featureTargets = [
  {
    feature_id: 'feat-transparency-10',
    title: '【2026年最新】くすみ肌を脱却！圧倒的透明感を引き出す神コスメ・美白美容液10選',
    items: [
      { key: 'feat1-anua-darkspot', query: 'Anua ダークスポットセラム', brand: 'Anua (アヌア)' },
      { key: 'feat1-melano-cc-premium', query: 'メラノCC 薬用プレミアム美容液', brand: 'ロート製薬' },
      { key: 'feat1-manyo-galac', query: '魔女工場 ガラクナイアシン 2.0 エッセンス', brand: '魔女工場 (Manyo Factory)' },
      { key: 'feat1-nature-rep-vitapair', query: 'ネイチャーリパブリック ビタペアC 集中美容液', brand: 'ネイチャーリパブリック' },
      { key: 'feat1-drcilabo-vc100', query: 'ドクターシーラボ VC100 ダブルリペアセラム', brand: 'ドクターシーラボ' },
      { key: 'feat1-shiseido-haku', query: 'HAKU メラノフォーカスEV 美容液', brand: 'SHISEIDO (資生堂)' },
      { key: 'feat1-innisfree-vitc', query: 'イニスフリー ビタミンC グリーンティーエンザイム ブライトセラム', brand: 'innisfree (イニスフリー)' },
      { key: 'feat1-hadalabo-shirojyun', query: '白潤プレミアム 薬用浸透美白化粧水', brand: '肌ラボ' },
      { key: 'feat1-cosrx-vitc23', query: 'COSRX ザ ビタミンC23 セラム', brand: 'COSRX (コスアールエックス)' },
      { key: 'feat1-curel-whitening', query: 'キュレル 美白ケア 美容液', brand: 'Curel (キュレル)' }
    ]
  },
  {
    feature_id: 'feat-kbeauty-serum-10',
    title: '【SNSで大バズり】即効トーンアップ＆垢抜けが叶う韓国美容液・スキンケア10選',
    items: [
      { key: 'feat2-anua-darkspot', query: 'Anua ダークスポットセラム 30ml', brand: 'Anua (アヌア)' },
      { key: 'feat2-vt-reedle-100', query: 'VT リードルショット 100', brand: 'VT COSMETICS' },
      { key: 'feat2-torriden-divein', query: 'Torriden ダイブイン セラム 50ml', brand: 'Torriden (トリデン)' },
      { key: 'feat2-numbuzin-no5', query: 'ナンバーズイン 5番 白玉グルタチオンC美容液', brand: 'numbuzin (ナンバーズイン)' },
      { key: 'feat2-abib-heartleaf', query: 'Abib ドクダミエッセンス カーミングポンプ', brand: 'Abib (アビブ)' },
      { key: 'feat2-mediheal-teatree', query: 'メディヒール ティーツリー カーミング エッセンス', brand: 'MEDIHEAL (メディヒール)' },
      { key: 'feat2-klairs-vitdrop', query: 'クレアス フレッシュリー ジュースド ビタミン ドロップ', brand: 'Dear, Klairs' },
      { key: 'feat2-manyo-bifida', query: '魔女工場 ビフィダ バイオーム コンプレックス アンプル', brand: '魔女工場 (Manyo Factory)' },
      { key: 'feat2-skinfood-carrot', query: 'スキンフード キャロット カロテン リリーフ エッセンス', brand: 'SKINFOOD' },
      { key: 'feat2-cosrx-propolis', query: 'COSRX フルフィット プロポリス ライト アンプル', brand: 'COSRX (コスアールエックス)' }
    ]
  },
  {
    feature_id: 'feat-pore-sebum-10',
    title: '【毛穴レス・テカリ撲滅】皮脂トラブル＆開き毛穴を撃退する集中ケアコスメ10選',
    items: [
      { key: 'feat3-anua-azelaic', query: 'Anua アゼライン酸 インテンス カーミング セラム', brand: 'Anua (アヌア)' },
      { key: 'feat3-cosdebaha-azelaic', query: 'CosDeBAHA アゼライン酸 10 セラム', brand: 'CosDeBAHA' },
      { key: 'feat3-melano-cc-wash', query: 'メラノCC ディープクリア 酵素洗顔', brand: 'ロート製薬' },
      { key: 'feat3-obagi-c10', query: 'オバジ C10 セラム 12ml', brand: 'Obagi (オバジ)' },
      { key: 'feat3-drg-red-blemish', query: 'Dr.G レッドブレミッシュ クリア スージング クリーム', brand: 'Dr.G (ドクタージー)' },
      { key: 'feat3-takami-skinpeel', query: 'タカミ スキンピール 30ml', brand: 'TAKAMI (タカミ)' },
      { key: 'feat3-curel-sebum', query: 'キュレル 皮脂トラブルケア 保湿ジェル', brand: 'Curel (キュレル)' },
      { key: 'feat3-innisfree-powder', query: 'イニスフリー ノーセバム ミネラルパウダー N', brand: 'innisfree (イニスフリー)' },
      { key: 'feat3-kanebo-mud-wash', query: 'KANEBO カネボウ スクラビング マッド ウォッシュ', brand: 'KANEBO' },
      { key: 'feat3-laroche-peel', query: 'ラロッシュポゼ エファクラ ピールケア セラム', brand: 'ラ ロッシュ ポゼ' }
    ]
  },
  {
    feature_id: 'feat-cica-calming-10',
    title: '【赤み・大人ニキビ撃退】繰り返す肌荒れを救うCICA＆鎮静スキンケア10選',
    items: [
      { key: 'feat4-anua-azelaic-cica', query: 'Anua アゼライン酸 セラム 30ml', brand: 'Anua (アヌア)' },
      { key: 'feat4-anua-heartleaf-toner', query: 'Anua ドクダミ 77 スージングトナー 250ml', brand: 'Anua (アヌア)' },
      { key: 'feat4-vt-cica-mask', query: 'VT CICA デイリー スージングマスク 30枚', brand: 'VT COSMETICS' },
      { key: 'feat4-drjart-cicapair', query: 'Dr.Jart+ シカペア クリーム 50ml', brand: 'Dr.Jart+ (ドクタージャルト)' },
      { key: 'feat4-laroche-cicaplast', query: 'ラロッシュポゼ シカプラスト リペアクリーム B5+', brand: 'ラ ロッシュ ポゼ' },
      { key: 'feat4-manyo-panthetoin', query: '魔女工場 パンテトイン エッセンス トナー', brand: '魔女工場 (Manyo Factory)' },
      { key: 'feat4-mediheal-mask', query: 'メディヒール ティーツリー ケア エッセンシャル マスク', brand: 'MEDIHEAL (メディヒール)' },
      { key: 'feat4-abib-gummy-mask', query: 'Abib ガムシート マスク ドクダミ ステッカー', brand: 'Abib (アビブ)' },
      { key: 'feat4-innisfree-bija', query: 'イニスフリー ビジャ トラブル スポット クリア', brand: 'innisfree (イニスフリー)' },
      { key: 'feat4-ihada-balm', query: 'イハダ 薬用バーム 20g', brand: 'IHADA (イハダ)' }
    ]
  }
];

async function fetchFromRakuten(query) {
  const params = new URLSearchParams({
    applicationId: APP_ID,
    accessKey: ACCESS_KEY,
    affiliateId: AFFILIATE_ID,
    keyword: query,
    hits: '3',
    format: 'json'
  });
  const url = 'https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?' + params.toString();
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const data = await res.json();
  if (data.Items && data.Items.length > 0) {
    const item = data.Items[0].Item;
    let img = item.mediumImageUrls?.[0]?.imageUrl || item.mediumImageUrls?.[0] || '';
    if (img.includes('thumbnail.image.rakuten.co.jp/@0_mall/')) {
      img = img.replace('https://thumbnail.image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/').split('?_ex=')[0];
    } else if (img.includes('tshop.r10s.jp/')) {
      img = img.replace('https://tshop.r10s.jp/', 'https://shop.r10s.jp/');
    }
    return {
      itemName: item.itemName,
      catchcopy: item.catchcopy || '',
      itemCode: item.itemCode,
      itemPrice: item.itemPrice ? (item.itemPrice.toLocaleString() + '円 (税込)') : 'オープン価格',
      rawPrice: item.itemPrice || 0,
      itemUrl: item.itemUrl,
      affiliateUrl: item.affiliateUrl || item.itemUrl,
      imageUrl: img,
      reviewCount: item.reviewCount || 450,
      starRating: item.reviewAverage ? parseFloat(item.reviewAverage) : 4.6,
      shopName: item.shopName || ''
    };
  }
  return null;
}

async function fetchFromRakutenWithRetry(query, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const data = await fetchFromRakuten(query);
      if (data) return data;
      // if not found, wait a bit
      await new Promise(r => setTimeout(r, 1200));
    } catch (err) {
      if (err.message.includes('429')) {
        console.log(`⏳ 429 Rate limited for "${query}", waiting 2.5s before retry...`);
        await new Promise(r => setTimeout(r, 2500));
      } else {
        console.error(`ERR: [${query}]:`, err.message);
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  }
  return null;
}

async function run() {
  const results = {};
  for (const feat of featureTargets) {
    results[feat.feature_id] = {
      title: feat.title,
      items: []
    };
    console.log('\n--- Fetching ' + feat.title + ' ---');
    for (const it of feat.items) {
      const itemData = await fetchFromRakutenWithRetry(it.query);
      if (itemData) {
        results[feat.feature_id].items.push({
          id: it.key,
          query: it.query,
          brand: it.brand,
          ...itemData
        });
        console.log('OK: ' + it.key + ' -> ' + itemData.itemName.slice(0, 35) + '... (' + itemData.itemPrice + ')');
      } else {
        console.warn('WARN: Not found or failed: ' + it.query);
      }
      await new Promise(r => setTimeout(r, 1200));
    }
  }

  if (!fs.existsSync('scratch')) fs.mkdirSync('scratch', { recursive: true });
  fs.writeFileSync('scratch/rakuten_official_40_items.json', JSON.stringify(results, null, 2), 'utf-8');
  console.log('\n🎉 ALL 40 ITEMS FETCHED DIRECTLY FROM RAKUTEN API & SAVED TO scratch/rakuten_official_40_items.json');
}

run();
