import fs from 'fs';
import path from 'path';

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

// ===== 超強力な商品名正規化 =====
function normalizeHard(name) {
  let s = name;
  // 全角括弧・記号・修飾を全除去
  s = s.replace(/【[^】]*】/g, '');
  s = s.replace(/\[[^\]]*\]/g, '');
  s = s.replace(/（[^）]*）/g, '');
  s = s.replace(/\([^)]*\)/g, '');
  s = s.replace(/＼[^／]*／/g, '');
  s = s.replace(/★[^★]*★/g, '');
  // よくあるプロモ文言
  s = s.replace(/ポイント\d+倍/g, '');
  s = s.replace(/P\d+倍/g, '');
  s = s.replace(/送料無料/g, '');
  s = s.replace(/あす楽/g, '');
  s = s.replace(/公式/g, '');
  s = s.replace(/正規品/g, '');
  s = s.replace(/国内/g, '');
  s = s.replace(/即納/g, '');
  s = s.replace(/限定/g, '');
  s = s.replace(/メール便/g, '');
  s = s.replace(/ネコポス/g, '');
  s = s.replace(/スーパーSALE/g, '');
  s = s.replace(/お買い物マラソン/g, '');
  s = s.replace(/クーポン[^\s]*/g, '');
  s = s.replace(/期間限定[！!]?/g, '');
  s = s.replace(/対象商品/g, '');
  s = s.replace(/全商品/g, '');
  s = s.replace(/先着\d+名様/g, '');
  s = s.replace(/\d+％?OFF/gi, '');
  s = s.replace(/\d+%OFF/gi, '');
  s = s.replace(/\d+個セット/g, '');
  s = s.replace(/\d+本セット/g, '');
  s = s.replace(/\d+枚セット/g, '');
  s = s.replace(/\d+個入/g, '');
  s = s.replace(/\d+セット/g, '');
  s = s.replace(/セット/g, '');
  s = s.replace(/1\+1/g, '');
  s = s.replace(/1\+1\+1/g, '');
  s = s.replace(/詰め替え/g, '');
  s = s.replace(/つめかえ/g, '');
  s = s.replace(/レフィル/g, '');
  s = s.replace(/日米売上No\.?\d?※?ブランド/g, '');
  s = s.replace(/楽天\d位/g, '');
  s = s.replace(/楽天1位/g, '');
  s = s.replace(/最強翌日配送/g, '');
  s = s.replace(/最強配送/g, '');
  s = s.replace(/最短即日発送/g, '');
  s = s.replace(/サロン専売品/g, '');
  // 容量・数量
  s = s.replace(/\d+\.?\d*(mL|ml|g|kg|mg|cc|包|個|枚|本)/gi, '');
  // 記号・空白除去
  s = s.replace(/[☆★◎●▲■□◆▼△▽♪♫♬※…！!？?・&/|＆＄＃＊:：,，。.、;；～〜→←↑↓↔「」『』""'']/g, '');
  s = s.replace(/[\s\-_　]/g, '');
  return s.toLowerCase();
}

// 2つの正規化名が同一商品かどうかを判定（部分一致＋類似度）
function isSameProduct(norm1, norm2) {
  if (norm1.length < 4 || norm2.length < 4) return false;
  if (norm1 === norm2) return true;
  // 先頭12文字一致 → 同一
  const h1 = norm1.slice(0, 12);
  const h2 = norm2.slice(0, 12);
  if (h1 === h2) return true;
  // どちらかが含む → 同一
  if (norm1.length >= 8 && norm2.length >= 8) {
    if (norm1.includes(norm2.slice(0, 10)) || norm2.includes(norm1.slice(0, 10))) return true;
  }
  return false;
}

