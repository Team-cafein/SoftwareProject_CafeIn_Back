// // const puppeteer = require('puppeteer');
// // const fs = require('fs');

// // (async () => {
// //   const browser = await puppeteer.launch({ headless: "new" });
// //   const page = await browser.newPage();

// //   const sites = ['https://www.hollys.co.kr/menu/espresso.do'];

// //   for (const site of sites) {
// //     await page.goto(site);

// //     const scrapedData = {};

// //     for (let i = 1; i <= 900; i++) {
// //       const elementId = `menuView1_${i}`;
// //       const menuViewElement = await page.$(`#${elementId}`);

// //       if (menuViewElement) {
// //         const menuDetailElement = await menuViewElement.$('.menu_detail');
// //         const menuInfoElement = await menuDetailElement.$('p.menu_info');

// //         if (menuInfoElement) {
// //           const text = await page.evaluate(el => el.textContent.trim(), menuInfoElement);
// //           scrapedData[elementId] = { text: text };
// //         } else {
// //           // 'menu_info' 요소가 없는 경우 빈 객체로 저장
// //           scrapedData[elementId] = {};
// //         }
// //       }
// //     }

// //     const jsonData = JSON.stringify({ prodInfo: scrapedData }, null, 2);
// //     const fileName = site.split('/').pop().split('.')[0] + '_infozzzzz.json';
// //     fs.writeFileSync(fileName, jsonData);

// //     console.log(`Data from ${site} has been saved to ${fileName}`);
// //   }

// //   await browser.close();
// // })();

// const puppeteer = require('puppeteer');
// const fs = require('fs');

// (async () => {
//   const browser = await puppeteer.launch({ headless: "new" });
//   const page = await browser.newPage();

//   const sites = [
//     'https://www.hollys.co.kr/menu/espresso.do',
//     // 'https://www.hollys.co.kr/menu/signature.do',
//     // 'https://www.hollys.co.kr/menu/hollyccino.do',
//     // 'https://www.hollys.co.kr/menu/juice.do',
//     // 'https://www.hollys.co.kr/menu/tea.do'
//   ];

//   for (const site of sites) {
//     const scrapedData = []; // 사이트마다 초기화

//     await page.goto(site);

//     for (let i = 1; i <= 900; i++) {
//       const elementId_1 = `menuView1_${i}`;
//       const menuViewElement1 = await page.$(`#${elementId_1}`);
//       const elementId_2 = `menuView2_${i}`;
//       const menuViewElement2 = await page.$(`#${elementId_2}`);

//       if (menuViewElement1&&menuViewElement2) {
//         const menuDetailElement = await menuViewElement1.$('.menu_detail');
//         const menuInfoElement = await menuDetailElement.$('p.menu_info');
//         const menuNameElement1 = await menuDetailElement.$('p:nth-child(2) span')

//         const tableElement = await menuViewElement2.$('.tableType01');
//         const menuNameElement2 = await tableElement.$('table');


//         if (menuInfoElement && menuNameElement1) {
//           const text = await page.evaluate(el => el.textContent.trim(), menuInfoElement);
//           const prodName = await page.evaluate(el => el.textContent.trim(), menuNameElement1);


//           //menuView2

//           if (tableElement) {
//             const captionElement = await tableElement.$('caption');
  
//             if (captionElement) {
//               const prodName = elementId_1; // Use elementId as prodName
  
//               const tbodyElements = await tableElement.$$('tbody tr');
  
//               if (tbodyElements.length > 0) {
//                 const data = {};
  
//                 for (let j = 0; j < tbodyElements.length; j++) {
//                   const tdElements = await tbodyElements[j].$$('td');
  
//                   if (tdElements.length === 6) {
//                     const keys = ["kcal", "sugar", "protein", "sat_FAT", "sodium", "caffeine"];
//                     const values = [];
  
//                     for (let k = 0; k < tdElements.length; k++) {
//                       const value = await page.evaluate(el => el.textContent.trim(), tdElements[k]);
//                       values.push(value);
//                     }
//                     values.push({prodName});
  
//                     // Include "name" in the object
//                     data.name = prodName;
  
