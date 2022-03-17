const {
  getUserById,
  getUserAndAlbumsByUserId,
  getAlbumsAndImagesByUserId,
} = require("../services/userService");
const result = require("../models/result");
const httpCodes = require("../utils/httpcodes");

const fetchUserById = (request, response, next) => {
  try {
    const userid = request.params.id;
    getUserById(userid).then((records) => {
      if (!records.length) {
        response.status(httpCodes.OK).send(result(1, "no result found."));
      } else {
        response.status(httpCodes.OK).send(result(0, "Success", records));
      }
    });
  } catch (error) {
    next(error);
    response
      .status(httpCodes.INTERNAL_SERVER)
      .send(result(1, `failure - ${error.message}`, []));
  }
};

const fetchUserAndAlbumsByUserId = (request, response, next) => {
  try {
    const userid = request.params.id;
    getUserAndAlbumsByUserId(userid).then((records) => {
      if (!records.length) {
        response.status(httpCodes.OK).send(result(1, "no result found."));
      } else {
        response.status(httpCodes.OK).send(result(0, "Success", records));
      }
    });
  } catch (error) {
    next(error);
    response
      .status(httpCodes.INTERNAL_SERVER)
      .send(result(1, `failure - ${error.message}`, []));
  }
};

const fetchAlbumsAndImagesByUserId = (request, response, next) => {
  try {
    const userid = request.params.id;
    const pageNumber = req.query.page;
    getAlbumsAndImagesByUserId(userid, pageNumber).then((records) => {
      if (!records.length) {
        response.status(httpCodes.OK).send(result(1, "no result found."));
      } else {
        response.status(httpCodes.OK).send(result(0, "Success", records));
      }
    });
  } catch (error) {
    next(error);
    response
      .status(httpCodes.INTERNAL_SERVER)
      .send(result(1, `failure - ${error.message}`, []));
  }
};

module.exports = {
  fetchUserById,
  fetchUserAndAlbumsByUserId,
  fetchAlbumsAndImagesByUserId,
};
