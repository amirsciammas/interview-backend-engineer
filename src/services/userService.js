const Albums = require("../entities/Albums");
const Images = require("../entities/Images");
const User = require("../entities/User");
const dto = require("../dtos/userDto");

exports.getUser = async (id) => {
  return await User.findByPk(id);
};

exports.getUserAlbums = async (id) => {
  const data = await Albums.findAll({ where: { userId: id }, include: [User] });
  return dto.UserAlbumDto(data);
};

exports.getUserAlbumsAndImages = async (
  id,
  limit = Number.MAX_SAFE_INTEGER,
  offset = 0,
  sortByAlbumTitle
) => {
  let sortBy = ["id"];
  if (
    sortByAlbumTitle !== undefined &&
    ["ASC", "DESC", "asc", "desc"].indexOf(sortByAlbumTitle) !== -1
  ) {
    sortBy = ["title", sortByAlbumTitle];
  }
  const data = await Albums.findAll({
    where: {
      userId: id,
    },
    include: [Images],
    order: [sortBy],
    limit: limit,
    offset: offset,
  });

  return data;
};
