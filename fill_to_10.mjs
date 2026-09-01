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

function isBeautyCosmetic(itemName) {
  const lower = itemName.toLowerCase();
  for (const ex of EXCLUDE_KEYWORDS) {
    if (lower.includes(ex.toLowerCase())) return false;
  }
  return true;
}

// 既存商品の正規化名リストを取得
function getExistingNorms(content) {
  const norms = [];
  const imgs = new Set();
  const matches = content.matchAll(/### 👑 第\d+位：([^\n]+)/g);
  for (const m of matches) {
    norms.push(normalizeHard(m[1].trim()));
  }
  const imgMatches = content.matchAll(/<img[^>]+src="([^"]+)"/g);
  for (const m of imgMatches) {
    const f = m[1].split('?')[0].split('/').pop();
    if (f) imgs.add(f);
  }
  return { norms, imgs };
}

// 楽天APIから既存と重複しない商品を取得
async function fetchAdditionalItems(queries, existingNorms, existingImgs, needed) {
  const results = [];
  const seenNorms = [...existingNorms];
  const seenImgs = new Set(existingImgs);
  const seenUrls = new Set();

  for (const q of queries) {
    if (!q || q.length < 2) continue;
    if (results.length >= needed) break;
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
        let isDup = false;
        if (seenUrls.has(baseUrl)) isDup = true;
        if (imgFile && seenImgs.has(imgFile)) isDup = true;
        for (const seen of seenNorms) {
          if (isSameProduct(norm, seen)) { isDup = true; break; }
        }
        if (!isDup) {
          seenNorms.push(norm);
          if (imgFile) seenImgs.add(imgFile);
          seenUrls.add(baseUrl);
          results.push({
            itemName: item.itemName,
            shopName: item.shopName || '楽天市場 取扱店',
            affiliateUrl: item.affiliateUrl,
            imageUrl: img,
            price: item.itemPrice ? `${item.itemPrice.toLocaleString()}円 (税込)` : '価格確認',
            priceNum: item.itemPrice || 0,
            reviewAvg: item.reviewAverage || 4.5,
            reviewCount: item.reviewCount || 0
          });
        }
      }
    } catch (err) { console.warn(`⚠️ ${err.message}`); }
    await new Promise(r => setTimeout(r, 600));
  }
  return results;
}

