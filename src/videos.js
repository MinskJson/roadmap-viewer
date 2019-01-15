const cheerio = require('cheerio');
const axios = require('axios').default;
const microdata = require('microdata-node');
const urlNode = require('url');
const youtubeInfo = require('youtube-info');

const transform = async (url, response) => {
    const myURL = urlNode.parse(url);
    const $ = cheerio.load(response.data);
    let youtube = null;

    // common
    let keywords = $('[name=keywords]').attr('content');
    let description = $('[name=description]').attr('content');
    let title = $('title').text();
    let thumbnail = $('[property="og:image"]').attr('content');
    let siteIcon = $('[rel=apple-touch-icon]').attr('href');

    // youtube
    if (url.includes('youtube.com') && url.split('?v=')[1]) {
        const id = url.split('?v=')[1].split('&')[0];
        console.log(url, id);

        youtube = await new Promise(res => youtubeInfo(id, (err, result) => res(result)));

        if (youtube) {
            title = youtube.title;
            description = youtube.description;
            thumbnail = youtube.thumbnailUrl;
            siteIcon = youtube.channelThumbnailUrl;
        }
    }

    // meta
    const meta = microdata.toJson(response.data, {
        base: 'http://www.example.com'
    });

    return {
       url,
       origin: myURL.origin,
       keywords,
       description,
       title,
       thumbnail,
       siteIcon,
       meta,
       youtube
    }
}

async function parse(urlList) {
    const result = await Promise.all(urlList
        .map(e => axios.get(e).then(response => transform(e, response))));

    return result;
}

module.exports = {
    parse,
}
