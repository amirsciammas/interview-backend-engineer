const e = require("express");
const dbSource = "database.sqlite"
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(dbSource, (err) => {
    db.get("PRAGMA foreign_keys = ON")
    if (err) {
        console.error("Error while initializing DB" + err.message)
        throw err
    } else {
        createDatabase();
    }

});

function createDatabase() {
    var newdb = new sqlite3.Database(dbSource, (err) => {
        if (err) {
            console.log("Error while creating Database  " + err);
            exit(1);
        } else {
            console.log("Database  Created");
            createTables(newdb);
        }
    });
}

function createTables(db) {
    console.log("creating Tables")
    db.serialize(() => {
        insertUsersRecords();
    })

};

function insertUsersRecords() {

    db.run('DROP TABLE IF EXISTS users', error => {
        if (error) {
        } else {
            db.run(`CREATE TABLE users
                    (
                        id              INTEGER PRIMARY KEY AUTOINCREMENT,
                        name            text,
                        email           text UNIQUE,
                        address_geo_lat text,
                        address_geo_lng text,
                        CONSTRAINT email_unique UNIQUE (email)
                    )`,
                (err) => {
                    if (err) {
                        console.log("err" + err)
                    } else {
                        console.log("Creating Users and inserting Users Records")
                        const insertStmt = db.prepare('INSERT INTO users (id, name, email, address_geo_lat, address_geo_lng) VALUES (?,?,?,?,?)');
                        //you can add more user records here
                        const usersRecords = [
                            [1, "Leanne Graham", "Sincere@april.biz", "-37.3159", "81.1496"],
                            [2, "Imagine Dragons", "imgDra@abc.biz", "-67.3159", "11.1496"]
                        ];
                        for (var i = 0; i < usersRecords.length; i++) {
                            insertStmt.run(usersRecords[i], function (err) {
                                if (err) throw err;
                            });
                        }
                        insertAlbumsRecords();

                    }
                });
        }
    });
}


function insertAlbumsRecords() {
    console.log("Creating Albums and inserting Albums Records")
    db.run('DROP TABLE IF EXISTS albums', error => {
        if (error) {
            throw error;
        } else {
            db.run(`CREATE TABLE albums
                    (
                        userId INTEGER,
                        id     INTEGER PRIMARY KEY,
                        title  text,
                        FOREIGN KEY (userId) REFERENCES users (id)
                    )`,
                (err) => {
                    if (err) {
                        console.log("insertAlbumsRecords err" + err)
                    } else {
                        var insertStatement = db.prepare('INSERT INTO albums (userId, id, title) VALUES (?,?,?)');
                        //you can add more albums records here
                        var albumsRecords = [
                            [1, 1, "sunt qui excepturi placeat culpa"],
                            [1, 3, "another sunt qui excepturi placeat culpa"],
                            [2, 2, "Thunder"]
                        ];
                        for (var i = 0; i < albumsRecords.length; i++) {
                            insertStatement.run(albumsRecords[i], function (err) {
                                if (err) throw err;
                            });
                        }
                        insertImagesRecords();
                    }
                });
        }
    });
}


function insertImagesRecords() {
    console.log("Creating Images and inserting Images Records")

    db.run('DROP TABLE IF EXISTS images', error => {
        if (error) {
            throw error;
        } else {
            db.run(`CREATE TABLE images
                    (
                        albumId INTEGER,
                        id      INTEGER PRIMARY KEY AUTOINCREMENT,
                        title   text,
                        url     text,
                        FOREIGN KEY (albumId) REFERENCES albums (id)
                    )`,
                (err) => {
                    if (err) {
                        console.log("Error while creating Images table::" + err)
                    } else {
                        var insertStatement = db.prepare('INSERT INTO images (albumId, id, title,url ) VALUES (?,?,?,?)');
                        //you can add more images records here
                        let imagesData = [
                            [1, 1, "recusandae provident modi vitae ipsa rerum", "https://via.placeholder.com/600/4e5c31"],
                            [1, 3, "another recusandae provident modi vitae ipsa rerum", "https://via.placeholder.com/600/4e5c31"],
                            [2, 2, "Thunder", "https://via.placeholder.com/600/4e5c31"]
                        ];
                        for (let i = 0; i < imagesData.length; i++) {
                            insertStatement.run(imagesData[i], function (err) {
                                if (err) throw err;
                            });

                        }
                        console.log("Tables created")
                    }
                });
        }
    });
}

module.exports = db
