import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UserId } from '../dto/userId.dto';
import { UserService } from '../services/user.service';
import { User } from '../Types/User.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(@Param() prams: UserId): Promise<User> {
    const user: User = await this.userService.getUserById(prams.id);
    if (!Boolean(user)) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
