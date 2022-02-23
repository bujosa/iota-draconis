"use strict";

var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var logger = require("./logger");

const DB_PORT = process.env.DBPORT || 27017;

// Connection URL
const url = "mongodb://mongo-service:" + DB_PORT;

// Database Name
const dbName = "planets";

// Create a new MongoClient
const client = new MongoClient(url);

var _db;

//Creates the connection to the database
module.exports.connect = function connect(cb) {
  if (_db) {
    logger.warn("Trying to create the DB connection again!");
    return cb(null, _db);
  }
  client.connect(function (err) {
    if (err) {
      logger.error("Error connecting to DB!", err);
      setTimeout(function () {
        process.exit(1);
      }, 1000);
    }
    _db = client.db(dbName).collection(dbName);
    return cb(null, _db);
  });
};

//Return the connection to the database if it was previously created
module.exports.getConnection = function getConnection() {
  assert.ok(
    _db,
    "DB connection has not been created. Please call connect() first."
  );
  return _db;
};

//Helper method to initialize the database with sample data
module.exports.init = function init() {
  var samplePlanets = [
    {
      name: "Mercurio",
      satellite: 0,
      orbitalPeriod: 0.24,
      haveWater: true,
      picture:
        "https://cdn.pixabay.com/photo/2012/01/09/09/33/mercury-11591_960_720.png",
    },
    {
      name: "Tierra",
      satellite: 1,
      orbitalPeriod: 1,
      haveWater: true,
      picture:
        "https://cdn.pixabay.com/photo/2011/12/13/14/28/earth-11009_960_720.jpg",
    },
  ];
  return this.getConnection().insertMany(samplePlanets);
};

//Executes the query and return the result in the callback function
module.exports.find = function find(query, cb) {
  return this.getConnection().find(query).toArray(cb);
};

//Inserts a new document in the database
module.exports.insert = function insert(doc, cb) {
  return this.getConnection().insertOne(doc, cb);
};

//Updates a document that matches the query
module.exports.update = function update(query, newDoc, cb) {
  return this.getConnection().updateOne(query, { $set: newDoc }, cb);
};

//Removes a document from the database
module.exports.remove = function remove(query, cb) {
  return this.getConnection().deleteOne(query, cb);
};
