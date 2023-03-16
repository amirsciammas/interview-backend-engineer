import { Album } from './../models/album';
import { getUserById, getUserAlbums } from '../database/userQueries';
import { User } from '../models/user';


export const getUserByIdData = async (id: number): Promise<User | undefined> => {
  return await getUserById(id);
};

export const getUserAlbumsWithPagination = async (
  userId: number,
  limit: number,
  offset: number
): Promise<Album[]> => {
  return await getUserAlbums(userId, limit, offset);
};