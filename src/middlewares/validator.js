const Joi = require("joi").extend(require("@joi/date"));
const httpCodes = require("../utils/httpcodes");

const records = Joi.object({
  userid: Joi.number()
    .required()
    .min(0)
    .rule({ message: "userid must be a numeric value." }),
});

module.exports.validateRecords = () => (req, res, next) => {
  const { error } = records.validate(req.params.id);
  if (error) {
    return res.status(httpCodes.BAD_REQUEST).json({
      code: httpCodes.BAD_REQUEST,
      msg: `failure - ${error.details[0].message}`,
      records: [],
    });
  }
  next();
};
