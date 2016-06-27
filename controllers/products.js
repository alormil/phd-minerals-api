const Joi = require('joi');
const Boom = require('boom');
const Products = require('../models/products').Products;
const mongoose = require('mongoose');


exports.getAll = {
    handler: (request, reply) => {
        Products.find({}, (err, products) => {
            if (!err) {
                return reply(products);
            }
            return reply(Boom.badImplementation(err)); // 500 error
        });
    },
};

exports.getOne = {
    handler: (request, reply) => {
        Products.findOne({ uid: request.params.uid }, (err, products) => {
            if (!err) {
                return reply(products);
            }
            return reply(Boom.badImplementation(err)); // 500 error
        });
    },
};

exports.create = {
    validate: {
        payload: {
            uid: Joi.string().required(),
            name: Joi.string().required(),
            link: Joi.string().required(),
            type: Joi.string().required(),
            dimensions: Joi.string().required(),
            availability: Joi.string().required(),
            weigth: Joi.string().required(),
            size: Joi.string().required(),
            origin: Joi.any(),
            prices: Joi.any(),
            descriptions: Joi.any(),
            dateCreated: Joi.date(),
            lastUpdated: Joi.date(),
            author: Joi.string(),
            tags: Joi.any(),
            featured: Joi.number().integer(),
            images: Joi.any(),
        },
    },
    handler: (request, reply) => {
        const products = new Products(request.payload);
        products.save((err, result) => {
            if (!err) {
                return reply(products).created(`/products/${result.id}`); // HTTP 201
            }
            if (err.code === 11000 || err.code === 11001) {
                return reply(Boom.forbidden('Provide another products id, it already exist'));
            }
            return reply(Boom.forbidden(err)); // HTTP 403
        });
    },
};

exports.update = {
    validate: {
        payload: {
            name: Joi.string().required(),
            link: Joi.string().required(),
            type: Joi.string().required(),
            dimensions: Joi.string().required(),
            availability: Joi.string().required(),
            weigth: Joi.string().required(),
            size: Joi.string().required(),
            origin: Joi.any(),
            prices: Joi.any(),
            descriptions: Joi.any(),
            dateCreated: Joi.date(),
            lastUpdated: Joi.date(),
            author: Joi.string(),
            tags: Joi.any(),
            featured: Joi.number().integer(),
            images: Joi.any(),
        },
    },
    handler: (request, reply) => {
        Products.findOne({ uid: request.params.uid }, (err, products) => {
            if (!err) {
                products.name = request.payload.name;
                products.link = request.payload.link;
                products.save((error, result) => {
                    if (!error) {
                        return reply(result); // HTTP 201
                    }
                    if (error.code === 11000 || error.code === 11001) {
                        return reply(Boom.forbidden('Provide other products id, it already exist'));
                    }
                    return reply(Boom.forbidden(err)); // HTTP 403
                });
            }
            return reply(Boom.badImplementation(err)); // 500 error
        });
    },
};

exports.remove = {
    handler: (request, reply) => {
        Products.findOne({ uid: request.params.uid }, (err, products) => {
            if (!err && products) {
                products.remove();
                return reply({ message: 'products deleted successfully' });
            }
            if (!err) {
                return reply(Boom.notFound());
            }
            return reply(Boom.badRequest('Could not delete products'));
        });
    },
};

exports.removeAll = {
    handler: (request, reply) => {
        mongoose.connection.db.dropCollection('products', (err) => {
            if (!err) {
                return reply({ message: 'products database successfully deleted' });
            }
            return reply(Boom.badRequest('Could not delete products'));
        });
    },
};
