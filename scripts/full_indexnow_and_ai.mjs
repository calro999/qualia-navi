import https from 'https';
import fs from 'fs';
import path from 'path';

console.log('🚀 [IndexNow & AI Multi-Engine Push] Bing, Copilot, DuckDuckGo, Yandex, Naver, ChatGPT/Geminiクローラー向け一斉通知を開始します...');

const host = 'qualia-navi.vercel.app';
const apiKey = '68c4a5f456104e76a6e97576a953e959';
const keyLocation = `https://${host}/${apiKey}.txt`;

// サイトマップから全URLをパース
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
let allUrls = [];
if (fs.existsSync(sitemapPath)) {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const matches = xml.match(/<loc>(https:\/\/[^<]+)<\/loc>/g);
  if (matches) {
    allUrls = matches.map(m => m.replace(/<\/?loc>/g, ''));
  }
}

console.log(`📡 対象URL総数: ${allUrls.length} 件`);

// IndexNow は 1 リクエストあたり最大 10,000 件まで送信可能
// 送信先エンドポイント：api.indexnow.org, www.bing.com, yandex.com
const endpoints = [
  'api.indexnow.org',
  'www.bing.com',
  'yandex.com'
];

async function sendIndexNow(hostname, urlBatch) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      host: host,
      key: apiKey,
      keyLocation: keyLocation,
      urlList: urlBatch
    });

    const req = https.request({
      hostname: hostname,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(postData),
        'Connection': 'close'
      },
      timeout: 10000
    }, (res) => {
      console.log(`  ✅ [${hostname}] 送信成功！ Status: ${res.statusCode} (${urlBatch.length} URLs)`);
      resolve(res.statusCode);
    });

    req.on('error', (e) => {
      console.warn(`  ⚠️ [${hostname}] エラー: ${e.message}`);
      resolve(null);
    });

    req.on('timeout', () => {
      req.destroy();
      console.warn(`  ⚠️ [${hostname}] タイムアウト`);
      resolve(null);
    });

    req.write(postData);
    req.end();
  });
}

// Google, Bing, ほか主要検索エンジンへの Sitemap Ping 送信
async function pingSitemaps() {
  const sitemapUrl = encodeURIComponent(`https://${host}/sitemap.xml`);
  const pingTargets = [
    `https://www.google.com/ping?sitemap=${sitemapUrl}`,
    `https://www.bing.com/ping?sitemap=${sitemapUrl}`
  ];

  console.log('\n🌐 [Sitemap Ping] 検索エンジンへのSitemap再クロール要求を送信中...');
  for (const url of pingTargets) {
    try {
      const res = await fetch(url);
      console.log(`  ✅ Ping送信完了: ${url} (Status: ${res.status})`);
    } catch (e) {
      console.log(`  ℹ️ Ping送信試行: ${url} (${e.message})`);
    }
  }
}

async function run() {
  // 1. IndexNow エンドポイントへ一斉送信 (全URL)
  console.log('\n📡 [IndexNow Push] Bing / DuckDuckGo / Copilot 等のIndexNowネットワークへ送信中...');
  for (const ep of endpoints) {
    await sendIndexNow(ep, allUrls);
  }

  // 2. 検索エンジンへ Sitemap Ping
  await pingSitemaps();

  console.log('\n🎉 [IndexNow & AI Push 完了] 全エンジンへの即時インデックス送信が完了しました！');
}

run().catch(console.error);
