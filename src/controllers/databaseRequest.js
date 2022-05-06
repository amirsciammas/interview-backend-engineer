
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqli'), sqlite3.OPEN_READWRITE, (err, result) => {
    if (err) {
        console.error('Error:- ' + err.stack)
        return
    }
    result = 'Connected to the database'
});

/**
 * Getting all SN that are in the DB.
 * @function getUsers
 * @returns {Promise}
 */
export const getUsers = (idUser) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * from users WHERE users.id = ${idUser}`, (error, rows) => {
            if (!error)
                resolve(rows)
            else reject(error)
        })
    })
}