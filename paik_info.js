const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" }); // headless 모드 설정
  const page = await browser.newPage();

  // 스크래핑할 사이트 URL 배열
  const sites = [
    "https://paikdabang.com/menu/menu_coffee/",
    "https://paikdabang.com/menu/menu_drink/",
    "https://paikdabang.com/menu/menu_ccino/"
  ];

  const allProducts = []; // 모든 데이터를 저장할 배열

  for (const site of sites) {
    await page.goto(site);

    // 페이지 내용 가져오기
    const html = await page.content();

    // 필요한 데이터 추출
    const products = [];

    const $ = cheerio.load(html);

    $(".container .menu_list.clear ul li .hover").each((index, element) => {
      const prodName = $(element).find("h3.font-bl").text();
      const prodInfo = $(element).find("p.txt").text();
      const volume = $(element).find("p.menu_ingredient_basis").text();
      const firstDiv = $(element).find("li:nth-child(1) div:nth-child(2)");
      const caffeine = firstDiv.text();
      const secondDiv = $(element).find("li:nth-child(2) div:nth-child(2)");
      const kcal = secondDiv.text();
      const thirdDiv = $(element).find("li:nth-child(3) div:nth-child(2)");
      const sodium = thirdDiv.text();
      const fourthDiv = $(element).find("li:nth-child(4) div:nth-child(2)");
      const sugars = fourthDiv.text();
      const fifthDiv = $(element).find("li:nth-child(5) div:nth-child(2)");
      const sat_FAT = fifthDiv.text();

      products.push({ prodName, prodInfo, volume, kcal, caffeine, sodium, sugars, sat_FAT });
    });

    // 해당 사이트에서 스크래핑한 데이터를 allProducts 배열에 추가
    allProducts.push(...products);
  }

  // JSON 파일에 저장
  const resultJSON = JSON.stringify(allProducts, null, 2);
  fs.writeFileSync("paik_info.json", resultJSON, "utf-8");

  console.log("결과가 paik_info.json 파일에 저장되었습니다.");

  await browser.close();
})();