//                     // Combine keys and values into an object
//                     for (let l = 0; l < keys.length; l++) {
//                       data[keys[l]] = values[l];
//                     }
  
//                     // Assign data to the prodName object
//                     if (prodName.trim() !== "") {
//                       scrapedData.push(data);
//                     }
//                   }
//                 }
//               }
//             }
//           }

//           // 객체 키를 메뉴 이름으로 설정하고 push 메서드를 호출
//           scrapedData.push({ prodName, text });
//         } else {
//           // 'menu_info' 요소가 없는 경우 빈 객체로 저장
//           scrapedData.push({});
//         }
//       }
//     }

//     const jsonData = JSON.stringify(scrapedData, null, 2);
//     const fileName = site.split('/').pop().split('.')[0] + '_testinfo.json';
//     fs.writeFileSync(fileName, jsonData);

//     console.log(`Data from ${site} has been saved to ${fileName}`);
//   }

//   await browser.close();
// })();



const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" }); // headless 모드로 변경
  const page = await browser.newPage();

  const sites = [
    'https://www.hollys.co.kr/menu/espresso.do',
    'https://www.hollys.co.kr/menu/signature.do',
    'https://www.hollys.co.kr/menu/hollyccino.do',
    'https://www.hollys.co.kr/menu/juice.do',
    'https://www.hollys.co.kr/menu/tea.do'
  ];

  for (const site of sites) {
    const scrapedData = []; // 사이트마다 초기화

    await page.goto(site);

    for (let i = 1; i <= 900; i++) {
      const elementId_1 = `menuView1_${i}`;
      const menuViewElement1 = await page.$(`#${elementId_1}`);
      const elementId_2 = `menuView2_${i}`;
      const menuViewElement2 = await page.$(`#${elementId_2}`);

      if (menuViewElement1 && menuViewElement2) {
        const menuDetailElement = await menuViewElement1.$('.menu_detail');
        const menuInfoElement = await menuDetailElement.$('p.menu_info');
        const menuNameElement1 = await menuDetailElement.$('p:nth-child(2) span')

        const tableElement = await menuViewElement2.$('.tableType01');
        const menuNameElement2 = await tableElement.$('table');

        if (menuInfoElement && menuNameElement1) {
          const text = await page.evaluate(el => el.textContent.trim(), menuInfoElement);
          const prodName = await page.evaluate(el => el.textContent.trim(), menuNameElement1);

          //menuView2
          if (tableElement) {
            const captionElement = await tableElement.$('caption');
  
            if (captionElement) {
              const tbodyElements = await tableElement.$$('tbody tr');
              const trElement = tbodyElements.length === 2 ? tbodyElements[1] : tbodyElements[0];

              if (trElement) {
                const tdElements = await trElement.$$('td');

                if (tdElements.length === 6) {
                  const keys = ["kcal", "sugar", "protein", "sat_FAT", "sodium", "caffeine"];
                  const values = [];

                  for (let k = 0; k < tdElements.length; k++) {
                    const value = await page.evaluate(el => el.textContent.trim(), tdElements[k]);
                    values.push(value);
                  }

                  // Include "name" in the object
                  const data = {
                    prodName: prodName,
                    text: text,
                    kcal: values[0],
                    sugar: values[1],
                    protein: values[2],
                    sat_FAT: values[3],
                    sodium: values[4],
                    caffeine: values[5],
                  };

                  // Assign data to the prodName object
                  if (prodName.trim() !== "") {
                    scrapedData.push(data);
                  }
                }
              }
            }
          }

          // 객체 키를 메뉴 이름으로 설정하고 push 메서드를 호출
          //scrapedData.push({ prodName, text });
        } else {
          // 'menu_info' 요소가 없는 경우 빈 객체로 저장
          scrapedData.push({});
        }
      }
    }

    const jsonData = JSON.stringify(scrapedData, null, 2);
    const fileName = site.split('/').pop().split('.')[0] + '_testinfo.json';
    fs.writeFileSync(fileName, jsonData);

    console.log(`Data from ${site} has been saved to ${fileName}`);
  }

  await browser.close();
})();
