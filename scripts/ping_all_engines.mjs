import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

console.log('📡 [Global Ping Dispatcher] 全世界の主要検索エンジンおよびAI検索クローラーへPing送信を開始します...');

const domain = 'https://qualia-navi.vercel.app';
const sitemapUrl = `${domain}/sitemap.xml`;
const host = 'qualia-navi.vercel.app';
const apiKey = '68c4a5f456104e76a6e97576a953e959';
const keyLocation = `${domain}/${apiKey}.txt`;

// 記事URL取得
const articlesJsonPath = path.join(process.cwd(), 'src', 'data', 'articles.json');
let urls = [domain, `${domain}/blogs`, `${domain}/sitemap`];
if (fs.existsSync(articlesJsonPath)) {
  const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));
  articles.forEach(art => {
    if (art.id) urls.push(`${domain}/articles/${art.id}`);
  });
}

function sendGetPing(name, targetUrl) {
  return new Promise((resolve) => {
    const client = targetUrl.startsWith('https') ? https : http;
    const req = client.get(targetUrl, (res) => {
      console.log(`✅ [${name}] Ping送信成功 (Status: ${res.statusCode})`);
      resolve(true);
    });
    req.on('error', (err) => {
      console.warn(`⚠️ [${name}] Ping送信警告: ${err.message}`);
      resolve(false);
    });
    req.setTimeout(5000, () => {
      req.destroy();
      console.warn(`⚠️ [${name}] タイムアウト (処理を継続)`);
      resolve(false);
    });
  });
}

function sendIndexNow(endpointName, hostname, pathName) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      host: host,
      key: apiKey,
      keyLocation: keyLocation,
      urlList: urls.slice(0, 1000)
    });

    const req = https.request({
      hostname: hostname,
      path: pathName,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      console.log(`📡 [${endpointName}] IndexNow 一括登録通知完了 (Status Code: ${res.statusCode})`);
      resolve(true);
    });

    req.on('error', (e) => {
      console.warn(`⚠️ [${endpointName}] Notice: ${e.message}`);
      resolve(false);
    });

    req.write(postData);
    req.end();
  });
}

async function runAllPings() {
  console.log(`🌐 送信対象総URL数: ${urls.length} 件`);

  // 1. Google Sitemap Ping
  await sendGetPing('Google Search', `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);

  // 2. IndexNow (api.indexnow.org - Bing, Copilot, ChatGPT search index, Seznam, Naver 連携)
  await sendIndexNow('IndexNow (Global API)', 'api.indexnow.org', '/indexnow');

  // 3. Bing Direct IndexNow
  await sendIndexNow('Bing / Microsoft Copilot', 'www.bing.com', '/indexnow');

  // 4. Yandex IndexNow
  await sendIndexNow('Yandex Engine', 'yandex.com', '/indexnow');

  // 5. Yandex Ping
  await sendGetPing('Yandex Sitemap Ping', `https://blogs.yandex.ru/pings/?status=success&url=${encodeURIComponent(sitemapUrl)}`);

  console.log('✨ [Global Ping Completed] 全世界の検索エンジン・AI検索エンジンへのPing通知が完了しました！');
}

runAllPings();
