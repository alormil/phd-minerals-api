/*
 *
 * This shows all the allowed routes for the application
 * I want to give credit to https://github.com/Cron-J, they posted an good example of how to structure
 * a Hapi JS, Mongo DB project, which is where i was able to reference this config file :
 * https://github.com/Cron-J/Hapi-Mongoose-Angular-Node.js/blob/master/server/routes.js
 *
 */

// Load modules

const Regions = require('./controllers/regions');
const Types = require('./controllers/types');
const Products = require('./controllers/products');

const ScrapeLink = require('./controllers/scrape-link');
const ScrapeRegion = require('./controllers/scrape-region');
const ScrapeType = require('./controllers/scrape-type');
const ScrapeProduct = require('./controllers/scrape-product');

// API Server Endpoints
exports.endpoints = [

    { method: 'POST', path: '/regions', config: Regions.create },
    { method: 'GET', path: '/regions', config: Regions.getAll },
    { method: 'GET', path: '/regions/{uid}', config: Regions.getOne },
    { method: 'PUT', path: '/regions/{uid}', config: Regions.update },
    { method: 'DELETE', path: '/regions/{uid}', config: Regions.remove },
    { method: 'DELETE', path: '/regions', config: Regions.removeAll },

    { method: 'POST', path: '/types', config: Types.create },
    { method: 'GET', path: '/types', config: Types.getAll },
    { method: 'GET', path: '/types/{uid}', config: Types.getOne },
    { method: 'PUT', path: '/types/{uid}', config: Types.update },
    { method: 'DELETE', path: '/types/{uid}', config: Types.remove },
    { method: 'DELETE', path: '/types', config: Types.removeAll },

    { method: 'POST', path: '/products', config: Products.create },
    { method: 'GET', path: '/products', config: Products.getAll },
    { method: 'GET', path: '/products/{uid}', config: Products.getOne },
    { method: 'PUT', path: '/products/{uid}', config: Products.update },
    { method: 'DELETE', path: '/products/{uid}', config: Products.remove },
    { method: 'DELETE', path: '/products', config: Products.removeAll },

    { method: 'POST', path: '/scrape-link', config: ScrapeLink.getAllLinks },

    { method: 'POST', path: '/scrape-region/{uid}', config: ScrapeRegion.getRegion },
    { method: 'POST', path: '/scrape-type/{uid}', config: ScrapeType.getType },
    { method: 'POST', path: '/scrape-product/{uid}', config: ScrapeProduct.getProduct },

];
