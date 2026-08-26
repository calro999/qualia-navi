import fs from 'fs';

const HOST = 'qualia-navi.web.app';
const KEY = '68c4a5f456104e76a6e97576a953e959';
const KEY_LOCATION = `https://${HOST}/68c4a5f456104e76a6e97576a953e959.txt`;

const sitemapContent = fs.readFileSync('public/sitemap.xml', 'utf-8');
const urls = [...sitemapContent.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map(m => m[1]);

console.log(`📡 IndexNow: 全 ${urls.length} 件のURLをBing / IndexNow APIへ送信中...`);

const endpoints = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://search.yandex.net/indexnow'
];

async function submit() {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls.slice(0, 10000)
  };

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'User-Agent': 'QualiaNavi-SEO-Engine/2026'
        },
        body: JSON.stringify(payload)
      });
      console.log(`[IndexNow] ${ep} -> Status: ${res.status} (${res.status === 200 || res.status === 202 ? 'OK 成功' : 'Error'})`);
    } catch (e) {
      console.warn(`[IndexNow] ${ep} 送信エラー:`, e.message);
    }
  }
}

submit();
