'use strict';

var Joi = require('joi'),
  Boom = require('boom'),
  Regions = require('../models/Regions').Regions,
  mongoose = require('mongoose');


exports.getAll = {
  handler: function (request, reply) {
    Regions.find({}, function (err, regions) {
      if (!err) {
        return reply(regions);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
  }
};

exports.getOne = {
  handler: function (request, reply) {
    Regions.findOne({ 'uid': request.params.uid }, function (err, regions) {
      if (!err) {
        return reply(regions);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
  }
};

exports.create = {
  validate: {
    payload: {
      uid   : Joi.string().required(),
      name  : Joi.string().required(),
      link  : Joi.string().required(),
      descriptions: Joi.any(),
      images: Joi.any(),
      dateCreated: Joi.date(),
      lastUpdated: Joi.date(),
      author: Joi.string()
    }
  },
  handler: function (request, reply) {
    var regions = new Regions(request.payload);
    regions.save(function (err, regions) {
      if (!err) {
        return reply(regions).created('/regions/' + regions._id); // HTTP 201
      }
      if (11000 === err.code || 11001 === err.code) {
        return reply(Boom.forbidden("please provide another regions id, it already exist"));
      }
      return reply(Boom.forbidden(err)); // HTTP 403
    });
  }
};

exports.update = {
  validate: {
    payload: {
      name  : Joi.string().required(),
      link  : Joi.string().required(),
      descriptions: Joi.any(),
      images: Joi.any(),
      dateCreated: Joi.date(),
      lastUpdated: Joi.date(),
      author: Joi.string()
    }
  },
  handler: function (request, reply) {
    Regions.findOne({ 'uid': request.params.uid }, function (err, regions) {
      if (!err) {
        regions.name = request.payload.name;
        regions.link = request.payload.link;
        regions.save(function (err, regions) {
          if (!err) {
            return reply(regions); // HTTP 201
          }
          if (11000 === err.code || 11001 === err.code) {
            return reply(Boom.forbidden("please provide another regions id, it already exist"));
          }
          return reply(Boom.forbidden(err)); // HTTP 403
        });
      }
      else{ 
        return reply(Boom.badImplementation(err)); // 500 error
      }
    });
  }
};

exports.remove = {
  handler: function (request, reply) {
    Regions.findOne({ 'uid': request.params.uid }, function (err, regions) {
      if (!err && regions) {
        regions.remove();
        return reply({ message: "regions deleted successfully"});
      }
      if (!err) {
        return reply(Boom.notFound());
      }
      return reply(Boom.badRequest("Could not delete regions"));
    });
  }
};

exports.removeAll = {
  handler: function (request, reply) {
    mongoose.connection.db.dropCollection('regions', function (err, result) {
      if (!err) {
        return reply({ message: "regions database successfully deleted"});
      }
      return reply(Boom.badRequest("Could not delete regions"));
    });
  }
};