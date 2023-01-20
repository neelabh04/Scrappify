require('dotenv').config();

const puppeteer = require('puppeteer');
const website = process.env.WEBSITE_URL;

async function start() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(website, {waitUntil: 'networkidle0'});
    await page.emulateMediaType('screen');

    // 1. take the screenshot of the page
    await page.screenshot(
        {
            path: "screenshot.png",
            fullPage: true
        }
    )
    
    // 2. Create a PDF of the page
    await page.pdf(
        {
            path: "testing.pdf",
            printBackground: true,
            fullPage: true,
            margin: {
                top: '50px',
                right: '50px',
                bottom: '50px',
                left: '50px'
            },
            format: 'A4'
        }
    )
    
    await browser.close()
}

start();