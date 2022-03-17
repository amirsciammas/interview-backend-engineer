import { Injectable } from '@nestjs/common';
import { SqliteService } from 'src/Database/sqlite/sqlite.service';
import { Album, User, Image } from '../Types/User.type';

@Injectable()
export class UserService {
  constructor(private readonly sqliteService: SqliteService) {}

  async getUserById(id: number): Promise<User> {
    try {
      return this.sqliteService.get<User>(
        `SELECT * from users where id = $id`, // Might use ORM
        {
          $id: id,
        },
      );
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async getAlbumByUserId({
    userId,
    offset,
    limit,
  }: {
    userId: number;
    offset: number;
    limit: number;
  }): Promise<Album[]> {
    try {
      return this.sqliteService.all<Album>(
        `select * from albums WHERE userId = $userId LIMIT $limit OFFSET $offset`,
        { $userId: userId, $offset: offset, $limit: limit },
      );
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async getImagesByAlbumIds(albumIds: number[]): Promise<Image[]> {
    console.log(albumIds);
    try {
      return this.sqliteService.all<Image>(
        `select * FROM images WHERE albumid in (${albumIds
          .map(() => '?')
          .join(',')})`,
        albumIds,
      );
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
}
