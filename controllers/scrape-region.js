'use strict';

var Joi = require('joi'),
    Boom = require('boom'),
    ScrapeRegion = require('../models/scrape-region');

exports.getRegion = {
    handler: function(request, reply) {
        ScrapeRegion.getRegion(request.params.uid)
        return reply("Region with uid: " + request.params.uid + " has been stored in MongoDB");
    }
};
