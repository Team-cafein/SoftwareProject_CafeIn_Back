// const puppeteer = require("puppeteer");
// const cheerio = require("cheerio");
// const fs = require("fs");

// (async () => {
//   const browser = await puppeteer.launch({ headless: "new" });

//   const page = await browser.newPage();
//   await page.goto("https://www.ediya.com/contents/drink.html");

//   // 필요한 데이터 추출
//   const products = [];

//   while (true) {
//     const html = await page.content();
//     const $ = cheerio.load(html);

//     $(".block_hot ul li").each((index, element) => {
//       const prodName = $(element).find(".menu_tt a span").text();
//       const prodImage = $(element).find("a img").attr("src");
//       products.push({ prodName, prodImage });
//     });

//     try {
//       await page.waitForFunction(
//         () => {
//           const nextButton = document.querySelector("div.con_btn a.line_btn");
//           return nextButton && nextButton.offsetParent !== null;
//         },
//         { timeout: 600000 } // 예: 10분 대기
//       );
//     } catch (error) {
//       console.error("더보기 버튼을 찾을 수 없습니다. 스크래핑을 종료합니다.");
//       break;
//     }

//     // 더보기 버튼 클릭
//     await page.evaluate(() => {
//       const nextButton = document.querySelector("div.con_btn a.line_btn");
//       nextButton.click();
//     });

//     // 페이지를 스크롤
//     await page.evaluate(() => {
//       window.scrollBy(0, window.innerHeight); // 페이지를 아래로 스크롤
//     });
//   }

//   await browser.close();

//   // 결과를 JSON 형식으로 변환
//   const resultJson = JSON.stringify(products, null, 2);

//   // 결과를 JSON 파일에 저장
//   fs.writeFileSync("ed_menu.json", resultJson, "utf-8");

//   console.log("결과가 ed_menu.json 파일에 저장되었습니다.");
// })();

/////////////////////

const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();
  await page.goto("https://www.ediya.com/contents/drink.html");

  // 필요한 데이터 추출
  const products = [];

  while (true) {
    const html = await page.content();
    const $ = cheerio.load(html);

    $(".block_hot ul li").each((index, element) => {
      const prodName = $(element).find(".menu_tt a span").text();
      //   const prodImage = $(element).find("a img").attr("src");
    //   const $img = $(element).find("a img");
    //   const prodImage = $img.attr("src");
      const $img = $(element).find("img").eq(1); // 두 번째 img 요소 선택
      const prodImage = $img.attr("src");

      // 상대 경로를 절대 URL로 변환
      const absoluteImageUrl = new URL(prodImage, page.url()).href;

      products.push({ prodName, prodImage: absoluteImageUrl });
    });

    try {
      await page.waitForFunction(
        () => {
          const nextButton = document.querySelector("div.con_btn a.line_btn");
          return nextButton && nextButton.offsetParent !== null;
        },
        { timeout: 600000 } // 예: 10분 대기
      );
    } catch (error) {
      console.error("더보기 버튼을 찾을 수 없습니다. 스크래핑을 종료합니다.");
      break;
    }

    // 더보기 버튼 클릭
    await page.evaluate(() => {
      const nextButton = document.querySelector("div.con_btn a.line_btn");
      nextButton.click();
    });

    // 페이지를 스크롤
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight); // 페이지를 아래로 스크롤
    });
  }

  await browser.close();

  // 결과를 JSON 형식으로 변환
  const resultJson = JSON.stringify(products, null, 2);

  // 결과를 JSON 파일에 저장
  fs.writeFileSync("ed_menu.json", resultJson, "utf-8");

  console.log("결과가 ed_menu.json 파일에 저장되었습니다.");
})();
