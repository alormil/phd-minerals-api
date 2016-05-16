// Load modules

var Regions      = require('./controllers/regions');

// API Server Endpoints
exports.endpoints = [

  { method: 'POST', path: '/regions', config: Regions.create},
  { method: 'GET', path: '/regions', config: Regions.getAll},
  { method: 'GET', path: '/regions/{uid}', config: Regions.getOne},
  { method: 'PUT', path: '/regions/{uid}', config: Regions.update},
  { method: 'DELETE', path: '/regions/{uid}', config: Regions.remove},
  { method: 'DELETE', path: '/regions', config: Regions.removeAll}
];