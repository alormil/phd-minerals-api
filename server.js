/*
 *
 * This file allows to start the node js.
 * I want to give credit to https://github.com/Cron-J, they posted an good example of how to structure
 * a Hapi JS, Mongo DB project, which is where i was able to reference this config file :
 * https://github.com/Cron-J/Hapi-Mongoose-Angular-Node.js/blob/master/server/server.js
 *
 */

// All Depencies are invoked
const Hapi = require('hapi');
const Routes = require('./routes');
const Config = require('./config/config');
require('./config/db');

const app = {};
app.config = Config;

const server = new Hapi.Server();

server.connection({ port: app.config.server.port });

server.route(Routes.endpoints);

server.start(() => {
    console.log('Server started ', server.info.uri);
});
