"use strict";

var varapiv1planetsController = require("./apiv1planetsControllerService");

module.exports.getPlanets = function getPlanets(req, res, next) {
  varapiv1planetsController.getPlanets(req.swagger.params, res, next);
};

module.exports.addPlanet = function addPlanet(req, res, next) {
  varapiv1planetsController.addPlanet(req.swagger.params, res, next);
};
