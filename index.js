const puppeteer = require('puppeteer');

async function getPic(url) {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({ width: 1200, height: 800 });
  await page.screenshot({ path: 'google.png' });

  await browser.close();
}

async function scrape(url) {
    const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
	headless: false
	});
    const page = await browser.newPage();

    await page.goto('http://books.toscrape.com/');
    await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');
    await page.waitFor(1000);

    const result = await page.evaluate(() => {
        let title = document.querySelector('h1').innerText;
        let price = document.querySelector('.price_color').innerText;

        return {
            title,
            price
}
  });
  await page.goto(url);
  await page.setViewport({ width: 1200, height: 800 });
  await page.screenshot({ path: 'books.png' });

  await browser.close();
}

async function cart(pid) {
    // const result  = 'cart failed: ' + pid
    const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
	headless: false
	});
    const page = await browser.newPage();


  const url = 'http://www.adidas.co.uk/on/demandware.store/Sites-adidas-GB-Site/en_GB/Cart-MiniAddProduct?layer=Add+To+Bag+overlay&ajax=true&pid=' + pid
  await page.goto(url);
  await page.setViewport({ width: 1200, height: 800 });
  await page.screenshot({ path: 'adidas.png' });
  const bodyHTML = await page.evaluate(() => document.body.innerHTML);
  const result = await page.evaluate(() => {
            const spans = Array.from(document.querySelectorAll('.minicart_info span'))
            return spans.map(span => span.textContent)
            });
  // const minicart_overlay =   await page.$eval('.minicart_overlay', e => e.childNodes);
  
  // if (minicart_overlay) {
  //   const result = "carted " + pid
  // }
  console.log(result);

  if (result[0]) {console.log('result is true')} else {console.log('result is false')}

  await browser.close();
  console.log('cart done')

}

  console.log('start');
  console.log('starter');
  // getPic('http://www.adidas.co.uk/on/demandware.store/Sites-adidas-GB-Site/en_GB/Cart-MiniAddProduct?layer=Add+To+Bag+overlay&ajax=true&pid=AC7748_650');
  // cart('http://www.adidas.co.uk/on/demandware.store/Sites-adidas-GB-Site/en_GB/Cart-MiniAddProduct?layer=Add+To+Bag+overlay&ajax=true&pid=AC7748_650');
  // out of stock
  cart('AC7748_650')
  // in stock
  cart('BY3602_610')


