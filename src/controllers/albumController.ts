import { Request, Response } from 'express';
import { getAlbumImagesWithPaginationAndSorting } from '../services/albumService';

export class AlbumController {
  static async getAlbumsAndImagesByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);
      const { offset = 1, limit = 1 } = req.query;
      const albumsWithImages = await getAlbumImagesWithPaginationAndSorting(userId, Number(limit), Number(offset));
      res.status(200).json(albumsWithImages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
