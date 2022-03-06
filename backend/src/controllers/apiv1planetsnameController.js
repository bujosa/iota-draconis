'use strict';

var planetByNameService = require('../services/planets-by-name.service');

module.exports.findPlanetByname = function findPlanetByname(req, res, next) {
  planetByNameService.findPlanetByname(req.swagger.params, res, next);
};

module.exports.deletePlanet = function deletePlanet(req, res, next) {
  planetByNameService.deletePlanet(req.swagger.params, res, next);
};

module.exports.updatePlanet = function updatePlanet(req, res, next) {
  planetByNameService.updatePlanet(req.swagger.params, res, next);
};
