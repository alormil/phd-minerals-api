'use strict';

var Joi = require('joi'),
    Boom = require('boom'),
    ScrapeType = require('../models/scrape-type');

exports.getType = {
    handler: function(request, reply) {
        ScrapeType.getType(request.params.uid)
        return reply("Type with uid: " + request.params.uid + " has been stored in MongoDB");
    }
};
