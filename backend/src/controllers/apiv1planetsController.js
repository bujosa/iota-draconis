'use strict';

var planetsService = require('../services/planets.service');

module.exports.getPlanets = function getPlanets(req, res, next) {
  planetsService.getPlanets(req.swagger.params, res, next);
};

module.exports.addPlanet = function addPlanet(req, res, next) {
  planetsService.addPlanet(req.swagger.params, res, next);
};
