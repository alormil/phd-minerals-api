'use strict';

var Joi = require('joi'),
  Boom = require('boom'),
  Types = require('../models/Types').Types,
  mongoose = require('mongoose');


exports.getAll = {
  handler: function (request, reply) {
    Types.find({}, function (err, types) {
      if (!err) {
        return reply(types);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
  }
};

exports.getOne = {
  handler: function (request, reply) {
    Types.findOne({ 'uid': request.params.uid }, function (err, types) {
      if (!err) {
        return reply(types);
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
    var types = new Types(request.payload);
    types.save(function (err, types) {
      if (!err) {
        return reply(types).created('/types/' + types._id); // HTTP 201
      }
      if (11000 === err.code || 11001 === err.code) {
        return reply(Boom.forbidden("please provide another types id, it already exist"));
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
    Types.findOne({ 'uid': request.params.uid }, function (err, types) {
      if (!err) {
        types.name = request.payload.name;
        types.link = request.payload.link;
        types.save(function (err, types) {
          if (!err) {
            return reply(types); // HTTP 201
          }
          if (11000 === err.code || 11001 === err.code) {
            return reply(Boom.forbidden("please provide another types id, it already exist"));
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
    Types.findOne({ 'uid': request.params.uid }, function (err, types) {
      if (!err && types) {
        types.remove();
        return reply({ message: "types deleted successfully"});
      }
      if (!err) {
        return reply(Boom.notFound());
      }
      return reply(Boom.badRequest("Could not delete types"));
    });
  }
};

exports.removeAll = {
  handler: function (request, reply) {
    mongoose.connection.db.dropCollection('types', function (err, result) {
      if (!err) {
        return reply({ message: "types database successfully deleted"});
      }
      return reply(Boom.badRequest("Could not delete types"));
    });
  }
};