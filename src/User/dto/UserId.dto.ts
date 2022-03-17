import { IsNumberString } from 'class-validator';

export class UserId {
  @IsNumberString()
  readonly id: number;
}
