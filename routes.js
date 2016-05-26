// Load modules

var Regions = require('./controllers/regions');
var Types = require('./controllers/types');
var Products = require('./controllers/products');

var ScrapeLink = require('./controllers/scrape-link');
var ScrapeRegion = require('./controllers/scrape-region');

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

    { method: 'GET', path: '/scrape-link', config: ScrapeLink.getAllLinks },

    { method: 'GET', path: '/scrape-region/{uid}', config: ScrapeRegion.getOneRegion }
];
