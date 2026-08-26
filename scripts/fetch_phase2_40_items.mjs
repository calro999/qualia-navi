import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();
const APP_ID = process.env.RAKUTEN_APP_ID;
const ACCESS_KEY = process.env.RAKUTEN_ACCESS_KEY;
const AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID;

const featureTargets2 = [
  {
    feature_id: 'feat-niacinamide-aging-10',
    title: '【シワ改善×美白】ナイアシンアミド高配合の神コスメ・美容液10選',
    items: [
      { key: 'feat5-anua-niacin-darkspot', query: 'Anua ダークスポットセラム ナイアシンアミド 30ml', brand: 'Anua (アヌア)' },
      { key: 'feat5-kose-the-wrinkless', query: 'ONE BY KOSE ザ リンクレス S 20g', brand: 'KOSE (コーセー)' },
      { key: 'feat5-decorte-ipshot', query: 'コスメデコルテ iP.Shot アドバンスト 20g', brand: 'COSME DECORTE' },
      { key: 'feat5-orbis-wrinkle-bright', query: 'オルビス リンクルブライトセラム 30g', brand: 'ORBIS (オルビス)' },
      { key: 'feat5-nameraka-wrinkle-serum', query: 'なめらか本舗 薬用リンクル美容液 ホワイト', brand: 'サナ なめらか本舗' },
      { key: 'feat5-drcilabo-enrich-lift', query: 'ドクターシーラボ アクアコラーゲンゲル エンリッチリフトEX 120g', brand: 'ドクターシーラボ' },
      { key: 'feat5-muji-wrinkle-serum', query: '無印良品 薬用リンクルケア美容液 30g', brand: '無印良品' },
      { key: 'feat5-sofina-basecare', query: 'ソフィーナiP ベースケア セラム 土台美容液 90g', brand: 'SOFINA iP' },
      { key: 'feat5-elixir-wrinkle-cream', query: 'エリクシール レチノパワー リンクルクリーム S', brand: 'ELIXIR (エリクシール)' },
      { key: 'feat5-laroche-n10-serum', query: 'ラロッシュポゼ N10 セラム 30ml', brand: 'ラ ロッシュ ポゼ' }
    ]
  },
  {
    feature_id: 'feat-morning-makeup-prep-10',
    title: '【朝用スキンケア決定版】メイク崩れ・テカリを徹底ブロックする先行美容液＆下地10選',
    items: [
      { key: 'feat6-anua-azelaic-morning', query: 'Anua アゼライン酸 インテンス カーミング セラム 30ml', brand: 'Anua (アヌア)' },
      { key: 'feat6-kanebo-fresh-day-cream', query: 'カネボウ フレッシュ デイ クリーム 40ml', brand: 'KANEBO' },
      { key: 'feat6-pauljoe-primer', query: 'ポール＆ジョー プロテクティング ファンデーション プライマー 01', brand: 'PAUL & JOE' },
      { key: 'feat6-maquillage-skin-sensor', query: 'マキアージュ ドラマティックスキンセンサーベース NEO ヌーディーベージュ', brand: 'MAQuillAGE' },
      { key: 'feat6-primavista-skin-protect', query: 'プリマヴィスタ スキンプロテクトベース 皮脂くずれ防止', brand: 'Primavista' },
      { key: 'feat6-cledepeau-voile', query: 'クレ・ド・ポー ボーテ ヴォワールコレクチュールn 40g', brand: 'Clé de Peau Beauté' },
      { key: 'feat6-decorte-sun-cc', query: 'コスメデコルテ サンシェルター トーンアップCC 01', brand: 'COSME DECORTE' },
      { key: 'feat6-dalba-mist-serum', query: 'ダルバ ホワイトトリュフ ファースト スプレー セラム 100ml', brand: "d'Alba (ダルバ)" },
      { key: 'feat6-astalift-duv-clear', query: 'アスタリフト D-UVクリア ホワイトソリューション 30g', brand: 'ASTALIFT' },
      { key: 'feat6-clarins-fix-makeup', query: 'クラランス フィックス メイクアップ 50ml', brand: 'CLARINS' }
    ]
  },
  {
    feature_id: 'feat-pdrn-glutathione-trend-10',
    title: '【2026年トレンド直撃】PDRN・白玉グルタチオン配合の韓国美容液10選',
    items: [
      { key: 'feat7-vt-pdrn-essence', query: 'VT PDRN エッセンス 100 30ml', brand: 'VT COSMETICS' },
      { key: 'feat7-medicube-pdrn-ampoule', query: 'メディキューブ PDRN ピンクペプチドアンプル 30ml', brand: 'medicube' },
      { key: 'feat7-anua-darkspot-txa', query: 'Anua ダークスポットセラム 30ml', brand: 'Anua (アヌア)' },
      { key: 'feat7-numbuzin-pad-glutathione', query: 'ナンバーズイン 5番 白玉グルタチオンC フィルムパッド', brand: 'numbuzin' },
      { key: 'feat7-iope-retinol-super', query: 'IOPE レチノール スーパー バウンス セラム 30ml', brand: 'IOPE' },
      { key: 'feat7-cnp-propolis-ampoule', query: 'CNP プロポリス エナジー アンプル 15ml', brand: 'CNP Laboratory' },
      { key: 'feat7-rejuran-dual-ampoule', query: 'リジュラン デュアル エフェクト アンプル 30ml', brand: 'REJURAN' },
      { key: 'feat7-biohealboh-3d-ampoule', query: 'バイオヒールボ プロバイオダーム 3D リフティング アンプル', brand: 'BIOHEAL BOH' },
      { key: 'feat7-goodal-vitac-serum', query: 'グーダル 青みかん ビタC ダークスポット セラム 50ml', brand: 'goodal' },
      { key: 'feat7-hera-hydro-ampoule', query: 'HERA ハイドロ リフレクティング アンプル', brand: 'HERA' }
    ]
  },
  {
    feature_id: 'feat-acne-scar-pore-repair-10',
    title: '【繰り返す肌荒れ脱却】毛穴詰まり・ニキビ跡・凸凹肌をなめらかに整えるリペアコスメ10選',
    items: [
      { key: 'feat8-anua-azelaic-50ml', query: 'Anua アゼライン酸 15 インテンス カーミング セラム 50ml', brand: 'Anua (アヌア)' },
      { key: 'feat8-melano-cc-spot-serum', query: 'メラノCC 薬用しみ集中対策プレミアム美容液 20ml', brand: 'ロート製薬' },
      { key: 'feat8-ceracolla-ap-lotion', query: 'ケアセラ AP フェイス＆ボディ乳液 200ml', brand: 'CareCera (ケアセラ)' },
      { key: 'feat8-avene-cicalfate-cream', query: 'アベンヌ シカルファットプラス リペアクリーム 40g', brand: 'Avene (アベンヌ)' },
      { key: 'feat8-mentholatum-acnes25-mist', query: 'メンソレータム アクネス25 メディカルミスト 100ml', brand: 'ロート製薬' },
      { key: 'feat8-orbis-clearful-liquid', query: 'オルビス クリアフル ディープクレンジング リキッド 150ml', brand: 'ORBIS' },
      { key: 'feat8-curel-face-cream', query: 'キュレル 潤浸保湿 フェイスクリーム 40g', brand: 'Curel' },
      { key: 'feat8-drk-abc-g-serum', query: 'ドクターケイ ABC-G リペアセラム 20ml', brand: 'Dr.K (ドクターケイ)' },
      { key: 'feat8-dprogram-acne-emulsion', query: 'd プログラム アクネケア エマルジョン MB 100ml', brand: 'd program' },
      { key: 'feat8-zoskin-balancertoner', query: 'ゼオスキン バランサートナー 180ml', brand: 'ZO SKIN HEALTH' }
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
      reviewCount: item.reviewCount || 350,
      starRating: item.reviewAverage ? parseFloat(item.reviewAverage) : 4.6,
      shopName: item.shopName || ''
    };
  }
  return null;
}

