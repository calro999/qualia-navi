import fs from 'fs';

const rawInput = `ディズニーコラボコスメ 2026	6	13	4.0
ミルボン ポイント ケア スティック 口コミ	2	29	11.4
キャラクターコラボコスメ 2026	2	8	7.5
まつ毛パーマ セルフ ランキング	1	28	21.5
アベンヌ あせも	1	10	8.7
サンリオ コラボ コスメ 2026	1	9	8.9
セブチ アンバサダー	1	8	9.9
ディズニー コラボ コスメ 2026	1	3	4.0
アベンヌウォーター あせも	1	3	7.0
2026 秋 コスメ プチプラ	1	3	12.3
カプサイシン リップ	0	18	38.2
site:vercel.app "無料ギフト" "プレゼント" -site:amazon.co.jp -site:amazon.com -site:amazonaws.com -site:aboutamazon.jp -site:primevideo.com	0	15	5.7
site:vercel.app "無料ギフト" "無料" -site:amazon.co.jp -site:amazon.com -site:amazonaws.com -site:aboutamazon.jp -site:primevideo.com	0	15	5.7
20代 コフレ 人気	0	15	39.2
site:vercel.app "無料ギフト" "獲得" -site:amazon.co.jp -site:amazon.com -site:amazonaws.com -site:aboutamazon.jp -site:primevideo.com	0	13	5.6
アイシャドウ ベース	0	13	36.9
30代 コフレ おすすめ	0	12	40.8
コフレ 人気 20代	0	12	42.6
アイシャドウベース	0	11	41.1
ザセム コンシーラー パッケージ変わった	0	10	7.1
アイブロウコート おすすめ 30代	0	10	19.6
niziu メイク	0	10	25.6
ベースメイク おすすめ 20代	0	10	42.8
化粧下地 黒ずみ	0	10	45.5
20代 ベースメイク 人気	0	10	46.6
薄膜 ファンデーション	0	9	32.0
リップ 秋	0	9	36.8
コフレ おすすめ 20代	0	9	39.0
平野紫耀 アイテム	0	9	44.0
20代 ベースメイク おすすめ	0	9	44.7
ティーフィット ミナ	0	8	7.4
ケイト スティックコンシーラー 口コミ	0	8	7.8
チェウォン メイク	0	8	16.9
コンシーラー テカリ	0	8	24.0
20代 ホリデーコフレ おすすめ	0	8	40.0
30代 コフレ 人気	0	8	42.3
ファンデーション テカリ	0	8	45.6
下地 黒ずみ	0	8	46.0
ファンデーション 黒ずみ	0	8	47.3
毛穴 ファンデーション	0	8	58.0
アイブロウコート 人気 20代	0	7	11.3
下地 くすみ おすすめ	0	7	36.3
20代 コフレ おすすめ	0	7	38.4
20代 クリスマスコフレ おすすめ	0	7	41.7
サナ 香水	0	7	69.4
le sserafim メイク	0	7	72.1
シナモン コラボ 化粧品 2026	0	6	9.7
ジェネフィック お得	0	6	16.0
アイブロウコート おすすめ 20代	0	6	16.3
アイブロウコート ランキング	0	6	23.0
下地 くすみ 人気	0	6	27.3
snow man メイク	0	6	38.2
毛穴 コンシーラー おすすめ	0	6	42.0
アイシャドウベース よれない	0	6	47.8
ファンデ うるおい	0	6	48.2
秋 コスメ 2026 プチプラ	0	5	10.0
アイリット 化粧品	0	5	11.8
アイブロウコート おすすめ	0	5	23.4
seventeen メイク	0	5	24.4
メイクアップリムーバー たるみ 口コミ	0	5	25.0
ディオール ジス	0	5	27.4
20代 ファンデーション おすすめ	0	5	39.6
コフレ おすすめ 30代	0	5	42.6
ファンデーション 毛穴 カバー	0	5	46.2
ランコム ファンデーション 成分	0	5	46.8
新作コスメ 2026	0	5	48.0
毛穴 カバー ファンデーション	0	5	48.4
更年期 スキンケア 50代 選び方	0	5	85.4
ウォンヒ 愛用 リップ ロムアンド	0	4	9.8
site:vercel.app "クーポン" "プレゼント" -site:amazon.co.jp -site:amazon.com -site:amazonaws.com -site:aboutamazon.jp -site:primevideo.com	0	4	13.3
20代 ホリデーコフレ 人気	0	4	34.0
20代 アイブロウ おすすめ	0	4	38.5
リキッドファンデーション おすすめ 20代	0	4	45.8
リップ クレンジング	0	4	48.3
眉ティント おすすめ 30代	0	4	48.3
リップ イエベ	0	4	49.0
更年期 スキンケア 50代	0	4	75.0
メイクアップリムーバー たるみ 人気	0	3	5.0
ザセム コンシーラー リニューアル	0	3	8.0
平野紫耀 化粧品	0	3	8.0
30代 アイブロウコート おすすめ	0	3	9.3
セザンヌ 下地 ライトブルー 口コミ	0	3	9.3
20代 アイブロウコート 人気	0	3	11.0
シーブリーズ 高い	0	3	17.7
シャネル リップ クリーム 口コミ	0	3	19.0
上品 リップ カラー	0	3	19.0
クリスマスコフレ おすすめ 20代	0	3	23.0
クリスマスコフレ おすすめ 30代	0	3	25.0
シーブリーズ 効果	0	3	26.3
ｏｐｅｒａ 口コミ	0	3	26.3
ホリデーコフレ おすすめ 30代	0	3	27.0
アイブロウコート おすすめ 40代	0	3	27.7
30代 クリスマスコフレ 人気	0	3	28.0
眉ティント おすすめ 20代	0	3	37.0
アイシャドウが夕方に二重の溝に溜まる。発色を長持ちさせるには？	0	3	39.0
ｏｐｅｒａ レビュー	0	3	39.3
彼女 プレゼント コスメ	0	3	40.0
20代 ファンデ おすすめ	0	3	41.3
50代 アイセラム 人気	0	3	43.0
パドルブラシ 頭皮マッサージ	0	3	43.7
眉ずみ おすすめ 20代	0	3	44.7
20代 眉ティント 人気	0	3	46.0
ローズ リップ	0	3	50.7
毛穴 が 目立た ない ファンデーション	0	3	68.7
イエベ 秋 リップ	0	3	81.0
イエベ リップ	0	3	84.0
ファンデーション 毛穴 に 入る	0	3	86.7
渡辺翔太 メイク	0	3	91.0
カリナ シャネル リップ	0	2	6.0
ホリデーコフレ 人気 20代	0	2	8.0
エスティーローダーリニュートリィブ	0	2	9.0
キュレル 皮脂トラブルケア 保湿ジェル 120ml () reviews	0	2	10.0
30代 アイブロウコート 人気	0	2	10.5
アイブロウコート 人気 30代	0	2	11.0
カプサイシンリップ	0	2	11.0
ロアライフ	0	2	11.0
site:vercel.app "クーポン" "受取" -site:amazon.co.jp -site:amazon.com -site:amazonaws.com -site:aboutamazon.jp -site:primevideo.com	0	2	17.5
シャネル リップクリーム 口コミ	0	2	18.5
site:vercel.app "クーポン" "獲得" -site:amazon.co.jp -site:amazon.com -site:amazonaws.com -site:aboutamazon.jp -site:primevideo.com	0	2	19.0
セルフまつパ おすすめ	0	2	19.5
20代 クリスマスコフレ 人気	0	2	20.0
30代 ホリデーコフレ 人気	0	2	20.5
リップピーリング	0	2	20.5
トーン アップ 下地	0	2	21.0
ルージュアリュールラック	0	2	21.0
アイブロウコート 人気	0	2	22.0
パウダー 角栓	0	2	25.0
毛穴吸引 人気	0	2	25.0
40代 アイブロウコート 人気	0	2	26.0
ウォンジョンヨ 涙袋	0	2	26.0
ファンデーション マキアージュ 口コミ	0	2	28.0
クリスマスコフレ 人気 20代	0	2	29.0
2026年秋コスメ	0	2	30.5
ホリデーコフレ おすすめ 20代	0	2	30.5
アイブロウコート おすすめ 50代	0	2	31.5
アイブロウコート 人気 40代	0	2	32.0
30代 クリスマスコフレ おすすめ	0	2	32.5
ドライシャンプー 口コミ	0	2	33.0
サボリーノ 朝用マスク 肌荒れ 口コミ	0	2	35.5
まつ毛パーマセルフキット ランキング	0	2	36.0
50代 アイブロウコート おすすめ	0	2	37.0
アイブロウ 人気 20代	0	2	37.0
乳液 ベタつかない	0	2	37.0
日焼け止め 低刺激	0	2	37.0
眉ティント 人気 40代	0	2	37.0
女性 プレゼント コスメ	0	2	38.5
20代 眉ずみ 人気	0	2	39.5
メイクアップリムーバー ざらつき おすすめ	0	2	39.5
アイブロウコート 人気 50代	0	2	40.5
20代 ファンデ 人気	0	2	42.5
アイセラム おすすめ 50代	0	2	42.5
ファンデーション おすすめ 20代	0	2	42.5
50代 アイセラム おすすめ	0	2	43.0
リードル ショット 効果 なし	0	2	43.0
毛穴隠すファンデーション	0	2	44.0
20代 眉ずみ おすすめ	0	2	45.0
20代 ファンデーション 人気	0	2	45.5
ちふれ 除光液	0	2	46.5
20代 拭き取り化粧水 おすすめ	0	2	47.0
マツエク 束感 コーティング	0	2	47.5
リップベース	0	2	47.5
20代 口紅 人気	0	2	48.5
開き 毛穴 ファンデーション おすすめ	0	2	48.5
化粧下地 美白	0	2	49.0
20代 口紅 おすすめ	0	2	49.5
化粧下地 くすみ	0	2	49.5
コフレ 人気 30代	0	2	50.0
下地 くすみ ランキング	0	2	50.0
酵素洗顔 人気 40代	0	2	50.0
眉ティント 人気 50代	0	2	50.5
毛穴 落ち しない ファンデーション	0	2	55.5
マツパ 後 美容液おすすめ	0	2	56.0
毛穴 コンシーラー	0	2	59.5
ネッククリーム 50代	0	2	69.5
ファンデーション 毛穴 落ち	0	2	77.5
デコルテ しわ ネックレス	0	2	78.5
イエベ秋 リップ	0	2	80.0
ファンデーション ランキング 30 代	0	2	80.5
4580295034776	0	2	81.0
拭き取り 化粧 水 おすすめ	0	2	83.0
リポ カプセル ビタミンc 効果	0	2	85.5
頭皮 クレンジング オイル	0	2	85.5
20代 スキンケア	0	2	94.5
スキンケア 20 代	0	2	97.0
更年期 スキンケア	0	2	98.5
"トレリアン ダーマアレルゴ セラム"	0	1	2.0
シーブリーズ 高くなった	0	1	2.0
site:vercel.app	0	1	4.0
すっぴんパウダー 口コミ	0	1	7.0
illit リップ	0	1	8.0
キャラクターコラボコスメ2026	0	1	8.0
20代 アイブロウコート おすすめ	0	1	9.0
ウォンヒ fwee	0	1	9.0
ウンチェ リップ	0	1	9.0
エスティ ローダー リニュートリィブ	0	1	9.0
エリクシール レチノパワー リンクルクリーム ba l 22g 最安値 2026	0	1	9.0
サンリオコラボ コスメ 2026	0	1	9.0
ブロウラッシュex ブロウコーティングr () reviews	0	1	9.0
ミナ tfit	0	1	9.0
ミナ コンシーラー	0	1	9.0
メイクアップリムーバー たるみ	0	1	9.0
サナ リップ	0	1	10.0
ジゼル 洗顔	0	1	10.0
メイクキープパウダー デメリット	0	1	10.0
ラネージュ jin	0	1	10.0
illit 化粧品	0	1	11.0
twice ミナ コンシーラー	0	1	11.0
クリスマスコフレ 人気 30代	0	1	11.0
セザンヌ パレットコンシーラー ハイカバー () reviews	0	1	11.0
ソフィーナ ip スキンケア uv 02 口コミ	0	1	11.0
パーフェクトホイップ ジゼル	0	1	11.0
ヴィセ or250 情熱の盾	0	1	11.0
唇 カプサイシン リップ	0	1	11.0
専科 ジゼル	0	1	11.0
innisfree イニスフリーノーセバム ブラープライマー25ml/韓国 コスメ product info and reviews	0	1	12.0
site:vercel.app "ギフトカード" "プレゼント" -site:amazon.co.jp -site:amazon.com -site:amazonaws.com -site:aboutamazon.jp -site:primevideo.com	0	1	12.0
ジゼル洗顔	0	1	12.0
セザンヌストレッチコンシーラー30	0	1	12.0
カラー剤 赤 おすすめ	0	1	13.0
アベンヌ 汗疹	0	1	14.0
リップモンスター 地底探索 口コミ	0	1	14.0
キュレル湯上がりピンク口コミ	0	1	16.0
シャネル リップ 口コミ	0	1	16.0
日焼け止め メンズ ニベア	0	1	16.0
site:vercel.app "ギフトカード" "無料" -site:amazon.co.jp -site:amazon.com -site:amazonaws.com -site:aboutamazon.jp -site:primevideo.com	0	1	17.0
シーブリーズ効果	0	1	17.0
リポシー 効果 口コミ	0	1	17.0
ホットビューラー usb	0	1	18.0
すっぴんクリーム 口コミ	0	1	19.0
ウォンジョンヨ デイリームードアップパレット	0	1	19.0
ヒロインメイク マスカラ プール	0	1	19.0
リップモンスター 成分	0	1	19.0
リポシー 口コミ	0	1	19.0
ワインレッド リップ	0	1	19.0
hana シャンプー cm	0	1	20.0
クラシック レッド リップ	0	1	20.0
ジン 化粧品 ラ ネージュ	0	1	20.0
ブレスラボ マウスウォッシュ 評価	0	1	20.0
30代 ホリデーコフレ おすすめ	0	1	21.0
アベンヌウォーター ニキビ悪化	0	1	21.0
トーンアップ下地	0	1	21.0
リードルショット 老ける	0	1	21.0
サマーズイブ かゆみ	0	1	22.0
ルージュ アリュール ラック	0	1	22.0
トーンアップ 下地	0	1	23.0
紫ヘアカラー 市販	0	1	23.0
サマーズイブ 匂い消える	0	1	24.0
ちふれ リップ 748	0	1	25.0
ウォンジョンヨ パレット	0	1	25.0
サボリーノ 敏感肌	0	1	25.0
セザンヌ パールグロウハイライト 01	0	1	25.0
カバーマーク スキンブライト クリーム cc 口コミ	0	1	26.0
スティック 美容液 おすすめ	0	1	26.0
セザンヌ 下地 オレンジ 口コミ	0	1	26.0
ダイアン ドライ シャンプー 口コミ	0	1	26.0
ケイト リップモンスター 落ちない 嘘 口コミ	0	1	27.0
シーブリーズ使い方	0	1	27.0
クレドポー血清最高のレビューを明るく	0	1	28.0
タカミスキンピール 皮むけ	0	1	28.0
マツエク 長持ち 美容 液	0	1	28.0
40代 アイブロウコート おすすめ	0	1	29.0
50代 アイブロウコート 人気	0	1	29.0
肌白くなる 下地	0	1	29.0
肌白くなる下地	0	1	29.0
hana 日焼け止め	0	1	30.0
シーブリーズ 使い方	0	1	30.0
まつ毛パーマ セルフ 国産 おすすめ	0	1	31.0
アイシャドウ 下地	0	1	31.0
オイデルミンエッセンスローション	0	1	31.0
チェウォン コスメ	0	1	32.0
ホリデーコフレ 人気 30代	0	1	32.0
春菜はな 日焼け	0	1	33.0
デオコ ボディソープ 敏感肌	0	1	35.0
キャンメイク オイルブロックミネラルパウダーc01	0	1	36.0
混合肌 化粧下地 おすすめ	0	1	36.0
アイセラム 人気 50代	0	1	37.0
アスタリフト 日焼け止め 白浮き	0	1	37.0
アベンヌ ウォーター ニキビ 悪化	0	1	37.0
ジンヘアーインプレッション 美容院	0	1	37.0
女性 化粧品 プレゼント	0	1	37.0
練り 香水 スティック	0	1	37.0
エイジングケア アイクリーム ランキング 50代	0	1	38.0
肘 カサカサ 黒い	0	1	38.0
ご褒美 コスメ	0	1	39.0
ファンデ おすすめ 20代	0	1	39.0
リップ カプサイシン	0	1	39.0
2026年秋メイク	0	1	40.0
イニスフリー パウダーファンデーション	0	1	40.0
アイ シャドウ ベース	0	1	41.0
アベンヌウォーター 効果 ない	0	1	41.0
エイジングケア アイクリーム 人気 50代	0	1	41.0
秋 リップ	0	1	41.0
透明感 下地	0	1	41.0
クッションファンデーション おすすめ 20代	0	1	42.0
ファンデーション 素肌感	0	1	42.0
ベタつか ない 乳液	0	1	42.0
眉コート	0	1	42.0
20代 リキッドファンデーション おすすめ	0	1	43.0
エイジングケア アイクリーム ランキング 40代	0	1	43.0
化粧下地 混合肌	0	1	43.0
20代 酵素洗顔 おすすめ	0	1	44.0
コンシーラー ベタつかない	0	1	44.0
ジョンハン バニラコ	0	1	44.0
高級 コンシーラー 崩れない	0	1	44.0
たるみ毛穴 ファンデーション	0	1	45.0
ドライシャンプー口コミ	0	1	45.0
高級 化粧品 プレゼント	0	1	45.0
パウダーファンデーション 脂性肌	0	1	46.0
メイクアップリムーバー たるみ ランキング	0	1	46.0
乳液 べたつかない	0	1	46.0
唇 スクラブ ラッシュ	0	1	46.0
唇 ピーリング	0	1	46.0
眉ティント 人気 30代	0	1	46.0
開き毛穴 ファンデーション おすすめ	0	1	46.0
開き毛穴 ファンデーションおすすめ	0	1	46.0
頭皮ケア 炭酸スプレー おすすめ	0	1	46.0
イニスフリー リキッドファンデーション	0	1	47.0
ロムアンド イートドトリ	0	1	47.0
頭皮ケア パドルブラシ	0	1	47.0
megumi愛用 化粧品	0	1	48.0
スティック 美容液	0	1	48.0
ファンデ 人気 20代	0	1	48.0
ホリデーコフレ おすすめ	0	1	48.0
リップ プライマー	0	1	48.0
肘ガサガサ	0	1	48.0
頭皮 日焼け 止めスプレー	0	1	48.0
頭皮マッサージ パドルブラシ	0	1	48.0
the saem コンシーラー 色	0	1	49.0
炭酸ミスト 六本木	0	1	49.0
たるみ毛穴 ファンデ	0	1	50.0
アイメイク用下地	0	1	50.0
アイライナー 滲まない	0	1	50.0
セルフまつ毛パーマ おすすめ	0	1	50.0
リッププライマー	0	1	50.0
口紅 ブルベ 秋	0	1	50.0
角質 ケア 肘	0	1	51.0
毛穴 ファンデーション おすすめ	0	1	52.0
ファンデーション 毛穴 おすすめ	0	1	53.0
ブラウンリップ 似合う人	0	1	53.0
リードルショット100 効果	0	1	53.0
ロクシタン プレゼント 嬉しくない	0	1	53.0
赤 リップ 高級	0	1	53.0
日焼け止め スプレー 頭皮	0	1	54.0
日焼け止めスプレー 頭皮	0	1	54.0
日焼け止めスプレー頭皮	0	1	54.0
アイ下地	0	1	55.0
ファンデーション 人気 30代	0	1	55.0
ブラウン リップ 似合う人	0	1	55.0
ブルベ夏 リップ 人気	0	1	55.0
皮脂崩れ ファンデーション	0	1	55.0
ウォニョンコスメ	0	1	56.0
lypo c 効果	0	1	58.0
lypo-c 効果	0	1	58.0
ラロッシュポゼ サリチル酸	0	1	58.0
フジコ 眉ティント 色比較	0	1	59.0
アラフィフ ファンデーション	0	1	60.0
フジコ眉ティント 色比較	0	1	60.0
マツパ後美容液 おすすめ	0	1	60.0
フジコ 眉 ティント 色 比較	0	1	61.0
マツエク コーティング剤 ランキング	0	1	61.0
毛穴 目立た ない ファンデーション	0	1	61.0
シルク キャップ おすすめ	0	1	62.0
シルクキャップ おすすめ	0	1	62.0
リポソームビタミンc 効果ない	0	1	62.0
更年期 スキンケア 女性ホルモン	0	1	62.0
頭皮ケア 炭酸 臭い	0	1	63.0
マツエク コーティング剤 おすすめ	0	1	64.0
唇 スクラブ ドラッグストア	0	1	65.0
毛穴 落ち ファンデ	0	1	65.0
niziu コスメ	0	1	66.0
ジョングク 香水 シャネル	0	1	66.0
肘 きれい	0	1	66.0
血色リップ	0	1	66.0
酵素洗顔 毛穴	0	1	67.0
ファンデーション 毛穴	0	1	68.0
ローズ系 リップ 人気	0	1	68.0
megumi スキンケア	0	1	69.0
ブラウン リップ イエベ秋	0	1	70.0
カールキープ マスカラ下地	0	1	71.0
更年期 スキンケア 50代 原因	0	1	71.0
肘 乾燥	0	1	72.0
頭皮 日焼け止めスプレー	0	1	72.0
頭皮の日焼け止めスプレー	0	1	72.0
頭皮日焼け止めスプレー	0	1	72.0
ニキビパッチ おすすめ	0	1	73.0
化粧品 ランキング 20 代	0	1	73.0
ブラウン リップ イエベ 秋	0	1	75.0
化粧品 20代	0	1	75.0
5000円 コスメ	0	1	76.0
コスメ ギフトセット 5000円	0	1	76.0
コスメ ギフト セット 5000 円	0	1	77.0
秋コスメ 2026	0	1	77.0
5000円 プレゼント デパコス	0	1	78.0
オイリー肌 ファンデーション	0	1	78.0
オルビス 日焼け止め リニューアル 違い	0	1	78.0
アイクリーム おすすめ 50代	0	1	79.0
コスメ 5000円	0	1	79.0
ファンデ 塗っ た 瞬間 毛穴 落ち	0	1	79.0
指原莉乃コスメ	0	1	79.0
5000円コスメ	0	1	80.0
指原莉乃 コスメ	0	1	80.0
青 クマ コンシーラー	0	1	80.0
ブラウンリップ イエベ秋	0	1	83.0
デパコス プレゼント 5000円 30代	0	1	84.0
手の甲 シワ 改善	0	1	85.0
20 代 コスメ	0	1	86.0
リードル ショット 効果	0	1	86.0
リップ イエベ秋	0	1	87.0
タイナビプロテクター 口コミ	0	1	88.0
リポカプセルビタミンc 効果	0	1	88.0
40代肌のハリを取り戻す	0	1	89.0
コンシーラー 毛穴	0	1	89.0
パドル ブラシ 効果	0	1	94.0
髪 うねり シャンプー ドラックストア	0	1	95.0
20 代 スキンケア	0	1	97.0
リポ c 効果	0	1	97.0
リポc 飲み方	0	1	98.0
4971710576306	0	1	99.0
ドライシャンプー おすすめ	0	1	100.0`;

