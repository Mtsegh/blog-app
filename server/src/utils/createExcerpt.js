import * as cheerio from "cheerio";

function getExcerpt(html) {
    const $ = cheerio.load(html);
    const text = $.text().trim();
    const excerpt = text.substring(0, 200) + "...";

    return excerpt;
}

export default getExcerpt;