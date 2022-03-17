import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsIn } from 'class-validator';
import { SortOption } from '../Types/User.type';
export class UserQueryDTO {
  @ApiProperty({
    description: 'Page No',
    minimum: 1,
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  readonly page: number;

  @ApiProperty({
    description: 'Page Size',
    minimum: 1,
    default: 25,
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  readonly size: number;

  @ApiProperty({
    description: 'Short by Album Title',
    required: false,
    enum: SortOption,
  })
  @IsOptional()
  @IsIn([SortOption.ASC, SortOption.DESC])
  readonly sortByTitle: string;
}
