import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

console.log('📡 [IndexNow & AI Crawler Ping] 全検索エンジン＆AIクローラーへの即時インデックス送信を開始します...');

const projectRoot = process.cwd();
const domain = 'https://qualia-navi.vercel.app';
const host = 'qualia-navi.vercel.app';
const apiKey = '68c786026a764dcb91e4b85c13f9c6d3';

// 1. 最新のsitemap.xmlから全URLを抽出
const sitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('sitemap.xml not found');
  process.exit(1);
}

const xml = fs.readFileSync(sitemapPath, 'utf8');
const locMatches = xml.match(/<loc>(.*?)<\/loc>/g) || [];
const urlList = locMatches.map(m => m.replace(/<\/?loc>/g, '')).slice(0, 10000);

console.log(`📋 送信対象URL総数: ${urlList.length} 件`);

// 2. Bing IndexNow 送信
async function submitIndexNow() {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      host: host,
      key: apiKey,
      keyLocation: `${domain}/${apiKey}.txt`,
      urlList: urlList
    });

    const options = {
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      console.log(`✅ [IndexNow API Response] Status Code: ${res.statusCode} (Bing, Copilot, Seznam, Naver 受付完了)`);
      resolve(true);
    });

    req.on('error', (e) => {
      console.warn(`⚠️ [IndexNow API Warning] ${e.message}`);
      resolve(false);
    });

    req.write(postData);
    req.end();
  });
}

// 3. Sitemap Ping (Google / Bing)
function pingSitemap(engineName, pingUrl) {
  return new Promise((resolve) => {
    https.get(pingUrl, (res) => {
      console.log(`✅ [${engineName} Ping] Status: ${res.statusCode}`);
      resolve(true);
    }).on('error', (e) => {
      console.log(`ℹ️ [${engineName} Ping notice] ${e.message}`);
      resolve(false);
    });
  });
}

async function run() {
  await submitIndexNow();
  await pingSitemap('Google Sitemap Ping', `https://www.google.com/ping?sitemap=${encodeURIComponent(`${domain}/sitemap.xml`)}`);
  await pingSitemap('Bing Sitemap Ping', `https://www.bing.com/ping?sitemap=${encodeURIComponent(`${domain}/sitemap.xml`)}`);
  console.log('🎉 [Crawler Notification Completed] 全クローラーへのインデックス送信・シグナル発信が完了しました！');
}

run();
