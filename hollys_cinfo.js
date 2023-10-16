// const puppeteer = require('puppeteer');
// const fs = require('fs');

// (async () => {
//   const browser = await puppeteer.launch({ headless: "new" });
//   const page = await browser.newPage();

//   const sites = ['https://www.hollys.co.kr/menu/espresso.do'];

//   const scrapedData = {}; // Move this outside of the loop to accumulate data

//   for (const site of sites) {
//     await page.goto(site);

//     for (let i = 1; i <= 900; i++) {
//       const elementId = `menuView1_${i}`;
//       const menuViewElement = await page.$(`#${elementId}`);

//       if (menuViewElement) {
//         const menuDetailElement = await menuViewElement.$('.menu_detail');
//         const menuInfoElement = await menuDetailElement.$('p.menu_info');

//         if (menuInfoElement) {
//           const text = await page.evaluate(el => el.textContent.trim(), menuInfoElement);
//           scrapedData[elementId] = { text: text };
//         } else {
//           // 'menu_info' 요소가 없는 경우 빈 객체로 저장
//           scrapedData[elementId] = {};
//         }
//       }
//     }

//     const jsonData = JSON.stringify(scrapedData, null, 2); // Save the whole scrapedData object
//     const fileName = site.split('/').pop().split('.')[0] + '_info.json';
//     fs.writeFileSync(fileName, jsonData);

//     console.log(`Data from ${site} has been saved to ${fileName}`);
//   }

//   await browser.close();
// })();


// /////////////////

// const puppeteer = require('puppeteer');
// const fs = require('fs');

// (async () => {
//   const browser = await puppeteer.launch({ headless: "new" });
//   const page = await browser.newPage();

//   const sites = [
//     'https://www.hollys.co.kr/menu/espresso.do',
//     'https://www.hollys.co.kr/menu/signature.do',
//     'https://www.hollys.co.kr/menu/hollyccino.do',
//     'https://www.hollys.co.kr/menu/juice.do',
//     'https://www.hollys.co.kr/menu/tea.do'
//   ];

//   const scrapedData = {};

//   for (const site of sites) {
//     await page.goto(site);

//     for (let i = 1; i <= 900; i++) {
//       const elementId = `menuView1_${i}`;
//       const menuViewElement = await page.$(`#${elementId}`);

//       if (menuViewElement) {
//         const menuDetailElement = await menuViewElement.$('.menu_detail');
//         const menuInfoElement = await menuDetailElement.$('p.menu_info');

//         if (menuInfoElement) {
//           const text = await page.evaluate(el => el.textContent.trim(), menuInfoElement);
//           scrapedData[elementId] = { text: text };
//         } else {
//           // 'menu_info' 요소가 없는 경우 빈 객체로 저장
//           scrapedData[elementId] = {};
//         }
//       }
//     }

//     const jsonData = JSON.stringify(scrapedData, null, 2);
//     const fileName = site.split('/').pop().split('.')[0] + '_info.json';
//     fs.writeFileSync(fileName, jsonData);

//     console.log(`Data from ${site} has been saved to ${fileName}`);
//   }

//   await browser.close();
// })();


/////////////////
////////////////

const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const sites = [
    'https://www.hollys.co.kr/menu/espresso.do',
    'https://www.hollys.co.kr/menu/signature.do',
    'https://www.hollys.co.kr/menu/hollyccino.do',
    'https://www.hollys.co.kr/menu/juice.do',
    'https://www.hollys.co.kr/menu/tea.do'
  ];

  for (const site of sites) {
    const scrapedData = {}; // 사이트마다 초기화

    await page.goto(site);

    for (let i = 1; i <= 900; i++) {
      const elementId = `menuView1_${i}`;
      const menuViewElement = await page.$(`#${elementId}`);

      if (menuViewElement) {
        const menuDetailElement = await menuViewElement.$('.menu_detail');
        const menuInfoElement = await menuDetailElement.$('p.menu_info');
        const menuNameElement = await menuDetailElement.$('p:nth-child(2) span')

        if (menuInfoElement && menuNameElement) {
          const text = await page.evaluate(el => el.textContent.trim(), menuInfoElement);
          const name = await page.evaluate(el => el.textContent.trim(), menuNameElement);
          // 객체 키를 메뉴 이름으로 설정
          scrapedData[name] = {text: text };
        } else {
          // 'menu_info' 요소가 없는 경우 빈 객체로 저장
          scrapedData[elementId] = {};
        }
      }
    }

    const jsonData = JSON.stringify(scrapedData, null, 2);
    const fileName = site.split('/').pop().split('.')[0] + '_info.json';
    fs.writeFileSync(fileName, jsonData);

    console.log(`Data from ${site} has been saved to ${fileName}`);
  }

  await browser.close();
})();
