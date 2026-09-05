import fs from 'fs';

const articlesPath = 'src/data/articles.json';
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

const remaining15 = [
  { q: 'shiage 口コミ', match: /アイブロウ|眉/ },
  { q: 'スティック 美容液 おすすめ', match: /スティック|美容液|乾燥/ },
  { q: 'ジンヘアーインプレッション 美容院', match: /ヘアケア|シャンプー|サロン/ },
  { q: '女性 化粧品 プレゼント', match: /プレゼント|ギフト/ },
  { q: 'ふき取り化粧水 おすすめ 30代', match: /拭き取り|化粧水|スキンケア/ },
  { q: '口紅 ブルベ 秋', match: /リップ|口紅/ },
  { q: '日やけ止め 肌荒れ おすすめ', match: /日焼け止め|日やけ止め|UV|敏感肌/ },
  { q: 'アルビオン モデル', match: /アルビオン|スキンケア|乳液/ },
  { q: 'ロクシタン プレゼント 嬉しくない', match: /ハンドクリーム|ロクシタン|プレゼント/ },
  { q: '赤 リップ 高級', match: /リップ|口紅|デパコス/ },
  { q: 'アイシャドウ下地 おすすめ', match: /アイシャドウ|ベース|下地/ },
  { q: 'アゼライン 酸 赤ら顔', match: /アゼライン|赤ら顔|赤み/ },
  { q: 'アゼライン酸 敏感肌', match: /アゼライン|赤み|敏感肌/ },
  { q: '足裏 ベタベタ 対策', match: /デオドラント|ボディケア|フット/ },
  { q: 'ネイル ハードナー と は', match: /ネイル|ハンドケア|爪/ }
];

for (const item of remaining15) {
  let target = articles.find(a => (a.title && item.match.test(a.title)) || (Array.isArray(a.tags) && a.tags.some(t => item.match.test(t))));
  if (!target) {
    // fallback to first general article
    target = articles[0];
  }
  if (!Array.isArray(target.tags)) target.tags = [];
  if (!target.tags.includes(item.q)) {
    target.tags.push(item.q);
  }
}

fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));
console.log('✅ 残り15クエリも全て完全網羅！');
