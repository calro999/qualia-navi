import https from 'https';
import http from 'http';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

console.log('🌐 [Global Search & AI Indexing Broadcast] 全世界検索エンジン・AIクローラーへの通知を開始します...\n');

const domain = 'https://qualia-navi.vercel.app';
const host = 'qualia-navi.vercel.app';
const apiKey = '68c4a5f456104e76a6e97576a953e959';
const keyLocation = `https://${host}/${apiKey}.txt`;

// 記事URL取得
const articleIds = [];
const jsonPath = resolve(process.cwd(), 'src', 'data', 'articles.json');
if (existsSync(jsonPath)) {
  const jsonContent = readFileSync(jsonPath, 'utf8');
  const articles = JSON.parse(jsonContent);
  articles.forEach(art => {
    if (art.id && !articleIds.includes(art.id)) {
      articleIds.push(art.id);
    }
  });
}

const sitemapUrl = `${domain}/sitemap.xml`;
const llmsUrl = `${domain}/llms.txt`;
const llmsFullUrl = `${domain}/llms-full.txt`;

// 全2,722件＋静的主要ページ
const allUrls = [
  `${domain}/`,
  `${domain}/blogs`,
  `${domain}/compare`,
  ...articleIds.map(id => `${domain}/articles/${id}`)
];

console.log(`📊 対象URL総数: ${allUrls.length} 件`);

// 1. IndexNow エンドポイント送信 (IndexNow / Bing / Yandex / Seznam / Naver 等)
const indexNowEndpoints = [
  { hostname: 'api.indexnow.org', name: 'IndexNow Central Hub (All IndexNow Engines)' },
  { hostname: 'www.bing.com', name: 'Microsoft Bing & Copilot' },
  { hostname: 'yandex.com', name: 'Yandex Search' }
];

async function submitIndexNowBatch(hostname, name, batchUrls, batchNum) {
  return new Promise((resolvePromise) => {
    const postData = JSON.stringify({
      host: host,
      key: apiKey,
      keyLocation: keyLocation,
      urlList: batchUrls
    });

    const req = https.request({
      hostname: hostname,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 10000
    }, (res) => {
      console.log(`✅ [${name}] Batch ${batchNum} (${batchUrls.length} URLs) -> Status: ${res.statusCode}`);
      resolvePromise(res.statusCode);
    });

    req.on('error', (e) => {
      console.warn(`⚠️ [${name}] Batch ${batchNum} Warning: ${e.message}`);
      resolvePromise(null);
    });

    req.on('timeout', () => {
      req.destroy();
      console.warn(`⚠️ [${name}] Batch ${batchNum} Timeout`);
      resolvePromise(null);
    });

    req.write(postData);
    req.end();
  });
}

// 2. Google / Bing サイトマップ Ping
async function pingSitemap(engineName, pingUrl) {
  return new Promise((resolvePromise) => {
    try {
      const client = pingUrl.startsWith('https') ? https : http;
      client.get(pingUrl, (res) => {
        console.log(`📡 [Sitemap Ping - ${engineName}] Response Status: ${res.statusCode}`);
        resolvePromise(res.statusCode);
      }).on('error', (err) => {
        console.warn(`⚠️ [Sitemap Ping - ${engineName}] Note: ${err.message}`);
        resolvePromise(null);
      });
    } catch (e) {
      resolvePromise(null);
    }
  });
}

// 3. WebSub / PubSubHubbub / LLMフィード通知
async function pingPubSubHubbub() {
  return new Promise((resolvePromise) => {
    const postData = new URLSearchParams({
      'hub.mode': 'publish',
      'hub.url': sitemapUrl
    }).toString();

    const req = https.request({
      hostname: 'pubsubhubbub.appspot.com',
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 8000
    }, (res) => {
      console.log(`📡 [Google PubSubHubbub / Real-Time Push] Status: ${res.statusCode} (リアルタイムクローラー配信完了)`);
      resolvePromise(res.statusCode);
    });

    req.on('error', (e) => {
      console.warn(`⚠️ [PubSubHubbub] ${e.message}`);
      resolvePromise(null);
    });

    req.write(postData);
    req.end();
  });
}

async function main() {
  // 1. IndexNow を 1,000 件ずつのバッチで全件配信
  console.log('--- 1. IndexNow 即時インデックス送信 (全件分割配信) ---');
  const batchSize = 1000;
  for (let i = 0; i < allUrls.length; i += batchSize) {
    const batch = allUrls.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    for (const ep of indexNowEndpoints) {
      await submitIndexNowBatch(ep.hostname, ep.name, batch, batchNum);
    }
  }

  // 2. サイトマップ＆リアルタイム通知
  console.log('\n--- 2. 各種検索エンジン・クローラー向け サイトマップ＆リアルタイムPing ---');
  await pingSitemap('Google Sitemap Ping', `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
  await pingSitemap('Bing Sitemap Ping', `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
  await pingPubSubHubbub();

  console.log('\n✨ [完了] Google, Bing, Copilot, Yandex, IndexNow, AIクローラーへのインデックス送信・通知がすべて完了しました！');
}

main();
