"use strict";

var fs = require("fs"),
  http = require("http"),
  path = require("path");

var logger = require("./logger");

var db = require("./db");
var bodyParser = require("body-parser");
var express = require("express");
var jsyaml = require("js-yaml");
var oasTools = require("oas-tools");
var cors = require("cors");

var app = express();

app.use(cors());

app.use(
  bodyParser.json({
    strict: false,
  })
);

var serverPort = process.env.PORT || 8080;

var spec = fs.readFileSync(path.join(__dirname, "/api/oas-doc.yaml"), "utf8");
var oasDoc = jsyaml.safeLoad(spec);

var options_object = {
  controllers: path.join(__dirname, "./controllers"),
  loglevel: "info",
  strict: false,
  router: true,
  validator: true,
};

oasTools.configure(options_object);

oasTools.initialize(oasDoc, app, function () {
  http.createServer(app).listen(serverPort, function () {
    logger.log("info", "App running at http://localhost:" + serverPort);
    logger.log(
      "info",
      "________________________________________________________________"
    );
    if (options_object.docs !== false) {
      logger.log(
        "info",
        "API docs (Swagger UI) available on http://localhost:" +
          serverPort +
          "/docs"
      );
      logger.log(
        "info",
        "________________________________________________________________"
      );
    }
  });
});

app.get("/info", function (req, res) {
  res.send({
    info: "This API was generated using oas-generator!",
    name: oasDoc.info.title,
  });
});

db.connect(function (err, _db) {
  logger.info("Initializing DB...");
  if (err) {
    logger.error("Error connecting to DB!", err);
    return 1;
  } else {
    db.find({}, function (err, planets) {
      if (err) {
        logger.error("Error while getting initial data from DB!", err);
      } else {
        if (planets.length === 0) {
          logger.info("Empty DB, loading initial data...");
          db.init();
        } else {
          logger.info("DB already has " + planets.length + " planets.");
        }
      }
    });
  }
});
