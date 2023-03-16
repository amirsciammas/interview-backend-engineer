import { Album } from "../models/album";
import db from "./database";

// Retrieve all albums and their images for the given user, sorted by the specified column
export const getAlbumImages = async (
  userId: number,
  limit: number,
  offset: number,
): Promise<Album[]> => {
  const albums = await db.all(
    `SELECT albums.*, images.* 
      FROM albums 
      LEFT JOIN images ON albums.id = images.albumId 
      WHERE albums.userId = ? 
      ORDER BY albums.title ASC
      LIMIT ? OFFSET ?
      `,
    [userId, limit, offset]
  );

  return albums;
};
