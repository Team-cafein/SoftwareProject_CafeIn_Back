// const puppeteer = require('puppeteer');
// const fs = require('fs');

// (async () => {
//   const browser = await puppeteer.launch({ headless: "new" });
//   const page = await browser.newPage();

//   const sites = ['https://www.hollys.co.kr/menu/espresso.do'];

//   const scrapedData = {};

//   for (const site of sites) {
//     await page.goto(site);

//     for (let i = 1; i <= 900; i++) {
//       const elementId = `menuView2_${i}`;
//       const menuViewElement = await page.$(`#${elementId}`);

//       if (menuViewElement) {
//         const tableElement = await menuViewElement.$('.tableType01');

//         if (tableElement) {
//           const captionElement = await tableElement.$('caption');

//           if (captionElement) {
//             const prodName = elementId; // Use elementId as prodName

//             const tbodyElements = await tableElement.$$('tbody tr');

//             if (tbodyElements.length > 0) {
//               const data = {};

//               for (let j = 0; j < tbodyElements.length; j++) {
//                 const tdElements = await tbodyElements[j].$$('td');

//                 if (tdElements.length === 6) {
//                   const keys = ["kcal", "sugar", "protein", "sat_FAT", "sodium", "caffeine"];

//                   for (let k = 0; k < tdElements.length; k++) {
//                     const value = await page.evaluate(el => el.textContent.trim(), tdElements[k]);
//                     data[keys[k]] = value;
//                   }
//                 }
//               }

//               scrapedData[prodName] = data;
//             }
//           }
//         }
//       }
//     }
//   }

//   await browser.close();

//   const jsonData = JSON.stringify(scrapedData, null, 2);
//   const fileName = sites[0].split('/').pop().split('.')[0] + '_info2.json';
//   fs.writeFileSync(fileName, jsonData);

//   console.log(`${sites[0]}에서 가져온 데이터가 ${fileName}에 저장되었습니다.`);
// })();

// // ///////

// // const puppeteer = require('puppeteer');
// // const fs = require('fs');

// // (async () => {
// //   const browser = await puppeteer.launch({ headless: true });
// //   const page = await browser.newPage();

// //   const sites = ['https://www.hollys.co.kr/menu/espresso.do'];

// //   const scrapedData = {};

// //   for (const site of sites) {
// //     await page.goto(site);

// //     for (let i = 1; i <= 900; i++) {
// //       const elementId = `menuView2_${i}`;
// //       const menuViewElement = await page.$(`#${elementId}`);

// //       if (menuViewElement) {
// //         const tableElement = await menuViewElement.$('.tableType01');

// //         if (tableElement) {
// //           const captionElement = await tableElement.$('caption');

// //           if (captionElement) {
// //             const prodName = elementId; // Use elementId as prodName

// //             const theadElements = await tableElement.$$('thead tr');
// //             const data = {};

// //             for (let j = 0; j < theadElements.length; j++) {
// //               const thElements = await theadElements[j].$$('th');
// //               const valuesElements = await tableElement.$$('tbody td.center_t');

// //               if (thElements.length > 0) {
// //                 for (let k = 0; k < thElements.length && k < valuesElements.length; k++) {
// //                   const key = await page.evaluate(el => el.textContent.trim(), thElements[k]);
// //                   const value = await page.evaluate(el => el.textContent.trim(), valuesElements[k]);

// //                   if (key !== "") {
// //                     const keyMapping = {
// //                       "칼로리": "kcal",
// //                       "당류": "sugar",
// //                       "단백질": "protein",
// //                       "포화지방": "sat_FAT",
// //                       "나트륨": "sodium",
// //                       "카페인": "caffeine"
// //                     };

// //                     if (key in keyMapping) {
// //                       data[keyMapping[key]] = value;
// //                     }
// //                   }
// //                 }
// //               }
// //             }

// //             scrapedData[prodName] = data;
// //           }
// //         }
// //       }
// //     }
// //   }

// //   await browser.close();

// //   const jsonData = JSON.stringify(scrapedData, null, 2);
// //   const fileName = sites[0].split('/').pop().split('.')[0] + '_info2.json';
// //   fs.writeFileSync(fileName, jsonData);

