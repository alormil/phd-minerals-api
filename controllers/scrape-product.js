'use strict';

var Joi = require('joi'),
    Boom = require('boom'),
    ScrapeProduct = require('../models/scrape-product');

exports.getProduct = {
    handler: function(request, reply) {
        ScrapeProduct.getProduct(request.params.uid)
        return reply("Product with uid: " + request.params.uid + " has been stored in MongoDB");
    }
};
