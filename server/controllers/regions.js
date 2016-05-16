'use strict';

var Joi = require('joi'),
  Boom = require('boom'),
  Region = require('../models/regions').Region,
  mongoose = require('mongoose');


exports.getAll = {
  handler: function (request, reply) {
    Region.find({}, function (err, Region) {
      if (!err) {
        return reply(Region);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
  }
};

exports.getOne = {
  handler: function (request, reply) {
    Region.findOne({ 'RegionId': request.params.RegionId }, function (err, Region) {
      if (!err) {
        return reply(Region);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
  }
};

exports.create = {
  validate: {
    payload: {
      RegionId   : Joi.string().required(),
      Regionname  : Joi.string().required()
    }
  },
  handler: function (request, reply) {
    var Region = new Region(request.payload);
    Region.save(function (err, Region) {
      if (!err) {
        return reply(Region).created('/Region/' + Region._id); // HTTP 201
      }
      if (11000 === err.code || 11001 === err.code) {
        return reply(Boom.forbidden("please provide another Region id, it already exist"));
      }
      return reply(Boom.forbidden(err)); // HTTP 403
    });
  }
};

exports.update = {
  validate: {
    payload: {
      Regionname  : Joi.string().required()
    }
  },
  handler: function (request, reply) {
    Region.findOne({ 'RegionId': request.params.RegionId }, function (err, Region) {
      if (!err) {
        Region.Regionname = request.payload.Regionname;
        Region.save(function (err, Region) {
          if (!err) {
            return reply(Region); // HTTP 201
          }
          if (11000 === err.code || 11001 === err.code) {
            return reply(Boom.forbidden("please provide another Region id, it already exist"));
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
    Region.findOne({ 'RegionId': request.params.RegionId }, function (err, Region) {
      if (!err && Region) {
        Region.remove();
        return reply({ message: "Region deleted successfully"});
      }
      if (!err) {
        return reply(Boom.notFound());
      }
      return reply(Boom.badRequest("Could not delete Region"));
    });
  }
};

exports.removeAll = {
  handler: function (request, reply) {
    mongoose.connection.db.dropCollection('Regions', function (err, result) {
      if (!err) {
        return reply({ message: "Region database successfully deleted"});
      }
      return reply(Boom.badRequest("Could not delete Region"));
    });
  }
};