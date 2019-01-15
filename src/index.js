const roadmap = require('../basic.roadmap.json');
const videos = require('./videos');
const fs = require('fs');
const path = require('path');

const parseItem = async (item) => {
    item.sources = await Promise.all(item.sources.map(async e => ({
        ...e,
        links: await videos.parse(e.links)
    })));

    if (item.children) {
        item.children = await item.children.map(parseItem);
    }
}

const extendRoadmap = async () => {
    await Promise.all(roadmap.roadmap.map(parseItem));

    const storePath = path.join(__dirname, 'basic.roadmap-extended.json');
    if (fs.existsSync(storePath)) {
        fs.unlinkSync(storePath);
    }
    fs.writeFileSync(storePath, JSON.stringify(roadmap));
}

extendRoadmap();
