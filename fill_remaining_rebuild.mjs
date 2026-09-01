import fs from 'fs';
import path from 'path';

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

function normalizeHard(name) {
  let s = name;
  s = s.replace(/【[^】]*】/g, ''); s = s.replace(/\[[^\]]*\]/g, '');
  s = s.replace(/（[^）]*）/g, ''); s = s.replace(/\([^)]*\)/g, '');
  s = s.replace(/＼[^／]*／/g, ''); s = s.replace(/★[^★]*★/g, '');
  s = s.replace(/ポイント\d+倍/g, ''); s = s.replace(/P\d+倍/g, '');
  s = s.replace(/送料無料/g, ''); s = s.replace(/公式/g, '');
  s = s.replace(/正規品/g, ''); s = s.replace(/国内/g, '');
  s = s.replace(/期間[^\s]*/g, ''); s = s.replace(/対象商品/g, '');
  s = s.replace(/全商品/g, ''); s = s.replace(/クーポン[^\s]*/g, '');
  s = s.replace(/\d+個セット/g, ''); s = s.replace(/\d+本セット/g, '');
  s = s.replace(/セット/g, ''); s = s.replace(/1\+1/g, '');
  s = s.replace(/詰め替え/g, ''); s = s.replace(/レフィル/g, '');
  s = s.replace(/\d+\.?\d*(mL|ml|g|kg|mg|cc|包|個|枚|本)/gi, '');
  s = s.replace(/[☆★◎●▲■□◆▼△▽♪♫♬※…！!？?・&\/|＆＄＃＊:：,，。.、;；～〜→←↑↓↔「」『』""'']/g, '');
  s = s.replace(/[\s\-_　]/g, '');
  return s.toLowerCase();
}

function isSameProduct(n1, n2) {
  if (n1.length < 4 || n2.length < 4) return false;
  if (n1 === n2) return true;
  if (n1.slice(0,12) === n2.slice(0,12) && n1.length >= 5) return true;
  if (n1.length >= 8 && n2.length >= 8 && (n1.includes(n2.slice(0,10)) || n2.includes(n1.slice(0,10)))) return true;
  return false;
}

const EXCLUDE_KEYWORDS = [
  'サポーター', '膝', 'ソックス', '靴下', 'カステラ', 'お菓子', 'コーヒー', '青汁',
  'ランドセル', 'ドレス', 'エプロン', '腕時計', '枕カバー', 'スマホケース', 'iphone',
  '保護フィルム', 'ガラスフィルム', 'イヤホン', '風呂ふた', 'チューブ絞り', '消臭元',
  'dvd', 'blu-ray', 'barfout', '24時間テレビ', 'スマートウォッチ', 'ダイエットサプリ',
  '円座', '足湯長靴', 'バンテリン', '詰め替えそのまま', 'ポンプとフック'
];

function isBeautyCosmetic(n) {
  const l = n.toLowerCase();
  for (const ex of EXCLUDE_KEYWORDS) if (l.includes(ex.toLowerCase())) return false;
  return true;
}