// //   console.log(`${sites[0]}에서 가져온 데이터가 ${fileName}에 저장되었습니다.`);
// // })();

/////////////////////////
/////////////////////////

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

//   for (const site of sites) {
//     const scrapedData = {};

//     await page.goto(site);

//     for (let i = 1; i <= 900; i++) {
//       const elementId = `menuView2_${i}`;
//       const menuViewElement = await page.$(`#${elementId}`);

//       if (menuViewElement) {
//         const tableElement = await menuViewElement.$('.tableType01');

//         if (tableElement) {
//           const captionElement = await tableElement.$('caption');

//           if (captionElement) {
//             const prodName = elementId; // Use elementId as prodName

//             const tbodyElements = await tableElement.$$('tbody tr');

//             if (tbodyElements.length > 0) {
//               const data = {};

//               for (let j = 0; j < tbodyElements.length; j++) {
//                 const tdElements = await tbodyElements[j].$$('td');

//                 if (tdElements.length === 6) {
//                   const keys = ["kcal", "sugar", "protein", "sat_FAT", "sodium", "caffeine"];

//                   for (let k = 0; k < tdElements.length; k++) {
//                     const value = await page.evaluate(el => el.textContent.trim(), tdElements[k]);
//                     data[keys[k]] = value;
//                   }
//                 }
//               }

//               scrapedData[prodName] = data;
//             }
//           }
//         }
//       }
//     }

//     const jsonData = JSON.stringify(scrapedData, null, 2);
//     const fileName = site.split('/').pop().split('.')[0] + '_info2.json';
//     fs.writeFileSync(fileName, jsonData);

//     console.log(`${site}에서 가져온 데이터가 ${fileName}에 저장되었습니다.`);
//   }

//   await browser.close();
// })();

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
    const scrapedData = {};

    await page.goto(site);

    for (let i = 1; i <= 900; i++) {
      const elementId = `menuView2_${i}`;
      const menuViewElement = await page.$(`#${elementId}`);

      if (menuViewElement) {
        const tableElement = await menuViewElement.$('.tableType01');
        const menuNameElement = await tableElement.$('table');
        if (menuNameElement) {
          const name = await page.evaluate(el => el.textContent.trim().replace(/\t/g, '').replace(/\n/g, ''), menuNameElement);
          // 객체 키를 메뉴 이름으로 설정
          const prodName = name; // Store the name in prodName
          // 중복된 데이터 확인
          if (prodName.trim() !== "") {
            const data = { name: prodName }; // Include "name" in the object
            scrapedData[prodName] = data;
          }
        }

        if (tableElement) {
          const captionElement = await tableElement.$('caption');

          if (captionElement) {
            const prodName = elementId; // Use elementId as prodName

            const tbodyElements = await tableElement.$$('tbody tr');

            if (tbodyElements.length > 0) {
              const data = {};

              for (let j = 0; j < tbodyElements.length; j++) {
                const tdElements = await tbodyElements[j].$$('td');

                if (tdElements.length === 6) {
                  const keys = ["kcal", "sugar", "protein", "sat_FAT", "sodium", "caffeine"];
                  const values = [];

                  for (let k = 0; k < tdElements.length; k++) {
                    const value = await page.evaluate(el => el.textContent.trim(), tdElements[k]);
                    values.push(value);
                  }

                  // Include "name" in the object
                  data.name = prodName;

                  // Combine keys and values into an object
                  for (let l = 0; l < keys.length; l++) {
                    data[keys[l]] = values[l];
                  }

                  // Assign data to the prodName object
                  if (prodName.trim() !== "") {
                    scrapedData[prodName] = data;
                  }
                }
              }
            }
          }
        }
      }
    }

    // Remove entries where "name" is empty
    for (const key in scrapedData) {
      if (scrapedData[key].name.trim() === "") {
        delete scrapedData[key];
      }
    }

    const jsonData = JSON.stringify(scrapedData, null, 2);
    const fileName = site.split('/').pop().split('.')[0] + '_info2test.json';
    fs.writeFileSync(fileName, jsonData);

    console.log(`${site}에서 가져온 데이터가 ${fileName}에 저장되었습니다.`);
  }

  await browser.close();
})();
