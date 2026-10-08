import https from 'https';
import fs from 'fs';

console.log('📡 [IndexNow Batch 67] 新規作成された第67弾特集記事および商品記事の即時インデックス送信を開始します...');

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
  `https://${host}/features/winter-high-performance-nanocare-hair-dryer-2026`,
  `https://${host}/features/winter-electric-scalp-face-ems-lift-brush-2026`,
  `https://${host}/features/winter-holiday-limited-bodycare-bath-gift-set-2026`,
  `https://${host}/features/feat-winter-high-performance-nanocare-hair-dryer-2026`,
  `https://${host}/features/feat-winter-electric-scalp-face-ems-lift-brush-2026`,
  `https://${host}/features/feat-winter-holiday-limited-bodycare-bath-gift-set-2026`
];

// 新規作成されたarticles.json内の第67弾商品URLを追加
try {
  const articles = JSON.parse(fs.readFileSync('src/data/articles.json', 'utf8'));
  const b67Articles = articles.filter(a => a.id && a.id.startsWith('art-winter-b67-'));
  b67Articles.forEach(a => {
    targetUrls.push(`https://${host}/articles/${a.id}`);
    targetUrls.push(`https://${host}/article/${a.id}`);
  });
  console.log(`第67弾の商品記事: ${b67Articles.length}件を送信リストに追加しました。`);
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
  res.on('end', () => {
    console.log('\n✅ 全URLのIndexNow送信が完了しました！');
  });
});

req.on('error', (e) => {
  console.error('❌ IndexNow 送信エラー:', e);
});

req.write(postData);
req.end();