async function fetchDistinctItems(queries, existingNorms, existingImgs, needed) {
  const results = [];
  const seenNorms = [...existingNorms];
  const seenImgs = new Set(existingImgs);
  const seenUrls = new Set();
  for (const q of queries) {
    if (!q || q.length < 2 || results.length >= needed) continue;
    try {
      const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent(q)}&format=json&hits=30&sort=-reviewCount&imageFlag=1`;
      const res = await fetch(url);
      if (!res.ok) { await new Promise(r => setTimeout(r, 1000)); continue; }
      const data = await res.json();
      if (!data.Items || !data.Items.length) continue;
      for (const e of data.Items) {
        if (results.length >= needed) break;
        const item = e.Item || e;
        if (!item.itemName || !item.affiliateUrl) continue;
        if (!isBeautyCosmetic(item.itemName)) continue;
        let img = item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '';
        if (img.includes('thumbnail.image.rakuten.co.jp/@0_mall/'))
          img = img.replace('https://thumbnail.image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/').split('?_ex=')[0];
        else if (img.includes('tshop.r10s.jp/'))
          img = img.replace('https://tshop.r10s.jp/', 'https://shop.r10s.jp/');
        if (!img) continue;
        const norm = normalizeHard(item.itemName);
        const imgFile = img.split('?')[0].split('/').pop();
        const baseUrl = item.affiliateUrl.split('?')[0];
        let isDup = seenUrls.has(baseUrl) || (imgFile && seenImgs.has(imgFile));
        if (!isDup) for (const s of seenNorms) if (isSameProduct(norm, s)) { isDup = true; break; }
        if (!isDup) {
          seenNorms.push(norm); if (imgFile) seenImgs.add(imgFile); seenUrls.add(baseUrl);
          results.push({ itemName: item.itemName, shopName: item.shopName || '楽天市場', affiliateUrl: item.affiliateUrl, imageUrl: img, price: item.itemPrice ? `${item.itemPrice.toLocaleString()}円 (税込)` : '価格確認', priceNum: item.itemPrice || 0, reviewAvg: item.reviewAverage || 4.5, reviewCount: item.reviewCount || 0 });
        }
      }
    } catch (err) { console.warn(`⚠️ ${err.message}`); }
    await new Promise(r => setTimeout(r, 600));
  }
  return results;
}

function generateFeature(item, title, rank) {
  const r = item.reviewAvg || 4.5; const p = item.priceNum || 0;
  let cc = rank <= 3 ? '【実力派・注目の逸品】口コミ高評価で選ばれ続ける人気アイテム' : p < 1800 ? '【プチプラ最強コスパ】惜しみなく毎日使える大人気名品' : p >= 5000 ? '【極上ラグジュアリー】至高の使用感と上質なケア' : r >= 4.7 ? '【驚異の満足度★' + r.toFixed(1) + '】失敗知らずの神コスメ' : '【楽天市場ランキング上位】確かな実力と信頼の人気アイテム';
  const t = title;
  let d = '肌馴染み抜群の心地よいテクスチャーで、毎日の美容ルーティンを格上げする確かなクオリティです。';
  if (t.includes('リップ') || t.includes('唇') || t.includes('ティント')) d = '濃密な保湿成分が荒れがちな唇を瞬時にラッピング。ふっくら弾む血色美を長時間持続させます。';
  else if (t.includes('日焼け止め') || t.includes('UV') || t.includes('サンスクリーン')) d = '高いUVカット力と軽い付け心地を両立。白浮きせず、メイクの上からも塗り直しやすい使用感が魅力です。';
  else if (t.includes('コンシーラー')) d = '高密着フィルムがクマ・シミ・ニキビ跡を自然にカバー。素肌に溶け込む自然なツヤ肌を長時間キープします。';
  else if (t.includes('ファンデ') || t.includes('クッション') || t.includes('下地')) d = '微粒子パウダーが毛穴・色ムラを瞬時に補正。密着力が高く崩れにくい、一日中美しい仕上がりを実現します。';
  else if (t.includes('まつ毛') || t.includes('目元') || t.includes('眉') || t.includes('アイライナー') || t.includes('カーラー')) d = '汗・皮脂・擦れに強い高密着処方で、メイクしたての美しい仕上がりが長時間持続します。';
  else if (t.includes('シャンプー') || t.includes('頭皮') || t.includes('スカルプ') || t.includes('ヘア') || t.includes('トリートメント') || t.includes('ブラシ')) d = '頭皮と髪に必要な潤いを守りながら、皮脂汚れをすっきり洗浄。健やかな美髪へ導きます。';
  else if (t.includes('洗顔') || t.includes('クレンジング') || t.includes('毛穴') || t.includes('マスク') || t.includes('ソープ') || t.includes('パフ')) d = '頑固な毛穴汚れや古い角質をすっきりオフ。つっぱらず透明感のある素肌に仕上がります。';
  else if (t.includes('保湿') || t.includes('化粧水') || t.includes('乳液') || t.includes('スキンケア') || t.includes('セラミド') || t.includes('シカ') || t.includes('CICA')) d = '保湿成分が角層のバリア機能を立て直し、もちもち弾力肌を実現します。';
  else if (t.includes('オイル') || t.includes('ヘアオイル')) d = '天然由来のオイル成分が髪と肌に浸透し、サロン帰りのようなツヤとまとまりを叶えます。';
  else if (t.includes('シワ') || t.includes('エイジング') || t.includes('美容液') || t.includes('レチノール') || t.includes('リードル')) d = '有効成分を角層深くまで届け、ハリ・弾力の低下やシワにアプローチ。若々しい肌を叶えます。';
  else if (t.includes('デリケートゾーン') || t.includes('フェミニン')) d = 'デリケートゾーン専用の弱酸性処方でやさしく洗浄。不快感のない快適な毎日を叶えます。';
  else if (t.includes('ネイル') || t.includes('キューティクル')) d = '爪と甘皮に栄養を届け、乾燥による二枚爪やささくれを防止。健やかで美しい指先を保ちます。';
  else if (t.includes('ミスト') || t.includes('スプレー') || t.includes('キープ')) d = 'メイク仕上げにシュッとひと吹きで、汗・皮脂によるヨレや崩れを長時間防止。テカリ知らずの鉄壁キープ力です。';
  else if (t.includes('制汗') || t.includes('シーブリーズ')) d = '瞬間冷却＆制汗成分が汗やベタつきを瞬時にリフレッシュ。サラサラ快適な肌をキープします。';
  else if (t.includes('ハンドクリーム') || t.includes('手')) d = '荒れがちな手肌にすっと馴染む高保湿処方。しっとりなのにべたつかず、ネイル映えする美しい手元を叶えます。';
  else if (t.includes('首') || t.includes('デコルテ') || t.includes('ネック')) d = 'デリケートな首元・デコルテに浸透し、ベタつかずピンとしたハリを与えます。';
  else if (t.includes('韓国') || t.includes('K-POP') || t.includes('アイドル') || t.includes('サンリオ')) d = 'トレンド最先端の韓国発コスメ。SNSでも話題の高発色・高密着処方で、推し活メイクにも最適です。';
  return `<strong>【特徴】</strong> ${cc}！${d}`;
}

// 全体再構築方式
function rebuildContentWith10Items(article, allItems) {
  const today = '2026-08-31';
  const top10 = allItems.slice(0, 10);
  let table = `| 順位 | 商品名 | 価格帯 | 特徴・おすすめポイント | リンク |\n|:---:|:---|:---:|:---|:---:|\n`;
  top10.forEach((p, i) => {
    const sn = p.itemName.slice(0, 32).replace(/[|\[\]]/g, ' ');
    table += `| **${i+1}位** | **${sn}** | ${p.price || '価格確認'} | ★${p.reviewAvg}・高評価実力派 | [楽天市場で見る](${p.affiliateUrl}) |\n`;
  });
  let productsHtml = '';
  top10.forEach((p, i) => {
    const cn = p.itemName.replace(/[<>"']/g, '');
    const ft = generateFeature(p, article.title, i + 1);
    productsHtml += `\n---\n\n### 👑 第${i+1}位：${cn}\n\n<div class="product-card">\n  <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: center; margin: 16px 0;">\n    <img src="${p.imageUrl}" alt="${cn}" style="max-width: 200px; height: auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />\n    <div style="flex: 1; min-width: 240px;">\n      <p style="font-size: 1.25rem; font-weight: bold; color: #e11d48; margin-bottom: 8px;">実売価格: ${p.price || 'ショップ価格を参照'}</p>\n      <p style="font-size: 0.95rem; color: #475569; margin-bottom: 12px;"><strong>取扱ショップ:</strong> ${p.shopName} (★${p.reviewAvg} / レビュー${p.reviewCount}件)</p>\n      <a href="${p.affiliateUrl}" target="_blank" rel="nofollow noopener noreferrer" style="display: inline-block; background: #bf1e2e; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 14px rgba(191,30,46,0.35);">楽天市場で最安値・ポイント還元をチェック ❯</a>\n    </div>\n  </div>\n  <p style="color: #334155; line-height: 1.7; margin-top: 12px;">${ft}</p>\n</div>\n`;
  });
  const intro = article.description || '';
  const tagLabel = article.tags?.slice(0, 4).join(' ') || '厳選おすすめ';
  const title10 = article.title.replace(/\d+選/g, '10選');
  return { content: `# ${title10}\n\n${intro}\n\n---\n\n## 📱 【比較表】${tagLabel} 10選 一覧\n\n${table}\n${productsHtml}\n\n---\n\n## 📌 失敗しない選び方のポイント\n\n毎日のケアやお悩みに合わせて、成分表記や使用感、テクスチャーをチェックして選ぶのがポイントです。楽天市場の口コミレビューも参考にしてください。\n\n---\n\n## ❓ よくある質問（FAQ）\n\n### Q. 敏感肌でも使えますか？\n**A.** パッチテスト済みの低刺激処方のものがおすすめです。\n\n### Q. 毎日使っても大丈夫？\n**A.** 基本的にデイリーケアアイテムは毎日ご使用いただけます。\n\n---\n\n## 🎯 まとめ\n\n本記事では「${title10}」をテーマに、楽天市場の実売データと口コミに基づいた**本当におすすめできる独立した10商品**をご紹介しました。ぜひ気になったアイテムから試してみてください。\n`, title: title10 };
}