async function fetchWithRetry(query, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const data = await fetchFromRakuten(query);
      if (data) return data;
      // if not found with exact long query, try simplified query
      const simplified = query.split(' ').slice(0, 2).join(' ');
      if (simplified !== query) {
        console.log(`Trying simplified query: "${simplified}"`);
        const simpleData = await fetchFromRakuten(simplified);
        if (simpleData) return simpleData;
      }
      await new Promise(r => setTimeout(r, 1200));
    } catch (err) {
      if (err.message.includes('429')) {
        console.log(`⏳ 429 Rate limited for "${query}", waiting 2.5s before retry...`);
        await new Promise(r => setTimeout(r, 2500));
      } else {
        console.error(`ERR [${query}]:`, err.message);
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  }
  return null;
}

async function run() {
  const results = {};
  for (const feat of featureTargets2) {
    results[feat.feature_id] = {
      title: feat.title,
      items: []
    };
    console.log('\n--- Fetching ' + feat.title + ' ---');
    for (const it of feat.items) {
      const itemData = await fetchWithRetry(it.query);
      if (itemData) {
        results[feat.feature_id].items.push({
          id: it.key,
          query: it.query,
          brand: it.brand,
          ...itemData
        });
        console.log('OK: ' + it.key + ' -> ' + itemData.itemName.slice(0, 35) + '... (' + itemData.itemPrice + ')');
      } else {
        console.warn('WARN: Not found: ' + it.query);
      }
      await new Promise(r => setTimeout(r, 1200));
    }
  }

  fs.writeFileSync('scratch/rakuten_official_phase2_40_items.json', JSON.stringify(results, null, 2), 'utf-8');
  console.log('\n🎉 ALL PHASE 2 ITEMS SAVED TO scratch/rakuten_official_phase2_40_items.json');
}

run();
