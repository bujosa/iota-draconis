var services = require('../services/analytics.service');

module.exports.analytics = function analytics(req, res, next) {
  services.analytics(req.swagger.params, res, next);
};
