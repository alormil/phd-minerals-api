/*
 *
 * This config file is used to allow to connect to the Mongo DB database accross the project.
 * I want to give credit to https://github.com/Cron-J, they posted an good example of how to structure
 * a Hapi JS, Mongo DB project, which is where i was able to reference this config file : 
 * https://github.com/Cron-J/Hapi-Mongoose-Angular-Node.js/blob/master/server/config/db.js
 *
 */

'use strict';

var Mongoose = require('mongoose'),
    config = require('./config');

Mongoose.connect('mongodb://' + config.database.host + '/' + config.database.db);
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

exports.Mongoose = Mongoose;
exports.db = db;
