import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { Common } from 'src/Common/Utils/Common.util';
import { UserId } from '../dto/userId.dto';
import { UserQueryDTO } from '../dto/UserQuery.dto';
import { UserService } from '../services/user.service';
import {
  Album,
  AlbumWithImages,
  User,
  UserWithAlbum,
} from '../Types/User.type';

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

  @Get(':id/albums')
  async getUserAndAlbum(
    @Param() prams: UserId,
    @Query() userQueryDTO: UserQueryDTO,
  ): Promise<UserWithAlbum> {
    const { limit, offset } = Common.OffsetLimitParser(
      userQueryDTO.page,
      userQueryDTO.size,
    );
    const [user, albums] = await Promise.all([
      this.userService.getUserById(prams.id),
      this.userService.getAlbumByUserId({
        userId: prams.id,
        offset,
        limit,
      }),
    ]);

    if (!Boolean(user)) {
      throw new NotFoundException('User not found');
    }
    return { ...user, albums };
  }

  @Get(':id/albums/images')
  async getAlbumAndImages(
    @Param() prams: UserId,
    @Query() userQueryDTO: UserQueryDTO,
  ): Promise<AlbumWithImages[]> {
    const { limit, offset } = Common.OffsetLimitParser(
      userQueryDTO.page,
      userQueryDTO.size,
    );

    const albums: Album[] = await this.userService.getAlbumByUserId({
      userId: prams.id,
      offset,
      limit,
    });

    // Lazy Fetch, If we use parallel 3 queries in Data base, using this only two.
    const images =
      albums && albums.length > 0
        ? await this.userService.getImagesByAlbumIds(
            albums?.map((item) => item.id),
          )
        : null;

    return albums?.map(
      (item: Album): AlbumWithImages => ({
        ...item,
        images: images?.filter((x) => x.albumId == item.id),
      }),
    );
  }
}
