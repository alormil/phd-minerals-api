const Joi = require('joi');
const Boom = require('boom');
const Types = require('../models/types').Types;
const mongoose = require('mongoose');


exports.getAll = {
    handler: (request, reply) => {
        Types.find({}, (err, types) => {
            if (!err) {
                return reply(types);
            }
            return reply(Boom.badImplementation(err)); // 500 error
        });
    },
};

exports.getOne = {
    handler: (request, reply) => {
        Types.findOne({ uid: request.params.uid }, (err, types) => {
            if (!err) {
                return reply(types);
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
            descriptions: Joi.any(),
            images: Joi.any(),
            dateCreated: Joi.date(),
            lastUpdated: Joi.date(),
            author: Joi.string(),
        },
    },
    handler: (request, reply) => {
        const types = new Types(request.payload);
        types.save((err, result) => {
            if (!err) {
                return reply(types).created(`/types/${result.id}`); // HTTP 201
            }
            if (err.code === 11000 || err.code === 11001) {
                return reply(Boom.forbidden('please provide another types id, it already exist'));
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
            descriptions: Joi.any(),
            images: Joi.any(),
            dateCreated: Joi.date(),
            lastUpdated: Joi.date(),
            author: Joi.string(),
        },
    },
    handler: (request, reply) => {
        Types.findOne({ uid: request.params.uid }, (err, types) => {
            if (!err) {
                types.name = request.payload.name;
                types.link = request.payload.link;
                types.save((error, result) => {
                    if (!error) {
                        return reply(result); // HTTP 201
                    }
                    if (error.code === 11000 || error.code === 11001) {
                        return reply(Boom.forbidden('Provide another types id, it already exist'));
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
        Types.findOne({ uid: request.params.uid }, (err, types) => {
            if (!err && types) {
                types.remove();
                return reply({ message: 'types deleted successfully' });
            }
            if (!err) {
                return reply(Boom.notFound());
            }
            return reply(Boom.badRequest('Could not delete types'));
        });
    },
};

exports.removeAll = {
    handler: (request, reply) => {
        mongoose.connection.db.dropCollection('types', (err) => {
            if (!err) {
                return reply({ message: 'types database successfully deleted' });
            }
            return reply(Boom.badRequest('Could not delete types'));
        });
    },
};
