const Albums = require("../entities/Albums");
const Images = require("../entities/Images");
const User = require("../entities/User");
const dto = require("../dtos/userDto");
const dotenv = require("dotenv");
dotenv.config();

/**
 * Returns user info .
 *
 * @param {number} id the user id.
 * Inline SQL: `SELECT * FROM users WHERE id= ?`, userid
 * @return {User} user info.
 */
exports.getUser = async (id) => {
  return await User.findByPk(id);
};

/**
 * Returns users albums.
 *
 * @param {number} id the user id.
 * Inline SQL: `SELECT * FROM users INNER JOIN albums ON users.id=albums.userId WHERE users.id= ?`, userid
 * @return {UserAlbumDto} list of albums for given user id.
 */
exports.getUserAlbums = async (id) => {
  const data = await Albums.findAll({ where: { userId: id }, include: [User] });
  return dto.UserAlbumDto(data);
};

/**
 * Returns users albums and images
 *
 * @param {number} id the user id.
 * @param {number} limit for pagination limit value , default value/MAX_VALUE is on .env file
 * @param {number} offset for pagination offset value , default value is on .env file
 * @param {string} sortByAlbumTitle for ordering, value must be ASC,DESC 
 * Inline SQL: SELECT `albums`.*, `images`.`id` AS `images.id`, `images`.`title` AS `images.title`, `images`.`url` AS `images.url`, `images`.`albumId` AS `images.albumId` FROM (SELECT `albums`.`id`, `albums`.`title`, `albums`.`userId` FROM `albums` AS `albums` WHERE `albums`.`userId` = '?' ORDER BY `albums`.`id` LIMIT ?, ?) AS `albums` LEFT OUTER JOIN `images` AS `images` ON `albums`.`id` = `images`.`albumId`
ORDER BY `albums`.`id` , userid, limit,offset, sortByAlbumTitle
 * @return {Albums[]} albums array and images for given user id.
 */
exports.getUserAlbumsAndImages = async (
  id,
  limit = process.env.LIMIT_MAX ,
  offset = process.env.DEFAULT_OFFSET_VALUE,
  sortByAlbumTitle
) => {
  let sortBy = ["id"];
  if (
    sortByAlbumTitle !== undefined &&
    ["ASC", "DESC", "asc", "desc"].indexOf(sortByAlbumTitle) !== -1
  ) {
    sortBy = ["title", sortByAlbumTitle];
  }
  const result = await Albums.findAll({
    where: {
      userId: id,
    },
    include: [Images],
    order: [sortBy],
    limit: limit,
    offset: offset,
  });

  return result;
};
