const userService = require("../services/userService");
const httpCodes = require("../utils/httpCodes");
const result = require("../models/result");

exports.getUser = async (request, response) => {
  try {
    const id = request.params.id;
    const results = await userService.getUser(id);
    if (results) {
      response
        .status(httpCodes.OK)
        .send(result(httpCodes.OK, "Success", results));
    } else {
      response
        .status(httpCodes.OK)
        .send(result(httpCodes.OK, "Success", "there are no record."));
    }
  } catch (err) {
    console.error(err);
    response
      .status(httpCodes.INTERNAL_SERVER)
      .send(result(INTERNAL_SERVER, "Failure", `Reason: ${err}`));
  }
};

exports.getUserAlbums = async (request, response) => {
  try {
    const id = request.params.id;
    const results = await userService.getUserAlbums(id);
    if (results) {
      response
        .status(httpCodes.OK)
        .send(result(httpCodes.OK, "Success", results));
    } else {
      response
        .status(httpCodes.OK)
        .send(result(httpCodes.OK, "Success", "there are no record."));
    }
  } catch (err) {
    console.error(err);
    response
      .status(httpCodes.INTERNAL_SERVER)
      .send(result(INTERNAL_SERVER, "Failure", `Reason: ${err}`));
  }
};

exports.getUserAlbumsAndImages = async (request, response) => {
  try {
    const { limit, offset, sortByAlbumTitle } = request.query;
    const id = request.params.id;
    const results = await userService.getUserAlbumsAndImages(
      id,
      limit,
      offset,
      sortByAlbumTitle
    );
    if (results) {
      response
        .status(httpCodes.OK)
        .send(result(httpCodes.OK, "Success", results));
    } else {
      response
        .status(httpCodes.OK)
        .send(result(httpCodes.OK, "Success", "there are no record."));
    }
  } catch (err) {
    console.error(err);
    response
      .status(httpCodes.INTERNAL_SERVER)
      .send(result(INTERNAL_SERVER, "Failure", `Reason: ${err}`));
  }
};
