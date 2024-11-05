//adding Puppeteer library
const pt = require("puppeteer");

pt.launch().then(async (browser) => {
  //browser new page
  await page.pdf({ path: "example.pdf" });
  await browser.close();
});
