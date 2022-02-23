'use strict'

var varapiv1planetsnameController = require('./apiv1planetsnameControllerService');

module.exports.findPlanetByname = function findPlanetByname(req, res, next) {
  varapiv1planetsnameController.findPlanetByname(req.swagger.params, res, next);
};

module.exports.deletePlanet = function deletePlanet(req, res, next) {
  varapiv1planetsnameController.deletePlanet(req.swagger.params, res, next);
};

module.exports.updatePlanet = function updatePlanet(req, res, next) {
  varapiv1planetsnameController.updatePlanet(req.swagger.params, res, next);
};