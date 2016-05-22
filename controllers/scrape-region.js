'use strict';

var Joi = require('joi'),
    Boom = require('boom'),
    ScrapeRegion = require('../models/scrape-region');


exports.getAllRegions = {
    handler: function(request, reply) {
        ScrapeRegion.getAllRegions()
        return reply("All Regions data have been stored in MongoDB");
    }
};

exports.getOneRegion = {
    handler: function(request, reply) {
        ScrapeRegion.getOneRegion(request.params.uid)
        return reply("Region with uid: " + request.params.uid + " has been stored in MongoDB");
    }
};
