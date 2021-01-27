import Scrape from './Scraper'

export default async function GetResults (include, exclude, required) {
    return await Scrape(include, exclude, required)
}
