const Joi = require("joi");
const httpCodes = require("../utils/httpcodes");

const requestUserId = Joi.object({
  userid: Joi.number()
    .required()
    .min(0)
    .rule({ message: "userid must be a numeric value." }),
});

const requestGetUserAlbumsAndImages = Joi.object({
  userid: Joi.number()
    .required()
    .min(0)
    .rule({ message: "userid must be a numeric value." }),
  offset: Joi.number()
    .min(0)
    .rule({ message: "offset must be a numeric value." }),
  limit: Joi.number()
    .min(0)
    .rule({ message: "limit must be a numeric value." }),
  sortByAlbumTitle: Joi.string().valid("ASC", "DESC", "asc", "desc"),
});

module.exports.validateRequestUserId = () => (req, res, next) => {
  const { error } = requestUserId.validate({ userid: req.params.id });
  if (error) {
    return res.status(httpCodes.BAD_REQUEST).json({
      code: httpCodes.BAD_REQUEST,
      msg: `failure - ${error.details[0].message}`,
      results: [],
    });
  }
  next();
};

module.exports.validateRequestGetUserAlbumsAndImages =
  () => (req, res, next) => {
    const { limit, offset, sortByAlbumTitle } = req.query;
    const { error } = requestGetUserAlbumsAndImages.validate({
      userid: req.params.id,
      limit: limit,
      offset: offset,
      sortByAlbumTitle: sortByAlbumTitle,
    });
    if (error) {
      return res.status(httpCodes.BAD_REQUEST).json({
        code: httpCodes.BAD_REQUEST,
        msg: `failure - ${error.details[0].message}`,
        results: [],
      });
    }
    next();
  };
