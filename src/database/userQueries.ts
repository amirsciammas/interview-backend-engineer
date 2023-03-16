import { Album } from './../models/album';
import { User } from '../models/user';
import db from './database';

export const getUserById = async (id: number): Promise<User | undefined> => {
  const user = await db.get('SELECT * FROM users WHERE id = ?', id);
  return user;
};

// Retrieve all albums for the given user, sorted by the title
export const getUserAlbums = async (
  userId: number,
  limit: number,
  offset: number
): Promise<Album[]> => {
  const albums = await db.all(
    'SELECT albums.* FROM albums JOIN users ON users.id = albums.userId WHERE users.id = ? ORDER BY title LIMIT ? OFFSET ?',
    [userId,
    limit,
    offset]
  );
  return albums;
};