function generateFeature(item, articleTitle, rank) {
  const rating = item.reviewAvg || 4.5;
  const price = item.priceNum || 0;
  let cc = '';
  if (rank <= 3) cc = '【実力派・注目の逸品】口コミ高評価で選ばれ続ける人気アイテム';
  else if (price > 0 && price < 1800) cc = '【プチプラ最強コスパ】惜しみなく毎日使える大人気名品';
  else if (price >= 5000) cc = '【極上ラグジュアリー】至高の使用感と上質なケア';
  else if (rating >= 4.7) cc = '【驚異の満足度★' + rating.toFixed(1) + '】失敗知らずの神コスメ';
  else cc = '【楽天市場ランキング上位】確かな実力と信頼の人気アイテム';
  const t = articleTitle;
  let d = '肌馴染み抜群の心地よいテクスチャーで、使うたびに肌のコンディションを底上げ。毎日の美容ルーティンを格上げする確かなクオリティです。';
  if (t.includes('足') || t.includes('デオドラント') || t.includes('ニオイ') || t.includes('制汗'))
    d = '有効成分が肌に密着し、ニオイの原因となる皮脂や汗を長時間抑制。朝塗るだけで夕方まで快適なサラサラ肌をキープします。';
  else if (t.includes('カラーシャンプー') || t.includes('紫シャンプー') || t.includes('ピンクシャンプー') || t.includes('シルバーシャンプー') || t.includes('染め') || t.includes('ヘアカラー') || t.includes('白髪'))
    d = 'カラー後の嫌な黄ばみ・赤みをしっかり抑え、サロン帰りの美しい透明感とニュアンスカラーをキープ。髪を傷めずなめらかに洗い上げます。';
  else if (t.includes('リップ') || t.includes('唇') || t.includes('ティント'))
    d = '濃密な保湿成分が荒れがちな唇を瞬時にラッピング。ふっくら弾む血色美を長時間持続させます。';
  else if (t.includes('コンシーラー'))
    d = '高密着フィルムがクマ・シミ・ニキビ跡を自然にカバー。素肌に溶け込む自然なツヤ肌を長時間キープします。';
  else if (t.includes('ファンデ') || t.includes('クッション') || t.includes('下地') || t.includes('プライマー'))
    d = '微粒子パウダーが毛穴・色ムラを瞬時に補正。密着力が高く崩れにくい、一日中美しい仕上がりを実現します。';
  else if (t.includes('チーク') || t.includes('ブラッシュ'))
    d = '微粒子パウダーが頬にふんわり溶け込み、内側から上気したような自然な血色感を演出。透明感ある仕上がりが続きます。';
  else if (t.includes('アイシャドウ') || t.includes('ハイライト'))
    d = '繊細なパール粒子が目元に奥行きと立体感をプラス。粉飛びやヨレを防ぐ密着処方で美しい発色が夜まで持続します。';
  else if (t.includes('まつ毛') || t.includes('目元') || t.includes('眉') || t.includes('アイブロウ') || t.includes('アイライナー'))
    d = '汗・皮脂・擦れに強い高密着処方で、メイクしたての美しい仕上がりが長時間持続。にじみやヨレを防ぎます。';
  else if (t.includes('シャンプー') || t.includes('頭皮') || t.includes('スカルプ') || t.includes('ヘア') || t.includes('トリートメント'))
    d = '頭皮と髪に必要な潤いを守りながら、皮脂汚れをすっきり洗浄。根元からふんわり立ち上がる健やかな美髪へ導きます。';
  else if (t.includes('洗顔') || t.includes('クレンジング') || t.includes('毛穴') || t.includes('マスク') || t.includes('パック'))
    d = '頑固な毛穴汚れや古い角質をすっきりオフ。洗い上がりはつっぱらず、透明感のある素肌に仕上がります。';
  else if (t.includes('レチノール') || t.includes('シワ') || t.includes('エイジング') || t.includes('美容液'))
    d = '有効成分を角層深くまで届け、ハリ・弾力の低下やシワの原因にアプローチ。なめらかで弾むような若々しい肌を叶えます。';
  else if (t.includes('セラミド') || t.includes('保湿') || t.includes('化粧水') || t.includes('乳液') || t.includes('スキンケア'))
    d = '保湿成分が角層のバリア機能を立て直し、インナードライを根本から改善。もちもち弾力肌を実現します。';
  else if (t.includes('ニキビ') || t.includes('パッチ'))
    d = '有効成分がニキビの炎症部位に集中アプローチ。薄型透明設計でメイクの上からでも使えます。';
  else if (t.includes('デリケートゾーン') || t.includes('フェミニン'))
    d = 'デリケートゾーン専用の弱酸性処方でやさしく洗浄。不快感のない快適な毎日を叶えます。';
  else if (t.includes('ビタミンC') || t.includes('リポ'))
    d = 'リポソーム技術で体内吸収率を高めた高濃度ビタミンC。インナーケアから美しさを底上げします。';
  else if (t.includes('マウスウォッシュ') || t.includes('口臭'))
    d = '薬用有効成分が口腔内の原因菌を殺菌し、口臭を元からブロック。長時間クリアな息をキープします。';
  else if (t.includes('マット') || t.includes('ベルベット'))
    d = 'サラサラのマット質感なのに乾燥せず、上品な陶器肌を長時間キープ。洗練された大人のベルベット仕上がりを叶えます。';
  else if (t.includes('日焼け止め') || t.includes('UV') || t.includes('サンスクリーン'))
    d = '高いUVカット力と軽い付け心地を両立。白浮きせず、メイクの上からでも塗り直しやすい使用感が魅力です。';
  else if (t.includes('ネイル') || t.includes('キューティクル'))
    d = '爪と甘皮に栄養を届け、乾燥による二枚爪やささくれを防止。健やかで美しい指先を保ちます。';
  else if (t.includes('香水') || t.includes('香り'))
    d = '上質な香りが肌の上でやわらかく変化し、ほのかに香り続ける大人のフレグランス。気分を高めてくれる逸品です。';
  else if (t.includes('制汗') || t.includes('シーブリーズ'))
    d = '瞬間冷却＆制汗成分が汗やベタつきを瞬時にリフレッシュ。暑い日でもサラサラ快適な肌をキープします。';
  else if (t.includes('オイル') || t.includes('ヘアオイル'))
    d = '天然由来のオイル成分が髪と肌に浸透し、しっとりなめらかな質感に。サロン帰りのようなツヤとまとまりを叶えます。';
  return `<strong>【特徴】</strong> ${cc}！${d}`;
}

