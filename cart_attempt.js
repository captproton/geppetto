const puppeteer   = require('puppeteer');
const args = require('yargs').argv;

module.exports = async function cart(pid) {
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
  const bodyHTML  = await page.evaluate(() => document.body.innerHTML);
  const result    = await page.evaluate(() => {
            const spans = Array.from(document.querySelectorAll('.minicart_info span'))
            return spans.map(span => span.textContent)
            });
  // const minicart_overlay =   await page.$eval('.minicart_overlay', e => e.childNodes);
  
  // if (minicart_overlay) {
  //   const result = "carted " + pid
  // }
  console.log(result);

  if (result[0]) {
    console.log('carted ' + args.style_and_size_code);
    console.log('=======================================')
  } else {
    console.log('no joy for ' + args.style_and_size_code);
    console.log('cart unsuccessful attempt complete')
    await browser.close();
    console.log('=======================================')
    cart(args.style_and_size_code);
  }

  
}
