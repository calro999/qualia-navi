import https from 'https';
import fs from 'fs';

console.log('📡 [IndexNow Batch 77] 新規作成された第77弾特集記事および商品記事の即時インデックス送信を開始します...');

const host = 'qualia-navi.vercel.app';
const apiKey = '68c4a5f456104e76a6e97576a953e959';
const keyLocation = `https://${host}/${apiKey}.txt`;

// 送信対象のURL一覧
const targetUrls = [
  `https://${host}/`,
  `https://${host}/sitemap`,
  `https://${host}/blogs`,
  `https://${host}/features`,
  // 3つの新規冬特集記事
  `https://${host}/features/winter-nail-hardener-strengthener-repair-2026`,
  `https://${host}/features/winter-clay-cream-shampoo-nourish-moist-2026`,
  `https://${host}/features/winter-hydrating-makeup-sponge-water-puff-2026`,
  `https://${host}/features/feat-winter-nail-hardener-strengthener-repair-2026`,
  `https://${host}/features/feat-winter-clay-cream-shampoo-nourish-moist-2026`,
  `https://${host}/features/feat-winter-hydrating-makeup-sponge-water-puff-2026`
];

// 新規作成されたarticles.json内の第77弾商品URLを追加
try {
  const articles = JSON.parse(fs.readFileSync('src/data/articles.json', 'utf8'));
  const b77Articles = articles.filter(a => a.id && a.id.startsWith('art-winter-b77-'));
  b77Articles.forEach(a => {
    targetUrls.push(`https://${host}/articles/${a.id}`);
    targetUrls.push(`https://${host}/article/${a.id}`);
  });
  console.log(`第77弾の商品記事: ${b77Articles.length}件を送信リストに追加しました。`);
} catch (e) {
  console.error('articles.json読み込みエラー:', e.message);
}

console.log(`合計 ${targetUrls.length} 件のURLをIndexNow API（Bing, Copilot, Naver, Yandex等）へ送信します。`);

const postData = JSON.stringify({
  host: host,
  key: apiKey,
  keyLocation: keyLocation,
  urlList: targetUrls
});

const req = https.request({
  hostname: 'api.indexnow.org',
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(postData),
    'Connection': 'close'
  },
  timeout: 10000
}, (res) => {
  console.log(`🎉 [IndexNow 成功] HTTP ステータスコード: ${res.statusCode} (Bing/IndexNow 登録受付完了)`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error('❌ [IndexNow エラー]:', e.message);
});

req.write(postData);
req.end();
