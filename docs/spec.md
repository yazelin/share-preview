# share-preview 分享卡預覽器 — spec

2026-07-16。行銷工具箱替換計畫第 4 案,一次替換兩個:Metatags(metatags.io)+ OpenGraph.xyz。

## 定位

貼網址,同時預覽連結在 **FB、LINE、X、Google** 上的分享長相;欄位可直接微調、預覽即時更新、一鍵複製修好的 meta 標籤。

## 比原版好在哪(替換理由)

- **LINE 預覽**:台灣行銷人最在乎的平台,Metatags 和 OpenGraph.xyz 都沒有
- 繁中介面、無 cookie 同意牆(OpenGraph.xyz 有)、無付費上桿誘導
- 可編輯即預覽(吸收 Metatags 的核心賣點):改標題/描述/圖,四張卡即時跟著變,再複製產出的 meta 標籤
- 生態相連:同一顆 Worker(marketing-page-checker,`raw=1`),頁面互連健檢器做完整檢查

誠實輸點:Metatags 可上傳圖片替換預覽(本工具只能改圖片網址);OpenGraph.xyz 有 OG 圖產生器(付費)。記入 vetting。

## 架構

前端:GitHub Pages 單檔 index.html。
抓頁:`https://marketing-page-checker.yazelinj303.workers.dev/?url=<target>&raw=1`(CORS *、SSRF 護欄、10 次/分限流,已部署並 commit)。

## 功能

1. 網址輸入 → 抓 meta → 填入狀態;`?url=` 參數自動執行(可分享)。
2. 四平台預覽(標示「示意」):FB(1.91:1 大圖卡)、LINE(聊天泡泡卡)、X(summary_large_image;twitter:card 缺/summary 時退小卡+警告)、Google(SERP)。預覽卡固定亮色(平台原生外觀)。
3. 檢查清單:og:title / og:description / og:image / twitter:card / canonical / favicon 有無;og:image 實際尺寸(Image naturalWidth)與比例警告(建議 1200×630)。
4. 微調欄位:標題、描述、圖片網址——改了即時重繪四卡。
5. 產生 meta 標籤:依目前(含微調)值產生 og:*+twitter 標籤碼,一鍵複製。
6. 錯誤處理:Worker 錯誤訊息直出(含限流 429 文案)。

## 慣例

深淺色(頁面本身)、RWD、OG/favicon、footer 三件套+回連行銷工具箱、MIT 林亞澤、正體中文。

## 不做(v1)

上傳圖片替換預覽、OG 圖產生器、歷史紀錄、截圖匯出。

## 驗收

- verify/check.cjs:`?url=` 自動抓行銷工具箱 → 四卡渲染、FB 卡標題正確、og:image naturalWidth=1200、改標題欄位 FB 卡即時更新、meta 標籤碼含 og:title;手機無橫捲。
- 對比驗收:同網址在 metatags.io / opengraph.xyz / 本工具各看預覽;LINE 卡與可編輯性為贏點,上傳圖替換為輸點,記入 toolbox vetting。
- toolbox 替換:移除 Metatags、OpenGraph.xyz 兩筆,新增分享卡預覽器(檢測類變 3 個:健檢器+PSI+本工具)。
