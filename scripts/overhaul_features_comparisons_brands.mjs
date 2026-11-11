import fs from 'fs';
import path from 'path';

console.log('🚀 [Overhaul] 特集記事363件・比較記事233件のSEOタイトル最適化＆全3506記事の権威ブランド名寄せを開始します...');

// 1. 全3506記事のブランド名判定辞書
const brandPatterns = [
  { name: 'コスメデコルテ', match: /コスメデコルテ|DECORT[EÉ]|リポソーム/i },
  { name: 'キャンメイク', match: /キャンメイク|CANMAKE/i },
  { name: 'キュレル', match: /キュレル|Curel|花王キュレル/i },
  { name: 'セザンヌ', match: /セザンヌ|CEZANNE/i },
  { name: 'KATE', match: /KATE|ケイト|リップモンスター/i },
  { name: 'ロムアンド', match: /ロムアンド|rom&?nd/i },
  { name: 'ファンケル', match: /ファンケル|FANCL/i },
  { name: 'オバジ', match: /オバジ|Obagi/i },
  { name: 'エトヴォス', match: /エトヴォス|ETVOS/i },
  { name: 'VT COSMETICS', match: /VT\s*(COSMETICS|コスメ|シカ|リードル|CICA)/i },
  { name: 'タカミ', match: /タカミ|TAKAMI|スキンピール/i },
  { name: 'ラ ロッシュ ポゼ', match: /ラ\s*ロッシュ\s*ポゼ|LA\s*ROCHE/i },
  { name: 'イニスフリー', match: /イニスフリー|innisfree/i },
  { name: 'トリデン', match: /トリデン|Torriden/i },
  { name: 'SK-II', match: /SK-II|エスケーツー/i },
  { name: 'ダルバ', match: /ダルバ|d'Alba/i },
  { name: 'ナンバーズイン', match: /ナンバーズイン|numbuzin/i },
  { name: 'イハダ', match: /イハダ|IHADA/i },
  { name: 'アテニア', match: /アテニア|Attenir/i },
  { name: 'メラノCC', match: /メラノCC/i },
  { name: '魔女工場', match: /魔女工場|manyo/i },
  { name: 'Anua', match: /アヌア|Anua|ドクダミ77/i },
  { name: 'SHISEIDO (資生堂)', match: /資生堂|SHISEIDO|エリクシール|マキアージュ/i },
  { name: 'KANEBO (カネボウ)', match: /カネボウ|KANEBO/i },
  { name: 'ルナソル', match: /ルナソル|LUNASOL/i },
  { name: 'エクセル', match: /エクセル|excel/i },
  { name: 'ポール＆ジョー', match: /ポール＆ジョー|PAUL\s*&\s*JOE/i },
  { name: 'NARS', match: /NARS|ナーズ/i },
  { name: 'アディクション', match: /アディクション|ADDICTION/i },
  { name: 'ディオール', match: /ディオール|Dior/i },
  { name: 'シャネル', match: /シャネル|CHANEL/i },
  { name: 'イヴ・サンローラン', match: /イヴ・サンローラン|YSL|Yves\s*Saint/i },
  { name: 'ランコム', match: /ランコム|LANCOME/i },
  { name: 'アベンヌ', match: /アベンヌ|Avene/i },
  { name: 'クリニーク', match: /クリニーク|CLINIQUE/i },
  { name: 'オルビス', match: /オルビス|ORBIS/i },
  { name: 'サボン', match: /サボン|SABON/i },
  { name: 'ロクシタン', match: /ロクシタン|L'OCCITANE/i },
  { name: '無印良品', match: /無印良品/i },
  { name: 'ちふれ', match: /ちふれ/i },
  { name: 'アンドビー (&be)', match: /アンドビー|&be|＆be/i },
  { name: 'CLIO (クリオ)', match: /クリオ|CLIO/i },
  { name: 'デイジーク', match: /デイジーク|dasique/i },
  { name: 'ティルティル (TIRTIR)', match: /TIRTIR|ティルティル/i }
];

// articles.json を更新
const articlesPath = path.resolve('src/data/articles.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

let brandUpdated = 0;
articles.forEach(a => {
  const text = (a.title || '') + ' ' + (a.productName || '') + ' ' + (a.introText || '') + ' ' + (a.content || '');
  for (const bp of brandPatterns) {
    if (bp.match.test(text)) {
      a.brand = bp.name;
      brandUpdated++;
      break;
    }
  }
});
console.log(`✅ [Articles Brand Overhaul] 全3,506記事中、${brandUpdated}件で公式・著名ブランド名を名寄せ設定しました。`);
fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
fs.writeFileSync(path.resolve('public/data/articles.json'), JSON.stringify(articles, null, 2), 'utf8');

// 2. src/data.ts 内の INITIAL_BLOG_POSTS と INITIAL_COMPARISONS を更新
let dataTsContent = fs.readFileSync('src/data.ts', 'utf8');

// 特集記事363件のタイトル最適化
function optimizeBlogTitle(title) {
  const m = title.match(/^【(.*?)】(.*10選.*)$/);
  if (m) {
    const trouble = m[1];
    const category10 = m[2];
    return `【${category10} おすすめ2026】${trouble}・徹底本音レビュー`;
  }
  return title;
}

// 比較記事233件のタイトル最適化
function optimizeComparisonTitle(t) {
  let body = t.replace(/^【.*?】\s*/, '').trim();
  let partA = '', partB = '';
  if (body.includes(' vs ')) {
    const parts = body.split(' vs ');
    partA = parts[0].trim();
    partB = parts[1].split('｜')[0].split('どっち')[0].trim();
  } else if (body.includes('と') && body.includes('を直接対決レビュー')) {
    const m = body.match(/^(.*?)\s*と\s*(.*?)\s*を直接対決レビュー/);
    if (m) {
      partA = m[1].trim();
      partB = m[2].trim();
    }
  }

  if (partA && partB) {
    const cleanA = partA.replace(/[\[\]]/g, '').slice(0, 20).trim();
    const cleanB = partB.replace(/[\[\]]/g, '').slice(0, 20).trim();
    return `【徹底比較】${cleanA} vs ${cleanB} どっちがおすすめ？違い・最安値を検証`;
  }
  return t;
}

// src/data.ts 内の文字列置換（正規表現による安全な置換）
const blogSectionRegex = /(export const INITIAL_BLOG_POSTS: BlogPost\[\] = )(\[[\s\S]*?\n\];)/;
const blogMatch = dataTsContent.match(blogSectionRegex);
if (blogMatch) {
  const blogs = eval(blogMatch[2].slice(0, -1));
  let blogUpdated = 0;
  blogs.forEach(b => {
    const newT = optimizeBlogTitle(b.title);
    if (newT !== b.title) {
      b.title = newT;
      blogUpdated++;
    }
  });
  console.log(`✅ [Feature/Blog Titles] 特集記事 ${blogUpdated}件のSEOタイトルを「検索語句先頭配置」に最適化しました。`);
  dataTsContent = dataTsContent.replace(blogSectionRegex, `$1${JSON.stringify(blogs, null, 2)};`);
}

const compSectionRegex = /(export const INITIAL_COMPARISONS: ProductComparison\[\] = )(\[[\s\S]*?\n\];)/;
const compMatch = dataTsContent.match(compSectionRegex);
if (compMatch) {
  const comparisons = eval(compMatch[2].slice(0, -1));
  let compUpdated = 0;
  comparisons.forEach(c => {
    const newT = optimizeComparisonTitle(c.title);
    if (newT !== c.title) {
      c.title = newT;
      compUpdated++;
    }
  });
  console.log(`✅ [Comparison Titles] 比較記事 ${compUpdated}件のSEOタイトルを「徹底比較・VS先頭配置」に最適化しました。`);
  dataTsContent = dataTsContent.replace(compSectionRegex, `$1${JSON.stringify(comparisons, null, 2)};`);
}

fs.writeFileSync('src/data.ts', dataTsContent, 'utf8');
console.log('🎉 [Success] 特集・比較・全記事ブランドのSEO全面改修が完了しました！');
