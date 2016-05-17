// Load modules

var Regions      = require('./controllers/regions');
var Types      = require('./controllers/types');

// API Server Endpoints
exports.endpoints = [

  { method: 'POST', path: '/regions', config: Regions.create},
  { method: 'GET', path: '/regions', config: Regions.getAll},
  { method: 'GET', path: '/regions/{uid}', config: Regions.getOne},
  { method: 'PUT', path: '/regions/{uid}', config: Regions.update},
  { method: 'DELETE', path: '/regions/{uid}', config: Regions.remove},
  { method: 'DELETE', path: '/regions', config: Regions.removeAll},

  { method: 'POST', path: '/types', config: Types.create},
  { method: 'GET', path: '/types', config: Types.getAll},
  { method: 'GET', path: '/types/{uid}', config: Types.getOne},
  { method: 'PUT', path: '/types/{uid}', config: Types.update},
  { method: 'DELETE', path: '/types/{uid}', config: Types.remove},
  { method: 'DELETE', path: '/types', config: Types.removeAll}
];