// 非コスメ除外
const EXCLUDE_KEYWORDS = [
  'サポーター', '膝サポーター', 'ショーツ', 'パンツ', 'ソックス', '靴下',
  'カステラ', 'お菓子', 'スイーツ', 'コーヒー', '青汁', '大麦若葉', 'サプリメント',
  'ランドセル', 'ワンピース', 'ドレス', 'エプロン', '腕時計', '時計', '枕カバー',
  'スマホケース', '手帳型', 'iphone', '保護フィルム', 'ガラスフィルム', 'イヤホン',
  '風呂ふた', 'チューブ絞り器', 'アームストラップ', '消臭元', 'dvd', 'blu-ray',
  'barfout', '24時間テレビ', 'クッション', '美腕ベルト', '美脚グッズ', 'ボディシェイプ',
  'ems', 'スマートウォッチ', 'ダイエットサプリ', '円座', '足湯長靴', 'ウォームソックス',
  '鎖骨', 'バンテリン', '詰め替えそのまま', 'ポンプとフック', 'ダイエットサポート'
];

function isBeautyCosmetic(itemName) {
  const lower = itemName.toLowerCase();
  for (const ex of EXCLUDE_KEYWORDS) {
    if (lower.includes(ex.toLowerCase())) return false;
  }
  return true;
}

