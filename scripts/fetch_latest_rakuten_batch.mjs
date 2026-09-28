import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

const TARGET_KEYWORDS = [
  { key: 'azelaic', query: 'アゼライン酸 美容液', category: 'skincare', tag: 'アゼライン酸 毛穴 赤み' },
  { key: 'glutathione', query: 'グルタチオン 美白 美容液', category: 'skincare', tag: 'グルタチオン 透明感 白玉' },
  { key: 'pdrn', query: 'PDRN 美容液 韓国', category: 'skincare', tag: 'PDRN サーモン注射 ハリツヤ' },
  { key: 'spicule', query: 'スピキュール ニードル 美容液', category: 'skincare', tag: 'ニードルセラム 針美容液 毛穴' },
  { key: 'ceramide', query: '高保湿 セラミド クリーム 乳液', category: 'skincare', tag: 'セラミド バリア機能 インナードライ' },
  { key: 'cushion_2026', query: 'クッションファンデ 崩れない カバー力', category: 'makeup', tag: 'クッションファンデ セミマット ツヤ' },
  { key: 'plumper_lip', query: 'プランパー リップ 粘膜', category: 'lip', tag: 'プランパー ボリュームリップ ぷるぷる' },
  { key: 'mens_bb', query: 'メンズ BBクリーム バレない 自然', category: 'skincare', tag: 'メンズBB 毛穴カバー テカリ防止' },
  { key: 'scalp_serum', query: 'スカルプ 美容液 頭皮 保湿 育毛', category: 'haircare', tag: '頭皮セラム スカルプケア 抜け毛' },
  { key: 'niacinamide', query: 'ナイアシンアミド 美容液 シワ改善', category: 'skincare', tag: 'ナイアシンアミド 薬用 シワ改善 美白' }
];

async function main() {
  console.log('🚀 [楽天API直接通信] 2026年最新トレンド10テーマの商品データを直接取得します...');
  const results = {};

  for (const item of TARGET_KEYWORDS) {
    console.log(`\n📦 取得中: ${item.query}...`);
    try {
      const items = await searchRakutenDirect(item.query, 12, '-reviewCount');
      results[item.key] = {
        meta: item,
        items: items
      };
      console.log(`✅ ${items.length}件のアイテムを楽天APIから直接取得成功`);
    } catch (e) {
      console.error(`❌ エラー (${item.query}):`, e.message);
    }
  }

  if (!fs.existsSync('scratch')) {
    fs.mkdirSync('scratch', { recursive: true });
  }

  fs.writeFileSync('scratch/rakuten_latest_trend_items_2026.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('\n✨ 全テーマの楽天API直接取得データを scratch/rakuten_latest_trend_items_2026.json に保存しました！');
}

main().catch(console.error);
