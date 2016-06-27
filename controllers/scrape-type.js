const ScrapeType = require('../models/scrape-type');

exports.getType = {
    handler: (request, reply) => {
        ScrapeType.getType(request.params.uid);
        return reply(`Type with uid: ${request.params.uid} has been stored in MongoDB`);
    },
};
