const ScrapeRegion = require('../models/scrape-region');

exports.getRegion = {
    handler: (request, reply) => {
        ScrapeRegion.getRegion(request.params.uid);
        return reply(`Region with uid: ${request.params.uid} has been stored in MongoDB`);
    },
};