const rawQueries = rawInput.trim().split('\n').map(l => l.split('\t')[0].trim()).filter(q => !q.startsWith('site:'));

// これまでに書き下ろしたPart1〜Part10（31記事）のID
const finishedIds = [
  'feature-disney-cosme-collab-2026',
  'art-sachiko-milbon-pointcare-stick-review',
  'art-sachiko-avene-water-asemo-acne-truth',
  'feature-disney-cosme-collab-2026',
  'art-sachiko-self-lash-perm-ranking',
  'art-sachiko-capsaicin-plumper-lip-guide',
  'art-sachiko-sanrio-cinnamon-collab-cosme-2026',
  'art-sachiko-eyebrow-coat-20s-30s-guide',
  'art-sachiko-kurozumi-keana-primer-guide',
  'art-sachiko-the-saem-concealer-package-renewal',
  'art-sachiko-50s-kounenki-skincare-guide',
  'art-sachiko-hirano-shoh-cosme-items-complete',
  'art-sachiko-kpop-idol-makeup-ambassador-guide',
  'art-sachiko-lesserafim-illit-aespa-makeup-complete',
  'art-sachiko-holiday-coffret-20s-30s-ranking',
  'art-sachiko-vt-reedleshot-effects-truth',
  'art-sachiko-lypoc-vitamin-c-timing-effects',
  'art-sachiko-paddle-brush-effects-guide',
  'art-sachiko-dry-shampoo-diane-ranking-guide',
  'art-sachiko-sea-breeze-price-effects-comparison',
  'art-sachiko-curel-sebum-trouble-care-gel-review',
  'art-sachiko-lip-peeling-scrub-primer-guide',
  'art-sachiko-scalp-uv-spray-carbonated-guide',
  'art-sachiko-autumn-2026-makeup-lip-trends',
  'art-sachiko-20s-cushion-liquid-lipstick-best',
  'art-wf-30s-keana-foundation-2026',
  'art-sachiko-elbow-dark-spots-smooth-skin-guide',
  'feature-disney-cosme-collab-2026',
  'art-sachiko-milbon-pointcare-stick-review',
  'art-sachiko-avene-water-asemo-acne-truth',
  'art-sachiko-self-lash-perm-ranking',
  'art-sachiko-capsaicin-plumper-lip-guide',
  'art-sachiko-sanrio-cinnamon-collab-cosme-2026',
  'art-sachiko-eyebrow-coat-20s-30s-guide',
  'art-sachiko-kurozumi-keana-primer-guide',
  'art-sachiko-the-saem-concealer-package-renewal',
  'art-sachiko-50s-kounenki-skincare-guide',
  'art-sachiko-hirano-shoh-cosme-items-complete',
  'art-sachiko-kpop-idol-makeup-ambassador-guide',
  'art-sachiko-lesserafim-illit-aespa-makeup-complete',
  'art-sachiko-holiday-coffret-20s-30s-ranking',
  'art-sachiko-vt-reedleshot-effects-truth',
  'art-sachiko-lypoc-vitamin-c-timing-effects',
  'art-sachiko-paddle-brush-effects-guide',
  'art-sachiko-dry-shampoo-diane-ranking-guide',
  'art-sachiko-sea-breeze-price-effects-comparison',
  'art-sachiko-curel-sebum-trouble-care-gel-review',
  'art-sachiko-lip-peeling-scrub-primer-guide',
  'art-sachiko-scalp-uv-spray-carbonated-guide',
  'art-sachiko-autumn-2026-makeup-lip-trends',
  'art-sachiko-20s-cushion-liquid-lipstick-best',
  'art-wf-30s-keana-foundation-2026',
  'art-sachiko-elbow-dark-spots-smooth-skin-guide',
  'art-peri-eyebrow-tint-long-lasting-2026',
  'art-sachiko-eyeshadow-base-creaseproof-guide',
  'art-sachiko-gift-budget-5000-depacos',
  'art-tone-up-primer-base-makeup-10sen-2026',
  'art-sachiko-tfit-concealer-mina-twice',
  'art-peri-40s-50s-eye-cream-wrinkle-ranking-2026',
  'art-sachiko-makeup-remover-tarumi-cleansing-review',
  'art-sachiko-neck-decollete-hands-wrinkle-care',
  'art-fix-mist-makeup-keep-spray-10sen-2026',
  'art-time-secret-mineral-medic-pressed-powder-2026',
  'art-sachiko-saborino-morning-mask-skin-trouble-truth',
  'art-sachiko-breath-labo-mouthwash-review',
  'art-sana-twice-ysl-libre-fragrance',
  'art-dior-jisoo-blackpink-makeup-guide',
  'art-wonjungyo-aegyosal-palette-complete-guide',
  'art-niziu-makeup-cosme-complete-guide',
  'art-sachiko-lancome-genifique-deal-guide',
  'art-chanel-rouge-allure-laque-lipcream-guide',
  'art-estee-lauder-re-nutriv-luxury-skincare-guide',
  'art-kate-stick-concealer-review-guide',
  'art-opera-lip-tint-review-guide',
  'art-chifure-lip-748-nail-remover-guide',
  'art-sachiko-elixir-retinopower-wrinkle-cream-deal-2026',
  'art-cezanne-palette-stretch-concealer-review',
  'art-larocheposay-dermallergo-salicylic-guide',
  'art-sofina-ip-skincare-uv-02-review',
  'art-enzyme-face-wash-pore-40s-ranking-2026',
  'art-scalp-cleansing-oil-pores-care-guide',
  'art-illit-makeup-cosme-guide',
  'art-megumi-skincare-cosmetics-guide',
  'art-lip-monster-chitei-tansaku-and-落ちない嘘-truth',
  'art-takami-skinpeel-peeling-truth-and-cledepeau',
  'art-summerseve-and-deoco-sensitive-care-guide',
  'art-suppin-powder-and-cream-pore-care-guide',
  'art-senka-giselle-and-innisfree-primer-guide',
  'art-covermark-cc-and-luxury-concealer-review',
  'art-silk-night-cap-hair-care-guide',
  'art-matsueku-coating-matupa-serum-ranking-2026',
  'art-20s-wiping-lotion-and-nonsticky-emulsion-guide',
  'art-usb-hot-eyelash-curler-and-smudgeproof-liner',
  'art-hair-color-red-purple-ranking-guide',
  'art-sunscreen-mens-nivea-and-orbis-renewal-guide',
  'art-solid-perfume-stick-and-sashihara-romand-guide',
  'art-50s-foundation-and-aging-care-guide',,,,,
];

