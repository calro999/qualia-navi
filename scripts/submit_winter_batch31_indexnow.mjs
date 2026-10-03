import https from 'https';
import fs from 'fs';

const host = 'qualia-navi.vercel.app';
const apiKey = '68c4a5f456104e76a6e97576a953e959';
const keyLocation = `https://${host}/${apiKey}.txt`;

// 今回追加した3記事のスラッグ
const featureSlugs = [
  'winter-sparkle-glitter-eyeliner-liquid-holiday-2026',
  'winter-curl-lock-mascara-base-primer-2026',
  'winter-gentle-peeling-gel-exfoliating-gommage-2026'
];

// 今回追加したアイテムIDを読み込む
const articlesData = JSON.parse(fs.readFileSync('src/data/articles.json', 'utf8'));

const newArticleIds = articlesData
  .filter(a => a.id && a.id.startsWith('art-winter-b31-'))
  .map(a => a.id);

const urlList = [
  `https://${host}/`,
  `https://${host}/features`,
  ...featureSlugs.map(s => `https://${host}/features/${s}`),
  ...newArticleIds.map(id => `https://${host}/articles/${id}`)
];

console.log(`📡 [IndexNow 送信] 合計 ${urlList.length} 件の最新URLを送信します:`);
urlList.slice(0, 10).forEach(u => console.log(` - ${u}`));
if (urlList.length > 10) console.log(`   ... 他 ${urlList.length - 10} 件`);

const endpoints = [
  { hostname: 'api.indexnow.org', name: 'IndexNow Central Hub (All IndexNow Engines)' },
  { hostname: 'www.bing.com', name: 'Microsoft Bing & Copilot' },
  { hostname: 'yandex.com', name: 'Yandex Search' }
];

async function sendToIndexNow(endpoint) {
  return new Promise((resolve) => {
    const payload = JSON.stringify({
      host: host,
      key: apiKey,
      keyLocation: keyLocation,
      urlList: urlList
    });

    const req = https.request({
      hostname: endpoint.hostname,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(`✅ [${endpoint.name}] HTTP ${res.statusCode} ${res.statusMessage || 'OK'}`);
        resolve();
      });
    });

    req.on('error', (e) => {
      console.error(`❌ [${endpoint.name}] エラー: ${e.message}`);
      resolve();
    });

    req.write(payload);
    req.end();
  });
}

async function run() {
  for (const ep of endpoints) {
    await sendToIndexNow(ep);
  }
  console.log('🎉 [完了] すべての検索エンジン・AIクローラーへの IndexNow 即時通知が完了しました！');
}

run();
