import { IsOptional, IsNumberString, IsIn } from 'class-validator';

export class UserQueryDTO {
  @IsOptional()
  @IsNumberString()
  readonly page: number;

  @IsOptional()
  @IsNumberString()
  readonly size: number;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  readonly sortByTitle: string;
}
