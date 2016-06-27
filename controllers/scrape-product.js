
const ScrapeProduct = require('../models/scrape-product');

exports.getProduct = {
    handler: (request, reply) => {
        ScrapeProduct.getProduct(request.params.uid);
        return reply(`Product with uid: ${request.params.uid} has been stored in MongoDB`);
    },
};
