import { IsOptional, IsNumberString } from 'class-validator';

export class UserQueryDTO {
  @IsOptional()
  @IsNumberString()
  readonly page: number;

  @IsOptional()
  @IsNumberString()
  readonly size: number;
}
