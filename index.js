const puppeteer = require('puppeteer')
const fs = require('fs/promises')

async function start() {
    
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    
    await page.goto('https://scrapeme.live/shop/')
    await page.screenshot({path: 'screen.png'})

    const names = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.products > li > a > h2')).map(x => x.textContent)
    })
    await fs.writeFile('names.txt', names.join(' '))

    await browser.close()
    }
    
    




start()