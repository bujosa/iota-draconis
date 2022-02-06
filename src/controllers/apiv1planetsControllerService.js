"use strict";

var db = require("../db");

module.exports.getPlanets = function getPlanets(req, res, next) {
  console.info("New GET request to /planets");
  db.find({}, function (err, planets) {
    if (err) {
      console.error("Error getting data from DB");
      res.sendStatus(500); // internal server error
    } else {
      console.info("Sending planets: " + JSON.stringify(planets, 2, null));
      res.send(planets);
    }
  });
};

module.exports.addPlanet = function addPlanet(req, res, next) {
  var newPlanet = req.planet.value;
  if (!newPlanet) {
    console.warn(
      "New POST request to /planets/ without planet, sending 400..."
    );
    res.sendStatus(400); // bad request
  } else {
    console.info(
      "New POST request to /planets with body: " +
        JSON.stringify(newPlanet, 2, null)
    );
    if (
      !newPlanet.name ||
      !newPlanet.orbitalPeriod ||
      !newPlanet.haveWater ||
      !newPlanet.satellite
    ) {
      console.warn(
        "The planet " +
          JSON.stringify(newPlanet, 2, null) +
          " is not well-formed, sending 422..."
      );
      res.sendStatus(422); // unprocessable entity
    } else {
      db.find({ name: newPlanet.name }, function (err, planets) {
        if (err) {
          console.error("Error getting data from DB");
          res.sendStatus(500); // internal server error
        } else {
          if (planets.length > 0) {
            console.warn(
              "The planet " +
                JSON.stringify(newPlanet, 2, null) +
                " already extis, sending 409..."
            );
            res.sendStatus(409); // conflict
          } else {
            console.info("Adding planet " + JSON.stringify(newPlanet, 2, null));
            db.insert(newPlanet);
            res.sendStatus(201); // created
          }
        }
      });
    }
  }
};
