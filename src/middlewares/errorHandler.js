const result = require("../models/result");
const logger = require("../utils/logger");
const httpCodes = require("../utils/httpcodes");

function logError(error) {
  logger.log({ level: "error", message: error });
}

function returnError(error, req, res, next) {
  logError(error);
  res
    .status(httpCodes.INTERNAL_SERVER || error.statusCode)
    .send(result(error.statusCode, error.message));
}

module.exports = {
  logError,
  returnError,
};
