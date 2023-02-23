import express from "express";
import { Request, Response, NextFunction } from "express";
const app = express();
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

import { openDb } from "./Helper/Dbconnector";


dotenv.config();

app.use(bodyParser.json());


const server_port = process.env.SERVER_PORT ?? "";

app.get('/users/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const db= await openDb()
    const user = await db.get('SELECT * FROM users WHERE id = ?', userId);
    if (!user) {
      res.status(404).send('User not found');
    } else {
    
      res.send(user);
    }
  });

app.get('/users/:userId/albums', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const sort = req.query.sort as string || 'title';
    const sortOrder = req.query.order as string || 'ASC';
    const db= await openDb()
    const albums = await db.all(
      `SELECT albums.* FROM albums
       INNER JOIN users ON albums.userId = users.id
       WHERE users.id = ?
       ORDER BY ${sort} ${sortOrder} LIMIT ? OFFSET ?`,
      userId,
      limit,
      offset
    );

   res.send(albums);
  });


app.get(
    '/users/:userId/albums/images',
    async (req: Request, res: Response) => {
      const userId = req.params.userId;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      const db= await openDb()
      const images = await db.all(
        `SELECT images.* FROM images
         INNER JOIN albums ON images.albumId = albums.id
         INNER JOIN users ON albums.userId = users.id
         WHERE users.id = ?
         LIMIT ? OFFSET ?`,
        userId,
        limit,
        offset
      );

      res.send(images);
    }
  );

const port = server_port || 5000;
app.listen(port, () => {
  console.log(`Application started on ${port}...`);
});

export default app;