const articles = JSON.parse(fs.readFileSync('src/data/articles.json', 'utf8'));
const finishedArticles = articles.filter(a => finishedIds.includes(a.id));

let covered = [];
let remaining = [];

for (const q of rawQueries) {
  const normQ = q.normalize('NFC').replace(/["'()]/g, '').toLowerCase();
  const words = normQ.split(/\s+/).filter(Boolean);
  const matched = finishedArticles.some(a => {
    const hay = ((a.title || '') + ' ' + (a.description || '') + ' ' + (a.tags || []).join(' ') + ' ' + (a.content || '')).toLowerCase();
    return words.every(w => hay.includes(w));
  });
  if (matched) {
    covered.push(q);
  } else {
    remaining.push(q);
  }
}

console.log('=== 進捗状況 ===');
console.log('全対象オーガニッククエリ:', rawQueries.length, '件');
console.log('すでに完全書き下ろし完了:', covered.length, '件 (約' + Math.round(covered.length / rawQueries.length * 100) + '%)');
console.log('残りの未対応クエリ:', remaining.length, '件 (約' + Math.round(remaining.length / rawQueries.length * 100) + '%)');

// 残りクエリをグループ分けして表示
console.log('\n=== 残りの主なクエリグループ（次に取り組むべきテーマ） ===');
const sampleRemaining = remaining.slice(0, 30);
console.log('残りの代表クエリ:', sampleRemaining);
