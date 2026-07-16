// 用法: NODE_PATH=$(npm root -g) node verify/check.cjs <url>
// ?url= 自動抓行銷工具箱 → 四卡渲染、FB 標題正確、og:image 1200 寬、編輯即時更新、code 含 og:title;手機無橫捲
const { chromium, devices } = require('playwright');

const TARGET = 'https://yazelin.github.io/marketing-toolbox/';

(async () => {
  const url = process.argv[2] || 'http://localhost:8004/';
  const opts = process.env.PW_CHANNEL === 'none' ? {} : { channel: 'chrome' };
  const browser = await chromium.launch(opts);

  const page = await (await browser.newContext({ viewport: { width: 1280, height: 1100 } })).newPage();
  await page.goto(url + '?url=' + encodeURIComponent(TARGET), { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#previews:not([hidden])', { timeout: 30000 });
  await page.waitForTimeout(2500); // 等 og:image onload

  const fbTitle = await page.textContent('#ti-fb');
  const titleOk = fbTitle.includes('行銷工具箱');
  const cards = await page.evaluate(() => ({
    line: !!document.querySelector('#ti-line').textContent,
    x: !!document.querySelector('#ti-x').textContent,
    g: !!document.querySelector('#ti-g').textContent,
    imgW: (document.querySelector('#img-fb img') || {}).naturalWidth || 0,
    xSmall: document.querySelector('#x-card').classList.contains('small'),
  }));

  // 編輯即時更新
  await page.fill('#e-title', '改過的標題測試');
  const edited = (await page.textContent('#ti-fb')).includes('改過的標題測試');
  const code = await page.textContent('#code');
  const codeOk = code.includes('og:title') && code.includes('改過的標題測試');

  // 手機
  const m = await (await browser.newContext({ ...devices['iPhone 13'] })).newPage();
  await m.goto(url + '?url=' + encodeURIComponent(TARGET), { waitUntil: 'domcontentloaded' });
  await m.waitForSelector('#previews:not([hidden])', { timeout: 30000 });
  const hscroll = await m.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);

  const out = { titleOk, ...cards, edited, codeOk, hscroll };
  console.log(JSON.stringify(out));
  await browser.close();
  const pass = titleOk && cards.line && cards.x && cards.g && cards.imgW === 1200
    && !cards.xSmall && edited && codeOk && !hscroll;
  if (!pass) process.exit(1);
})().catch((e) => { console.error(e.message); process.exit(1); });
