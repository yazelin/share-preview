# 分享卡預覽器 share-preview

貼上網址,同時預覽連結在 **FB、LINE、X、Google** 上的分享卡長相;欄位可微調、四張預覽即時更新、一鍵複製修好的 meta 標籤。

**線上使用:https://yazelin.github.io/share-preview/**

免費、免註冊。支援 `?url=` 參數直達(例:`/share-preview/?url=https://example.com`)。

## 為什麼不用 metatags.io / opengraph.xyz 就好

| | metatags.io | opengraph.xyz | 這個工具 |
|--|--|--|--|
| LINE 預覽 | 無 | 無 | **有**(台灣行銷人最常被問「LINE 上長怎樣」) |
| 介面 | 英文 | 英文+cookie 同意牆 | 繁體中文 |
| 編輯即預覽 | 有(含上傳圖) | 無 | 有(改標題/描述/圖片網址) |
| 產生 meta 標籤 | 有 | 無 | 有(含實測出的 og:image 寬高) |
| 付費上桿 | 無 | OG 圖產生器付費 | 無 |

誠實說:metatags.io 可以直接上傳圖片試預覽,本工具只能改圖片網址;需要那個功能還是可以去用它。

## 檢查項目

og:title、og:description、og:image(含實際尺寸與 1200×630 比例警告)、twitter:card(缺或 summary 時 X 卡示意退成小卡)、canonical、favicon。

要連 SEO、CTA、速度、追蹤一起體檢,用[行銷頁健檢器](https://yazelin.github.io/marketing-page-checker/)。

## 架構

- 前端:GitHub Pages 單檔 index.html,零框架
- 抓頁:[行銷頁健檢器](https://github.com/yazelin/marketing-page-checker)的 Cloudflare Worker `?raw=1` 端點(開源,含 SSRF 護欄與每分鐘 10 次限流,不儲存網址)

## 開發

```bash
python3 -m http.server 8004
NODE_PATH=$(npm root -g) node verify/check.cjs http://localhost:8004/
```

## 更多工具

這是[行銷工具箱](https://yazelin.github.io/marketing-toolbox/)的自製工具之一——免費、免註冊、開瀏覽器就能用的行銷小工具書籤站。

## 關於作者

林亞澤(Yaze Lin)——工業自動化 SI 轉 AI 應用。

- Blog:https://yazelin.github.io/
- Facebook:https://www.facebook.com/yaze.lin.gm
- Buy Me a Coffee:https://buymeacoffee.com/yazelin

## License

MIT © 2026 林亞澤 (Yaze Lin)
