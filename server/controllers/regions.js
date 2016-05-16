'use strict';

var Joi = require('joi'),
  Boom = require('boom'),
  Regions = require('../models/Regions').Regions,
  mongoose = require('mongoose');


exports.getAll = {
  handler: function (request, reply) {
    Regions.find({}, function (err, Regions) {
      if (!err) {
        return reply(Regions);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
  }
};

exports.getOne = {
  handler: function (request, reply) {
    Regions.findOne({ 'uid': request.params.uid }, function (err, Regions) {
      if (!err) {
        return reply(Regions);
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
      link  : Joi.string().required()
    }
  },
  handler: function (request, reply) {
    var Regions = new Regions(request.payload);
    Regions.save(function (err, Regions) {
      if (!err) {
        return reply(Regions).created('/Regions/' + Regions._id); // HTTP 201
      }
      if (11000 === err.code || 11001 === err.code) {
        return reply(Boom.forbidden("please provide another Regions id, it already exist"));
      }
      return reply(Boom.forbidden(err)); // HTTP 403
    });
  }
};

exports.update = {
  validate: {
    payload: {
      name  : Joi.string().required(),
      link  : Joi.string().required()
    }
  },
  handler: function (request, reply) {
    Regions.findOne({ 'uid': request.params.uid }, function (err, Regions) {
      if (!err) {
        Regions.name = request.payload.name;
        Regions.link = request.payload.link;
        Regions.save(function (err, Regions) {
          if (!err) {
            return reply(Regions); // HTTP 201
          }
          if (11000 === err.code || 11001 === err.code) {
            return reply(Boom.forbidden("please provide another Regions id, it already exist"));
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
    Regions.findOne({ 'uid': request.params.uid }, function (err, Regions) {
      if (!err && Regions) {
        Regions.remove();
        return reply({ message: "Regions deleted successfully"});
      }
      if (!err) {
        return reply(Boom.notFound());
      }
      return reply(Boom.badRequest("Could not delete Regions"));
    });
  }
};

exports.removeAll = {
  handler: function (request, reply) {
    mongoose.connection.db.dropCollection('Regions', function (err, result) {
      if (!err) {
        return reply({ message: "Regions database successfully deleted"});
      }
      return reply(Boom.badRequest("Could not delete Regions"));
    });
  }
};