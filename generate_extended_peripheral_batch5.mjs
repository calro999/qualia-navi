import fs from 'fs';
import path from 'path';

console.log('🚀 [Natural Peripheral Expansion Batch 5] 実用＆悩み解決特化10選記事生成開始...');

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

const batch5Defs = [
  // 41. かかと 角質ケア クリーム・やすり・靴下（フットケア周辺）
  {
    id: 'art-peri-heel-cracked-skin-care-2026',
    queryTarget: 'かかと 角質ケア ひび割れ ガサガサ クリーム やすり 靴下 削らない おすすめ 尿素',
    searchKeyword: 'かかと 角質ケア ひび割れ クリーム やすり 靴下',
    title: '【ガサガサ・ひび割れかかとがつるつる】かかと角質ケアおすすめ人気10選！削らない保湿クリーム＆靴下比較',
    description: 'ストッキングが引っかかる頑固なかかとの角質・ひび割れを柔らかくするおすすめフットケア10選。尿素高配合クリーム、履くだけ角質ケア靴下、ガラス製やすりの使い分けを徹底解説します。',
    category: 'bodycare',
    tags: ['かかと角質ケア', 'かかとのひび割れ', 'ガサガサかかと', 'かかとやすり', '尿素クリーム', 'かかとつるつる靴下', 'フットケアおすすめ'],
    author: '佐々木 遥',
    featured: true,
    intro: `サンダルを履く季節や冬の乾燥期に気になる「かかとのガサガサ・ひび割れ」。削りすぎて皮膚を痛めることなく、ふっくら柔らかな素足を取り戻すための人気アイテムを比較します。`,
    sections: [
      { h: 'かかとの角質を悪化させない3大ルール', body: `1. **お風呂でふやかしてから優しく保湿する**\n2. **金属やすりで削りすぎず、ガラス製や保湿パックを活用する**\n3. **高濃度尿素またはワセリンを塗って靴下で密封する**` }
    ],
    faqs: [{ q: '毎日やすりで削ってもいいですか？', a: '削りすぎると肌が防御反応で余計に角質を厚くするため、やすりは週1回程度にとどめ、毎日の保湿を徹底してください。' }]
  },

  // 42. ティント＆口紅専用 クレンジングリムーバー（リップケア周辺）
  {
    id: 'art-peri-lip-tint-remover-cleansing-2026',
    queryTarget: 'リップリムーバー ティント専用 クレンジング 色素沈着 落ちない口紅 唇に優しい エチュード',
    searchKeyword: 'リップリムーバー ティント落とし リップクレンジング',
    title: '【強力ティントも擦らずオフ】リップ専用リムーバーおすすめ10選！唇の色素沈着＆乾燥を防ぐクレンジング比較',
    description: '落ちないティントやマットリップを擦らずスルンと落とすリップ専用リムーバー10選。色素沈着や縦ジワの乾燥を防ぎ、唇のくすみをリセットする人気アイテムを徹底比較。',
    category: 'lip',
    tags: ['リップリムーバー', 'ティント落とし', 'リップクレンジング', '唇の色素沈着防止', 'ポイントメイクリムーバー', 'エチュードリップリムーバー', 'リップケア'],
    author: '橘 えりか',
    featured: true,
    intro: `「ティントが落ちなくてゴシゴシ擦ってしまう」「唇がくすんで元の色が暗くなった」という方へ。唇のシワに入り込んだ染料を浮かせて落とすリップ専用クレンジングをご紹介します。`,
    sections: [
      { h: '色素沈着を残さない正しいリップオフ法', body: `コットンにリムーバーをたっぷり浸し、唇に当てて5秒間なじませてから、縦ジワに沿って優しく拭き取ります。口角のキワは綿棒を使うと綺麗に落とせます。` }
    ],
    faqs: [{ q: '通常のクレンジングオイルでは不十分？', a: '高密着ティントは油分だけでなく染料成分が唇に定着しているため、専用の溶解成分を含むリムーバーが最も負担なく落とせます。' }]
  },

  // 43. 眉毛用コーム・ハサミ・シェーバー（アイブロウツール周辺）
  {
    id: 'art-peri-eyebrow-trimmer-scissors-tools-2026',
    queryTarget: '眉毛 シェーバー ハサミ コーム 眉のお手入れ 失敗しない 初心者 パナソニック フェリエ',
    searchKeyword: '眉毛 シェーバー ハサミ コーム フェリエ',
    title: '【サロン級の美眉に整える】眉毛シェーバー＆眉ハサミおすすめ人気10選！失敗しない眉のお手入れツール比較',
    description: '眉の形をキレイに整える電動フェイスシェーバー、コーム付きハサミ、毛抜きおすすめ10選。パナソニックのフェリエをはじめ、肌を傷めず左右対称の眉をつくる使い方を徹底解説します。',
    category: 'device',
    tags: ['眉毛シェーバー', '眉ハサミ', 'パナソニックフェリエ', '眉毛のお手入れ', '眉コーム', '電動シェーバー女性用', '美眉ツール'],
    author: '松本 結衣',
    featured: true,
    intro: `眉メイクのクオリティを底上げする「自眉の整え方」。カミソリ負けを防ぎながら細かい産毛までキレイに処理できるシェーバーと、長さを均一に揃える専用ハサミを比較します。`,
    sections: [
      { h: '失敗しない眉カットの3ステップ', body: `1. スクリューブラシで毛流れを上と下へとかす\n2. 眉のアウトラインからはみ出た長い毛だけをコーム付きハサミでカット\n3. 眉下の余分な産毛を電動シェーバーで優しく剃る` }
    ],
    faqs: [{ q: '眉の上側は剃ってもいい？', a: '眉の上側（眉山）を大きく削ると表情が不自然になりやすいため、基本は「眉下」と「眉間」の産毛を整えるのが自然です。' }]
  },

  // 44. まつ毛美容液 色素沈着しない・伸びる（まつ毛ケア周辺）
  {
    id: 'art-peri-eyelash-serum-no-pigmentation-2026',
    queryTarget: 'まつ毛美容液 色素沈着しない 伸びる ハリ コシ まつ育 プチプラ スカルプD ラッシュアディクト',
    searchKeyword: 'まつ毛美容液 色素沈着しない 伸びる スカルプD ラッシュアディクト',
    title: '【色素沈着しない＆ハリコシ実感】まつ毛美容液おすすめ人気10選！まつ育成分と安全な塗り方比較',
    description: '目の周りが黒ずまない（色素沈着フリー）処方でありながら、自まつ毛を太く長く育てる人気まつ毛美容液10選。ペプチドやキャピキシル配合の人気アイテムを徹底比較します。',
    category: 'makeup',
    tags: ['まつ毛美容液色素沈着しない', 'まつ毛美容液伸びる', 'ラッシュアディクト', 'スカルプDまつ毛美容液', 'まつ育美容液', 'まつ毛ハリコシ', 'アイラッシュセラム'],
    author: '松本 結衣',
    featured: true,
    intro: `「マツエクやパーマでまつ毛が細くなった」「強すぎる美容液で目の周りが赤く色素沈着した」という方へ。刺激を抑えながら根元から健やかな美まつ毛を育む安心のまつ毛美容液を厳選しました。`,
    sections: [
      { h: '色素沈着を起こさない安全な塗り方', body: `美容液をつけすぎず、筆先をボトルのフチでしっかりしごいてから、アイラインを引くように「上まつ毛の生え際」にサッとひと塗りするのがポイントです。目の中に入らないよう注意しましょう。` }
    ],
    faqs: [{ q: '効果が出るまでどのくらいかかる？', a: 'まつ毛の毛周期（約1〜2ヶ月）に合わせて毎日夜に継続使用することで、4〜8週間でハリ・コシの変化を実感できます。' }]
  },

  // 45. ヘアブラシクリーナー・お手入れ（パドルブラシ・ヘアケア周辺）
  {
    id: 'art-peri-hair-brush-cleaner-care-2026',
    queryTarget: 'ヘアブラシ クリーナー 掃除 髪の毛 ホコリ 汚れ落とし アヴェダ タングルティーザー',
    searchKeyword: 'ヘアブラシ クリーナー 掃除 髪の毛 ホコリ',
    title: '【ブラシに絡まった髪とホコリを一瞬で除去】ヘアブラシクリーナーおすすめ人気10選！お気に入りブラシのお手入れ比較',
    description: 'パドルブラシや獣毛ブラシの根本に溜まる髪の毛やホコリ・皮脂汚れをごっそりかき出すヘアブラシクリーナー10選。水洗いできるブラシとできない木製ブラシの正しいお手入れ法を徹底解説。',
    category: 'haircare',
    tags: ['ヘアブラシクリーナー', 'ヘアブラシ掃除', 'パドルブラシお手入れ', 'タングルティーザー掃除', 'ヘアブラシホコリ取り', 'ブラシお手入れグッズ'],
    author: '佐々木 遥',
    featured: true,
    intro: `毎日使うヘアブラシの根元に溜まる髪の毛や皮脂汚れ。放置すると頭皮トラブルの原因にもなるため、専用の熊手型クリーナーを使って常に清潔な美髪環境を保つお手入れグッズをご紹介します。`,
    sections: [
      { h: 'ブラシのタイプ別お手入れ手順', body: `- **プラスチック製ブラシ**：ぬるま湯に重曹やシャンプーを溶かしてつけ置き洗い\n- **木製・パドルブラシ**：水洗いは避け、クリーナーでホコリをかき出した後に固く絞った布で拭く` }
    ],
    faqs: [{ q: '掃除の頻度はどのくらいが良い？', a: '絡まった髪の毛は毎日取り除き、週に1回クリーナーで根本のホコリをかき出すのが衛生的です。' }]
  },

  // 46. メイクスポンジ・パフ 洗剤＆専用クレンザー（ベースメイクツール周辺）
  {
    id: 'art-peri-makeup-sponge-cleanser-detergent-2026',
    queryTarget: 'メイクスポンジ 洗剤 パフクリーナー 洗い方 雑菌 ニキビ予防 資生堂 ダイソー',
    searchKeyword: 'パフ クリーナー スポンジ 洗剤 資生堂',
    title: '【ファンデ汚れが瞬時に落ちる】メイクスポンジ・パフ専用洗剤おすすめ10選！雑菌・肌荒れを防ぐ正しい洗い方',
    description: 'ファンデーションや皮脂で汚れたパフやビューティーブレンダーの汚れを素早く分解するパフクリーナーおすすめ10選。スポンジを傷めずふわふわ感を長持ちさせる洗い方を徹底比較。',
    category: 'makeup',
    tags: ['メイクスポンジ洗剤', 'パフクリーナー', 'スポンジの洗い方', '資生堂スポンジクリーナー', 'パフの雑菌対策', '肌荒れ予防メイクツール'],
    author: '松本 結衣',
    featured: true,
    intro: `汚れたままのパフやスポンジを使い続けると、雑菌が繁殖してニキビや肌荒れの原因に。少量を馴染ませてもみ洗いするだけで、新品のように真っ白ふわふわに戻る専用洗剤をご紹介します。`,
    sections: [
      { h: 'スポンジを長持ちさせる洗い方3ステップ', body: `1. 乾いた状態のスポンジに洗剤を直接垂らす\n2. 指の腹で優しく揉み込んでファンデーションを浮かす\n3. ぬるま湯で濁りがなくなるまでしっかりすすぎ、陰干しで完全乾燥させる` }
    ],
    faqs: [{ q: '中性洗剤（食器用洗剤）で代用してもいい？', a: '代用も可能ですが、専用洗剤は柔軟成分や抗菌成分が含まれておりスポンジの劣化や肌刺激を防げます。' }]
  },

  // 47. 薬用美白ボディミルク・ボディローション（ボディケア・美白周辺）
  {
    id: 'art-peri-whitening-body-milk-lotion-2026',
    queryTarget: '美白 ボディミルク ボディローション 薬用 日焼けあと 透明感 保湿 ベタつかない ニベア ファンケル',
    searchKeyword: '美白 ボディミルク ボディローション 薬用 ニベア',
    title: '【全身の透明感とツヤ肌】薬用美白ボディミルク・ローションおすすめ人気10選！日焼け跡をケアする高保湿比較',
    description: '首元・腕・脚などの日焼け後の色ムラや乾燥くすみをケアする薬用美白ボディミルク10選。トラネキサム酸やビタミンC誘導体配合で、ベタつかずスーッと伸びる人気アイテムを徹底比較。',
    category: 'bodycare',
    tags: ['美白ボディミルク', '美白ボディローション', '薬用ボディケア', '日焼け跡ケア', 'ニベアプレミアムボディミルク', '全身透明感', 'ボディ美白'],
    author: '佐々木 遥',
    featured: true,
    intro: `顔だけでなく首元や腕、デコルテまでトーンの揃った透明美肌へ。お風呂上がりの保湿と同時にメラニンの生成を抑え、シミ・そばかすを防ぐ優秀ボディミルクをご紹介します。`,
    sections: [
      { h: '効果的なボディ美白の塗り方', body: `お風呂から上がって水分が少し残っている状態（3分以内）に塗ると、角層が柔らかいため美白成分が奥まで浸透しやすくなります。` }
    ],
    faqs: [{ q: '夏でもベタつかずに使えますか？', a: 'みずみずしいジェルローションタイプやウォーターインミルクなら、塗った直後に服を着てもサラサラです。' }]
  },

  // 48. 寝ぐせ直しウォーター・スタイリングミスト（ヘアケア・朝の時短周辺）
  {
    id: 'art-peri-bed-hair-water-styling-mist-2026',
    queryTarget: '寝ぐせ直し ウォーター ミスト スタイリング 速乾 サラサラ 香り うねり プチプラ リーゼ',
    searchKeyword: '寝ぐせ直し ウォーター ミスト スタイリング 速乾',
    title: '【朝の頑固なハネ・うねりを瞬間リセット】寝ぐせ直しウォーターおすすめ10選！アイロンの熱から守るミスト比較',
    description: '頑固な寝癖や前髪の割れを素早く直す寝ぐせ直しウォーター10選。速乾性に優れ、ヒートプロテクト成分でドライヤーやヘアアイロンの熱ダメージを防ぐ名品を徹底比較します。',
    category: 'haircare',
    tags: ['寝ぐせ直しウォーター', 'スタイリングミスト', '寝癖直しスプレー', '朝の時短ヘア', 'ヒートプロテクトミスト', 'リーゼ寝ぐせ直し', 'プチプラヘアミスト'],
    author: '佐々木 遥',
    featured: true,
    intro: `水で濡らすだけでは直らない頑固な根元の寝癖。髪の内部の水素結合をすばやく組み替える浸透補修ウォーターで、朝のスタイリング時間を半減させる人気アイテムをご紹介します。`,
    sections: [
      { h: '寝癖を最速で直すスプレーポイント', body: `毛先ではなく「髪の根元（頭皮近く）」にしっかりスプレーし、手ぐしで根元を立ち上げながらドライヤーの温風を当てると一瞬で直ります。` }
    ],
    faqs: [{ q: '水で濡らすのと何が違うの？', a: 'アミノ酸や保湿成分が配合されているため、髪の奥まで素早く浸透し、乾いた後のパサつきや静電気を防ぎます。' }]
  },

  // 49. 薬用リップ美容液・プランプエッセンス（リップケア・ボリューム周辺）
  {
    id: 'art-peri-medicated-lip-essence-serum-2026',
    queryTarget: 'リップ美容液 薬用 エッセンス 唇の美容液 プランパー チューブ 夜用 日中 ディオバーム',
    searchKeyword: 'リップ美容液 薬用 エッセンス 唇 高保湿 チューブ',
    title: '【縦ジワ消滅・ぷるんと弾む】薬用リップ美容液おすすめ人気10選！チューブ型高保湿エッセンス比較',
    description: '荒れやすい唇を集中補修し、内側から押し上げるようなハリを与える薬用リップ美容液10選。ベタつかず濃厚に密着するチューブタイプや美容成分高配合の人気アイテムを徹底比較。',
    category: 'lip',
    tags: ['リップ美容液', '薬用リップエッセンス', '唇の縦ジワ美容液', 'リップセラム', 'チューブ型リップ', '高密着リップトリートメント'],
    author: '橘 えりか',
    featured: true,
    intro: `リップクリームでは物足りない深刻な乾燥や縦ジワに。濃厚な美容液成分が唇をラッピングし、口紅の下地にも夜の集中パックにも使えるマルチリップセラムを厳選しました。`,
    sections: [
      { h: 'リップ美容液の上手な使い方', body: `メイク前のリップ下地として使う場合は、塗ってから2分置いてティッシュオフしてから口紅を重ねると、ツヤ感と落ちにくさが両立します。` }
    ],
    faqs: [{ q: 'グロス代わりに使ってもいい？', a: '透明感のある自然なツヤが出るため、ノーメイクの日やナチュラルメイクのグロス代わりとしても非常に人気です。' }]
  },

  // 50. 携帯用ミニコスメ・トラベルコスメセット（持ち歩き・お直し周辺）
  {
    id: 'art-peri-portable-mini-cosme-travel-set-2026',
    queryTarget: 'ミニコスメ 持ち歩き トラベルセット 旅行用 お直し スキンケア ミニサイズ デパコス プチプラ',
    searchKeyword: 'ミニコスメ トラベルセット 持ち歩き お直し ミニサイズ',
    title: '【ポーチが軽くなる＆お直しに便利】ミニサイズコスメ＆トラベルセットおすすめ人気10選！デパコス・プチプラ比較',
    description: '旅行やジム、普段のポーチに入れてもかさばらないミニサイズコスメ＆スキンケアセット10選。お直しに最適なミニリップ、ミニクッション、限定トライアルキットを徹底比較します。',
    category: 'makeup',
    tags: ['ミニコスメ', 'トラベルコスメセット', '持ち歩きコスメ', 'お直しコスメミニ', 'ミニサイズリップ', 'トライアルセット', '旅行用スキンケア'],
    author: 'トレンド編集部',
    featured: true,
    intro: `「現品を使い切れない」「小さなバッグでお出かけしたい」というニーズに応えるミニコスメ。使い切りやすいサイズ感でお試しにも最適な2026年人気ミニコスメセットをご紹介します。`,
    sections: [
      { h: 'ミニコスメが選ばれる3つのメリット', body: `1. **衛生的**：鮮度が高いうちに使い切れる\n2. **コスパ**：デパコスの高級アイテムを手頃な価格で試せる\n3. **携帯性**：小さめバッグやポーチにすっきり収まる` }
    ],
    faqs: [{ q: 'プレゼントにも向いていますか？', a: 'パッケージが可愛いミニリップセットやスキンケアキットは、友人へのギフトや自分へのご褒美として大人気です。' }]
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

  for (const def of batch5Defs) {
    console.log(`\n🔍 [第5弾 実用周辺クエリ記事生成] ${def.id}`);
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
  console.log(`\n🎉 [第5弾 実用周辺クエリ拡張完了] 新規作成: ${createdCount}件, 更新: ${updatedCount}件 (総記事数: ${articlesData.length}件)`);
}

main().catch(e => { console.error('❌ エラー:', e); process.exit(1); });
