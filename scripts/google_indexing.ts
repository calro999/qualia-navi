import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import { INITIAL_ARTICLES } from '../src/data';

// Setup instructions for the user:
// 1. Create a Service Account in Google Cloud Console
// 2. Enable Web Search Indexing API
// 3. Download the JSON key and save it as 'service_account.json' in the root directory
// 4. Add the Service Account email as an 'Owner' in Google Search Console

const KEY_PATH = path.join(process.cwd(), 'service_account.json');

async function submitToIndexingApi() {
  console.log('🚀 [Google Indexing] インデックス送信バッチを開始します...');

  if (!fs.existsSync(KEY_PATH)) {
    console.error('⚠️ [Google Indexing] service_account.json が見つかりません。');
    console.error('Google Cloudからサービスアカウントキーをダウンロードして配置してください。');
    console.log('※ 今回はドライラン（シミュレーション）として実行します。');
  }

  // Get up to 200 URLs (Google API limit per batch is usually 100-200 per batch)
  const urlsToSubmit = INITIAL_ARTICLES.slice(0, 100).map((a: any) => `https://qualia-navi.com/articles/${a.id}`);
  
  console.log(`📦 [Google Indexing] ${urlsToSubmit.length} 件のURLを送信キューに追加しました。`);

  if (fs.existsSync(KEY_PATH)) {
    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: KEY_PATH,
        scopes: ['https://www.googleapis.com/auth/indexing'],
      });

      const client = await auth.getClient();
      const indexing = google.indexing({ version: 'v3', auth: client as any });

      let successCount = 0;
      for (const url of urlsToSubmit) {
        try {
          await indexing.urlNotifications.publish({
            requestBody: {
              url: url,
              type: 'URL_UPDATED', // Use URL_UPDATED for new or updated pages
            },
          });
          successCount++;
          console.log(`✅ [Google Indexing] 送信成功: ${url}`);
        } catch (err: any) {
          console.error(`❌ [Google Indexing] 送信エラー (${url}):`, err.message);
        }
        // Small delay to prevent rate limits
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      console.log(`🎉 [Google Indexing] 完了！ ${successCount} 件のURLをGoogleへプッシュしました。`);
    } catch (e: any) {
      console.error('❌ [Google Indexing] 致命的なエラー:', e.message);
    }
  } else {
    // Dry run simulation
    let successCount = 0;
    for (const url of urlsToSubmit) {
      console.log(`[DRY RUN] Googleにインデックス更新リクエストを送信: ${url}`);
      successCount++;
      await new Promise(resolve => setTimeout(resolve, 10)); // fake delay
    }
    console.log(`\n🎉 [Google Indexing] ドライラン完了！本番環境では ${successCount} 件のURLが強制インデックスキューに乗ります。`);
  }
}

submitToIndexingApi();
