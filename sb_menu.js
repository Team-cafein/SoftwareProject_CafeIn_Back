const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();

  await page.goto('https://www.starbucks.co.kr/menu/drink_list.do');

  // 페이지 내용 가져오기
  const html = await page.content();

  // 필요한 데이터 추출
  const products = [];

  const $ = cheerio.load(html);

  $('.product_list dd a').each((index, element) => {
    //const prodCd = $(element).attr('prod');
    const prodName = $(element).find('img').attr('alt');
    //products.push([prodCd, prodName]
    const prodImage = $(element).find('img').attr('src');
    //products.push({ prodCd, prodName });
    products.push({ prodName, prodImage })
  });

  // JSON 문자열로 변환
  const resultJson = JSON.stringify(products, null, 2);

  // 결과를 JSON 파일에 저장
  fs.writeFileSync('starbucks_menu2.json', resultJson, 'utf-8');

  console.log('결과가 starbucks_menu2.json 파일에 저장되었습니다.');

  await browser.close();
})();