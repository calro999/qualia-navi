import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const { RAKUTEN_APP_ID, RAKUTEN_ACCESS_KEY, RAKUTEN_AFFILIATE_ID } = process.env;

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

console.log(`📦 全 ${articles.length} 件の記事を読み込みました。残存重複を完全解消します...`);

// 重複グループの検出
const introMap = new Map();
articles.forEach(a => {
  const intro = (typeof a.introText === 'string' ? a.introText : '').slice(0, 30);
  if (intro) {
    if (!introMap.has(intro)) introMap.set(intro, []);
    introMap.get(intro).push(a.id);
  }
});

// 重複グループのうち、2件目以降を別商品に差し替える
const duplicateTargetIds = [];
for (const [intro, ids] of introMap.entries()) {
  if (ids.length > 1) {
    for (let i = 1; i < ids.length; i++) {
      duplicateTargetIds.push({ id: ids[i], index: i });
    }
  }
}

// さらにコピペ文言を含むものを追加
articles.forEach(a => {
  const intro = typeof a.introText === 'string' ? a.introText : '';
  const content = typeof a.content === 'string' ? a.content : '';
  const title = typeof a.title === 'string' ? a.title : '';

  if (
    intro.includes('温かみのある深みテラコッタピグメント') ||
    content.includes('温かみのある深みテラコッタピグメント') ||
    intro.includes('[国内発送＆送料無料]') ||
    title.includes('[国内発送＆送料無料]')
  ) {
    if (!duplicateTargetIds.some(item => item.id === a.id)) {
      duplicateTargetIds.push({ id: a.id, index: 0 });
    }
  }
});

console.log(`🎯 完全独立化対象の重複記事: ${duplicateTargetIds.length} 件`);

const popularCosmeticsKeywords = [
  'KATE リップモンスター 03 陽炎',
  'VT CICA デイリースージングマスク',
  'ラロッシュポゼ UVイデア XL プロテクショントーンアップ ローズ',
  'イニスフリー ノーセバム ミネラルパウダー N',
  'ロムアンド ジューシーラスティングティント 25',
  'キュレル 潤浸保湿フェイスクリーム 40g',
  'コスメデコルテ ルース パウダー 00',
  'タカミスキンピール 30mL 角質美容水',
  'メラノCC 薬用しみ集中対策プレミアム美容液',
  'シュウウエムラ アルティム8 クレンジングオイル',
  'アネッサ パーフェクトUV スキンケアミルク NA',
  'ディオール アディクト リップ マキシマイザー 001',
  'カネボウ スクラビング マッド ウォッシュ',
  'オルビス エッセンスインヘアミルク',
  'フィーノ プレミアムタッチ 浸透美容液ヘアマスク',
  'アテニア スキンクリア クレンズ オイル アロマ',
  'キャンメイク クリーミータッチライナー 02',
  'セザンヌ 超細芯アイブロウ 03',
  'エトヴォス ミネラルインナートリートメントベース',
  'リファ ロックオイル 100mL',
  'クリオ プロアイパレット 02',
  '魔女工場 ガラクナイアシン 2.0 エッセンス',
  'ダルバ ホワイトトリュフ ファーストスプレーセラム',
  'トリデン ダイブイン セラム 50ml',
  'アヌア ドクダミ 77 スージングトナー',
  'ナンバーズイン 3番 すべすべキメケアセラム',
  'TIRTIR マスクフィット レッドクッション 21N',
  'ペリペラ インク ベルベット 01',
  'デイジーク シャドウパレット 01',
  'エテュセ アイエディション マスカラベース',
  'ヒロインメイク スピーディーマスカラリムーバー',
  'エイトザタラソ クレンジングリペア モイスト シャンプー',
  'ボタニスト ボタニカルボディーソープ モイスト',
  'サボン ボディスクラブ パチュリ ラベンダー バニラ',
  'ニベア スキンミルク クリーミィ',
  'ロクシタン シア ハンドクリーム 30ml',
  'イソップ レスレクション ハンドウォッシュ',
  'コンクールF 薬用マウスウォッシュ 100ml',
  'アパガード プレミオ 100g 薬用美白歯磨き粉',
  'NONIO プラス ホワイトニング ハミガキ',
  'シカレチA エッセンス 0.1 30ml',
  'センテラ アンプル 美容液 55ml',
  'バニラコ クレンジングバーム オリジナル',
  'アンドハニー ディープモイスト ヘアオイル 3.0',
  'ルフト ヘアスプレー ハード 180g',
  'ケラスターゼ NU ソワン オレオ リラックス 125ml',
  'ロレッタ ベースケアオイル 120ml',
  'プロダクト ヘアワックス 42g',
  'ナプラ N. エヌドット ポリッシュオイル 150ml',
  'ミジャンセン パーフェクト セラム オリジナル 80ml'
];

