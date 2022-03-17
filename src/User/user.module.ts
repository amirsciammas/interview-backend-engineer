import { Module } from '@nestjs/common';
import DBModule from 'src/Database/db.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [DBModule],
  controllers: [UserController],
  providers: [UserService],
})
export default class UserModule {}
