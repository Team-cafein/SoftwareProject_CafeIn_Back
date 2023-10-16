const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://www.starbucks.co.kr/menu/drink_list.do");

  // Extract data from the page
  const products = await page.$$eval(".product_list dd a", (links) => {
    return links.map((link) => {
      const prod = link.getAttribute("prod");
      const altText = link.querySelector("img").getAttribute("alt");
      return [prod, altText];
    });
  });

  // Initialize an array to store the result
  const result = [];

  // Loop through products and extract additional data
  for (const [cd, name] of products) {
    await page.goto(
      `https://www.starbucks.co.kr/menu/drink_view.do?product_cd=${cd}`
    );

    const productInfo = await page.evaluate(() => {
      const text = document.querySelector(".myAssignZone p.t1").textContent;
      const volume = document.querySelector(
        ".product_info_head #product_info01"
      ).textContent;
      const kcal = document.querySelector(
        ".product_info_content .kcal dd"
      ).textContent;
      const sat_FAT = document.querySelector(
        ".product_info_content .sat_FAT dd"
      ).textContent;
      //   const protein = document.querySelector(
      //     ".product_info_content .protein dd"
      //   ).textContent;
      //   const fat = document.querySelector(
      //     ".product_info_content .fat dd"
      //   ).textContent;
      //   const trans_FAT = document.querySelector(
      //     ".product_info_content .trans_FAT dd"
      //   ).textContent;
      const sodium = document.querySelector(
        ".product_info_content .sodium dd"
      ).textContent;
      const sugars = document.querySelector(
        ".product_info_content .sugars dd"
      ).textContent;
      const caffeine = document.querySelector(
        ".product_info_content .caffeine dd"
      ).textContent;
      //   const cholesterol = document.querySelector(
      //     ".product_info_content .cholesterol dd"
      //   ).textContent;
      //   const chabo = document.querySelector(
      //     ".product_info_content .chabo dd"
      //   ).textContent;

      return {
        text,
        volume,
        kcal,
        sat_FAT,
        // protein,
        // fat,
        // trans_FAT,
        sodium,
        sugars,
        caffeine,
        // cholesterol,
        // chabo,
      };
    });

    // Create an object to store the data
    const container = {
      //   cd,
      // name,
      productInfo,
    };

    // Add the object to the result array
    result.push(container);
  }

  // Convert the result to a JSON string
  const resultJSON = JSON.stringify(result, null, 2);

  // Save data to a .json file
  fs.writeFile("starbucks_info2.json", resultJSON, (err) => {
    if (err) throw err;
    console.log("starbucks_info2.json 파일에 저장되었습니다.");
  });

  await browser.close();
})();
