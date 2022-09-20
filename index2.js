const axios = require('axios')
const cheerio = require('cheerio')
// const fs = require('fs/promises')

const parse = async () => {
    const getHTML = async (url) => {
        const {data} = await axios.get(url)
        return cheerio.load(data)
    }

    const $ = await getHTML('https://scrapeme.live/shop/')
    // console.log($.html())
    const pageNumber = $('div.storefront-sorting > nav > ul > li > a.page-numbers').eq(-2).text()
    console.log(pageNumber)

    for (let i = 1; i < pageNumber; i++){
        const selector = await getHTML(
            `https://scrapeme.live/shop/page/${i}/`
            
        )
        
        selector('.product').each((i, el) => {
            const title = selector(el).find('h2.woocommerce-loop-product__title').text()
            // fs.writeFile('product.txt', title.join(' '))

            console.log(title)
        })
        // li > a > h2.woocommerce-loop-product__title
    }
}

parse()
