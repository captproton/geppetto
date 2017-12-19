const puppeteer   = require('puppeteer');
const args = require('yargs').argv;
const cart        = require('./cart_attempt.js')

console.log('start');
// example command line: node index.js --style_and_size_code=BY3602_610
  // out of stock
// cart('AC7748_650');
  // in stock
// cart('BY3602_610');
  attempt = cart(args.style_and_size_code);
