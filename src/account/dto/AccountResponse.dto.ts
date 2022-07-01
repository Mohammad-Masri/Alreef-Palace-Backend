import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import IAccount from '../account.interface';

export class AccountResponse {
  @ApiProperty({ type: String })
  id: ObjectId;
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  username: string;

  constructor(account: IAccount) {
    this.id = account.id;
    this.name = account.name;
    this.username = account.username;
  }
}
