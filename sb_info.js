const puppeteer = require("puppeteer");
const fs = require("fs");
const cheerio = require('cheerio');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://www.starbucks.co.kr/menu/drink_list.do");
  const html = await page.content();
  const $ = cheerio.load(html);

  // Extract data from the page
  const products = await page.$$eval(".product_list dd a", (links) => {
    return links.map((link,element) => {
      const prod = link.getAttribute("prod");
      const altText = link.querySelector("img").getAttribute("alt");
      return [prod, altText];
    });
  });

  // $('.product_list dd a').each((index, element) => {
  //   //const prodCd = $(element).attr('prod');
  //   const prodName = $(element).find('img').attr('alt');
  //   //products.push([prodCd, prodName]
  //   //const prodImage = $(element).find('img').attr('src');
  //   //products.push({ prodCd, prodName });
  //   productInfo.push({ prodName})
  // });

  // Initialize an array to store the result
  const result = [];

  // Loop through products and extract additional data
  for (const [cd, name] of products) {
    await page.goto(
      `https://www.starbucks.co.kr/menu/drink_view.do?product_cd=${cd}`
    );

    const productInfo = await page.evaluate(() => {
      const prodName = document.querySelector(".myAssignZone h4").textContent;
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

      // $('.product_list dd a').each((index, element) => {
      //   //const prodCd = $(element).attr('prod');
      //   const prodName = $(element).find('img').attr('alt');
      //   result.push(prodName)
      //   //const prodImage = $(element).find('img').attr('src');
      //   //products.push({ prodCd, prodName });
      //   //productInfo.push({ prodName})
      // });

      return {
        prodName,
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

    // Add the object to the result array
    result.push(productInfo);
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
