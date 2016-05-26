'use strict';

var Joi = require('joi'),
    Boom = require('boom'),
    ScrapeRegion = require('../models/scrape-region');

exports.getOneRegion = {
    handler: function(request, reply) {
        ScrapeRegion.getOneRegion(request.params.uid)
        return reply("Region with uid: " + request.params.uid + " has been stored in MongoDB");
    }
};
