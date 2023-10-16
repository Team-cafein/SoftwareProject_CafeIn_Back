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
      const text = $(element).find(".pro_detail .detail_con p").text();
      const firstDiv = $(element).find(".pro_comp .pro_nutri dl:nth-child(1) dd");
      const kcal = firstDiv.text();
      const secondDiv = $(element).find(".pro_comp .pro_nutri dl:nth-child(2) dd");
      const sugars = secondDiv.text();
      const thirdDiv = $(element).find(".pro_comp .pro_nutri dl:nth-child(3) dd");
      const protein = thirdDiv.text();
      const fourthDiv = $(element).find(".pro_comp .pro_nutri dl:nth-child(4) dd");
      const sat_FAT = fourthDiv.text();
      const fifthDiv = $(element).find(".pro_comp .pro_nutri dl:nth-child(5) dd");
      const sodium = fifthDiv.text();
      const sixthDiv = $(element).find(".pro_comp .pro_nutri dl:nth-child(6) dd");
      const caffeine = sixthDiv.text();


      products.push({ prodName, text, kcal, sugars, protein ,sat_FAT, sodium, caffeine});
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
  fs.writeFileSync("ed_info.json", resultJson, "utf-8");

  console.log("결과가 ed_info.json 파일에 저장되었습니다.");
})();
