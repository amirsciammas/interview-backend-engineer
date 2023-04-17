const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');


const app = express();
const PORT = 3000;

// Configure body-parser middleware to parse incoming requests as JSON
app.use(bodyParser.json());

// Create a new SQLite database connection
const db = new sqlite3.Database('database.sqli', (err) => {
  if (err) {
    console.error(err.message);
  } else{
    console.log('Connected to the SQLite database.')
    db.run(`CREATE TABLE [users] (
        [id] INT NULL,
        [name] VARCHAR (50),
        [email] VARCHAR (100),
        [address_geo_lat] FLOAT,
        [address_geo_lng] FLOAT
    )`,
    (err) => {
        if (err) {
            // Table already created
            console.log('users Table already created')
        }else{
            // Table just created, creating some rows
            console.log('Table just created, creating some rows for users')
            var insertUser = 'INSERT INTO users (id, name, email, address_geo_lat, address_geo_lng) VALUES (?,?,?,?,?)'
            db.run(insertUser, [1, "Leanne Graham","Sincere@april.biz",-37.3159, 81.1496])
            console.log(' rows created for users')
        }
    });
    db.run(`CREATE TABLE [albums] (
        [userId] INT, 
        [id] INT, 
        [title] VARCHAR (200)
    )`,
    (err) => {
        if (err) {
            // Table already created
            console.log(' albums Table already created')
        }else{
            // Table just created, creating some rows
            console.log('Table just created, creating some rows for albums')
            var insertAlbums = 'INSERT INTO albums (userId, id, title) VALUES (?,?,?)'
            db.run(insertAlbums, [1,2,"second"])
            db.run(insertAlbums, [1,3,"three"])
            db.run(insertAlbums, [1,4,"four"])
            console.log(' rows created for albums')
        }
    });
    db.run(`CREATE TABLE [images] (
        [albumId] INT,
        [id] INT,
        [title] VARCHAR NULL,
        [url] VARCHAR (300)
    )`,
    (err) => {
        if (err) {
            // Table already created
            console.log(' images Table already created')
        }else{
            // Table just created, creating some rows
            console.log('Table just created, creating some rows for images')
            var insertImages = 'INSERT INTO images (albumId, id, title,url) VALUES (?,?,?,?)'
            db.run(insertImages, [2,1,"recusandae provident modi vitae ipsa rerum", "https://via.placeholder.com/600/4e5c31"])
            db.run(insertImages, [2,2,"recusandae provident modi vitae ipsa rerum", "https://via.placeholder.com/600/4e5c31"])
            db.run(insertImages, [3,3,"recusandae provident modi vitae ipsa rerum", "https://via.placeholder.com/600/4e5c31"])
            db.run(insertImages, [3,4,"recusandae provident modi vitae ipsa rerum", "https://via.placeholder.com/600/4e5c31"])
            db.run(insertImages, [4,5,"recusandae provident modi vitae ipsa rerum", "https://via.placeholder.com/600/4e5c31"])
            db.run(insertImages, [97,4849,"recusandae provident modi vitae ipsa rerum", "https://via.placeholder.com/600/4e5c31"])
            console.log(' rows created for images')
        }
    });
      
}
});

// Start listening for incoming requests
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


// Get User by user Id
app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `SELECT * FROM users WHERE id = ${userId}`;
  
    db.get(query, (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
      } else if (!row) {
        res.status(404).send('User not found');
      } else {
        res.send(row);
      }
    });
  });
  
  // Get User and Albums by user Id
  app.get('/users/:userId/albums', (req, res) => {
    const userId = req.params.userId;
    const query = `
      SELECT users.*, albums.*
      FROM users
      JOIN albums ON albums.userId = users.id
      WHERE users.id = ${userId}
    `;
  
    db.all(query, (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
      } else if (rows.length === 0) {
        res.status(404).send('User not found');
      } else {
        const user = rows[0];
        const albums = rows.map(row => ({
            userId: row.userId,
            id: row.id,
            title: row.title,
        }));
  
        res.send({
          user,
          albums,
        });
      }
    });
  });
  
  // Get Albums and Images by user Id
  app.get('/users/:userId/albums/:albumId/images', (req, res) => {
    const userId = req.params.userId;
    const albumId = req.params.albumId;
    const query = `
      SELECT albums.*, images.*
      FROM albums
      JOIN images ON images.albumId = albums.id
      WHERE albums.userId = ${userId} AND albums.id = ${albumId}
    `;
  
    db.all(query, (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
      } else if (rows.length === 0) {
        res.status(404).send('Album not found');
      } else {
        const album = rows[0];
        const images = rows.map(row => ({
          id: row.image_id,
          title: row.image_title,
          url: row.image_url,
        }));
  
        res.send({
          album,
          images,
        });
      }
    });
  });

  app.get('/albums/:userId/images', (req, res) => {
    const userId = req.params.userId;
    const page = parseInt(req.query.page !== undefined ? req.query.page.toString() : '1') || 1;// current page, default to 1
    const limit = parseInt(req.query.limit !== undefined ? req.query.limit.toString() : '2') || 2; // items per page, default to 10
    const offset = (page - 1) * limit; // offset to start fetching items
    const query = `
    SELECT albums.*, images.*
    FROM albums
    JOIN images ON images.albumId = albums.id
      WHERE albums.userId = ${userId}
      ORDER BY albums.title
      LIMIT ${limit}
      OFFSET ${offset}
    `;
  
    db.all(query, (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
      } else if (rows.length === 0) {
        res.status(404).send('albums not found');
      } else {
        console.log("row => "+rows);
        const albums = rows.reduce((acc, row) => {
          const albumId = row.albumId;
          if (!acc.hasOwnProperty(albumId)) {
            acc[albumId] = {
              albumId: row.albumId,
              title: row.title,
              images: [],
            };
          }
          acc[albumId].images.push({
            id: row.id,
            title: row.title,
            url: row.url,
          });
          return acc;
        }, {});

      const albumIds = new Set();
      rows.forEach((row) => albumIds.add(row.albumId));
      const totalItems = albumIds.size;
      const totalPages = Math.ceil(totalItems / limit);
  
        res.send({
          albums: Object.values(albums),
          pagination: {
            page,
          limit,
          totalItems,
          totalPages,
          },
        });
      }
    });
  });