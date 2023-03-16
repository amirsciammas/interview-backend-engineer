import { Album } from '../models/album';
import { getAlbumImages } from '../database/albumQueries';

export const getAlbumImagesWithPaginationAndSorting = async (
  userId: number,
  limit: number,
  offset: number,
): Promise<Album[]> => {
  return await getAlbumImages(userId, limit, offset);
};