// 既存商品情報を抽出
function extractExistingItems(content) {
  const items = [];
  const blocks = content.split(/(?=### 👑 第\d+位：)/);
  for (const b of blocks) {
    const nameMatch = b.match(/### 👑 第\d+位：([^\n]+)/);
    if (!nameMatch) continue;
    const imgMatch = b.match(/<img[^>]+src="([^"]+)"/);
    const linkMatch = b.match(/href="(https:\/\/hb\.afl\.rakuten[^"]+)"/);
    const priceMatch = b.match(/実売価格: ([^\n<]+)/);
    const shopMatch = b.match(/取扱ショップ:<\/strong> ([^(]+)/);
    const ratingMatch = b.match(/★([\d.]+)/);
    const reviewMatch = b.match(/レビュー(\d+)件/);
    items.push({
      itemName: nameMatch[1].trim(),
      imageUrl: imgMatch ? imgMatch[1] : '',
      affiliateUrl: linkMatch ? linkMatch[1] : '',
      price: priceMatch ? priceMatch[1].trim() : '価格確認',
      priceNum: 0,
      shopName: shopMatch ? shopMatch[1].trim() : '楽天市場',
      reviewAvg: ratingMatch ? parseFloat(ratingMatch[1]) : 4.5,
      reviewCount: reviewMatch ? parseInt(reviewMatch[1]) : 0
    });
  }
  return items;
}

// 記事別の検索クエリ
const QUERY_MAP = {
  'art-peri-hair-serum-essence-repair-2026': ['ヘアセラム 美容液', 'ヘアエッセンス ダメージ補修', '洗い流さない トリートメント'],
  'art-peri-cleansing-oil-beauty-serum-2026': ['クレンジングオイル 美容', 'オイルクレンジング 保湿', 'クレンジング 毛穴'],
  'art-peri-overnight-lip-pack-repair-2026': ['リップパック 夜用', 'リップスリーピングマスク', 'ラネージュ リップ', '唇パック 保湿', 'リップマスク 寝る前'],
  'art-peri-gentle-moist-emulsion-ranking-2026': ['乳液 保湿 敏感肌', 'セラミド 乳液', '保湿乳液 しっとり'],
  'art-peri-leave-on-lip-scrub-stick-2026': ['リップスクラブ', 'リップスクラブ スティック', '唇 角質ケア', 'リップ ピーリング', 'リップバーム スクラブ'],
  'art-peri-neck-decollete-serum-firming-2026': ['ネッククリーム シワ', 'デコルテ 美容液', '首 シワ クリーム'],
  'art-peri-moist-foam-hand-soap-gentle-2026': ['ハンドソープ 泡 保湿', '泡ハンドソープ しっとり', 'ハンドウォッシュ 保湿', '手洗い 保湿 泡'],
  'art-peri-cushion-foundation-puffs-replacement-2026': ['クッションファンデ パフ 替え', 'メイクパフ クッション', 'パフ 替え スポンジ', 'メイクスポンジ 人気'],
  'art-peri-heated-eyelash-curler-usb-2026': ['ホットビューラー USB', 'まつ毛カーラー 電動', 'ホットアイラッシュカーラー'],
  'art-peri-uv-lip-cream-spf-ranking-2026': ['UVリップクリーム SPF', 'リップ 日焼け止め', '唇 UV ケア'],
  'art-peri-heat-protect-hair-oil-iron-2026': ['ヒートプロテクト ヘアオイル', 'ヘアアイロン用 スタイリング剤', '熱保護 ヘアオイル'],
  'art-peri-whitening-body-milk-lotion-2026': ['美白ボディミルク', 'ボディローション 美白', '美白 ボディクリーム'],
  'art-peri-hair-brush-cleaner-care-2026': ['ヘアブラシ クリーナー', 'ブラシ 洗浄', 'ヘアブラシ 掃除', 'ブラシクリーナー 楽天', 'メイクブラシ クリーナー', 'ブラシ 洗浄剤'],
  'art-peri-medicated-whitening-hand-cream-2026': ['美白ハンドクリーム', '薬用 ハンドクリーム 美白', 'ハンドクリーム シミ'],
  'art-peri-scalp-cleansing-oil-precare-2026': ['スカルプクレンジング オイル', '頭皮 オイル クレンジング', '頭皮ケア プレシャンプー'],
  'art-peri-eyebrow-mascara-bleach-effect-2026': ['眉マスカラ 脱色風', 'アイブロウマスカラ 明るい', '眉マスカラ 人気'],
  'art-peri-cica-cream-skin-calming-ranking-2026': ['シカクリーム', 'CICA クリーム', 'VT シカクリーム', 'シカバーム 保湿', 'ドクタージャルト シカペア'],
  'art-peri-lip-sleeping-mask-night-care-2026': ['リップスリーピングマスク', 'ラネージュ リップ', '夜用リップ 保湿', 'リップパック ナイト', 'リップマスク 楽天'],
  'art-peri-uv-stick-sunscreen-touch-up-2026': ['日焼け止めスティック', 'UVスティック', 'サンスティック 塗り直し', 'スティック 日焼け止め 楽天', '日焼け止め スティックタイプ'],
  'art-peri-makeup-keep-mist-spray-ranking-2026': ['メイクキープミスト', 'メイクキープスプレー', 'フィックスミスト', 'メイク固定 スプレー'],
  'art-peri-feminine-whitening-soap-cream-guide-2026': ['デリケートゾーン ソープ', 'フェミニンウォッシュ', 'デリケートゾーン 黒ずみ クリーム', 'デリケートゾーン ケア', 'フェミニンケア 楽天'],
  'art-sachiko-neck-decollete-hands-wrinkle-care': ['ネッククリーム', 'デコルテ クリーム', 'ハンドクリーム エイジング', '首 シワ改善 クリーム'],
  'art-sachiko-concealer-tekari-non-greasy-luxury': ['コンシーラー テカリ防止', 'コンシーラー 崩れない', 'コンシーラー 高級', 'デパコス コンシーラー'],
  'art-sachiko-kpop-idol-makeup-ambassador-guide': ['韓国コスメ 人気', 'K-POP コスメ', '韓国 アイドル コスメ', 'HERA ファンデ', 'espoir コスメ', 'ロムアンド リップ', '3CE アイシャドウ', 'peripera ティント'],
  'art-sachiko-self-lash-perm-ranking': ['まつ毛パーマキット セルフ', 'まつパ キット', 'まつげパーマ セルフ', 'ラッシュリフト キット', 'まつ毛 パーマ液'],
  'art-sachiko-vt-reedleshot-effects-truth': ['VT リードルショット', 'リードルショット 100', 'VT コスメ', 'VT CICA デイリースージングマスク'],
  'art-wf-megane-hanaate-skin-care-2026': ['鼻パッド 保護', 'メガネ 鼻あて パッド', 'メガネ跡 防止', 'ノーズパッド シリコン'],
  'art-wf-30s-keana-foundation-2026': ['毛穴 ファンデーション', '30代 ファンデ', '毛穴カバー ファンデ', 'ファンデーション 毛穴落ちしない'],
  'art-wf-kansouhada-kuzurenai-foundation-2026': ['乾燥肌 ファンデーション', '崩れない ファンデ 乾燥', '保湿 ファンデーション'],
  'art-cosme-shoshinsha-set-starter-2026': ['コスメ セット 初心者', 'メイク スターターキット', 'コスメ セット 楽天', 'メイク 初心者 セット', 'スキンケア セット ギフト'],
  'art-cosme-uv-summer-2026-best10': ['日焼け止め 夏 人気', 'UVケア 楽天', '日焼け止め ランキング', 'サンスクリーン 人気'],
  'art-womens-lip-care-dryness-10-ranking-comparison-2026': ['リップケア 女性', 'リップクリーム 保湿', '唇 美容液', 'リップバーム 人気'],
  'art-mens-lip-care-dryness-10-ranking-comparison-2026': ['メンズ リップクリーム', '男性 リップ 保湿', 'メンズ リップバーム']
};

async function main() {
  const shortIds = [
    'art-peri-hair-serum-essence-repair-2026','art-peri-cleansing-oil-beauty-serum-2026',
    'art-peri-overnight-lip-pack-repair-2026','art-peri-gentle-moist-emulsion-ranking-2026',
    'art-peri-leave-on-lip-scrub-stick-2026','art-peri-neck-decollete-serum-firming-2026',
    'art-peri-moist-foam-hand-soap-gentle-2026','art-peri-cushion-foundation-puffs-replacement-2026',
    'art-peri-heated-eyelash-curler-usb-2026','art-peri-uv-lip-cream-spf-ranking-2026',
    'art-peri-heat-protect-hair-oil-iron-2026','art-peri-whitening-body-milk-lotion-2026',
    'art-peri-hair-brush-cleaner-care-2026','art-peri-medicated-whitening-hand-cream-2026',
    'art-peri-scalp-cleansing-oil-precare-2026','art-peri-eyebrow-mascara-bleach-effect-2026',
    'art-peri-cica-cream-skin-calming-ranking-2026','art-peri-lip-sleeping-mask-night-care-2026',
    'art-peri-uv-stick-sunscreen-touch-up-2026','art-peri-makeup-keep-mist-spray-ranking-2026',
    'art-peri-feminine-whitening-soap-cream-guide-2026',
    'art-sachiko-neck-decollete-hands-wrinkle-care','art-sachiko-concealer-tekari-non-greasy-luxury',
    'art-sachiko-kpop-idol-makeup-ambassador-guide','art-sachiko-self-lash-perm-ranking',
    'art-sachiko-vt-reedleshot-effects-truth',
    'art-wf-megane-hanaate-skin-care-2026','art-wf-30s-keana-foundation-2026',
    'art-wf-kansouhada-kuzurenai-foundation-2026',
    'art-cosme-shoshinsha-set-starter-2026','art-cosme-uv-summer-2026-best10',
    'art-womens-lip-care-dryness-10-ranking-comparison-2026',
    'art-mens-lip-care-dryness-10-ranking-comparison-2026'
  ];

  console.log(`🚀 残り${shortIds.length}記事を全体再構築方式で10商品に補充開始！`);

  let fixed = 0;
  for (let i = 0; i < shortIds.length; i++) {
    const id = shortIds[i];
    const idx = articlesData.findIndex(a => a.id === id);
    if (idx === -1) continue;
    const art = articlesData[idx];
    const currentCount = (art.content.match(/### 👑 第\d+位/g) || []).length;
    if (currentCount >= 10) { console.log(`[${i+1}] ${id}: 既に10商品 → スキップ`); continue; }

    console.log(`\n[${i+1}/${shortIds.length}] ${id} (現在${currentCount}商品)`);

    // 既存商品を取得
    const existingItems = extractExistingItems(art.content);
    const existingNorms = existingItems.map(it => normalizeHard(it.itemName));
    const existingImgs = new Set();
    existingItems.forEach(it => { const f = it.imageUrl.split('?')[0].split('/').pop(); if (f) existingImgs.add(f); });

    const needed = 10 - existingItems.length;
    const queries = QUERY_MAP[id] || [];
    // フォールバックでタグやタイトルからも生成
    if (queries.length === 0) {
      const tags = art.tags || [];
      if (tags.length) queries.push(tags.join(' '));
      const clean = art.title.replace(/【[^】]*】/g, '').replace(/\d+選.*/g, '').trim();
      queries.push(clean);
    }

    const newItems = await fetchDistinctItems(queries, existingNorms, existingImgs, needed);
    const allItems = [...existingItems, ...newItems];

    if (allItems.length < 10) {
      console.warn(`  ⚠️ ${allItems.length}商品しか確保できず (不足${10 - allItems.length})`);
    }

    // 全体再構築
    const { content, title } = rebuildContentWith10Items(art, allItems);
    articlesData[idx].content = content;
    articlesData[idx].title = title;
    articlesData[idx].itemCount = Math.min(allItems.length, 10);
    articlesData[idx].image = allItems[0]?.imageUrl || art.image;

    console.log(`  ✅ 全体再構築完了 → ${Math.min(allItems.length, 10)}商品`);
    fixed++;
    await new Promise(r => setTimeout(r, 500));
  }

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
  console.log(`\n🎉 ${fixed}記事を全体再構築方式で10商品に補充完了！`);
}

main().catch(err => { console.error('❌', err); process.exit(1); });
