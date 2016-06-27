const ScrapeLink = require('../models/scrape-link');

exports.getAllLinks = {
    handler: (request, reply) => {
        ScrapeLink.getLinks();
        return reply('All links have been stored in Redis');
    },
};