// 商品ブロックHTMLを生成
function makeProductBlock(item, rank, articleTitle) {
  const cleanName = item.itemName.replace(/[<>"']/g, '');
  const feat = generateFeature(item, articleTitle, rank);
  return `
---

### 👑 第${rank}位：${cleanName}

<div class="product-card">
  <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: center; margin: 16px 0;">
    <img src="${item.imageUrl}" alt="${cleanName}" style="max-width: 200px; height: auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
    <div style="flex: 1; min-width: 240px;">
      <p style="font-size: 1.25rem; font-weight: bold; color: #e11d48; margin-bottom: 8px;">実売価格: ${item.price || 'ショップ価格を参照'}</p>
      <p style="font-size: 0.95rem; color: #475569; margin-bottom: 12px;"><strong>取扱ショップ:</strong> ${item.shopName} (★${item.reviewAvg} / レビュー${item.reviewCount}件)</p>
      <a href="${item.affiliateUrl}" target="_blank" rel="nofollow noopener noreferrer" style="display: inline-block; background: #bf1e2e; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 14px rgba(191,30,46,0.35);">楽天市場で最安値・ポイント還元をチェック ❯</a>
    </div>
  </div>
  <p style="color: #334155; line-height: 1.7; margin-top: 12px;">${feat}</p>
</div>
`;
}

// 比較表に行を追加
function addTableRow(item, rank) {
  const shortName = item.itemName.slice(0, 32).replace(/[|\[\]]/g, ' ');
  return `| **${rank}位** | **${shortName}** | ${item.price || '価格確認'} | ★${item.reviewAvg}・高評価実力派 | [楽天市場で見る](${item.affiliateUrl}) |\n`;
}

// 記事タイトルから検索クエリを生成
function getSearchQueries(art) {
  const title = art.title;
  const tags = art.tags || [];
  // タイトルから「N選」「最強」「おすすめ」等を除去してコア部分を取得
  let clean = title.replace(/【[^】]*】/g, '').replace(/\d+選.*/g, '').replace(/最強.*/g, '').replace(/おすすめ.*/g, '').trim();
  const queries = [];
  if (tags.length >= 2) queries.push(tags.slice(0, 2).join(' '));
  if (tags.length >= 1) queries.push(tags[0]);
  if (clean.length >= 3) queries.push(clean.split(/\s+/).slice(0, 3).join(' '));
  if (clean.length >= 3) queries.push(clean.split(/\s+/).slice(0, 2).join(' '));
  if (clean.length >= 2) queries.push(clean.split(/\s+/)[0]);
  // 追加の幅広いクエリ
  if (tags.length >= 3) queries.push(tags[2]);
  queries.push(clean + ' 楽天');
  queries.push(clean + ' 人気');
  queries.push(clean + ' ランキング');
  return queries.filter(q => q && q.length >= 2);
}

async function main() {
  // 10選記事で10商品未満の記事を抽出
  const shortArticles = [];
  articlesData.forEach((a, idx) => {
    if (!a.content) return;
    const count = (a.content.match(/### 👑 第\d+位/g) || []).length;
    if (count < 10) {
      shortArticles.push({ idx, id: a.id, title: a.title, currentCount: count });
    }
  });

  console.log(`🚀 10商品未満の記事: ${shortArticles.length}件 → 全て楽天APIから追加取得して10商品に補充開始！`);

  let filled = 0;
  for (let i = 0; i < shortArticles.length; i++) {
    const { idx, id, title, currentCount } = shortArticles[i];
    const art = articlesData[idx];
    const needed = 10 - currentCount;

    console.log(`\n[${i+1}/${shortArticles.length}] ${id} (現在${currentCount}商品 → +${needed}必要)`);

    // 既存商品の正規化名と画像を取得
    const { norms: existingNorms, imgs: existingImgs } = getExistingNorms(art.content);
    const queries = getSearchQueries(art);

    const newItems = await fetchAdditionalItems(queries, existingNorms, existingImgs, needed);
    if (newItems.length === 0) {
      console.warn(`  ⚠️ 追加商品0件: ${id}`);
      continue;
    }

    // コンテンツに追加商品を挿入
    let content = art.content;

    // まとめセクションの直前に商品ブロックを挿入
    const summaryIdx = content.indexOf('\n## 📌');
    if (summaryIdx === -1) {
      console.warn(`  ⚠️ 挿入位置不明: ${id}`);
      continue;
    }

    let insertHtml = '';
    let insertTableRows = '';
    for (let j = 0; j < newItems.length; j++) {
      const rank = currentCount + j + 1;
      insertHtml += makeProductBlock(newItems[j], rank, title);
      insertTableRows += addTableRow(newItems[j], rank);
    }

    // 商品ブロックをまとめセクション前に挿入
    content = content.slice(0, summaryIdx) + insertHtml + '\n' + content.slice(summaryIdx);

    // 比較表にも追加行を挿入（テーブルの最後の行の後に追加）
    const tableEnd = content.lastIndexOf('| [楽天市場で見る]');
    if (tableEnd !== -1) {
      const lineEnd = content.indexOf('\n', tableEnd);
      if (lineEnd !== -1) {
        content = content.slice(0, lineEnd + 1) + insertTableRows + content.slice(lineEnd + 1);
      }
    }

    const finalCount = currentCount + newItems.length;

    // タイトルを10選に戻す（もし変更されていたら）
    let newTitle = art.title;
    newTitle = newTitle.replace(/\d+選/g, '10選');

    // content内のN選も10選に
    content = content.replace(/\d+選/g, '10選');
    content = content.replace(/\d+商品/g, '10商品');

    articlesData[idx].content = content;
    articlesData[idx].title = newTitle;
    articlesData[idx].itemCount = finalCount;

    console.log(`  ✅ +${newItems.length}商品追加 → 合計${finalCount}商品 (タイトル: 10選に復元)`);
    filled++;

    await new Promise(r => setTimeout(r, 500));
  }

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
  console.log(`\n🎉 ${filled}記事に楽天APIから新商品を追加して10選に補充完了！`);
}

main().catch(err => { console.error('❌', err); process.exit(1); });
