'use strict';

var Joi = require('joi'),
  Boom = require('boom'),
  Products = require('../models/Products').Products,
  mongoose = require('mongoose');


exports.getAll = {
  handler: function (request, reply) {
    Products.find({}, function (err, products) {
      if (!err) {
        return reply(products);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
  }
};

exports.getOne = {
  handler: function (request, reply) {
    Products.findOne({ 'uid': request.params.uid }, function (err, products) {
      if (!err) {
        return reply(products);
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
      type  : Joi.string().required(),
      dimensions  : Joi.string().required(), 
      availability  : Joi.string().required(),
      weigth  : Joi.string().required(),
      size  : Joi.string().required(),
      origin  : Joi.any(),
      prices  : Joi.any(),
      descriptions  : Joi.any(),
      dateCreated  : Joi.date(),
      lastUpdated  : Joi.date(),
      author  : Joi.string(),
      tags  : Joi.any(),
      featured  : Joi.number().integer(),
      images  : Joi.any()
    }
  },
  handler: function (request, reply) {
    var products = new Products(request.payload);
    products.save(function (err, products) {
      if (!err) {
        return reply(products).created('/products/' + products._id); // HTTP 201
      }
      if (11000 === err.code || 11001 === err.code) {
        return reply(Boom.forbidden("please provide another products id, it already exist"));
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
      type  : Joi.string().required(),
      dimensions  : Joi.string().required(), 
      availability  : Joi.string().required(),
      weigth  : Joi.string().required(),
      size  : Joi.string().required(),
      origin  : Joi.any(),
      prices  : Joi.any(),
      descriptions  : Joi.any(),
      dateCreated  : Joi.date(),
      lastUpdated  : Joi.date(),
      author  : Joi.string(),
      tags  : Joi.any(),
      featured  : Joi.number().integer(),
      images  : Joi.any()
    }
  },
  handler: function (request, reply) {
    Products.findOne({ 'uid': request.params.uid }, function (err, products) {
      if (!err) {
        products.name = request.payload.name;
        products.link = request.payload.link;
        products.save(function (err, products) {
          if (!err) {
            return reply(products); // HTTP 201
          }
          if (11000 === err.code || 11001 === err.code) {
            return reply(Boom.forbidden("please provide another products id, it already exist"));
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
    Products.findOne({ 'uid': request.params.uid }, function (err, products) {
      if (!err && products) {
        products.remove();
        return reply({ message: "products deleted successfully"});
      }
      if (!err) {
        return reply(Boom.notFound());
      }
      return reply(Boom.badRequest("Could not delete products"));
    });
  }
};

exports.removeAll = {
  handler: function (request, reply) {
    mongoose.connection.db.dropCollection('products', function (err, result) {
      if (!err) {
        return reply({ message: "products database successfully deleted"});
      }
      return reply(Boom.badRequest("Could not delete products"));
    });
  }
};