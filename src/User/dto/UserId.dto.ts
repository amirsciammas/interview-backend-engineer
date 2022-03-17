import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class UserId {
  @ApiProperty({
    description: 'User ID  (numeric)',
  })
  @IsNumberString()
  readonly id: number;
}
