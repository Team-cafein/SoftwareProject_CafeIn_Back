const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();

  await page.goto("https://paikdabang.com/menu/menu_coffee/");

  // 페이지 내용 가져오기
  const html = await page.content();

  // 필요한 데이터 추출
  const products = [];

  const $ = cheerio.load(html);

  $(".container .menu_list.clear ul li").each((index, element) => {
    const prodName = $(element).find("p.menu_tit").text();
    const prodImage = $(element).find("div.thumb img").attr("src");
    if (prodName && prodImage) {
      products.push({ prodName, prodImage });
    }
  });

  // JSON 파일에 저장
  const resultJSON = JSON.stringify(products, null, 2);
  fs.writeFileSync("paik_c_menu.json", resultJSON, "utf-8");

  console.log("결과가 paik_c_menu.json 파일에 저장되었습니다.");

  await browser.close();
})();