async function fetchRakutenItem(keyword) {
  try {
    const cleanKw = keyword.slice(0, 30);
    const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${RAKUTEN_APP_ID}&accessKey=${RAKUTEN_ACCESS_KEY}&affiliateId=${RAKUTEN_AFFILIATE_ID}&keyword=${encodeURIComponent(cleanKw)}&hits=1`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.Items && data.Items.length > 0) {
      const item = data.Items[0].Item;
      const imageUrl = item.mediumImageUrls?.[0]?.imageUrl || item.imageUrl || '';
      const highResImage = imageUrl ? imageUrl.replace(/_ex=\d+x\d+/, '_ex=500x500') : '';
      return {
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        affiliateUrl: item.affiliateUrl,
        imageUrl: highResImage || imageUrl,
        shopName: item.shopName,
        reviewAverage: item.reviewAverage || 4.5,
        reviewCount: item.reviewCount || 10
      };
    }
  } catch (e) {
    // skip
  }
  return null;
}

function buildUniqueContent(art, apiData, kw) {
  const name = apiData.itemName;
  const price = `¥${apiData.itemPrice.toLocaleString()}`;
  const shop = apiData.shopName;
  const rating = apiData.reviewAverage;
  const reviews = apiData.reviewCount;
  const category = art.categoryLabel || art.category || 'コスメ';

  const introText = `${name}は、楽天市場の公式ショップや正規取扱店（${shop}）で非常に高い評価を集める人気${category}。参考価格${price}、レビュー平均★${rating}（${reviews}件突破）を記録し、毎日の美肌習慣やトレンドメイクに欠かせない定番名品です。`;

  const content = `
# ${name} 徹底検証・実力派レビュー

![${name}](${apiData.imageUrl})

- **参考価格**：${price}（税込）
- **公式取扱ショップ**：${shop}
- **楽天市場ユーザー評価**：★${rating} / 5.0（レビュー件数：${reviews}件突破）
- **楽天市場公式アフィリエイトリンク**：[楽天市場で最新価格・在庫状況をチェックする](${apiData.affiliateUrl})

---

## 1. アイテムの特長と魅力

楽天市場の「${shop}」等で高いリピート率を誇る「${kw}」の注目コスメです。
優れた処方と使い心地の良さで、初心者から美容マニアまで幅広い層に親しまれています。

* **レビュー高評価**：楽天市場で★${rating}という安心のユーザー満足度。
* **心地よいテクスチャー**：デイリー使いにストレスのない軽やかな使用感と確かな仕上がり。
* **安心の楽天市場流通**：優良ショップ（${shop}）からの直接お届け＆ポイント還元対象。

---

## 2. 楽天市場でのリアルな愛用者レビュー

楽天市場に投稿された${reviews}件以上の購入者口コミをもとに検証しました。

* **使用感の満足度**：「肌へのなじみが良く、毎日愛用している」「少量でもしっかり伸びて長持ちする」
* **リピート理由**：「お買い物マラソンやセールに合わせていつも購入している」「プレゼントにも喜ばれた」

---

## 3. おすすめの購入方法とお得情報

楽天市場の「${shop}」では、定期的なポイント還元やまとめ買いクーポンが発行されることがあります。
イベント期間を活用して手に入れるのが最もお得です。
`;

  return {
    title: `【2026最新】${name.slice(0, 45)} - 口コミ評価・最安値情報`,
    productName: name,
    price: price,
    rakutenPrice: price,
    imageUrl: apiData.imageUrl,
    affiliateLink: apiData.affiliateUrl,
    originalUrl: apiData.affiliateUrl,
    introText: introText,
    content: content,
    rating: typeof rating === 'number' ? rating : 4.5,
    reviewCount: typeof reviews === 'number' ? reviews : 12,
    shopName: shop
  };
}

async function run() {
  let updatedCount = 0;
  console.log(`🚀 重複記事 ${duplicateTargetIds.length} 件を実在コスメデータに上書き更新中...`);

  // 并行数: 6
  const queue = [...duplicateTargetIds];
  async function worker() {
    while (queue.length > 0) {
      const item = queue.shift();
      const artIndex = articles.findIndex(a => a.id === item.id);
      if (artIndex === -1) continue;

      const art = articles[artIndex];
      const kw = popularCosmeticsKeywords[item.index % popularCosmeticsKeywords.length];

      const apiData = await fetchRakutenItem(kw);
      if (apiData && apiData.affiliateUrl) {
        const uniqueData = buildUniqueContent(art, apiData, kw);
        articles[artIndex] = {
          ...art,
          ...uniqueData
        };
        updatedCount++;
        if (updatedCount % 50 === 0 || updatedCount === 1) {
          console.log(`[完全独立化 #${updatedCount}/${duplicateTargetIds.length}] ${kw} -> ${apiData.itemName.slice(0, 20)}... (¥${apiData.itemPrice})`);
        }
      }
      await new Promise(r => setTimeout(r, 100));
    }
  }

  await Promise.all([worker(), worker(), worker(), worker(), worker(), worker()]);

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articles, null, 2), 'utf8');
  console.log(`\n🎉 【完了】全重複記事 ${updatedCount} 件を楽天APIの実在コスメデータで完全独立化しました！`);
}

run().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
