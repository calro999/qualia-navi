import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch171_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ171の4記事の定義
const batchDefs = [
  {
    id: 'art-makeup-setting-spray-keep-mist-10sen-2026',
    slug: 'art-makeup-setting-spray-keep-mist-10sen-2026',
    title: '【メイクキープミストおすすめ10選】マスクや汗でも一日中絶対に崩れない！コーセー系人気仕上げ用フィックススプレー比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: 'メイクの最後にシュッとひと吹きで夜まで化粧直し不要！「メイクキープミスト（セッティングスプレー）」おすすめ10選！コーセーのメイクキープミストEXをはじめ、微細なメイクコート膜が汗・皮脂・マスクの摩擦を完全ブロックし、乾燥崩れも防ぐ人気名品を徹底比較。',
    products: fetched.t1,
    lead: `「夕方になるとファンデーションがドロドロに皮脂崩れしてテカる」「マスクの内側にファンデやチークがベッタリついて恥ずかしい」「真夏の汗や湿気、エアコンの乾燥によるメイク崩れを絶対に防ぎたい」……いまやベースメイクの総仕上げに欠かせない常識アイテムが、**「メイクキープミスト（セッティングスプレー）」**です。

ファンデーションの上に極薄の耐水・耐油コーティング膜を形成します：
1. **ウォータープルーフ＆皮脂プルーフのダブル効果で化粧崩れを1日中阻止**：汗や涙、余分な皮脂を弾き返し、アイメイクやチークの鮮やかな発色を朝のままロック
2. **微細なふんわりミストが顔全体に均一に広がり、水滴でメイクがヨレない**：息苦しさやつっぱり感がなく、肌の動きに合わせて伸縮する柔軟なフィルムを形成
3. **高保湿美容液成分（ヒアルロン酸・コラーゲン・シカエキス）配合で乾燥も予防**：エアコンや外気によるカサつき・粉浮きを防ぎ、みずみずしいツヤ肌仕上がりを長時間キープ

今回はコーセーやコスメデコルテなど楽天市場で圧倒的な支持を集める人気キープミスト10選を徹底比較します！`
  },
  {
    id: 'art-under-eye-bag-liner-contour-pencil-10sen-2026',
    slug: 'art-under-eye-bag-liner-contour-pencil-10sen-2026',
    title: '【涙袋ライナー・影色ペンシル10選】描くだけで整形級のぷっくり目元！血色感影色＆ラメで自然に盛れる人気涙袋メイク比較',
    category: 'メイク小物',
    date: '2026-09-16',
    description: '下まぶたに光と影を仕込んで中顔面短縮＆デカ目効果！「涙袋ライナー（影用ペンシル＆ハイライトスティック）」おすすめ10選！クマに見えない血色グレージュ影色ライナーから、ひと塗りでぷっくりツヤが出るグリッターラメペンシルまで人気コスメを徹底解説。',
    products: fetched.t2,
    lead: `「涙袋が全くなくて目が小さく見えたり中顔面が長く見えてしまう」「茶色のアイブロウで涙袋の影を描くとクマのようにくすんで老け見えする」「ラメシャドウを涙袋に塗っても粉飛びして夕方には消えてしまう」……そんな目元の悩みを解消し、あざと可愛い立体アイを作るのが、**「涙袋ライナー（影色ペンシル）」**です。

絶妙な透け感と血色カラーが本物の皮膚の影をリアルに再現します：
- **薄付きの極薄影色（ピンクグレージュ・シアーブラウン）だから失敗知らず**：濃くつきすぎず、微笑んだ時にできる自然な陰影ラインを誰でもテクニック不要で一発再現
- **ハイライトスティックと影用ライナーが1本になった2in1タイプも大人気**：ふっくら見せたい部分に光を入れ、下側に細い影を引くだけで立体感が2倍にアップ
- **皮脂や涙に強いウォータープルーフ＆擦れに強い密着ジェル処方**：瞬きや目元の動きでも線が滲まず、夜までふっくらとした愛され目元を一日中キープ

今回はキャンメイクやケイト、韓国コスメをはじめ楽天市場で大人気の涙袋ライナー10選を徹底比較します！`
  },
  {
    id: 'art-7-color-led-phototherapy-facial-mask-10sen-2026',
    slug: 'art-7-color-led-phototherapy-facial-mask-10sen-2026',
    title: '【LED美顔マスク・光エステ10選】自宅で寝ながらサロン級フォトフェイシャル！7色の波長で毛穴・ハリ・ニキビを全方位ケアする人気光美顔器比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: '顔に着けてスイッチを押すだけの完全ハンズフリー美容！「LED光エステ美顔マスク（7色フォトフェイシャル美顔器）」おすすめ10選！赤色（コラーゲン生成）・青色（アクネ菌殺菌）・近赤外線など、特定の光波長で肌深層を刺激し、サロン級の透明美肌へ導く人気ギアを徹底検証。',
    products: fetched.t3,
    lead: `「エステサロンのフォトフェイシャルに通いたいけれど費用が高くて続けられない」「美顔器を手に持って何十分も顔に当てるのは腕が疲れて続かない」「寝転びながらスマホを見たり読書をしながら効率よくエイジングケアがしたい」……そんな美容マニアたちがこぞって導入しているのが、**「LED美顔マスク（光エステマスク）」**です。

紫外線を含まない特定の美容波長のLED光が、肌に一切の摩擦を与えずに深部へ届きます：
1. **赤色LED＋近赤外線が真皮層のコラーゲン・エラスチン産生を活性化**：加齢によるたるみ・小ジワ・ハリ不足を内側から押し上げ、ふっくらとした若々しい素肌へ
2. **青色LEDがニキビの原因菌（アクネ菌）を殺菌し皮脂分泌を正常化**：繰り返す大人ニキビや毛穴の開きを鎮静し、つるんとしたクリアな肌環境を育成
3. **顔全体を均一に覆う立体3Dマスク設計で目元・口元・フェイスラインまで光が行き渡る**：ハンズフリーだから毎晩のスキンケア後のリラックスタイムに無理なく続けられる

今回は海外セレブやSNSで話題沸騰の最新7色LED美顔マスク10選を徹底比較します！`
  },
  {
    id: 'art-hair-brush-cleaner-rake-tool-10sen-2026',
    slug: 'art-hair-brush-cleaner-rake-tool-10sen-2026',
    title: '【ヘアブラシ専用クリーナー熊手10選】奥に詰まった髪の毛・綿ホコリを一網打尽！天然毛ブラシを傷めず綺麗にする人気お掃除ツール比較',
    category: 'ヘアケア',
    date: '2026-09-16',
    description: '指や爪楊枝では取れない頑固なブラシのゴミがごっそり取れる！「ヘアブラシ専用クリーナー（熊手型お手入れブラシ）」おすすめ10選！豚毛・猪毛の高級ブラシからパドルブラシまで、密集したピンの根元に絡みついた抜け毛やホコリ・皮脂カスを一瞬で掻き出す便利ツールを徹底解説。',
    products: fetched.t4,
    lead: `「お気に入りのヘアブラシの根元に髪の毛や綿ホコリがびっしり絡まって取れない」「爪楊枝や指で取ろうとするとピンが曲がったり折れてしまう」「ホコリがついた不衛生なブラシで髪を梳かすと頭皮トラブルや髪の汚れの原因になる」……大切なヘアブラシを一生モノとして衛生的に使い続けるための必須アイテムが、**「ヘアブラシ専用クリーナー熊手」**です。

小さな熊手状の金属ワイヤーが、密集した毛束の隙間にスルリと滑り込みます：
- **先端が曲がった頑丈なスチール製レーキ（熊手）が根元の毛やホコリを一撃で掻き出す**：軽くブラシの根元を撫でるように引き抜くだけで、固まったホコリや抜け毛がゴッソリ塊で取れる快感
- **天然毛（豚毛・猪毛）の土台ゴムやクッションを傷めない先端ラウンド安全加工**：高級ブラシのデリケートなピンやクッション部分を破く心配がなく安心してお手入れ可能
- **木製ハンドルやコンパクト設計でドレッサーの引き出しに美しく収まる**：洗面所に1本置いておくだけで、家族全員のブラシをいつでも新品のような清潔さにキープ

今回はメイソンピアソンやタングルティーザー愛用者にも必須の人気ブラシクリーナー10選を徹底比較します！`
  }
];

