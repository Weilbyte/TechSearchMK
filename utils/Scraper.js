const ENDPOINT = {
    corsProxy: 'https://wn-cors.weilnet.workers.dev/',
    setec:
        'https://setec.mk/index.php?route=product/search&limit=128&mfp=stock_status[5]&search=',
    anhoch:
        'https://www.anhoch.com/products/search?search=$S&page=$P&offset=64&stock=1',
    technomarket:
        'https://www.tehnomarket.com.mk/products/search?search=$S&page=1&offset=64&stock=1'
}

const FETCH_CONFIG = {
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
}

export default async function Scrape (include, exclude, required) {
    const setec = await scrape_setec(include)
    const anhoch0 = await scrape_anhoch(include)
    const anhoch1 = await scrape_anhoch(include, 2)
    const technomarket = await scrape_technomarket(include)
    let products = [...setec, ...anhoch0, ...anhoch1, ...technomarket]

    Array.from(products).forEach(product => {
        if (
            exclude.some(x =>
                product.name.toLowerCase().includes(x.toLowerCase())
            ) &&
            !required.every(x =>
                product.name.toLowerCase().includes(x.toLowerCase())
            )
        ) {
            products.pop(product)
        }
    })
    return products
}

const scrape_setec = async include => {
    let products = []
    const URI = `${ENDPOINT.corsProxy}${ENDPOINT.setec}${encodeURIComponent(
        include.join(' ')
    )}`

    const res = await fetch(URI, FETCH_CONFIG)
    const body = await res.text()

    let p = new DOMParser()
    let pHTML = p.parseFromString(body, 'text/html')
    let productElements = pHTML.querySelectorAll(
        '#mfilter-content-container > div.product-grid.active > div > div > div'
    )

    productElements.forEach(product => {
        let image = product.getElementsByTagName('IMG')[0].getAttribute('src')
        if (image.endsWith('no_image.jpg')) image = null

        const name = product
            .querySelector('div.right > .name > a')
            .innerText.trim()

        const id = product
            .getElementsByClassName('shifra')[0]
            .innerText.replace('Шифра: ', '')
            .trim()

        let price =
            product.getElementsByClassName('price-new-new')[0] || // Sale price, takes priority
            product.getElementsByClassName('price-old-new')[0] || // Regular price
            product.getElementsByClassName('cena_za_kesh')[0] // Also regular price but with a different name for whatever reason
        price = price.innerHTML
            .replace(',', '')
            .replace('Ден.', '')
            .trim()

        products.push({
            retailer: 'setec',
            image,
            name,
            id,
            price
        })
    })

    return products
}

const scrape_anhoch = async (include, page = 1) => {
    let products = []

    const URI = `${ENDPOINT.corsProxy}${ENDPOINT.anhoch
        .replace('$S', encodeURIComponent(include.join(' ')))
        .replace('$P', page)}`

    let res = await fetch(URI, FETCH_CONFIG)

    const body = await res.json()

    let p = new DOMParser()
    let pHTML = p.parseFromString(body['products_list'], 'text/html')
    let productElements = pHTML.querySelectorAll('body > ul > li')

    productElements.forEach(product => {
        let image = product.getElementsByTagName('IMG')[0].getAttribute('src')
        if (image.includes('no_image.jpg')) image = null

        let name = product
            .querySelector('div > .product-name > a')
            .innerHTML.trim()

        const id = product.getAttribute('data-id')
        const price = product.getAttribute('data-price')

        products.push({
            retailer: 'anhoch',
            image,
            name,
            id,
            price
        })
    })

    return products
}

const scrape_technomarket = async include => {
    let products = []
    const URI = `${ENDPOINT.corsProxy}${ENDPOINT.technomarket.replace(
        '$S',
        encodeURIComponent(include.join(' '))
    )}`

    let res = await fetch(URI, FETCH_CONFIG)

    const body = await res.json()

    let p = new DOMParser()
    let pHTML = p.parseFromString(body['products_list'], 'text/html')
    let productElements = pHTML.querySelectorAll('body > ul > li')
    console.log(productElements)

    productElements.forEach(product => {
        let image = product
            .querySelector('figure')
            .getAttribute('style')
            .split("'")[1]
        if (image.includes('no_image.jpg')) image = null

        let name = product
            .querySelector('div > .product-name > a')
            .innerHTML.trim()

        const id = product.getAttribute('data-id')
        const price = product.getAttribute('data-price')

        products.push({
            retailer: 'technomarket',
            image,
            name,
            id,
            price
        })
    })

    return products
}
