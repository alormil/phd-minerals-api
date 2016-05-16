// Load modules

var Region      = require('./controllers/regions');

// API Server Endpoints
exports.endpoints = [

  { method: 'POST', path: '/regions', config: Region.create},
  { method: 'GET', path: '/regions', config: Region.getAll},
  { method: 'GET', path: '/regions/{regionId}', config: Region.getOne},
  { method: 'PUT', path: '/regions/{regionId}', config: Region.update},
  { method: 'DELETE', path: '/regions/{regionId}', config: Region.remove},
  { method: 'DELETE', path: '/regions', config: Region.removeAll}
];