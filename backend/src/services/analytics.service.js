'use strict';

var db = require('../db');
var logger = require('../logger');

module.exports.analytics = async function analytics(req, res, next) {
  var limit = req.limit.value;
  if (!limit) {
    logger.warn(
      'New GET request to :limit/analytics without limit, sending 400...'
    );
    res.sendStatus(400); // bad request
  } else {
    logger.info(`New GET request to ${limit}/analytics`);
    try {
      const result = await db.aggregate(parseInt(limit));
      console.log(result);
      res.send(result);
    } catch (err) {
      logger.error(err);
      res.sendStatus(500);
    }
  }
};
