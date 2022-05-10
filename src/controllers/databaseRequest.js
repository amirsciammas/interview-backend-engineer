
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqli'), (err, result) => {
    if (err) {
        console.error('Error:- ' + err.stack)
        return
    }
});

/**
 * Get an user by user id.
 * @function getUsers
 * @returns {Promise}
 */
export const getUserById = (idUser) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * from users WHERE users.id = ${idUser}`, (error, rows) => {
            if (!error) resolve(rows)
            else reject(error)
        })
    })
}

/**
 * Get an user and an album by user id.
 * @function getUsers
 * @returns {Promise}
 */
export const getUserAlbumByUserId = (idUser) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * from albums, users WHERE userId = ${idUser}`, (error, rows) => {
            if (!error) resolve(rows)
            else reject(error)
        })
    })
}

/**
 * Get image and album by user id.
 * @function getUsers
 * @returns {Promise}
 */
export const getMedia = (idUser, limit, offset) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * from albums, images WHERE albums.userId = ${idUser} AND albums.id = images.albumId LIMIT ${limit} OFFSET ${offset}`, (error, rows) => {
            if (!error) resolve(rows)
            else reject(error)
        })
    })
}
