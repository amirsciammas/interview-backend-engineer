import { Request, Response } from 'express';
import { getUserAlbumsWithPagination, getUserByIdData } from '../services/userService';

export class UserController {
  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);
      const user = await getUserByIdData(userId);
      if(!user) {
        res.status(404).json({ message: "Invalid User id"});
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getUserAndAlbumsById(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);
      const { offset = 1, limit = 10 } = req.query;
      const userWithAlbums = await getUserAlbumsWithPagination(userId, Number(limit), Number(offset));
      res.status(200).json(userWithAlbums);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
