import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch162_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ162の4記事の定義
const batchDefs = [
  {
    id: 'art-non-pigmenting-eyelash-growth-serum-10sen-2026',
    slug: 'art-non-pigmenting-eyelash-growth-serum-10sen-2026',
    title: '【色素沈着しないまつ毛美容液10選】目の周りが黒ずまない＆しっかり伸びる！キャピキシル・ペプチド高配合の人気まつ育美容液比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: '目の周りのクマや色素沈着の心配ゼロでフサフサまつ毛へ！「色素沈着フリー高濃度まつ毛美容液」おすすめ10選！ビマトプロスト系成分不使用で、キャピキシルやヒト幹細胞、ワイドラッシュを高配合した敏感肌・まつパ・マツエク対応の人気モデルを徹底比較。',
    products: fetched.t1,
    lead: `「まつ毛美容液を使いたいけれど目の周りが色素沈着して茶色くくすむのが怖い」「海外製の強力な美容液でまぶたが赤く腫れたり痒みが出た」「まつ毛パーマやマツエクを長持ちさせつつ自まつ毛を太く長く育てたい」……まつ育を志すすべての人が最も重視する条件が、**「色素沈着しない・肌に優しいまつ毛美容液」**です。

緑内障治療薬成分（プロスタグランジン誘導体）を使わず、先端バイオ成分で安全にまつ毛を育みます：
1. **キャピキシルやワイドラッシュなど育毛ペプチド成分を高配合**：まつ毛のヘアサイクルを休止期から成長期へと力強く後押しし、抜けにくくコシのあるフサフサまつ毛へ誘導
2. **色素沈着の原因となる成分を完全フリー＆低刺激テスト済み処方**：デリケートな目元の皮膚に優しく、毎日のケアでクマやくすみを作るリスクを徹底排除
3. **生え際まで塗りやすい極細筆や根元から毛先まで包み込むチップ・ブラシ構造**：短いまつ毛や下まつ毛の根元にもピンポイントで美容液を届ける使い勝手抜群の設計

今回は楽天市場で「本当に伸びる＆染みない」と口コミ絶賛の人気まつ毛美容液10選を徹底比較します！`
  },
  {
    id: 'art-cica-daily-sheet-mask-30sheets-soothing-10sen-2026',
    slug: 'art-cica-daily-sheet-mask-30sheets-soothing-10sen-2026',
    title: '【CICA大容量デイリーシートマスク10選】毎日10分で肌荒れ・赤み・ニキビ鎮静！30枚入り高コスパ人気シカパック比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: '朝晩の毎日使いでゆらぎ知らずのツヤ肌へ！「大容量CICA（ツボクサエキス）デイリーシートマスク（30枚入り）」おすすめ10選！VTコスメティックスをはじめ、ピンセット付きの衛生的なボックス型で、乾燥や摩擦による赤み・肌荒れを急速鎮静する人気商品を徹底解説。',
    products: fetched.t2,
    lead: `「マスク荒れや季節の変わり目で肌がピリピリ赤くなりやすい」「毎日気軽にパックしたいけれど個包装だとゴミも増えるしコスパが悪い」「朝のメイク前にサッと10分貼るだけで日中の乾燥崩れを防ぎたい」……スキンケアの新スタンダードとして定着したのが、**「30枚入り大容量CICAデイリーシートマスク」**です。

ツボクサ由来のCICA成分が角質層のバリア機能を整え、トラブルに負けない肌を作ります：
- **高純度シカ成分（ツボクサエキス・アシアチコシド）が肌荒れや赤みをスーッと鎮静**：炎症を抑えてキメを整え、肌のゆらぎや大人ニキビを未然にブロック
- **美容液がヒタヒタに浸透した超極薄植物性シートが隙間なくピタッと密着**：忙しい朝の身支度や家事をしながらでも剥がれ落ちず、角質層の深くまで水分をチャージ
- **専用ピンセット付きの密封ボックス容器で最後の一枚まで衛生的＆乾かない**：指を入れずに取り出せるため雑菌が入らず、1枚あたり数十円の圧倒的コストパフォーマンス

今回は楽天総合ランキングで殿堂入りしている人気CICAデイリーマスク10選を徹底比較します！`
  },
  {
    id: 'art-fine-particle-magnet-gel-nail-cateye-10sen-2026',
    slug: 'art-fine-particle-magnet-gel-nail-cateye-10sen-2026',
    title: '【微粒子マグネットネイルジェル10選】シルクのような奥行きと濡れツヤ感！セルフでもサロン級のぷるマグが作れる人気キャッツアイジェル比較',
    category: 'ネイルケア',
    date: '2026-09-16',
    description: '磁石を当てるだけで光が自由自在に動く！「微粒子マグネットネイルジェル（ぷるマグ・シルクマグ）」おすすめ10選！従来の粒子よりも格段に細かいナノ微粒子マグネットパウダーを配合し、まるで水光のような幻想的な奥行きと上品な輝きを作る人気ジェルを徹底検証。',
    products: fetched.t3,
    lead: `「サロンで大人気のちゅるんとした“ぷるマグ”を自宅でセルフで楽しみたい」「昔のマグネットジェルは粒子が粗くてグレーっぽく濁ってしまう」「上品でオフィスでも浮かない、シルクのような自然な濡れツヤマグネットネイルが欲しい」……ネイル界のトレンドを席巻しているのが、**「微粒子マグネットネイルジェル」**です。

超微細な金属パウダーが光を滑らかに反射し、宝石のような立体美を生み出します：
- **磁石の当て方次第でグラデーション・フレンチ・光の輪など変幻自在なアートが可能**：爪の中心に光を集めたり外側に散らしたり、初心者でも数秒の磁石操作でプロ仕様の仕上がりに
- **ベースカラーに馴染む透明感のあるシアーカラー設計で手肌の美しさを引き立てる**：派手すぎないヌーディーベージュやピンク系なら、フォーマルや職場でも褒められる洗練ネイルに
- **ノンワイプトップジェルやワンステップジェルなど手軽に楽しめるアイテムも充実**：硬化するだけで拭き取り不要の時短アイテムや、初心者向けマグネットスティックセットも人気

今回は楽天市場でセルフネイラーから絶賛されている人気微粒子マグネットジェル10選を徹底比較します！`
  },
  {
    id: 'art-electric-nail-trimmer-grinder-safe-10sen-2026',
    slug: 'art-electric-nail-trimmer-grinder-safe-10sen-2026',
    title: '【電動爪削り・自動爪切り10選】刃物を使わず安全＆巻き爪・足の爪も綺麗！高齢者・子どもにもおすすめの回転式爪やすり比較',
    category: 'ネイルケア',
    date: '2026-09-16',
    description: '爪を切る時代から削る時代へ！「電動爪削り・自動爪切り（回転式爪やすり）」おすすめ10選！爪を押し当てるだけで自動研磨＆爪カスを内部吸引し、深爪や怪我の心配ゼロで角のない滑らかな爪先に整える人気便利グッズを徹底解説。',
    products: fetched.t4,
    lead: `「視力が落ちて普通の爪切りだと深爪したり皮膚を切りそうで怖い」「足の親指が硬い巻き爪になっていて普通の爪切りでは刃が入らない」「動き回る子どもの爪を切るのが怖くて爪やすりを使いたいけれど時間がかかる」……そんな爪切りのストレスと危険を一挙に解消するのが、**「電動爪削り・自動爪切り」**です。

高速回転する研磨ローラーが爪を優しく削り落とし、サロン帰りのような滑らかな爪先に整えます：
1. **皮膚に触れても切れない安全ガード構造で誰でも安心して使用可能**：爪だけをスリットに通して削るため、高齢者の介護用や赤ちゃんの爪ケアとしても大人気
2. **削りカスが飛び散らず本体内部に自動吸引・収納されるクリーン設計**：リビングのソファやベッドの上でも爪の飛び散りを気にせずサッと使え、ワンタッチでゴミ捨て完了
3. **USB充電式＆LEDライト付きで手元が暗い場所でもはっきり見えて作業ラクラク**：粗削り用と仕上げ磨き用の2段階スピード調節で、足の分厚い爪もあっという間に整形

今回は楽天市場でプレゼント用や介護・育児用としてもバカ売れしている人気電動爪削り10選を徹底比較します！`
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
      title: '選び方ポイント1：成分の安全性と処方の優しさをチェック',
      desc: '色素沈着成分フリーや肌荒れ防止のCICA濃度、刃が肌に触れない安全ガードなど、安心して毎日使える設計を重視しましょう。'
    },
    {
      title: '選び方ポイント2：操作性と仕上がりの美しさ・手軽さ',
      desc: '磁石の反応が良い微粒子パウダーや、取り出しやすいボックス容器、自動研磨のスピードなど使い勝手の良いものを選びましょう。'
    },
    {
      title: '選び方ポイント3：コストパフォーマンスと長期間の継続性',
      desc: '大容量シートマスクや充電式の美容器具など、日々のルーティンとして無理なく続けられる経済的なモデルを選ぶのがベストです。'
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
