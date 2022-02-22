"use strict";

var db = require("../db");
var logger = require("../logger");

module.exports.findPlanetByname = function findPlanetByname(req, res, next) {
  var name = req.name.value;
  if (!name) {
    logger.warn(
      "New GET request to /planets/:name without name, sending 400..."
    );
    res.sendStatus(400); // bad request
  } else {
    logger.info("New GET request to /planets/" + name);
    db.find({ name }, function (err, filteredPlanets) {
      if (err) {
        logger.error("Error getting data from DB");
        res.sendStatus(500); // internal server error
      } else {
        if (filteredPlanets.length > 0) {
          var planet = filteredPlanets[0]; //since we expect to have exactly ONE planet with this name
          logger.debug("Sending planet: " + JSON.stringify(planet, 2, null));
          res.send(planet);
        } else {
          logger.warn("There are no planets with name " + name);
          res.sendStatus(404); // not found
        }
      }
    });
  }
};

module.exports.deletePlanet = function deletePlanet(req, res, next) {
  var name = req.name.value;
  if (!name) {
    logger.warn(
      "New DELETE request to /planets/:name without name, sending 400..."
    );
    res.sendStatus(400); // bad request
  } else {
    logger.info("New DELETE request to /planets/" + name);
    db.remove({ name }, function (err, deleteSuccess) {
      const { deletedCount } = deleteSuccess;

      if (err) {
        logger.error("Error removing data from DB");
        res.sendStatus(500); // internal server error
      } else {
        logger.info("Planets removed: " + deletedCount);
        if (deletedCount === 1) {
          logger.debug(
            "The planet with name " +
              name +
              " has been succesfully deleted, sending 204..."
          );
          res.sendStatus(204); // no content
        } else {
          logger.warn("There are no planets to delete");
          res.sendStatus(404); // not found
        }
      }
    });
  }
};

module.exports.updatePlanet = function updatePlanet(req, res, next) {
  var updatedPlanet = req.planet.value;
  var name = req.name.value;

  if (!updatedPlanet) {
    logger.warn("New PUT request to /planets/ without planet, sending 400...");
    res.sendStatus(400); // bad request
  } else {
    logger.info(
      "New PUT request to /planets/" +
        name +
        " with data " +
        JSON.stringify(updatedPlanet, 2, null)
    );
    if (
      !updatedPlanet.name ||
      !updatedPlanet.satellite ||
      !updatedPlanet.haveWater ||
      !updatedPlanet.orbitalPeriod ||
      !updatedPlanet.picture
    ) {
      logger.warn(
        "The planet " +
          JSON.stringify(updatedPlanet, 2, null) +
          " is not well-formed, sending 422..."
      );
      res.sendStatus(422); // unprocessable entity
    } else {
      db.find({ name }, function (err, planets) {
        if (err) {
          logger.error("Error getting data from DB");
          res.sendStatus(500); // internal server error
        } else {
          if (planets.length > 0) {
            db.update({ name }, updatedPlanet);
            logger.debug(
              "Modifying planet with name " +
                name +
                " with data " +
                JSON.stringify(updatedPlanet, 2, null)
            );
            res.sendStatus(204); // no content
          } else {
            logger.warn("There are not any planet with name " + name);
            res.sendStatus(404); // not found
          }
        }
      });
    }
  }
};
