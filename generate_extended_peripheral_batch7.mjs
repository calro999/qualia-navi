import fs from 'fs';
import path from 'path';

console.log('🚀 [Peripheral Expansion Batch 7] 楽天オープンAPI完全リアルタイム直接取得・記事生成開始...');

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

async function fetchRakutenItems(keyword, hits = 12, maxRetries = 3) {
  let cleanKw = keyword.replace(/【.*?】/g, '').replace(/（.*?）/g, '').replace(/\(.*?\)/g, '').trim();
  if (cleanKw.length > 40) cleanKw = cleanKw.slice(0, 40);
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent(cleanKw)}&format=json&hits=${hits}&sort=-reviewCount&imageFlag=1`;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📡 [楽天API 直接通信 試行${attempt}] キーワード: "${cleanKw}"`);
      const res = await fetch(url);
      if (res.status === 429) {
        console.warn(`⏳ レートリミット検知: 2秒待機して再試行...`);
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }
      if (!res.ok) {
        console.error(`⚠️ 楽天API エラーレスポンス: ${res.status}`);
        return [];
      }
      const data = await res.json();
      if (!data.Items || data.Items.length === 0) {
        console.warn(`⚠️ 該当商品 0件: "${cleanKw}"`);
        return [];
      }
      const items = data.Items.map(e => {
        const item = e.Item || e;
        let img = item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '';
        if (img.includes('thumbnail.image.rakuten.co.jp/@0_mall/')) img = img.replace('https://thumbnail.image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/').split('?_ex=')[0];
        else if (img.includes('tshop.r10s.jp/')) img = img.replace('https://tshop.r10s.jp/', 'https://shop.r10s.jp/');
        return {
          itemName: item.itemName || '',
          shopName: item.shopName || '',
          affiliateUrl: item.affiliateUrl || '',
          imageUrl: img,
          price: item.itemPrice ? `${item.itemPrice.toLocaleString()}円 (税込)` : '',
          priceNum: item.itemPrice || 0,
          reviewAvg: item.reviewAverage || 4.5,
          reviewCount: item.reviewCount || 0,
          catchcopy: item.catchcopy || ''
        };
      }).filter(p => p.affiliateUrl && p.imageUrl);

      console.log(`✅ 楽天APIから ${items.length} 件の商品データを直接取得成功！`);
      return items;
    } catch (e) {
      console.error(`❌ 楽天API 通信例外: ${e.message}`);
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return [];
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const batch7Defs = [
  // 61. トーンアップUV日焼け止め下地（ラロッシュポゼ・ダルバ周辺）
  {
    id: 'art-peri-tone-up-uv-base-glow-2026',
    queryTarget: 'トーンアップ UV 化粧下地 ノーファンデ 日焼け止め ラロッシュポゼ ダルバ ピンク ローズ',
    searchKeyword: 'トーンアップ UV 下地 日焼け止め ラロッシュポゼ ダルバ',
    title: '【ファンデなしで毛穴・くすみカバー】トーンアップUV下地おすすめ人気10選！血色感ローズ＆水光ツヤ比較',
    description: 'ノーファンデ派や時短メイクに最適なトーンアップUV下地10選。ラロッシュポゼやダルバ（d\'Alba）など、紫外線カットと自然な血色トーンアップを両立する人気アイテムを徹底比較します。',
    category: 'suncare',
    tags: ['トーンアップUV下地', 'ノーファンデUV', 'ラロッシュポゼローズ', 'ダルバサンクリーム', '血色感下地', '日焼け止め下地', '美肌トーンアップ'],
    author: '松本 結衣',
    featured: true,
    intro: `「ファンデーションを塗りたくないけれど、くすみや色ムラはカバーしたい」というノーファンデ派のために。SPF50+の高UVカット力と、光を乱反射して素肌そのものが美しい人のように見せるトーンアップUVを比較します。`,
    sections: [
      { h: '色選びのポイント（ローズ vs ホワイト vs ラベンダー）', body: `- **ローズ・ピンク**：血色感を足して生き生きとした健康的な肌に（くすみが気になる方）\n- **ラベンダー・パープル**：黄ぐすみを強力に打ち消して透明感を極める（ブルベ肌・色白見せ）\n- **クリア・ホワイト**：ツヤ感を強調し、首との境目を自然に馴染ませる` }
    ],
    faqs: [{ q: '洗顔料だけで落とせますか？', a: '単体使用であれば洗顔料や石鹸だけでオフできる肌に優しい処方が多いです。' }]
  },

  // 62. ヘアバーム・オーガニックワックス（スタイリング・ロアオイル周辺）
  {
    id: 'art-peri-organic-hair-balm-styling-2026',
    queryTarget: 'ヘアバーム オーガニック ハンドクリーム兼用 いい匂い 濡れ髪 束感 ナプラ N. ザ・プロダクト',
    searchKeyword: 'ヘアバーム オーガニック 濡れ髪 N. プロダクト',
    title: '【手に残ったバームはハンドクリームに】ヘアバームおすすめ人気10選！程よい濡れ髪＆束感スタイリング比較',
    description: '天然由来成分100%で髪のスタイリング後に手やリップの保湿にも使えるヘアバーム10選。N.（エヌドット）やザ・プロダクトなど、ベタつかずウェットな束感をキープする名品を徹底比較。',
    category: 'haircare',
    tags: ['ヘアバーム', 'オーガニックヘアワックス', '濡れ髪スタイリング', 'エヌドットバーム', 'ザプロダクト', 'ハンドクリーム兼用バーム', 'ツヤ髪バーム'],
    author: '佐々木 遥',
    featured: true,
    intro: `髪につけた後、手を洗わずにそのままハンドケアできる手軽さで大人気の「ヘアバーム」。シアバターやミツロウの保湿力で、広がる髪をまとめながら今っぽい濡れ髪束感をつくる人気アイテムをご紹介します。`,
    sections: [
      { h: 'ヘアバームを上手に使うコツ', body: `指の爪の背で少量削り取り、手のひらで体温で完全にオイル状に溶かしてから髪の内側・毛先になじませると、ムラにならずキレイな束感が作れます。` }
    ],
    faqs: [{ q: '夏場に溶けてドロドロになりませんか？', a: '天然シアバターは体温（36℃前後）で溶ける性質があるため、直射日光を避け涼しい場所に保管してください。' }]
  },

  // 63. アゼライン酸 美容液・クリーム（皮脂・ニキビ・赤み・キュレル周辺）
  {
    id: 'art-peri-azelaic-acid-sebum-acne-ranking-2026',
    queryTarget: 'アゼライン酸 美容液 クリーム 皮脂抑制 酒さ ニキビ 赤ら顔 毛穴 ダーマセプト アゼライン',
    searchKeyword: 'アゼライン酸 美容液 クリーム ニキビ 皮脂 赤み',
    title: '【過剰な皮脂と赤ら顔を抑える】アゼライン酸配合スキンケアおすすめ10選！ニキビ・毛穴の開き改善比較',
    description: '皮脂分泌を根本から抑制し、赤ら顔や繰り返すニキビを落ち着かせる「アゼライン酸」配合の美容液＆クリーム10選。海外では医療用としても用いられる実力派成分の選び方を徹底解説。',
    category: 'skincare',
    tags: ['アゼライン酸美容液', 'アゼライン酸クリーム', '皮脂抑制スキンケア', '赤ら顔ケア', '酒さ対策', 'ニキビ肌スキンケア', '毛穴引き締め'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `「Tゾーンがアブラっぽくて毛穴が開く」「頬や鼻の赤みが引かない」という方へ。海外でニキビ治療の標準成分として支持される天然由来の「アゼライン酸」配合コスメを厳選比較します。`,
    sections: [
      { h: 'アゼライン酸の4大美肌効果', body: `1. **過剰な皮脂分泌を根本から抑制**\n2. **毛穴の角化（詰まり）を防ぎニキビを予防**\n3. **メラニン生成を抑えて赤み・色素沈着をクリアに**\n4. **抗菌・抗酸化作用で肌荒れをブロック**` }
    ],
    faqs: [{ q: '使い始めにピリピリしますか？', a: '最初の数回は一時的なピリピリ感やかゆみを感じることがありますが、徐々に肌が慣れてきます。強い刺激が続く場合は保湿剤を先に塗ってください。' }]
  },

  // 64. まつ毛コーティング美容液・マツエク長持ち（まつ毛ケア周辺）
  {
    id: 'art-peri-eyelash-coating-essence-lash-lift-2026',
    queryTarget: 'まつ毛 コーティング まつパ まつ毛パーマ マツエク 長持ち 束感 クリアマスカラ フェニックス オードーレ',
    searchKeyword: 'まつ毛 コーティング まつパ マツエク 束感 フェニックス',
    title: '【まつ毛パーマ・マツエクが2倍長持ち】まつ毛コーティング美容液おすすめ10選！束感キープ＆トリートメント比較',
    description: 'まつ毛パーマのカールやマツエクの持続期間を大幅に伸ばすまつ毛コーティング剤10選。サロンで仕上げたようなトレンドの束感を瞬時に作り、乾燥や摩擦から保護する人気アイテムを比較。',
    category: 'makeup',
    tags: ['まつ毛コーティング剤', 'まつパ長持ち', 'マツエクコーティング', 'フェニックスコーティング', '束感まつ毛クリア', 'まつ毛トリートメント', 'アイラッシュケア'],
    author: '松本 結衣',
    featured: true,
    intro: `「まつ毛パーマのカールを少しでも長くキープしたい」「洗顔後にまつ毛がバラつく」という方へ。水分や油分を弾く撥水コーティングフィルムでまつ毛を一日中ロックする人気コーティング剤をご紹介します。`,
    sections: [
      { h: '流行りのピンセットなし束感の作り方', body: `コーティングジェルをまつ毛全体に塗布した後、ブラシの先端を横にしてまつ毛を数本ずつ束ねるように撫でると、ピンセット不要で綺麗な束感が完成します。` }
    ],
    faqs: [{ q: 'マツエクのグルーに影響はありませんか？', a: 'ノンオイル処方のまつエク専用コーティング剤を選べば、グルーを劣化させず長持ちさせられます。' }]
  },

  // 65. PDRN（サーモン注射成分）美容液・シートマスク（エイジングケア・韓国コスメ周辺）
  {
    id: 'art-peri-pdrn-salmon-serum-sheet-mask-2026',
    queryTarget: 'PDRN サーモン 美容液 シートマスク リジュラン アヌア VT ハリ ツヤ 肌再生',
    searchKeyword: 'PDRN 美容液 サーモン リジュラン アヌア VT',
    title: '【クリニックのサーモン注射級】PDRN配合コスメおすすめ人気10選！肌の再生力とハリ・弾力回復比較',
    description: '美容医療の「リジュラン（サーモン注射）」で知られるPDRN（ポリデオキシリボヌクレオチド）配合の美容液・アンプル・シートマスク10選。肌の自己再生力を高め、ツヤとハリを取り戻す名品を徹底比較。',
    category: 'k-beauty',
    tags: ['PDRN美容液', 'サーモン注射コスメ', 'リジュランアンプル', 'アヌアPDRN', 'VTサーモン', '肌再生スキンケア', '韓国最新コスメ'],
    author: 'K-Beauty LABO',
    featured: true,
    intro: `韓国で空前の大ブームとなっている「PDRNスキンケア」。サーモンDNAから抽出された成分が角層のダメージを修復し、内側からパンッと張ったようなハリツヤ肌へ導く最新アイテムを比較します。`,
    sections: [
      { h: 'PDRNが他のエイジング成分より優れている点', body: `コラーゲンの生成を促すだけでなく、紫外線や加齢で傷ついた肌細胞の修復プロセスそのものをブーストするため、弱った肌の根本的なバリア強化に最適です。` }
    ],
    faqs: [{ q: '魚の生臭いニオイはありますか？', a: '高度に精製されているため、生臭さは一切なく、無香料または爽やかな香りで快適に使えます。' }]
  },

  // 66. クッションファンデ用 パフ・替えパフ（ベースメイク周辺）
  {
    id: 'art-peri-cushion-foundation-puffs-replacement-2026',
    queryTarget: 'クッションファンデ パフ 替え 密着 ムラにならない 買い替え ロージーローザ TIRTIR',
    searchKeyword: 'クッションファンデ パフ 替え ロージーローザ',
    title: '【ファンデの密着度が劇的に変わる】クッションファンデ用替えパフおすすめ人気10選！厚手＆極細繊維比較',
    description: 'クッションファンデの仕上がりと持ちを格上げする優秀替えパフ10選。ロージーローザのマルチファンデパフをはじめ、余分なファンデを吸い込まず均一に薄膜密着させる名品を徹底比較。',
    category: 'makeup',
    tags: ['クッションファンデパフ', '替えパフおすすめ', 'ロージーローザパフ', 'ファンデ密着パフ', 'ベースメイクツール', '洗えるパフ', 'クッションパフ比較'],
    author: '松本 結衣',
    featured: true,
    intro: `「付属のパフが汚れてきた」「ファンデがムラづきする」という方へ。弾力のある特殊構造パフに変えるだけで、同じファンデーションでも毛穴カバー力とツヤ感が2倍アップする神パフをご紹介します。`,
    sections: [
      { h: 'パフを替えるべきタイミング', body: `パフは油分や皮脂を吸って2〜3週間で弾力が低下し雑菌が繁殖します。週1回の洗浄、または1〜2ヶ月ごとの新品交換が美肌キープの鉄則です。` }
    ],
    faqs: [{ q: 'リキッドファンデーションにも使えますか？', a: 'もちもちした高密度パフは、リキッドやBBクリームの叩き込みにも抜群の相性を誇ります。' }]
  },

  // 67. ボディ用 スクラブ・角質ケア（サボン・Oh!Baby・肘周辺）
  {
    id: 'art-peri-body-scrub-smooth-skin-ranking-2026',
    queryTarget: 'ボディースクラブ 角質ケア つるつる お尻 背中 二の腕 ザラつき サボン ハウスオブローゼ',
    searchKeyword: 'ボディスクラブ 角質ケア つるつる サボン ハウスオブローゼ',
    title: '【全身シルクのようなつるすべ肌】ボディスクラブおすすめ人気10選！二の腕のザラつき・お尻の黒ずみケア比較',
    description: '二の腕のプツプツ、お尻のざらつき、背中の角質を優しくオフする人気ボディスクラブ10選。ソルトスクラブとシュガースクラブの違い、お風呂上がりのしっとり感を徹底比較します。',
    category: 'bodycare',
    tags: ['ボディスクラブ', '角質ケアボディ', 'サボンボディスクラブ', 'ハウスオブローゼOhBaby', '二の腕のザラつき', 'お尻の黒ずみ', 'つるすべ肌ボディ'],
    author: '佐々木 遥',
    featured: true,
    intro: `撫でるだけで思わず触りたくなるマシュマロ肌へ。ミネラルたっぷりの死海ソルトや低刺激なシュガースクラブで、古い角質を落としてワントーン明るい素肌をつくる人気スクラブを比較します。`,
    sections: [
      { h: 'ソルトスクラブ vs シュガースクラブの使い分け', body: `- **ソルト（塩）スクラブ**：かかと・ひじ・ひざなどの硬い角質をしっかり引き締めたい方\n- **シュガー（砂糖）スクラブ**：デコルテやお尻など皮膚が薄い部分の敏感肌・高保湿ケアに` }
    ],
    faqs: [{ q: '傷や日焼けした肌に使ってもいい？', a: '炎症や傷がある部位は避け、優しく撫でるように使用してください。' }]
  },

  // 68. 薬用美白シートマスク・シミ集中パック（スキンケア周辺）
  {
    id: 'art-peri-whitening-sheet-mask-shimi-2026',
    queryTarget: '美白 シートマスク パック 薬用 シミ そばかす 日焼けあと トラネキサム酸 ビタミンC 透明感 トランシーノ',
    searchKeyword: '美白 シートマスク 薬用 シミ トラネキサム酸 トランシーノ',
    title: '【うっかり日焼け＆シミを速攻リセット】薬用美白シートマスクおすすめ人気10選！トラネキサム酸配合集中パック比較',
    description: '紫外線を浴びた後の集中ブライトニングに最適な薬用美白シートマスク10選。トランシーノやメラノCCなど、メラニン生成を初期段階でブロックする高機能パックを徹底比較します。',
    category: 'skincare',
    tags: ['美白シートマスク', '薬用美白パック', 'トランシーノシートマスク', 'トラネキサム酸パック', '日焼け後集中ケア', 'シミ予防パック', '美白スキンケア'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `屋外レジャーや通勤で強い日差しを浴びてしまった日の夜に。抗炎症と美白有効成分をたっぷり浸透させ、日焼けによるほてりを沈静しながらシミを作らせない集中シートマスクをご紹介します。`,
    sections: [
      { h: '日焼け後の美白パックの黄金タイミング', body: `紫外線を浴びてからメラニンが本格生成されるまでの「72時間以内」に集中的に美白マスクを行うことが、将来のシミを防ぐ最大の勝負所です。` }
    ],
    faqs: [{ q: '冷蔵庫で冷やして使ってもいい？', a: '冷蔵庫で軽く冷やして使うと、日焼けの熱を持った肌のクーリング効果がさらに高まり非常に心地よいです。' }]
  },

  // 69. 薬用マウススプレー・携帯用口臭ケア（ブレスラボ・オーラル周辺）
  {
    id: 'art-peri-portable-mouth-spray-breath-care-2026',
    queryTarget: 'マウススプレー 口臭 携帯用 薬用 殺菌 食後 マスク エチケット ノニオ オーラツー',
    searchKeyword: 'マウススプレー 薬用 口臭 携帯用 ノニオ オーラツー',
    title: '【1秒で息リフレッシュ】携帯用薬用マウススプレーおすすめ10選！食事後・マスク内の口臭を瞬時に消す比較',
    description: '外出先や人と会う直前にサッとひと吹きで口臭原因菌を殺菌する携帯用マウススプレー10選。爽快なミント系から低刺激シトラスまで、ポーチに入るエチケット名品を徹底比較。',
    category: 'bodycare',
    tags: ['マウススプレー', '携帯用口臭スプレー', '薬用マウススプレー', 'オーラツーマウススプレー', 'ノニオマウススプレー', '口臭エチケット', 'オーラルケア'],
    author: 'ヘルスケア取材班',
    featured: true,
    intro: `歯磨きができない外出先や、大事な商談・デートの直前に。有効成分CPCが口臭の原因菌を瞬時に殺菌し、クリアな息を一瞬で甦らせる大人気マウススプレーをご紹介します。`,
    sections: [
      { h: 'マウスウォッシュとマウススプレーの使い分け', body: `朝晩の自宅ケアには口全体をすすぐマウスウォッシュ、日中の移動中や外出先には胸ポケットやミニバッグから出して1秒で使えるスプレーが最適です。` }
    ],
    faqs: [{ q: '何プッシュくらい使えばいい？', a: '1回につきお口の中に2〜3プッシュスプレーするだけで十分な殺菌・消臭効果を発揮します。' }]
  },

  // 70. ナイトキャップ シルク100% 髪の摩擦防止（ヘアケア周辺）
  {
    id: 'art-peri-silk-night-cap-hair-care-2026',
    queryTarget: 'ナイトキャップ シルク 100% 髪 摩擦 枝毛 寝癖 パサつき 朝 つやつや 渡辺直美 おすすめ',
    searchKeyword: 'ナイトキャップ シルク 100% 髪 つやつや 摩擦',
    title: '【寝ている間の摩擦をゼロに】シルク100%ナイトキャップおすすめ人気10選！翌朝の髪がツヤツヤになる名品比較',
    description: '寝返りによる枕との摩擦や乾燥から髪を守り、朝起きた瞬間にサロン帰りのようなツヤとまとまりを実感できるシルクナイトキャップ10選。ゴム紐型とリボン型の脱げにくさを徹底比較。',
    category: 'haircare',
    tags: ['シルクナイトキャップ', 'シルク100%ヘアケア', '髪の摩擦防止', '朝ツヤ髪ナイトキャップ', '寝癖防止シルク', '枝毛予防', '美髪ナイトケア'],
    author: '佐々木 遥',
    featured: true,
    intro: `「朝起きると髪がバサバサに広がって寝癖がひどい」という原因は、睡眠中の枕との激しい摩擦です。最高級6Aランクシルクが髪の水分を保ち、ツルツル手触りに変える人気ナイトキャップを比較します。`,
    sections: [
      { h: 'シルクナイトキャップの驚きの効果', body: `1. **枕の摩擦によるキューティクル剥がれを防止**\n2. **シルクの天然保湿アミノ酸が髪のパサつきをガード**\n3. **朝の寝癖やうねりが劇的に減りスタイリング時短に**` }
    ],
    faqs: [{ q: '朝起きると脱げてしまう場合の選び方は？', a: 'おでこに跡がつかない幅広ゴムタイプや、後頭部で結べるサイズ調整可能なリボン紐タイプが脱げにくく快適です。' }]
  }
];

async function buildContent(def, products) {
  const top10 = products.slice(0, 10);
  const today = '2026-08-31';

  let table = `| 順位 | 商品名 | 価格帯 | 特徴・おすすめポイント | リンク |\n|:---:|:---|:---:|:---|:---:|\n`;
  top10.forEach((p, idx) => {
    const rank = idx + 1;
    const shortName = p.itemName.slice(0, 32).replace(/[|\[\]]/g, ' ');
    table += `| **${rank}位** | **${shortName}** | ${p.price || '価格確認'} | ${p.catchcopy ? p.catchcopy.slice(0, 26) : '高評価・リピート多数'} | [楽天市場で見る](${p.affiliateUrl}) |\n`;
  });

  let productsHtml = '';
  top10.forEach((p, idx) => {
    const rank = idx + 1;
    const cleanName = p.itemName.replace(/[<>"']/g, '');
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
  <p style="color: #334155; line-height: 1.7; margin-top: 12px;">${p.catchcopy ? `<strong>【特徴】</strong> ${p.catchcopy}` : `楽天市場で高い支持を集める人気定番アイテム。実力派の使い心地と高評価レビューが証明する確かなクオリティです。`}</p>
</div>
`;
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": def.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": def.title,
    "description": def.description,
    "numberOfItems": top10.length,
    "itemListElement": top10.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": p.itemName.slice(0, 80),
      "url": p.affiliateUrl
    }))
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": def.title,
    "description": def.description,
    "author": { "@type": "Person", "name": def.author },
    "datePublished": today,
    "dateModified": today,
    "publisher": { "@type": "Organization", "name": "Qualia Navi" }
  };

  let sectionsHtml = '';
  def.sections.forEach(s => {
    sectionsHtml += `\n---\n\n## 📌 ${s.h}\n\n${s.body}\n`;
  });

  let faqHtml = `\n---\n\n## ❓ よくある質問（FAQ）\n\n`;
  def.faqs.forEach(f => {
    faqHtml += `### Q. ${f.q}\n**A.** ${f.a}\n\n`;
  });

  return `# ${def.title}

${def.intro}

---

## 📱 【比較表】${def.queryTarget} おすすめ人気10選 一覧

${table}

${productsHtml}

${sectionsHtml}

${faqHtml}

---

## 🎯 まとめ

本記事では「${def.queryTarget}」をテーマに、楽天市場の実売データと口コミに基づいた**本当におすすめできる10選**をご紹介しました。

ご自身の肌質やお悩みに合わせた最適なアイテムを選ぶことで、毎日のメイクやスキンケアの満足度は劇的に向上します。ぜひ気になったアイテムから試してみてください。

---

<script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
</script>

<script type="application/ld+json">
${JSON.stringify(listSchema, null, 2)}
</script>

<script type="application/ld+json">
${JSON.stringify(faqSchema, null, 2)}
</script>
`;
}

async function main() {
  const existingMap = new Map(articlesData.map((a, i) => [a.id, i]));
  let updatedCount = 0;
  let createdCount = 0;

  for (const def of batch7Defs) {
    console.log(`\n🔍 [第7弾 楽天API通信 記事生成] ${def.id}`);
    console.log(`   クエリ: ${def.queryTarget} | KW: ${def.searchKeyword}`);

    let products = await fetchRakutenItems(def.searchKeyword, 12);
    if (products.length === 0) {
      console.warn(`⚠️ 商品取得0件のため代替KWで再試行`);
      await sleep(1000);
      products = await fetchRakutenItems(def.queryTarget.split(' ')[0], 12);
    }

    if (products.length === 0) {
      console.error(`❌ 商品取得失敗 スキップ: ${def.id}`);
      continue;
    }

    console.log(`✅ 商品${products.length}件取得完了`);
    const content = await buildContent(def, products);
    const top10 = products.slice(0, 10);

    const articleObj = {
      id: def.id,
      title: def.title,
      description: def.description,
      content,
      category: def.category,
      tags: def.tags,
      author: def.author,
      createdAt: '2026-08-31',
      updatedAt: '2026-08-31',
      image: top10[0]?.imageUrl || '',
      affiliateUrl: top10[0]?.affiliateUrl || '',
      price: top10[0]?.price || '',
      itemCount: top10.length,
      featured: def.featured
    };

    if (existingMap.has(def.id)) {
      const idx = existingMap.get(def.id);
      articlesData[idx] = articleObj;
      console.log(`🔄 [既存記事を徹底更新] ${def.title.slice(0, 40)}...`);
      updatedCount++;
    } else {
      articlesData.unshift(articleObj);
      console.log(`✨ [新規特化記事を追加] ${def.title.slice(0, 40)}...`);
      createdCount++;
    }
    await sleep(1200);
  }

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
  console.log(`\n🎉 [第7弾 楽天API直結・周辺クエリ拡張完了] 新規作成: ${createdCount}件, 更新: ${updatedCount}件 (総記事数: ${articlesData.length}件)`);
}

main().catch(e => { console.error('❌ エラー:', e); process.exit(1); });