// 記事データを構築
for (const def of batchDefs) {
  const ranking = (def.products || []).slice(0, 10).map((p, index) => {
    return {
      rank: index + 1,
      name: p.name,
      price: p.price,
      url: p.url,
      image: p.image,
      shop: p.shop,
      reviewCount: p.reviewCount,
      reviewAverage: p.reviewAverage,
      description: `${p.name}は、${def.category}ジャンルで楽天市場ユーザーから高い評価（★${p.reviewAverage}・レビュー数${p.reviewCount}件）を集める人気アイテム。実用性とコスパに優れ、日々のケアやお悩みをスマートに解決してくれます。`
    };
  });

  const buyingGuide = [
    {
      title: '選び方ポイント1：機能性とキープ力・光の波長・掻き出し力',
      desc: 'ミストの微細さと皮脂プルーフ性能、涙袋ライナーの芯の柔らかさ、LEDマスクのLED個数と波長、クリーナーのワイヤー強度などスペックを重視しましょう。'
    },
    {
      title: '選び方ポイント2：操作性と使い勝手・日常での継続しやすさ',
      desc: 'ムラなく均一に出るスプレー、手ブレしにくいペンシル、軽量で息苦しくないマスクなど、日々のルーティンにストレスなく馴染む形状を選びましょう。'
    },
    {
      title: '選び方ポイント3：肌やブラシへの優しさと安全性',
      desc: 'デリケートな目元に優しい低刺激処方や、紫外線フリーの安全LED、ブラシのクッションを傷つけないラウンド加工ワイヤーなど安全設計を確認しましょう。'
    }
  ];

  const fullArticle = {
    id: def.id,
    slug: def.slug,
    title: def.title,
    category: def.category,
    date: def.date,
    updatedAt: def.date,
    author: 'ラクコスメ編集部',
    description: def.description,
    lead: def.lead,
    buyingGuide: buyingGuide,
    ranking: ranking,
    content: `## はじめに\n\n${def.lead}\n\n## 失敗しない選び方の3つのポイント\n\n${buyingGuide.map((g, i) => `### ${i+1}. ${g.title}\n\n${g.desc}`).join('\n\n')}\n\n## おすすめ人気ランキング10選\n\n${ranking.map(r => `### 第${r.rank}位：${r.name}\n\n- **価格**: ¥${r.price.toLocaleString()}（税込）\n- **ショップ**: ${r.shop}\n- **評価**: ★${r.reviewAverage} (${r.reviewCount}件)\n\n${r.description}\n\n[楽天市場で詳細を見る](${r.url})`).join('\n\n')}\n\n## まとめ\n\n毎日のビューティー＆ライフスタイルを格上げする便利アイテム。ぜひ自分にぴったりの商品を見つけてみてください！`
  };

  // 重複チェック
  const existingIdx = articles.findIndex(a => a.id === def.id || a.slug === def.slug);
  if (existingIdx >= 0) {
    articles[existingIdx] = fullArticle;
    console.log(`Updated existing article: ${def.slug}`);
  } else {
    articles.push(fullArticle);
    console.log(`Added new article: ${def.slug}`);
  }

  if (!allSlugs.includes(def.slug)) {
    allSlugs.push(def.slug);
  }
}

// 保存
fs.writeFileSync(articlesJsonPath, JSON.stringify(articles, null, 2), 'utf-8');
fs.writeFileSync(allTxtPath, allSlugs.join('\n') + '\n', 'utf-8');

console.log(`Successfully updated articles.json and all.txt. Total articles: ${articles.length}`);
