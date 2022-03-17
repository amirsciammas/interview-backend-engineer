const db = require('../configs/dbConfig');
const dotenv = require('dotenv');
dotenv.config();

function getUserById(userid) {

    const data = db.query(`SELECT * FROM users WHERE id= ?`, userid);

    return {
      data
    }
  }

  function getUserAndAlbumsByUserId(userid) {
  
    const data = db.query(`SELECT * FROM users INNER JOIN albums ON users.id=albums.userId WHERE users.id= ?`, userid);

    return {
      data
    }
  }
  
  function getAlbumsAndImagesByUserId(userid , page = 1) {
    const offset = (page - 1) * 10;
    const data = db.query(`SELECT * FROM users INNER JOIN albums ON users.id=albums.userId INNER JOIN images ON albums.id=images.albumId WHERE users.id= ? LIMIT ?,?`,[userid,offset, config.listPerPage] );
    const meta = {page};
  
    return {
      data,
      meta
    }
  }
  module.exports = {
    getUserById,
    getUserAndAlbumsByUserId,
    getAlbumsAndImagesByUserId
  }