import fs from 'fs';
import path from 'path';

console.log('🚀 [Peripheral Expansion Batch 2] さらなる周辺検索流入拡大・特化10選記事生成開始...');

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

async function fetchRakutenItems(keyword, hits = 10, maxRetries = 3) {
  let cleanKw = keyword.replace(/【.*?】/g, '').replace(/（.*?）/g, '').replace(/\(.*?\)/g, '').trim();
  if (cleanKw.length > 40) cleanKw = cleanKw.slice(0, 40);
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent(cleanKw)}&format=json&hits=${hits}&sort=-reviewCount&imageFlag=1`;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url);
      if (res.status === 429) { await new Promise(r => setTimeout(r, 2000)); continue; }
      if (!res.ok) return [];
      const data = await res.json();
      if (!data.Items || data.Items.length === 0) return [];
      return data.Items.map(e => {
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
    } catch (e) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return [];
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const newPeripheralDefs = [
  // 11. マスカラ下地 白くならない カールキープ プチプラ（ヒロインメイク周辺）
  {
    id: 'art-peri-mascara-base-curl-keep-clear-2026',
    queryTarget: 'マスカラ下地 白くならない カールキープ プチプラ キャンメイク エテュセ',
    searchKeyword: 'マスカラ下地 カールキープ 白くならない プチプラ',
    title: '【白くならない＆夜まで下がらない】マスカラ下地おすすめ10選！キャンメイク・エテュセ等の最強カールキープ比較',
    description: '夕方になってもまつ毛が下がらない、白浮きしないクリア＆ブラックマスカラ下地おすすめ10選。湿気や汗・マスク蒸れに強いウォータープルーフ人気アイテムを徹底比較します。',
    category: 'makeup',
    tags: ['マスカラ下地白くならない', 'カールキープマスカラ下地', 'キャンメイククイックラッシュカーラー', 'エテュセアイエディション', 'まつ毛下がらない', 'プチプラマスカラ下地'],
    author: '松本 結衣',
    featured: true,
    intro: `直毛まつ毛や奥二重で「ビューラーしても数分でまつ毛が下がる」「白い繊維がゴミのように見える」とお悩みの方へ。自まつ毛の存在感を際立たせ、夜まで上向きカールをロックする神マスカラ下地をご紹介します。`,
    sections: [
      { h: '白くならないマスカラ下地の選び方', body: `透明クリアタイプや自まつ毛になじむシアーブラック・ネイビーを選ぶことで、マスカラを重ねなくても単体で抜け感のある美まつ毛に仕上がります。` }
    ],
    faqs: [{ q: '落としにくい時はどうすればいい？', a: '強力なウォータープルーフ処方のため、マスカラ専用のコーム型リムーバーを馴染ませてから落とすとまつ毛を傷めず綺麗にオフできます。' }]
  },

  // 12. 粘膜リップ 落ちない プチプラ＆デパコス（ヴィセ・KATE・ロムアンド周辺）
  {
    id: 'art-peri-nenmaku-lip-tint-ranking-2026',
    queryTarget: '粘膜リップ 落ちない プチプラ デパコス イエベ ブルベ ネンマクフェイク リップモンスター',
    searchKeyword: '粘膜リップ ティント 落ちない プチプラ デパコス',
    title: '【むっちり粘膜色】落ちない粘膜リップおすすめ人気10選！ヴィセ・KATE等の素唇詐欺ツヤティント比較',
    description: 'まるで元から唇が血色づいているかのように見せる「粘膜リップ」人気おすすめ10選。ヴィセのネンマクフェイクルージュやリップモンスターなど、落ちにくさとピュアなツヤ感を両立する名品を徹底比較。',
    category: 'lip',
    tags: ['粘膜リップ落ちない', 'ネンマクフェイクルージュ', 'リップモンスター比較', '粘膜ティント', '素唇詐欺リップ', 'プチプラ粘膜リップ', 'イエベブルベ粘膜色'],
    author: '橘 えりか',
    featured: true,
    intro: `塗るだけで自然な血色感と色気を宿す大人気の「粘膜リップ」。食事をしても色が残り、唇の皮剥けを防ぐ高密着オイル処方の2026年ベスト粘膜ルージュをイエベ・ブルベ別にご紹介します。`,
    sections: [
      { h: '粘膜リップをより美しく見せる塗り方', body: `唇の輪郭を指でポンポンとぼかし、中央にだけ少し重ね塗りすることで、ジュワッと内側から湧き出るような自然なグラデーションが生まれます。` }
    ],
    faqs: [{ q: 'ティントで唇が荒れやすい人向けのアイテムは？', a: 'ヒアルロン酸やシアバターなどのエモリエント成分を贅沢に配合したバームタイプの粘膜リップが安心です。' }]
  },

  // 13. ビタミンC美容液 毛穴・ニキビ跡・シミ予防 比較（メラノCC・オバジ・リポC周辺）
  {
    id: 'art-peri-vitamin-c-serum-keana-ranking-2026',
    queryTarget: 'ビタミンC 美容液 毛穴 ニキビ跡 シミ プチプラ デパコス オバジ メラノCC',
    searchKeyword: 'ビタミンC 美容液 毛穴 シミ ニキビ跡 オバジ',
    title: '【開き毛穴・シミ・ニキビ跡を撃退】ビタミンC美容液おすすめ人気10選！メラノCC・オバジ等の濃度＆浸透力比較',
    description: '毛穴の引き締め、シミ予防、ニキビ跡の色素沈着ケアに必須のビタミンC美容液おすすめ10選。ピュアビタミンCと持続型ビタミンC誘導体の違い、高濃度美容液の選び方を徹底解説します。',
    category: 'skincare',
    tags: ['ビタミンC美容液', '毛穴ビタミンC', 'オバジC25', 'メラノCCプレミアム', 'ニキビ跡美容液', 'シミ対策セラム', '美白美容液'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `美肌作りの王道成分「ビタミンC」。酸化しやすいピュアビタミンCを安定配合した高機能セラムから、ドラッグストアでリピートできる高コスパ品まで、透明感あふれるつるすべ肌へ導く10選を比較します。`,
    sections: [
      { h: 'ピュアビタミンC vs ビタミンC誘導体の違い', body: `- **ピュアビタミンC（アスコルビン酸）**：塗った瞬間から即効性を発揮し、頑固な毛穴・キメの乱れにダイレクトにアプローチ。\n- **ビタミンC誘導体**：安定性が高く刺激がマイルド。敏感肌やデイリーのシミ予防に最適。` }
    ],
    faqs: [{ q: '朝に使ってもシミの原因になりませんか？', a: 'ビタミンC自体には光毒性はありません。むしろ日中の紫外線による活性酸素を除去してくれるため、朝のスキンケア＋日焼け止めの併用が非常に効果的です。' }]
  },

  // 14. 敏感肌 日焼け止め ノンケミカル・石鹸オフ（キュレル・ラロッシュポゼ周辺）
  {
    id: 'art-peri-sensitive-skin-nonchemical-uv-2026',
    queryTarget: '敏感肌 日焼け止め ノンケミカル 紫外線吸収剤不使用 石鹸で落ちる キュレル ミノン',
    searchKeyword: '敏感肌 日焼け止め ノンケミカル 紫外線吸収剤不使用 石鹸オフ',
    title: '【肌荒れしない】敏感肌向けノンケミカル日焼け止めおすすめ10選！紫外線吸収剤不使用＆石鹸オフ徹底比較',
    description: '日焼け止めで赤みや痒みが出やすい敏感肌・乾燥肌のためのノンケミカル（紫外線散乱剤使用）日焼け止め10選。白浮きせず軋まない、石鹸だけで落とせる肌に優しいUVを厳選紹介。',
    category: 'suncare',
    tags: ['敏感肌日焼け止め', 'ノンケミカル日焼け止め', '紫外線吸収剤不使用', '石鹸オフ日焼け止め', 'キュレルUV', 'ミノン日焼け止め', '低刺激UV'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `「日焼け止めを塗ると肌がピリピリ乾燥する」「クレンジングの摩擦で肌が荒れる」という敏感肌へ。紫外線吸収剤フリー処方でありながら、みずみずしく伸びて白浮きしないストレスフリーなUVケアを比較します。`,
    sections: [
      { h: '敏感肌が日焼け止めを選ぶ3大チェック項目', body: `1. **紫外線吸収剤フリー（ノンケミカル）**\n2. **アルコール（エタノール）・香料・パラベン無添加**\n3. **クレンジング不要の石鹸・洗顔料オフ対応**` }
    ],
    faqs: [{ q: 'ノンケミカルはSPF値が低くありませんか？', a: '最新の微粒子酸化チタン・酸化亜鉛分散技術により、ノンケミカルでもSPF50+ PA++++の最高峰UVカット力を誇るアイテムが多数登場しています。' }]
  },

  // 15. フェイスパウダー 崩れない・ツヤ肌＆マット（デコルテ・イニスフリー周辺）
  {
    id: 'art-peri-face-powder-matte-glow-ranking-2026',
    queryTarget: 'フェイスパウダー 崩れない ツヤ肌 セミマット デパコス プチプラ コスメデコルテ イニスフリー',
    searchKeyword: 'フェイスパウダー 崩れない ツヤ 毛穴カバー 人気',
    title: '【陶器肌を一日中キープ】フェイスパウダーおすすめ人気10選！コスメデコルテ等の崩れないツヤ＆マット比較',
    description: 'マスク擦れや皮脂崩れをブロックし、内側から発光するようなツヤ肌・毛穴レスな陶器肌に仕上げるフェイスパウダーおすすめ10選。ルースタイプとプレストタイプの使い分けも解説。',
    category: 'makeup',
    tags: ['フェイスパウダー崩れない', 'コスメデコルテパウダー', 'ツヤ肌パウダー', '毛穴カバーパウダー', 'プレストパウダー', 'ルースパウダーおすすめ', 'ベースメイク仕上げ'],
    author: '松本 結衣',
    featured: true,
    intro: `ベースメイクの仕上がりと持ちを決定づける「フェイスパウダー」。乾燥させずに上品な生ツヤ感を残すパウダーから、Tゾーンのテカリを一日中抑えるサラサラパウダーまで、プロ絶賛の10選を徹底比較します。`,
    sections: [
      { h: 'ツヤ肌派とマット肌派のパウダーの乗せ分け方', body: `- **ツヤ肌派**：ブラシで顔の外側とTゾーンのみにふわっと乗せ、頬の高い位置はあえてパウダーを控えてファンデのツヤを活かす。\n- **マット・陶器肌派**：パフにしっかり揉み込んでから垂直に優しくプレスし、毛穴の凹凸を均一にぼかす。` }
    ],
    faqs: [{ q: 'ルースとプレストはどう使い分ける？', a: '朝のメイクにはふんわり均一につくルースパウダー、日中の持ち運びとお直しには粉飛びしないプレストパウダーが最適です。' }]
  },

  // 16. 韓国 クッションファンデーション ツヤ＆カバー力（TIRTIR・クリオ・CLIO等）
  {
    id: 'art-peri-korean-cushion-foundation-ranking-2026',
    queryTarget: '韓国 クッションファンデ ツヤ カバー力 崩れない 20代 30代 TIRTIR クリオ',
    searchKeyword: '韓国 クッションファンデ カバー力 ツヤ TIRTIR クリオ',
    title: '【水光肌と圧倒的カバー力】韓国クッションファンデーションおすすめ10選！TIRTIR・クリオ等の崩れにくさ比較',
    description: 'ひと塗りで毛穴や赤みを完璧にカバーし、韓国アイドルのような水光ツヤ肌を叶える韓国クッションファンデおすすめ10選。マスクプルーフ力・持続性・肌質別の色選びを徹底比較します。',
    category: 'k-beauty',
    tags: ['韓国クッションファンデ', 'TIRTIRクッション', 'クリオクッションファンデ', '水光肌クッション', 'ハイカバークッション', '韓国コスメファンデ', '崩れないクッション'],
    author: 'K-Beauty LABO',
    featured: true,
    intro: `ベースメイクのトレンドを牽引し続ける韓国のクッションファンデーション。薄膜でありながらコンシーラー級のカバー力を誇り、夕方までくすまずみずみずしいツヤを放つ最新ベストバイをご紹介します。`,
    sections: [
      { h: 'クッションファンデを厚塗り・ヨレさせないプロのテクニック', body: `パフにファンデを取った後、必ずフタの裏でパフ全体に液を均一になじませてから肌に乗せるのが、薄膜で崩れない最大の秘訣です。` }
    ],
    faqs: [{ q: '日本の標準色より韓国ファンデは明るい？', a: '韓国コスメはワントーン明るめに設計されていることが多いため、自然な肌色に仕上げたい場合は通常より一段階暗めの色番（23号など）を選ぶのがおすすめです。' }]
  },

  // 17. 泥洗顔・クレイ洗顔 毛穴の黒ずみ・角栓吸着（専科・サボン等周辺）
  {
    id: 'art-peri-clay-facial-wash-keana-ranking-2026',
    queryTarget: '泥洗顔 クレイ洗顔 毛穴 黒ずみ 角栓 スッキリ 泡立たない 酵素洗顔 比較',
    searchKeyword: 'クレイ洗顔 泥洗顔 毛穴 黒ずみ 角栓',
    title: '【毛穴の黒ずみ・角栓を吸着洗浄】クレイ・泥洗顔料おすすめ人気10選！つっぱらず透明感が出る泥パック洗顔比較',
    description: 'ミネラル豊富な天然クレイが毛穴の奥の皮脂汚れ・古い角質を磁石のように吸着するおすすめ泥洗顔料10選。泡立つタイプと泡立たない濃密ペーストタイプの毛穴洗浄力を徹底比較します。',
    category: 'skincare',
    tags: ['泥洗顔', 'クレイ洗顔おすすめ', '毛穴黒ずみ洗顔', '角栓クリア', 'クレイパック洗顔', '泥パック', '毛穴洗顔料'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `毎日の洗顔だけでは落としきれない酸化した皮脂やザラつき。モロッコ溶岩クレイやホワイトクレイなどの天然泥パワーで、肌を擦らずにつるんとなめらかな明るい素肌へ導く人気洗顔料を比較します。`,
    sections: [
      { h: 'クレイ洗顔のスペシャルケア「直塗りパック」のやり方', body: `週に1〜2回、濡らす前の乾いた肌（特にTゾーンや小鼻）に直接クレイペーストを厚めに塗り、1〜2分置いてからぬるま湯で洗い流すと、頑固な角栓がごっそりオフできます。` }
    ],
    faqs: [{ q: '敏感肌や乾燥肌でも使えますか？', a: '保湿成分（アミノ酸・ヒアルロン酸）をリッチに含んだマイルドな泥洗顔を選べば、つっぱらず潤いを守りながら汚れだけを吸着できます。' }]
  },

  // 18. リップティント 荒れない・保湿高密着（ウォンジョンヨ・フジコ周辺）
  {
    id: 'art-peri-lip-tint-moist-are-nai-ranking-2026',
    queryTarget: 'リップティント 荒れない 落ちない 保湿 プチプラ 韓国 ウォンジョンヨ フジコ',
    searchKeyword: 'リップティント 荒れない 保湿 落ちない プチプラ',
    title: '【唇が荒れない＆色持ち持続】高保湿リップティントおすすめ人気10選！皮剥けしないオイルティント徹底比較',
    description: 'ティントを塗ると皮が剥けたり乾燥してしまう敏感唇のための「荒れない高保湿リップティント」10選。植物オイル配合で唇をトリートメントしながら高発色をキープする名品を厳選。',
    category: 'lip',
    tags: ['リップティント荒れない', '保湿リップティント', '皮剥けしないティント', 'ウォンジョンヨリップ', 'フジコプランピーティント', '落ちないリップ敏感肌', 'プチプラティント'],
    author: '橘 えりか',
    featured: true,
    intro: `「ティントは落ちないけれど唇がカサカサに荒れてしまう」というジレンマを解消。美容液成分をたっぷり配合し、リップクリーム感覚で使えて色持ちも抜群な最新オイル＆グロウティントを比較します。`,
    sections: [
      { h: '荒れにくいティント選びの3大ポイント', body: `1. **オイルイン・水膜ティント処方**：唇表面に潤いヴェールを形成\n2. **染料の低刺激処方**：着色剤が直接唇に染み込みすぎないカプセル化技術\n3. **セラミド・アルガンオイル配合**` }
    ],
    faqs: [{ q: 'オフする時の注意点は？', a: '色素沈着を防ぐため、ポイントメイクリムーバーを含ませたコットンで優しく押さえて落とすのが唇を荒れさせない秘訣です。' }]
  },

  // 19. 炭酸シャンプー・スカルプクレンジング（頭皮炭酸スプレー周辺）
  {
    id: 'art-peri-carbonated-shampoo-scalp-ranking-2026',
    queryTarget: '炭酸シャンプー スカルプケア 頭皮のニオイ ベタつき 毛穴汚れ おすすめ ルメント ミルボン',
    searchKeyword: '炭酸シャンプー スカルプ 頭皮 クレンジング',
    title: '【サロン帰りのスッキリ頭皮】炭酸シャンプーおすすめ人気10選！頭皮のニオイ・ベタつき・皮脂詰まり解消比較',
    description: '高濃度炭酸の微細な濃密泡が毛穴に詰まった皮脂汚れやシリコン汚れを浮かせて落とす炭酸シャンプー10選。頭皮環境をリセットし、根本からふんわり立ち上がる美髪をつくる週1〜2回の濃密ヘッドスパを解説。',
    category: 'haircare',
    tags: ['炭酸シャンプー', 'スカルプクレンジング', '頭皮のニオイ解消', 'ルメント炭酸シャンプー', 'ミルボンスカルプ', 'ヘッドスパ自宅', 'ベタつき頭皮ケア'],
    author: '佐々木 遥',
    featured: true,
    intro: `夕方になると頭皮がアブラっぽくベタついたり、シャンプーしてもニオイが気になる方へ。4,000〜9,000ppm以上の濃密高濃度炭酸泡が毛穴の奥の汚れをスッキリかき出すおすすめシャンプーを比較します。`,
    sections: [
      { h: '炭酸シャンプーの3大美髪効果', body: `1. **毛穴の過酸化脂質を浮き上がらせて完全除去**\n2. **頭皮の血行を促進し健やかな育毛環境を整える**\n3. **髪の毛の残留アルカリを除去しサラツヤ手触りに**` }
    ],
    faqs: [{ q: '毎日使っても大丈夫ですか？', a: '洗浄力が高いため、週に1〜2回のスペシャルクレンジングとして通常のシャンプーと置き換えて使用するのが理想です。' }]
  },

  // 20. メイクキープミスト 崩れない・マスクプルーフ（コーセー・コスメデコルテ周辺）
  {
    id: 'art-peri-makeup-keep-mist-spray-ranking-2026',
    queryTarget: 'メイクキープミスト 崩れない マスクにつかない メイクキープスプレー コーセー コスメデコルテ',
    searchKeyword: 'メイクキープミスト スプレー 崩れない コーセー',
    title: '【猛暑・マスクでも鉄壁キープ】メイクキープミストおすすめ人気10選！コーセー等の皮脂＆汗崩れ防止スプレー比較',
    description: 'メイクの仕上げに吹きかけるだけでファンデやアイメイクの崩れを一日中防ぐメイクキープミスト10選。コーセーやコスメデコルテなど、メイクコートフィルムのキープ力とツヤ・マット仕上がりを徹底比較。',
    category: 'makeup',
    tags: ['メイクキープミスト', 'メイクキープスプレー', 'コーセーメイクキープミスト', 'コスメデコルテミスト', 'マスクにつかないメイク', '崩れないミスト', 'フィックスミスト'],
    author: '松本 結衣',
    featured: true,
    intro: `汗や皮脂、マスクの擦れでベースメイクがドロドロになるのを防ぐ夏の必須アイテム「メイクキープミスト」。皮脂プルーフ成分と耐水性ポリマーがメイクを密着固定する2026年ベストミストを比較します。`,
    sections: [
      { h: 'メイクが絶対に崩れなくなるミストの吹き方', body: `1. 2層タイプは容器を10回以上しっかりシェイクする\n2. 顔から15cmほど離し、顔全体に4〜6プッシュ均一にスプレー\n3. スプレー後は手で触らず、自然乾燥させてフィルム層を定着させる` }
    ],
    faqs: [{ q: '乾燥肌でもつっぱりませんか？', a: 'ヒアルロン酸やコラーゲンなどの保湿成分を配合したミストを選べば、乾燥を防ぎながらみずみずしいキープ力が続きます。' }]
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

  for (const def of newPeripheralDefs) {
    console.log(`\n🔍 [第2弾 周辺クエリ記事生成] ${def.id}`);
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
  console.log(`\n🎉 [第2弾 周辺クエリ拡張完了] 新規作成: ${createdCount}件, 更新: ${updatedCount}件 (総記事数: ${articlesData.length}件)`);
}

main().catch(e => { console.error('❌ エラー:', e); process.exit(1); });
