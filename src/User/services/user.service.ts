import { Injectable } from '@nestjs/common';
import { SqliteService } from 'src/Database/sqlite/sqlite.service';
import { User } from '../Types/User.type';

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
}
