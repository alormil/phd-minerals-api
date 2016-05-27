/*
 *
 * This file allows to start the node js.
 * I want to give credit to https://github.com/Cron-J, they posted an good example of how to structure
 * a Hapi JS, Mongo DB project, which is where i was able to reference this config file : 
 * https://github.com/Cron-J/Hapi-Mongoose-Angular-Node.js/blob/master/server/server.js
 *
 */

'use strict';

// All Depencies are invoked
var Hapi = require('hapi'),
    Routes = require('./routes'),
    Db = require('./config/db'),
    Config = require('./config/config');

var app = {};
app.config = Config;

var server = new Hapi.Server();

server.connection({ port: app.config.server.port });

server.route(Routes.endpoints);

server.start(function() {
    console.log('Server started ', server.info.uri);
});
