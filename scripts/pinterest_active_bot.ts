import fs from 'fs';
import path from 'path';

// --- Configuration ---
const DOMAIN = 'https://qualia-navi.vercel.app';
const JSON_PATH = path.resolve(process.cwd(), 'src', 'data', 'articles.json');
// PINTEREST_ACCESS_TOKEN must be provided via environment variables in production
const ACCESS_TOKEN = process.env.PINTEREST_ACCESS_TOKEN || 'dummy_token';
const BOARD_ID = process.env.PINTEREST_BOARD_ID || 'dummy_board_id';

console.log('📌 [Pinterest Active Bot] ピンの自動投稿ジョブを起動しました。');

async function pinRandomArticle() {
  if (!fs.existsSync(JSON_PATH)) {
    console.error('⚠️ articles.json が見つかりません。');
    return;
  }

  const articles = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
  if (articles.length === 0) {
    console.log('⚠️ 記事が存在しません。');
    return;
  }

  // Pick a random article to pin
  const randomArt = articles[Math.floor(Math.random() * articles.length)];
  
  if (!randomArt.imageUrl || randomArt.imageUrl.startsWith('/')) {
    console.log(`⚠️ スキップ: 有効な画像URLがありません (${randomArt.id})`);
    return;
  }

  const pinData = {
    title: randomArt.productName || randomArt.title,
    description: `【${randomArt.categoryLabel}】 ${randomArt.introText}\n\n詳細はこちら👇\n#バズりコスメ #韓国コスメ #美容垢さんと繋がりたい`,
    link: `${DOMAIN}/articles/${randomArt.id}`,
    image_url: randomArt.imageUrl,
    board_id: BOARD_ID
  };

  console.log(`\n⏳ Pinterest APIへピン送信準備中...`);
  console.log(`- タイトル: ${pinData.title}`);
  console.log(`- リンク: ${pinData.link}`);
  console.log(`- 画像: ${pinData.image_url}`);

  if (ACCESS_TOKEN === 'dummy_token') {
    console.log(`\n✅ [DRY RUN] ピン送信成功 (シミュレーション)`);
    console.log(`※ 実際のアクセストークンが環境変数 PINTEREST_ACCESS_TOKEN に設定されると、Pinterest API(v5)へPOSTされます。`);
  } else {
    // Actual API Call to Pinterest v5
    try {
      const response = await fetch('https://api.pinterest.com/v5/pins', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          board_id: pinData.board_id,
          title: pinData.title,
          description: pinData.description,
          link: pinData.link,
          media_source: {
            source_type: "image_url",
            url: pinData.image_url
          }
        })
      });

      if (response.ok) {
        console.log(`\n✅ [SUCCESS] Pinterestへの自動ピン投稿が完了しました！`);
      } else {
        const errData = await response.json();
        console.error(`\n❌ [ERROR] APIエラー:`, errData);
      }
    } catch (error) {
      console.error(`\n❌ [ERROR] 通信エラー:`, error);
    }
  }
}

// 実行
pinRandomArticle();
