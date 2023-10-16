const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const sites = [
    "https://www.hollys.co.kr/menu/espresso.do",
    "https://www.hollys.co.kr/menu/signature.do",
    "https://www.hollys.co.kr/menu/hollyccino.do",
    "https://www.hollys.co.kr/menu/juice.do",
    "https://www.hollys.co.kr/menu/tea.do"
  ];

  for (const site of sites) {
    await page.goto(site);

    // 페이지 내용 가져오기
    const html = await page.content();

    // 필요한 데이터 추출
    const products = [];

    const $ = cheerio.load(html);

    $(".content .menu_list01.mar_t_40 li a").each((index, element) => {
      // prodName에서 HTML 태그 제거 및 <br> 태그를 공백으로 처리
      const prodName = $(element)
        .find("img")
        .attr("alt")
        .replace(/<[^>]*>?/gm, " ")
        .trim();

      let prodImage = $(element).find("img").attr("src");

      // prodImage에서 불필요한 // 제거
      prodImage = prodImage.replace(/^\/\//, "https://");

      if (prodName && prodImage) {
        products.push({ prodName, prodImage });
      }
    });

    // JSON 파일에 저장
    const resultJSON = JSON.stringify(products, null, 2);
    const fileName = `h_menu_${site.split('/').pop().split('.')[0]}.json`;
    fs.writeFileSync(fileName, resultJSON, "utf-8");

    console.log(`결과가 ${fileName} 파일에 저장되었습니다.`);
  }

  await browser.close();
})();