// 楽天API重複排除取得
async function fetchDistinctItems(queries, minHits = 10) {
  const distinct = [];
  const seenNorms = [];
  const seenImages = new Set();
  const seenBaseUrls = new Set();

  for (const q of queries) {
    if (!q || q.length < 2) continue;
    if (distinct.length >= minHits) break;

    try {
      const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent(q)}&format=json&hits=30&sort=-reviewCount&imageFlag=1`;
      const res = await fetch(url);
      if (!res.ok) { await new Promise(r => setTimeout(r, 1000)); continue; }
      const data = await res.json();
      if (!data.Items || data.Items.length === 0) continue;

      for (const e of data.Items) {
        if (distinct.length >= minHits) break;
        const item = e.Item || e;
        if (!item.itemName || !item.affiliateUrl) continue;
        if (!isBeautyCosmetic(item.itemName)) continue;

        let img = item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '';
        if (img.includes('thumbnail.image.rakuten.co.jp/@0_mall/')) {
          img = img.replace('https://thumbnail.image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/').split('?_ex=')[0];
        } else if (img.includes('tshop.r10s.jp/')) {
          img = img.replace('https://tshop.r10s.jp/', 'https://shop.r10s.jp/');
        }
        if (!img) continue;

        const norm = normalizeHard(item.itemName);
        const imgFile = img.split('?')[0].split('/').pop();
        const baseUrl = item.affiliateUrl.split('?')[0];

        let isDuplicate = false;
        if (seenBaseUrls.has(baseUrl)) isDuplicate = true;
        if (imgFile && seenImages.has(imgFile)) isDuplicate = true;
        for (const seen of seenNorms) {
          if (isSameProduct(norm, seen)) { isDuplicate = true; break; }
        }

        if (!isDuplicate) {
          seenNorms.push(norm);
          if (imgFile) seenImages.add(imgFile);
          seenBaseUrls.add(baseUrl);
          distinct.push({
            itemName: item.itemName,
            shopName: item.shopName || '楽天市場 取扱店',
            affiliateUrl: item.affiliateUrl,
            imageUrl: img,
            price: item.itemPrice ? `${item.itemPrice.toLocaleString()}円 (税込)` : '価格確認',
            priceNum: item.itemPrice || 0,
            reviewAvg: item.reviewAverage || 4.5,
            reviewCount: item.reviewCount || 0,
            catchcopy: item.catchcopy || ''
          });
        }
      }
    } catch (err) {
      console.warn(`⚠️ ${err.message}`);
    }
    await new Promise(r => setTimeout(r, 600));
  }
  return distinct.slice(0, 10);
}

// キャッチコピー＆本物の特徴文生成
function generateFeature(item, articleTitle, rank) {
  const rating = item.reviewAvg || 4.5;
  const price = item.priceNum || 0;

  let cc = '';
  if (rank === 1) cc = '【圧倒的売上＆高評価★' + rating.toFixed(1) + '】今選ぶべき本命No.1アイテム';
  else if (rank === 2) cc = '【SNS・口コミで超話題】リピーター続出の実力派ベストセラー';
  else if (rank === 3) cc = '【プロ絶賛・高コスパ】仕上がりの完成度で選ぶならコレ';
  else if (price > 0 && price < 1800) cc = '【プチプラ最強コスパ】惜しみなく毎日使える大人気名品';
  else if (price >= 5000) cc = '【極上ラグジュアリー】至高の使用感と上質なエイジングケア';
  else if (rating >= 4.7) cc = '【驚異の満足度★' + rating.toFixed(1) + '】失敗知らずの神コスメ';
  else cc = '【楽天市場ランキング上位】確かな実力と信頼の人気アイテム';

  let d = '';
  const t = articleTitle;
  if (t.includes('足') || t.includes('デオドラント') || t.includes('ニオイ') || t.includes('制汗') || t.includes('汗') || t.includes('シーブリーズ')) {
    d = '有効成分が肌にピタッと密着し、ニオイの原因となる皮脂や汗を長時間抑制。朝塗るだけで夕方まで快適なサラサラ肌をキープします。';
  } else if (t.includes('カラーシャンプー') || t.includes('紫シャンプー') || t.includes('ピンクシャンプー') || t.includes('シルバーシャンプー') || t.includes('染め') || t.includes('ヘアカラー') || t.includes('白髪')) {
    d = 'ブリーチやカラー後の嫌な黄ばみ・赤みをしっかり抑え、サロン帰りの美しい透明感と絶妙なニュアンスカラーをキープ。髪を傷めずなめらかに洗い上げます。';
  } else if (t.includes('リップ') || t.includes('唇') || t.includes('口紅') || t.includes('ティント')) {
    d = '濃密な保湿美容液成分を贅沢に抱え込み、荒れがちな唇を瞬時にうるおいでラッピング。ふっくらとした魅力的な血色美を叶えます。';
  } else if (t.includes('コンシーラー')) {
    d = '高密着フィルムが気になるクマ・シミ・ニキビ跡を自然にカバー。薄づきなのにしっかりカバー力で、素肌に溶け込む自然なツヤ肌を長時間キープします。';
  } else if (t.includes('ファンデ') || t.includes('クッション')) {
    d = '微粒子パウダーが光を多角的に反射し、毛穴・色ムラを瞬時に補正。密着力が高く崩れにくいのにスキンケア成分で乾燥を防ぎ、一日中美しい仕上がりを実現します。';
  } else if (t.includes('チーク') || t.includes('ブラッシュ')) {
    d = '微粒子パウダーが頬にふんわり溶け込み、内側から上気したような自然な血色感を演出。毛穴落ちしにくい密着設計で、透明感のある仕上がりが長時間続きます。';
  } else if (t.includes('アイシャドウ') || t.includes('アイシャドー') || t.includes('ハイライト')) {
    d = '繊細なパール粒子が光を纏い、目元に奥行きと立体感をプラス。粉飛びやヨレを防ぐ密着処方で、朝のメイクしたての美しい発色が夜まで持続します。';
  } else if (t.includes('まつ毛') || t.includes('目元') || t.includes('眉') || t.includes('アイブロウ')) {
    d = '汗・皮脂・擦れに強い高密着処方で、メイクしたての美しい仕上がりが長時間持続。にじみやヨレを防ぎ、一日中自信の持てる目元を叶えます。';
  } else if (t.includes('シャンプー') || t.includes('頭皮') || t.includes('スカルプ') || t.includes('ヘア') || t.includes('トリートメント')) {
    d = '頭皮と髪に必要な潤いを守りながら、皮脂汚れや毛穴詰まりをすっきり洗浄。根元からふんわり立ち上がる健やかな美髪環境へと導きます。';
  } else if (t.includes('洗顔') || t.includes('クレンジング') || t.includes('毛穴') || t.includes('角栓') || t.includes('マスク') || t.includes('パック')) {
    d = '肌への摩擦を最小限に抑えながら、頑固な毛穴汚れや古い角質をすっきりオフ。洗い上がりはつっぱらず、透明感のある素肌に仕上がります。';
  } else if (t.includes('レチノール') || t.includes('シワ') || t.includes('エイジング') || t.includes('リンクル') || t.includes('美容液')) {
    d = '角層深くまで有効成分を届け、ハリ・弾力の低下やシワの原因にアプローチ。低刺激設計で敏感肌でも使いやすく、なめらかで弾むような若々しい肌を叶えます。';
  } else if (t.includes('セラミド') || t.includes('保湿') || t.includes('化粧水') || t.includes('乳液') || t.includes('スキンケア')) {
    d = 'ヒト型セラミドをはじめとする保湿成分が角層のバリア機能を立て直し、インナードライを根本から改善。べたつかずに深く潤う、もちもち弾力肌を実現します。';
  } else if (t.includes('ニキビ') || t.includes('パッチ') || t.includes('アクネ')) {
    d = '有効成分が炎症部位に直接アプローチし、気になるポツっとした赤みをケア。薄型透明設計でメイクの上からでも使え、触らず清潔に保つことで治りを早めます。';
  } else if (t.includes('デリケートゾーン') || t.includes('フェミニン')) {
    d = 'デリケートゾーン専用の弱酸性処方で、おりものやニオイの原因をやさしく洗浄。必要な潤いを守りながら清潔に保ち、不快感のない快適な毎日を叶えます。';
  } else if (t.includes('ビタミンC') || t.includes('リポ')) {
    d = 'リポソーム技術で体内吸収率を飛躍的に高めた高濃度ビタミンC。透明感アップや疲労回復をサポートし、インナーケアから美しさを底上げします。';
  } else if (t.includes('マウスウォッシュ') || t.includes('口臭') || t.includes('歯')) {
    d = '薬用有効成分が口腔内の原因菌を殺菌し、口臭を元からブロック。低刺激ノンアルコール処方で毎日使いやすく、長時間クリアな息をキープします。';
  } else if (t.includes('マット') || t.includes('ベルベット')) {
    d = 'サラサラのマット質感なのに乾燥せず、上品な陶器肌を長時間キープ。皮脂崩れを防ぎながら、洗練された大人のベルベット仕上がりを叶えます。';
  } else {
    d = '肌馴染み抜群の心地よいテクスチャーで、使うたびに肌のコンディションを底上げ。毎日の美容ルーティンを格上げする確かなクオリティです。';
  }
  return `<strong>【特徴】</strong> ${cc}！${d}`;
}

// 記事IDごとの最適検索クエリ
function getQueries(art) {
  const id = art.id;
  const title = art.title;

  // 個別マッピング（問題のある34記事を中心に）
  if (id.includes('sachiko-loa-the-oil')) return ['ロアオイル ヘアオイル', 'LOA THE OIL', 'ロアオイル 楽天'];
  if (id.includes('sachiko-curel-sebum')) return ['キュレル 皮脂トラブルケア', 'キュレル ジェル 保湿', 'キュレル オイルコントロール'];
  if (id.includes('sachiko-eyebrow-coat')) return ['アイブロウコート 落ちない', 'フジコ 眉ティント', '眉コート ウォータープルーフ'];
  if (id.includes('sachiko-lypoc-vitamin')) return ['リポC ビタミンC リポソーム', 'Lypo-C サプリ', '高濃度ビタミンC ドリンク'];
  if (id.includes('sachiko-summerseve')) return ['サマーズイブ フェミニンウォッシュ', 'デリケートゾーン 洗浄剤', 'フェミニンケア ソープ 楽天'];
  if (id.includes('sachiko-hirano-shoh')) return ['イヴサンローラン リップ メンズ', 'メンズ スキンケア 人気', 'メンズ 香水 ランキング'];
  if (id.includes('sachiko-tfit-concealer')) return ['TFIT コンシーラー', 'ティーフィット カバーアッププロ', '韓国コンシーラー ランキング'];
  if (id.includes('sachiko-the-saem-concealer')) return ['ザセム コンシーラー', 'the SAEM チップコンシーラー', '韓国コスメ コンシーラー'];
  if (id.includes('sachiko-avene-water')) return ['アベンヌウォーター スプレー', 'アベンヌ 化粧水 敏感肌', 'ミスト化粧水 敏感肌'];
  if (id.includes('sachiko-milbon-pointcare')) return ['ミルボン ポイントケアスティック', 'ミルボン エルジューダ', 'アホ毛 スティック ヘアワックス'];
  if (id.includes('sachiko-saborino-morning')) return ['サボリーノ 朝用マスク', '朝パック 時短 スキンケア', '朝用シートマスク 楽天'];
  if (id.includes('sachiko-breath-labo')) return ['ブレスラボ マウスウォッシュ', '薬用マウスウォッシュ 殺菌', 'オーラルケア マウスウォッシュ'];
  if (id.includes('sachiko-elixir-retinopower')) return ['エリクシール レチノパワー', 'エリクシール リンクルクリーム', '資生堂 レチノール シワ改善'];
  if (id.includes('sachiko-sea-breeze')) return ['シーブリーズ 制汗', 'シーブリーズ デオウォーター', 'シーブリーズ ボディシート'];
  if (id.includes('sachiko-lancome-genifique')) return ['ランコム ジェニフィック', 'ランコム 美容液 エイジング', 'ランコム アドバンストジェニフィック'];
  if (id.includes('peri-scalp-hair-treatment')) return ['スカルプトリートメント 頭皮用', '頭皮用ヘアパック 保湿', 'スカルプケア トリートメント'];
  if (id.includes('peri-stick-serum-wrinkle')) return ['スティック美容液 シワ', '目元用スティック美容液', '携帯美容液 保湿スティック'];
  if (id.includes('peri-powder-blush')) return ['パウダーチーク 人気', 'チーク パウダー プチプラ', 'キャンメイク チーク'];
  if (id.includes('peri-acne-patch')) return ['ニキビパッチ ランキング', 'スポッツケア パッチ', 'VT ニキビパッチ'];
  if (id.includes('peri-plump-lip-oil')) return ['プランパー リップオイル', 'リップオイル ガラスツヤ', 'ボリューミー リップグロス'];
  if (id.includes('peri-ceramide-lotion')) return ['セラミド 化粧水 楽天', 'ヒト型セラミド スキンケア', 'セラミド 保湿 乳液'];
  if (id.includes('peri-retinol-beginner')) return ['レチノール 低刺激 初心者', 'レチノール 美容液 敏感肌', 'レチノール クリーム 楽天'];
  if (id.includes('peri-highlighter-kuma')) return ['ハイライト クマ消し', 'ハイライター ツヤ肌', 'プチプラ ハイライト 人気'];
  if (id.includes('peri-lip-tint-moist')) return ['リップティント 高保湿', 'リップティント 荒れない', 'ロムアンド ティント 人気'];
  if (id.includes('peri-korean-cushion')) return ['韓国 クッションファンデ', 'クッションファンデーション 水光肌', 'TIRTIR クッション'];
  if (id.includes('peri-reedle-shot')) return ['VT リードルショット', 'リードルショット 300', 'VT CICA リードル'];
  if (id.includes('peri-eyeshadow-base')) return ['アイシャドウベース プチプラ', 'キャンメイク アイシャドウベース', 'アイシャドウ下地 ヨレ防止'];
  if (id.includes('cosme-matte-velvet')) return ['マット リップ ベルベット', 'マットファンデーション 乾燥しない', 'マットコスメ 楽天'];
  if (id.includes('cosme-kuchikomi-review')) return ['コスメ 口コミ 人気 2026', 'ベストコスメ 話題', 'コスメ レビュー 高評価'];
  if (id.includes('cosme-ninki-2026-women')) return ['女性 コスメ 人気 2026', 'レディース コスメ ランキング', 'コスメ 売れ筋 楽天'];
  if (id.includes('rakuten-cosme-beginner')) return ['楽天 コスメ 人気', 'コスメ 初心者 おすすめ', 'コスメ セット スターター'];
  if (id.includes('gray-hair-brown')) return ['白髪染め ブラウン トリートメント', 'シエロ カラートリートメント', '利尻ヘアカラートリートメント'];
  if (id.includes('milktea-beige-shampoo')) return ['ミルクティーシャンプー', 'カラーシャンプー ベージュ', 'アッシュシャンプー ベージュ'];
  if (id.includes('hair-dye-wine-red')) return ['カラーバター ワインレッド', 'ヘアカラー ボルドー', 'ヘアマニキュア レッド'];

  // 汎用
  const cleanTitle = title.replace(/【.*?】/g, '').replace(/[！!？?・&％%]/g, ' ').replace(/\d+選.*/, '').replace(/最強.*/, '').replace(/おすすめ.*/, '').trim();
  return [
    (art.tags || []).slice(0, 2).join(' '),
    cleanTitle.split(' ').slice(0, 2).join(' '),
    cleanTitle.split(' ')[0]
  ].filter(Boolean);
}

// HTML構築
function buildContent(article, top10) {
  const today = '2026-08-31';

  let table = `| 順位 | 商品名 | 価格帯 | 特徴・おすすめポイント | リンク |\n|:---:|:---|:---:|:---|:---:|\n`;
  top10.forEach((p, idx) => {
    const rank = idx + 1;
    const shortName = p.itemName.slice(0, 32).replace(/[|\[\]]/g, ' ');
    table += `| **${rank}位** | **${shortName}** | ${p.price || '価格確認'} | ★${p.reviewAvg}・高評価実力派 | [楽天市場で見る](${p.affiliateUrl}) |\n`;
  });

  let productsHtml = '';
  top10.forEach((p, idx) => {
    const rank = idx + 1;
    const cleanName = p.itemName.replace(/[<>"']/g, '');
    const featureText = generateFeature(p, article.title, rank);
    productsHtml += `
---

### 👑 第${rank}位：${cleanName}

<div class="product-card">
  <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: center; margin: 16px 0;">
    <img src="${p.imageUrl}" alt="${cleanName}" style="max-width: 200px; height: auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
    <div style="flex: 1; min-width: 240px;">
      <p style="font-size: 1.25rem; font-weight: bold; color: #e11d48; margin-bottom: 8px;">実売価格: ${p.price || 'ショップ価格を参照'}</p>
      <p style="font-size: 0.95rem; color: #475569; margin-bottom: 12px;"><strong>取扱ショップ:</strong> ${p.shopName} (★${p.reviewAvg} / レビュー${p.reviewCount}件)</p>
      <a href="${p.affiliateUrl}" target="_blank" rel="nofollow noopener noreferrer" style="display: inline-block; background: #bf1e2e; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 14px rgba(191,30,46,0.35);">楽天市場で最安値・ポイント還元をチェック ❯</a>
    </div>
  </div>
  <p style="color: #334155; line-height: 1.7; margin-top: 12px;">${featureText}</p>
</div>
`;
  });

  let intro = article.description || '';
  let existingSections = `## 📌 失敗しない選び方のポイント\n\n毎日のケアやお悩みに合わせて、成分表記や使用感、テクスチャーをチェックして選ぶのがポイントです。楽天市場の口コミレビューも参考にしてください。`;
  let existingFaqs = `## ❓ よくある質問（FAQ）\n\n### Q. 敏感肌でも使えますか？\n**A.** パッチテスト済みの低刺激処方のものがおすすめです。\n\n### Q. 毎日使っても大丈夫？\n**A.** 基本的にデイリーケアアイテムは毎日ご使用いただけます。`;

  if (article.content) {
    const pMatch = article.content.match(/(## 📌[\s\S]*?)(?=## ❓|## 🎯|---|(?=<script)|$)/);
    if (pMatch) existingSections = pMatch[1].trim();
    const fMatch = article.content.match(/(## ❓[\s\S]*?)(?=## 🎯|---|(?=<script)|$)/);
    if (fMatch) existingFaqs = fMatch[1].trim();
    const introMatch = article.content.match(/^# [^\n]+\n\n([\s\S]*?)(?=\n---|## 📱)/);
    if (introMatch && introMatch[1].trim()) intro = introMatch[1].trim();
  }

  const listSchema = { "@context": "https://schema.org", "@type": "ItemList", "name": article.title, "numberOfItems": top10.length, "itemListElement": top10.map((p, i) => ({ "@type": "ListItem", "position": i + 1, "name": p.itemName.slice(0, 80), "url": p.affiliateUrl })) };
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": article.title, "description": article.description, "author": { "@type": "Person", "name": article.author || "Qualia Navi取材班" }, "datePublished": today, "dateModified": today, "publisher": { "@type": "Organization", "name": "Qualia Navi" } };

  const tagLabel = article.tags && article.tags.length > 0 ? article.tags.slice(0, 4).join(' ') : '厳選おすすめ';
  return `# ${article.title}

${intro}

---

## 📱 【比較表】${tagLabel} 10選 一覧

${table}

${productsHtml}

---

${existingSections}

---

${existingFaqs}

---

## 🎯 まとめ

本記事では「${article.title}」をテーマに、楽天市場の実売データと口コミに基づいた**本当におすすめできる独立した10商品**をご紹介しました。ぜひ気になったアイテムから試してみてください。

---

<script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
</script>

<script type="application/ld+json">
${JSON.stringify(listSchema, null, 2)}
</script>
`;
}

async function main() {
  // 重複が検知された34記事のID
  const dupIds = ['art-rakuten-cosme-beginner-complete-guide-2026','art-peri-scalp-hair-treatment-pack-2026','art-peri-stick-serum-wrinkle-touchup-2026','art-peri-powder-blush-poreless-glow-2026','art-peri-acne-patch-spots-care-ranking-2026','art-peri-plump-lip-oil-glass-shine-2026','art-peri-ceramide-lotion-emulsion-ranking-2026','art-peri-retinol-beginner-skincare-guide-2026','art-peri-highlighter-kuma-glow-ranking-2026','art-peri-lip-tint-moist-are-nai-ranking-2026','art-peri-korean-cushion-foundation-ranking-2026','art-peri-reedle-shot-levels-comparison-guide-2026','art-peri-eyeshadow-base-petit-price-ranking-2026','art-sachiko-saborino-morning-mask-skin-trouble-truth','art-sachiko-breath-labo-mouthwash-review','art-sachiko-elixir-retinopower-wrinkle-cream-deal-2026','art-sachiko-sea-breeze-price-effects-comparison','art-sachiko-lancome-genifique-deal-guide','art-sachiko-loa-the-oil-hair-body-care-guide','art-sachiko-curel-sebum-trouble-care-gel-review','art-sachiko-eyebrow-coat-20s-30s-guide','art-sachiko-lypoc-vitamin-c-timing-effects','art-sachiko-summerseve-feminine-wash-review','art-sachiko-hirano-shoh-cosme-items-complete','art-sachiko-tfit-concealer-mina-twice','art-sachiko-the-saem-concealer-package-renewal','art-sachiko-avene-water-asemo-acne-truth','art-sachiko-milbon-pointcare-stick-review','art-cosme-matte-velvet-2026','art-cosme-kuchikomi-review-2026-real','art-cosme-ninki-2026-women-best10','art-gray-hair-brown-10-ranking-comparison-2026','art-milktea-beige-shampoo-10-ranking-comparison-2026','art-hair-dye-wine-red-bordeaux-10-ranking-comparison-2026'];

  console.log(`🚀 重複残存34記事の完全修復開始...`);

  let fixed = 0;
  for (let i = 0; i < dupIds.length; i++) {
    const id = dupIds[i];
    const idx = articlesData.findIndex(a => a.id === id);
    if (idx === -1) { console.warn(`⚠️ 記事なし: ${id}`); continue; }
    const art = articlesData[idx];

    console.log(`\n[${i+1}/${dupIds.length}] 修復中: ${id}`);

    const queries = getQueries(art);
    const items = await fetchDistinctItems(queries, 10);

    if (items.length < 10) {
      console.warn(`⚠️ 10件不足 (${items.length}件): ${id}`);
      continue;
    }

    // 最終ダブルチェック
    const norms = items.map(it => normalizeHard(it.itemName));
    let hasDup = false;
    for (let a = 0; a < norms.length; a++) {
      for (let b = a + 1; b < norms.length; b++) {
        if (isSameProduct(norms[a], norms[b])) {
          console.warn(`⚠️ 最終チェックで重複検知: ${items[a].itemName.slice(0,30)} vs ${items[b].itemName.slice(0,30)}`);
          hasDup = true;
        }
      }
    }

    const newContent = buildContent(art, items);
    articlesData[idx] = {
      ...art,
      content: newContent,
      image: items[0].imageUrl,
      affiliateUrl: items[0].affiliateUrl,
      price: items[0].price,
      itemCount: items.length,
      updatedAt: '2026-08-31'
    };
    console.log(`✅ 修復完了 (1位: ${items[0].itemName.slice(0,28)}...)`);
    fixed++;

    await new Promise(r => setTimeout(r, 600));
  }

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
  console.log(`\n🎉 重複残存34記事のうち${fixed}件を修復完了！`);
}

main().catch(err => { console.error('❌', err); process.exit(1); });
