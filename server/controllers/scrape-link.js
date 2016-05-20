'use strict';

var Joi = require('joi'),
    Boom = require('boom'),
    ScrapeLink = require('../models/scrape-link');


exports.getAllLinks = {
    handler: function(request, reply) {
        ScrapeLink.getLinks()
        return reply("All links have been stored in Redis");
    }
};
